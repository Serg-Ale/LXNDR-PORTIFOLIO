"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioCertifications() {
  const t = useTranslations("certifications")
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const certifications = t.raw("list")

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(cardRefs.current, { opacity: 1, y: 0, scale: 1 })
        return
      }

      // Stagger animation for cards
      cardRefs.current.forEach((card, index) => {
        if (!card) return

        gsap.from(card, {
          y: 100,
          opacity: 0,
          scale: 0.9,
          rotation: gsap.utils.random(-5, 5),
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            onEnter: () => {
              gsap.to(card, {
                y: 0,
                opacity: 1,
                scale: 1,
                rotation: 0,
                delay: index * 0.1,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)",
              })
            },
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative min-h-[60vh] px-6 md:px-12 py-24 md:py-32 bg-foreground text-background"
      data-theme="dark"
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-16 md:mb-24">
          <SplitTextReveal
            as="h2"
            className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tighter"
            triggerOnScroll
            staggerFrom="center"
          >
            {t("title")}
          </SplitTextReveal>
        </div>

        {/* Certifications grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certifications.map((cert: any, index: number) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              data-magnetic
              className="group bg-background text-foreground p-6 md:p-8 border-4 border-background hover:shadow-brutalist-lg transition-all cursor-pointer hover:-translate-y-2"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl md:text-2xl font-black leading-tight">
                    {cert.name}
                  </h3>
                  {cert.featured && (
                    <div className="w-3 h-3 bg-foreground rounded-full pulse-dot flex-shrink-0" />
                  )}
                </div>

                <p className="text-lg font-bold opacity-70">
                  {cert.issuer}
                </p>

                {cert.details && (
                  <p className="text-base font-semibold opacity-60">
                    {cert.details}
                  </p>
                )}

                {cert.date && (
                  <div className="inline-block bg-foreground text-background px-3 py-1 rounded-full text-xs font-bold mt-2">
                    {cert.date}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
