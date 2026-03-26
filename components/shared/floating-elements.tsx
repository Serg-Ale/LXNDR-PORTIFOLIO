"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { prefersReducedMotion } from "@/lib/gsap-config"

interface FloatingElement {
  id: string
  size: number
  x: string
  y: string
  delay?: number
  duration?: number
  opacity?: number
}

interface FloatingElementsProps {
  count?: number
  className?: string
  elementClassName?: string
  shape?: "circle" | "square"
  size?: "sm" | "md" | "lg"
  speed?: "slow" | "medium" | "fast"
}

/**
 * FloatingElements - Decorative floating shapes with continuous animation
 * 
 * @example
 * <FloatingElements count={5} shape="circle" size="md" speed="slow" />
 */
export function FloatingElements({
  count = 3,
  className = "",
  elementClassName = "",
  shape = "circle",
  size = "md",
  speed = "slow",
}: FloatingElementsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Size mapping
  const sizeMap = {
    sm: { min: 4, max: 12 },
    md: { min: 16, max: 32 },
    lg: { min: 40, max: 80 },
  }

  // Speed mapping (duration in seconds)
  const speedMap = {
    slow: { min: 8, max: 15 },
    medium: { min: 5, max: 10 },
    fast: { min: 3, max: 6 },
  }

  // Generate random elements
  const elements: FloatingElement[] = Array.from({ length: count }, (_, i) => ({
    id: `floating-${i}`,
    size: gsap.utils.random(sizeMap[size].min, sizeMap[size].max, 4),
    x: `${gsap.utils.random(5, 95, 5)}%`,
    y: `${gsap.utils.random(10, 90, 5)}%`,
    delay: gsap.utils.random(0, 2, 0.2),
    duration: gsap.utils.random(speedMap[speed].min, speedMap[speed].max, 1),
    opacity: gsap.utils.random(0.1, 0.3, 0.05),
  }))

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        return
      }

      // Animate each floating element
      elements.forEach((element) => {
        const el = container.querySelector(`#${element.id}`)
        if (!el) return

        // Floating animation
        gsap.to(el, {
          y: `+=${gsap.utils.random(-50, 50)}`,
          x: `+=${gsap.utils.random(-50, 50)}`,
          rotation: gsap.utils.random(-15, 15),
          duration: element.duration,
          delay: element.delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })

        // Subtle scale pulsing
        gsap.to(el, {
          scale: gsap.utils.random(0.8, 1.2),
          duration: element.duration ? element.duration * 0.6 : 5,
          delay: element.delay,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })
    }, container)

    return () => ctx.revert()
  }, [elements])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {elements.map((element) => (
        <div
          key={element.id}
          id={element.id}
          className={`absolute ${shape === "circle" ? "rounded-full" : ""} ${elementClassName}`}
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            left: element.x,
            top: element.y,
            opacity: element.opacity,
            backgroundColor: "currentColor",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  )
}

/**
 * BrutalFloatingShapes - Brutalist-style floating geometric shapes
 */
export function BrutalFloatingShapes({
  count = 4,
  className = "",
}: {
  count?: number
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const shapes = ["square", "circle", "rectangle"]
  const colors = ["text-foreground/5", "text-foreground/10", "text-foreground/15"]

  const elements = Array.from({ length: count }, (_, i) => ({
    id: `brutal-shape-${i}`,
    shape: shapes[i % shapes.length],
    color: colors[i % colors.length],
    size: gsap.utils.random(60, 150, 10),
    x: `${gsap.utils.random(0, 100, 10)}%`,
    y: `${gsap.utils.random(0, 100, 10)}%`,
    rotation: gsap.utils.random(-45, 45, 15),
  }))

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        return
      }

      elements.forEach((element) => {
        const el = container.querySelector(`#${element.id}`)
        if (!el) return

        // Slow rotation
        gsap.to(el, {
          rotation: `+=${gsap.utils.random(360, 720)}`,
          duration: gsap.utils.random(20, 40),
          repeat: -1,
          ease: "none",
        })

        // Float up and down
        gsap.to(el, {
          y: `+=${gsap.utils.random(-100, 100)}`,
          duration: gsap.utils.random(10, 20),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })
    }, container)

    return () => ctx.revert()
  }, [elements])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {elements.map((element) => (
        <div
          key={element.id}
          id={element.id}
          className={`absolute ${element.color} ${
            element.shape === "circle" ? "rounded-full" : ""
          }`}
          style={{
            width: element.shape === "rectangle" ? `${element.size * 1.5}px` : `${element.size}px`,
            height: `${element.size}px`,
            left: element.x,
            top: element.y,
            transform: `rotate(${element.rotation}deg)`,
            border: "2px solid currentColor",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  )
}
