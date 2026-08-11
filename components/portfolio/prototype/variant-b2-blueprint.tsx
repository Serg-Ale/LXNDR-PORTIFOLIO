// PROTOTYPE — Variant B2: architectural / blueprint.
// Same IA and content as "B, brutalist refined" — visual execution round.
// Bet: treat the page like a technical drawing — visible grid lines, section
// numbers as structural anchors (§ 01, § 02…), a vertical running label down
// the side, mono annotations at multiple scales. Borrows the *instinct* of
// the /saerix vertical label without the neon.

import { devResumeData as d } from "./dev-resume-data"
import { PhotoPlaceholder } from "./photo-placeholder"

function SectionMark({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="font-mono text-[11px] text-black/30">§{n}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-black/50">{label}</span>
      <div className="h-px flex-1 bg-black/15" />
    </div>
  )
}

export function VariantB2Blueprint() {
  return (
    <main className="relative min-h-screen bg-white text-black">
      {/* Running vertical label, like a drawing's title block */}
      <div
        className="pointer-events-none fixed right-4 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.5em] text-black/25 lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        {d.name} — dossier / rev.02
      </div>

      <div className="mx-auto max-w-5xl border-x border-black/10 px-6 md:px-10">
        {/* Header block */}
        <div className="grid grid-cols-1 gap-6 border-b border-black py-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40">§00 — index</p>
            <h1 className="mt-2 font-bebas text-[clamp(3rem,8vw,6rem)] leading-[0.85] tracking-tight">
              {d.name}
            </h1>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-black/55">
              {d.role} / {d.roleLine} / {d.location}
            </p>
          </div>
          <div className="flex gap-4 self-end font-mono text-[10px] uppercase tracking-widest text-black/45">
            <a href={`https://${d.github}`} className="hover:text-[var(--color-accent-purple)]">gh↗</a>
            <a href={`https://${d.linkedin}`} className="hover:text-[var(--color-accent-purple)]">in↗</a>
            <a href={d.cvHref} className="hover:text-[var(--color-accent-purple)]">cv↓</a>
          </div>
        </div>

        {/* Bio + photo, drawn as two bordered panels */}
        <div className="grid grid-cols-1 border-b border-black md:grid-cols-[220px_1fr]">
          <PhotoPlaceholder tone="neutral" className="aspect-square w-full border-b border-black/10 md:aspect-auto md:h-full md:border-b-0 md:border-r" />
          <div className="p-6 md:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40">§01 — profile</p>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-black/85">{d.bio}</p>
            <p className="mt-4 max-w-xl font-mono text-xs leading-relaxed text-black/50">
              status: {d.status}
            </p>
          </div>
        </div>

        {/* Experience as a spec table */}
        <div className="border-b border-black py-10">
          <SectionMark n="02" label="experience" />
          <div className="flex flex-col divide-y divide-black/10 border border-black/10">
            {d.experience.map((job) => (
              <div key={job.org} className="grid grid-cols-1 gap-4 p-5 md:grid-cols-[160px_140px_1fr]">
                <h3 className="font-bebas text-2xl leading-none">{job.org}</h3>
                <p className="font-mono text-[10px] uppercase leading-relaxed tracking-wider text-black/45">
                  {job.role}<br />{job.period}
                </p>
                <ul className="flex flex-col gap-1">
                  {job.bullets.map((b) => (
                    <li key={b} className="font-mono text-[0.8rem] leading-relaxed text-black/70">
                      &gt; {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Projects as a schematic grid with coordinates */}
        <div className="border-b border-black py-10">
          <SectionMark n="03" label="selected work" />
          <div className="grid grid-cols-1 border border-black/10 md:grid-cols-3">
            {d.projects.map((p, i) => (
              <div key={p.title} className="border-black/10 p-6 [&:not(:last-child)]:border-b [&:not(:last-child)]:md:border-b-0 [&:not(:last-child)]:md:border-r">
                <p className="font-mono text-[10px] text-black/30">[{String(i + 1).padStart(2, "0")}]</p>
                <h3 className="mt-2 font-bebas text-2xl leading-none">{p.title}</h3>
                <p className="mt-2 text-sm text-black/70">{p.tagline}</p>
                <p className="mt-3 font-mono text-[9px] uppercase tracking-wider text-black/35">
                  {p.tech.join(" · ")}
                </p>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-mono text-[10px] uppercase tracking-widest text-[var(--color-accent-purple)] underline underline-offset-2">
                    open ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Background — annotated spec sheet */}
        <div className="border-b border-black py-10">
          <SectionMark n="04" label="background" />
          <div className="grid grid-cols-1 gap-px border border-black/10 bg-black/10 md:grid-cols-3">
            <div className="bg-white p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-black/35">stack.core</p>
              <p className="mt-2 font-bold leading-relaxed">{d.skills.core.join(", ")}</p>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-black/35">stack.also</p>
              <p className="mt-1 text-xs leading-relaxed text-black/50">{d.skills.also.join(", ")}</p>
            </div>
            <div className="bg-white p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-black/35">education</p>
              <p className="mt-2 text-sm leading-relaxed text-black/75">
                {d.education.degree}<br />{d.education.org}<br />{d.education.period}
              </p>
            </div>
            <div className="bg-white p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-black/35">languages</p>
              {d.languages.map((l) => (
                <p key={l.name} className="mt-2 text-sm leading-relaxed text-black/75">{l.name} — {l.level}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Contact — closes the drawing */}
        <footer className="py-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/40">§05 — contact</p>
          <p className="mt-4 max-w-2xl font-bebas text-[clamp(1.8rem,4vw,3rem)] leading-tight">
            {d.lookingFor}
          </p>
          <a
            href={`mailto:${d.email}`}
            className="mt-6 inline-flex items-center gap-2 border border-black px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white"
          >
            {d.email}
          </a>
        </footer>
      </div>
    </main>
  )
}
