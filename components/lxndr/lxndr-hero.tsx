"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { lxndrLinks } from "@/components/lxndr/lxndr-links"
import { useLxndrScrollMotion } from "@/components/lxndr/use-lxndr-scroll-motion"

gsap.registerPlugin(ScrollTrigger)

export function LxndrHero() {
  const t = useTranslations("lxndr.hero")
  const sectionRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useLxndrScrollMotion(sectionRef)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(heroRef)

      if (prefersReducedMotion()) {
        gsap.set(sel("[data-lxndr-anim]"), { opacity: 1 })
        gsap.set(sel("[data-hero-portrait]"), { clipPath: "inset(0% 0% 0% 0%)" })
        return
      }

      gsap.set(sel("[data-hero-name]"), { opacity: 0, y: 80 })
      gsap.set(sel("[data-hero-role]"), { opacity: 0, y: 24 })
      gsap.set(sel("[data-hero-genres]"), { opacity: 0, y: 30 })
      gsap.set(sel("[data-hero-tagline]"), { opacity: 0, y: 20 })
      gsap.set(sel("[data-hero-ctas]"), { opacity: 0, y: 20 })
      gsap.set(sel("[data-hero-line]"), { scaleX: 0, transformOrigin: "left" })
      gsap.set(sel("[data-hero-portrait]"), { clipPath: "inset(100% 0% 0% 0%)" })

      const tl = gsap.timeline({ delay: 0.4 })

      tl.to(sel("[data-hero-name]"), { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" })
        .to(sel("[data-hero-role]"), { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.7")
        .to(sel("[data-hero-genres]"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.45")
        .to(sel("[data-hero-line]"), { scaleX: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .to(sel("[data-hero-portrait]"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" }, "-=0.5")
        .to(sel("[data-hero-tagline]"), { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.7")
        .to(sel("[data-hero-ctas]"), { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")

      gsap.to(sel("[data-hero-name]"), {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      })

      gsap.to(sel("[data-hero-portrait]"), {
        y: -28,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[var(--lxndr-black)] lxndr-noise lxndr-grid-bg"
    >
      <div
        data-lxndr-parallax
        data-lxndr-parallax-x="18"
        data-lxndr-parallax-y="34"
        className="grain-overlay absolute inset-0 z-0"
      />

      <div
        data-lxndr-parallax
        data-lxndr-parallax-x="-10"
        data-lxndr-parallax-y="22"
        className="absolute left-4 top-7 z-10 flex items-center gap-2 font-bebas text-2xl tracking-wider text-white/82 md:left-8"
      >
        <span className="h-px w-5 bg-[var(--lxndr-pink)]" />
        LXNDR
      </div>

      <div
        data-hero-label
        data-lxndr-parallax
        data-lxndr-parallax-x="0"
        data-lxndr-parallax-y="72"
        className="absolute right-6 top-20 hidden font-mono text-[10px] uppercase tracking-[0.5em] text-white/42 md:right-9 md:block"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        {t("signal")}
      </div>

      <div
        data-lxndr-parallax
        data-lxndr-parallax-x="-18"
        data-lxndr-parallax-y="48"
        className="absolute left-8 top-[42%] z-10 hidden -translate-y-1/2 md:block"
        aria-hidden="true"
      >
        <div className="relative h-20 w-20 border border-white/30">
          <div className="absolute inset-3 rotate-45 border border-white/35" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/18" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/18" />
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-white" />
        </div>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.26em] text-white/34">freq. 174hz</p>
        <div className="mt-3 h-px w-5 bg-[var(--lxndr-pink)]" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/8" />

      <div
        ref={heroRef}
        className="relative z-10 flex min-h-screen flex-col px-6 pb-20 pt-28 md:px-12 md:pt-32"
      >
        <div className="mx-auto grid w-full max-w-[1080px] flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_380px] xl:max-w-[1160px] xl:grid-cols-[minmax(0,1fr)_420px]">

          <div className="flex flex-col justify-center">
            <div className="mb-12 hidden items-center gap-3 md:flex">
              <p className="font-mono text-xs uppercase tracking-[0.38em] text-white/55">
                raw signal / paraná br
              </p>
              <div className="h-px flex-1 bg-white/32" />
              <span className="h-1.5 w-1.5 bg-[var(--lxndr-pink)]" />
            </div>

            <h1
              data-hero-name
              className="font-bebas text-[clamp(7.8rem,23vw,18.5rem)] leading-[0.78] tracking-tight text-[var(--lxndr-offwhite,#f2f2ea)] text-brutalist"
            >
              {t("name")}
            </h1>

            <div
              data-hero-line
              className="mb-5 mt-7 h-[2px] w-full max-w-[4rem] bg-[var(--lxndr-pink)]"
            />

            <p
              data-hero-role
              className="font-mono text-sm font-bold uppercase tracking-[0.38em] text-white md:text-xl"
            >
              {t("role")}
            </p>

            <p
              data-hero-genres
              className="mt-6 max-w-3xl font-mono text-sm uppercase tracking-[0.32em] text-[var(--lxndr-steel)] md:text-lg"
            >
              {t("genres")}
            </p>

            <p
              data-hero-tagline
              className="mt-7 max-w-xl font-space text-base leading-relaxed text-white/78 md:text-lg"
            >
              {t("tagline")}
            </p>

            <div
              data-hero-ctas
              className="mt-9 flex flex-col flex-wrap gap-3 sm:flex-row md:mt-10 md:gap-4"
            >
              <a
                href={lxndrLinks.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 border-2 border-[var(--lxndr-pink)] bg-[var(--lxndr-pink)] px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-black transition-all duration-200 hover:bg-transparent hover:text-[var(--lxndr-pink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--lxndr-pink)] focus-visible:outline-offset-2"
              >
                <SoundcloudIcon />
                {t("listenCta")}
              </a>

              <a
                href={lxndrLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border-2 border-white/22 bg-transparent px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all duration-200 hover:border-[var(--lxndr-cyan)] hover:text-[var(--lxndr-cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--lxndr-cyan)] focus-visible:outline-offset-2"
              >
                <InstagramIcon />
                {t("followCta")}
              </a>

              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-3 border-2 border-white/14 bg-transparent px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-[var(--lxndr-steel)] transition-all duration-200 hover:border-[var(--lxndr-green)] hover:text-[var(--lxndr-green)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--lxndr-green)] focus-visible:outline-offset-2"
              >
                {t("bookingCta")}
              </a>
            </div>
          </div>

          <div
            data-hero-portrait
            className="relative hidden aspect-[4/5] max-h-[560px] overflow-hidden border border-white/38 bg-black p-2 lg:block"
            style={{ boxShadow: "0 0 54px rgba(255, 10, 168, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)" }}
          >
            <img
              src="/assets/lxndr/lxndr-hero.jpg"
              alt="LXNDR — Feel Every Frequency"
              className="h-full w-full object-cover opacity-82 grayscale-[0.15]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
            <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">
              LXNDR // raw signal
            </div>
            <div
              data-lxndr-parallax
              data-lxndr-parallax-x="22"
              data-lxndr-parallax-y="-28"
              className="absolute right-5 top-5 h-2 w-14 bg-[var(--lxndr-pink)] opacity-80"
            />
            <div className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/45">
              filter out<br />the noise
            </div>
            <div className="absolute bottom-5 right-5 h-14 w-14 border border-[var(--lxndr-green)] opacity-55">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--lxndr-cyan)]/50" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[var(--lxndr-cyan)]/50" />
            </div>
          </div>

        </div>
      </div>

      <button
        type="button"
        onClick={() => document.getElementById("manifesto")?.scrollIntoView({ behavior: "smooth" })}
        className="group absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
        aria-label={t("scrollDown")}
      >
        <span className="font-mono text-[10px] tracking-[0.35em] text-white/30 group-hover:text-white/60 transition-colors">
          {t("scrollDown")}
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </button>

      <WaveformDecor />
      <div
        data-lxndr-parallax
        data-lxndr-parallax-x="28"
        data-lxndr-parallax-y="-18"
        className="pointer-events-none absolute bottom-6 left-8 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/44 md:flex"
        aria-hidden="true"
      >
        <span>////</span>
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--lxndr-pink)]" />
        <span>rec</span>
      </div>
      <div className="pointer-events-none absolute bottom-6 right-8 hidden font-mono text-[10px] tracking-[0.25em] text-white/34 md:block" aria-hidden="true">
        00:00:00
      </div>
    </section>
  )
}

function SoundcloudIcon() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor" aria-hidden="true">
      <path d="M0 7.5C0 8.88 1.12 10 2.5 10S5 8.88 5 7.5V5.5C4.4 5.18 3.7 5 3 5 1.34 5 0 6.34 0 7.5zM14 3c-.26 0-.5.04-.74.1C12.85 1.3 11.07 0 9 0c-2.21 0-4 1.79-4 4v6h9c1.1 0 2-.9 2-2s-.9-2-2-2z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const WAVEFORM_BARS = [
  { id: "w00", h: 4 }, { id: "w01", h: 8 }, { id: "w02", h: 14 }, { id: "w03", h: 20 },
  { id: "w04", h: 28 }, { id: "w05", h: 22 }, { id: "w06", h: 16 }, { id: "w07", h: 10 },
  { id: "w08", h: 6 }, { id: "w09", h: 12 }, { id: "w10", h: 20 }, { id: "w11", h: 26 },
  { id: "w12", h: 18 }, { id: "w13", h: 8 }, { id: "w14", h: 4 }, { id: "w15", h: 10 },
  { id: "w16", h: 22 }, { id: "w17", h: 28 }, { id: "w18", h: 16 }, { id: "w19", h: 8 },
]

function WaveformDecor() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-[3px] px-12 opacity-[0.07] pointer-events-none h-16"
      aria-hidden="true"
    >
      {WAVEFORM_BARS.map(({ id, h }) => (
        <div
          key={id}
          className="flex-1 max-w-[4px] bg-[var(--lxndr-pink)]"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  )
}
