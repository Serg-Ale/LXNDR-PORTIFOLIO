export interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags: string[]
  author: string
  locale: "en" | "pt-BR"
  slug: string
  image?: string
  readingTime?: number
}

export interface Post extends PostFrontmatter {
  content: string
  readingTime: number
}

export interface TOCHeading {
  level: number
  text: string
  id: string
}
