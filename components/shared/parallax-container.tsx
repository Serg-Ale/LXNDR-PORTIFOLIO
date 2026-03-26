"use client"

import { useEffect, useRef, ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { PARALLAX_SPEEDS } from "@/lib/gsap-parallax"

gsap.registerPlugin(ScrollTrigger)

interface ParallaxContainerProps {
  children: ReactNode
  speed?: number
  scale?: { from: number; to: number }
  opacity?: { from: number; to: number }
  rotation?: number
  className?: string
  start?: string
  end?: string
  scrub?: boolean | number
  disabled?: boolean
}

/**
 * ParallaxContainer - Wraps children with parallax effects
 * 
 * @example
 * <ParallaxContainer speed={0.5}>
 *   <div>Content moves slower than scroll</div>
 * </ParallaxContainer>
 * 
 * @example
 * <ParallaxContainer scale={{ from: 0.9, to: 1.1 }}>
 *   <div>Content zooms during scroll</div>
 * </ParallaxContainer>
 */
export function ParallaxContainer({
  children,
  speed,
  scale,
  opacity,
  rotation,
  className = "",
  start = "top bottom",
  end = "bottom top",
  scrub = 1,
  disabled = false,
}: ParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || disabled) return

    const ctx = gsap.context(() => {
      // Skip animations if user prefers reduced motion
      if (prefersReducedMotion()) {
        gsap.set(container, { opacity: 1, scale: 1, y: 0, rotation: 0 })
        return
      }

      const animationProps: gsap.TweenVars = {
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start,
          end,
          scrub,
        },
      }

      // Parallax movement (Y-axis)
      if (speed !== undefined) {
        const movement = 100 * (1 - speed)
        animationProps.y = movement
      }

      // Scale animation
      if (scale) {
        gsap.fromTo(
          container,
          { scale: scale.from },
          { 
            scale: scale.to,
            ...animationProps,
          }
        )
      }

      // Opacity animation
      if (opacity) {
        gsap.set(container, { opacity: opacity.from })
        animationProps.opacity = opacity.to
      }

      // Rotation animation
      if (rotation) {
        animationProps.rotation = rotation
      }

      // Apply animation
      if (Object.keys(animationProps).length > 2) {
        gsap.to(container, animationProps)
      }
    }, container)

    return () => ctx.revert()
  }, [speed, scale, opacity, rotation, start, end, scrub, disabled])

  return (
    <div ref={containerRef} className={`parallax-layer ${className}`}>
      {children}
    </div>
  )
}

/**
 * Preset variants for common parallax effects
 */

export function ParallaxSlow({ children, className, ...props }: Omit<ParallaxContainerProps, "speed">) {
  return (
    <ParallaxContainer speed={PARALLAX_SPEEDS.slow} className={className} {...props}>
      {children}
    </ParallaxContainer>
  )
}

export function ParallaxFast({ children, className, ...props }: Omit<ParallaxContainerProps, "speed">) {
  return (
    <ParallaxContainer speed={PARALLAX_SPEEDS.fast} className={className} {...props}>
      {children}
    </ParallaxContainer>
  )
}

export function ParallaxZoomIn({ children, className, ...props }: Omit<ParallaxContainerProps, "scale">) {
  return (
    <ParallaxContainer 
      scale={{ from: 0.9, to: 1.1 }} 
      className={className} 
      {...props}
    >
      {children}
    </ParallaxContainer>
  )
}

export function ParallaxZoomOut({ children, className, ...props }: Omit<ParallaxContainerProps, "scale">) {
  return (
    <ParallaxContainer 
      scale={{ from: 1.1, to: 0.9 }} 
      className={className} 
      {...props}
    >
      {children}
    </ParallaxContainer>
  )
}

export function ParallaxFade({ children, className, ...props }: Omit<ParallaxContainerProps, "opacity">) {
  return (
    <ParallaxContainer 
      opacity={{ from: 1, to: 0 }} 
      className={className} 
      {...props}
    >
      {children}
    </ParallaxContainer>
  )
}
