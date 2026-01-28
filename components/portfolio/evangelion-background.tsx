"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { particleField } from "@/lib/gsap-config"

interface EvangelionBackgroundProps {
  children?: React.ReactNode
  className?: string
  particleCount?: number
  showShapes?: boolean
}

export function EvangelionBackground({
  children,
  className = "",
  particleCount = 30,
  showShapes = true
}: EvangelionBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const shapesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const particles = particlesRef.current
    const shapes = shapesRef.current

    if (!container) return

    const ctx = gsap.context(() => {
      // Initialize particle field
      if (particles) {
        particleField(particles, particleCount)
      }

      // Create geometric shapes
      if (shapes && showShapes) {
        // Create random geometric shapes
        for (let i = 0; i < 8; i++) {
          const shape = document.createElement('div')
          shape.className = 'evangelion-shape'
          shape.style.width = gsap.utils.random(20, 60) + 'px'
          shape.style.height = gsap.utils.random(20, 60) + 'px'
          shape.style.left = gsap.utils.random(10, 90) + '%'
          shape.style.top = gsap.utils.random(10, 90) + '%'
          shapes.appendChild(shape)
        }

        // Animate shapes
        gsap.to('.evangelion-shape', {
          rotation: 'random(-360, 360)',
          x: 'random(-50, 50)',
          y: 'random(-50, 50)',
          duration: 'random(4, 8)',
          ease: 'none',
          repeat: -1,
          stagger: 0.2,
        })
      }

      // Background animation
      gsap.to(container, {
        backgroundPosition: '50% 50%',
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      })
    }, container)

    return () => ctx.revert()
  }, [particleCount, showShapes])

  return (
    <div
      ref={containerRef}
      className={`evangelion-bg ${className}`}
    >
      {/* Particles layer */}
      <div ref={particlesRef} className="evangelion-particles">
        {Array.from({ length: particleCount }, (_, i) => (
          <div
            key={i}
            className="evangelion-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
            }}
          />
        ))}
      </div>

      {/* Geometric shapes layer */}
      {showShapes && (
        <div ref={shapesRef} className="evangelion-shapes" />
      )}

      {/* Content */}
      {children}
    </div>
  )
}