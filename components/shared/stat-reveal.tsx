"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

export interface StatItem {
  value: string
  label: string
}

interface StatRevealProps {
  stats: StatItem[]
  className?: string
  triggerOnScroll?: boolean
}

export function StatReveal({
  stats,
  className = "",
  triggerOnScroll = true,
}: StatRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduceMotion = prefersReducedMotion()

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(cardsRef.current, { opacity: 1, y: 0 })
        return
      }

      // Set initial state
      gsap.set(cardsRef.current, { opacity: 0, y: 40 })

      if (triggerOnScroll) {
        // Scroll-triggered stagger animation
        gsap.to(cardsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
      } else {
        // Immediate stagger animation (for use within pinned sections)
        gsap.to(cardsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        })
      }
    }, container)

    return () => ctx.revert()
  }, [triggerOnScroll])

  return (
    <div
      ref={containerRef}
      className={`flex flex-wrap gap-4 md:gap-6 ${className}`}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          ref={(el) => {
            cardsRef.current[index] = el
          }}
          className="bg-background/10 backdrop-blur-sm border-4 border-background/30 px-4 py-3 md:px-6 md:py-4 min-w-[120px] md:min-w-[140px]"
        >
          <p className="text-2xl md:text-4xl font-black tracking-tight font-bebas">
            {stat.value}
          </p>
          <p className="text-xs md:text-sm font-semibold tracking-wider opacity-70 font-mono uppercase">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}
