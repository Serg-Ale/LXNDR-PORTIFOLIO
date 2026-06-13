export interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  author: string
  locale: "en" | "pt-BR"
  slug: string
  contentType?: "essay" | "lab"
  draft?: boolean
  image?: string
  coverImage?: string
  readingTime?: number
}

export interface Post extends PostFrontmatter {
  content: string
  readingTime: number
  requestedLocale?: "en" | "pt-BR"
  sourceLocale?: "en" | "pt-BR"
  isLocaleFallback?: boolean
}

export interface TOCHeading {
  level: number
  text: string
  id: string
}
