// PROTOTYPE — ported from Aeon Audio's landing CTA (components/landing/
// KineticSpaceText.tsx, built by Thales). Same idea: letters scatter in 3D
// perspective (blurred, rotated, off-arc) and settle onto a curve as they
// scroll into view. Adapted to this repo's conventions — gsap.context +
// prefersReducedMotion() from lib/gsap-config, same prop shape as
// SplitTextReveal — instead of Aeon's loadGSAP()/matchMedia pattern.

"use client"

import { useEffect, useId, useMemo, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

type Variant = "cylinder" | "wave" | "flat"

const VARIANT_PRESETS: Record<Variant, { arcDegrees: number; radius: number; fromZ: number; rotateScatter: number; xScale?: number }> = {
  cylinder: { arcDegrees: 110, radius: 340, fromZ: -520, rotateScatter: 150 },
  wave: { arcDegrees: 26, radius: 640, fromZ: -360, rotateScatter: 90, xScale: 0.32 },
  flat: { arcDegrees: 8, radius: 1600, fromZ: -240, rotateScatter: 55 },
}

interface KineticTextProps {
  children: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
  variant?: Variant
  className?: string
  triggerOnScroll?: boolean
}

export function KineticText({
  children: text,
  as: Tag = "span",
  variant = "wave",
  className = "",
  triggerOnScroll = true,
}: KineticTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const reactId = useId()

  const letters = useMemo(
    () => text.split("").map((char, i) => ({ char: char === " " ? " " : char, key: `${reactId}-${i}` })),
    [text, reactId]
  )

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const ctx = gsap.context(() => {
      const letterEls = Array.from(wrapper.querySelectorAll<HTMLSpanElement>("[data-kinetic-letter]"))
      if (!letterEls.length) return

      if (prefersReducedMotion()) {
        gsap.set(letterEls, { opacity: 1, x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, scale: 1, filter: "blur(0px)" })
        return
      }

      // Scale offsets with font size so the effect doesn't push the first/
      // last letters off-screen at small viewport sizes.
      const fontSize = parseFloat(window.getComputedStyle(wrapper).fontSize) || 48
      const fontScale = fontSize / 48
      const base = VARIANT_PRESETS[variant]
      const preset = { ...base, radius: base.radius * fontScale, fromZ: base.fromZ * fontScale }
      const total = letterEls.length

      const rest = letterEls.map((_, i) => {
        const t = total > 1 ? i / (total - 1) : 0.5
        const angleDeg = (t - 0.5) * preset.arcDegrees
        const rad = (angleDeg * Math.PI) / 180
        const xScale = preset.xScale ?? 1
        return {
          x: Math.sin(rad) * preset.radius * xScale,
          z: preset.radius * (Math.cos(rad) - 1),
          rotateY: angleDeg,
        }
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top 78%",
          toggleActions: triggerOnScroll ? "play none none reverse" : "play none none none",
        },
      }).fromTo(
        letterEls,
        {
          opacity: 0,
          scale: 0.4,
          x: (i: number) => rest[i].x + (i % 2 === 0 ? -1 : 1) * 70 * fontScale,
          y: () => gsap.utils.random(-36, 36),
          z: preset.fromZ,
          rotateX: 68,
          rotateY: (i: number) => rest[i].rotateY + gsap.utils.random(-preset.rotateScatter, preset.rotateScatter),
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          x: (i: number) => rest[i].x,
          y: 0,
          z: (i: number) => rest[i].z,
          rotateX: 0,
          rotateY: (i: number) => rest[i].rotateY,
          filter: "blur(0px)",
          duration: 1.15,
          ease: "back.out(1.6)",
          stagger: { each: 0.045, from: "center" },
        }
      )
    }, wrapper)

    return () => ctx.revert()
  }, [text, variant, triggerOnScroll])

  return (
    <div ref={wrapperRef} className={className}>
      <Tag className="sr-only">{text}</Tag>
      <div aria-hidden="true" className="inline-block" style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
        {letters.map(({ char, key }) => (
          <span
            key={key}
            data-kinetic-letter
            style={{ display: "inline-block", whiteSpace: "pre", backfaceVisibility: "hidden", willChange: "transform, opacity, filter" }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}
