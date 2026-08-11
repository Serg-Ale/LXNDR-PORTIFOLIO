// PROTOTYPE — cursor-follow folio badge for the Projects list. A secondary,
// recurring interaction (not a second focal moment): it just makes the "0X /
// project" scanning cue follow the reader's attention instead of sitting
// fixed in the row. Desktop / fine-pointer only — the static folio numbers
// already printed in each row do this job on touch, unassisted.

"use client"

import { useEffect, useRef, useState, type RefObject } from "react"
import gsap from "gsap"
import { prefersReducedMotion } from "@/lib/gsap-config"

export function ProjectFolioFollower({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>
}) {
  const badgeRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    setEnabled(window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion())
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const badge = badgeRef.current
    if (!enabled || !container || !badge) return

    const quickX = gsap.quickTo(badge, "x", { duration: 0.5, ease: "power3" })
    const quickY = gsap.quickTo(badge, "y", { duration: 0.5, ease: "power3" })

    const handleMove = (e: MouseEvent) => {
      quickX(e.clientX + 18)
      quickY(e.clientY + 18)

      const rows = Array.from(container.querySelectorAll<HTMLElement>("[data-project-row]"))
      const idx = rows.findIndex((row) => {
        const r = row.getBoundingClientRect()
        return e.clientY >= r.top && e.clientY <= r.bottom
      })
      if (idx >= 0 && numberRef.current) {
        numberRef.current.textContent = String(idx + 1).padStart(2, "0")
      }
    }

    const handleEnter = () => gsap.to(badge, { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" })
    const handleLeave = () => gsap.to(badge, { opacity: 0, scale: 0.6, duration: 0.2, ease: "power2.in" })

    gsap.set(badge, { opacity: 0, scale: 0.6 })
    container.addEventListener("mousemove", handleMove)
    container.addEventListener("mouseenter", handleEnter)
    container.addEventListener("mouseleave", handleLeave)

    return () => {
      container.removeEventListener("mousemove", handleMove)
      container.removeEventListener("mouseenter", handleEnter)
      container.removeEventListener("mouseleave", handleLeave)
    }
  }, [enabled, containerRef])

  if (!enabled) return null

  return (
    <div
      ref={badgeRef}
      className="pointer-events-none fixed left-0 top-0 z-30 flex items-center gap-1.5 border border-black bg-white px-2.5 py-1.5 will-change-transform"
      aria-hidden="true"
    >
      <span ref={numberRef} className="font-bebas text-lg leading-none tracking-wide text-black">
        01
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-black/50">project</span>
    </div>
  )
}
