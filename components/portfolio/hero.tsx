"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioHero() {
  const t = useTranslations("hero")
  const { resolvedTheme } = useTheme()
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(nameRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      })

      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power4.out",
      })

      gsap.from(descRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power4.out",
      })

      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -100,
        opacity: 0.8,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className={`min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden theme-transition-rgb ${
        isDark ? "bg-foreground text-background" : "bg-background text-foreground"
      }`}
    >
      <div className="max-w-7xl w-full">
        <div className="space-y-8">
          <h1
            ref={nameRef}
            className="text-[clamp(3rem,15vw,12rem)] font-bold leading-none tracking-tighter whitespace-pre-line"
          >
            {t("name")}
          </h1>
          <h2
            ref={titleRef}
            className="text-[clamp(2rem,8vw,6rem)] font-bold leading-none tracking-tight border-l-2 border-current/50 pl-6 md:pl-12 whitespace-pre-line opacity-90"
          >
            {t("title")}
          </h2>
          <p
            ref={descRef}
            className="text-xl md:text-3xl font-semibold max-w-3xl bg-current/10 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-modern-lg"
          >
            {t("tagline")}
          </p>
        </div>
      </div>
    </section>
  )
}
