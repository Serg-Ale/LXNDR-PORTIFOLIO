"use server"

import fs from "fs"
import path from "path"
import { parseFrontmatter } from "./parse-frontmatter"
import { calculateReadingTime } from "./reading-time"
import { highlightCodeBlocks } from "./syntax-highlighter"
import type { Post } from "./types"

type Locale = "en" | "pt-BR"
type EditorialType = "essay" | "lab"

const essaysDirectory = path.join(process.cwd(), "content/essays")
const laboratoryDirectory = path.join(process.cwd(), "content/laboratory")
const legacyPostsDirectory = path.join(process.cwd(), "content/posts")
const draftsDirectory = path.join(process.cwd(), "content/drafts")

interface ContentDirectory {
  path: string
  defaultType: EditorialType
  isDraftDirectory: boolean
}

interface LoadOptions {
  includeDrafts?: boolean
  includeFallbackLocale?: boolean
  requestedLocale: Locale
}

const publishedDirectories: ContentDirectory[] = [
  {
    path: essaysDirectory,
    defaultType: "essay",
    isDraftDirectory: false,
  },
  {
    path: laboratoryDirectory,
    defaultType: "lab",
    isDraftDirectory: false,
  },
  {
    path: legacyPostsDirectory,
    defaultType: "essay",
    isDraftDirectory: false,
  },
]

const draftDirectories: ContentDirectory[] = [
  {
    path: draftsDirectory,
    defaultType: "essay",
    isDraftDirectory: true,
  },
]

function canIncludeDrafts(includeDrafts = false) {
  return includeDrafts && process.env.NODE_ENV === "development"
}

function readEntryDirectories(directory: string) {
  if (!fs.existsSync(directory)) {
    return []
  }

  return fs.readdirSync(directory).filter((entry) => {
    const fullPath = path.join(directory, entry)
    return fs.statSync(fullPath).isDirectory()
  })
}

function resolveLocaleFilePath({
  entryDirectory,
  requestedLocale,
  includeFallbackLocale,
}: {
  entryDirectory: string
  requestedLocale: Locale
  includeFallbackLocale: boolean
}) {
  const requestedPath = path.join(entryDirectory, `index.${requestedLocale}.mdx`)

  if (fs.existsSync(requestedPath)) {
    return {
      filePath: requestedPath,
      sourceLocale: requestedLocale,
      isLocaleFallback: false,
    }
  }

  if (includeFallbackLocale && requestedLocale === "en") {
    const fallbackPath = path.join(entryDirectory, "index.pt-BR.mdx")
    if (fs.existsSync(fallbackPath)) {
      return {
        filePath: fallbackPath,
        sourceLocale: "pt-BR" as const,
        isLocaleFallback: true,
      }
    }
  }

  return null
}

async function loadPostFromEntry({
  entryDirectory,
  slug,
  contentDirectory,
  options,
}: {
  entryDirectory: string
  slug: string
  contentDirectory: ContentDirectory
  options: LoadOptions
}): Promise<Post | null> {
  const resolvedLocaleFile = resolveLocaleFilePath({
    entryDirectory,
    requestedLocale: options.requestedLocale,
    includeFallbackLocale: options.includeFallbackLocale ?? true,
  })

  if (!resolvedLocaleFile) {
    return null
  }

  const fileContent = fs.readFileSync(resolvedLocaleFile.filePath, "utf8")
  const { frontmatter, content } = parseFrontmatter(fileContent)
  const readingTime = frontmatter.readingTime || calculateReadingTime(content)
  const highlightedContent = await highlightCodeBlocks(content)

  return {
    ...frontmatter,
    slug: frontmatter.slug || slug,
    locale: options.requestedLocale,
    sourceLocale: resolvedLocaleFile.sourceLocale,
    requestedLocale: options.requestedLocale,
    isLocaleFallback: resolvedLocaleFile.isLocaleFallback,
    contentType: frontmatter.contentType || contentDirectory.defaultType,
    draft: frontmatter.draft ?? contentDirectory.isDraftDirectory,
    content: highlightedContent,
    readingTime,
  }
}

async function loadAllPosts(options: LoadOptions): Promise<Post[]> {
  const contentDirectories = canIncludeDrafts(options.includeDrafts)
    ? [...publishedDirectories, ...draftDirectories]
    : [...publishedDirectories]

  const posts: Post[] = []

  for (const contentDirectory of contentDirectories) {
    const entryDirectories = readEntryDirectories(contentDirectory.path)

    for (const entrySlug of entryDirectories) {
      const entryDirectory = path.join(contentDirectory.path, entrySlug)
      const loadedPost = await loadPostFromEntry({
        entryDirectory,
        slug: entrySlug,
        contentDirectory,
        options,
      })

      if (loadedPost) {
        posts.push(loadedPost)
      }
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

function filterByContentType(posts: Post[], contentType: EditorialType) {
  return posts.filter((post) => post.contentType === contentType)
}

export async function getAllPosts(
  locale: Locale,
  includeDrafts = false
): Promise<Post[]> {
  return loadAllPosts({
    requestedLocale: locale,
    includeDrafts,
    includeFallbackLocale: true,
  })
}

export async function getAllEssays(
  locale: Locale,
  includeDrafts = false
): Promise<Post[]> {
  const posts = await loadAllPosts({
    requestedLocale: locale,
    includeDrafts,
    includeFallbackLocale: true,
  })

  return filterByContentType(posts, "essay")
}

export async function getAllLaboratoryEntries(
  locale: Locale,
  includeDrafts = false
): Promise<Post[]> {
  const posts = await loadAllPosts({
    requestedLocale: locale,
    includeDrafts,
    includeFallbackLocale: true,
  })

  return filterByContentType(posts, "lab")
}

export async function getPostBySlug(
  slug: string,
  locale: Locale
): Promise<Post | null> {
  const contentDirectories = canIncludeDrafts(true)
    ? [...publishedDirectories, ...draftDirectories]
    : [...publishedDirectories]

  for (const contentDirectory of contentDirectories) {
    const entryDirectory = path.join(contentDirectory.path, slug)
    if (!fs.existsSync(entryDirectory)) {
      continue
    }

    const loadedPost = await loadPostFromEntry({
      entryDirectory,
      slug,
      contentDirectory,
      options: {
        requestedLocale: locale,
        includeDrafts: canIncludeDrafts(true),
        includeFallbackLocale: true,
      },
    })

    if (loadedPost) {
      return loadedPost
    }
  }

  return null
}

export async function getEssayBySlug(
  slug: string,
  locale: Locale
): Promise<Post | null> {
  const post = await getPostBySlug(slug, locale)

  if (!post || post.contentType !== "essay") {
    return null
  }

  return post
}

export async function getLaboratoryEntryBySlug(
  slug: string,
  locale: Locale
): Promise<Post | null> {
  const post = await getPostBySlug(slug, locale)

  if (!post || post.contentType !== "lab") {
    return null
  }

  return post
}

export async function getAllTags(locale: Locale): Promise<string[]> {
  const posts = await getAllPosts(locale, false)
  const tagsSet = new Set<string>()

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagsSet.add(tag)
    })
  })

  return Array.from(tagsSet).sort()
}

export async function getTagsByContentType(
  locale: Locale,
  contentType: EditorialType
): Promise<string[]> {
  const posts = await loadAllPosts({
    requestedLocale: locale,
    includeDrafts: false,
    includeFallbackLocale: true,
  })

  const tagsSet = new Set<string>()

  posts
    .filter((post) => post.contentType === contentType)
    .forEach((post) => {
      post.tags.forEach((tag) => {
        tagsSet.add(tag)
      })
    })

  return Array.from(tagsSet).sort()
}

export async function getPostsByTag(
  tag: string,
  locale: Locale
): Promise<Post[]> {
  const posts = await getAllPosts(locale)
  return posts.filter((post) => post.tags.includes(tag))
}
