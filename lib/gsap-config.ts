import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, CustomEase)

// Custom eases for brutalist/glitch aesthetic
export const customEases = {
  glitchIn: CustomEase.create("glitchIn", "M0,0 C0.126,0.382 0.074,0.73 0.5,0.73 0.926,0.73 0.818,0.382 1,1"),
  brutalist: CustomEase.create("brutalist", "M0,0 C0.5,0 0.5,1 1,1"),
  smoothSnap: CustomEase.create("smoothSnap", "M0,0 C0.215,0.61 0.355,1 1,1"),
}

// Default GSAP config
export const defaultGsapConfig = {
  duration: 1.2,
  ease: "power4.out",
}

// Scroll trigger defaults
export const scrollTriggerDefaults = {
  start: "top bottom-=100",
  end: "top center",
  toggleActions: "play none none reverse",
}

// Animation presets
export const animations = {
  fadeInUp: (element: gsap.TweenTarget, delay = 0) => ({
    from: element,
    opacity: 0,
    y: 100,
    duration: 1.2,
    delay,
    ease: "power4.out",
  }),
  
  glitchIn: (element: gsap.TweenTarget, delay = 0) => ({
    from: element,
    opacity: 0,
    x: gsap.utils.random(-50, 50),
    y: gsap.utils.random(-50, 50),
    rotation: gsap.utils.random(-15, 15),
    duration: 0.8,
    delay,
    ease: customEases.glitchIn,
  }),
  
  scaleIn: (element: gsap.TweenTarget, delay = 0) => ({
    from: element,
    scale: 0,
    opacity: 0,
    duration: 1,
    delay,
    ease: "elastic.out(1, 0.5)",
  }),
}

// Utility: Create parallax effect
export const createParallax = (
  element: gsap.TweenTarget,
  speed = 0.5,
  trigger?: Element | string
) => {
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: (trigger || element) as gsap.DOMTarget,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  })
}

// Utility: RGB split effect for glitch
export const rgbSplitEffect = (element: HTMLElement, intensity = 3) => {
  const tl = gsap.timeline()
  
  tl.to(element, {
    textShadow: `${intensity}px 0 red, -${intensity}px 0 blue`,
    duration: 0.05,
    repeat: 3,
    yoyo: true,
  })
  
  tl.to(element, {
    textShadow: "0 0 transparent",
    duration: 0.1,
  })
  
  return tl
}

// Utility: Character stagger reveal
export const staggerReveal = (
  chars: NodeListOf<Element> | Element[],
  options = {}
) => {
  const defaults = {
    opacity: 0,
    y: 100,
    rotationX: -90,
    stagger: { each: 0.03, from: "start" as const },
    duration: 1.2,
    ease: "expo.out",
  }
  
  return gsap.from(chars, { ...defaults, ...options })
}

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

// Disable animations if user prefers reduced motion
export const setupReducedMotion = () => {
  if (prefersReducedMotion()) {
    gsap.globalTimeline.timeScale(100) // Speed up animations to nearly instant
    ScrollTrigger.config({ limitCallbacks: true })
  }
}
