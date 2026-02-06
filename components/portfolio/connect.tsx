"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { GlitchText } from "@/components/shared/glitch-text"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { FaLinkedin } from "react-icons/fa"
import { HiEnvelope, HiArrowTopRightOnSquare } from "react-icons/hi2"
import type { IconType } from "react-icons"

gsap.registerPlugin(ScrollTrigger)

const contactLinks = [
  {
    label: "EMAIL",
    value: "sergioalexandre0716@gmail.com",
    href: "mailto:sergioalexandre0716@gmail.com",
    icon: HiEnvelope,
  },
  {
    label: "LINKEDIN",
    value: "@serg-alexandre",
    href: "https://www.linkedin.com/in/serg-alexandre/",
    icon: FaLinkedin,
  },
]

export function PortfolioConnect() {
  const t = useTranslations("contact")
  const sectionRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cta = ctaRef.current
    
    if (!section || !cta) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([cta, ...cardRefs.current], { opacity: 1, y: 0 })
        return
      }

      // Animate CTA
      gsap.from(cta, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: cta,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      })

      // Animate contact cards
      cardRefs.current.forEach((card, index) => {
        if (!card) return

        gsap.from(card, {
          y: 100,
          opacity: 0,
          rotation: gsap.utils.random(-10, 10),
          duration: 1,
          delay: index * 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleCardHover = (index: number, card: HTMLElement) => {
    if (prefersReducedMotion()) return

    setHoveredCard(index)

    gsap.to(card, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleCardLeave = (card: HTMLElement) => {
    if (prefersReducedMotion()) return

    setHoveredCard(null)

    gsap.to(card, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <section
      ref={sectionRef}
      id="connect"
      className="relative min-h-screen px-6 md:px-12 py-24 md:py-32 bg-foreground text-background overflow-hidden flex items-center"
      data-theme="dark"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-foreground via-foreground to-background/20" />
      
      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* CTA Section */}
        <div ref={ctaRef} className="mb-16 md:mb-24 text-center">
          <div className="mb-8">
            <SplitTextReveal
              as="h2"
              className="text-[clamp(3rem,12vw,10rem)] font-black leading-none tracking-tighter"
              staggerFrom="center"
            >
              {t("callToAction").split("\n")[0]}
            </SplitTextReveal>
          </div>
          <div className="mb-8">
            <SplitTextReveal
              as="h2"
              className="text-[clamp(3rem,12vw,10rem)] font-black leading-none tracking-tighter text-outlined-hover-dark"
              delay={0.3}
              staggerFrom="center"
            >
              {t("callToAction").split("\n")[1]}
            </SplitTextReveal>
          </div>
          <div>
            <GlitchText
              as="h2"
              className="text-[clamp(3rem,12vw,10rem)] font-black leading-none tracking-tighter"
              delay={0.6}
              intensity={5}
            >
              {t("callToAction").split("\n")[2]}
            </GlitchText>
          </div>
        </div>

        {/* Contact Links */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16 max-w-4xl mx-auto">
          {contactLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <a
                key={link.label}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                onMouseEnter={(e) => handleCardHover(index, e.currentTarget)}
                onMouseLeave={(e) => handleCardLeave(e.currentTarget)}
                className="group bg-background text-foreground p-8 border-4 border-background hover:shadow-brutalist-inverted transition-shadow cursor-pointer relative focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground focus-visible:outline-none touch-action-manipulation"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Icon className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />
                    <span className="text-sm font-black tracking-wider opacity-70">
                      {link.label}
                    </span>
                  </div>
                  <HiArrowTopRightOnSquare className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" aria-hidden="true" />
                </div>
                <p className="text-lg md:text-xl font-bold leading-tight break-all">
                  {link.value}
                </p>
              </a>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-3 gap-6">
          <div
            ref={(el) => {
              cardRefs.current[3] = el
            }}
            className="bg-background/10 backdrop-blur-sm p-6 border-4 border-background/20"
          >
            <h4 className="text-sm font-black tracking-wider mb-2 opacity-70">
              {t("location")}
            </h4>
            <p className="text-lg md:text-xl font-bold">
              {t("locationValue")}
            </p>
          </div>

          <div
            ref={(el) => {
              cardRefs.current[4] = el
            }}
            className="bg-background/10 backdrop-blur-sm p-6 border-4 border-background/20"
          >
            <h4 className="text-sm font-black tracking-wider mb-2 opacity-70">
              {t("english")}
            </h4>
            <p className="text-lg md:text-xl font-bold">
              {t("englishValue")}
            </p>
          </div>

          <div
            ref={(el) => {
              cardRefs.current[5] = el
            }}
            className="bg-background/10 backdrop-blur-sm p-6 border-4 border-background/20 relative overflow-hidden"
          >
            <div className="absolute top-3 right-3 w-3 h-3 bg-green-400 rounded-full pulse-dot" />
            <h4 className="text-sm font-black tracking-wider mb-2 opacity-70">
              {t("availability")}
            </h4>
            <p className="text-lg md:text-xl font-bold">
              {t("availabilityValue")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
