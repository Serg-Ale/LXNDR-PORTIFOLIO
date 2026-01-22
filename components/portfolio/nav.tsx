"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useTranslations, useLocale } from "next-intl"
import { usePathname } from "@/i18n/routing"
import gsap from "gsap"
import { Link } from "@/i18n/routing"
import { LanguageSwitcher } from "@/components/shared/language-switcher"

export function PortfolioNav() {
  const t = useTranslations("nav")
  const locale = useLocale()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [navHeight, setNavHeight] = useState(0)
  const [mounted, setMounted] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  
  // Check if we're on the homepage
  const isHomePage = pathname === "/" || pathname === ""

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate navbar height dynamically with ResizeObserver
  useEffect(() => {
    if (!navRef.current) return

    const updateNavHeight = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect()
        setNavHeight(rect.height)
      }
    }

    // Initial calculation with a delay to account for GSAP animations
    const timer = setTimeout(updateNavHeight, 100)

    // Use ResizeObserver to track size changes
    const resizeObserver = new ResizeObserver(() => {
      updateNavHeight()
    })

    resizeObserver.observe(navRef.current)

    // Also listen to window resize
    window.addEventListener("resize", updateNavHeight)

    return () => {
      clearTimeout(timer)
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateNavHeight)
    }
  }, [])

  // Close mobile menu when clicking outside
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
    const sections = document.querySelectorAll("[data-theme]")
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const theme = entry.target.getAttribute("data-theme") as "light" | "dark"
            setCurrentTheme(theme || "light")
          }
        })
      },
      {
        threshold: [0.5],
        rootMargin: "-100px 0px -100px 0px",
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Only animate on initial mount, check if this is the first render
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
      // Ensure nav is visible if already animated
      gsap.set(navRef.current, { y: 0, opacity: 1 })
    }
  }, [])

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      // If on homepage, scroll to section
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setIsMobileMenuOpen(false)
      }
    } else {
      // If on another page, navigate to homepage with hash
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
        currentTheme === "dark"
          ? "bg-foreground/95 border-background/20 text-background"
          : "bg-background/95 border-foreground/20 text-foreground"
      } backdrop-blur-sm shadow-modern-lg z-40`}
    >
      <div className="max-w-7xl mx-auto w-full px-6 py-4 flex flex-col gap-3">
            <button
              onClick={() => scrollToSection("journey")}
              className={`text-lg font-semibold px-4 py-3 rounded-md transition-all text-left ${
                currentTheme === "dark"
                  ? "hover:bg-background/10"
                  : "hover:bg-foreground/5"
              }`}
            >
              {t("about")}
            </button>
            <button
              onClick={() => scrollToSection("impact")}
              className={`text-lg font-semibold px-4 py-3 rounded-md transition-all text-left ${
                currentTheme === "dark"
                  ? "hover:bg-background/10"
                  : "hover:bg-foreground/5"
              }`}
            >
              {t("experience")}
            </button>
            <Link
              href="/blog"
              className={`text-lg font-semibold px-4 py-3 rounded-md transition-all text-left block ${
                currentTheme === "dark"
                  ? "hover:bg-background/10"
                  : "hover:bg-foreground/5"
              }`}
            >
              {t("blog")}
            </Link>
            <button
              onClick={() => scrollToSection("connect")}
              className={`text-lg font-semibold px-4 py-3 rounded-md transition-all text-left ${
                currentTheme === "dark"
                  ? "hover:bg-background/10"
                  : "hover:bg-foreground/5"
              }`}
            >
              {t("contact")}
            </button>
        <div className="px-4 py-2">
          <LanguageSwitcher theme={currentTheme} />
        </div>
      </div>
    </div>
  )

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 ${
          currentTheme === "dark"
            ? "bg-foreground/95 text-background backdrop-blur-sm"
            : "bg-background/95 text-foreground backdrop-blur-sm"
        } ${
          isScrolled ? "shadow-modern-md border-b" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-4 md:py-6 flex justify-between items-center gap-4">
          <Link
            href="/"
            className="text-xl md:text-4xl font-bold hover:opacity-70 transition-opacity flex-shrink-0"
          >
            {t("logo")}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4 md:gap-8 flex-shrink-0">
            <button
              onClick={() => scrollToSection("journey")}
              className={`text-lg md:text-xl font-semibold px-4 py-2 rounded-md transition-all ${
                currentTheme === "dark"
                  ? "hover:bg-background/10 hover:scale-105"
                  : "hover:bg-foreground/5 hover:scale-105"
              }`}
            >
              {t("about")}
            </button>
            <button
              onClick={() => scrollToSection("impact")}
              className={`text-lg md:text-xl font-semibold px-4 py-2 rounded-md transition-all ${
                currentTheme === "dark"
                  ? "hover:bg-background/10 hover:scale-105"
                  : "hover:bg-foreground/5 hover:scale-105"
              }`}
            >
              {t("experience")}
            </button>
            <Link
              href="/blog"
              className={`text-lg md:text-xl font-semibold px-4 py-2 rounded-md transition-all ${
                currentTheme === "dark"
                  ? "hover:bg-background/10 hover:scale-105"
                  : "hover:bg-foreground/5 hover:scale-105"
              }`}
            >
              {t("blog")}
            </Link>
            <button
              onClick={() => scrollToSection("connect")}
              className={`text-lg md:text-xl font-semibold px-4 py-2 rounded-md transition-all ${
                currentTheme === "dark"
                  ? "hover:bg-background/10 hover:scale-105"
                  : "hover:bg-foreground/5 hover:scale-105"
              }`}
            >
              {t("contact")}
            </button>
            <LanguageSwitcher theme={currentTheme} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 flex-shrink-0"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 transition-all ${currentTheme === "dark" ? "bg-background" : "bg-foreground"} ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-0.5 transition-all ${currentTheme === "dark" ? "bg-background" : "bg-foreground"} ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 transition-all ${currentTheme === "dark" ? "bg-background" : "bg-foreground"} ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Portal */}
      {mounted && mobileMenu && createPortal(mobileMenu, document.body)}
    </>
  )
}
