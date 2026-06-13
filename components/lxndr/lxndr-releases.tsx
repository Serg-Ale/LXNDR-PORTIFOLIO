"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { lxndrLinks } from "@/components/lxndr/lxndr-links"
import { useLxndrScrollMotion } from "@/components/lxndr/use-lxndr-scroll-motion"

gsap.registerPlugin(ScrollTrigger)

const RELEASES = [
  {
    id: "track-001",
    number: "01",
    trackKey: "track1",
    borderClass: "border-[var(--lxndr-pink)]",
    href: lxndrLinks.soundcloud,
  },
  {
    id: "track-002",
    number: "02",
    trackKey: "track2",
    borderClass: "border-[var(--lxndr-cyan)]",
    href: lxndrLinks.soundcloud,
  },
] as const

export function LxndrReleases() {
  const t = useTranslations("lxndr.releases")
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLxndrScrollMotion(sectionRef)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(contentRef)

      if (prefersReducedMotion()) {
        gsap.set(sel("[data-anim]"), { opacity: 1, y: 0 })
        return
      }

      gsap.set(sel("[data-release-card]"), { opacity: 0, y: 50 })

      gsap.to(sel("[data-release-card]"), {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      })
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="releases"
      className="relative overflow-hidden bg-[var(--lxndr-black)] px-6 py-28 md:px-12 md:py-36"
    >
      <div className="absolute inset-0 border-y border-white/8" />

      <div ref={contentRef} className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10">
        <div
          data-lxndr-drift
          data-lxndr-drift-x="42"
          data-lxndr-drift-y="48"
          className="flex flex-col gap-3 border-b border-white/10 pb-7 md:flex-row md:items-end md:justify-between"
        >
          <h2 data-anim className="font-bebas text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight text-white">
            {t("title")}
          </h2>
          <p data-anim className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--lxndr-steel)]">
            concrete signal / listen
          </p>
        </div>

        <div
          data-lxndr-drift
          data-lxndr-drift-x="72"
          data-lxndr-drift-y="46"
          className="grid grid-cols-1 gap-5 lg:grid-cols-2"
        >
          {RELEASES.map(({ id, number, trackKey, borderClass, href }) => (
            <article
              key={id}
              data-anim
              data-release-card
              className={`relative overflow-hidden border border-white/10 border-l-[6px] bg-black/30 p-6 md:p-8 ${borderClass}`}
            >
              <div className="flex h-full flex-col gap-6">
                <div className="flex items-start justify-between gap-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-[var(--lxndr-steel)]">
                    {number}
                  </span>
                  <span className="border border-white/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.24em] text-white/80">
                    {t(`${trackKey}.genre`)}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bebas text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-tight text-white">
                    {t(`${trackKey}.title`)}
                  </h3>
                  <p className="font-mono text-sm uppercase tracking-[0.25em] text-[var(--lxndr-steel)]">
                    {t(`${trackKey}.artists`)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                  <div className="space-y-1">
                    <p className="text-[var(--lxndr-steel)]">Label</p>
                    <p>{t(`${trackKey}.label`)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[var(--lxndr-steel)]">{t("bpm")}</p>
                    <p>{t(`${trackKey}.bpm`)}</p>
                  </div>
                </div>

                <p className="max-w-md font-space text-base leading-relaxed text-white/72">
                  {t(`${trackKey}.description`)}
                </p>

                <p className="max-w-xl font-space text-sm leading-relaxed text-white/48">
                  {t(`${trackKey}.body`)}
                </p>

                <div className="mt-auto border border-dashed border-white/12 bg-white/[0.015] px-4 py-5">
                  <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                    <span>{t("embedSlot")}</span>
                    <span>soundcloud</span>
                  </div>
                  <div className="mt-4 flex h-8 items-end gap-[3px] opacity-25" aria-hidden="true">
                    {[10, 22, 14, 30, 18, 26, 12, 20, 28, 16, 8, 24].map((height, index) => (
                      <span
                        key={`${id}-embed-${height}-${index}`}
                        className="flex-1 bg-white"
                        style={{ height }}
                      />
                    ))}
                  </div>
                </div>

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-white transition-colors hover:text-[var(--lxndr-pink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  {t("listenOn")}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
