import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Determines if the user prefers reduced motion (to disable animations).
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Creates a parallax effect for a given element and intensity.
 */
export function createParallax(element: HTMLElement, intensity: number = 0.2): void {
  if (!element) return

  gsap.to(element, {
    yPercent: intensity * 100,
    scrollTrigger: {
      trigger: element,
      start: "top bottom", // Start when the element enters the bottom of the viewport
      end: "bottom top",  // End when the element leaves the top of the viewport
      scrub: true,         // Smooth scrolling effect
    },
  })
}

/**
 * Applies an RGB split-like glitch effect to a given element.
 */
export function rgbSplitEffect(element: HTMLElement, duration: number = 0.5): void {
  if (!element) return

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 })

    tl.to(element, { filter: "hue-rotate(20deg)", duration })
      .to(element, { filter: "hue-rotate(-20deg)", duration }, "+=duration")
  })

  ctx.revert() // Cleanup
}

/**
 * Helper for animating staggered text or elements.
 */
export function staggerReveal(
  targets: gsap.TweenTarget,
  options: { delay?: number; staggerTime?: number } = {}
): void {
  const { delay = 0, staggerTime = 0.1 } = options

  gsap.from(targets, {
    opacity: 0,
    y: 50,
    delay,
    stagger: staggerTime,
    duration: 0.6,
    ease: "power4.out",
  })
}