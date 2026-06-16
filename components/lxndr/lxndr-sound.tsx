"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { LxndrMatrixRain } from "@/components/lxndr/lxndr-matrix-rain"
import { useLxndrScrollMotion } from "@/components/lxndr/use-lxndr-scroll-motion"

gsap.registerPlugin(ScrollTrigger)

const BLOCKS = [
  {
    id: "block-1",
    key: "block1",
    number: "01",
    neonVar: "--lxndr-pink",
    glowVar: "--lxndr-pink-glow",
    barHeights: [12, 28, 18, 44, 32, 16, 38, 22, 14, 34, 20, 10, 26, 18, 8, 30],
    freq: "40–160 Hz",
  },
  {
    id: "block-2",
    key: "block2",
    number: "02",
    neonVar: "--lxndr-cyan",
    glowVar: "--lxndr-cyan-glow",
    barHeights: [8, 20, 14, 36, 50, 28, 42, 18, 32, 12, 44, 24, 16, 38, 10, 22],
    freq: "160–1.2k Hz",
  },
  {
    id: "block-3",
    key: "block3",
    number: "03",
    neonVar: "--lxndr-green",
    glowVar: "--lxndr-green-glow",
    barHeights: [22, 10, 34, 20, 48, 30, 14, 42, 26, 8, 36, 18, 44, 12, 28, 16],
    freq: "1.2–8 kHz",
  },
  {
    id: "block-4",
    key: "block4",
    number: "04",
    neonVar: "--lxndr-steel",
    glowVar: "rgba(255,255,255,0.1)",
    barHeights: [16, 32, 10, 24, 40, 18, 30, 8, 36, 22, 14, 44, 20, 12, 28, 38],
    freq: "8–20 kHz",
  },
] as const

function createBarIds(id: string, heights: readonly number[]) {
  const seen = new Map<number, number>()

  return heights.map((height) => {
    const occurrence = (seen.get(height) ?? 0) + 1
    seen.set(height, occurrence)

    return {
      id: `${id}-${height}-${occurrence}`,
      height,
    }
  })
}

const BLOCK_BARS = BLOCKS.map((block) => ({
  id: block.id,
  bars: createBarIds(block.id, block.barHeights),
}))

export function LxndrSound() {
  const t = useTranslations("lxndr.sound")
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useLxndrScrollMotion(sectionRef)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(contentRef)

      if (prefersReducedMotion()) {
        gsap.set(sel("[data-sound-title]"), { clipPath: "inset(0 0% 0 0)", opacity: 1 })
        gsap.set(sel("[data-sound-eyebrow], [data-sound-intro], [data-sound-tags], [data-sound-block]"), {
          opacity: 1,
          y: 0,
        })
        return
      }

      gsap.set(sel("[data-sound-title]"), { clipPath: "inset(0 100% 0 0)" })
      gsap.set(sel("[data-sound-eyebrow]"), { opacity: 0, y: -10 })
      gsap.set(sel("[data-sound-intro]"), { opacity: 0, y: 20 })
      gsap.set(sel("[data-sound-block]"), { opacity: 0, y: 60 })
      gsap.set(sel("[data-sound-tags]"), { opacity: 0, y: 18 })

      const revealTrigger = {
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
      }

      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      })

      headerTimeline.to(sel("[data-sound-title]"), {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.9,
        ease: "power3.out",
      })
        .to(sel("[data-sound-eyebrow]"), {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        }, "-=0.55")
        .to(sel("[data-sound-intro]"), {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        }, "-=0.3")

      gsap.to(sel("[data-sound-block]"), {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: revealTrigger,
      })

      gsap.to(sel("[data-sound-tags]"), {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: revealTrigger,
      })
    }, contentRef)

    return () => ctx.revert()
  }, [])

  const resolvePanelColor = (variableName: string) => `var(${variableName})`

  const resolveGlowColor = (value: string) => (value.startsWith("--") ? `var(${value})` : value)

  return (
    <section
      ref={sectionRef}
      id="sound"
      className="relative min-h-screen overflow-hidden bg-[var(--lxndr-black)] px-6 py-28 md:px-12 md:py-36 lxndr-noise"
    >
      <div className="absolute inset-0 lxndr-grid-bg opacity-35" />
      <LxndrMatrixRain opacity={0.55} />

      <div
        ref={contentRef}
        data-lxndr-drift
        data-lxndr-drift-x="52"
        data-lxndr-drift-y="56"
        className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col gap-10"
      >
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <span className="h-px w-5 bg-[var(--lxndr-cyan)]" />
          <span className="font-mono text-xs uppercase tracking-[0.42em] text-[var(--lxndr-cyan)]">
            03 / o som
          </span>
          <div className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/30">sound.design</span>
        </div>

        <div
          data-lxndr-drift
          data-lxndr-drift-x="36"
          data-lxndr-drift-y="30"
          className="grid gap-10 border-b border-white/10 pb-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
        >
          <div className="flex flex-col gap-4">
            <p
              data-sound-eyebrow
              className="font-mono text-xs uppercase tracking-[0.45em] text-[var(--lxndr-steel)]"
            >
              sound design / frequency profile
            </p>

            <h2
              data-sound-title
              className="font-bebas text-[clamp(7rem,18vw,16rem)] leading-none tracking-tight text-[var(--lxndr-offwhite)] text-outlined"
            >
              {t("title")}
            </h2>
          </div>

          <p
            data-sound-intro
            className="border-l-2 border-[var(--lxndr-pink)] pl-5 font-space text-lg leading-relaxed text-white/70 md:text-xl"
          >
            {t("intro")}
          </p>
        </div>

        <div className="my-2 flex h-1 w-full overflow-hidden bg-white/10" aria-hidden="true">
          <div className="h-full flex-1 bg-[var(--lxndr-pink)]" />
          <div className="h-full flex-1 bg-[var(--lxndr-cyan)]" />
          <div className="h-full flex-1 bg-[var(--lxndr-green)]" />
          <div className="h-full flex-1 bg-white/20" />
        </div>

        <div
          data-lxndr-drift
          data-lxndr-drift-x="68"
          data-lxndr-drift-y="44"
          className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 md:grid-cols-4"
        >
          {BLOCKS.map((block) => {
            const panelColor = resolvePanelColor(block.neonVar)
            const glowColor = resolveGlowColor(block.glowVar)
            const blockBars = BLOCK_BARS.find((entry) => entry.id === block.id)?.bars ?? []

            return (
              <article
                key={block.id}
                data-sound-block
                className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden border-t-[3px] border-solid bg-[var(--lxndr-black)] p-6 transition-colors duration-300 md:min-h-[440px]"
                style={{
                  borderTopColor: panelColor,
                }}
              >
                <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                  <span>{block.number}</span>
                  <span>module</span>
                </div>

                <div
                  aria-hidden="true"
                  className="mt-10 flex h-20 items-end gap-[3px] opacity-30 transition-opacity duration-300 group-hover:opacity-60"
                >
                  {blockBars.map((bar) => (
                    <span
                      key={bar.id}
                      className="min-w-[2px] flex-1 max-w-[6px]"
                      style={{
                        height: `${bar.height}px`,
                        backgroundColor: panelColor,
                      }}
                    />
                  ))}
                </div>

                <div>
                  <h3 className="max-w-[9ch] font-bebas text-[clamp(2.4rem,4.5vw,3.8rem)] leading-[0.88] tracking-tight text-white">
                    {t(block.key)}
                  </h3>
                  <p
                    className="mt-3 font-mono text-[10px] uppercase tracking-[0.35em] opacity-60"
                    style={{ color: panelColor }}
                  >
                    {block.freq}
                  </p>
                </div>

                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 100%, ${glowColor}, transparent 70%)`,
                  }}
                />

                <div
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    backgroundColor: panelColor,
                    boxShadow: `0 0 12px ${panelColor}`,
                  }}
                />
              </article>
            )
          })}
        </div>

        <p
          data-sound-tags
          className="font-mono text-xs uppercase tracking-[0.45em] text-[var(--lxndr-steel)] md:text-sm"
        >
          {t("tags")}
        </p>
      </div>
    </section>
  )
}
