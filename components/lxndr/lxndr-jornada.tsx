"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { useLxndrScrollMotion } from "@/components/lxndr/use-lxndr-scroll-motion"

gsap.registerPlugin(ScrollTrigger)

type JornadaStep = { label: string; tag: string }

export function LxndrJornada() {
  const t = useTranslations("lxndr.jornada")
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLxndrScrollMotion(sectionRef)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(contentRef)

      if (prefersReducedMotion()) {
        gsap.set(sel("[data-anim]"), { opacity: 1, y: 0, x: 0 })
        return
      }

      gsap.set(sel("[data-jornada-header]"), { opacity: 0, y: 16 })
      gsap.set(sel("[data-jornada-headline]"), { opacity: 0, y: 60 })
      gsap.set(sel("[data-jornada-text]"), { opacity: 0, y: 20 })
      gsap.set(sel("[data-jornada-step]"), { opacity: 0, x: -24 })

      const base = { trigger: sectionRef.current, start: "top 78%", once: true }

      gsap.to(sel("[data-jornada-header]"), {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: base,
      })
      gsap.to(sel("[data-jornada-headline]"), {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { ...base, start: "top 75%" },
      })
      gsap.to(sel("[data-jornada-text]"), {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { ...base, start: "top 70%" },
      })
      gsap.to(sel("[data-jornada-step]"), {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { ...base, start: "top 65%" },
      })
    }, contentRef)

    return () => ctx.revert()
  }, [])

  const steps = t.raw("steps") as JornadaStep[]

  return (
    <section
      ref={sectionRef}
      id="jornada"
      className="relative overflow-hidden bg-[var(--lxndr-black)]"
    >
      <div
        data-lxndr-parallax
        data-lxndr-parallax-x="12"
        data-lxndr-parallax-y="28"
        className="pointer-events-none absolute inset-0 lxndr-grid-bg opacity-[0.05]"
      />

      <div ref={contentRef} className="relative z-10">

        <div
          data-anim
          data-jornada-header
          className="flex items-center gap-3 border-b border-white/8 px-6 py-5 md:px-12"
        >
          <span className="h-px w-5 bg-[var(--lxndr-pink)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-[var(--lxndr-pink)]/70">
            05 / jornada musical
          </span>
          <div className="h-px flex-1 bg-white/8" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/20">
            background.signal
          </span>
        </div>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1fr]">

          <div className="flex flex-col justify-center border-b border-white/8 px-6 py-16 md:px-12 md:py-20 lg:border-b-0 lg:border-r lg:border-white/8">
            <p
              data-anim
              data-jornada-header
              className="mb-6 font-mono text-xs uppercase tracking-[0.38em] text-[var(--lxndr-steel)]"
            >
              {t("eyebrow")}
            </p>

            <h2 className="font-bebas text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.88] tracking-tight text-white">
              <span data-anim data-jornada-headline className="block">{t("headline1")}</span>
              <span data-anim data-jornada-headline className="block">{t("headline2")}</span>
              <span data-anim data-jornada-headline className="block text-[var(--lxndr-pink)]">{t("headline3")}</span>
              <span data-anim data-jornada-headline className="block text-[var(--lxndr-pink)]">{t("headline4")}</span>
            </h2>

            <div className="mt-8 h-[2px] w-12 bg-[var(--lxndr-pink)]" />

            <p
              data-anim
              data-jornada-text
              className="mt-6 max-w-lg font-space text-base leading-relaxed text-white/68 md:text-lg"
            >
              {t("intro")}
            </p>

            <p
              data-anim
              data-jornada-text
              className="mt-3 max-w-lg font-space text-sm leading-relaxed text-white/42"
            >
              {t("body")}
            </p>
          </div>

          <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-20">
            <div className="flex flex-col gap-0 divide-y divide-white/8">
              {steps.map((step, index) => {
                const isLast = index === steps.length - 1
                return (
                  <div
                    key={step.label}
                    data-anim
                    data-jornada-step
                    className="flex items-center gap-5 py-5 transition-colors duration-200 hover:bg-white/[0.02]"
                  >
                    <span className={`w-8 font-mono text-xs tracking-[0.3em] ${isLast ? "text-[var(--lxndr-pink)]" : "text-white/22"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-1 items-center justify-between gap-4">
                      <span className={`font-bebas text-[clamp(1.5rem,3vw,2.2rem)] leading-none tracking-tight ${isLast ? "text-[var(--lxndr-pink)]" : "text-white/82"}`}>
                        {step.label}
                      </span>
                      <span className={`shrink-0 border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.28em] ${isLast ? "border-[var(--lxndr-pink)]/50 text-[var(--lxndr-pink)]/80" : "border-white/12 text-white/28"}`}>
                        {step.tag}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

        <div className="flex items-center justify-between border-t border-white/8 px-6 py-3.5 md:px-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/18">
            jornada / background musical
          </span>
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-[var(--lxndr-cyan)] opacity-50" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/18">
              active
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
