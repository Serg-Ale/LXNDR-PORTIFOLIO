"use client"

import { useRef } from "react"
import { BlogScrollProgress } from "./blog-scroll-progress"

interface BlogArticleContainerProps {
  children: React.ReactNode
}

export function BlogArticleContainer({ children }: BlogArticleContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <BlogScrollProgress containerRef={containerRef} />
      <div ref={containerRef}>
        {children}
      </div>
    </>
  )
}
