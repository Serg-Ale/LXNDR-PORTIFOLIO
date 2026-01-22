import matter from "gray-matter"
import type { PostFrontmatter } from "./types"

export function parseFrontmatter(fileContent: string) {
  const { data, content } = matter(fileContent)
  
  return {
    frontmatter: data as PostFrontmatter,
    content,
  }
}
