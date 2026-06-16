"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { useLxndrScrollMotion } from "@/components/lxndr/use-lxndr-scroll-motion"

gsap.registerPlugin(ScrollTrigger)

type WaveBar = { id: string; h: number }

const WAVEFORM_BARS: WaveBar[] = [
  4, 8, 14, 20, 28, 22, 16, 10, 6, 12, 20, 26, 18, 8, 4, 10, 22, 28, 16, 8,
  12, 18, 24, 16, 8, 4, 10, 14, 20, 26, 18, 12, 6, 4,
].map((h, i) => ({ id: `wb${String(i).padStart(2, "0")}`, h }))

export function LxndrVisualWorld() {
  const t = useTranslations("lxndr.visual")
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLxndrScrollMotion(sectionRef)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(contentRef)

      if (prefersReducedMotion()) {
        gsap.set(sel("[data-anim]"), { opacity: 1, x: 0, y: 0, scale: 1 })
        return
      }

      gsap.set(sel("[data-visual-title]"), { opacity: 0, y: 64 })
      gsap.set(sel("[data-visual-meta]"), { opacity: 0, y: 18 })
      gsap.set(sel("[data-visual-img]"), { opacity: 0, scale: 0.97 })
      gsap.set(sel("[data-visual-label]"), { opacity: 0, x: -10 })
      gsap.set(sel("[data-visual-element]"), { opacity: 0, y: 14 })

      const base = { trigger: sectionRef.current, start: "top 78%", once: true }

      gsap.to(sel("[data-visual-title]"), {
        opacity: 1, y: 0, duration: 0.95, ease: "power3.out",
        scrollTrigger: base,
      })
      gsap.to(sel("[data-visual-meta]"), {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { ...base, start: "top 76%" },
      })
      gsap.to(sel("[data-visual-img]"), {
        opacity: 1, scale: 1, duration: 1.1, ease: "power2.out", stagger: 0.1,
        scrollTrigger: { ...base, start: "top 72%" },
      })
      gsap.to(sel("[data-visual-label]"), {
        opacity: 1, x: 0, duration: 0.6, ease: "power3.out", stagger: 0.07,
        scrollTrigger: { ...base, start: "top 65%" },
      })
      gsap.to(sel("[data-visual-element]"), {
        opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06,
        scrollTrigger: { ...base, start: "top 60%" },
      })
    }, contentRef)

    return () => ctx.revert()
  }, [])

  const elements = t.raw("elements") as string[]

  return (
    <section
      ref={sectionRef}
      id="visual"
      className="relative overflow-hidden bg-[var(--lxndr-black)]"
    >

      <div
        data-lxndr-parallax
        data-lxndr-parallax-x="18"
        data-lxndr-parallax-y="32"
        className="pointer-events-none absolute inset-0 lxndr-noise z-[1] opacity-[0.18]"
      />

      <div ref={contentRef} className="relative z-10">

        <div className="border-b border-white/8 px-6 pb-8 pt-20 md:px-12 md:pt-24">
          <div
            data-visual-meta
            data-anim
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-5 bg-[var(--lxndr-pink)]" />
            <span className="font-mono text-xs uppercase tracking-[0.42em] text-[var(--lxndr-pink)]">
              06 / sistema visual
            </span>
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/20">
              artifact.sys
            </span>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <h2
              data-visual-title
              data-anim
              className="font-bebas text-[clamp(5rem,15vw,13rem)] leading-[0.82] tracking-tight text-[var(--lxndr-offwhite)]"
            >
              {t("title")}
            </h2>
            <p
              data-visual-meta
              data-anim
              className="max-w-xs pb-1.5 font-space text-sm leading-relaxed text-white/52 lg:max-w-sm lg:text-base"
            >
              {t("intro")}
            </p>
          </div>
          <div className="mt-5 h-[2px] w-20 bg-[var(--lxndr-pink)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">

          <div className="flex flex-col">

            <div
              data-visual-img
              data-anim
              data-lxndr-parallax
              data-lxndr-parallax-x="16"
              data-lxndr-parallax-y="-24"
              className="group relative min-h-[360px] overflow-hidden border-b border-white/8 md:min-h-[520px]"
            >
              <img
                src="/assets/lxndr/lxndr-art-03.jpg"
                alt="LXNDR — Visual Identity"
                className="h-full w-full object-cover opacity-88 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--lxndr-black)]/25 via-transparent" />
              <Scanlines />

              <div
                data-visual-label
                data-anim
                className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/55"
              >
                visual system / artifact 01
              </div>

              <div
                className="absolute right-5 top-5 h-16 w-16 border border-[var(--lxndr-pink)]/45"
                aria-hidden="true"
              >
                <div className="absolute inset-3 rotate-45 border border-[var(--lxndr-cyan)]/40" />
                <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-[var(--lxndr-pink)]" />
              </div>

              <div className="absolute bottom-5 left-5 space-y-2">
                {elements.slice(0, 2).map((el) => (
                  <div
                    key={el}
                    data-visual-label
                    data-anim
                    className="flex items-center gap-2"
                  >
                    <span className="h-px w-4 bg-[var(--lxndr-pink)]/55" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">
                      {el}
                    </span>
                  </div>
                ))}
              </div>

              <WaveformStrip
                bars={WAVEFORM_BARS.slice(0, 22)}
                color="var(--lxndr-cyan)"
                scale={0.44}
                opacity="opacity-20"
              />
            </div>

            <div
              data-visual-img
              data-anim
              data-lxndr-parallax
              data-lxndr-parallax-x="-12"
              data-lxndr-parallax-y="18"
              className="group relative min-h-[220px] overflow-hidden md:min-h-[300px]"
            >
              <img
                src="/assets/lxndr/lxndr-art-01.png"
                alt="LXNDR — Sonic Ritual"
                className="h-full w-full object-cover opacity-78 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/30" />
              <Scanlines opacity={0.05} />

              <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-[var(--lxndr-cyan)]/18 to-transparent" />

              <div className="absolute bottom-5 right-5 space-y-2 text-right">
                {elements.slice(2, 4).map((el) => (
                  <div
                    key={el}
                    data-visual-label
                    data-anim
                    className="flex items-center justify-end gap-2"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/45">
                      {el}
                    </span>
                    <span className="h-px w-4 bg-[var(--lxndr-cyan)]/50" />
                  </div>
                ))}
              </div>

              <div
                data-visual-label
                data-anim
                className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.26em] text-white/30"
              >
                freq.output{" — "}
                <span className="text-[var(--lxndr-green)]/65">live</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col border-l border-white/8">

            <div
              data-visual-img
              data-anim
              data-lxndr-parallax
              data-lxndr-parallax-x="26"
              data-lxndr-parallax-y="-14"
              className="group relative min-h-[320px] flex-1 overflow-hidden border-b border-white/8 md:min-h-[460px]"
            >
              <img
                src="/assets/lxndr/lxndr-art-04.jpg"
                alt="LXNDR — Brutalist Design System"
                className="h-full w-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75" />
              <Scanlines />

              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] opacity-60"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--lxndr-pink), transparent)",
                }}
              />

              <div
                data-visual-label
                data-anim
                className="absolute bottom-5 left-5"
              >
                <div
                  className="relative h-9 w-9 border border-white/22"
                  aria-hidden="true"
                >
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/18" />
                  <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/18" />
                  <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-[var(--lxndr-cyan)]" />
                </div>
                <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-white/26">
                  subject.01
                </p>
              </div>

              <div
                data-visual-label
                data-anim
                className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/40"
              >
                lxndr / raw signal
              </div>
            </div>

            <div
              data-visual-img
              data-anim
              data-lxndr-parallax
              data-lxndr-parallax-x="14"
              data-lxndr-parallax-y="22"
              className="group relative min-h-[220px] overflow-hidden md:min-h-[300px]"
            >
              <img
                src="/assets/lxndr/lxndr-art-02.png"
                alt="LXNDR — Interference Neon"
                className="h-full w-full object-cover opacity-72 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                style={{ filter: "saturate(0.9) contrast(1.05)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--lxndr-black)] via-transparent" />
              <Scanlines opacity={0.05} />

              <div className="absolute bottom-5 right-5 space-y-2 text-right">
                {elements.slice(4, 6).map((el) => (
                  <div
                    key={el}
                    data-visual-label
                    data-anim
                    className="flex items-center justify-end gap-2"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-[var(--lxndr-pink)]/52">
                      {el}
                    </span>
                    <span className="h-px w-4 bg-[var(--lxndr-pink)]/45" />
                  </div>
                ))}
              </div>

              <WaveformStrip
                bars={WAVEFORM_BARS.slice(14)}
                color="var(--lxndr-pink)"
                scale={0.3}
                opacity="opacity-[0.18]"
              />
            </div>

          </div>
        </div>

        <div className="border-t border-white/8 px-6 py-6 md:px-12">
          <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
            {elements.map((el, i) => (
              <div
                key={el}
                data-visual-element
                data-anim
                className="group"
              >
                <div
                  className="mb-2.5 h-px w-full bg-gradient-to-r from-[var(--lxndr-pink)]/28 to-transparent transition-all duration-300 group-hover:from-[var(--lxndr-pink)]/60"
                />
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/42 transition-colors duration-300 group-hover:text-white/70">
                  {el}
                </span>
                <div className="mt-2 font-mono text-[8px] tracking-[0.2em] text-white/18">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/8 px-6 py-3.5 md:px-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/18">
            mundo visual / sistema lxndr
          </span>
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-[var(--lxndr-pink)] opacity-50" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/18">
              artifact.sys
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}

function Scanlines({ opacity = 0.07 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)",
        opacity,
      }}
    />
  )
}

function WaveformStrip({
  bars,
  color,
  scale,
  opacity,
}: {
  bars: WaveBar[]
  color: string
  scale: number
  opacity: string
}) {
  return (
    <div
      className={`pointer-events-none absolute bottom-0 left-0 right-0 flex h-10 items-end gap-[2px] px-5 ${opacity}`}
      aria-hidden="true"
    >
      {bars.map(({ id, h }) => (
        <div
          key={id}
          className="max-w-[3px] flex-1"
          style={{ height: `${h * scale}px`, backgroundColor: color }}
        />
      ))}
    </div>
  )
}
