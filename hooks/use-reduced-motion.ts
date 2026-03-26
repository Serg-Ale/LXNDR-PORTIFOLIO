"use client"

import { useState, useEffect } from "react"

/**
 * Hook that detects if the user prefers reduced motion
 * 
 * Uses the `prefers-reduced-motion` media query to respect user preferences
 * for reduced animations (accessibility feature for users with vestibular disorders)
 * 
 * @returns boolean - true if user prefers reduced motion, false otherwise
 * 
 * @example
 * ```tsx
 * const prefersReducedMotion = useReducedMotion()
 * 
 * useEffect(() => {
 *   if (prefersReducedMotion) return // Skip animation
 *   
 *   gsap.from(element, { opacity: 0, y: 30 })
 * }, [prefersReducedMotion])
 * ```
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener("change", handler)
    
    return () => {
      mediaQuery.removeEventListener("change", handler)
    }
  }, [])

  return prefersReducedMotion
}
