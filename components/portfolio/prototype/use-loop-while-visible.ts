// PROTOTYPE — shared shape behind two separate ambient loops (the spine
// ticker's scroll and the hero photo's scanline): start a GSAP loop when the
// target enters the viewport, kill it when it leaves, never start it at all
// under prefers-reduced-motion. Extracted once a second near-identical copy
// showed up — see AGENTS.md's own "duplicated twice, extract" bar.

"use client"

import { useEffect, useRef, type RefObject } from "react"
import gsap from "gsap"
import { prefersReducedMotion } from "@/lib/gsap-config"

type Loopable = gsap.core.Tween | gsap.core.Timeline

/**
 * Runs a GSAP loop only while `targetRef`'s element is on screen. `factory`
 * builds the loop fresh on each start (a killed tween can't be restarted) —
 * it doesn't need to be memoized by the caller, the latest version is always
 * used, so passing a fresh inline arrow function every render is fine.
 */
export function useLoopWhileVisible(targetRef: RefObject<Element | null>, factory: () => Loopable) {
  const factoryRef = useRef(factory)
  factoryRef.current = factory

  useEffect(() => {
    const el = targetRef.current
    if (!el || prefersReducedMotion()) return

    let loop: Loopable | null = null
    const start = () => {
      if (loop) return
      loop = factoryRef.current()
    }
    const stop = () => {
      loop?.kill()
      loop = null
    }

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      stop()
    }
  }, [targetRef])
}
