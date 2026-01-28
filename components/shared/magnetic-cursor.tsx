"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { prefersReducedMotion } from "@/lib/gsap-config"

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const currentTheme = useRef<'light' | 'dark'>('light')

  // Get theme from element background color brightness
  const getThemeFromElement = (element: Element): 'light' | 'dark' => {
    let currentElement: Element | null = element
    let depth = 0
    
    // Go up the DOM tree to find a non-transparent background (max 5 levels)
    while (currentElement && depth < 5) {
      const computedStyle = window.getComputedStyle(currentElement)
      const backgroundColor = computedStyle.backgroundColor
      
      // Skip transparent backgrounds
      if (backgroundColor !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'transparent') {
        // Convert RGB/RGBA to brightness
        const rgb = backgroundColor.match(/\d+/g)
        if (rgb && rgb.length >= 3) {
          const [r, g, b] = rgb.map(Number)
          const brightness = (r * 299 + g * 587 + b * 114) / 1000
          
          // Add some tolerance for edge cases
          if (brightness > 140) return 'light'  // Lighter threshold
          if (brightness < 100) return 'dark'   // Darker threshold
          
          // For middle values, check if it's closer to white or black
          return brightness > 180 ? 'light' : 'dark'
        }
      }
      
      currentElement = currentElement.parentElement
      depth++
    }
    
    // If we can't find a background, check if we're in a dark section
    const section = element.closest('[data-theme]')
    if (section) {
      const theme = section.getAttribute('data-theme') as 'light' | 'dark'
      return theme || 'light'
    }
    
    return 'light' // Default fallback
  }

  // Update cursor colors based on theme with smooth transition
  const updateCursorColors = (theme: 'light' | 'dark') => {
    if (currentTheme.current === theme) return // No change needed

    currentTheme.current = theme
    const isDark = theme === 'dark'
    
    // Update main cursor with smooth transition
    gsap.to(cursorRef.current, {
      borderColor: isDark ? '#ffffff' : '#000000',
      duration: 0.3,
      ease: "power2.out"
    })
    
    // Update dot cursor with smooth transition
    gsap.to(cursorDotRef.current, {
      backgroundColor: isDark ? '#ffffff' : '#000000',
      duration: 0.3,
      ease: "power2.out"
    })
  }

  useEffect(() => {
    // Don't run on mobile or if user prefers reduced motion
    if (typeof window === "undefined" || window.innerWidth < 768 || prefersReducedMotion()) {
      return
    }

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    if (!cursor || !cursorDot) return

    // Track mouse position and update cursor colors
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      
      // Get element at cursor position and update theme
      const elementAtCursor = document.elementFromPoint(e.clientX, e.clientY)
      if (elementAtCursor) {
        const theme = getThemeFromElement(elementAtCursor)
        updateCursorColors(theme)
      }
    }

    // Smooth cursor follow with lerp
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

    // Magnetic attraction to interactive elements
    const magneticElements = document.querySelectorAll("[data-magnetic]")
    
    magneticElements.forEach((el) => {
      const element = el as HTMLElement
      
      element.addEventListener("mouseenter", () => {
        gsap.to(cursor, {
          scale: 2,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      element.addEventListener("mouseleave", () => {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        })
      })

      element.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        // Apply magnetic pull
        gsap.to(element, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })

    // Start animation loop
    window.addEventListener("mousemove", handleMouseMove)
    requestAnimationFrame(updateCursor)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Don't render on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return null
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] w-8 h-8 border-2 rounded-full hidden md:block"
        style={{ 
          transform: "translate(-50%, -50%)",
          borderColor: '#000000', // Initial black color
          transition: 'none' // Let GSAP handle transitions
        }}
      />
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full hidden md:block"
        style={{ 
          transform: "translate(-50%, -50%)",
          backgroundColor: '#000000', // Initial black color
          transition: 'none' // Let GSAP handle transitions
        }}
      />
    </>
  )
}
