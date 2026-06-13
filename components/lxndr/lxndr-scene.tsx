"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { useLxndrScrollMotion } from "@/components/lxndr/use-lxndr-scroll-motion"

gsap.registerPlugin(ScrollTrigger)

const LDA = { cx: 205, cy: 92 }
const PG = { cx: 272, cy: 308 }

const GRID_H = Array.from({ length: 12 }, (_, i) => (i + 1) * 40)
const GRID_V = Array.from({ length: 9 }, (_, i) => (i + 1) * 40)

const SCENE_DATA = [
  { id: "sd-01", label: "COLETIVO", value: "AEON AUDIO" },
  { id: "sd-02", label: "DESDE", value: "2024+" },
  { id: "sd-03", label: "REGIÃO", value: "PR — BR" },
  { id: "sd-04", label: "CENA", value: "TECHNO / PSY" },
] as const

export function LxndrScene() {
  const t = useTranslations("lxndr.scene")
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useLxndrScrollMotion(sectionRef)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(contentRef)
      const reduced = prefersReducedMotion()

      if (reduced) {
        gsap.set(sel("[data-anim]"), { opacity: 1, y: 0, x: 0 })
        return
      }

      gsap.set(sel("[data-scene-header]"), { opacity: 0, y: 20 })
      gsap.set(sel("[data-scene-title]"), { opacity: 0, y: 50 })
      gsap.set(sel("[data-scene-map]"), { opacity: 0, scale: 0.97 })
      gsap.set(sel("[data-scene-chip]"), { opacity: 0, y: 14 })
      gsap.set(sel("[data-scene-text]"), { opacity: 0, y: 20 })

      const base = { trigger: sectionRef.current, start: "top 78%", once: true }

      gsap.to(sel("[data-scene-header]"), {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: base,
      })
      gsap.to(sel("[data-scene-map]"), {
        opacity: 1, scale: 1, duration: 1.0, ease: "power2.out",
        scrollTrigger: { ...base, start: "top 75%" },
      })
      gsap.to(sel("[data-scene-title]"), {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { ...base, start: "top 73%" },
      })
      gsap.to(sel("[data-scene-chip]"), {
        opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { ...base, start: "top 68%" },
      })
      gsap.to(sel("[data-scene-text]"), {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { ...base, start: "top 65%" },
      })
    }, contentRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!svgRef.current) return
    if (prefersReducedMotion()) return

    const svgCtx = gsap.context(() => {
      gsap.fromTo(
        "[data-lda-ping]",
        { attr: { r: 8 }, opacity: 0.7 },
        { attr: { r: 90 }, opacity: 0, duration: 2.6, repeat: -1, ease: "power1.out", delay: 0 }
      )
      gsap.fromTo(
        "[data-pg-ping]",
        { attr: { r: 8 }, opacity: 0.6 },
        { attr: { r: 75 }, opacity: 0, duration: 2.6, repeat: -1, ease: "power1.out", delay: 1.3 }
      )
      gsap.fromTo(
        "[data-signal-dot]",
        { attr: { cx: LDA.cx, cy: LDA.cy }, opacity: 0.9 },
        { attr: { cx: PG.cx, cy: PG.cy }, opacity: 0.5, duration: 2.4, repeat: -1, yoyo: true, ease: "power1.inOut", delay: 0.6 }
      )
      gsap.to("[data-connection-line]", {
        attr: { strokeDashoffset: -170 },
        duration: 2.8,
        repeat: -1,
        ease: "none",
      })
    }, svgRef)

    return () => svgCtx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="scene"
      className="relative overflow-hidden bg-[var(--lxndr-black)]"
    >
      <div
        data-lxndr-parallax
        data-lxndr-parallax-x="14"
        data-lxndr-parallax-y="30"
        className="pointer-events-none absolute inset-0 lxndr-grid-bg opacity-[0.06]"
      />

      <div ref={contentRef} className="relative z-10">

        <div
          data-anim
          data-scene-header
          className="flex items-center gap-3 border-b border-white/8 px-6 py-5 md:px-12"
        >
          <span className="h-px w-5 bg-[var(--lxndr-cyan)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-[var(--lxndr-cyan)]/70">
            05 / a cena
          </span>
          <div className="h-px flex-1 bg-white/8" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/20">
            signal.south
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(380px,42%)_1fr]">

          <div
            data-anim
            data-scene-map
            className="relative flex flex-col border-b border-white/8 lg:border-b-0 lg:border-r"
          >
            <div className="relative flex-1 min-h-[460px]">
              <svg
                ref={svgRef}
                viewBox="0 0 400 500"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <pattern id="mapScanlines" x="0" y="0" width="400" height="3" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="1.5" x2="400" y2="1.5" stroke="rgba(255,255,255,0.018)" strokeWidth="0.7" />
                  </pattern>
                </defs>

                <rect x="0" y="0" width="400" height="500" fill="url(#mapScanlines)" />

                {GRID_H.map((y) => (
                  <line key={`gh${y}`} x1={0} y1={y} x2={400} y2={y} stroke="rgba(255,255,255,0.10)" strokeWidth={0.5} />
                ))}
                {GRID_V.map((x) => (
                  <line key={`gv${x}`} x1={x} y1={0} x2={x} y2={500} stroke="rgba(255,255,255,0.10)" strokeWidth={0.5} />
                ))}

                <line
                  x1={LDA.cx} y1={LDA.cy} x2={PG.cx} y2={PG.cy}
                  stroke="rgba(0,234,255,0.42)"
                  strokeWidth={1.5}
                  strokeDasharray="10 7"
                  strokeDashoffset={0}
                  data-connection-line
                />

                <circle cx={238} cy={200} r={3.5} fill="rgba(255,255,255,0.50)" />
                <line x1={242} y1={200} x2={270} y2={188} stroke="rgba(255,255,255,0.22)" strokeWidth={0.6} />
                <text x={272} y={186} fill="rgba(255,255,255,0.48)" fontSize={8} fontFamily="monospace">≈ 120 KM</text>

                <circle cx={LDA.cx} cy={LDA.cy} r={24} fill="rgba(255,10,168,0.06)" />
                <circle data-lda-ping cx={LDA.cx} cy={LDA.cy} r={8} fill="none" stroke="rgba(255,10,168,0.55)" strokeWidth={1} />
                <circle cx={LDA.cx} cy={LDA.cy} r={14} fill="none" stroke="rgba(255,10,168,0.15)" strokeWidth={5} />
                <line x1={LDA.cx - 32} y1={LDA.cy} x2={LDA.cx - 12} y2={LDA.cy} stroke="rgba(255,10,168,0.48)" strokeWidth={0.8} />
                <line x1={LDA.cx + 12} y1={LDA.cy} x2={LDA.cx + 32} y2={LDA.cy} stroke="rgba(255,10,168,0.48)" strokeWidth={0.8} />
                <line x1={LDA.cx} y1={LDA.cy - 32} x2={LDA.cx} y2={LDA.cy - 12} stroke="rgba(255,10,168,0.48)" strokeWidth={0.8} />
                <line x1={LDA.cx} y1={LDA.cy + 12} x2={LDA.cx} y2={LDA.cy + 32} stroke="rgba(255,10,168,0.48)" strokeWidth={0.8} />
                <circle cx={LDA.cx} cy={LDA.cy} r={6} fill="var(--lxndr-pink)" />
                <circle cx={LDA.cx} cy={LDA.cy} r={2.5} fill="white" />

                <text x={LDA.cx + 18} y={LDA.cy - 8} fill="rgba(255,255,255,0.92)" fontSize={14} fontFamily="monospace" fontWeight="bold" letterSpacing={2}>LONDRINA</text>
                <text x={LDA.cx + 18} y={LDA.cy + 7} fill="rgba(255,10,168,0.82)" fontSize={9} fontFamily="monospace" letterSpacing={1}>NORTE DO PARANÁ</text>
                <text x={LDA.cx + 18} y={LDA.cy + 20} fill="rgba(255,255,255,0.42)" fontSize={8} fontFamily="monospace">23°19&apos;S  51°09&apos;W</text>

                <circle cx={PG.cx} cy={PG.cy} r={24} fill="rgba(0,234,255,0.05)" />
                <circle data-pg-ping cx={PG.cx} cy={PG.cy} r={8} fill="none" stroke="rgba(0,234,255,0.50)" strokeWidth={1} />
                <circle cx={PG.cx} cy={PG.cy} r={14} fill="none" stroke="rgba(0,234,255,0.13)" strokeWidth={5} />
                <line x1={PG.cx - 32} y1={PG.cy} x2={PG.cx - 12} y2={PG.cy} stroke="rgba(0,234,255,0.44)" strokeWidth={0.8} />
                <line x1={PG.cx + 12} y1={PG.cy} x2={PG.cx + 32} y2={PG.cy} stroke="rgba(0,234,255,0.44)" strokeWidth={0.8} />
                <line x1={PG.cx} y1={PG.cy - 32} x2={PG.cx} y2={PG.cy - 12} stroke="rgba(0,234,255,0.44)" strokeWidth={0.8} />
                <line x1={PG.cx} y1={PG.cy + 12} x2={PG.cx} y2={PG.cy + 32} stroke="rgba(0,234,255,0.44)" strokeWidth={0.8} />
                <circle cx={PG.cx} cy={PG.cy} r={6} fill="var(--lxndr-cyan)" />
                <circle cx={PG.cx} cy={PG.cy} r={2.5} fill="white" />

                <text x={PG.cx + 18} y={PG.cy - 8} fill="rgba(255,255,255,0.92)" fontSize={13} fontFamily="monospace" fontWeight="bold" letterSpacing={1}>PONTA GROSSA</text>
                <text x={PG.cx + 18} y={PG.cy + 7} fill="rgba(0,234,255,0.78)" fontSize={9} fontFamily="monospace" letterSpacing={1}>CENTRO DO PARANÁ</text>
                <text x={PG.cx + 18} y={PG.cy + 20} fill="rgba(255,255,255,0.42)" fontSize={8} fontFamily="monospace">25°05&apos;S  50°10&apos;W</text>

                <circle data-signal-dot cx={LDA.cx} cy={LDA.cy} r={4} fill="white" opacity={0.9} />

                <rect x={6} y={6} width={22} height={22} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={0.5} />
                <line x1={6} y1={17} x2={28} y2={17} stroke="rgba(255,255,255,0.12)" strokeWidth={0.5} />
                <line x1={17} y1={6} x2={17} y2={28} stroke="rgba(255,255,255,0.12)" strokeWidth={0.5} />

                <rect x={372} y={6} width={22} height={22} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={0.5} />
                <line x1={372} y1={17} x2={394} y2={17} stroke="rgba(255,255,255,0.12)" strokeWidth={0.5} />
                <line x1={383} y1={6} x2={383} y2={28} stroke="rgba(255,255,255,0.12)" strokeWidth={0.5} />

                <rect x={6} y={472} width={22} height={22} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={0.5} />
                <line x1={6} y1={483} x2={28} y2={483} stroke="rgba(255,255,255,0.12)" strokeWidth={0.5} />
                <line x1={17} y1={472} x2={17} y2={494} stroke="rgba(255,255,255,0.12)" strokeWidth={0.5} />

                <rect x={372} y={472} width={22} height={22} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={0.5} />
                <line x1={372} y1={483} x2={394} y2={483} stroke="rgba(255,255,255,0.12)" strokeWidth={0.5} />
                <line x1={383} y1={472} x2={383} y2={494} stroke="rgba(255,255,255,0.12)" strokeWidth={0.5} />

                <text x={10} y={494} fill="rgba(255,255,255,0.28)" fontSize={8} fontFamily="monospace" letterSpacing={1.5}>PARANÁ — BRASIL</text>
                <text x={292} y={494} fill="rgba(255,255,255,0.18)" fontSize={7} fontFamily="monospace">signal.map</text>
              </svg>
            </div>

            <div className="flex items-end justify-between border-t border-white/8 px-6 py-4">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-[var(--lxndr-pink)]/60">Londrina</p>
                <p className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-white/40">-23.31°S / -51.16°W</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-[var(--lxndr-cyan)]/55">Ponta Grossa</p>
                <p className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-white/40">-25.09°S / -50.17°W</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-7 px-8 py-12 md:px-12 md:py-14">

            <div>
              <p
                data-anim
                data-scene-header
                className="mb-3 font-mono text-xs uppercase tracking-[0.38em] text-[var(--lxndr-steel)]"
              >
                {t("title")}
              </p>
              <h2
                data-anim
                data-scene-title
                className="font-bebas text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-tight text-white"
              >
                {t("origin")}
              </h2>
              <p
                data-anim
                data-scene-title
                className="mt-3 font-mono text-sm uppercase tracking-[0.28em] text-[var(--lxndr-cyan)] md:text-base"
              >
                {t("between")}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {SCENE_DATA.map(({ id, label, value }) => (
                <div
                  key={id}
                  data-anim
                  data-scene-chip
                  className="flex flex-col border border-white/12 px-4 py-3 transition-colors duration-200 hover:border-white/28"
                >
                  <span className="font-mono text-[8px] uppercase tracking-[0.32em] text-white/30">{label}</span>
                  <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-white/72">{value}</span>
                </div>
              ))}
            </div>

            <p
              data-anim
              data-scene-text
              className="max-w-xl border-l-2 border-[var(--lxndr-green)] pl-5 font-space text-base leading-relaxed text-white/68 md:pl-7 md:text-lg"
            >
              {t("connected")}
            </p>

          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-white/8 px-6 py-4 md:px-12">
          <span
            data-anim
            data-scene-text
            className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/32"
          >
            {t("signal")}
          </span>
          <div className="h-px flex-1 bg-white/8" />
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-[var(--lxndr-cyan)] opacity-55" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/18">
              active
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
