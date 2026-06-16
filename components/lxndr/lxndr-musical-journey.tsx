"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { useLxndrScrollMotion } from "@/components/lxndr/use-lxndr-scroll-motion"
import {
  type NoteKey,
  useScrollChordAudio,
} from "@/components/lxndr/use-scroll-chord-audio"
import { SideChordSequencer } from "@/components/lxndr/side-chord-sequencer"

gsap.registerPlugin(ScrollTrigger)

type JornadaStep = { label: string; tag: string }

const NOTE_ZONES: Record<NoteKey, [number, number]> = {
  F3: [0.02, 0.98],
  A3: [0.14, 0.98],
  C4: [0.26, 0.98],
  E4: [0.38, 0.98],
  B4: [0.50, 0.98],
}

const NOTE_ORDER: NoteKey[] = ["F3", "A3", "C4", "E4", "B4"]

export function LxndrMusicalJourney() {
  const t = useTranslations("lxndr.jornada")
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prevActiveRef = useRef<Set<NoteKey>>(new Set())
  const pendingUnmuteRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [activeNotes, setActiveNotes] = useState<Set<NoteKey>>(new Set())
  const [scrollProgress, setScrollProgress] = useState(0)

  const {
    isEnabled: audioEnabled,
    isMuted,
    analyserNode,
    oscillatorType,
    activateAudio,
    toggleMute,
    setWaveType,
    activateNote,
    deactivateNote,
    deactivateAll,
    cleanup,
  } = useScrollChordAudio()

  useLxndrScrollMotion(sectionRef)

  useEffect(() => {
    return () => {
      cleanup()
      if (pendingUnmuteRef.current) {
        clearTimeout(pendingUnmuteRef.current)
      }
    }
  }, [cleanup])

  useEffect(() => {
    const root = contentRef.current
    const section = sectionRef.current
    if (!root || !section) return

    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(root)

      if (prefersReducedMotion()) {
        gsap.set(sel("[data-anim]"), { opacity: 1, y: 0, x: 0 })
      } else {
        gsap.set(sel("[data-jornada-header]"), { opacity: 0, y: 16 })
        gsap.set(sel("[data-jornada-headline]"), { opacity: 0, y: 60 })
        gsap.set(sel("[data-jornada-text]"), { opacity: 0, y: 20 })
        gsap.set(sel("[data-jornada-step]"), { opacity: 0, x: -24 })
        gsap.set(sel("[data-jornada-sequencer]"), { opacity: 0, y: 24 })

        const base = { trigger: section, start: "top 78%", once: true }

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
        gsap.to(sel("[data-jornada-sequencer]"), {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { ...base, start: "top 74%" },
        })
      }
    }, root)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const syncActiveNotes = (progress: number) => {
      const nextActive = new Set<NoteKey>(NOTE_ORDER.filter((note) => progress >= NOTE_ZONES[note][0] && progress <= NOTE_ZONES[note][1]))

      const prevActive = prevActiveRef.current

      nextActive.forEach((note) => {
        if (!prevActive.has(note)) {
          activateNote(note)
        }
      })

      prevActive.forEach((note) => {
        if (!nextActive.has(note)) {
          deactivateNote(note)
        }
      })

      prevActiveRef.current = nextActive

      setActiveNotes(nextActive)
    }

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      end: "bottom center",
      onUpdate: (self) => {
        const progress = self.progress
        setScrollProgress(progress)
        syncActiveNotes(progress)
      },
      onLeave: () => {
        prevActiveRef.current = new Set()
        deactivateAll()
        setActiveNotes(new Set())
        setScrollProgress(1)
      },
      onLeaveBack: () => {
        prevActiveRef.current = new Set()
        deactivateAll()
        setActiveNotes(new Set())
        setScrollProgress(0)
      },
    })

    syncActiveNotes(trigger.progress)

    return () => {
      trigger.kill()
    }
  }, [activateNote, deactivateAll, deactivateNote])

  const handleActivateAudio = useCallback(() => {
    activateAudio()
  }, [activateAudio])

  const handleToggleMute = useCallback(() => {
    if (pendingUnmuteRef.current) {
      clearTimeout(pendingUnmuteRef.current)
      pendingUnmuteRef.current = null
    }

    const section = sectionRef.current

    if (!isMuted) {
      toggleMute()
      section?.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      section?.scrollIntoView({ behavior: "smooth", block: "start" })
      pendingUnmuteRef.current = setTimeout(() => {
        toggleMute()
        pendingUnmuteRef.current = null
      }, 900)
    }
  }, [isMuted, toggleMute])

  const handleSetWaveType = useCallback((type: OscillatorType) => {
    setWaveType(type)
  }, [setWaveType])

  const steps = t.raw("steps") as JornadaStep[]

  return (
    <section ref={sectionRef} id="jornada" className="relative bg-[var(--lxndr-black)]">
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
          <span className="font-mono text-xs uppercase tracking-[0.42em] text-[var(--lxndr-pink)]">
            04 / jornada musical
          </span>
          <div className="h-px flex-1 bg-white/8" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/20">
            background.signal
          </span>
        </div>

        {!audioEnabled && (
          <div className="flex items-center justify-between gap-4 border-b border-[var(--lxndr-pink)]/20 bg-[var(--lxndr-pink)]/[0.04] px-6 py-3 md:px-12">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 animate-pulse bg-[var(--lxndr-pink)]/60" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                ative o som para experiência completa
              </span>
            </div>
            <button
              type="button"
              onClick={handleActivateAudio}
              aria-label="Ativar áudio do sequenciador de acordes"
              className="shrink-0 border border-[var(--lxndr-pink)]/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--lxndr-pink)]/80 transition-colors duration-200 hover:border-[var(--lxndr-pink)] hover:text-[var(--lxndr-pink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--lxndr-pink)] focus-visible:outline-offset-2"
            >
              ATIVAR SOM
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_280px]">
          <div
            data-jornada-sequencer
            className="border-b border-white/8 px-6 py-6 md:px-12 lg:col-start-2 lg:row-span-2 lg:border-b-0 lg:border-l lg:border-white/8 lg:px-0 lg:py-8"
          >
            <div className="lg:sticky lg:top-8 lg:p-8">
              <SideChordSequencer
                activeNotes={activeNotes}
                audioEnabled={audioEnabled}
                isMuted={isMuted}
                scrollProgress={scrollProgress}
                analyserNode={analyserNode}
                oscillatorType={oscillatorType}
                onToggleMute={handleToggleMute}
                onSetWaveType={handleSetWaveType}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center border-b border-white/8 px-6 py-16 md:px-12 md:py-20 lg:col-start-1 lg:row-start-1 lg:border-b-0 lg:border-r lg:border-white/8">
            <p
              data-anim
              data-jornada-header
              className="mb-6 font-mono text-xs uppercase tracking-[0.38em] text-[var(--lxndr-steel)]"
            >
              {t("eyebrow")}
            </p>

            <h2 className="font-bebas text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.88] tracking-tight text-white">
              <span data-anim data-jornada-headline className="block">
                {t("headline1")}
              </span>
              <span data-anim data-jornada-headline className="block">
                {t("headline2")}
              </span>
              <span data-anim data-jornada-headline className="block text-[var(--lxndr-pink)]">
                {t("headline3")}
              </span>
              <span data-anim data-jornada-headline className="block text-[var(--lxndr-pink)]">
                {t("headline4")}
              </span>
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

          <div className="flex flex-col justify-center px-6 py-16 md:px-12 md:py-20 lg:col-start-1 lg:row-start-2">
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
                    <span
                      className={`w-8 font-mono text-xs tracking-[0.3em] ${isLast ? "text-[var(--lxndr-pink)]" : "text-white/22"}`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-1 items-center justify-between gap-4">
                      <span
                        className={`font-bebas text-[clamp(1.5rem,3vw,2.2rem)] leading-none tracking-tight ${isLast ? "text-[var(--lxndr-pink)]" : "text-white/82"}`}
                      >
                        {step.label}
                      </span>
                      <span
                        className={`shrink-0 border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.28em] ${isLast ? "border-[var(--lxndr-pink)]/50 text-[var(--lxndr-pink)]/80" : "border-white/12 text-white/28"}`}
                      >
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
            <div className="h-1 w-1 bg-[var(--lxndr-cyan)] opacity-50" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/18">
              active
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
