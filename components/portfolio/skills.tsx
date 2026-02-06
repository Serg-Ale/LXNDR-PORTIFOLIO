"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { prefersReducedMotion } from "@/lib/gsap-config"
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiJest,
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

// Tech terms for Matrix rain
const techTerms = [
  "NEXT.JS", "REACT", "TYPESCRIPT", "TAILWIND", "PRISMA", "JEST",
  "NODE", "API", "AUTH", "TEST", "CODE", "BUILD", "SHIP",
]

export function PortfolioSkills() {
  const t = useTranslations("skills")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Matrix Rain Effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !mounted) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const streams: {
      x: number
      characters: { char: string; y: number; opacity: number; speed: number }[]
    }[] = []

    const CHAR_HEIGHT = 14
    const CHARS_PER_STREAM = 12
    const TARGET_FPS = 60
    const FRAME_INTERVAL = 1000 / TARGET_FPS
    let lastFrameTime = 0

    ctx.imageSmoothingEnabled = false
    ctx.font = `${CHAR_HEIGHT}px 'Courier New', monospace`

    const isMobile = window.innerWidth < 768
    const maxStreams = isMobile ? 8 : 12

    const initializeStreams = () => {
      streams.length = 0
      const screenWidth = canvas.width
      const screenHeight = canvas.height
      const streamSpacing = Math.floor(screenWidth / maxStreams)

      for (let i = 0; i < maxStreams; i++) {
        const stream = {
          x: i * streamSpacing + Math.random() * 20,
          characters: [] as {
            char: string
            y: number
            opacity: number
            speed: number
          }[],
        }

        for (let j = 0; j < CHARS_PER_STREAM; j++) {
          const term = techTerms[Math.floor(Math.random() * techTerms.length)]
          stream.characters.push({
            char: term.charAt(Math.floor(Math.random() * term.length)),
            y: -j * CHAR_HEIGHT + Math.random() * screenHeight,
            opacity: Math.random() * 0.6 + 0.2,
            speed: isMobile ? 1 + Math.random() : 2 + Math.random() * 2,
          })
        }

        streams.push(stream)
      }
    }

    const draw = (timestamp: number) => {
      if (timestamp - lastFrameTime < FRAME_INTERVAL) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }
      lastFrameTime = timestamp

      const screenHeight = canvas.height
      const isDark = theme === "dark"

      ctx.fillStyle = isDark ? "#000000" : "#ffffff"
      ctx.fillRect(0, 0, canvas.width, screenHeight)

      streams.forEach((stream) => {
        stream.characters.forEach((char) => {
          ctx.fillStyle = isDark
            ? "rgba(255, 255, 255, 1)"
            : "rgba(0, 0, 0, 1)"
          ctx.globalAlpha = char.opacity * 0.3
          ctx.fillText(char.char, stream.x, char.y)

          char.y += char.speed
          char.opacity *= 0.998

          if (char.y > screenHeight + CHAR_HEIGHT || char.opacity < 0.1) {
            const term = techTerms[Math.floor(Math.random() * techTerms.length)]
            char.char = term.charAt(Math.floor(Math.random() * term.length))
            char.y = -CHAR_HEIGHT
            char.opacity = Math.random() * 0.6 + 0.2
          }
        })
      })

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(draw)
    }

    const resizeCanvas = () => {
      const section = sectionRef.current
      if (section) {
        canvas.width = section.clientWidth
        canvas.height = section.clientHeight
        initializeStreams()
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animationRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme, mounted])

  // GSAP Animations
  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set("[data-skill-item]", { opacity: 1, y: 0 })
        return
      }

      gsap.from("[data-skill-item]", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: content,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      })
    }, content)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full bg-background text-foreground overflow-hidden"
      data-theme="light"
    >
      {/* Matrix Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 py-24 md:py-32 px-6 md:px-12"
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
              {coreStack.map((skill, index) => {
                const Icon = skill.icon
                return (
                  <div
                    key={skill.name}
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
              className="border-4 border-foreground p-6 md:p-8 shadow-brutalist"
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
              className="border-4 border-foreground p-6 md:p-8 shadow-brutalist"
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
