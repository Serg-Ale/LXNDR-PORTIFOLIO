"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"

gsap.registerPlugin(ScrollTrigger)

export function Manifesto() {
  const t = useTranslations("manifesto")
  const sectionRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([])
  const closingRef = useRef<HTMLParagraphElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRefs = useRef<(SVGPathElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = prefersReducedMotion()

      if (!reducedMotion) {
        pathRefs.current.forEach((path) => {
          if (!path) return
          const length = path.getTotalLength()
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0.2
          })
          gsap.to(path, {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 2.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "center center",
              scrub: 1,
            }
          })
        })

        const lines = linesRef.current.filter(Boolean)
        if (lines.length) {
          gsap.from(lines, {
            opacity: 0,
            y: 30,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            }
          })
        }
        
        if (closingRef.current) {
          gsap.from(closingRef.current, {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: closingRef.current,
              start: "top 80%",
            }
          })
        }
      } else {
        gsap.set(linesRef.current, { opacity: 1, y: 0 })
        if (closingRef.current) gsap.set(closingRef.current, { opacity: 1, y: 0 })
        gsap.set(pathRefs.current, { strokeDashoffset: 0, opacity: 1 })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const lines = t.raw("lines") as string[]

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-24 md:py-40 bg-foreground text-background overflow-hidden"
    >
      <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 flex flex-col gap-8 md:gap-12">
            <SplitTextReveal 
              as="h2" 
              className="text-lg md:text-xl tracking-widest font-mono text-muted/80 uppercase" 
            >
              {t("title")}
            </SplitTextReveal>
            
            <div className="flex flex-col gap-6 md:gap-8">
              {lines.map((line, i) => (
                <p 
                  key={line} 
                  ref={el => { linesRef.current[i] = el }}
                  className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight"
                >
                  {line}
                </p>
              ))}
            </div>

            <p 
              ref={closingRef}
              className="text-xl md:text-3xl lg:text-4xl font-bold mt-8 md:mt-12 text-accent"
            >
              {t("closing")}
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end opacity-20 lg:opacity-100 absolute lg:relative inset-0 z-[-1] lg:z-auto pointer-events-none">
            <svg 
              ref={svgRef}
              viewBox="0 0 400 400" 
              className="w-64 h-64 md:w-96 md:h-96"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Abstract geometric generative art</title>
              <circle cx="200" cy="200" r="4" fill="var(--color-accent, #FF6600)" />
              
              <path 
                ref={el => { pathRefs.current[0] = el }}
                d="M 50 50 L 150 150 L 200 200" 
                stroke="var(--color-accent, #FF6600)" 
                strokeWidth="1.5" 
              />
              <path 
                ref={el => { pathRefs.current[1] = el }}
                d="M 350 50 L 250 150 L 200 200" 
                stroke="var(--color-accent, #FF6600)" 
                strokeWidth="1.5" 
              />
              <path 
                ref={el => { pathRefs.current[2] = el }}
                d="M 50 350 L 150 250 L 200 200" 
                stroke="var(--color-accent, #FF6600)" 
                strokeWidth="1.5" 
              />
              <path 
                ref={el => { pathRefs.current[3] = el }}
                d="M 350 350 L 250 250 L 200 200" 
                stroke="var(--color-accent, #FF6600)" 
                strokeWidth="1.5" 
              />
              <path 
                ref={el => { pathRefs.current[4] = el }}
                d="M 200 50 L 200 150 L 200 200" 
                stroke="var(--color-accent, #FF6600)" 
                strokeWidth="1.5" 
              />
              <path 
                ref={el => { pathRefs.current[5] = el }}
                d="M 50 200 L 150 200 L 200 200" 
                stroke="var(--color-accent, #FF6600)" 
                strokeWidth="1.5" 
              />
              <path 
                ref={el => { pathRefs.current[6] = el }}
                d="M 350 200 L 250 200 L 200 200" 
                stroke="var(--color-accent, #FF6600)" 
                strokeWidth="1.5" 
              />
              <path 
                ref={el => { pathRefs.current[7] = el }}
                d="M 100 100 L 300 100 L 300 300 L 100 300 Z" 
                stroke="var(--color-accent, #FF6600)" 
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
              <path 
                ref={el => { pathRefs.current[8] = el }}
                d="M 150 150 L 250 150 L 250 250 L 150 250 Z" 
                stroke="var(--color-accent, #FF6600)" 
                strokeWidth="0.5"
              />
              <path 
                ref={el => { pathRefs.current[9] = el }}
                d="M 200 100 L 300 200 L 200 300 L 100 200 Z" 
                stroke="var(--color-accent, #FF6600)" 
                strokeWidth="0.5"
              />
            </svg>
          </div>
          
        </div>
      </div>
    </section>
  )
}
