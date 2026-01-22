"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "./split-text-reveal"
import { GlitchText } from "./glitch-text"
import { CopyButton } from "./copy-button"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

const contactLinks = [
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/sergioalexandre-dev",
    href: "https://linkedin.com/in/sergioalexandre-dev",
    icon: "→",
  },
  {
    label: "EMAIL",
    value: "sergioalexandre.dev@gmail.com",
    href: "mailto:sergioalexandre.dev@gmail.com",
    icon: "→",
  },
  {
    label: "GITHUB",
    value: "github.com/lxndroc",
    href: "https://github.com/lxndroc",
    icon: "→",
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
      scale: 1.05,
      rotation: gsap.utils.random(-3, 3),
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleCardLeave = (card: HTMLElement) => {
    if (prefersReducedMotion()) return

    setHoveredCard(null)

    gsap.to(card, {
      scale: 1,
      rotation: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
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
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {contactLinks.map((link, index) => (
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
              className="group bg-background text-foreground p-8 rounded-lg border-4 border-background hover:shadow-brutalist-inverted transition-shadow cursor-pointer hover-distort"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-black tracking-wider opacity-70">
                  {link.label}
                </span>
                <span className="text-2xl font-black group-hover:translate-x-2 transition-transform">
                  {link.icon}
                </span>
              </div>
              <p className="text-xl md:text-2xl font-bold leading-tight break-all">
                {link.value}
              </p>
              
              {/* Copy button for email */}
              {link.label === "EMAIL" && (
                <div className="mt-4">
                  <CopyButton value={link.value} displayText={link.value} theme="dark" />
                </div>
              )}
            </a>
          ))}
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-3 gap-6">
          <div
            ref={(el) => {
              cardRefs.current[3] = el
            }}
            className="bg-background/10 backdrop-blur-sm p-6 rounded-lg border border-background/20"
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
            className="bg-background/10 backdrop-blur-sm p-6 rounded-lg border border-background/20"
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
            className="bg-background/10 backdrop-blur-sm p-6 rounded-lg border border-background/20 relative overflow-hidden"
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
