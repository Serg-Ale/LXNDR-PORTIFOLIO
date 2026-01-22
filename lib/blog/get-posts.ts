"use server"

import fs from "fs"
import path from "path"
import { parseFrontmatter } from "./parse-frontmatter"
import { calculateReadingTime } from "./reading-time"
import type { Post } from "./types"

const postsDirectory = path.join(process.cwd(), "content/posts")
const draftsDirectory = path.join(process.cwd(), "content/drafts")

export async function getAllPosts(
  locale: "en" | "pt-BR",
  includeDrafts = false
): Promise<Post[]> {
  const directories = [postsDirectory]
  
  // Em desenvolvimento, incluir drafts
  if (includeDrafts && process.env.NODE_ENV === "development") {
    directories.push(draftsDirectory)
  }

  const posts: Post[] = []

  for (const directory of directories) {
    if (!fs.existsSync(directory)) {
      continue
    }

    const subdirectories = fs.readdirSync(directory).filter((entry) => {
      const fullPath = path.join(directory, entry)
      return fs.statSync(fullPath).isDirectory()
    })

    for (const subdir of subdirectories) {
      const filePath = path.join(directory, subdir, `index.${locale}.mdx`)

      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8")
        const { frontmatter, content } = parseFrontmatter(fileContent)

        const readingTime =
          frontmatter.readingTime || calculateReadingTime(content)

        posts.push({
          ...frontmatter,
          content,
          readingTime,
        })
      }
    }
  }

  // Ordenar por data (mais recente primeiro)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function getPostBySlug(
  slug: string,
  locale: "en" | "pt-BR"
): Promise<Post | null> {
  const directories = [postsDirectory, draftsDirectory]

  for (const directory of directories) {
    if (!fs.existsSync(directory)) {
      continue
    }

    const filePath = path.join(directory, slug, `index.${locale}.mdx`)

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8")
      const { frontmatter, content } = parseFrontmatter(fileContent)

      const readingTime =
        frontmatter.readingTime || calculateReadingTime(content)

      return {
        ...frontmatter,
        content,
        readingTime,
      }
    }
  }

  return null
}

export async function getAllTags(locale: "en" | "pt-BR"): Promise<string[]> {
  const posts = await getAllPosts(locale, true)
  const tagsSet = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag))
  })

  return Array.from(tagsSet).sort()
}

export async function getPostsByTag(
  tag: string,
  locale: "en" | "pt-BR"
): Promise<Post[]> {
  const posts = await getAllPosts(locale)
  return posts.filter((post) => post.tags.includes(tag))
}
