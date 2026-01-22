"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import SplitType from "split-type"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { staggerReveal, prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

interface SplitTextRevealProps {
  children: string
  className?: string
  delay?: number
  staggerFrom?: "start" | "center" | "end" | "random"
  triggerOnScroll?: boolean
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div"
}

export function SplitTextReveal({
  children,
  className = "",
  delay = 0,
  staggerFrom = "start",
  triggerOnScroll = false,
  as: Component = "div",
}: SplitTextRevealProps) {
  const textRef = useRef<HTMLElement>(null)
  const splitRef = useRef<SplitType | null>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    // Split text into characters
    splitRef.current = new SplitType(element, {
      types: "chars,words",
      tagName: "span",
    })

    const chars = splitRef.current.chars

    if (!chars) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(chars, { opacity: 1, y: 0 })
        return
      }

      // Set initial state
      gsap.set(chars, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        transformOrigin: "50% 50%",
      })

      if (triggerOnScroll) {
        // Animate on scroll into view
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: { each: 0.03, from: staggerFrom },
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        })
      } else {
        // Animate immediately with delay
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: { each: 0.03, from: staggerFrom },
          duration: 1.2,
          delay,
          ease: "expo.out",
        })
      }
    }, element)

    return () => {
      ctx.revert()
      splitRef.current?.revert()
    }
  }, [delay, staggerFrom, triggerOnScroll])

  return (
    <Component ref={textRef as any} className={`split-text ${className}`}>
      {children}
    </Component>
  )
}
