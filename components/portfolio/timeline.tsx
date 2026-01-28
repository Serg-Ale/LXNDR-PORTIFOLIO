"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioTimeline() {
  const t = useTranslations("timeline")
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([])

  const milestones = t.raw("milestones")

  useEffect(() => {
    const section = sectionRef.current
    const line = lineRef.current

    if (!section || !line) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([line, ...milestoneRefs.current], { opacity: 1, scaleY: 1 })
        return
      }

      // Timeline line grows on scroll
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        }
      )

      // Milestone animations
      milestoneRefs.current.forEach((milestone, index) => {
        if (!milestone) return

        const isLeft = index % 2 === 0

        gsap.from(milestone, {
          x: isLeft ? -150 : 150,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: milestone,
            start: "top bottom-=100",
            end: "top center",
            scrub: 1,
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative min-h-screen px-6 md:px-12 py-24 md:py-32 bg-background text-foreground"
      data-theme="light"
    >
      <div className="max-w-7xl mx-auto">
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

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-foreground origin-top"
            style={{ transform: "translateX(-50%) scaleY(0)" }}
          />

          {/* Milestones */}
          <div className="space-y-16 md:space-y-24">
            {milestones.map((milestone: any, index: number) => {
              const isLeft = index % 2 === 0

              return (
                <div
                  key={index}
                  ref={(el) => {
                    milestoneRefs.current[index] = el
                  }}
                  className={`relative flex items-start ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 md:gap-16`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 bg-foreground rounded-full border-4 border-background transform -translate-x-1/2 pulse-dot z-10" />

                  {/* Content card */}
                  <div
                    className={`flex-1 ml-20 md:ml-0 ${
                      isLeft ? "md:text-right md:pr-16" : "md:pl-16"
                    }`}
                  >
                    <div className="bg-foreground text-background p-6 md:p-8 border-4 border-foreground shadow-brutalist hover:shadow-brutalist-lg transition-shadow">
                      {/* Period badge */}
                      <div
                        className={`inline-block bg-background text-foreground px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                          isLeft ? "md:float-right md:ml-4" : "md:float-left md:mr-4"
                        }`}
                      >
                        {milestone.period}
                      </div>

                      {/* Company & Role */}
                      <h3 className="text-2xl md:text-4xl font-black mb-2 clear-both">
                        {milestone.company}
                      </h3>
                      <p className="text-xl md:text-2xl font-bold mb-2 opacity-90">
                        {milestone.role}
                      </p>
                      <p className="text-sm font-bold opacity-70 mb-6">
                        {milestone.location}
                      </p>

                      {/* Description */}
                      {milestone.description && (
                        <p className="text-lg font-semibold mb-6 leading-relaxed opacity-80">
                          {milestone.description}
                        </p>
                      )}

                      {/* Highlights */}
                      <ul className="space-y-3">
                        {milestone.highlights.map((highlight: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 bg-background/10 p-3 rounded"
                          >
                            <span className="text-xl font-black flex-shrink-0">→</span>
                            <span className="text-base font-semibold">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              )
            })}
          </div>

          {/* Conclusion */}
          <div className="mt-20 md:mt-32 text-center">
            <p className="text-3xl md:text-5xl font-black tracking-tight">
              {t("conclusion")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
