"use client"

import { useEffect, useState } from "react"
import { usePathname } from "@/i18n/routing"

type ScrollProgressProps = {
  sections: string[]
}

export function ScrollProgress({ sections }: ScrollProgressProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      let newActiveSection: string | null = null

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (!section) continue

        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          newActiveSection = sectionId
          break
        }
      }

      setActiveSection(newActiveSection)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initialize on mount

    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const pathname = usePathname()

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-100 z-50">
      <div
        className="h-full bg-blue-500 transition-transform"
        style={{
          width: `${
            activeSection ? (sections.indexOf(activeSection) + 1) / sections.length * 100 : 0
          }%`,
        }}
      />
    </div>
  )
}