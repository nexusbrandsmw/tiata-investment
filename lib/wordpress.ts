const API_URL = process.env.WORDPRESS_API_URL!;

// ─────────────────────────────────────────────
// Core GraphQL Fetcher
// ─────────────────────────────────────────────
async function fetchAPI(query: string, variables = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface WPPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author?: string;
  content: string;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function estimateReadTime(content: string): string {
  const words = content
    .replace(/<[^>]*>/g, "")
    .trim()
    .split(/\s+/).length;

  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
}

function extractFirstImage(content: string): string {
  const match = content.match(/src="([^"]+)"/);

  return match ? match[1] : "/blog-placeholder.jpg";
}

function cleanText(text: string) {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "—")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&nbsp;/g, " ")
    .trim();
}

// ─────────────────────────────────────────────
// Get All Posts
// ─────────────────────────────────────────────
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

          author {
            node {
              name
            }
          }

          categories {
            nodes {
              name
            }
          }

          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `);

  return data.posts.nodes.map((post: any): WPPost => ({
    slug: post.slug,

    title: cleanText(post.title),

    excerpt: cleanText(post.excerpt ?? ""),

    date: formatDate(post.date),

    readTime: estimateReadTime(post.content ?? ""),

    author: post.author?.node?.name,

    category: post.categories?.nodes?.[0]?.name ?? "General",

    image:
      post.featuredImage?.node?.sourceUrl ??
      extractFirstImage(post.content ?? ""),

    content: post.content ?? "",
  }));
}

// ─────────────────────────────────────────────
// Get Single Post
// ─────────────────────────────────────────────
export async function getPostBySlug(
  slug: string
): Promise<WPPost | null> {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String!) {
      postBy(slug: $slug) {
        slug
        title
        excerpt
        date
        content

        author {
          node {
            name
          }
        }

        categories {
          nodes {
            name
          }
        }

        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
    `,
    { slug }
  );

  if (!data.postBy) {
    return null;
  }

  const post = data.postBy;

  return {
    slug: post.slug,

    title: cleanText(post.title),

    excerpt: cleanText(post.excerpt ?? ""),

    date: formatDate(post.date),

    readTime: estimateReadTime(post.content ?? ""),

    author: post.author?.node?.name,

    category: post.categories?.nodes?.[0]?.name ?? "General",

    image:
      post.featuredImage?.node?.sourceUrl ??
      extractFirstImage(post.content ?? ""),

    content: post.content ?? "",
  };
}

// ─────────────────────────────────────────────
// Generate Static Params
// ─────────────────────────────────────────────
export async function getAllPostSlugs(): Promise<string[]> {
  const data = await fetchAPI(`
    query AllSlugs {
      posts(first: 100, where: { status: PUBLISH }) {
        nodes {
          slug
        }
      }
    }
  `);

  return data.posts.nodes.map((post: any) => post.slug);
}