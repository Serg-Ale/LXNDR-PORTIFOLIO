"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import gsap from "gsap"

export function LxndrNav() {
  const t = useTranslations("lxndr.nav")
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
      })
    }, navRef)
    return () => ctx.revert()
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-300 ${
        isScrolled ? "border-b border-white/10 bg-black/80 backdrop-blur-sm" : ""
      }`}
    >
      <Link
        href="/saerix"
        className="font-bebas text-xl md:text-2xl tracking-widest text-white hover:text-[var(--lxndr-pink)] transition-colors duration-200"
        aria-label="SAERIX"
      >
        SAERIX
      </Link>

      <div className="flex items-center gap-6 md:gap-8">
        <a
          href="#sound"
          className="font-mono text-xs tracking-[0.25em] text-[var(--lxndr-steel)] hover:text-white transition-colors uppercase hidden md:block"
        >
          {t("listen")}
        </a>
        <a
          href="#releases"
          className="font-mono text-xs tracking-[0.25em] text-[var(--lxndr-steel)] hover:text-[var(--lxndr-cyan)] transition-colors uppercase hidden md:block"
        >
          {t("releases")}
        </a>
        <a
          href="#booking"
          className="font-mono text-xs tracking-[0.25em] text-[var(--lxndr-steel)] hover:text-[var(--lxndr-pink)] transition-colors uppercase"
        >
          {t("booking")}
        </a>
        <Link
          href="/"
          className="font-mono text-[10px] tracking-[0.2em] text-white/30 hover:text-white/70 transition-colors uppercase"
        >
          {t("backToPortal")}
        </Link>
      </div>
    </nav>
  )
}
