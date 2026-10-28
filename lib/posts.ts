
 // lib/posts.ts
 // Retrieves blog posts from local project files.

import {
  getAllPosts as getAllManualPosts,
  getPostBySlug as getManualPostBySlug,
} from "@/data/posts";

import type { BlogPost } from "@/data/posts";

export function getAllPosts(): BlogPost[] {
  return getAllManualPosts();
}

export function getPostBySlug(
  slug: string
): BlogPost | undefined {
  return getManualPostBySlug(slug);
}

export function getLatestPosts(): BlogPost[] {
  return getAllPosts().slice(0, 3);
}
