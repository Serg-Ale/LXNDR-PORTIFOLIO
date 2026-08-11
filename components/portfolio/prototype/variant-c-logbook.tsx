// PROTOTYPE — Variant C: logbook.
// Bet: neither a landing page nor an essay — a single reverse-chronological
// stream, like a commit log or a dev journal, mixing hard facts (what
// shipped, what stack) with a personal note per entry. Borrows the "signal/
// log" instinct from /saerix without its neon — one muted accent, dark
// ground, generous line-height so it still reads as human, not literal
// 80-column terminal cosplay.

import { devResumeData as d } from "./dev-resume-data"
import { PhotoPlaceholder } from "./photo-placeholder"

type Entry = {
  tag: string
  date: string
  headline: string
  body: string
  meta?: string
}

function buildLog(): Entry[] {
  const entries: Entry[] = []

  entries.push({
    tag: "now",
    date: "present",
    headline: d.now[0],
    body: d.now.slice(1).join(" "),
    meta: "aeon-audio · corta-ai · kaizen",
  })

  for (const job of d.experience) {
    entries.push({
      tag: "role",
      date: job.period,
      headline: `${job.role} — ${job.org}`,
      body: job.bullets.join(" "),
      meta: job.location,
    })
  }

  for (const p of d.projects) {
    entries.push({
      tag: "project",
      date: p.tech[0] ?? "",
      headline: p.title,
      body: `${p.tagline} ${p.detail}`,
      meta: p.tech.join(", "),
    })
  }

  entries.push({
    tag: "background",
    date: d.education.period,
    headline: d.education.degree,
    body: `${d.education.org}. Languages: ${d.languages.map((l) => `${l.name} (${l.level})`).join(", ")}.`,
  })

  return entries
}

export function VariantCLogbook() {
  const log = buildLog()

  return (
    <main className="min-h-screen bg-[#0d0d0c] text-[#e8e6df]">
      <div className="mx-auto max-w-[720px] px-6 py-16 md:px-8 md:py-24">
        {/* Status header */}
        <header className="mb-14 flex items-start gap-5 border-b border-[#e8e6df]/15 pb-8">
          <PhotoPlaceholder tone="mono" className="h-16 w-16 shrink-0 rounded-full" />
          <div>
            <p className="font-mono text-sm">
              <span className="text-[#8fd694]">{d.name.toLowerCase().replace(" ", ".")}</span>
              <span className="text-[#e8e6df]/40">@</span>
              <span className="text-[#e8e6df]/70">dev</span>
              <span className="text-[#e8e6df]/40">:~$</span>{" "}
              <span className="text-[#e8e6df]/85">status</span>
            </p>
            <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-[#e8e6df]/75">
              {d.role} · {d.roleLine.toLowerCase()}. {d.location}, {d.remoteNote.toLowerCase()}.
            </p>
          </div>
        </header>

        {/* Log stream */}
        <div className="flex flex-col gap-10">
          {log.map((entry) => (
            <article key={`${entry.tag}-${entry.headline}`} className="grid grid-cols-1 gap-2 sm:grid-cols-[110px_1fr]">
              <div className="flex flex-row items-baseline gap-2 sm:flex-col sm:items-start sm:gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8fd694]">
                  [{entry.tag}]
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#e8e6df]/40">
                  {entry.date}
                </span>
              </div>
              <div>
                <h2 className="font-mono text-[1.05rem] font-bold leading-snug text-[#e8e6df]">
                  {entry.headline}
                </h2>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[#e8e6df]/70">
                  {entry.body}
                </p>
                {entry.meta && (
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-[#e8e6df]/35">
                    {entry.meta}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Stack, as a cat'd file — core vs. also, not a flat dump */}
        <section className="mt-14 border-t border-[#e8e6df]/15 pt-10">
          <p className="font-mono text-sm text-[#e8e6df]/85">
            <span className="text-[#e8e6df]/40">$</span> cat stack.txt
          </p>
          <div className="mt-3 flex flex-col gap-1.5 border-l border-[#e8e6df]/15 pl-4">
            <p className="font-mono text-[0.9rem] leading-relaxed text-[#e8e6df]/90">
              <span className="text-[#8fd694]">core</span>
              <span className="text-[#e8e6df]/30">: </span>
              {d.skills.core.join(", ")}
            </p>
            <p className="font-mono text-[0.85rem] leading-relaxed text-[#e8e6df]/45">
              <span className="text-[#e8e6df]/40">also</span>
              <span className="text-[#e8e6df]/25">: </span>
              {d.skills.also.join(", ")}
            </p>
          </div>
        </section>

        {/* Closing status + contact, as flags */}
        <footer className="mt-14 border-t border-[#e8e6df]/15 pt-10">
          <p className="font-mono text-sm text-[#e8e6df]/85">
            <span className="text-[#e8e6df]/40">$</span> status --looking-for
          </p>
          <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-[#e8e6df]/80">
            {d.lookingFor}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px]">
            <a href={`mailto:${d.email}`} className="text-[#8fd694] hover:underline">--email {d.email}</a>
            <a href={`https://${d.github}`} target="_blank" rel="noopener noreferrer" className="text-[#8fd694] hover:underline">--github</a>
            <a href={`https://${d.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-[#8fd694] hover:underline">--linkedin</a>
            <a href={d.cvHref} className="text-[#8fd694] hover:underline">--resume</a>
          </div>
        </footer>
      </div>
    </main>
  )
}
