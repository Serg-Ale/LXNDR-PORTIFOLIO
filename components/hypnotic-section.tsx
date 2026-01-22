"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Animation configuration constants
// Note: These viewport offsets are proportional to the section's minHeight of 400vh
const ANIMATION_CONFIG = {
  SECTION_HEIGHT: "400vh",
  PHRASE2_START: "top+=100vh",
  PHRASE2_ENTRANCE_END: "top+=150vh",
  PHRASE2_EXIT_START: "top+=180vh",
  PHRASE2_EXIT_END: "top+=230vh",
  PHRASE3_START: "top+=200vh",
  PHRASE3_ENTRANCE_END: "top+=250vh",
  PHRASE3_EXIT_START: "top+=280vh",
  PHRASE3_EXIT_END: "top+=330vh",
  PHRASE4_START: "top+=300vh",
  PHRASE4_END: "top+=350vh",
  CTA_START: "top+=320vh",
  CTA_END: "top+=360vh",
} as const

/**
 * HypnoticSection - Scroll-driven animation sequence with spiral background
 * 
 * Performance note: This component renders 50 animated div elements for the spiral effect
 * and uses continuous rotation animation. On lower-end mobile devices, the combination of
 * continuous rotation and scroll-driven transforms may cause performance issues.
 * Test on target devices if performance is critical.
 */

export function HypnoticSection() {
  const t = useTranslations("hypnotic")
  const sectionRef = useRef<HTMLDivElement>(null)
  const spiralRef = useRef<HTMLDivElement>(null)
  const phrase1Ref = useRef<HTMLDivElement>(null)
  const phrase2Ref = useRef<HTMLDivElement>(null)
  const phrase3Ref = useRef<HTMLDivElement>(null)
  const phrase4Ref = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // === BACKGROUND SPIRAL ANIMATIONS ===
      
      // Continuous infinite rotation
      gsap.to(spiralRef.current, {
        rotation: 360,
        duration: 90,
        ease: "none",
        repeat: -1,
      })

      // Scroll-driven zoom and parallax
      gsap.to(spiralRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
        scale: 2.2,
        y: -400,
      })

      // === PHRASE 1: "CODE IS THE NEW CANVAS" ===
      
      // Initial state
      gsap.set(phrase1Ref.current, { opacity: 1 })
      
      ScrollTrigger.create({
        trigger: phrase1Ref.current,
        start: "top 15%",
        end: "+=100vh",
        pin: true,
        pinSpacing: false,
      })

      gsap.to(phrase1Ref.current, {
        scrollTrigger: {
          trigger: phrase1Ref.current,
          start: "top 15%",
          end: "+=80vh",
          scrub: 1.5,
        },
        opacity: 0,
        scale: 0.7,
        filter: "blur(8px)",
      })

      // === PHRASE 2: "DESIGN MEETS LOGIC" ===
      
      // Initial state hidden
      gsap.set(phrase2Ref.current, { opacity: 0, x: -150 })
      
      // Entrance
      gsap.to(phrase2Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: ANIMATION_CONFIG.PHRASE2_START,
          end: ANIMATION_CONFIG.PHRASE2_ENTRANCE_END,
          scrub: 1,
        },
        x: 0,
        opacity: 1,
      })

      // Pin
      ScrollTrigger.create({
        trigger: phrase2Ref.current,
        start: "top 30%",
        end: "+=80vh",
        pin: true,
        pinSpacing: false,
      })

      // Exit
      gsap.to(phrase2Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: ANIMATION_CONFIG.PHRASE2_EXIT_START,
          end: ANIMATION_CONFIG.PHRASE2_EXIT_END,
          scrub: 1,
        },
        x: 200,
        opacity: 0,
      })

      // === PHRASE 3: "INFINITE POSSIBILITIES" ===
      
      // Initial state hidden
      gsap.set(phrase3Ref.current, { opacity: 0, scale: 0.3, rotation: -15 })
      
      // Entrance with rotation
      gsap.to(phrase3Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: ANIMATION_CONFIG.PHRASE3_START,
          end: ANIMATION_CONFIG.PHRASE3_ENTRANCE_END,
          scrub: 1.2,
        },
        scale: 1,
        opacity: 1,
        rotation: 0,
      })

      // Pin at center
      ScrollTrigger.create({
        trigger: phrase3Ref.current,
        start: "top 40%",
        end: "+=90vh",
        pin: true,
        pinSpacing: false,
      })

      // Explosive exit
      gsap.to(phrase3Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: ANIMATION_CONFIG.PHRASE3_EXIT_START,
          end: ANIMATION_CONFIG.PHRASE3_EXIT_END,
          scrub: 1.2,
        },
        scale: 2.5,
        opacity: 0,
        rotation: 15,
      })

      // === PHRASE 4: "LET'S CREATE TOGETHER" ===
      
      // Initial state hidden
      gsap.set(phrase4Ref.current, { opacity: 0, y: 120 })
      
      gsap.to(phrase4Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: ANIMATION_CONFIG.PHRASE4_START,
          end: ANIMATION_CONFIG.PHRASE4_END,
          scrub: 1,
        },
        y: 0,
        opacity: 1,
      })

      // === CTA BUTTON ===
      
      // Initial state hidden
      gsap.set(ctaRef.current, { opacity: 0, y: 80, scale: 0.8 })
      
      gsap.to(ctaRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: ANIMATION_CONFIG.CTA_START,
          end: ANIMATION_CONFIG.CTA_END,
          scrub: 1,
        },
        y: 0,
        opacity: 1,
        scale: 1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ minHeight: ANIMATION_CONFIG.SECTION_HEIGHT }}
    >
      {/* STICKY CONTAINER */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* SPIRAL BACKGROUND LAYER */}
        <div
          ref={spiralRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ willChange: "transform" }}
        >
          <div className="relative w-[300%] h-[300%]">
            {Array.from({ length: 50 }).map((_, i) => {
              // Logarithmic size growth for deeper tunnel effect
              const size = 60 + i * 140
              const isWhiteRing = i % 3 === 0
              const strokeWidth = 40 + i * 1.2 // Thicker as it grows
              
              return (
                <div
                  key={i}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                    isWhiteRing 
                      ? "border-white bg-transparent" 
                      : "border-black bg-white"
                  }`}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderWidth: `${strokeWidth}px`,
                  }}
                />
              )
            })}
          </div>
        </div>

        {/* CONTENT LAYER WITH KNOCKOUT EFFECT */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ mixBlendMode: "difference" }}
        >
          
          {/* PHRASE 1: The Canvas */}
          <div
            ref={phrase1Ref}
            className="absolute top-[15%] left-8 md:left-16 lg:left-24 max-w-5xl"
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="text-[clamp(3.5rem,11vw,10rem)] font-black leading-[0.85] tracking-tighter text-white uppercase whitespace-pre-line">
              {t("phrase1")}
            </h2>
          </div>

          {/* PHRASE 2: The Intersection */}
          <div
            ref={phrase2Ref}
            className="absolute top-[30%] right-8 md:right-16 lg:right-24 max-w-4xl text-right opacity-0"
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="text-[clamp(3rem,9vw,8rem)] font-black leading-[0.88] tracking-tighter text-white uppercase whitespace-pre-line">
              {t("phrase2")}
            </h2>
          </div>

          {/* PHRASE 3: The Vision */}
          <div
            ref={phrase3Ref}
            className="absolute top-[40%] left-1/2 -translate-x-1/2 max-w-6xl text-center opacity-0"
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="text-[clamp(3.2rem,10vw,9rem)] font-black leading-[0.86] tracking-tighter text-white uppercase whitespace-pre-line">
              {t("phrase3")}
            </h2>
          </div>

          {/* PHRASE 4: The Invitation */}
          <div
            ref={phrase4Ref}
            className="absolute bottom-[30%] left-8 md:left-16 lg:left-24 max-w-4xl opacity-0"
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.9] tracking-tight text-white uppercase border-l-8 border-white pl-6 md:pl-10 whitespace-pre-line">
              {t("phrase4")}
            </h2>
          </div>

          {/* CTA SECTION */}
          <div
            ref={ctaRef}
            className="absolute bottom-[12%] left-8 md:left-16 lg:left-24 pointer-events-auto opacity-0"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="flex gap-6 items-center flex-wrap">
              <button
                type="button"
                className="px-12 py-6 bg-white text-black font-black text-xl md:text-2xl uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform border-4 border-white shadow-lg"
              >
                {t("cta")}
              </button>
              
              <div className="flex gap-4">
                <div className="w-24 h-24 border-4 border-white animate-pulse" />
                <div className="w-24 h-24 bg-white" />
              </div>
            </div>
          </div>

        </div>

        {/* DECORATIVE ELEMENTS */}
        <div
          className="absolute top-8 md:top-12 right-8 md:right-16 space-y-3"
          style={{ mixBlendMode: "difference" }}
        >
          <div className="w-40 md:w-48 h-3 bg-white" />
          <div className="w-32 md:w-40 h-3 bg-white ml-auto" />
          <div className="w-36 md:w-44 h-3 bg-white" />
        </div>

        <div
          className="absolute bottom-8 md:bottom-12 right-8 md:right-16"
          style={{ mixBlendMode: "difference" }}
        >
          <div className="w-3 h-40 md:h-48 bg-white ml-auto" />
        </div>

      </div>
    </section>
  )
}
