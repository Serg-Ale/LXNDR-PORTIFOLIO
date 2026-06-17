"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { useLxndrScrollMotion } from "@/components/lxndr/use-lxndr-scroll-motion"

gsap.registerPlugin(ScrollTrigger)

const GRID_H = Array.from({ length: 12 }, (_, i) => (i + 1) * 40)
const GRID_V = Array.from({ length: 9 }, (_, i) => (i + 1) * 40)

const SCENE_DATA = [
  { id: "sd-01", label: "COLETIVO", value: "AEON AUDIO" },
  { id: "sd-02", label: "DESDE", value: "2024+" },
  { id: "sd-03", label: "REGIÃO", value: "PR — BR" },
  { id: "sd-04", label: "CENA", value: "OPEN FORMAT" },
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
    if (window.matchMedia("(max-width: 767px)").matches) return

    const svgCtx = gsap.context((self) => {
      const rally = [
        { cx: 86, cy: 126, leftY: 88, rightY: 42, hit: "left" },
        { cx: 314, cy: 84, leftY: 88, rightY: 44, hit: "right" },
        { cx: 86, cy: 246, leftY: 208, rightY: 44, hit: "left" },
        { cx: 314, cy: 356, leftY: 208, rightY: 318, hit: "right" },
        { cx: 86, cy: 336, leftY: 296, rightY: 318, hit: "left" },
        { cx: 314, cy: 188, leftY: 296, rightY: 150, hit: "right" },
        { cx: 86, cy: 156, leftY: 118, rightY: 150, hit: "left" },
        { cx: 314, cy: 292, leftY: 118, rightY: 254, hit: "right" },
      ]

      const ball = svgRef.current?.querySelector<SVGCircleElement>("[data-pong-ball]")
      const leftPaddle = svgRef.current?.querySelector<SVGRectElement>("[data-pong-left]")
      const rightPaddle = svgRef.current?.querySelector<SVGRectElement>("[data-pong-right]")
      const trail = svgRef.current?.querySelector<SVGPolylineElement>("[data-pong-trail]")
      const leftImpact = svgRef.current?.querySelector<SVGCircleElement>("[data-pong-left-impact]")
      const rightImpact = svgRef.current?.querySelector<SVGCircleElement>("[data-pong-right-impact]")

      if (!ball || !leftPaddle || !rightPaddle || !trail || !leftImpact || !rightImpact) return

      const segmentDuration = 0.72
      let leftY = rally[0].leftY
      let rightY = rally[0].rightY
      let previousSegment = -1

      const setAttr = (element: SVGElement, attrs: Record<string, number | string>) => {
        Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, String(value)))
      }

      const triggerImpact = (point: typeof rally[number]) => {
        const isLeft = point.hit === "left"
        const impact = isLeft ? leftImpact : rightImpact
        const paddle = isLeft ? leftPaddle : rightPaddle
        const baseX = isLeft ? 68 : 322

        setAttr(impact, { cy: point.cy, r: 5, opacity: 0.85 })
        gsap.fromTo(
          impact,
          { attr: { r: 5 }, opacity: 0.85 },
          { attr: { r: 26 }, opacity: 0, duration: 0.2, ease: "power1.out" }
        )
        gsap.fromTo(
          paddle,
          { attr: { x: isLeft ? 64 : 326 } },
          { attr: { x: baseX }, duration: 0.12, ease: "steps(1)" }
        )
      }

      const updatePong = () => {
        const totalDuration = rally.length * segmentDuration
        const time = gsap.utils.wrap(0, totalDuration, gsap.ticker.time)
        const segment = Math.floor(time / segmentDuration)
        const nextSegment = (segment + 1) % rally.length
        const current = rally[segment]
        const next = rally[nextSegment]
        const progress = (time - segment * segmentDuration) / segmentDuration

        const cx = gsap.utils.interpolate(current.cx, next.cx, progress)
        const cy = gsap.utils.interpolate(current.cy, next.cy, progress)

        leftY = gsap.utils.interpolate(leftY, next.leftY, 0.18)
        rightY = gsap.utils.interpolate(rightY, next.rightY, 0.18)

        setAttr(ball, { cx, cy })
        setAttr(leftPaddle, { y: leftY })
        setAttr(rightPaddle, { y: rightY })
        setAttr(trail, { points: `${current.cx},${current.cy} ${cx},${cy}` })

        if (segment !== previousSegment) {
          triggerImpact(current)
          previousSegment = segment
        }
      }

      updatePong()
      gsap.ticker.add(updatePong)
      self.add(() => gsap.ticker.remove(updatePong))

      gsap.fromTo(
        "[data-pong-trail]",
        { opacity: 0.12, scale: 0.96, transformOrigin: "center" },
        { opacity: 0.42, scale: 1.02, duration: 0.22, repeat: -1, yoyo: true, ease: "steps(1)" }
      )

      gsap.to("[data-pong-blink]", {
        opacity: 0.28,
        duration: 0.14,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
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
          <span className="font-mono text-xs uppercase tracking-[0.42em] text-[var(--lxndr-cyan)]">
            07 / a cena
          </span>
          <div className="h-px flex-1 bg-white/8" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/20">
            signal.norte
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(380px,42%)_1fr]">

          <div
            data-anim
            data-scene-map
            className="relative order-2 flex flex-col border-b border-white/8 lg:order-1 lg:border-b-0 lg:border-r"
          >
            <div className="relative min-h-[190px] border-t border-white/8 px-6 py-5 md:hidden">
              <div className="relative h-[150px] overflow-hidden border border-white/18 bg-black">
                <div className="absolute inset-0 lxndr-grid-bg opacity-[0.08]" />
                <svg
                  viewBox="0 0 320 150"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <line x1="160" y1="16" x2="160" y2="134" stroke="rgba(255,255,255,0.24)" strokeDasharray="7 8" />
                  <polyline
                    points="34,36 284,72 34,112 284,48"
                    fill="none"
                    stroke="rgba(255,10,168,0.28)"
                    strokeWidth="1"
                    strokeDasharray="5 8"
                  />
                  <rect x="36" y="26" width="6" height="44" fill="var(--lxndr-pink)" filter="drop-shadow(0 0 8px rgba(255,10,168,0.75))">
                    <animate attributeName="y" values="26;84;50;96;26" dur="5.2s" repeatCount="indefinite" />
                  </rect>
                  <rect x="278" y="84" width="6" height="44" fill="var(--lxndr-cyan)" filter="drop-shadow(0 0 8px rgba(0,234,255,0.75))">
                    <animate attributeName="y" values="84;30;92;46;84" dur="5.2s" repeatCount="indefinite" />
                  </rect>
                  <circle r="5" fill="white" filter="drop-shadow(0 0 8px rgba(255,255,255,0.95))">
                    <animate attributeName="cx" values="46;272;46;272;46" dur="5.2s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="48;54;106;78;48" dur="5.2s" repeatCount="indefinite" />
                  </circle>
                </svg>
                <div className="absolute left-5 top-4 font-mono text-4xl font-bold leading-none text-white/82">0</div>
                <div className="absolute right-5 top-4 font-mono text-4xl font-bold leading-none text-white/82">7</div>
                <div className="absolute bottom-4 left-5 font-mono text-[8px] uppercase tracking-[0.24em] text-[var(--lxndr-pink)]/70">
                  londrina serve
                </div>
                <div className="absolute bottom-4 right-5 text-right font-mono text-[8px] uppercase tracking-[0.24em] text-[var(--lxndr-cyan)]/70">
                  cena responde
                </div>
              </div>
            </div>

            <div className="relative hidden min-h-[390px] flex-1 md:block lg:min-h-[460px]">
              <svg
                ref={svgRef}
                viewBox="0 0 400 500"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <pattern id="pongScanlines" x="0" y="0" width="400" height="4" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="1.5" x2="400" y2="1.5" stroke="rgba(255,255,255,0.018)" strokeWidth="0.7" />
                  </pattern>
                  <filter id="pongGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <rect x="0" y="0" width="400" height="500" fill="url(#pongScanlines)" />

                {GRID_H.map((y) => (
                  <line key={`gh${y}`} x1={0} y1={y} x2={400} y2={y} stroke="rgba(255,255,255,0.055)" strokeWidth={0.5} />
                ))}
                {GRID_V.map((x) => (
                  <line key={`gv${x}`} x1={x} y1={0} x2={x} y2={500} stroke="rgba(255,255,255,0.055)" strokeWidth={0.5} />
                ))}

                <rect x={54} y={55} width={292} height={350} fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.36)" strokeWidth={2} />
                <line x1={200} y1={55} x2={200} y2={405} stroke="rgba(255,255,255,0.22)" strokeWidth={1.3} strokeDasharray="10 14" />

                <text x={120} y={118} fill="rgba(255,255,255,0.86)" fontSize={64} fontFamily="monospace" fontWeight="bold">0</text>
                <text x={238} y={118} fill="rgba(255,255,255,0.86)" fontSize={64} fontFamily="monospace" fontWeight="bold">7</text>

                <text x={76} y={44} fill="rgba(255,10,168,0.85)" fontSize={9} fontFamily="monospace" letterSpacing={2}>LONDRINA SERVE</text>
                <text x={238} y={44} fill="rgba(0,234,255,0.72)" fontSize={9} fontFamily="monospace" letterSpacing={2}>OPEN FORMAT</text>

                <rect
                  data-pong-left
                  x={68}
                  y={212}
                  width={10}
                  height={78}
                  fill="var(--lxndr-pink)"
                  filter="url(#pongGlow)"
                />
                <circle
                  data-pong-left-impact
                  cx={86}
                  cy={126}
                  r={5}
                  fill="none"
                  stroke="var(--lxndr-pink)"
                  strokeWidth={2}
                  opacity={0}
                  filter="url(#pongGlow)"
                />
                <rect
                  data-pong-right
                  x={322}
                  y={184}
                  width={10}
                  height={78}
                  fill="var(--lxndr-cyan)"
                  filter="url(#pongGlow)"
                />
                <circle
                  data-pong-right-impact
                  cx={314}
                  cy={84}
                  r={5}
                  fill="none"
                  stroke="var(--lxndr-cyan)"
                  strokeWidth={2}
                  opacity={0}
                  filter="url(#pongGlow)"
                />

                <polyline
                  data-pong-trail
                  points="72,128 330,78 246,236 70,338 330,392 205,252"
                  fill="none"
                  stroke="rgba(255,10,168,0.32)"
                  strokeWidth={2}
                  strokeDasharray="6 10"
                />

                <circle data-pong-ball cx={205} cy={252} r={8} fill="white" filter="url(#pongGlow)" />
                <circle cx={205} cy={252} r={20} fill="none" stroke="rgba(255,255,255,0.06)" />

                <g data-pong-blink>
                  <rect x={96} y={430} width={32} height={5} fill="var(--lxndr-pink)" />
                  <rect x={136} y={430} width={20} height={5} fill="rgba(255,255,255,0.35)" />
                  <rect x={164} y={430} width={52} height={5} fill="var(--lxndr-cyan)" />
                  <rect x={224} y={430} width={18} height={5} fill="rgba(255,255,255,0.35)" />
                  <rect x={250} y={430} width={54} height={5} fill="var(--lxndr-green)" />
                </g>

                <text x={70} y={456} fill="rgba(255,255,255,0.34)" fontSize={8} fontFamily="monospace" letterSpacing={2}>INSERT GROOVE</text>
                <text x={242} y={456} fill="rgba(255,255,255,0.26)" fontSize={8} fontFamily="monospace" letterSpacing={2}>PRESS START</text>

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

                <text x={10} y={494} fill="rgba(255,255,255,0.28)" fontSize={8} fontFamily="monospace" letterSpacing={1.5}>LONDRINA — BRASIL</text>
                <text x={300} y={494} fill="rgba(255,255,255,0.18)" fontSize={7} fontFamily="monospace">pong.signal</text>
              </svg>
            </div>

            <div className="hidden items-end justify-between border-t border-white/8 px-6 py-4 md:flex">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-[var(--lxndr-pink)]/60">Player 01</p>
                <p className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-white/40">LONDRINA SERVE</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-[var(--lxndr-cyan)]/55">Player 02</p>
                <p className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-white/40">CENA RESPONDE</p>
              </div>
            </div>
          </div>

          <div className="order-1 flex flex-col justify-center gap-6 px-6 py-10 md:gap-7 md:px-12 md:py-14 lg:order-2">

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
                className="font-bebas text-[clamp(3.25rem,17vw,8rem)] leading-none tracking-tight text-white"
              >
                {t("origin")}
              </h2>
              <p
                data-anim
                data-scene-title
                className="mt-3 font-mono text-xs uppercase tracking-[0.24em] text-[var(--lxndr-cyan)] md:text-base md:tracking-[0.28em]"
              >
                {t("between")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {SCENE_DATA.map(({ id, label, value }, index) => (
                <div
                  key={id}
                  data-anim
                  data-scene-chip
                  className={`${index > 1 ? "hidden sm:flex" : "flex"} flex-col border border-white/12 px-3 py-3 transition-colors duration-200 hover:border-white/28 sm:px-4`}
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
