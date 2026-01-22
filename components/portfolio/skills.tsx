"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

const techStack = [
  "NEXT.JS (SSR/SSG/ISR)",
  "REACT / TYPESCRIPT",
  "TAILWIND / RADIX UI",
  "GSAP / FRAMER MOTION",
  "PRISMA / NEXTAUTH",
  "PLAYWRIGHT / JEST",
  "TURBOREPO / CI/CD",
  "tRPC / REACT QUERY",
]

export function PortfolioSkills() {
  const t = useTranslations("about")
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const skillRefs = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    
    if (!section || !grid) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(skillRefs.current, { opacity: 1, scale: 1 })
        return
      }

      // Animate skills from center outward
      skillRefs.current.forEach((skill, index) => {
        if (!skill) return

        gsap.from(skill, {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: grid,
            start: "top center",
            onEnter: () => {
              gsap.to(skill, {
                scale: 1,
                opacity: 1,
                delay: index * 0.08,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)",
              })
            },
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSkillHover = (index: number, skill: HTMLDivElement) => {
    if (prefersReducedMotion()) return

    setHoveredSkill(index)

    gsap.to(skill, {
      scale: 1.1,
      rotation: gsap.utils.random(-2, 2),
      duration: 0.3,
      ease: "power2.out",
    })

    // Create ripple effect on nearby skills
    skillRefs.current.forEach((otherSkill, otherIndex) => {
      if (!otherSkill || otherIndex === index) return

      const distance = Math.abs(otherIndex - index)
      if (distance <= 2) {
        gsap.to(otherSkill, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    })
  }

  const handleSkillLeave = (skill: HTMLDivElement) => {
    if (prefersReducedMotion()) return

    setHoveredSkill(null)

    gsap.to(skill, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    })

    // Reset all skills
    skillRefs.current.forEach((otherSkill) => {
      if (!otherSkill) return
      gsap.to(otherSkill, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    })
  }

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen px-6 md:px-12 py-24 md:py-32 bg-foreground text-background overflow-hidden"
      data-theme="dark"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-background/10 opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section title */}
        <div ref={titleRef} className="mb-16 md:mb-24">
          <SplitTextReveal
            as="h2"
            className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tighter"
            triggerOnScroll
            staggerFrom="center"
          >
            {t("techStack")}
          </SplitTextReveal>
        </div>

        {/* Skills grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {techStack.map((tech, index) => (
            <div
              key={tech}
              ref={(el) => {
                skillRefs.current[index] = el
              }}
              data-magnetic
              onMouseEnter={(e) => handleSkillHover(index, e.currentTarget)}
              onMouseLeave={(e) => handleSkillLeave(e.currentTarget)}
              className="group relative bg-background text-foreground p-6 md:p-8 rounded-lg border-4 border-background hover:border-background/80 transition-colors cursor-pointer hover-distort"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-background/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              
              <div className="relative z-10">
                <span className="text-lg md:text-xl font-black tracking-tight block">
                  → {tech}
                </span>
              </div>

              {/* Animated corner accent */}
              <div className="absolute top-2 right-2 w-3 h-3 bg-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity pulse-dot" />
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { label: "YEARS", value: "2+" },
            { label: "PROJECTS", value: "10+" },
            { label: "TECH STACK", value: techStack.length },
            { label: "COMMITS", value: "500+" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-background/10 backdrop-blur-sm rounded-lg border border-background/20 hover-distort"
              data-magnetic
            >
              <div className="text-4xl md:text-6xl font-black mb-2 text-outlined-hover-dark">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-bold tracking-wider opacity-70">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
