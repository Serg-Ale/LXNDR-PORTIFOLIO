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
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-16 md:py-24 relative overflow-hidden"
      data-theme="light"
    >
      <div className="max-w-7xl w-full">
        <h2
          ref={titleRef}
          className="text-[clamp(3rem,10vw,8rem)] font-bold leading-none tracking-tighter mb-16"
        >
          {t("title")}
        </h2>

        <div ref={textRef} className="grid md:grid-cols-2 gap-8 md:gap-16">
          <div className="space-y-6">
            <p className="text-2xl md:text-4xl font-semibold leading-tight">
              {t("journey")}
            </p>
            <div className="border border-foreground/20 p-6 rounded-lg shadow-modern-md bg-muted/50">
              <p className="text-lg md:text-xl font-medium leading-relaxed">
                {t("description")}
              </p>
            </div>
            <div className="bg-foreground/5 backdrop-blur-sm p-6 rounded-lg border">
              <p className="text-lg md:text-xl font-semibold">
                {t("evolution")}{" "}
                <span className="text-2xl font-bold">{t("evolutionWord")}</span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-foreground/5 p-6 md:p-8 rounded-lg border">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {t("techStack")}
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-foreground text-background px-4 py-2 rounded-full text-sm font-semibold">
                  → NEXT.JS (SSR/SSG/ISR)
                </span>
                <span className="inline-block bg-foreground text-background px-4 py-2 rounded-full text-sm font-semibold">
                  → REACT / TYPESCRIPT
                </span>
                <span className="inline-block bg-foreground text-background px-4 py-2 rounded-full text-sm font-semibold">
                  → TAILWIND / RADIX UI
                </span>
                <span className="inline-block bg-foreground text-background px-4 py-2 rounded-full text-sm font-semibold">
                  → GSAP / FRAMER MOTION
                </span>
                <span className="inline-block bg-foreground text-background px-4 py-2 rounded-full text-sm font-semibold">
                  → PRISMA / NEXTAUTH
                </span>
                <span className="inline-block bg-foreground text-background px-4 py-2 rounded-full text-sm font-semibold">
                  → PLAYWRIGHT / JEST
                </span>
                <span className="inline-block bg-foreground text-background px-4 py-2 rounded-full text-sm font-semibold">
                  → TURBOREPO / CI/CD
                </span>
              </div>
            </div>
            <div className="border p-6 rounded-lg shadow-modern-sm">
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                {t("education")}
              </h3>
              <p className="text-base md:text-lg font-medium whitespace-pre-line">
                {t("educationContent")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
