// PROTOTYPE — Variant B3: kinetic scale.
// Same IA and content as "B, brutalist refined" — visual execution round.
// Bet: type size steps down through the page like an attention funnel
// (huge → dense), alternating alignment breaks the block-after-block
// rhythm, single oversized words punctuate transitions instead of
// citation-in-a-frame.

import { devResumeData as d } from "./dev-resume-data"
import { PhotoPlaceholder } from "./photo-placeholder"

function Punctuation({ word }: { word: string }) {
  return (
    <p
      aria-hidden="true"
      className="select-none font-bebas text-[clamp(3rem,11vw,8rem)] leading-none tracking-tight text-black/[0.06]"
    >
      {word}
    </p>
  )
}

export function VariantB3Kinetic() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-black">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="flex items-center justify-between py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-black/50">
          <span className="font-bold text-black">{d.name}</span>
          <div className="hidden gap-6 sm:flex">
            <a href={`https://${d.github}`} className="hover:text-[var(--color-accent-purple)]">github</a>
            <a href={`https://${d.linkedin}`} className="hover:text-[var(--color-accent-purple)]">linkedin</a>
            <a href={d.cvHref} className="hover:text-[var(--color-accent-purple)]">résumé</a>
          </div>
        </div>

        {/* Hero — the biggest type on the page, right-weighted */}
        <section className="py-10 text-right md:py-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-black/45">
            {d.location} — {d.remoteNote}
          </p>
          <h1 className="font-bebas text-[clamp(3.8rem,12vw,9rem)] leading-[0.85] tracking-tight">
            {d.role}
          </h1>
          <p className="mt-2 font-mono text-sm font-bold uppercase tracking-wider text-black/60 md:text-base">
            {d.roleLine}
          </p>
        </section>

        {/* Bio + photo — left-weighted, breaking the right alignment above */}
        <section className="grid grid-cols-1 gap-8 border-t-2 border-black py-14 md:grid-cols-[220px_1fr] md:items-start">
          <PhotoPlaceholder tone="neutral" className="aspect-[4/5] w-full border-2 border-black" />
          <div>
            <p className="text-[1.15rem] leading-relaxed text-black/85">{d.bio}</p>
            <p className="mt-4 max-w-lg font-mono text-xs leading-relaxed text-black/50">{d.status}</p>
          </div>
        </section>

        <Punctuation word="Shipped." />

        {/* Experience — size steps down per row, denser as it goes */}
        <section className="border-t-2 border-black py-4">
          <div className="flex flex-col">
            {d.experience.map((job, i) => {
              const scale = ["text-[clamp(2.2rem,5vw,3.8rem)]", "text-[clamp(1.8rem,4vw,3rem)]", "text-[clamp(1.4rem,3vw,2.2rem)]"][i] ?? "text-2xl"
              return (
                <div key={job.org} className="border-b border-black/10 py-8 last:border-b-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className={`font-bebas leading-[0.9] tracking-tight ${scale}`}>{job.org}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-black/40">
                      {job.role} · {job.period}
                    </span>
                  </div>
                  <ul className="mt-3 flex max-w-2xl flex-col gap-1.5">
                    {job.bullets.map((b) => (
                      <li key={b} className="text-sm leading-relaxed text-black/70">{b}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        <Punctuation word="Owned it." />

        {/* Projects — dense, left-aligned, quiet type — contrast to the hero */}
        <section className="border-t-2 border-black py-14">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-black/50">Selected work</h2>
          <div className="flex flex-col divide-y divide-black/10">
            {d.projects.map((p) => (
              <div key={p.title} className="flex flex-col gap-1 py-5 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div>
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="text-sm text-black/65">{p.tagline}</p>
                </div>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="shrink-0 font-mono text-xs uppercase tracking-wider text-[var(--color-accent-purple)] underline underline-offset-2">
                    view →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Background — smallest, quietest block on the page */}
        <section className="grid grid-cols-1 gap-6 border-t-2 border-black py-10 text-xs sm:grid-cols-3">
          <div>
            <p className="mb-2 font-mono uppercase tracking-[0.3em] text-black/40">Stack</p>
            <p className="font-bold leading-relaxed text-black/85">{d.skills.core.join(" · ")}</p>
            <p className="mt-1 leading-relaxed text-black/40">{d.skills.also.join(", ")}</p>
          </div>
          <div>
            <p className="mb-2 font-mono uppercase tracking-[0.3em] text-black/40">Education</p>
            <p className="leading-relaxed text-black/70">{d.education.degree} — {d.education.org}</p>
          </div>
          <div>
            <p className="mb-2 font-mono uppercase tracking-[0.3em] text-black/40">Languages</p>
            {d.languages.map((l) => (
              <p key={l.name} className="leading-relaxed text-black/70">{l.name} — {l.level}</p>
            ))}
          </div>
        </section>

        {/* Contact — the funnel resolves back to large, centered, final */}
        <footer className="border-t-2 border-black py-16 text-center">
          <p className="mx-auto max-w-2xl font-bebas text-[clamp(2rem,5vw,3.75rem)] leading-tight tracking-tight">
            {d.lookingFor}
          </p>
          <a
            href={`mailto:${d.email}`}
            className="mt-6 inline-block border-2 border-black px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white"
          >
            {d.email}
          </a>
        </footer>
      </div>
    </main>
  )
}
