"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioImpact() {
  const t = useTranslations("experience")
  const tProjects = useTranslations("projects")
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeCard, setActiveCard] = useState<number | null>(null)

  const jobs = t.raw("jobs")
  const projects = tProjects.raw("list")

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(cardRefs.current, { opacity: 1, y: 0 })
        return
      }

      // Animate cards with parallax and 3D effect
      cardRefs.current.forEach((card, index) => {
        if (!card) return

        // Initial reveal
        gsap.from(card, {
          y: 150,
          opacity: 0,
          rotationX: -15,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50",
            end: "top center",
            scrub: 1,
          },
        })

        // Parallax effect
        gsap.to(card, {
          y: -50 * ((index % 3) + 1),
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handle3DTilt = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    if (prefersReducedMotion()) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const resetCard = (card: HTMLDivElement) => {
    if (prefersReducedMotion()) return

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    })
  }

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative min-h-screen px-6 md:px-12 py-24 md:py-32 bg-background text-foreground overflow-hidden"
      data-theme="light"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-foreground/5 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section title */}
        <div ref={titleRef} className="mb-16 md:mb-24">
          <SplitTextReveal
            as="h2"
            className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tighter"
            triggerOnScroll
            staggerFrom="start"
          >
            IMPACT_
          </SplitTextReveal>
          <p className="text-xl md:text-2xl font-bold mt-6 opacity-70">
            Where experience meets execution
          </p>
        </div>

        {/* Experience cards */}
        <div className="space-y-12 md:space-y-16 mb-24">
          <h3 className="text-3xl md:text-4xl font-black tracking-tight">
            {t("title")}
          </h3>
          
          {jobs.map((job: any, index: number) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              data-magnetic
              onMouseMove={(e) => handle3DTilt(e, e.currentTarget)}
              onMouseLeave={(e) => resetCard(e.currentTarget)}
              className="card-3d group bg-foreground text-background p-8 md:p-10 rounded-lg border-4 border-foreground hover:shadow-brutalist transition-shadow cursor-pointer parallax-layer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <div className="inline-block bg-background text-foreground px-3 py-1 rounded-full text-xs font-bold mb-3">
                      {job.period}
                    </div>
                    <h4 className="text-3xl md:text-5xl font-black leading-tight mb-2 group-hover:text-outlined-hover-dark transition-all">
                      {job.company}
                    </h4>
                    <p className="text-xl md:text-2xl font-bold opacity-90">
                      {job.role}
                    </p>
                  </div>
                  <div className="text-sm md:text-base font-bold opacity-70">
                    {job.location}
                  </div>
                </div>

                <div className="border-t border-background/20 pt-6">
                  <ul className="grid md:grid-cols-2 gap-4">
                    {job.highlights.map((highlight: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 bg-background/10 p-4 rounded-lg"
                      >
                        <span className="text-2xl font-black mt-1 flex-shrink-0">→</span>
                        <span className="text-base md:text-lg font-semibold leading-snug">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Projects showcase */}
        <div className="space-y-12">
          <h3 className="text-3xl md:text-4xl font-black tracking-tight">
            {tProjects("title")}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project: any, index: number) => (
              <div
                key={project.number}
                ref={(el) => {
                  cardRefs.current[jobs.length + index] = el
                }}
                data-magnetic
                onMouseMove={(e) => handle3DTilt(e, e.currentTarget)}
                onMouseLeave={(e) => resetCard(e.currentTarget)}
                className="card-3d group bg-foreground/5 p-6 md:p-8 rounded-lg border-2 border-foreground/20 hover:border-foreground hover:bg-foreground/10 transition-all cursor-pointer parallax-layer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-6xl font-black opacity-20 group-hover:opacity-40 transition-opacity">
                      {project.number}
                    </span>
                    <div className="w-3 h-3 bg-foreground rounded-full pulse-dot" />
                  </div>
                  
                  <h4 className="text-2xl md:text-3xl font-black leading-tight">
                    {project.title}
                  </h4>
                  
                  <p className="text-base md:text-lg font-medium opacity-80 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((tech: string) => (
                      <span
                        key={tech}
                        className="inline-block bg-foreground text-background px-3 py-1 rounded-full text-xs font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
