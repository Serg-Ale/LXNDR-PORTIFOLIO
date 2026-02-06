"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

// Typography style presets for expressive design
export type TypographyStyle =
  | "hero"           // Massive, bold, tight tracking
  | "whisper"        // Light, wide tracking, muted
  | "italic"         // Dramatic italic slant
  | "italic-extreme" // Extreme italic for drama
  | "outlined"       // Stroke only, no fill
  | "outlined-thick" // Heavy stroke
  | "technical"      // Monospace, code-like
  | "highlight"      // Inverted block with rotation
  | "highlight-large"// Large highlight block
  | "condensed"      // Horizontally compressed
  | "extended"       // Horizontally stretched
  | "scream"         // Ultra bold, slightly taller
  | "small-caps"     // Elegant small caps
  | "shadow"         // Text with brutalist shadow
  | "glow"           // Neon glow effect
  | "strike"         // Strikethrough for effect
  | "underline"      // Thick underline
  | "rotate"         // Slight rotation
  | "rotate-medium"  // More rotation

export interface ManifestoWord {
  text: string
  position?: "left" | "center" | "right" | "indent-1" | "indent-2" | "indent-3"
  font?: "bebas" | "space" | "mono"
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  weight?: "thin" | "light" | "normal" | "medium" | "bold" | "black"
  tracking?: "tight" | "normal" | "wide" | "ultra-wide"
  style?: TypographyStyle | TypographyStyle[] // Can combine styles
  transform?: "uppercase" | "lowercase" | "capitalize" | "none"
  opacity?: "full" | "muted" | "faded"
  // Legacy support
  emphasis?: "normal" | "highlight" | "outlined"
}

interface ScrollTextRevealProps {
  words: ManifestoWord[]
  className?: string
  scrollLength?: number // in vh units, default 100
  pinned?: boolean
}

export function ScrollTextReveal({
  words,
  className = "",
  scrollLength = 100,
  pinned = true,
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.innerWidth < 768
    const reduceMotion = prefersReducedMotion()

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(wordsRef.current, { opacity: 1, y: 0 })
        return
      }

      if (isMobile) {
        // Mobile: simpler animations without pinning
        wordsRef.current.forEach((word) => {
          if (!word) return

          gsap.from(word, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: word,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          })
        })
      } else {
        // Desktop: pinned scroll-driven animation with dramatic entrances
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: `+=${scrollLength}%`,
            scrub: 1,
            pin: pinned,
            anticipatePin: 1,
          },
        })

        // Set initial state
        gsap.set(wordsRef.current, { opacity: 0, y: 80, scale: 0.95 })

        // Animate each word with unique entrance based on style
        wordsRef.current.forEach((word, index) => {
          if (!word) return

          const hasHighlight = word.dataset.style?.includes("highlight")
          const hasItalic = word.dataset.style?.includes("italic")
          const hasOutlined = word.dataset.style?.includes("outlined")
          const delay = index * 0.12

          // Base animation
          tl.to(
            word,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.25,
              ease: "power2.out",
            },
            delay
          )

          // Special effects for highlight words
          if (hasHighlight) {
            tl.from(
              word,
              {
                rotation: -5,
                scale: 0.8,
                duration: 0.3,
                ease: "back.out(2)",
              },
              delay
            )
          }

          // Italic words slide in from the side
          if (hasItalic) {
            tl.from(
              word,
              {
                x: -50,
                duration: 0.25,
                ease: "power2.out",
              },
              delay
            )
          }

          // Outlined words have a draw-in effect (simulate)
          if (hasOutlined) {
            tl.from(
              word,
              {
                scale: 1.1,
                duration: 0.3,
                ease: "power1.out",
              },
              delay
            )
          }
        })
      }
    }, container)

    return () => ctx.revert()
  }, [scrollLength, pinned])

  const getFontClass = (font?: string) => {
    switch (font) {
      case "bebas":
        return "font-bebas"
      case "mono":
        return "font-mono"
      case "space":
      default:
        return "font-space"
    }
  }

  const getPositionClass = (position?: string) => {
    switch (position) {
      case "center":
        return "manifesto-center"
      case "right":
        return "manifesto-right"
      case "indent-1":
        return "manifesto-left manifesto-indent-1"
      case "indent-2":
        return "manifesto-left manifesto-indent-2"
      case "indent-3":
        return "manifesto-left manifesto-indent-3"
      case "left":
      default:
        return "manifesto-left"
    }
  }

  const getSizeClass = (size?: string) => {
    switch (size) {
      case "xs":
        return "text-[clamp(0.75rem,2vw,1.25rem)]"
      case "sm":
        return "text-[clamp(1rem,3vw,2rem)]"
      case "md":
        return "text-[clamp(1.5rem,5vw,4rem)]"
      case "lg":
        return "text-[clamp(2.5rem,8vw,6rem)]"
      case "xl":
        return "text-[clamp(3rem,10vw,8rem)]"
      case "2xl":
        return "text-[clamp(4rem,12vw,10rem)]"
      case "3xl":
        return "text-[clamp(5rem,15vw,12rem)]"
      default:
        return "text-[clamp(1.5rem,5vw,4rem)]"
    }
  }

  const getWeightClass = (weight?: string) => {
    switch (weight) {
      case "thin":
        return "typo-thin"
      case "light":
        return "typo-light"
      case "medium":
        return "typo-medium"
      case "bold":
        return "typo-bold"
      case "black":
        return "typo-black"
      default:
        return ""
    }
  }

  const getTrackingClass = (tracking?: string) => {
    switch (tracking) {
      case "tight":
        return "typo-tight"
      case "wide":
        return "typo-wide"
      case "ultra-wide":
        return "typo-ultra-wide"
      default:
        return ""
    }
  }

  const getStyleClasses = (style?: TypographyStyle | TypographyStyle[]) => {
    if (!style) return ""

    const styles = Array.isArray(style) ? style : [style]
    return styles
      .map((s) => {
        switch (s) {
          case "hero":
            return "typo-hero"
          case "whisper":
            return "typo-whisper"
          case "italic":
            return "typo-italic"
          case "italic-extreme":
            return "typo-italic-extreme"
          case "outlined":
            return "typo-outlined"
          case "outlined-thick":
            return "typo-outlined-thick"
          case "technical":
            return "typo-technical"
          case "highlight":
            return "typo-highlight-block"
          case "highlight-large":
            return "typo-highlight-block-large"
          case "condensed":
            return "typo-condensed"
          case "extended":
            return "typo-extended"
          case "scream":
            return "typo-scream"
          case "small-caps":
            return "typo-small-caps"
          case "shadow":
            return "typo-shadow"
          case "glow":
            return "typo-glow"
          case "strike":
            return "typo-strike"
          case "underline":
            return "typo-underline-thick"
          case "rotate":
            return "typo-rotate-slight"
          case "rotate-medium":
            return "typo-rotate-medium"
          default:
            return ""
        }
      })
      .join(" ")
  }

  const getTransformClass = (transform?: string) => {
    switch (transform) {
      case "uppercase":
        return "typo-uppercase"
      case "lowercase":
        return "typo-lowercase"
      case "capitalize":
        return "typo-capitalize"
      default:
        return ""
    }
  }

  const getOpacityClass = (opacity?: string) => {
    switch (opacity) {
      case "muted":
        return "typo-muted"
      case "faded":
        return "typo-faded"
      default:
        return ""
    }
  }

  // Legacy emphasis support (backwards compatible)
  const getLegacyEmphasisClass = (emphasis?: string) => {
    switch (emphasis) {
      case "highlight":
        return "typo-highlight-block"
      case "outlined":
        return "typo-outlined"
      default:
        return ""
    }
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-screen flex flex-col justify-center px-6 md:px-12 ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full space-y-2 md:space-y-4">
        {words.map((word, index) => {
          const styleString = Array.isArray(word.style)
            ? word.style.join(",")
            : word.style || ""

          return (
            <span
              key={index}
              ref={(el) => {
                wordsRef.current[index] = el
              }}
              data-style={styleString}
              className={`
                manifesto-word leading-none
                ${getFontClass(word.font)}
                ${getPositionClass(word.position)}
                ${getSizeClass(word.size)}
                ${getWeightClass(word.weight)}
                ${getTrackingClass(word.tracking)}
                ${getStyleClasses(word.style)}
                ${getTransformClass(word.transform)}
                ${getOpacityClass(word.opacity)}
                ${getLegacyEmphasisClass(word.emphasis)}
              `}
            >
              {word.text}
            </span>
          )
        })}
      </div>
    </div>
  )
}
