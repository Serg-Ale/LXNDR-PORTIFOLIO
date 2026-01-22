"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { rgbSplitEffect } from "@/lib/gsap-config"

interface GlitchTextProps {
  children: string
  className?: string
  delay?: number
  intensity?: number
  as?: "h1" | "h2" | "h3" | "p" | "span"
}

export function GlitchText({ 
  children, 
  className = "", 
  delay = 0, 
  intensity = 3,
  as: Component = "span" 
}: GlitchTextProps) {
  const textRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      // Initial entrance with glitch
      const tl = gsap.timeline({ delay })
      
      tl.from(element, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        ease: "power4.out",
      })
      
      // Add RGB split glitch effect
      tl.add(rgbSplitEffect(element, intensity), "-=0.3")
    }, element)

    return () => ctx.revert()
  }, [delay, intensity])

  // Add hover glitch effect
  const handleMouseEnter = () => {
    if (!textRef.current) return
    rgbSplitEffect(textRef.current, intensity * 0.7)
  }

  return (
    <Component
      ref={textRef as any}
      className={`glitch-text ${className}`}
      onMouseEnter={handleMouseEnter}
      data-text={children}
    >
      {children}
    </Component>
  )
}
