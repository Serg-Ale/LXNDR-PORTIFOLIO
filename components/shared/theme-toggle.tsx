"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setIsAnimating(true)
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
    setTimeout(() => setIsAnimating(false), 400)
  }

  if (!mounted) {
    return (
      <button
        className={cn(
          "w-12 h-12 md:w-14 md:h-14 border-2 border-foreground bg-transparent",
          "shadow-brutalist hover:shadow-brutalist-lg hover:-translate-y-0.5",
          "transition-all duration-200 flex items-center justify-center",
          className
        )}
        disabled
      >
        <div className="w-5 h-5 md:w-6 md:h-6 bg-foreground rounded-full" />
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "group relative w-12 h-12 md:w-14 md:h-14",
        "border-2 border-foreground bg-transparent",
        "shadow-brutalist hover:shadow-brutalist-lg",
        "hover:-translate-y-0.5 active:translate-y-0",
        "transition-all duration-200 ease-out overflow-hidden",
        isAnimating && "animate-pulse",
        className
      )}
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "w-5 h-5 md:w-6 md:h-6 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            isDark ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          )}
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="5" />
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="1" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
          </g>
        </svg>

        <svg
          viewBox="0 0 24 24"
          className={cn(
            "absolute w-5 h-5 md:w-6 md:h-6 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            isDark ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          )}
          fill="currentColor"
        >
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
        </svg>
      </div>
    </button>
  )
}
