// PROTOTYPE — Variant B: brutalist, refined.
// Bet: keep the type-driven, high-contrast DNA (Bebas Neue, mono labels,
// hard edges) but drop every pitch-deck tic — no citation-in-a-frame, no
// tilting cards, no "vision" slide, no black-slab-after-black-slab rhythm.
// One accent color used sparingly, not as a wash. Mostly white ground.

import { devResumeData as d } from "./dev-resume-data"
import { PhotoPlaceholder } from "./photo-placeholder"

export function VariantBBrutalist() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        {/* Top rule */}
        <div className="flex items-center justify-between border-b-2 border-black py-4 font-mono text-[11px] uppercase tracking-[0.2em]">
          <span className="font-bold">{d.name}</span>
          <div className="hidden gap-6 sm:flex">
            <a href={`https://${d.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-purple)]">github</a>
            <a href={`https://${d.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-purple)]">linkedin</a>
            <a href={d.cvHref} className="hover:text-[var(--color-accent-purple)]">résumé</a>
          </div>
        </div>

        {/* Hero */}
        <section className="grid grid-cols-1 gap-8 py-16 md:grid-cols-[1fr_220px] md:items-end md:py-24">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-black/50">
              {d.location} — {d.remoteNote}
            </p>
            <h1 className="font-bebas text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.9] tracking-tight">
              {d.name}
            </h1>
            <p className="mt-2 max-w-2xl font-mono text-base font-bold uppercase tracking-wider text-black/70 md:text-lg">
              {d.role} — {d.roleLine}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/60">
              {d.status}
            </p>
          </div>
          <PhotoPlaceholder tone="neutral" className="aspect-[4/5] w-full border-2 border-black" />
        </section>

        {/* Bio — one paragraph, no manifesto framing */}
        <section className="max-w-3xl border-t-2 border-black py-10">
          <p className="text-lg leading-relaxed text-black/85">{d.bio}</p>
        </section>

        {/* Experience — carries the full "what I'm doing" detail once.
            The hero status line above orients; this doesn't repeat it. */}
        <section className="border-t-2 border-black py-10">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-black/50">
            Experience
          </h2>
          <div className="flex flex-col">
            {d.experience.map((job) => (
              <div key={job.org} className="grid grid-cols-1 gap-3 border-b border-black/15 py-6 last:border-b-0 md:grid-cols-[220px_1fr]">
                <div>
                  <h3 className="font-bebas text-2xl leading-none">{job.org}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-black/50">
                    {job.role} · {job.period}
                  </p>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {job.bullets.map((b) => (
                    <li key={b} className="text-sm leading-relaxed text-black/75">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects — flat list, number tag, single hover cue */}
        <section className="border-t-2 border-black py-10">
          <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-black/50">
            Selected work
          </h2>
          <div className="grid grid-cols-1 gap-px border border-black bg-black md:grid-cols-3">
            {d.projects.map((p, i) => (
              <div key={p.title} className="flex flex-col gap-3 bg-white p-6">
                <span className="font-mono text-xs text-black/40">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-bebas text-2xl leading-none">{p.title}</h3>
                <p className="text-sm text-black/70">{p.tagline}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-black/40">
                  {p.tech.slice(0, 3).join(" / ")}
                </p>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-2 font-mono text-xs font-bold uppercase tracking-wider underline underline-offset-4 hover:text-[var(--color-accent-purple)]"
                  >
                    view →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Background — compact, one row */}
        <section className="grid grid-cols-1 gap-8 border-t-2 border-black py-10 md:grid-cols-3">
          <div>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-black/50">Stack</h2>
            <p className="text-base font-bold leading-relaxed text-black">
              {d.skills.core.join(" · ")}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-black/45">
              also: {d.skills.also.join(", ")}
            </p>
          </div>
          <div>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-black/50">Education</h2>
            <p className="text-sm leading-relaxed text-black/75">
              {d.education.degree} — {d.education.org} ({d.education.period})
            </p>
          </div>
          <div>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-black/50">Languages</h2>
            {d.languages.map((l) => (
              <p key={l.name} className="text-sm leading-relaxed text-black/75">{l.name} — {l.level}</p>
            ))}
          </div>
        </section>

        {/* Contact */}
        <footer className="border-t-2 border-black py-14">
          <p className="max-w-2xl font-bebas text-[clamp(1.8rem,4vw,3rem)] leading-tight">
            {d.lookingFor}
          </p>
          <a
            href={`mailto:${d.email}`}
            className="mt-6 inline-block border-2 border-black bg-black px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[var(--color-accent-purple)] hover:border-[var(--color-accent-purple)]"
          >
            {d.email}
          </a>
        </footer>
      </div>
    </main>
  )
}
