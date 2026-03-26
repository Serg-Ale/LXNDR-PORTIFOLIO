"use client"

import { useTranslations } from "next-intl"

interface SkipLinkProps {
  targetId?: string
  className?: string
}

/**
 * SkipLink Component
 * 
 * Accessibility component that allows keyboard users to skip
 * navigation and jump directly to main content.
 * 
 * - Hidden by default (sr-only)
 * - Becomes visible on focus
 * - Brutalist styling when visible
 * 
 * @example
 * ```tsx
 * <SkipLink targetId="main-content" />
 * <nav>...</nav>
 * <main id="main-content">...</main>
 * ```
 */
export function SkipLink({ targetId = "main-content", className = "" }: SkipLinkProps) {
  const t = useTranslations("accessibility")

  return (
    <a
      href={`#${targetId}`}
      className={`
        sr-only focus:not-sr-only
        focus:absolute focus:top-4 focus:left-4 focus:z-[100]
        focus:px-6 focus:py-3
        focus:bg-foreground focus:text-background
        focus:font-bold focus:text-sm focus:uppercase
        focus:border-4 focus:border-foreground
        focus:shadow-brutalist
        focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground
        transition-all
        ${className}
      `}
    >
      {t("skipToContent")}
    </a>
  )
}
