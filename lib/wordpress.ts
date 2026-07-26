const API_URL = process.env.WORDPRESS_API_URL!;

// ── Core fetcher ────────────────────────────────────────────
async function fetchAPI(query: string, variables = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // ISR — revalidates every 60 seconds
  });

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

// ── Types matching your existing blog data shape ─────────────
export type WPPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: { heading: string; body: string }[];
};

// ── Helper: format date to match your existing style ─────────
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── Helper: estimate read time from content length ───────────
function estimateReadTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

// ── Helper: extract first image from content as fallback ─────
function extractFirstImage(content: string): string {
  const match = content.match(/src="([^"]+)"/);
  return match ? match[1] : "/blog-1.png";
}

// ── Helper: parse WP content into heading/body sections ──────
// WordPress content comes as raw HTML — we split it into
// sections by h2 tags to match your existing content shape.
function parseContentSections(
  html: string
): { heading: string; body: string }[] {
  // Strip HTML tags for plain text paragraphs
  const stripped = html
    .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, "|||HEADING|||$1|||END|||")
    .replace(/<p[^>]*>(.*?)<\/p>/gi, "|||PARA|||$1|||END|||")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "—")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"');

  const sections: { heading: string; body: string }[] = [];
  const parts = stripped.split("|||HEADING|||");

  // If no headings, treat the whole content as one section
  if (parts.length <= 1) {
    const body = stripped
      .replace(/\|\|\|PARA\|\|\|/g, "")
      .replace(/\|\|\|END\|\|\|/g, " ")
      .trim();
    return [{ heading: "Article", body }];
  }

  for (const part of parts) {
    if (!part.trim()) continue;
    const [headingPart, ...rest] = part.split("|||END|||");
    const heading = headingPart.trim();
    const body = rest
      .join("")
      .replace(/\|\|\|PARA\|\|\|/g, "")
      .replace(/\|\|\|END\|\|\|/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (heading) sections.push({ heading, body });
  }

  return sections.length > 0
    ? sections
    : [{ heading: "Article", body: stripped.replace(/\|[^|]+\|/g, "").trim() }];
}

// ── Get all posts (blog index) ───────────────────────────────
export async function getAllPosts(): Promise<WPPost[]> {
  const data = await fetchAPI(`
    query AllPosts {
      posts(first: 20, where: { status: PUBLISH }) {
        nodes {
          slug
          title
          excerpt
          date
          content
          categories {
            nodes { name }
          }
          featuredImage {
            node { sourceUrl }
          }
        }
      }
    }
  `);

  return data.posts.nodes.map((post: any) => ({
    slug: post.slug,
    title: post.title.replace(/&#8217;/g, "'").replace(/&#8211;/g, "—"),
    excerpt: post.excerpt
      ? post.excerpt.replace(/<[^>]+>/g, "").replace(/&#8217;/g, "'").trim()
      : "",
    date: formatDate(post.date),
    readTime: estimateReadTime(post.content || ""),
    category:
      post.categories?.nodes?.[0]?.name || "General",
    image: post.featuredImage?.node?.sourceUrl || extractFirstImage(post.content || ""),
    content: parseContentSections(post.content || ""),
  }));
}

// ── Get a single post by slug (blog post page) ───────────────
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String!) {
      postBy(slug: $slug) {
        slug
        title
        excerpt
        date
        content
        categories {
          nodes { name }
        }
        featuredImage {
          node { sourceUrl }
        }
      }
    }
  `,
    { slug }
  );

  if (!data.postBy) return null;

  const post = data.postBy;
  return {
    slug: post.slug,
    title: post.title.replace(/&#8217;/g, "'").replace(/&#8211;/g, "—"),
    excerpt: post.excerpt
      ? post.excerpt.replace(/<[^>]+>/g, "").replace(/&#8217;/g, "'").trim()
      : "",
    date: formatDate(post.date),
    readTime: estimateReadTime(post.content || ""),
    category: post.categories?.nodes?.[0]?.name || "General",
    image:
      post.featuredImage?.node?.sourceUrl ||
      extractFirstImage(post.content || ""),
    content: parseContentSections(post.content || ""),
  };
}

// ── Get all slugs (for generateStaticParams) ─────────────────
export async function getAllPostSlugs(): Promise<string[]> {
  const data = await fetchAPI(`
    query AllSlugs {
      posts(first: 100, where: { status: PUBLISH }) {
        nodes { slug }
      }
    }
  `);
  return data.posts.nodes.map((p: any) => p.slug);
}
