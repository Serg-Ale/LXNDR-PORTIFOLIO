"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { EvangelionBackground } from "./evangelion-background"
import { GlitchText } from "@/components/shared/glitch-text"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioHero() {
  const t = useTranslations("hero")
  const { resolvedTheme } = useTheme()
  const heroRef = useRef<HTMLDivElement>(null)

  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Evangelion-style scroll parallax with more dramatic effect
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        y: -150,
        opacity: 0.7,
        scale: 0.95,
      })

      // Add subtle background animation
      gsap.to(".evangelion-bg", {
        backgroundPosition: "60% 40%",
        duration: 15,
        ease: "none",
        repeat: -1,
        yoyo: true,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden"
    >
      <EvangelionBackground className="absolute inset-0 -z-10" />

      <div className="max-w-7xl w-full relative z-10">
        <div className="space-y-12 text-center">
          <GlitchText
            as="h1"
            className="text-[clamp(4rem,18vw,14rem)] font-black leading-none tracking-tighter whitespace-pre-line text-white"
            delay={0.2}
            intensity={8}
            evangelionMode={true}
          >
            {t("name")}
          </GlitchText>

          <GlitchText
            as="h2"
            className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-none tracking-tight text-cyan-400 border-l-4 border-cyan-400/50 pl-8 md:pl-16 whitespace-pre-line"
            delay={0.6}
            intensity={6}
            evangelionMode={true}
          >
            {t("title")}
          </GlitchText>

          <div className="max-w-4xl mx-auto">
            <p
              className="text-xl md:text-4xl font-semibold bg-black/60 backdrop-blur-md p-8 md:p-12 rounded-xl border border-cyan-400/30 shadow-2xl text-white leading-relaxed"
            >
              {t("tagline")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
