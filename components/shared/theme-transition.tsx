"use client"

import { useRef } from "react"
import { useThemeGlitch } from "@/hooks/use-theme-glitch"

interface ThemeTransitionProps {
  children: React.ReactNode
  className?: string
}

export function ThemeTransition({ children, className = "" }: ThemeTransitionProps) {
  const { containerRef, overlayRef } = useThemeGlitch()

  return (
    <div ref={containerRef} className={`theme-transition-wrapper ${className}`}>
      {children}
      <div
        ref={overlayRef}
        className="theme-glitch-overlay pointer-events-none"
      />
    </div>
  )
}
