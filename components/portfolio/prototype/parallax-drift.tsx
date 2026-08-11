// PROTOTYPE — thin wrapper around the project's existing createParallax
// utility, for decorative furniture (the vertical spine label) that should
// drift slower than the page scrolls, giving a sense of depth.

"use client"

import { useEffect, useRef } from "react"
import { createParallax, prefersReducedMotion } from "@/lib/gsap-config"

export function ParallaxDrift({
  children,
  intensity = 0.15,
  className = "",
}: {
  children: React.ReactNode
  intensity?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    createParallax(el, intensity)
  }, [intensity])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
