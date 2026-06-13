"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { Link } from "@/i18n/routing"
import { LanguageSwitcher } from "@/components/shared/language-switcher"
import { prefersReducedMotion } from "@/lib/gsap-config"

export function PortalPage() {
  const t = useTranslations("portal")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      const sel = gsap.utils.selector(containerRef)

      gsap.set(sel("[data-portal-title]"), { opacity: 0, y: 30 })
      gsap.set(sel("[data-portal-choose]"), { opacity: 0, y: 30 })
      gsap.set(sel("[data-portal-noise]"), { opacity: 0, y: 30 })
      gsap.set(sel("[data-portal-card='dev']"), { opacity: 0, x: -60 })
      gsap.set(sel("[data-portal-card='lxndr']"), { opacity: 0, x: 60 })

      const tl = gsap.timeline({ delay: 0.15 })

      tl.to(sel("[data-portal-title]"), { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" })
        .to(sel("[data-portal-choose]"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .to(sel("[data-portal-noise]"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .to(sel("[data-portal-card='dev']"), { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .to(sel("[data-portal-card='lxndr']"), { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[var(--lxndr-black)] text-white overflow-hidden lxndr-noise lxndr-grid-bg flex flex-col"
    >
      <div className="grain-overlay absolute inset-0 z-0 opacity-60" />

      <header className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/10">
        <span className="font-bebas text-2xl md:text-3xl tracking-widest text-white/80">SA.</span>
        <LanguageSwitcher />
      </header>

      <main
        id="main-content"
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-16 md:py-24"
      >
        <div className="w-full max-w-6xl flex flex-col items-center gap-10 md:gap-16">

          <div className="text-center">
            <h1
              data-portal-title
              className="font-bebas text-[clamp(4rem,14vw,11rem)] leading-none tracking-tight text-white text-brutalist"
            >
              {t("title")}
            </h1>
            <p
              data-portal-choose
              className="mt-4 font-mono text-xs md:text-sm tracking-[0.35em] text-[var(--lxndr-steel)] uppercase"
            >
              {t("choose")}
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div data-portal-card="dev">
              <Link
                href="/dev"
                className="portal-card-dev group relative flex flex-col justify-between p-8 md:p-10 border-t-4 border-t-[var(--color-accent-purple)] border border-white/10 bg-black/40 hover:bg-[#0a0a0a] transition-all duration-300 hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-accent-purple)] focus-visible:outline-offset-4 min-h-[260px] md:min-h-[320px] block"
              >
                <div>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--lxndr-steel)] uppercase">
                    01
                  </span>
                  <h2 className="mt-3 font-bebas text-[clamp(2.2rem,5vw,4rem)] leading-none tracking-tight text-white group-hover:text-[var(--color-accent-purple-light)] transition-colors duration-300">
                    {t("dev.label")}
                  </h2>
                  <p className="mt-2 font-mono text-sm text-[var(--lxndr-steel)] tracking-wide">
                    {t("dev.sub")}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <span className="font-bebas text-xl tracking-widest text-[var(--color-accent-purple)] group-hover:text-white transition-colors duration-300">
                    {t("dev.cta")}
                  </span>
                  <div className="h-[2px] w-0 bg-[var(--color-accent-purple)] group-hover:w-8 transition-all duration-300" />
                </div>
                <div className="absolute bottom-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="1" y="1" width="14" height="14" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="17" y="1" width="14" height="14" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="1" y="17" width="14" height="14" stroke="currentColor" strokeWidth="1.5" />
                    <rect x="17" y="17" width="14" height="14" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              </Link>
            </div>

            <div data-portal-card="lxndr">
              <Link
                href="/lxndr"
                className="portal-card-lxndr group relative flex flex-col justify-between p-8 md:p-10 border-t-4 border-t-[var(--lxndr-pink)] border border-white/10 bg-black/40 hover:bg-[#050303] transition-all duration-300 hover:border-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--lxndr-pink)] focus-visible:outline-offset-4 min-h-[260px] md:min-h-[320px] block"
              >
                <div>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--lxndr-steel)] uppercase">
                    02
                  </span>
                  <h2 className="mt-3 font-bebas text-[clamp(2.2rem,5vw,4rem)] leading-none tracking-tight text-white group-hover:text-[var(--lxndr-pink)] transition-colors duration-300">
                    {t("lxndr.label")}
                  </h2>
                  <p className="mt-2 font-mono text-sm text-[var(--lxndr-steel)] tracking-wide">
                    {t("lxndr.sub")}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <span className="font-bebas text-xl tracking-widest text-[var(--lxndr-pink)] group-hover:text-white transition-colors duration-300">
                    {t("lxndr.cta")}
                  </span>
                  <div className="h-[2px] w-0 bg-[var(--lxndr-pink)] group-hover:w-8 transition-all duration-300" />
                </div>
                <div className="absolute bottom-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <polygon points="16,2 30,28 2,28" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          <span
            data-portal-noise
            className="font-mono text-[10px] md:text-xs tracking-[0.5em] text-white/20 uppercase"
          >
            {t("noise")}
          </span>
        </div>
      </main>

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" style={{ left: "20%" }} />
        <div className="absolute top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" style={{ left: "80%" }} />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5" />
      </div>
    </div>
  )
}

