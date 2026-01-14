"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioHero() {
  const t = useTranslations("hero")
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
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

      // Scroll animation
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
      className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl w-full">
        <div className="space-y-8">
          <h1
            ref={nameRef}
            className="text-[clamp(3rem,15vw,12rem)] font-black leading-none tracking-tighter text-brutalist whitespace-pre-line"
          >
            {t("name")}
          </h1>
          <h2
            ref={titleRef}
            className="text-[clamp(2rem,8vw,6rem)] font-black leading-none tracking-tight border-l-8 border-foreground pl-6 md:pl-12 whitespace-pre-line"
          >
            {t("title")}
          </h2>
          <p
            ref={descRef}
            className="text-xl md:text-3xl font-bold max-w-3xl border-4 border-foreground p-6 md:p-8 shadow-brutalist-lg"
          >
            {t("tagline")}
          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-12 right-12 w-32 h-32 border-8 border-foreground hidden md:block" />
      <div className="absolute bottom-12 left-12 w-24 h-24 bg-foreground hidden md:block" />
    </section>
  )
}
