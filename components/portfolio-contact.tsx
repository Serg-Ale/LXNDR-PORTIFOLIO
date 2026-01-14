"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioContact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
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
          CONTACT_
        </h2>

        <div ref={contentRef} className="space-y-8">
          <div className="border-4 border-foreground p-8 md:p-12 shadow-brutalist-lg">
            <p className="text-3xl md:text-6xl font-black leading-tight mb-8">
              LET'S BUILD
              <br />
              SOMETHING
              <br />
              AMAZING
            </p>
            
            <div className="space-y-4 md:space-y-6">
              <a
                href="mailto:your.email@example.com"
                className="block text-xl md:text-3xl font-bold hover:bg-foreground hover:text-background p-4 transition-colors border-2 border-foreground"
              >
                → YOUR.EMAIL@EXAMPLE.COM
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xl md:text-3xl font-bold hover:bg-foreground hover:text-background p-4 transition-colors border-2 border-foreground"
              >
                → GITHUB.COM/YOURUSERNAME
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xl md:text-3xl font-bold hover:bg-foreground hover:text-background p-4 transition-colors border-2 border-foreground"
              >
                → LINKEDIN.COM/IN/YOURUSERNAME
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-foreground text-background p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-black mb-2">LOCATION</h3>
              <p className="text-lg md:text-xl font-bold">YOUR CITY, COUNTRY</p>
            </div>
            <div className="bg-foreground text-background p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-black mb-2">AVAILABILITY</h3>
              <p className="text-lg md:text-xl font-bold">OPEN TO OPPORTUNITIES</p>
            </div>
            <div className="bg-foreground text-background p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-black mb-2">RESPONSE</h3>
              <p className="text-lg md:text-xl font-bold">WITHIN 24 HOURS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
