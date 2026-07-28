const API_URL = process.env.WORDPRESS_API_URL!;

// ── Core fetcher ────────────────────────────────────────────
async function fetchAPI(query: string, variables = {}) {
  const res = await fetch(API_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query, variables }),
  cache: "no-store",
});

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

// ── Types matching your existing blog data shape ─────────────
export interface WPPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author?: string;
  content: string;
}

// ── Helper: format date to match your existing style ─────────
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── Helper: estimate read time from content length ───────────

// ── Helper: extract first image from content as fallback ─────
function extractFirstImage(content: string): string {
  const match = content.match(/src="([^"]+)"/);
  return match ? match[1] : "/blog-1.png";
}

// ── Helper: parse WP content into heading/body sections ──────
// WordPress content comes as raw HTML — we split it into
// sections by h2 tags to match your existing content shape.


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

        author {
          node {
            name
          }
        }

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
    author: post.author?.node?.name,
    category:
      post.categories?.nodes?.[0]?.name || "General",
    image: post.featuredImage?.node?.sourceUrl || extractFirstImage(post.content || ""),
    content: post.content || "",
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

      author {
        node {
          name
        }
      }

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
    author: post.author?.node?.name,
    category: post.categories?.nodes?.[0]?.name || "General",
    image:
      post.featuredImage?.node?.sourceUrl ||
      extractFirstImage(post.content || ""),
    content: post.content || "",
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
