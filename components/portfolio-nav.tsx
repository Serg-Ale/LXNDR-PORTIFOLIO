"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { LanguageSwitcher } from "./language-switcher"

export function PortfolioNav() {
  const t = useTranslations("nav")
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power4.out",
    })
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background border-b-4 border-foreground" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl md:text-4xl font-black hover:opacity-70 transition-opacity"
        >
          {t("logo")}
        </button>

        <div className="flex gap-4 md:gap-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-lg md:text-xl font-bold hover:bg-foreground hover:text-background px-3 md:px-4 py-2 border-2 border-foreground transition-colors"
          >
            {t("about")}
          </button>
          <button
            onClick={() => scrollToSection("experience")}
            className="text-lg md:text-xl font-bold hover:bg-foreground hover:text-background px-3 md:px-4 py-2 border-2 border-foreground transition-colors"
          >
            {t("experience")}
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-lg md:text-xl font-bold hover:bg-foreground hover:text-background px-3 md:px-4 py-2 border-2 border-foreground transition-colors"
          >
            {t("contact")}
          </button>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  )
}
