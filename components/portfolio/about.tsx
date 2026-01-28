"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioAbout() {
  const t = useTranslations("about")
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(cardRefs.current, { opacity: 1, y: 0 })
        return
      }

      // Animate cards with stagger
      cardRefs.current.forEach((card, index) => {
        if (!card) return

        gsap.from(card, {
          y: 100,
          opacity: 0,
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
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen px-6 md:px-12 py-24 md:py-32 bg-background text-foreground"
      data-theme="light"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div ref={titleRef} className="mb-16 md:mb-24">
          <SplitTextReveal
            as="h2"
            className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tighter"
            triggerOnScroll
            staggerFrom="start"
          >
            {t("title")}
          </SplitTextReveal>
        </div>

        {/* Main narrative grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left column: Story paragraphs 1-2 */}
          <div className="space-y-8">
            <div
              ref={(el) => {
                cardRefs.current[0] = el
              }}
              className="border-4 border-foreground p-6 md:p-8 shadow-brutalist hover:shadow-brutalist-lg transition-shadow"
            >
              <p className="text-lg md:text-xl font-semibold leading-relaxed">
                {t("paragraph1")}
              </p>
            </div>

            <div
              ref={(el) => {
                cardRefs.current[1] = el
              }}
              className="bg-foreground text-background p-6 md:p-8"
            >
              <p className="text-lg md:text-xl font-semibold leading-relaxed">
                {t("paragraph2")}
              </p>
            </div>
          </div>

          {/* Right column: Continuation + Evolution */}
          <div className="space-y-8">
            <div
              ref={(el) => {
                cardRefs.current[2] = el
              }}
              className="border-4 border-foreground p-6 md:p-8 hover:shadow-brutalist transition-shadow"
            >
              <p className="text-lg md:text-xl font-semibold leading-relaxed">
                {t("paragraph3")}
              </p>
            </div>

            <div
              ref={(el) => {
                cardRefs.current[3] = el
              }}
              className="border-4 border-foreground p-6 md:p-8 hover:shadow-brutalist transition-shadow"
            >
              <p className="text-lg md:text-xl font-semibold leading-relaxed">
                {t("paragraph4")}
              </p>
            </div>

            {/* Evolution emphasis */}
            <div
              ref={(el) => {
                cardRefs.current[4] = el
              }}
              className="bg-foreground text-background p-6 md:p-8"
            >
              <p className="text-base md:text-lg font-bold mb-3 opacity-90">
                {t("evolutionIntro")}
              </p>
              <p className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                {t("evolutionWord")}
              </p>
              <p className="text-base md:text-lg font-semibold leading-relaxed opacity-90">
                {t("evolutionQuote")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
