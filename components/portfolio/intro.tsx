"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollTextReveal, ManifestoWord } from "@/components/shared/scroll-text-reveal"
import { StatReveal, StatItem } from "@/components/shared/stat-reveal"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioIntro() {
  const t = useTranslations("hero")
  const sectionRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const firstNameRef = useRef<HTMLSpanElement>(null)
  const lastNameRef = useRef<HTMLSpanElement>(null)
  const roleRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null)

  // Build manifesto words for ScrollTextReveal - EXPRESSIVE TYPOGRAPHY
  const manifestoWords: ManifestoWord[] = [
    // "I" - Small, light, whisper-like, sets the stage
    {
      text: t("manifesto.word1"),
      position: "left",
      font: "space",
      size: "sm",
      weight: "light",
      tracking: "ultra-wide",
      transform: "uppercase",
      opacity: "muted",
    },
    // "build" - MASSIVE, condensed, screaming
    {
      text: t("manifesto.word2"),
      position: "indent-1",
      font: "bebas",
      size: "2xl",
      weight: "black",
      tracking: "tight",
      style: ["scream", "condensed"],
      transform: "uppercase",
    },
    // "production" - Outlined, wide tracking, technical feel
    {
      text: t("manifesto.word3"),
      position: "center",
      font: "space",
      size: "lg",
      weight: "bold",
      tracking: "wide",
      style: "outlined",
      transform: "uppercase",
    },
    // "systems" - MASSIVE, bold, screaming uppercase
    {
      text: t("manifesto.word4"),
      position: "indent-2",
      font: "bebas",
      size: "3xl",
      weight: "black",
      tracking: "tight",
      style: ["scream", "condensed"],
      transform: "uppercase",
    },
    // "that" - Tiny, technical, monospace whisper
    {
      text: t("manifesto.word5"),
      position: "right",
      font: "mono",
      size: "xs",
      weight: "normal",
      tracking: "ultra-wide",
      style: "technical",
      transform: "lowercase",
      opacity: "muted",
    },
    // "SCALE" - HERO HIGHLIGHT with rotation and massive presence
    {
      text: t("manifesto.highlight"),
      position: "right",
      font: "bebas",
      size: "3xl",
      weight: "black",
      style: ["highlight-large", "rotate"],
      transform: "uppercase",
    },
    // Metrics line - Technical, monospace, data aesthetic
    {
      text: t("manifesto.metrics"),
      position: "right",
      font: "mono",
      size: "sm",
      weight: "medium",
      tracking: "wide",
      style: "technical",
      opacity: "muted",
    },
  ]

  // Build stats for StatReveal
  const stats: StatItem[] = [
    { value: t("stats.years"), label: t("stats.yearsLabel") },
    { value: t("stats.loc"), label: t("stats.locLabel") },
    { value: t("stats.tests"), label: t("stats.testsLabel") },
    { value: t("stats.uptime"), label: t("stats.uptimeLabel") },
  ]

  useEffect(() => {
    const hero = heroRef.current
    const firstName = firstNameRef.current
    const lastName = lastNameRef.current
    const role = roleRef.current
    const scrollIndicator = scrollIndicatorRef.current

    if (!hero || !firstName || !lastName || !scrollIndicator) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([firstName, lastName, role, scrollIndicator], { opacity: 1 })
        return
      }

      // Initial states
      gsap.set(firstName, { opacity: 0, x: -100 })
      gsap.set(lastName, { opacity: 0, x: 100 })
      gsap.set(role, { opacity: 0, y: 30 })

      // Name reveal timeline
      const tl = gsap.timeline({ delay: 0.2 })

      tl.to(firstName, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(lastName, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.7")
      .to(role, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5")

      // Scroll indicator pulse
      gsap.to(scrollIndicator, {
        y: 10,
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })

      // Hero parallax on scroll
      gsap.to(hero, {
        y: -100,
        opacity: 0.6,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, hero)

    return () => ctx.revert()
  }, [])

  const handleScrollDown = () => {
    const manifesto = document.getElementById("manifesto")
    if (manifesto) {
      manifesto.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Section 1: Hero with split name */}
      <section
        ref={sectionRef}
        id="intro"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground text-background"
        data-theme="dark"
      >
        {/* Grain texture */}
        <div className="grain-overlay absolute inset-0 z-0" />

        {/* Parallax background */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-background/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-background/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div ref={heroRef} className="relative z-10 w-full px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            {/* Split name layout */}
            <h1 className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
              {/* First name - Large, left-aligned */}
              <span
                ref={firstNameRef}
                className="text-[clamp(4rem,18vw,14rem)] font-black leading-[0.8] tracking-tighter font-bebas text-balance"
              >
                {t("firstName")}
              </span>

              {/* Last name - Outlined, right-aligned */}
              <span
                ref={lastNameRef}
                className="text-[clamp(2.5rem,10vw,8rem)] font-black leading-[0.85] tracking-tight text-outlined md:text-right font-space text-balance"
              >
                {t("lastName")}
              </span>
            </h1>

            {/* Role + Location */}
            <div
              ref={roleRef}
              className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-center gap-2 md:gap-6"
            >
              <span className="text-lg md:text-2xl font-bold tracking-widest opacity-80 font-mono">
                {t("role")}
              </span>
              <span className="hidden md:block w-12 h-[2px] bg-background/50" />
              <span className="text-base md:text-xl font-medium tracking-wider opacity-60">
                {t("location")}
              </span>
            </div>

            {/* Stats - integrated with hero */}
            <div className="mt-8 md:mt-12">
              <StatReveal
                stats={stats}
                triggerOnScroll={false}
                className="justify-start"
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          ref={scrollIndicatorRef}
          onClick={handleScrollDown}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
          aria-label={t("scrollDown")}
        >
          <div className="flex flex-col items-center gap-2 group">
            <span className="text-sm md:text-base font-semibold tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
              SCROLL
            </span>
            <div className="w-6 h-10 border-2 border-background flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-background" />
            </div>
          </div>
        </button>
      </section>

      {/* Section 2: Manifesto with scroll-triggered word reveal */}
      <section
        id="manifesto"
        className="relative bg-foreground text-background overflow-hidden"
        data-theme="dark"
      >
        <div className="grain-overlay absolute inset-0 z-0 pointer-events-none" />
        <ScrollTextReveal
          words={manifestoWords}
          scrollLength={100}
          pinned={true}
          className="relative z-10"
        />
      </section>

    </>
  )
}
