
 // data/posts.ts
 // Local blog data for Tiata Investment.
 // Add new articles to postList; their content is loaded from post-content.ts.

import { postContent } from "./post-content";

export type PostMeta = {
  slug: string;
  title: string;
  image: string;
  category: string;
  date: string;
  excerpt: string;
};

export type BlogPost = PostMeta & {
  content: string;
};

// Keep articles ordered newest first.
const postList: PostMeta[] = [ 
    {
    slug: "zantchito-pitching-with-passion",
    title: "Pitching with Passion at Zantchito: A Journey of Growth",
    image: "/blog/zantchito-pitching.jpeg",
    category: "Entrepreneurship",
    date: "20 Oct. 2026",
    excerpt:
        "TiaTa Investment shares its entrepreneurial journey at the Zantchito Pitching with Passion event, gaining inspiration, valuable connections, and new perspectives for growth.",
    },

  {
  slug: "proud-moment-for-tiata-investment",
  title: "Proud Moment for TiaTa Investment!",
  image: "/blog/temwa-graduation.jpeg",
  category: "Company News",
  date: "07 Apr. 2026",
  excerpt:
    "TiaTa Investment celebrates Founder and CEO Temwa Munthali Ndalama's graduation from the Women Creating Wealth Entrepreneurship Development Programme.",
},

{
    slug: "empowering-communities-through-value-addition",
    title: "Empowering Communities Through Value Addition!",
    image: "/blog/mkhweza-dairy-cooperative.jpeg",
    category: "Community Development",
    date: "06 Sept. 2025",
    excerpt:
      "TiaTa Investment visits Mkhweza Dairy Cooperative to explore value addition, strengthen local partnerships, and support sustainable growth through the Agcom Matching Grant.",
  },
  
];

export const manualPosts: BlogPost[] = postList.map((post) => ({
  ...post,
  content: postContent[post.slug] ?? "",
}));

export function getAllPosts(): BlogPost[] {
  return [...manualPosts];
}

export function getPostBySlug(
  slug: string
): BlogPost | undefined {
  return manualPosts.find((post) => post.slug === slug);
}
