"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { useLxndrScrollMotion } from "@/components/lxndr/use-lxndr-scroll-motion"
import { LxndrMatrixRain } from "@/components/lxndr/lxndr-matrix-rain"

gsap.registerPlugin(ScrollTrigger)

const DIRECTIVES = [
  {
    id: "directive-absorb",
    key: "directive1",
    module: "input read",
    value: "sync",
    textColor: "text-[var(--lxndr-pink)]",
    borderColor: "border-[var(--lxndr-pink)]",
    meterBg: "bg-[var(--lxndr-pink)]",
  },
  {
    id: "directive-distort",
    key: "directive2",
    module: "groove shape",
    value: "drive",
    textColor: "text-[var(--lxndr-cyan)]",
    borderColor: "border-[var(--lxndr-cyan)]",
    meterBg: "bg-[var(--lxndr-cyan)]",
  },
  {
    id: "directive-organize",
    key: "directive3",
    module: "energy route",
    value: "send",
    textColor: "text-[var(--lxndr-green)]",
    borderColor: "border-[var(--lxndr-green)]",
    meterBg: "bg-[var(--lxndr-green)]",
  },
  {
    id: "directive-transmit",
    key: "directive4",
    module: "main out",
    value: "out",
    textColor: "text-[var(--lxndr-blue)]",
    borderColor: "border-[var(--lxndr-blue)]",
    meterBg: "bg-[var(--lxndr-blue)]",
  },
] as const


const FX_MATRIX_BARS = [
  { id: "fx-bar-01", active: true },
  { id: "fx-bar-02", active: false },
  { id: "fx-bar-03", active: false },
  { id: "fx-bar-04", active: false },
  { id: "fx-bar-05", active: false },
  { id: "fx-bar-06", active: true },
  { id: "fx-bar-07", active: false },
  { id: "fx-bar-08", active: false },
  { id: "fx-bar-09", active: false },
  { id: "fx-bar-10", active: true },
  { id: "fx-bar-11", active: false },
  { id: "fx-bar-12", active: false },
  { id: "fx-bar-13", active: false },
  { id: "fx-bar-14", active: false },
  { id: "fx-bar-15", active: true },
  { id: "fx-bar-16", active: false },
] as const

const VU_BAR_IDS = Array.from({ length: 28 }, (_, i) => `vu-bar-${String(i).padStart(2, "0")}`)

export function LxndrManifesto() {
  const t = useTranslations("lxndr.manifesto")
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const vuBarsRef = useRef<HTMLSpanElement[]>([])
  const vuLabelRef = useRef<HTMLParagraphElement>(null)
  const rainWrapperRef = useRef<HTMLDivElement>(null)

  useLxndrScrollMotion(sectionRef)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(contentRef)

      if (prefersReducedMotion()) {
        gsap.set(sel("[data-beat]"), { opacity: 1, x: 0, y: 0, scale: 1 })
        vuBarsRef.current.forEach((bar, i) => {
          bar.style.backgroundColor = i < 8 ? "var(--lxndr-green)" : "rgba(255,255,255,0.08)"
        })
        if (vuLabelRef.current) vuLabelRef.current.textContent = "-13.1 dB"
        return
      }

      const isMobile = window.innerWidth < 768

      if (!isMobile) {
        gsap.set(sel("[data-beat]"), { opacity: 0 })
        gsap.set(sel('[data-beat="eyebrow"]'), { y: -10 })
        gsap.set(sel('[data-beat="line1"]'), { y: 80 })
        gsap.set(sel('[data-beat="line2"]'), { y: 80 })
        gsap.set(sel('[data-beat="line3"]'), { y: 20 })
        gsap.set(sel('[data-beat="line4"]'), { y: 60, scale: 0.92 })
        gsap.set(sel('[data-beat="sub"]'), { y: 20 })
        gsap.set(sel('[data-beat="waveform"]'), { opacity: 0 })
        gsap.set(sel('[data-beat="fx-matrix"]'), { x: 30 })
        gsap.set(sel('[data-beat^="directive-"]'), { y: 20 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            onLeave: () => {
              gsap.set(sel("[data-beat]"), { opacity: 1, y: 0, x: 0, scale: 1 })
            },
          },
        })

        tl.to(sel('[data-beat="eyebrow"]'), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0)
          .to(sel('[data-beat="line1"]'), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.4)
          .to(sel('[data-beat="line2"]'), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 1.1)
          .to(sel('[data-beat="line3"]'), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 2.0)
          .to(sel('[data-beat="line4"]'), { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power4.out" }, 2.8)
          .to(sel('[data-beat="sub"]'), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 4.0)
          .to(sel('[data-beat="waveform"]'), { opacity: 1, duration: 0.4, ease: "power2.out" }, 4.3)
          .to(sel('[data-beat="fx-matrix"]'), { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, 4.5)
          .to(sel('[data-beat="directive-0"]'), { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 5.5)
          .to(sel('[data-beat="directive-1"]'), { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 6.0)
          .to(sel('[data-beat="directive-2"]'), { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 6.5)
          .to(sel('[data-beat="directive-3"]'), { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 7.0)

        const vuBars = vuBarsRef.current.filter(Boolean) as HTMLSpanElement[]
        vuBars.forEach((bar) => {
          bar.style.backgroundColor = "rgba(255,255,255,0.08)"
        })

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          onUpdate: (self) => {
            const activeBars = Math.round(self.progress * vuBars.length)
            vuBars.forEach((bar, i) => {
              const isActive = i < activeBars
              const isPeak = i === activeBars - 1
              if (isActive) {
                const zone = i / vuBars.length
                const color =
                  zone < 0.5
                    ? "var(--lxndr-green)"
                    : zone < 0.8
                      ? "var(--lxndr-cyan)"
                      : "var(--lxndr-pink)"
                bar.style.backgroundColor = color
                bar.style.boxShadow = isPeak
                  ? `0 0 8px ${color}, 0 0 4px ${color}`
                  : "none"
              } else {
                bar.style.backgroundColor = "rgba(255,255,255,0.08)"
                bar.style.boxShadow = "none"
              }
            })
            if (vuLabelRef.current) {
              const db = -24 + self.progress * 24
              vuLabelRef.current.textContent = `${db >= 0 ? "+" : ""}${db.toFixed(1)} dB`
            }
            if (rainWrapperRef.current) {
              const rainProgress = Math.max(0, (self.progress - 0.85) / 0.15)
              rainWrapperRef.current.style.opacity = String(rainProgress * 0.55)
            }
          },
          onLeave: () => {
            vuBars.forEach((bar, i) => {
              const zone = i / vuBars.length
              bar.style.backgroundColor =
                zone < 0.5
                  ? "var(--lxndr-green)"
                  : zone < 0.8
                    ? "var(--lxndr-cyan)"
                    : "var(--lxndr-pink)"
              bar.style.boxShadow = "none"
            })
            if (vuLabelRef.current) vuLabelRef.current.textContent = "0.0 dB"
            if (rainWrapperRef.current) rainWrapperRef.current.style.opacity = "0.55"
          },
        })

        return
      }

      gsap.utils.toArray(sel("[data-beat]")).forEach((el) => {
        gsap.from(el as Element, {
          opacity: 0,
          y: 30,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el as Element,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
      })
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative min-h-screen overflow-hidden bg-[var(--lxndr-black)] px-6 py-16 md:px-12 md:py-20"
    >
      <div
        data-lxndr-parallax
        data-lxndr-parallax-x="20"
        data-lxndr-parallax-y="36"
        className="absolute inset-0 border-y border-white/10 lxndr-grid-bg opacity-60"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,10,168,0.06),transparent_26%),linear-gradient(90deg,rgba(0,234,255,0.035),transparent_32%,transparent_68%,rgba(255,10,168,0.025))]" />
      <div
        ref={rainWrapperRef}
        className="pointer-events-none absolute inset-0"
        style={{ opacity: 0 }}
      >
        <LxndrMatrixRain opacity={1} />
      </div>
      <div
        data-lxndr-parallax
        data-lxndr-parallax-x="-18"
        data-lxndr-parallax-y="44"
        className="absolute left-10 top-12 z-10 hidden md:block"
        aria-hidden="true"
      >
        <div className="relative h-16 w-16 border border-white/30">
          <div className="absolute inset-2 rotate-45 border border-white/30" />
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-white" />
        </div>
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.26em] text-white/40">freq. 174hz</p>
        <div className="mt-3 h-px w-5 bg-[var(--lxndr-pink)]" />
      </div>

      <div
        className="absolute bottom-16 left-10 z-10 hidden md:block"
        aria-hidden="true"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">db level</p>
        <div className="mt-3 flex w-10 flex-col-reverse gap-[3px]">
          {VU_BAR_IDS.map((barId, i) => (
            <span
              key={barId}
              ref={(el) => { if (el) vuBarsRef.current[i] = el }}
              className="h-2 w-full"
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            />
          ))}
        </div>
        <p ref={vuLabelRef} className="mt-2 font-mono text-[10px] text-white/30">-24.0 dB</p>
      </div>

      <div ref={contentRef} className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-[1280px] flex-col justify-between gap-7">
        <div className="relative flex flex-1 items-center">
          <div
            data-lxndr-drift
            data-lxndr-drift-x="58"
            data-lxndr-drift-y="44"
            className="relative w-full max-w-[980px] border-l-2 border-[var(--lxndr-pink)] pl-5 md:pl-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <p
                data-beat="eyebrow"
                className="font-mono text-xs uppercase tracking-[0.38em] text-[var(--lxndr-steel)]"
              >
                {t("eyebrow")}
              </p>
              <div className="hidden h-px flex-1 bg-white/20 md:block" />
              <span className="h-1.5 w-1.5 bg-[var(--lxndr-pink)]" />
            </div>

            <h2
              className="font-space text-[clamp(3.25rem,7.15vw,6.35rem)] font-black uppercase leading-[0.84] tracking-normal text-white"
            >
              <span data-beat="line1" className="block font-bebas">{t("line1")}</span>
              <span data-beat="line2" className="block font-space font-black">{t("line2")}</span>
              <span data-beat="line3" className="mt-2 block font-mono text-[clamp(1rem,1.6vw,1.5rem)] font-bold uppercase tracking-[0.45em] text-[var(--lxndr-steel)]">
                {t("line3")}
              </span>
              <span data-beat="line4" className="mt-2 block font-bebas text-[clamp(3.75rem,8.2vw,7.35rem)] leading-[0.82] text-[var(--lxndr-pink)]">
                {t("line4")}
              </span>
            </h2>

            <p
              data-beat="sub"
              className="mt-5 max-w-2xl border-t border-white/20 pt-4 font-mono text-sm leading-relaxed text-[var(--lxndr-offwhite)] md:text-base"
            >
              {t("sub")}
            </p>

            <div data-beat="waveform" className="mt-4 flex max-w-lg items-center gap-2" aria-hidden="true">
              {[18, 42, 26, 58, 34, 70, 38, 52, 22, 48, 30, 62].map((width) => (
                <span
                  key={width}
                  className="h-1 bg-white/20"
                  style={{ width }}
                />
              ))}
            </div>
          </div>

          <div
            data-beat="fx-matrix"
            className="absolute right-0 top-1/2 hidden w-[260px] -translate-y-1/2 border border-white/20 bg-black/20 p-5 font-mono text-[10px] uppercase leading-6 tracking-[0.22em] text-white/50 lg:block"
          >
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
              <span>fx matrix</span>
              <span className="text-[var(--lxndr-pink)]">armed</span>
            </div>
            {t("sideNote")}
            <div className="mt-5 grid grid-cols-4 gap-1" aria-hidden="true">
              {FX_MATRIX_BARS.map(({ id, active }) => (
                <span
                  key={id}
                  className={active ? "h-4 bg-[var(--lxndr-pink)]/70" : "h-4 border border-white/10"}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          data-lxndr-drift
          data-lxndr-drift-x="72"
          data-lxndr-drift-y="36"
          className="grid grid-cols-1 gap-px border border-white/20 bg-white/10 md:grid-cols-4"
        >
          {DIRECTIVES.map(({ id, key, module, value, textColor, borderColor, meterBg }, index) => (
            <div
              key={id}
              data-beat={`directive-${index}`}
              className={`relative min-w-0 overflow-hidden bg-[var(--lxndr-black)] px-5 py-4 border ${borderColor}`}
            >
              <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{module}</span>
              </div>
              <div className={`mt-5 truncate font-space text-[clamp(1.55rem,2.05vw,2.35rem)] font-black uppercase leading-none tracking-normal ${textColor}`}>
                {t(key)}
              </div>
              <div className="mt-4 flex items-end gap-1" aria-hidden="true">
                {[10, 18, 28, 14, 34, 22, 12].map((height, meterIndex) => (
                  <span
                    key={`${id}-${height}`}
                    className={meterIndex === index + 2 ? `w-1 ${meterBg}` : "w-1 bg-white/20"}
                    style={{ height }}
                  />
                ))}
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
