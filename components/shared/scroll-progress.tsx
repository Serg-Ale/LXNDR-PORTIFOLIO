"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useSectionBackground } from "@/lib/use-section-background"
import { getContrastColor } from "@/lib/color-utils"

type ScrollProgressProps = {
  sections?: string[]
}

export function ScrollProgress({ sections }: ScrollProgressProps) {
  const [scrollPercent, setScrollPercent] = useState(0)
  const sectionBg = useSectionBackground(0) // 0 pois progress bar está no topo
  const progressColor = getContrastColor(sectionBg.backgroundColor)

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
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-1 z-[60]"
      )}
    >
      <div className="absolute inset-0 bg-border/20 transition-colors duration-300" />
      <div
        className="h-full origin-left transition-colors duration-300"
        style={{ 
          width: `${scrollPercent}%`,
          backgroundColor: progressColor
        }}
      />
    </div>
  )
}
