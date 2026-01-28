"use client"

import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import type { Post } from "@/lib/blog"

interface BlogPostHeaderProps {
  post: Post
  locale: "en" | "pt-BR"
}

function formatDate(dateString: string, locale: "en" | "pt-BR"): string {
  const date = new Date(dateString)
  
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function BlogPostHeader({ post, locale }: BlogPostHeaderProps) {
  const t = useTranslations("blog")

  return (
    <header className="mb-12 md:mb-16 theme-transition-rgb">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm md:text-base font-bold mb-8 hover:opacity-70 transition-opacity"
        data-magnetic
      >
        {t("backToBlog")}
      </Link>

      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs md:text-sm font-bold uppercase px-4 py-2 border-2 border-border bg-accent text-accent-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-5xl md:text-8xl font-bebas font-black mb-6 leading-tight">
        {post.title}
      </h1>

      <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed">
        {post.description}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-muted-foreground border-t-2 border-border pt-6">
        <div>
          <span className="font-bold">{t("publishedOn")}:</span>{" "}
          <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
        </div>
        <span className="text-foreground">•</span>
        <div>
          <span className="font-bold">{t("readingTime", { minutes: post.readingTime })}</span>
        </div>
        <span className="text-foreground">•</span>
        <div>
          <span className="font-bold">By {post.author}</span>
        </div>
      </div>
    </header>
  )
}
