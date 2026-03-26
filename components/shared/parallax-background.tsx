"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { PARALLAX_SPEEDS } from "@/lib/gsap-parallax"

gsap.registerPlugin(ScrollTrigger)

interface BackgroundLayer {
  id: string
  speed: number
  opacity?: number
  className?: string
}

interface ParallaxBackgroundProps {
  layers?: BackgroundLayer[]
  className?: string
  children?: React.ReactNode
}

/**
 * ParallaxBackground - Multi-layer background with parallax effect
 * 
 * @example
 * <ParallaxBackground layers={[
 *   { id: "layer-1", speed: 0.2, opacity: 0.1 },
 *   { id: "layer-2", speed: 0.4, opacity: 0.2 }
 * ]}>
 *   <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
 * </ParallaxBackground>
 */
export function ParallaxBackground({
  layers,
  className = "",
  children,
}: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        return
      }

      // Animate each layer with its own speed
      layers?.forEach((layer) => {
        const layerElement = layerRefs.current.get(layer.id)
        if (!layerElement) return

        const movement = 100 * (1 - layer.speed)

        gsap.to(layerElement, {
          y: movement,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      })
    }, container)

    return () => ctx.revert()
  }, [layers])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {layers ? (
        layers.map((layer) => (
          <div
            key={layer.id}
            ref={(el) => {
              if (el) layerRefs.current.set(layer.id, el)
            }}
            className={`parallax-layer absolute inset-0 ${layer.className || ""}`}
            style={{ opacity: layer.opacity }}
          >
            {/* Layer content can be passed via className or children */}
          </div>
        ))
      ) : (
        <div
          ref={(el) => {
            if (el) layerRefs.current.set("default", el)
          }}
          className="parallax-layer absolute inset-0"
        >
          {children}
        </div>
      )}
    </div>
  )
}

/**
 * SimpleParallaxBackground - Single layer with simple parallax
 */
export function SimpleParallaxBackground({
  speed = PARALLAX_SPEEDS.slow,
  opacity = 0.1,
  className = "",
  children,
}: {
  speed?: number
  opacity?: number
  className?: string
  children: React.ReactNode
}) {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        return
      }

      const movement = 100 * (1 - speed)

      gsap.to(layer, {
        y: movement,
        ease: "none",
        scrollTrigger: {
          trigger: layer.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, layer)

    return () => ctx.revert()
  }, [speed])

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        ref={layerRef}
        className="parallax-layer absolute inset-0"
        style={{ opacity }}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * BackgroundBlobs - Animated blob shapes for backgrounds
 */
export function BackgroundBlobs({
  count = 2,
  speed = PARALLAX_SPEEDS.verySlow,
  opacity = 0.1,
  className = "",
}: {
  count?: number
  speed?: number
  opacity?: number
  className?: string
}) {
  const positions = [
    { top: "25%", left: "25%", width: "24rem", height: "24rem" },
    { bottom: "25%", right: "25%", width: "32rem", height: "32rem" },
    { top: "50%", left: "50%", width: "28rem", height: "28rem" },
  ]

  return (
    <SimpleParallaxBackground speed={speed} opacity={opacity} className={className}>
      {positions.slice(0, count).map((pos, index) => (
        <div
          key={index}
          className="absolute bg-background/20 rounded-full blur-3xl"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.bottom ? undefined : pos.right,
            bottom: pos.bottom,
            width: pos.width,
            height: pos.height,
          }}
        />
      ))}
    </SimpleParallaxBackground>
  )
}

/**
 * GradientParallaxBackground - Gradient background with parallax
 */
export function GradientParallaxBackground({
  speed = PARALLAX_SPEEDS.slow,
  from = "top",
  colors = ["rgba(0,0,0,0.1)", "transparent"],
  className = "",
}: {
  speed?: number
  from?: "top" | "bottom" | "left" | "right"
  colors?: [string, string]
  className?: string
}) {
  const direction = {
    top: "to bottom",
    bottom: "to top",
    left: "to right",
    right: "to left",
  }

  return (
    <SimpleParallaxBackground speed={speed} className={className}>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${direction[from]}, ${colors[0]}, ${colors[1]})`,
        }}
      />
    </SimpleParallaxBackground>
  )
}
