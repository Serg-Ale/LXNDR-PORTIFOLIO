import type { Post } from "./types"

export function getRelatedPosts(
  currentPost: Post,
  allPosts: Post[],
  limit = 3
): Post[] {
  return allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => ({
      ...post,
      score: post.tags.filter((tag) => currentPost.tags.includes(tag)).length,
    }))
    .filter((post) => post.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

export function formatDate(dateString: string, locale: "en" | "pt-BR"): string {
  const date = new Date(dateString)
  
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}
