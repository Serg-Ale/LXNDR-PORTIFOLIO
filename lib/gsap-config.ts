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
 * Applies an advanced RGB split glitch effect with channel separation.
 */
export function rgbChannelSplit(
  element: HTMLElement, 
  duration: number = 0.3,
  intensity: number = 5
): gsap.core.Timeline {
  if (!element) return gsap.timeline()

  const tl = gsap.timeline()

  // Create pseudo-elements for RGB channels
  element.style.position = 'relative'
  element.style.overflow = 'visible'

  // Red channel
  const redClone = element.cloneNode(true) as HTMLElement
  redClone.style.position = 'absolute'
  redClone.style.top = '0'
  redClone.style.left = '0'
  redClone.style.color = 'transparent'
  redClone.style.textShadow = `${intensity}px 0 0 rgba(255,0,0,0.8), ${-intensity}px 0 0 rgba(255,0,0,0.8)`
  redClone.style.zIndex = '1'
  element.appendChild(redClone)

  // Blue channel
  const blueClone = element.cloneNode(true) as HTMLElement
  blueClone.style.position = 'absolute'
  blueClone.style.top = '0'
  blueClone.style.left = '0'
  blueClone.style.color = 'transparent'
  blueClone.style.textShadow = `0 ${intensity}px 0 rgba(0,0,255,0.8), 0 ${-intensity}px 0 rgba(0,0,255,0.8)`
  blueClone.style.zIndex = '2'
  element.appendChild(blueClone)

  // Green channel (original element)
  element.style.textShadow = `0 0 ${intensity * 2}px rgba(0,255,0,0.8)`

  tl.to([redClone, blueClone], {
    x: gsap.utils.random(-intensity, intensity),
    y: gsap.utils.random(-intensity, intensity),
    duration: duration * 0.5,
    ease: "power2.inOut",
    yoyo: true,
    repeat: 1,
  })
  .to(element, {
    filter: 'hue-rotate(180deg) contrast(1.5)',
    duration: duration,
    ease: "power2.inOut",
    yoyo: true,
    repeat: 1,
  }, 0)
  .call(() => {
    // Cleanup clones
    if (redClone.parentNode) redClone.parentNode.removeChild(redClone)
    if (blueClone.parentNode) blueClone.parentNode.removeChild(blueClone)
    element.style.textShadow = ''
    element.style.filter = ''
  })

  return tl
}

/**
 * Creates a morphing geometric shape animation.
 */
export function morphingShape(
  element: HTMLElement,
  shapes: string[],
  duration: number = 2
): void {
  if (!element || !shapes.length) return

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 })

  shapes.forEach((shape, index) => {
    if (index === 0) return
    
    tl.to(element, {
      morphSVG: shapes[index],
      duration,
      ease: "power2.inOut",
    })
  })

  tl.to(element, {
    morphSVG: shapes[0],
    duration,
    ease: "power2.inOut",
  })
}

/**
 * Creates a particle field effect.
 */
export function particleField(
  container: HTMLElement,
  particleCount: number = 50
): void {
  if (!container) return

  const particles: HTMLElement[] = []

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.position = 'absolute'
    particle.style.width = gsap.utils.random(2, 8) + 'px'
    particle.style.height = particle.style.width
    particle.style.background = `rgba(${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)}, ${gsap.utils.random(0, 255)}, 0.6)`
    particle.style.borderRadius = '50%'
    particle.style.left = gsap.utils.random(0, 100) + '%'
    particle.style.top = gsap.utils.random(0, 100) + '%'
    
    container.appendChild(particle)
    particles.push(particle)
  }

  gsap.to(particles, {
    x: 'random(-100, 100)',
    y: 'random(-100, 100)',
    opacity: 'random(0.1, 0.8)',
    duration: 'random(3, 8)',
    ease: 'none',
    stagger: 0.1,
    repeat: -1,
    yoyo: true,
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