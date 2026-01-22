"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface BlogScrollProgressProps {
  containerRef: React.RefObject<HTMLElement | null>
}

export function BlogScrollProgress({ containerRef }: BlogScrollProgressProps) {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const scrollableHeight = docHeight - winHeight

      if (scrollableHeight > 0) {
        const percent = (scrollTop / scrollableHeight) * 100
        setScrollPercent(Math.min(100, Math.max(0, percent)))
      } else {
        setScrollPercent(0)
      }

      setIsScrolling(true)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: "-10% 0px -10% 0px",
      }
    )

    observerRef.current.observe(containerRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [containerRef])

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-1 z-50 transition-opacity duration-500 ease-in-out",
        isVisible && isScrolling ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="absolute inset-0 bg-border/50" />
      <div
        className="h-full bg-foreground origin-left"
        style={{ width: `${scrollPercent}%` }}
      />
    </div>
  )
}
