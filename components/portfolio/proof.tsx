"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string
  tagline: string
  tech: string[]
  url: string | null
}

export function PortfolioProof() {
  const t = useTranslations("proof")
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const projects = t.raw("projects") as Project[]

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

        // Entrance animation with scale
        gsap.from(card, {
          y: 100,
          scale: 0.95,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        })

        // Use entrance-only animations for cards
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="proof"
      className="relative min-h-screen flex items-center px-6 md:px-12 py-32 md:py-48 text-foreground"
      data-theme="light"
    >
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
              key={project.title}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className="relative border-4 border-foreground bg-background p-8 text-foreground shadow-brutalist transition-shadow duration-300 hover:shadow-brutalist-lg md:p-12"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              <div className="grid gap-8 md:grid-cols-12 md:gap-12">
                {/* Number */}
                <div className="md:col-span-2">
                  <span className="text-6xl font-black tracking-tight opacity-20 md:text-8xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-6 md:col-span-10">
                  {/* Title + Tagline */}
                  <div>
                    <h3 className="mb-3 text-3xl font-black tracking-tight md:text-5xl">
                      {project.title}
                    </h3>
                    <p className="text-lg font-semibold opacity-80 md:text-xl">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Stack + Link */}
                  <div className="flex flex-wrap items-center gap-4 border-t-2 border-current/10 pt-4">
                    <div className="flex flex-1 flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="bg-foreground/10 px-2 py-1 text-xs font-bold tracking-wider"
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
                        className="flex items-center gap-2 font-bold tracking-wider text-foreground transition-opacity duration-200 hover:opacity-70"
                      >
                        VIEW LIVE
                        {HiMiniArrowTopRightOnSquare({ className: "h-5 w-5" })}
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
