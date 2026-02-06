"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useTranslations, useLocale } from "next-intl"
import { usePathname } from "@/i18n/routing"
import { useTheme } from "next-themes"
import gsap from "gsap"
import { Link } from "@/i18n/routing"
import { LanguageSwitcher } from "@/components/shared/language-switcher"
import { ThemeToggle } from "@/components/shared/theme-toggle"

export function PortfolioNav() {
  const t = useTranslations("nav")
  const locale = useLocale()
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [navHeight, setNavHeight] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [currentSectionTheme, setCurrentSectionTheme] = useState<'light' | 'dark'>('light')
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  
  const isDark = resolvedTheme === "dark"
  const isHomePage = pathname === "/" || pathname === ""

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
      
      // Detect current section theme
      const sections = document.querySelectorAll('[data-theme]')
      const scrollY = window.scrollY + navHeight + 50 // Account for nav height
      
      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionBottom = sectionTop + rect.height
        
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          const theme = section.getAttribute('data-theme') as 'light' | 'dark'
          setCurrentSectionTheme(theme || 'light')
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navHeight])

  useEffect(() => {
    if (!navRef.current) return

    const updateNavHeight = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect()
        setNavHeight(rect.height)
      }
    }

    const timer = setTimeout(updateNavHeight, 100)

    const resizeObserver = new ResizeObserver(() => {
      updateNavHeight()
    })

    resizeObserver.observe(navRef.current)

    window.addEventListener("resize", updateNavHeight)

    return () => {
      clearTimeout(timer)
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateNavHeight)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen && 
        navRef.current && 
        mobileMenuRef.current &&
        !navRef.current.contains(event.target as Node) &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("touchstart", handleClickOutside as any)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside as any)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const hasAnimated = sessionStorage.getItem("nav-animated")
    
    if (!hasAnimated && navRef.current) {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power4.out",
      })
      sessionStorage.setItem("nav-animated", "true")
    } else if (navRef.current) {
      gsap.set(navRef.current, { y: 0, opacity: 1 })
    }
  }, [])

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setIsMobileMenuOpen(false)
      }
    } else {
      window.location.href = `/${locale}#${id}`
    }
  }

  const mobileMenu = mounted && isMobileMenuOpen && (
    <div 
      ref={mobileMenuRef}
      style={{ 
        top: `${navHeight}px`,
        transform: 'translateZ(0)',
        willChange: 'auto'
      }}
      className={`fixed left-0 right-0 md:hidden border-t ${
        currentSectionTheme === 'dark' 
          ? 'border-white/20 bg-black/90 text-white' 
          : 'border-black/20 bg-white/90 text-black'
      } backdrop-blur-sm shadow-modern-lg z-40`}
    >
      <div className="max-w-7xl mx-auto w-full px-6 py-4 flex flex-col gap-3">
            <button
              onClick={() => scrollToSection("journey")}
              className="text-lg font-semibold px-4 py-3 rounded-md transition-all text-left hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none touch-action-manipulation"
            >
              {t("about")}
            </button>
            <button
              onClick={() => scrollToSection("impact")}
              className="text-lg font-semibold px-4 py-3 rounded-md transition-all text-left hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none touch-action-manipulation"
            >
              {t("experience")}
            </button>
            <Link
              href="/blog"
              className="text-lg font-semibold px-4 py-3 rounded-md transition-all text-left block hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none touch-action-manipulation"
            >
              {t("blog")}
            </Link>
            <button
              onClick={() => scrollToSection("connect")}
              className="text-lg font-semibold px-4 py-3 rounded-md transition-all text-left hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none touch-action-manipulation"
            >
              {t("contact")}
            </button>
        <div className="px-4 py-2 flex items-center gap-4">
          <LanguageSwitcher />
          <ThemeToggle className="w-10 h-10 md:w-12 md:h-12" />
        </div>
      </div>
    </div>
  )

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b ${
          currentSectionTheme === 'dark' 
            ? 'bg-black/80 text-white border-white/20' 
            : 'bg-white/80 text-black border-black/20'
        } ${isScrolled ? "shadow-modern-md" : ""}`}
      >
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-4 md:py-6 flex justify-between items-center gap-4">
          <Link
            href="/"
            className="text-xl md:text-4xl font-bold hover:opacity-70 transition-opacity flex-shrink-0"
          >
            {t("logo")}
          </Link>

          <div className="hidden md:flex gap-4 md:gap-8 flex-shrink-0 items-center">
            <button
              onClick={() => scrollToSection("journey")}
              className="text-lg md:text-xl font-semibold px-4 py-2 rounded-md transition-all hover:bg-accent/10 hover:scale-105 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none touch-action-manipulation"
            >
              {t("about")}
            </button>
            <button
              onClick={() => scrollToSection("impact")}
              className="text-lg md:text-xl font-semibold px-4 py-2 rounded-md transition-all hover:bg-accent/10 hover:scale-105 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none touch-action-manipulation"
            >
              {t("experience")}
            </button>
            <Link
              href="/blog"
              className="text-lg md:text-xl font-semibold px-4 py-2 rounded-md transition-all hover:bg-accent/10 hover:scale-105 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none touch-action-manipulation"
            >
              {t("blog")}
            </Link>
            <button
              onClick={() => scrollToSection("connect")}
              className="text-lg md:text-xl font-semibold px-4 py-2 rounded-md transition-all hover:bg-accent/10 hover:scale-105 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none touch-action-manipulation"
            >
              {t("contact")}
            </button>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 flex-shrink-0 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:outline-none touch-action-manipulation"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`block w-6 h-0.5 bg-foreground transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-foreground transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-foreground transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
      </nav>
      
      {mounted && mobileMenu && createPortal(mobileMenu, document.body)}
    </>
  )
}
