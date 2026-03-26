"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { prefersReducedMotion } from "@/lib/gsap-config"
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si"

gsap.registerPlugin(ScrollTrigger)

// Core Stack - What I use daily
const coreStack = [
  { name: "NEXT.JS", icon: SiNextdotjs },
  { name: "REACT", icon: SiReact },
  { name: "TYPESCRIPT", icon: SiTypescript },
]

// Architecture - How I build systems
const architectureStack = [
  "TURBOREPO",
  "PRISMA ORM",
  "NEXTAUTH",
  "REACT QUERY",
  "TRPC",
  "REST APIS",
]

// Testing - How I ensure quality
const testingStack = {
  tools: ["JEST", "REACT TESTING LIBRARY", "TDD"],
  metrics: [
    { value: "308", label: "AUTOMATED TESTS" },
    { value: "98%", label: "PASS RATE" },
  ],
}

// Also Proficient - Other skills
const otherSkills = [
  "JAVA",
  "PYTHON",
  "TAILWIND CSS",
  "GSAP",
  "NODE.JS",
  "POSTGRESQL",
  "GIT FLOW",
  "N8N",
  "DOCKER",
  "SCRUM",
]

export function PortfolioSkills() {
  const t = useTranslations("skills")
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // GSAP Animations
  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set("[data-skill-item]", { opacity: 1, y: 0 })
        return
      }

      // DRAMATIC PARALLAX: Skill items with varying speeds
      const skillItems = gsap.utils.toArray<HTMLElement>("[data-skill-item]")
      
      skillItems.forEach((item, index) => {
        // Each skill section moves at slightly different speed
        const speed = 0.9 - (index * 0.05) // Speeds decrease: 0.9, 0.85, 0.80
        const movement = 60 * (1 - speed)

        gsap.from(item, {
          y: movement,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100",
            end: "top center",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        })
      })

      // Core stack cards with extra zoom effect
      const coreCards = content.querySelectorAll("[data-core-card]")
      coreCards.forEach((card, index) => {
        const htmlCard = card as HTMLElement
        
        // Hover parallax
        htmlCard.addEventListener("mouseenter", () => {
          if (!prefersReducedMotion()) {
            gsap.to(htmlCard, {
              y: -12,
              scale: 1.05,
              duration: 0.4,
              ease: "power2.out",
            })
          }
        })

        htmlCard.addEventListener("mouseleave", () => {
          if (!prefersReducedMotion()) {
            gsap.to(htmlCard, {
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            })
          }
        })
      })
    }, content)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen flex items-center w-full text-foreground overflow-hidden"
      data-theme="light"
    >
      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 py-32 md:py-48 px-6 md:px-12 w-full"
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

          {/* CORE Stack - Primary Focus */}
          <div className="mb-16 md:mb-20" data-skill-item>
            <h3 className="text-sm font-black tracking-widest opacity-60 mb-6">
              {t("core.label")}
            </h3>
            <div className="flex flex-wrap gap-4 md:gap-6">
              {coreStack.map((skill) => {
                const Icon = skill.icon
                return (
                  <div
                    key={skill.name}
                    data-core-card
                    className="bg-foreground text-background px-8 py-6 md:px-12 md:py-8 flex items-center gap-4 md:gap-6 shadow-brutalist-inverted hover:shadow-brutalist-lg transition-shadow duration-300"
                  >
                    <Icon className="w-10 h-10 md:w-14 md:h-14" />
                    <span className="text-2xl md:text-4xl font-black tracking-tight">
                      {skill.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Architecture + Testing Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
            {/* Architecture */}
            <div
              className="bg-background border-4 border-foreground p-6 md:p-8 shadow-brutalist"
              data-skill-item
            >
              <h3 className="text-sm font-black tracking-widest opacity-60 mb-6">
                {t("architecture.label")}
              </h3>
              <div className="flex flex-wrap gap-3">
                {architectureStack.map((skill) => (
                  <span
                    key={skill}
                    className="border-2 border-foreground px-4 py-2 text-sm md:text-base font-bold hover:bg-foreground hover:text-background transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Testing */}
            <div
              className="bg-background border-4 border-foreground p-6 md:p-8 shadow-brutalist"
              data-skill-item
            >
              <h3 className="text-sm font-black tracking-widest opacity-60 mb-6">
                {t("testing.label")}
              </h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {testingStack.tools.map((tool) => (
                  <span
                    key={tool}
                    className="border-2 border-foreground px-4 py-2 text-sm md:text-base font-bold hover:bg-foreground hover:text-background transition-colors duration-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              {/* Testing Metrics */}
              <div className="flex gap-6 pt-4 border-t-2 border-foreground/20">
                {testingStack.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-3xl md:text-4xl font-black tracking-tight">
                      {metric.value}
                    </p>
                    <p className="text-xs font-semibold tracking-wider opacity-70">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Also Proficient */}
          <div data-skill-item>
            <h3 className="text-sm font-black tracking-widest opacity-60 mb-6">
              {t("also.label")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {otherSkills.map((skill) => (
                <span
                  key={skill}
                  className="border-2 border-foreground/50 px-4 py-2 text-sm font-semibold opacity-70 hover:opacity-100 hover:border-foreground transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
