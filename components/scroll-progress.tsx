"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "@/i18n/routing"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ScrollProgressProps {
  sections?: string[]
}

export function ScrollProgress({ sections = [] }: ScrollProgressProps) {
  const progressRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return

    // Animate progress line based on scroll
    gsap.to(line, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    })

    // Track active section
    if (sections.length > 0) {
      sections.forEach((sectionId, index) => {
        ScrollTrigger.create({
          trigger: `#${sectionId}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(index),
          onEnterBack: () => setActiveSection(index),
        })
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [sections])

  return (
    <div
      ref={progressRef}
      className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-40 hidden md:block"
    >
      <div className="relative h-[40vh] w-0.5 bg-foreground/20 rounded-full overflow-hidden">
        <div
          ref={lineRef}
          className="absolute top-0 left-0 w-full h-full bg-foreground origin-top rounded-full"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      {sections.length > 0 && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full flex flex-col justify-between py-2">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => {
                const element = document.getElementById(section)
                element?.scrollIntoView({ behavior: "smooth" })
              }}
              className="group relative"
              aria-label={`Scroll to ${section}`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeSection
                    ? "bg-foreground scale-150"
                    : "bg-foreground/40 scale-100 group-hover:scale-125"
                }`}
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {section.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
