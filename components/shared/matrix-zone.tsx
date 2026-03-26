"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MatrixCanvas } from "./matrix-canvas"

gsap.registerPlugin(ScrollTrigger)

interface MatrixZoneProps {
  children: React.ReactNode
}

export function MatrixZone({ children }: MatrixZoneProps) {
  const zoneRef = useRef<HTMLDivElement>(null)
  const [clipProgress, setClipProgress] = useState(0)

  useEffect(() => {
    const zone = zoneRef.current
    if (!zone) return

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
  }, [])

  return (
    <>
      {/* Fixed canvas that covers viewport */}
      <MatrixCanvas clipProgress={clipProgress} />
      
      {/* Content zone - scrolls normally */}
      <div ref={zoneRef} className="relative z-10">
        {children}
      </div>
    </>
  )
}
