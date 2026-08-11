// Experience row index — a code-editor line-number gutter (thin rule, muted
// tabular numeral) instead of the magazine-folio square this used to be.
// Fits the "impressive frontend engineer" framing: it borrows the actual
// visual grammar of a source file, not a printed page.

"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

export function LineIndex({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(el, { opacity: 1 })
        return
      }
      gsap.set(el, { opacity: 0 })
      gsap.to(el, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=60",
          toggleActions: "play none none reverse",
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className="hidden border-r border-black/10 pr-3 pt-1 text-right md:block"
    >
      <span className="font-mono text-sm tabular-nums text-black/25">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  )
}
