"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioAbout() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation from bottom
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

      // Text animation from top
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        },
        y: -100,
        opacity: 0,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-24"
    >
      <div className="max-w-7xl w-full">
        <h2
          ref={titleRef}
          className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tighter text-brutalist mb-16"
        >
          ABOUT_
        </h2>
        
        <div ref={textRef} className="grid md:grid-cols-2 gap-8 md:gap-16">
          <div className="space-y-6">
            <p className="text-2xl md:text-4xl font-bold leading-tight">
              PASSIONATE ABOUT CREATING CLEAN, EFFICIENT CODE
            </p>
            <div className="border-4 border-foreground p-6 shadow-brutalist">
              <p className="text-lg md:text-xl font-semibold">
                I specialize in full-stack development, turning complex problems into elegant solutions.
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-foreground text-background p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-black mb-4">SKILLS</h3>
              <ul className="space-y-3 text-lg md:text-xl font-bold">
                <li>→ REACT / NEXT.JS</li>
                <li>→ TYPESCRIPT / JAVASCRIPT</li>
                <li>→ NODE.JS / EXPRESS</li>
                <li>→ PYTHON / DJANGO</li>
                <li>→ POSTGRESQL / MONGODB</li>
                <li>→ AWS / DOCKER / K8S</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
