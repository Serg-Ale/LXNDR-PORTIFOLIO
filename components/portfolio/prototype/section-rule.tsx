// PROTOTYPE — a horizontal rule that draws in (scaleX 0→1) as it enters the
// viewport, instead of a static border. Replaces the flat `border-t-2`
// dividers in B1a with something that carries the page's motion identity
// through every section transition, not just the hero.

"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

export function SectionRule({
  className = "",
  tone = "dark",
}: {
  className?: string
  /** "dark" = black rule for white pages (default); "light" = white/15 rule
   * for the black insert page. Kept as an explicit prop rather than letting
   * callers pass a conflicting bg-* class — Tailwind's cascade order isn't
   * guaranteed to respect className append order. */
  tone?: "dark" | "light"
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(el, { scaleX: 1 })
        return
      }
      gsap.set(el, { scaleX: 0, transformOrigin: "left center" })
      gsap.to(el, {
        scaleX: 1,
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=40",
          toggleActions: "play none none reverse",
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className={`h-[2px] w-full ${tone === "light" ? "bg-white/15" : "bg-black"} ${className}`}
    />
  )
}
