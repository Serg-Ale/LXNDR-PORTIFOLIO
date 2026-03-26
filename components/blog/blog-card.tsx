"use client"

import { useEffect, useRef } from "react"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
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
  const prefersReducedMotion = useReducedMotion()
  const t = useTranslations("blog")

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
      })
    }, cardRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <Link
      href={`/blog/${post.slug}`}
      ref={cardRef}
      className="block group theme-transition-rgb"
    >
      <article className="border-4 border-border bg-card text-card-foreground p-6 md:p-8 transition-all duration-300 hover:shadow-brutalist hover:-translate-y-1 hover-glow h-full data-magnetic focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus:outline-none">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs md:text-sm font-bold uppercase px-3 py-1 border-2 border-border bg-accent text-accent-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="text-2xl md:text-4xl font-bebas font-bold mb-3 group-hover:text-primary/80 transition-colors">
          {post.title}
        </h2>

        <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-3">
          {post.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-muted-foreground">
          <time dateTime={post.date}>
            {formatDate(post.date, locale)}
          </time>
          <span className="text-foreground" aria-hidden="true">•</span>
          <span>{t("readingTime", { minutes: post.readingTime })}</span>
        </div>
      </article>
    </Link>
  )
}
