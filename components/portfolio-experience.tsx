"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioExperience() {
  const t = useTranslations("experience")
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([])

  const jobs = t.raw("jobs")

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

      experienceRefs.current.forEach((exp, index) => {
        if (!exp) return

        const direction = index % 2 === 0 ? 100 : -100

        gsap.from(exp, {
          scrollTrigger: {
            trigger: exp,
            start: "top bottom-=50",
            end: "top center",
            scrub: 1,
          },
          x: direction,
          opacity: 0,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen px-6 md:px-12 py-16 md:py-24 bg-foreground text-background relative overflow-hidden"
      data-theme="dark"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-[clamp(3rem,10vw,8rem)] font-bold leading-none tracking-tighter mb-16"
        >
          {t("title")}
        </h2>

        <div className="space-y-12">
          {jobs.map((exp: any, index: number) => (
            <div
              key={index}
              ref={(el) => {
                experienceRefs.current[index] = el
              }}
              className="border border-background/20 p-6 md:p-8 rounded-lg shadow-modern-md hover:shadow-modern-lg hover:scale-[1.01] transition-all"
            >
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
                      {exp.company}
                    </h3>
                    <p className="text-xl md:text-2xl font-semibold">
                      {exp.role}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-base md:text-lg font-medium opacity-70">
                      {exp.period}
                    </p>
                    <p className="text-base md:text-lg font-medium opacity-70">
                      {exp.location}
                    </p>
                  </div>
                </div>

                <div className="border-t border-background/20 pt-4">
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight: string, idx: number) => (
                      <li
                        key={idx}
                        className="text-base md:text-lg font-medium flex items-start gap-3"
                      >
                        <span className="text-xl font-bold mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
