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
      className="min-h-screen px-6 md:px-12 py-24"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          ref={titleRef}
          className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tighter text-brutalist mb-16"
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
              className="border-4 border-foreground p-6 md:p-8 hover:shadow-brutalist-lg transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black leading-tight mb-2">
                      {exp.company}
                    </h3>
                    <p className="text-xl md:text-2xl font-bold">
                      {exp.role}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-base md:text-lg font-bold opacity-70">
                      {exp.period}
                    </p>
                    <p className="text-base md:text-lg font-bold opacity-70">
                      {exp.location}
                    </p>
                  </div>
                </div>

                <div className="border-t-2 border-foreground pt-4">
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="text-base md:text-lg font-semibold flex items-start gap-3"
                      >
                        <span className="text-xl font-black mt-1">•</span>
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
