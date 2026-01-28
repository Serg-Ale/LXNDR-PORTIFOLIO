"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { rgbChannelSplit } from "@/lib/gsap-config"

interface GlitchTextProps {
  children: string
  className?: string
  delay?: number
  intensity?: number
  as?: "h1" | "h2" | "h3" | "p" | "span"
  evangelionMode?: boolean
}

export function GlitchText({ 
  children, 
  className = "", 
  delay = 0, 
  intensity = 3,
  as: Component = "span",
  evangelionMode = false
}: GlitchTextProps) {
  const textRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      if (evangelionMode) {
        // Evangelion-style entrance with RGB channel split
        gsap.set(element, { opacity: 0, y: 50 })
        
        const tl = gsap.timeline({ delay })
        tl.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power4.out",
        })
        .add(rgbChannelSplit(element, 0.5, intensity), "-=0.4")
      } else {
        // Original glitch effect
        const tl = gsap.timeline({ delay })
        
        tl.from(element, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: "power4.out",
        })
        
        tl.add(rgbChannelSplit(element, 0.3, intensity * 0.5), "-=0.3")
      }
    }, element)

    return () => ctx.revert()
  }, [delay, intensity, evangelionMode])

  // Enhanced hover glitch effect
  const handleMouseEnter = () => {
    if (!textRef.current) return
    if (evangelionMode) {
      rgbChannelSplit(textRef.current, 0.3, intensity)
    } else {
      rgbChannelSplit(textRef.current, 0.2, intensity * 0.7)
    }
  }

  return (
    <Component
      ref={textRef as any}
      className={`${evangelionMode ? 'evangelion-glitch' : 'glitch-text'} ${className}`}
      onMouseEnter={handleMouseEnter}
      data-text={children}
    >
      {children}
    </Component>
  )
}


