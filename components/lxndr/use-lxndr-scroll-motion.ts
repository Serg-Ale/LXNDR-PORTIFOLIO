"use client"

import { useEffect, type RefObject } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

type MotionRef = RefObject<HTMLElement | HTMLDivElement | null>

function numberAttr(element: Element, name: string, fallback: number) {
  const value = element.getAttribute(name)
  if (!value) return fallback

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function useLxndrScrollMotion(scopeRef: MotionRef, triggerRef?: MotionRef) {
  useEffect(() => {
    const scope = scopeRef.current
    const trigger = triggerRef?.current ?? scope

    if (!scope || !trigger) return

    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(scope)
      const driftElements = sel("[data-lxndr-drift]")
      const parallaxElements = sel("[data-lxndr-parallax]")

      if (prefersReducedMotion()) {
        gsap.set(driftElements, { opacity: 1, x: 0, y: 0 })
        return
      }

      driftElements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: numberAttr(element, "data-lxndr-drift-opacity", 0),
            x: numberAttr(element, "data-lxndr-drift-x", 42),
            y: numberAttr(element, "data-lxndr-drift-y", 56),
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: numberAttr(element, "data-lxndr-drift-duration", 0.9),
            ease: "power3.out",
            scrollTrigger: {
              trigger,
              start: "top 78%",
              once: true,
            },
          }
        )
      })

      parallaxElements.forEach((element) => {
        gsap.to(element, {
          x: numberAttr(element, "data-lxndr-parallax-x", 26),
          y: numberAttr(element, "data-lxndr-parallax-y", 52),
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: numberAttr(element, "data-lxndr-parallax-scrub", 1.4),
          },
        })
      })
    }, scope)

    return () => ctx.revert()
  }, [scopeRef, triggerRef])
}
