"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { HiArrowTopRightOnSquare } from "react-icons/hi2"
import { Link } from "@/i18n/routing"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  number: string
  title: string
  tagline: string
  metrics: { value: string; label: string }[]
  stack: string[]
  url?: string
  isMeta?: boolean
}

export function PortfolioProof() {
  const t = useTranslations("proof")
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const projects: Project[] = [
    {
      number: "01",
      title: t("projects.0.title"),
      tagline: t("projects.0.tagline"),
      metrics: [
        { value: "100+", label: t("projects.0.metrics.0.label") },
        { value: "19K+", label: t("projects.0.metrics.1.label") },
        { value: "MVP", label: t("projects.0.metrics.2.label") },
      ],
      stack: ["NEXT.JS 16", "REACT QUERY", "TAILWIND", "RADIX UI", "JEST"],
      url: "https://www.unionaudio.com.br",
    },
    {
      number: "02",
      title: t("projects.1.title"),
      tagline: t("projects.1.tagline"),
      metrics: [
        { value: "19K+", label: t("projects.1.metrics.0.label") },
        { value: "308", label: t("projects.1.metrics.1.label") },
        { value: "98%", label: t("projects.1.metrics.2.label") },
      ],
      stack: ["NEXT.JS 16", "PRISMA", "NEXTAUTH", "N8N", "REACT QUERY"],
    },
    {
      number: "03",
      title: t("projects.2.title"),
      tagline: t("projects.2.tagline"),
      metrics: [
        { value: "2", label: t("projects.2.metrics.0.label") },
        { value: "GSAP", label: t("projects.2.metrics.1.label") },
        { value: "MDX", label: t("projects.2.metrics.2.label") },
      ],
      stack: ["NEXT.JS 16", "REACT 19", "GSAP", "NEXT-INTL", "TAILWIND V4"],
      url: "https://lxndr-portifolio.vercel.app",
      isMeta: true,
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(cardRefs.current, { opacity: 1, y: 0 })
        return
      }

      cardRefs.current.forEach((card, index) => {
        if (!card) return

        // 3D tilt effect on hover
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          const rotateX = (y - centerY) / 20
          const rotateY = (centerX - x) / 20

          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out",
          })
        }

        card.addEventListener("mousemove", handleMouseMove)
        card.addEventListener("mouseleave", handleMouseLeave)

        // Scroll animation
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="proof"
      className="relative px-6 md:px-12 py-24 md:py-32 bg-background text-foreground"
      data-theme="light"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/[0.02] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
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

        {/* Projects Grid */}
        <div className="space-y-8 md:space-y-12">
          {projects.map((project, index) => (
            <div
              key={project.number}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className={`
                relative border-4 border-foreground p-8 md:p-12
                shadow-brutalist hover:shadow-brutalist-lg
                transition-shadow duration-300
                ${project.isMeta ? "bg-foreground text-background" : "bg-background"}
              `}
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              {/* Meta badge for portfolio */}
              {project.isMeta && (
                <div className="absolute top-4 right-4 md:top-6 md:right-6">
                  <span className="bg-background text-foreground px-3 py-1 text-xs font-black tracking-widest">
                    META
                  </span>
                </div>
              )}

              <div className="grid md:grid-cols-12 gap-8 md:gap-12">
                {/* Number */}
                <div className="md:col-span-2">
                  <span
                    className={`
                    text-6xl md:text-8xl font-black tracking-tight
                    ${project.isMeta ? "opacity-30" : "opacity-20"}
                  `}
                  >
                    {project.number}
                  </span>
                </div>

                {/* Content */}
                <div className="md:col-span-10 space-y-6">
                  {/* Title + Tagline */}
                  <div>
                    <h3 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-lg md:text-xl font-semibold opacity-80">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-4 md:gap-6">
                    {project.metrics.map((metric, metricIndex) => (
                      <div
                        key={metricIndex}
                        className={`
                          px-4 py-3 md:px-6 md:py-4 border-2
                          ${project.isMeta ? "border-background/30" : "border-foreground/30"}
                        `}
                      >
                        <p className="text-2xl md:text-3xl font-black tracking-tight">
                          {metric.value}
                        </p>
                        <p className="text-xs font-semibold tracking-wider opacity-70">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Stack + Link */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t-2 border-current/10">
                    <div className="flex flex-wrap gap-2 flex-1">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className={`
                            text-xs font-bold tracking-wider px-2 py-1
                            ${project.isMeta ? "bg-background/10" : "bg-foreground/10"}
                          `}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          flex items-center gap-2 font-bold tracking-wider
                          hover:opacity-70 transition-opacity duration-200
                          ${project.isMeta ? "text-background" : "text-foreground"}
                        `}
                      >
                        VIEW LIVE
                        <HiArrowTopRightOnSquare className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
