"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

interface Milestone {
  year: string
  company: string
  role: string
  metric: string
  metricLabel: string
}

export function PortfolioJourney() {
  const t = useTranslations("journey")
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const milestones: Milestone[] = [
    {
      year: "2022",
      company: "TCS",
      role: t("milestones.0.role"),
      metric: t("milestones.0.metric"),
      metricLabel: t("milestones.0.metricLabel"),
    },
    {
      year: "2023",
      company: "TCS",
      role: t("milestones.1.role"),
      metric: t("milestones.1.metric"),
      metricLabel: t("milestones.1.metricLabel"),
    },
    {
      year: "2025",
      company: "UNION",
      role: t("milestones.2.role"),
      metric: t("milestones.2.metric"),
      metricLabel: t("milestones.2.metricLabel"),
    },
    {
      year: "NOW",
      company: "UNION",
      role: t("milestones.3.role"),
      metric: t("milestones.3.metric"),
      metricLabel: t("milestones.3.metricLabel"),
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    const timeline = timelineRef.current
    const progress = progressRef.current

    if (!section || !timeline) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([...cardRefs.current, progress], { opacity: 1 })
        return
      }

      // DRAMATIC PARALLAX: Progress bar moves faster than scroll (1.3x speed)
      if (progress) {
        gsap.fromTo(progress, 
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: {
              trigger: timeline,
              start: "top center",
              end: "bottom center",
              scrub: 0.5, // Faster scrub for more dramatic effect
            },
          }
        )
      }

      // Cards with zoom and stagger parallax
      cardRefs.current.forEach((card, index) => {
        if (!card) return

        // Each card zooms in from smaller scale
        gsap.from(card, {
          y: 80,
          opacity: 0,
          scale: 0.9,
          rotation: index % 2 === 0 ? -1 : 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        })

        // Add hover parallax effect (subtle float)
        card.addEventListener("mouseenter", () => {
          if (!prefersReducedMotion()) {
            gsap.to(card, {
              y: -8,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
            })
          }
        })

        card.addEventListener("mouseleave", () => {
          if (!prefersReducedMotion()) {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            })
          }
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-32 md:py-48 text-foreground overflow-hidden"
      data-theme="light"
    >
      <div className="max-w-7xl mx-auto w-full">
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
        <div ref={timelineRef} className="relative">
          {/* Progress line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-foreground/20 hidden md:block">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full w-full bg-foreground"
            />
          </div>

          {/* Timeline cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 pt-8 md:pt-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className={`
                  relative p-6 md:p-8 transition-shadow duration-300
                  ${
                    index === milestones.length - 1
                      ? "bg-foreground text-background shadow-brutalist-inverted hover:shadow-brutalist-lg"
                      : "bg-background border-4 border-foreground shadow-brutalist hover:shadow-brutalist-lg"
                  }
                `}
              >
                {/* Year marker */}
                <div className="absolute -top-4 left-6 md:left-8">
                  <span
                    className={`
                    text-sm font-black tracking-widest px-3 py-1
                    ${
                      index === milestones.length - 1
                        ? "bg-background text-foreground"
                        : "bg-foreground text-background"
                    }
                  `}
                  >
                    {milestone.year}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-4">
                  <p className="text-xs font-black tracking-widest opacity-60 mb-2">
                    {milestone.company}
                  </p>
                  <h3 className="text-lg md:text-xl font-black mb-4 tracking-tight leading-tight">
                    {milestone.role}
                  </h3>

                  {/* Metric highlight */}
                  <div className="mt-6 pt-4 border-t-2 border-current/20">
                    <p className="text-3xl md:text-4xl font-black tracking-tight">
                      {milestone.metric}
                    </p>
                    <p className="text-xs md:text-sm font-semibold tracking-wider opacity-70 mt-1">
                      {milestone.metricLabel}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion quote */}
        <div className="mt-16 md:mt-24 text-center">
          <p className="text-xl md:text-2xl font-bold opacity-80 max-w-3xl mx-auto">
            "{t("conclusion")}"
          </p>
        </div>
      </div>
    </section>
  )
}
