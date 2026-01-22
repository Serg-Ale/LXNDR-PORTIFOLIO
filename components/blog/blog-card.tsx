"use client"

import { useRef } from "react"
import { Link } from "@/i18n/routing"
import type { Post } from "@/lib/blog"

function formatDate(dateString: string, locale: "en" | "pt-BR"): string {
  const date = new Date(dateString)
  
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

interface BlogCardProps {
  post: Post
  locale: "en" | "pt-BR"
}

export function BlogCard({ post, locale }: BlogCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)

  return (
    <Link
      href={`/blog/${post.slug}`}
      ref={cardRef}
      className="block group"
    >
      <article className="border-4 border-foreground bg-background p-6 md:p-8 transition-all duration-300 hover:shadow-brutalist hover:-translate-y-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs md:text-sm font-bold uppercase px-3 py-1 border-2 border-foreground bg-foreground/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-bebas font-bold mb-3 group-hover:text-foreground/70 transition-colors">
          {post.title}
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3">
          {post.description}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-muted-foreground">
          <time dateTime={post.date}>
            {formatDate(post.date, locale)}
          </time>
          <span className="text-foreground">•</span>
          <span>{post.readingTime} min read</span>
        </div>
      </article>
    </Link>
  )
}
