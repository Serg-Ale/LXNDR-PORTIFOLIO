// PROTOTYPE — running vertical ticker, magazine-spine style. Evolves
// VerticalLabel from a static line into a continuous loop (duplicated copy,
// translated exactly one copy-height per cycle so the seam is invisible).
// Pauses via IntersectionObserver when off-screen and renders the original
// static single line under prefers-reduced-motion — no infinite loop should
// run somewhere the visitor can't see it or didn't ask for it.

"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useLoopWhileVisible } from "./use-loop-while-visible"

export function SpineTicker({ text, className = "" }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useLoopWhileVisible(containerRef, () => {
    gsap.set(trackRef.current, { yPercent: 0 })
    return gsap.to(trackRef.current, { yPercent: -50, duration: 16, ease: "none", repeat: -1 })
  })

  // Reads var(--chrome-ink-25) so the spine inverts along with the top bar
  // when the page scrolls into the black insert page (see the magazine
  // spread's dark-zone effect) — fallback keeps the original static shade.
  const label = (key: string) => (
    <span
      key={key}
      className="block select-none whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.5em] transition-colors duration-300"
      style={{ writingMode: "vertical-rl", color: "var(--chrome-ink-25, rgba(0,0,0,0.25))" }}
      aria-hidden="true"
    >
      {text}
    </span>
  )

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`} style={{ height: "44vh" }}>
      <div ref={trackRef} className="flex flex-col">
        {label("a")}
        {label("b")}
      </div>
    </div>
  )
}
