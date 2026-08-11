// PROTOTYPE — Variant A: editorial / quiet.
// Bet: drop the brutalist DNA entirely. Long-form, single-column, generous
// whitespace, serif display type. Reads like a personal essay a recruiter
// would actually finish, not a landing page they'd skim past. Photo sits
// close to the bio, small and still — not a hero banner.

import { devResumeData as d } from "./dev-resume-data"
import { PhotoPlaceholder } from "./photo-placeholder"

export function VariantAEditorial() {
  return (
    <main className="min-h-screen bg-[#faf8f4] text-[#1c1c1a]">
      <div className="mx-auto max-w-[680px] px-6 py-20 md:px-0 md:py-32">
        {/* Masthead */}
        <div className="mb-16 flex items-baseline justify-between border-b border-[#1c1c1a]/15 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#1c1c1a]/50">
          <span>{d.name}</span>
          <span>{d.location}</span>
        </div>

        {/* Opening */}
        <header className="mb-14">
          <h1 className="font-serif text-[clamp(2.5rem,6vw,3.75rem)] font-normal leading-[1.05] tracking-tight text-[#1c1c1a]">
            {d.role}, mostly TypeScript.
          </h1>
          <p className="mt-5 max-w-[52ch] font-serif text-lg leading-relaxed text-[#1c1c1a]/70">
            {d.roleLine} — {d.remoteNote.toLowerCase()}.
          </p>
        </header>

        {/* Photo + bio, side by side on desktop */}
        <section className="mb-16 flex flex-col gap-8 sm:flex-row sm:items-start">
          <PhotoPlaceholder
            tone="warm"
            className="aspect-[4/5] w-full max-w-[180px] shrink-0 rounded-sm"
          />
          <p className="font-serif text-[1.15rem] leading-[1.75] text-[#1c1c1a]/90">
            {d.bio}
          </p>
        </section>

        {/* Right now */}
        <section className="mb-16">
          <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-[#8a5a2f]">
            Right now
          </h2>
          <ul className="flex flex-col gap-5">
            {d.now.map((line) => (
              <li key={line} className="border-l-2 border-[#8a5a2f]/30 pl-5 font-serif text-[1.05rem] leading-relaxed text-[#1c1c1a]/85">
                {line}
              </li>
            ))}
          </ul>
        </section>

        {/* Experience, told as continuous prose entries */}
        <section className="mb-16">
          <h2 className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-[#8a5a2f]">
            Where I've worked
          </h2>
          <div className="flex flex-col gap-10">
            {d.experience.map((job) => (
              <div key={job.org}>
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-serif text-xl font-semibold text-[#1c1c1a]">
                    {job.role} · {job.org}
                  </h3>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#1c1c1a]/45">
                    {job.period}
                  </span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {job.bullets.map((b) => (
                    <li key={b} className="font-serif text-[0.98rem] leading-relaxed text-[#1c1c1a]/75">
                      — {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Selected work, as a short annotated list — not trophy cards */}
        <section className="mb-16">
          <h2 className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-[#8a5a2f]">
            A few things I've built
          </h2>
          <div className="flex flex-col divide-y divide-[#1c1c1a]/10">
            {d.projects.map((p) => (
              <div key={p.title} className="py-5 first:pt-0">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="font-serif text-lg font-semibold text-[#1c1c1a]">{p.title}</h3>
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] uppercase tracking-wide text-[#8a5a2f] underline underline-offset-2">
                      visit
                    </a>
                  )}
                </div>
                <p className="mt-1 font-serif text-[0.98rem] italic text-[#1c1c1a]/65">{p.tagline}</p>
                <p className="mt-1.5 font-serif text-[0.95rem] leading-relaxed text-[#1c1c1a]/75">{p.detail}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-[#1c1c1a]/40">
                  {p.tech.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills, low-key — core weighted heavier than the rest */}
        <section className="mb-16">
          <h2 className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-[#8a5a2f]">
            Stack
          </h2>
          <p className="font-serif text-[1.05rem] leading-loose text-[#1c1c1a]">
            {d.skills.core.join("  ·  ")}
          </p>
          <p className="mt-2 font-serif text-[0.9rem] leading-loose text-[#1c1c1a]/50">
            also: {d.skills.also.join(", ")}
          </p>
        </section>

        {/* Background */}
        <section className="mb-20 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#8a5a2f]">
              Education
            </h2>
            <p className="font-serif text-[0.98rem] leading-relaxed text-[#1c1c1a]/80">
              {d.education.degree}
              <br />
              {d.education.org}
              <br />
              <span className="text-[#1c1c1a]/50">{d.education.period}</span>
            </p>
          </div>
          <div>
            <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#8a5a2f]">
              Languages
            </h2>
            {d.languages.map((l) => (
              <p key={l.name} className="font-serif text-[0.98rem] leading-relaxed text-[#1c1c1a]/80">
                {l.name} — {l.level}
              </p>
            ))}
          </div>
        </section>

        {/* Closing / contact */}
        <footer className="border-t border-[#1c1c1a]/15 pt-10">
          <p className="max-w-[52ch] font-serif text-lg leading-relaxed text-[#1c1c1a]/85">
            {d.lookingFor}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-[#8a5a2f]">
            <a href={`mailto:${d.email}`} className="underline underline-offset-2">{d.email}</a>
            <a href={`https://${d.github}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{d.github}</a>
            <a href={`https://${d.linkedin}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{d.linkedin}</a>
            <a href={d.cvHref} className="underline underline-offset-2">résumé (pdf)</a>
          </div>
        </footer>
      </div>
    </main>
  )
}
