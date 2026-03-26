import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Parallax speed presets for consistent animation
 * Lower values = slower movement (background elements)
 * Higher values = faster movement (foreground elements)
 */
export const PARALLAX_SPEEDS = {
  verySlow: 0.2,   // Deep background layers
  slow: 0.4,       // Background patterns
  medium: 0.6,     // Mid-ground elements
  normal: 1,       // Default scroll speed
  fast: 1.2,       // Emphasized elements
  veryFast: 1.5,   // Dramatic foreground
} as const

/**
 * Scale animation presets
 */
export const SCALE_RANGES = {
  subtle: { from: 0.95, to: 1.05 },
  moderate: { from: 0.9, to: 1.1 },
  dramatic: { from: 0.85, to: 1.2 },
} as const

/**
 * Create scroll-based parallax effect on element
 * Element moves at different speed than scroll
 */
export function createScrollParallax(
  element: HTMLElement | null,
  options: {
    speed?: number
    direction?: "vertical" | "horizontal"
    start?: string
    end?: string
    scrub?: boolean | number
  } = {}
) {
  if (!element) return null

  const {
    speed = PARALLAX_SPEEDS.slow,
    direction = "vertical",
    start = "top bottom",
    end = "bottom top",
    scrub = 1,
  } = options

  // Calculate movement distance
  const distance = direction === "vertical" ? 100 : 50
  const movement = distance * (1 - speed)

  const animation = gsap.to(element, {
    [direction === "vertical" ? "y" : "x"]: movement,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub,
    },
  })

  return animation
}

/**
 * Create zoom/scale parallax effect
 * Element scales during scroll
 */
export function createZoomParallax(
  element: HTMLElement | null,
  options: {
    from?: number
    to?: number
    start?: string
    end?: string
    scrub?: boolean | number
  } = {}
) {
  if (!element) return null

  const {
    from = SCALE_RANGES.moderate.from,
    to = SCALE_RANGES.moderate.to,
    start = "top bottom",
    end = "bottom top",
    scrub = 1,
  } = options

  const animation = gsap.fromTo(
    element,
    { scale: from },
    {
      scale: to,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
      },
    }
  )

  return animation
}

/**
 * Create multi-layer parallax effect
 * Multiple elements move at different speeds
 */
export function createParallaxLayers(
  layers: Array<{
    element: HTMLElement | null
    speed: number
    direction?: "vertical" | "horizontal"
  }>,
  options: {
    start?: string
    end?: string
    scrub?: boolean | number
  } = {}
) {
  const animations: Array<gsap.core.Tween> = []

  layers.forEach(({ element, speed, direction = "vertical" }) => {
    if (!element) return

    const animation = createScrollParallax(element, {
      speed,
      direction,
      ...options,
    })

    if (animation) {
      animations.push(animation)
    }
  })

  return animations
}

/**
 * Create rotation parallax effect
 * Element rotates during scroll
 */
export function createRotationParallax(
  element: HTMLElement | null,
  options: {
    rotation?: number
    start?: string
    end?: string
    scrub?: boolean | number
  } = {}
) {
  if (!element) return null

  const {
    rotation = 5,
    start = "top bottom",
    end = "bottom top",
    scrub = 1,
  } = options

  const animation = gsap.to(element, {
    rotation,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub,
    },
  })

  return animation
}

/**
 * Create fade parallax effect
 * Element fades during scroll
 */
export function createFadeParallax(
  element: HTMLElement | null,
  options: {
    from?: number
    to?: number
    start?: string
    end?: string
    scrub?: boolean | number
  } = {}
) {
  if (!element) return null

  const {
    from = 1,
    to = 0,
    start = "top center",
    end = "bottom top",
    scrub = 1,
  } = options

  const animation = gsap.fromTo(
    element,
    { opacity: from },
    {
      opacity: to,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
      },
    }
  )

  return animation
}

/**
 * Create combined parallax effect
 * Combines multiple effects (movement + scale + fade)
 */
export function createCombinedParallax(
  element: HTMLElement | null,
  options: {
    speed?: number
    scale?: { from: number; to: number }
    opacity?: { from: number; to: number }
    rotation?: number
    start?: string
    end?: string
    scrub?: boolean | number
  } = {}
) {
  if (!element) return null

  const {
    speed,
    scale,
    opacity,
    rotation,
    start = "top bottom",
    end = "bottom top",
    scrub = 1,
  } = options

  const animationProps: gsap.TweenVars = {
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub,
    },
  }

  // Add movement if speed is specified
  if (speed !== undefined) {
    const movement = 100 * (1 - speed)
    animationProps.y = movement
  }

  // Add scale if specified
  if (scale) {
    gsap.fromTo(element, { scale: scale.from }, { scale: scale.to, ...animationProps })
  }

  // Add opacity if specified
  if (opacity) {
    animationProps.opacity = opacity.to
    gsap.set(element, { opacity: opacity.from })
  }

  // Add rotation if specified
  if (rotation) {
    animationProps.rotation = rotation
  }

  const animation = gsap.to(element, animationProps)

  return animation
}

/**
 * Create stagger parallax effect
 * Multiple elements animate with stagger
 */
export function createStaggerParallax(
  elements: HTMLElement[],
  options: {
    speed?: number
    stagger?: number
    start?: string
    end?: string
    scrub?: boolean | number
  } = {}
) {
  if (elements.length === 0) return null

  const {
    speed = PARALLAX_SPEEDS.medium,
    stagger = 0.1,
    start = "top bottom",
    end = "bottom top",
    scrub = 1,
  } = options

  const movement = 100 * (1 - speed)

  const animation = gsap.to(elements, {
    y: movement,
    ease: "none",
    stagger,
    scrollTrigger: {
      trigger: elements[0],
      start,
      end,
      scrub,
    },
  })

  return animation
}

/**
 * Utility to refresh all ScrollTriggers
 * Call after layout changes
 */
export function refreshScrollTriggers() {
  if (typeof window !== "undefined" && ScrollTrigger) {
    ScrollTrigger.refresh()
  }
}

/**
 * Utility to kill all ScrollTriggers
 * Use for cleanup
 */
export function killAllScrollTriggers() {
  if (typeof window !== "undefined" && ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }
}
