"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioAbout() {
  const t = useTranslations("about")
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        },
        y: 150,
        opacity: 0,
      })

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        },
        y: -100,
        opacity: 0,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-24"
    >
      <div className="max-w-7xl w-full">
        <h2
          ref={titleRef}
          className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tighter text-brutalist mb-16"
        >
          {t("title")}
        </h2>

        <div ref={textRef} className="grid md:grid-cols-2 gap-8 md:gap-16">
          <div className="space-y-6">
            <p className="text-2xl md:text-4xl font-bold leading-tight">
              {t("journey")}
            </p>
            <div className="border-4 border-foreground p-6 shadow-brutalist">
              <p className="text-lg md:text-xl font-semibold leading-relaxed">
                {t("description")}
              </p>
            </div>
            <div className="border-4 border-foreground p-6 bg-foreground text-background">
              <p className="text-lg md:text-xl font-bold">
                {t("evolution")}{" "}
                <span className="text-2xl">{t("evolutionWord")}</span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-foreground text-background p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-black mb-4">
                {t("techStack")}
              </h3>
              <ul className="space-y-3 text-lg md:text-xl font-bold">
                <li>→ NEXT.JS (SSR/SSG/ISR)</li>
                <li>→ REACT / TYPESCRIPT</li>
                <li>→ TAILWIND / RADIX UI</li>
                <li>→ GSAP / FRAMER MOTION </li>
                <li>→ PRISMA / NEXTAUTH</li>
                <li>→ PLAYWRIGHT / JEST</li>
                <li>→ TURBOREPO / CI/CD</li>
              </ul>
            </div>
            <div className="border-4 border-foreground p-6">
              <h3 className="text-xl md:text-2xl font-black mb-3">
                {t("education")}
              </h3>
              <p className="text-base md:text-lg font-bold whitespace-pre-line">
                {t("educationContent")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
