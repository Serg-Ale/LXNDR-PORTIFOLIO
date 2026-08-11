// PROTOTYPE — Variant B1c: calm editorial.
// The restrained sibling of B1a/B1b — same fixes (broken bio/closing, dark
// numbers, richer projects), but the "unusual placement" stays to a single
// device (a two-column drop-cap intro + a spine label) instead of stacking
// several. For comparing "how much art direction is too much."

import { devResumeData as d } from "./dev-resume-data"
import { PhotoPlaceholder } from "./photo-placeholder"
import { FragmentReveal } from "./fragment-reveal"
import { VerticalLabel } from "./vertical-label"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"

export function VariantB1cEditorialCalm() {
  return (
    <main className="relative min-h-screen bg-white text-black">
      <VerticalLabel
        text="SPEC — SOFTWARE ENGINEER — 2026"
        className="pointer-events-none fixed left-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block"
      />

      <div className="mx-auto max-w-5xl px-6 lg:pl-14 md:px-10">
        <div className="flex items-center justify-between py-6 font-mono text-[10px] uppercase tracking-[0.3em] text-black/50">
          <span>{d.name}</span>
          <div className="hidden gap-6 sm:flex">
            <a href={`https://${d.github}`} className="hover:text-[var(--color-accent-purple)]">gh</a>
            <a href={`https://${d.linkedin}`} className="hover:text-[var(--color-accent-purple)]">in</a>
            <a href={d.cvHref} className="hover:text-[var(--color-accent-purple)]">cv</a>
          </div>
        </div>

        {/* Hero */}
        <section className="py-10 md:py-16">
          <SplitTextReveal as="h1" className="font-bebas text-[clamp(4rem,13vw,11rem)] leading-[0.8] tracking-tight">
            {d.name}
          </SplitTextReveal>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_200px] md:items-end">
            <p className="max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-black/55">
              {d.role}<br />{d.roleLine}<br />{d.location}
            </p>
            <p className="max-w-xs self-end font-space text-sm leading-relaxed text-black/75">{d.status}</p>
            <PhotoPlaceholder tone="neutral" className="aspect-[4/5] w-full max-w-[200px] justify-self-end border-2 border-black" />
          </div>
        </section>

        {/* Bio — a single, clean drop-cap intro column + a quiet second column */}
        <section className="border-t-2 border-black py-16 md:py-20">
          <FragmentReveal className="grid grid-cols-1 gap-10 md:grid-cols-[64px_1fr_260px]" stagger={0.15}>
            <span className="font-bebas text-7xl leading-[0.7] text-black/90 md:text-8xl">
              {d.bioFragments[0][0]}
            </span>
            <p className="text-[1.1rem] leading-relaxed text-black/85">
              {d.bioFragments[0].slice(1)}
              <span className="mt-4 block text-black/70">{d.bioFragments[1]}</span>
            </p>
            <p className="self-end font-mono text-sm leading-relaxed text-black/45">
              {d.bioFragments[2]}
            </p>
          </FragmentReveal>
        </section>

        {/* Experience — solid numbers, no low-contrast gray */}
        <section className="border-t-2 border-black py-16 md:py-20">
          <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">Experience</p>
          <div className="flex flex-col">
            {d.experience.map((job, i) => (
              <div key={job.org} className="grid grid-cols-1 gap-3 border-b border-black/15 py-8 last:border-b-0 md:grid-cols-[64px_180px_1fr]">
                <span className="font-bebas text-3xl leading-none text-black">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bebas text-2xl leading-none">{job.org}</h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-black/50">
                    {job.role}<br />{job.period}
                  </p>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {job.bullets.map((b) => (
                    <li key={b} className="text-sm leading-relaxed text-black/75">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects — clean rows, generous type, thin rules, tag pills */}
        <section className="border-t-2 border-black py-16 md:py-20">
          <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">Selected work</p>
          <div className="flex flex-col divide-y divide-black/15">
            {d.projects.map((p, i) => (
              <a
                key={p.title}
                href={p.url ?? undefined}
                target={p.url ? "_blank" : undefined}
                rel={p.url ? "noopener noreferrer" : undefined}
                className="group grid grid-cols-1 gap-3 py-8 first:pt-0 last:pb-0 md:grid-cols-[64px_1fr_auto] md:items-center"
              >
                <span className="font-bebas text-3xl leading-none text-black/70">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-bebas text-3xl leading-none transition-colors group-hover:text-[var(--color-accent-purple)]">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-black/70">{p.tagline}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="border border-black/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-black/50">{t}</span>
                    ))}
                  </div>
                </div>
                {p.url && (
                  <span className="font-mono text-xs uppercase tracking-wider text-black/40 group-hover:text-[var(--color-accent-purple)] md:justify-self-end">view →</span>
                )}
              </a>
            ))}
          </div>
        </section>

        {/* Background */}
        <section className="grid grid-cols-1 gap-10 border-t-2 border-black py-16 md:grid-cols-3 md:py-20">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">Stack</p>
            <p className="font-bold leading-relaxed">{d.skills.core.join(" · ")}</p>
            <p className="mt-2 text-xs leading-relaxed text-black/40">{d.skills.also.join(", ")}</p>
          </div>
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">Education</p>
            <p className="text-sm leading-relaxed text-black/70">{d.education.degree} — {d.education.org} ({d.education.period})</p>
          </div>
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">Languages</p>
            {d.languages.map((l) => (
              <p key={l.name} className="text-sm leading-relaxed text-black/70">{l.name} — {l.level}</p>
            ))}
          </div>
        </section>

        {/* Contact — fragments, no scatter, just scale steps */}
        <footer className="border-t-2 border-black py-16 md:py-20">
          <FragmentReveal stagger={0.15}>
            <p className="font-space text-base text-black/50">{d.lookingForFragments[0]}</p>
            <p className="mt-2 font-bebas text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-tight">
              {d.lookingForFragments[1]}
            </p>
            <p className="mt-3 max-w-xl font-space text-base leading-relaxed text-black/70">
              {d.lookingForFragments[2]}
            </p>
          </FragmentReveal>
          <a
            href={`mailto:${d.email}`}
            className="mt-8 inline-block border-b-2 border-black pb-1 font-mono text-sm font-bold uppercase tracking-widest hover:border-[var(--color-accent-purple)] hover:text-[var(--color-accent-purple)]"
          >
            {d.email} →
          </a>
        </footer>
      </div>
    </main>
  )
}
