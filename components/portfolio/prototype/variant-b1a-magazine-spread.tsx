// PROTOTYPE — Variant B1a (name kept for the ?variant=b1a route history;
// the layout itself has moved past the "magazine spread" framing it started
// from — no more folio numbers, § marks, or a boxed reading column pretending
// to be a printed page). Now reads as an engineering portfolio that happens
// to use editorial-scale type: a wide, full-screen composition (max-w-[1680px])
// with prose blocks that keep their own reading measure inside it, a
// code-editor-style line-number gutter on Experience rows instead of a
// magazine folio, and section labels using the site's own ABOUT_/PROJECTS_
// trailing-underscore convention instead of a § mark.
//
// Motion pass: a signal-lock boot beat in the hero (see VariantB1aHero) is
// the page's one authored focal moment. Everything else here is quiet
// supporting motion — an ambient spine ticker, a cursor-follow folio marker
// on Projects (desktop only), magnetic CTAs (hooks into the site-wide
// MagneticCursor), and one dramatic structural turn: Background + Contact
// become a single full-bleed black "insert page" with a toned-down Matrix
// rain as background texture. The spine and the chrome (top bar) both react
// to that same turn — the spine slides from the left gutter to the right
// one, the chrome inverts to light-on-dark — as the reader scrolls into it.

"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { devResumeData as d } from "./dev-resume-data"
import { FragmentReveal } from "./fragment-reveal"
import { SpineTicker } from "./spine-ticker"
import { ParallaxDrift } from "./parallax-drift"
import { SectionRule } from "./section-rule"
import { VariantB1aHero } from "./variant-b1a-hero"
import { KineticText } from "./kinetic-text"
import { LineIndex } from "./line-index"
import { ProjectFolioFollower } from "./project-folio-follower"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { ScrollProgress } from "@/components/shared/scroll-progress"
import { MatrixZone } from "@/components/shared/matrix-zone"

gsap.registerPlugin(ScrollTrigger)

// Chrome (top bar + spine) reads var(--chrome-*) with light-mode fallbacks
// baked into each declaration, so no wrapper needs to seed defaults — see
// the dark-zone effect below for where the inverted values get set.
const CHROME_TRANSITION = "transition-colors duration-300"

// Slides the spine from the left gutter to the right one (own width +
// symmetric 24px gutters, computed in pure CSS — no measurement needed).
const SPINE_FLIPPED_CLASS = "translate-x-[calc(100vw-100%-24px)]"

export function VariantB1aMagazineSpread() {
  const mainRef = useRef<HTMLElement>(null)
  const darkZoneRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const spineWrapRef = useRef<HTMLDivElement>(null)

  // One dramatic turn: invert the top bar + spine to light-on-dark AND slide
  // the spine from the left gutter to the right one while the reader is
  // inside the black insert page — two changes, one authored moment, driven
  // by the same trigger — reverting on the way back out.
  useEffect(() => {
    const main = mainRef.current
    const zone = darkZoneRef.current
    const spine = spineWrapRef.current
    if (!main || !zone) return

    const INVERTED_VARS: Record<string, string> = {
      "--chrome-ink": "#fff",
      "--chrome-ink-60": "rgba(255,255,255,0.6)",
      "--chrome-ink-25": "rgba(255,255,255,0.28)",
      "--chrome-line": "rgba(255,255,255,0.15)",
      "--chrome-underline": "rgba(255,255,255,0.25)",
    }

    const invert = () => {
      for (const [key, value] of Object.entries(INVERTED_VARS)) main.style.setProperty(key, value)
      spine?.classList.add(SPINE_FLIPPED_CLASS)
    }
    const revert = () => {
      for (const key of Object.keys(INVERTED_VARS)) main.style.removeProperty(key)
      spine?.classList.remove(SPINE_FLIPPED_CLASS)
    }

    const trigger = ScrollTrigger.create({
      trigger: zone,
      start: "top center",
      end: "bottom bottom",
      onEnter: invert,
      onEnterBack: invert,
      onLeave: revert,
      onLeaveBack: revert,
    })

    return () => trigger.kill()
  }, [])

  return (
    <main ref={mainRef} className="relative min-h-screen overflow-hidden bg-white text-black">
      <ScrollProgress />
      <div
        ref={spineWrapRef}
        className="pointer-events-none fixed left-3 top-1/2 z-10 hidden -translate-y-1/2 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block"
      >
        <ParallaxDrift intensity={-0.08}>
          <SpineTicker text={`${d.name.toUpperCase()} — PROFILE — VOL. 01 — `} />
        </ParallaxDrift>
      </div>

      <div className="mx-auto max-w-[1680px] px-6 md:px-10 lg:pl-16 xl:pr-16">
        {/* Top bar — links are the whole point of a recruiter visiting;
            full labels, always visible (no sm:hidden), not 2-letter codes. */}
        <div
          className={`flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b py-5 font-mono text-[11px] uppercase tracking-[0.2em] ${CHROME_TRANSITION}`}
          style={{
            borderColor: "var(--chrome-line, rgba(0,0,0,0.1))",
            color: "var(--chrome-ink-60, rgba(0,0,0,0.6))",
          }}
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-purple)] pulse-dot" aria-hidden="true" />
            <span
              className={`font-bold ${CHROME_TRANSITION}`}
              style={{ color: "var(--chrome-ink, #000)" }}
            >
              {d.name}
            </span>
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a
              href={`https://${d.github}`}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className={`underline underline-offset-4 hover:text-[var(--color-accent-purple)] hover:decoration-[var(--color-accent-purple)] ${CHROME_TRANSITION}`}
              style={{ textDecorationColor: "var(--chrome-underline, rgba(0,0,0,0.2))" }}
            >
              GitHub
            </a>
            <a
              href={`https://${d.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className={`underline underline-offset-4 hover:text-[var(--color-accent-purple)] hover:decoration-[var(--color-accent-purple)] ${CHROME_TRANSITION}`}
              style={{ textDecorationColor: "var(--chrome-underline, rgba(0,0,0,0.2))" }}
            >
              LinkedIn
            </a>
            <a
              href={d.cvHref}
              data-magnetic
              className={`underline underline-offset-4 hover:text-[var(--color-accent-purple)] hover:decoration-[var(--color-accent-purple)] ${CHROME_TRANSITION}`}
              style={{ textDecorationColor: "var(--chrome-underline, rgba(0,0,0,0.2))" }}
            >
              Résumé ↓
            </a>
          </div>
        </div>

        <VariantB1aHero />

        {/* Bio — same typographic identity as B1c's drop-cap intro (grid-based,
            not floated, so it doesn't fight line-wrap at large sizes): a
            proportional drop cap, regular-weight body copy, and the
            character beat as a quiet mono aside in the third column. */}
        <section className="relative pb-16 pt-0 md:pb-24">
          <SectionRule className="mb-16 md:mb-24" />
          <FragmentReveal className="grid grid-cols-1 gap-10 md:grid-cols-[64px_1fr_260px]" stagger={0.15}>
            <span className="font-bebas text-7xl leading-[0.7] text-black/90 md:text-8xl">
              {d.bioFragments[0][0]}
            </span>
            <p className="max-w-[65ch] text-[1.1rem] leading-relaxed text-black/85">
              {d.bioFragments[0].slice(1)}
              <span className="mt-4 block text-black/70">{d.bioFragments[1]}</span>
            </p>
            <p className="self-end font-mono text-sm leading-relaxed text-[var(--color-accent-purple)]">
              {d.bioFragments[2]}
            </p>
          </FragmentReveal>
        </section>

        {/* Experience */}
        <section className="pb-16 pt-0 md:pb-24">
          <SectionRule className="mb-16 md:mb-24" />
          <p className="mb-10 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">
            EXPERIENCE_
          </p>
          <div className="flex flex-col gap-16">
            {d.experience.map((job, i) => (
              <div key={job.org} className="grid grid-cols-1 gap-4 md:grid-cols-[40px_1fr]">
                <LineIndex index={i} />
                <div>
                  <SplitTextReveal
                    as="h3"
                    triggerOnScroll
                    className="font-bebas text-[clamp(2.2rem,5vw,4rem)] leading-[0.9] tracking-tight"
                  >
                    {job.org}
                  </SplitTextReveal>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-black/45">
                    {job.role} · {job.period} · {job.location}
                  </p>
                  <ul className="mt-4 flex max-w-xl flex-col gap-2">
                    {job.bullets.map((b) => (
                      <li key={b} className="font-space text-[0.95rem] leading-relaxed text-black/75">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects — alternating alignment, tag pills, running counter, and
            a cursor-follow folio marker on desktop that tracks whichever row
            is under the pointer (the static "0X /" labels keep doing this
            job on touch). */}
        <section className="relative pb-16 pt-0 md:pb-24">
          <SectionRule className="mb-16 md:mb-24" />
          <div className="mb-10 flex items-baseline justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">SELECTED WORK_</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/30">
              01 / {String(d.projects.length).padStart(2, "0")}
            </p>
          </div>
          <div ref={projectsRef} className="flex flex-col">
            {d.projects.map((p, i) => {
              const alignRight = i % 2 === 1
              return (
                <a
                  key={p.title}
                  href={p.url ?? undefined}
                  target={p.url ? "_blank" : undefined}
                  rel={p.url ? "noopener noreferrer" : undefined}
                  data-project-row
                  className={`group relative flex flex-col gap-3 border-b border-black/15 py-10 first:pt-0 last:border-b-0 ${alignRight ? "md:items-end md:text-right" : ""}`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent-purple)]">
                    {String(i + 1).padStart(2, "0")} / project
                  </span>
                  <h3 className="relative inline-block font-bebas text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.85] tracking-tight transition-colors group-hover:text-[var(--color-accent-purple)]">
                    {p.title}
                    <span className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 bg-[var(--color-accent-purple)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </h3>
                  <p className={`max-w-md font-space text-base leading-relaxed text-black/70 ${alignRight ? "md:ml-auto" : ""}`}>
                    {p.tagline}
                  </p>
                  <div className={`flex flex-wrap gap-2 ${alignRight ? "md:justify-end" : ""}`}>
                    {p.tech.map((t) => (
                      <span key={t} className="border border-black/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-black/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              )
            })}
          </div>
          <ProjectFolioFollower containerRef={projectsRef} />
        </section>
      </div>

      {/* Black insert page — Background/Stack + Contact, one paper-stock
          change for the rest of the read. A sibling of the mx-auto
          max-w-[1680px] column above (not nested inside it) so it spans the
          full width of `main` naturally — no viewport-unit breakout math, no
          scrollbar edge cases. MatrixZone runs in "ambient" mode so the rain
          is present as soon as the zone dominates the viewport, not gated
          behind a scroll-scrubbed reveal tuned for a much taller production
          zone; opacity/palette are toned down into a quiet texture, not the
          hacker-terminal effect the production /dev hero uses. */}
      <div ref={darkZoneRef} data-theme="dark" className="relative bg-black text-white">
        <MatrixZone canvasOpacity={0.16} canvasForceTheme="dark" mode="ambient">
          <div className="mx-auto max-w-[1680px] px-6 md:px-10 lg:pr-16 xl:pl-16">
              <SectionRule className="mb-0" tone="light" />
              <section className="grid grid-cols-1 gap-10 pb-16 pt-16 md:grid-cols-[1.4fr_1fr_1fr] md:pb-24 md:pt-24">
                <div>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">stack</p>
                  <p className="font-bebas text-3xl leading-[1.05] tracking-tight">
                    {d.skills.core.join(" · ")}
                  </p>
                  <p className="mt-3 max-w-xs font-mono text-[10px] leading-relaxed text-white/40">
                    also — {d.skills.also.join(", ")}
                  </p>
                </div>
                <div>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">education</p>
                  <p className="font-space text-sm leading-relaxed text-white/70">
                    {d.education.degree}<br />{d.education.org}<br />
                    <span className="text-white/40">{d.education.period}</span>
                  </p>
                </div>
                <div>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">languages</p>
                  {d.languages.map((l) => (
                    <p key={l.name} className="font-space text-sm leading-relaxed text-white/70">{l.name} — {l.level}</p>
                  ))}
                </div>
              </section>

              {/* Contact — signal → ask → trait, the trait beat echoing the bio's
                  purple aside on purpose (same job: this is character, not fact).
                  The ask is the typographic climax of the black page: outlined,
                  bigger than anything else in the spread. */}
              <SectionRule className="mb-0" tone="light" />
              <footer className="pb-20 pt-20 md:pb-28 md:pt-28">
                <div className="max-w-3xl">
                  <FragmentReveal>
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
                      {d.lookingForFragments[0]}
                    </p>
                  </FragmentReveal>
                  <KineticText
                    as="p"
                    variant="wave"
                    className="mt-3 font-bebas text-[clamp(2.6rem,7vw,5rem)] leading-[0.95] tracking-tight text-outlined"
                  >
                    {d.lookingForFragments[1]}
                  </KineticText>
                  <FragmentReveal className="mt-4">
                    <p className="max-w-md font-mono text-sm leading-relaxed text-[var(--color-accent-purple-light)]">
                      {d.lookingForFragments[2]}
                    </p>
                  </FragmentReveal>
                </div>
                <a
                  href={`mailto:${d.email}`}
                  data-magnetic
                  className="mt-8 inline-block border-b-2 border-white pb-1 font-mono text-sm font-bold uppercase tracking-widest hover:border-[var(--color-accent-purple-light)] hover:text-[var(--color-accent-purple-light)]"
                >
                  {d.email} →
                </a>

                {/* Repeat the links here too — this is where attention ends up
                    after reading the whole page, not just the top bar. */}
                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href={`https://${d.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic
                    className="border-2 border-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition-colors hover:bg-white hover:text-black"
                  >
                    GitHub
                  </a>
                  <a
                    href={`https://${d.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic
                    className="border-2 border-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition-colors hover:bg-white hover:text-black"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={d.cvHref}
                    data-magnetic
                    className="border-2 border-white bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-black transition-colors hover:border-[var(--color-accent-purple)] hover:bg-[var(--color-accent-purple)] hover:text-white"
                  >
                    Download Résumé ↓
                  </a>
                </div>
              </footer>
            </div>
        </MatrixZone>
      </div>
    </main>
  )
}
