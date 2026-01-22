"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioProjects() {
  const t = useTranslations("projects")
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  const projects = t.raw("list")

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

      projectRefs.current.forEach((project, index) => {
        if (!project) return

        const direction = index % 2 === 0 ? -100 : 100

        gsap.from(project, {
          scrollTrigger: {
            trigger: project,
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
          {projects.map((project: any, index: number) => (
            <div
              key={index}
              ref={(el) => {
                projectRefs.current[index] = el
              }}
              className="border-4 border-foreground p-6 md:p-8 hover:shadow-brutalist-lg transition-shadow cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="text-6xl md:text-8xl font-black opacity-20">
                  {project.number}
                </div>
                
                <div className="flex-1 space-y-4">
                  <h3 className="text-3xl md:text-5xl font-black leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-lg md:text-xl font-semibold">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.tech.map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="bg-foreground text-background px-3 md:px-4 py-1 md:py-2 text-sm md:text-base font-bold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-4xl font-black self-center md:self-start">
                  →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
