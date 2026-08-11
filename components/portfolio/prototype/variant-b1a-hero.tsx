// PROTOTYPE — B1a's hero, split out as its own client component so the
// motion (signal-lock boot sequence, photo clip-reveal, name parallax on
// scroll) can live near the DOM it touches, same pattern the production
// /saerix hero uses.
//
// Opening beat: a scan-line sweeps in with a mono sync counter (00%→100%,
// numeric only — no new hardcoded English microcopy), then collapses into
// the photo clip-reveal and a two-beat name cascade (first name, then last
// name). This is the page's one authored focal moment; everything after it
// reverts to quieter supporting motion.

"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { devFacts } from "./dev-resume-data"
import { PhotoPlaceholder } from "./photo-placeholder"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { useLoopWhileVisible } from "./use-loop-while-visible"

gsap.registerPlugin(ScrollTrigger)

export function VariantB1aHero() {
  const t = useTranslations("devLanding")
  const [firstName, lastName] = devFacts.name.split(" ")
  const sectionRef = useRef<HTMLElement>(null)
  const nameGroupRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const photoFrameRef = useRef<HTMLDivElement>(null)
  const scanBarRef = useRef<HTMLDivElement>(null)
  const syncCounterRef = useRef<HTMLSpanElement>(null)
  const scanlineRef = useRef<HTMLDivElement>(null)

  // Opening beat: scan-line sweep + sync counter, then photo/name settle.
  useEffect(() => {
    const section = sectionRef.current
    const nameGroup = nameGroupRef.current
    const photo = photoRef.current
    const scanBar = scanBarRef.current
    const syncCounter = syncCounterRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        if (photo) gsap.set(photo, { clipPath: "inset(0% 0% 0% 0%)" })
        if (scanBar) gsap.set(scanBar, { opacity: 0 })
        if (syncCounter) gsap.set(syncCounter, { opacity: 0 })
        return
      }

      if (photo) gsap.set(photo, { clipPath: "inset(100% 0% 0% 0%)" })

      const tl = gsap.timeline({ delay: 0.15 })

      if (scanBar && syncCounter) {
        const counter = { value: 0 }
        gsap.set(scanBar, { scaleX: 0, transformOrigin: "left center" })
        gsap.set(syncCounter, { opacity: 1 })
        syncCounter.textContent = "00%"

        tl.to(scanBar, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, 0)
          .to(
            counter,
            {
              value: 100,
              duration: 0.5,
              ease: "power2.inOut",
              onUpdate: () => {
                syncCounter.textContent = `${Math.round(counter.value)}%`
              },
            },
            0
          )
          .to(scanBar, { opacity: 0, duration: 0.25, ease: "power2.out" }, 0.5)
          .to(syncCounter, { opacity: 0, duration: 0.2 }, 0.5)
      }

      if (photo) {
        tl.to(
          photo,
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.inOut" },
          scanBar ? 0.45 : 0.25
        )
      }

      if (nameGroup) {
        gsap.to(nameGroup, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        })
        if (photo) {
          gsap.to(photo, {
            y: 24,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 1.2,
            },
          })
        }
      }
    }, section)

    return () => ctx.revert()
  }, [])

  // Ambient scanline inside the photo frame — loops only while the frame is
  // in view, frozen under reduced motion.
  useLoopWhileVisible(photoFrameRef, () => {
    gsap.set(scanlineRef.current, { yPercent: -100 })
    return gsap.to(scanlineRef.current, { yPercent: 200, duration: 3.2, ease: "none", repeat: -1 })
  })

  return (
    <section ref={sectionRef} className="relative py-10 md:py-16">
      <div
        ref={scanBarRef}
        className="absolute left-0 right-0 top-0 h-[2px] bg-[var(--color-accent-purple)]"
        aria-hidden="true"
      />
      <span
        ref={syncCounterRef}
        className="pointer-events-none absolute right-0 top-2 font-mono text-[10px] tabular-nums tracking-[0.3em] text-[var(--color-accent-purple)] opacity-0"
        aria-hidden="true"
      >
        00%
      </span>

      <div ref={nameGroupRef}>
        <SplitTextReveal
          as="h1"
          delay={0.55}
          className="font-bebas text-[clamp(4.5rem,15vw,13rem)] leading-[0.78] tracking-tight"
        >
          {firstName}
        </SplitTextReveal>
        <SplitTextReveal
          as="p"
          delay={0.68}
          className="font-bebas text-[clamp(4.5rem,15vw,13rem)] leading-[0.78] tracking-tight text-black/15"
        >
          {lastName}
        </SplitTextReveal>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_220px] md:items-end">
        <p className="max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-black/55">
          {t("role")}<br />{t("roleLine")}<br />{t("location")}
        </p>
        <p className="max-w-xs self-end font-space text-sm leading-relaxed text-black/75">
          {t("status")}
        </p>
        <div ref={photoRef} className="w-full max-w-[220px] justify-self-end">
          <div ref={photoFrameRef} className="relative">
            <PhotoPlaceholder tone="neutral" className="aspect-[4/5] w-full border-2 border-black" />
            <div
              ref={scanlineRef}
              className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-black/10 to-transparent"
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-1.5 bg-white/85 px-1.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-purple)] pulse-dot" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-black/60">
                {t("activeStatus")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
