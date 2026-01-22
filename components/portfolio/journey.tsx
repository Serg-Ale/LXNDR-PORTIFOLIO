"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { createParallax, prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioJourney() {
  const t = useTranslations("about")
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const storyBlocksRef = useRef<(HTMLDivElement | null)[]>([])
  const educationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const timeline = timelineRef.current
    const education = educationRef.current
    
    if (!section || !timeline || !education) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([timeline, education, ...storyBlocksRef.current], { opacity: 1, y: 0 })
        return
      }

      // Timeline line draws from top to bottom
      gsap.fromTo(
        timeline,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      )

      // Animate story blocks with parallax
      storyBlocksRef.current.forEach((block, index) => {
        if (!block) return

        gsap.from(block, {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: block,
            start: "top bottom-=100",
            end: "top center",
            scrub: 1,
          },
        })

        // Add parallax effect
        createParallax(block, 0.1 * (index + 1))
      })

      // Education card 3D rotate entrance
      gsap.from(education, {
        rotationY: -90,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: education,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative min-h-screen px-6 md:px-12 py-24 md:py-32 bg-background text-foreground overflow-hidden"
      data-theme="light"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-foreground/5 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section title */}
        <div ref={titleRef} className="mb-16 md:mb-24">
          <SplitTextReveal
            as="h2"
            className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tighter"
            triggerOnScroll
            staggerFrom="start"
          >
            MY JOURNEY_
          </SplitTextReveal>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 relative">
          {/* Timeline line (vertical) */}
          <div
            ref={timelineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-foreground origin-top"
            style={{ transform: "translateX(-50%) scaleY(0)" }}
          />

          {/* Story block 1 - Journey start */}
          <div
            ref={(el) => {
              storyBlocksRef.current[0] = el
            }}
            className="parallax-layer space-y-6 md:text-right"
          >
            <div className="inline-block bg-foreground text-background px-4 py-2 rounded-full text-sm font-bold mb-4">
              → THE BEGINNING
            </div>
            <p className="text-2xl md:text-4xl font-bold leading-tight">
              {t("journey")}
            </p>
            <div className="bg-foreground/5 p-6 rounded-lg border border-foreground/20 hover-distort">
              <p className="text-lg md:text-xl font-medium leading-relaxed">
                {t("description")}
              </p>
            </div>
          </div>

          {/* Story block 2 - Evolution */}
          <div
            ref={(el) => {
              storyBlocksRef.current[1] = el
            }}
            className="parallax-layer space-y-6 md:col-start-2"
          >
            <div className="inline-block bg-foreground text-background px-4 py-2 rounded-full text-sm font-bold mb-4">
              → EVOLUTION
            </div>
            <div className="bg-gradient-to-br from-foreground/10 to-foreground/5 p-8 rounded-lg border border-foreground/20 hover-distort">
              <p className="text-xl md:text-2xl font-bold mb-4">
                {t("evolution")}
              </p>
              <p className="text-4xl md:text-6xl font-black tracking-tight text-outlined-hover">
                {t("evolutionWord")}
              </p>
            </div>
          </div>

          {/* Education card */}
          <div
            ref={educationRef}
            className="md:col-start-1 card-3d parallax-layer"
          >
            <div className="bg-foreground text-background p-8 md:p-10 rounded-lg shadow-brutalist hover:shadow-brutalist-lg transition-shadow">
              <h3 className="text-2xl md:text-3xl font-black mb-6 tracking-tight">
                {t("education")}
              </h3>
              <p className="text-lg md:text-xl font-bold whitespace-pre-line leading-relaxed">
                {t("educationContent")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
