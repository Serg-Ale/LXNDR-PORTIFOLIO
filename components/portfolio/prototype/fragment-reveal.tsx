// PROTOTYPE — shared motion primitive for the B1 magazine round.
// Fades/lifts each direct child in on scroll, staggered — used to break big
// paragraph blocks into typographically distinct beats instead of one wall
// of text. Follows the project's established gsap.context + ScrollTrigger +
// cleanup pattern (see AGENTS.md).

"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

export function FragmentReveal({
  children,
  className = "",
  stagger = 0.12,
  y = 28,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const items = Array.from(el.children)
      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 })
        return
      }
      gsap.set(items, { opacity: 0, y })
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=80",
          toggleActions: "play none none reverse",
        },
      })
    }, el)

    return () => ctx.revert()
  }, [stagger, y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
