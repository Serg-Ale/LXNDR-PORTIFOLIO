"use client"

import { useEffect, useRef } from "react"
import Masonry from "react-masonry-css"
import gsap from "gsap"
import { BlogCard } from "./blog-card"
import type { Post } from "@/lib/blog"

interface BlogMasonryProps {
  posts: Post[]
  locale: "en" | "pt-BR"
}

const breakpointColumns = {
  default: 3,
  1280: 3,
  1024: 2,
  768: 1,
}

export function BlogMasonry({ posts, locale }: BlogMasonryProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(".blog-card-item", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      })
    }, containerRef)

    return () => ctx.revert()
  }, [posts])

  if (posts.length === 0) {
    return null
  }

  return (
    <div ref={containerRef} className="theme-transition-rgb">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
      >
        {posts.map((post) => (
          <div key={post.slug} className="blog-card-item mb-6">
            <BlogCard post={post} locale={locale} />
          </div>
        ))}
      </Masonry>
    </div>
  )
}
