"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioOrigin() {
  const t = useTranslations("origin")
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([...cardRefs.current, ...badgeRefs.current], { opacity: 1, y: 0 })
        return
      }

      // Animate manifesto cards with stagger
      cardRefs.current.forEach((card, index) => {
        if (!card) return

        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotation: index % 2 === 0 ? -2 : 2,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            end: "top center",
            scrub: 1,
          },
        })
      })

      // Animate badges with faster entrance
      badgeRefs.current.forEach((badge, index) => {
        if (!badge) return

        gsap.from(badge, {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: badge,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="origin"
      className="relative min-h-screen px-6 md:px-12 py-24 md:py-32 bg-background text-foreground"
      data-theme="light"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-16 md:mb-24">
          <SplitTextReveal
            as="h2"
            className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tighter"
            triggerOnScroll
            staggerFrom="start"
          >
            {t("title")}
          </SplitTextReveal>
        </div>

        {/* Manifesto Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24">
          {/* Card 1: The Question */}
          <div
            ref={(el) => {
              cardRefs.current[0] = el
            }}
            className="border-4 border-foreground p-8 md:p-12 shadow-brutalist hover:shadow-brutalist-lg transition-shadow duration-300 cursor-pointer"
          >
            <span className="text-sm font-black tracking-widest opacity-60 mb-4 block">
              01
            </span>
            <h3 className="text-2xl md:text-4xl font-black mb-6 tracking-tight">
              {t("card1.title")}
            </h3>
            <p className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
              "{t("card1.quote")}"
            </p>
          </div>

          {/* Card 2: The Obsession */}
          <div
            ref={(el) => {
              cardRefs.current[1] = el
            }}
            className="bg-foreground text-background p-8 md:p-12 shadow-brutalist-inverted hover:shadow-brutalist-lg transition-shadow duration-300 cursor-pointer"
          >
            <span className="text-sm font-black tracking-widest opacity-60 mb-4 block">
              02
            </span>
            <h3 className="text-2xl md:text-4xl font-black mb-6 tracking-tight">
              {t("card2.title")}
            </h3>
            <p className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
              "{t("card2.quote")}"
            </p>
          </div>
        </div>

        {/* Third Card: The Evolution - Full Width */}
        <div
          ref={(el) => {
            cardRefs.current[2] = el
          }}
          className="border-4 border-foreground p-8 md:p-12 shadow-brutalist mb-16 md:mb-24 cursor-pointer hover:shadow-brutalist-lg transition-shadow duration-300"
        >
          <span className="text-sm font-black tracking-widest opacity-60 mb-4 block">
            03
          </span>
          <h3 className="text-2xl md:text-4xl font-black mb-6 tracking-tight">
            {t("card3.title")}
          </h3>
          <p className="text-xl md:text-2xl font-semibold leading-relaxed max-w-4xl">
            {t("card3.description")}
          </p>
        </div>

        {/* Badges Row: Education + English */}
        <div className="flex flex-wrap gap-4 md:gap-6">
          <div
            ref={(el) => {
              badgeRefs.current[0] = el
            }}
            className="bg-foreground text-background px-6 py-4 md:px-8 md:py-5"
          >
            <p className="text-xs md:text-sm font-black tracking-widest opacity-70 mb-1">
              {t("education.label")}
            </p>
            <p className="text-lg md:text-xl font-black tracking-tight">
              {t("education.value")}
            </p>
            <p className="text-sm md:text-base font-semibold opacity-80">
              {t("education.institution")}
            </p>
          </div>

          <div
            ref={(el) => {
              badgeRefs.current[1] = el
            }}
            className="border-4 border-foreground px-6 py-4 md:px-8 md:py-5"
          >
            <p className="text-xs md:text-sm font-black tracking-widest opacity-70 mb-1">
              {t("english.label")}
            </p>
            <p className="text-lg md:text-xl font-black tracking-tight">
              {t("english.level")}
            </p>
            <p className="text-sm md:text-base font-semibold opacity-80">
              {t("english.certification")}
            </p>
          </div>

          <div
            ref={(el) => {
              badgeRefs.current[2] = el
            }}
            className="border-4 border-foreground px-6 py-4 md:px-8 md:py-5"
          >
            <p className="text-xs md:text-sm font-black tracking-widest opacity-70 mb-1">
              {t("experience.label")}
            </p>
            <p className="text-lg md:text-xl font-black tracking-tight">
              {t("experience.value")}
            </p>
            <p className="text-sm md:text-base font-semibold opacity-80">
              {t("experience.context")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
