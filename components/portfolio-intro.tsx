"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "./split-text-reveal"
import { GlitchText } from "./glitch-text"
import { rgbSplitEffect, prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioIntro() {
  const t = useTranslations("hero")
  const sectionRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const background = backgroundRef.current
    const scrollIndicator = scrollIndicatorRef.current
    
    if (!section || !background || !scrollIndicator) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([section, scrollIndicator], { opacity: 1 })
        return
      }

      // Parallax scroll effect on entire hero
      gsap.to(section, {
        y: -150,
        opacity: 0.5,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Scroll indicator pulsing animation
      gsap.to(scrollIndicator, {
        y: 10,
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })

      // Background grain animation (subtle)
      gsap.to(background, {
        backgroundPosition: "50% 50%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "none",
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleScrollDown = () => {
    const nextSection = document.getElementById("journey")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden bg-foreground text-background"
      data-theme="dark"
    >
      {/* Grain texture background */}
      <div
        ref={backgroundRef}
        className="grain-overlay absolute inset-0 z-0"
      />

      {/* Parallax background layers */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="parallax-layer absolute top-1/4 left-1/4 w-96 h-96 bg-background/20 rounded-full blur-3xl" />
        <div className="parallax-layer absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-background/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl w-full">
        <div className="space-y-8 md:space-y-12">
          {/* Name with split-text character reveal */}
          <div className="overflow-hidden">
            <SplitTextReveal
              as="h1"
              className="text-[clamp(3rem,15vw,12rem)] font-black leading-none tracking-tighter"
              staggerFrom="random"
            >
              {t("name").replace("\n", " ")}
            </SplitTextReveal>
          </div>

          {/* Title with glitch effect */}
          <div className="overflow-hidden border-l-4 border-background/50 pl-6 md:pl-12">
            <GlitchText
              as="h2"
              className="text-[clamp(2rem,8vw,6rem)] font-black leading-none tracking-tight"
              delay={0.5}
              intensity={4}
            >
              {t("title").replace("\n", " ")}
            </GlitchText>
          </div>

          {/* Tagline with delayed reveal */}
          <div className="overflow-hidden">
            <SplitTextReveal
              as="p"
              className="text-xl md:text-3xl font-bold max-w-4xl bg-background/10 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-background/20"
              delay={1.2}
              staggerFrom="start"
            >
              {t("tagline")}
            </SplitTextReveal>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        ref={scrollIndicatorRef}
        onClick={handleScrollDown}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 scroll-indicator"
        aria-label="Scroll down"
        data-magnetic
      >
        <div className="flex flex-col items-center gap-2 group">
          <span className="text-sm md:text-base font-semibold tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
            SCROLL
          </span>
          <div className="w-6 h-10 border-2 border-background rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-background rounded-full animate-bounce" />
          </div>
        </div>
      </button>
    </section>
  )
}
