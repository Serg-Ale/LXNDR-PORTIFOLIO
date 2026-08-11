// PROTOTYPE — floating variant switcher for the /dev redesign exploration.
// Gated on NODE_ENV so a stray merge to main can't ship this bar to users.
// Delete this file (and the rest of components/portfolio/prototype/) once a
// variant wins and gets folded into the real page.

"use client"

import { useCallback, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

// Round 3: B1 (Poster) won round 2. This round refines B1 per feedback —
// broken paragraph blocks, fixed number contrast, richer projects, magazine-
// style text placement with GSAP reveals. Earlier rounds stay reachable by
// URL for reference but are dropped from the active switcher.
const VARIANTS = [
  { key: "b1", label: "B1 — baseline" },
  { key: "b1a", label: "B1a — Magazine spread" },
  { key: "b1b", label: "B1b — Collage" },
  { key: "b1c", label: "B1c — Editorial, calm" },
] as const

export function PrototypeSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const current = searchParams.get("variant") ?? "b1"
  const index = Math.max(0, VARIANTS.findIndex((v) => v.key === current))

  const go = useCallback(
    (nextIndex: number) => {
      const wrapped = (nextIndex + VARIANTS.length) % VARIANTS.length
      const params = new URLSearchParams(searchParams.toString())
      params.set("variant", VARIANTS[wrapped].key)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isTyping =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable
      if (isTyping) return
      if (e.key === "ArrowLeft") go(index - 1)
      if (e.key === "ArrowRight") go(index + 1)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [go, index])

  if (process.env.NODE_ENV === "production") return null

  return (
    <div
      className="fixed bottom-5 left-1/2 z-[999] flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-black/90 px-4 py-2.5 font-mono text-xs text-white shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur"
      role="toolbar"
      aria-label="Prototype variant switcher"
    >
      <button
        type="button"
        onClick={() => go(index - 1)}
        className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/15"
        aria-label="Previous variant"
      >
        ←
      </button>
      <span className="min-w-[9rem] text-center tracking-wide">
        {VARIANTS[index].label}
      </span>
      <button
        type="button"
        onClick={() => go(index + 1)}
        className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/15"
        aria-label="Next variant"
      >
        →
      </button>
    </div>
  )
}
