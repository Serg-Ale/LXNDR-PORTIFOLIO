"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { GlitchText } from "@/components/shared/glitch-text"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioVision() {
  const t = useTranslations("vision")
  const sectionRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const quote = quoteRef.current
    const list = listRef.current

    if (!section) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([quote, list], { opacity: 1, y: 0 })
        return
      }

      // Quote entrance with scale and parallax
      if (quote) {
        gsap.from(quote, {
          scale: 0.95,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quote,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        })

        // Parallax on quote - slower movement
        gsap.to(quote, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: quote,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      }

      // List items stagger animation with parallax
      if (list) {
        gsap.from(list.children, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: list,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        })

        // Each list item moves at slightly different speeds
        Array.from(list.children).forEach((child, index) => {
          const speed = 0.9 - index * 0.05 // 0.9, 0.85, 0.80
          gsap.to(child, {
            y: -40 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          })
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const lookingFor = [
    t("lookingFor.item1"),
    t("lookingFor.item2"),
    t("lookingFor.item3"),
  ]

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative min-h-screen flex items-center px-6 md:px-12 py-32 md:py-48 bg-foreground text-background overflow-hidden"
      data-theme="dark"
    >
      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0" />

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-background rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[32rem] h-[32rem] bg-background rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
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

        {/* Main Quote */}
        <div
          ref={quoteRef}
          className="mb-16 md:mb-24 border-4 border-background/30 p-8 md:p-16"
        >
          <p className="text-[clamp(1.5rem,5vw,4rem)] font-black leading-tight tracking-tight text-center">
            "{t("quote")}"
          </p>
        </div>

        {/* What I'm Looking For */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <GlitchText
              as="h3"
              className="text-2xl md:text-4xl font-black mb-8 tracking-tight"
              delay={0.2}
              intensity={2}
            >
              {t("lookingFor.title")}
            </GlitchText>
          </div>

          <div ref={listRef} className="space-y-6">
            {lookingFor.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 md:gap-6 group"
              >
                <span className="text-4xl md:text-6xl font-black opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-lg md:text-2xl font-semibold leading-relaxed pt-2 md:pt-4">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
