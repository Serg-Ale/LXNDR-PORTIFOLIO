"use client"

import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import type { Post } from "@/lib/blog"
import { BrutalistBadge, BrutalistBadgeGroup } from "./brutalist-badge"

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
        ← {t("backToBlog")}
      </Link>

      {/* Brutalist Badges for Tags */}
      <BrutalistBadgeGroup className="mb-8">
        {post.tags.map((tag) => (
          <BrutalistBadge key={tag} size="sm">
            {tag}
          </BrutalistBadge>
        ))}
      </BrutalistBadgeGroup>

      <h1 className="text-5xl md:text-8xl font-bebas font-black mb-6 leading-tight hover:text-outlined-hover transition-all duration-300">
        {post.title}
      </h1>

      <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed font-medium">
        {post.description}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-muted-foreground border-t-[4px] border-foreground/20 pt-6">
        <div>
          <span className="font-bold">{t("publishedOn")}:</span>{" "}
          <time dateTime={post.date} className="font-mono">
            {formatDate(post.date, locale)}
          </time>
        </div>
        <span className="text-foreground font-bold">•</span>
        <div>
          <span className="font-bold">{t("readingTime", { minutes: post.readingTime })}</span>
        </div>
        <span className="text-foreground font-bold">•</span>
        <div>
          <span className="font-bold">By {post.author}</span>
        </div>
      </div>
    </header>
  )
}
