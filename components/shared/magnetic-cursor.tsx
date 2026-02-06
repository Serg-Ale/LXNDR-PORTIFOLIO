"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { prefersReducedMotion } from "@/lib/gsap-config"

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const isHoveringInteractive = useRef(false)

  // Check if element is interactive
  const isInteractiveElement = (element: Element): boolean => {
    return element.tagName === 'A' || element.tagName === 'BUTTON' || 
           element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || 
           element.tagName === 'SELECT' || element.hasAttribute('role') ||
           element.hasAttribute('onclick') || element.getAttribute('tabindex') === '0' ||
           element.hasAttribute('data-magnetic') ||
           element.closest('a') !== null || element.closest('button') !== null
  }

  useEffect(() => {
    // Don't run on mobile or if user prefers reduced motion
    if (typeof window === "undefined" || window.innerWidth < 768 || prefersReducedMotion()) {
      return
    }

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    // Smooth cursor follow with lerp for fluid movement
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const updateCursor = () => {
      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.15)
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.15)

      gsap.set(cursor, {
        x: cursorPos.current.x,
        y: cursorPos.current.y,
      })

      gsap.set(cursorDot, {
        x: mousePos.current.x,
        y: mousePos.current.y,
      })

      requestAnimationFrame(updateCursor)
    }

    // Handle hover effects for all interactive elements
    const handleInteractiveHover = (e: MouseEvent, isEntering: boolean) => {
      const element = e.target as Element
      if (!isInteractiveElement(element)) return

      isHoveringInteractive.current = isEntering
      
      if (isEntering) {
        // Expand outer ring on hover with smooth animation
        gsap.to(cursor, {
          scale: 1.8,
          duration: 0.3,
          ease: "power2.out",
        })
        
        gsap.to(cursorDot, {
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out",
        })
      } else {
        // Reset to normal size
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        
        gsap.to(cursorDot, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    // Enhanced magnetic attraction for data-magnetic elements
    const magneticElements = document.querySelectorAll("[data-magnetic]")
    
    magneticElements.forEach((el) => {
      const element = el as HTMLElement
      
      element.addEventListener("mouseenter", () => {
        // Extra scale for magnetic elements
        gsap.to(cursor, {
          scale: 2.5,
          duration: 0.4,
          ease: "power2.out",
        })
        
        gsap.to(cursorDot, {
          scale: 2,
          duration: 0.4,
          ease: "power2.out",
        })
      })

      element.addEventListener("mouseleave", () => {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        
        gsap.to(cursorDot, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        
        // Reset element position with elastic bounce
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        })
      })

      element.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        // Magnetic pull effect
        const pullStrength = element.classList.contains('hover-magnetic-enhanced') ? 0.5 : 0.3
        
        gsap.to(element, {
          x: x * pullStrength,
          y: y * pullStrength,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })

    // Start animation loop and event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", (e) => handleInteractiveHover(e, true))
    window.addEventListener("mouseout", (e) => handleInteractiveHover(e, false))
    requestAnimationFrame(updateCursor)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", (e) => handleInteractiveHover(e, true))
      window.removeEventListener("mouseout", (e) => handleInteractiveHover(e, false))
    }
  }, [])

  // Don't render on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <>
      {/* Outer ring - inverts colors using mix-blend-mode */}
      <div
        ref={cursorRef}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{ 
          width: '32px',
          height: '32px',
          border: '2px solid white',
          borderRadius: '50%',
          transform: "translate(-50%, -50%)",
          mixBlendMode: 'difference',
          transition: 'none',
        }}
      />
      {/* Inner dot - also inverts colors */}
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{ 
          width: '6px',
          height: '6px',
          backgroundColor: 'white',
          borderRadius: '50%',
          transform: "translate(-50%, -50%)",
          mixBlendMode: 'difference',
          transition: 'none',
        }}
      />
    </>
  )
}
