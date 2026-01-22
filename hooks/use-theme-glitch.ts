"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import gsap from "gsap"
import { usePathname } from "@/i18n/routing"
import { useSearchParams } from "next/navigation"

export function useThemeGlitch() {
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme, setTheme } = useTheme()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const prevTheme = useRef(resolvedTheme)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      prevTheme.current = resolvedTheme
      return
    }

    if (resolvedTheme === prevTheme.current) return

    const toTheme = resolvedTheme
    const fromTheme = prevTheme.current
    prevTheme.current = toTheme

    if (!containerRef.current || !overlayRef.current) return

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline()

      timeline.set(overlayRef.current, {
        opacity: 0,
        clipPath: "inset(0 0 100% 0)",
      })

      timeline.to(overlayRef.current, {
        opacity: 0.15,
        duration: 0.08,
        ease: "power1.inOut",
      })

      timeline.to(overlayRef.current, {
        clipPath: "inset(30% 0 40% 0)",
        duration: 0.12,
        ease: "power1.inOut",
      })

      timeline.to(overlayRef.current, {
        clipPath: "inset(60% 0 20% 0)",
        duration: 0.1,
        ease: "power1.inOut",
      })

      timeline.to(overlayRef.current, {
        clipPath: "inset(20% 0 60% 0)",
        duration: 0.1,
        ease: "power1.inOut",
      })

      timeline.to(overlayRef.current, {
        opacity: 0,
        clipPath: "inset(0 0 0 0)",
        duration: 0.15,
        ease: "power1.out",
      })

      gsap.fromTo(containerRef.current,
        {
          filter: "blur(4px) grayscale(0.3)",
          scale: 0.995,
        },
        {
          filter: "blur(0px) grayscale(0)",
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      )

      gsap.fromTo(containerRef.current,
        {
          x: -2,
        },
        {
          x: 2,
          duration: 0.05,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut",
        }
      )

      gsap.set(containerRef.current, { x: 0 })
    })

    return () => ctx.revert()
  }, [resolvedTheme, pathname, searchParams])

  return { containerRef, overlayRef }
}
