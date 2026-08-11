"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MatrixCanvas } from "./matrix-canvas"

gsap.registerPlugin(ScrollTrigger)

interface MatrixZoneProps {
  children: React.ReactNode
  /** Forwarded to MatrixCanvas — see its prop docs. */
  canvasOpacity?: number
  canvasForceTheme?: "light" | "dark"
  /**
   * "reveal" (default) — the production behaviour: a dramatic clip-path
   * sweep gated to the first/last 15% of scroll *through* the zone. Reads
   * well on a tall, multi-section zone (Proof+Timeline+Skills) where that
   * 15% is still an early moment; on a short zone it delays the rain until
   * the visitor is most of the way through.
   * "ambient" — the rain is on once the zone actually dominates the
   * viewport, off once it's scrolled past. Gated on scroll position (zone's
   * top crossing well into the viewport), not mere intersection — the
   * canvas is a full-viewport fixed layer, so "any pixel of the zone
   * visible" would snap it on while the zone is still just barely peeking
   * in at the bottom, painting rain over whatever section is still mostly
   * on screen above it. Use this for a zone that should read as a constant
   * background texture once it's the thing you're looking at.
   */
  mode?: "reveal" | "ambient"
}

export function MatrixZone({ children, canvasOpacity, canvasForceTheme, mode = "reveal" }: MatrixZoneProps) {
  const zoneRef = useRef<HTMLDivElement>(null)
  const [clipProgress, setClipProgress] = useState(0)

  useEffect(() => {
    const zone = zoneRef.current
    if (!zone) return

    if (mode === "ambient") {
      const show = () => setClipProgress(1)
      const hide = () => setClipProgress(0)
      const trigger = ScrollTrigger.create({
        trigger: zone,
        // "top top" (not e.g. "top 15%"): the canvas is a full-viewport
        // fixed layer with no partial clip in ambient mode (clipProgress is
        // binary here), so it must only switch on once the zone's top edge
        // has reached the very top of the viewport — the point at which the
        // dark zone genuinely fills 100% of what's visible. Any earlier
        // threshold leaves a sliver of the section above still on screen
        // while the canvas paints black+rain over the whole viewport.
        start: "top top",
        end: "bottom top",
        onEnter: show,
        onEnterBack: show,
        onLeave: hide,
        onLeaveBack: hide,
      })
      return () => trigger.kill()
    }

    // Get nav height for offset (header is ~80px)
    const navHeight = 80

    // Ease-in-out cubic function for smooth transitions
    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const trigger = ScrollTrigger.create({
      trigger: zone,
      start: `top top+=${navHeight}`, // When header touches top of zone
      end: `bottom top+=${navHeight}`, // When header passes bottom of zone
      onUpdate: (self) => {
        const progress = self.progress

        // Reveal in the first 15% of scroll through the zone (more dramatic)
        if (progress < 0.15) {
          const revealProgress = progress / 0.15 // 0 → 1
          const easedProgress = easeInOutCubic(revealProgress)
          setClipProgress(easedProgress)
        }
        // Fully visible between 15% and 85%
        else if (progress < 0.85) {
          setClipProgress(1)
        }
        // Hide in the last 15% of scroll (more dramatic)
        else {
          const hideProgress = (progress - 0.85) / 0.15 // 0 → 1
          const easedProgress = easeInOutCubic(hideProgress)
          setClipProgress(1 - easedProgress)
        }
      },
      onLeave: () => {
        // Ensure hidden when leaving
        setClipProgress(0)
      },
      onLeaveBack: () => {
        // Ensure hidden when scrolling back up past the zone
        setClipProgress(0)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [mode])

  return (
    <>
      {/* Fixed canvas that covers viewport */}
      <MatrixCanvas clipProgress={clipProgress} opacity={canvasOpacity} forceTheme={canvasForceTheme} />
      
      {/* Content zone - scrolls normally */}
      <div ref={zoneRef} className="relative z-10">
        {children}
      </div>
    </>
  )
}
