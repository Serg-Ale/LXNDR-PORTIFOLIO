// PROTOTYPE — Variant B1: type-as-texture / Swiss poster.
// Same IA and content as the approved "B, brutalist refined" — this round
// is purely about visual execution ("falta alma" = falta trabalho
// tipográfico). Bet: dramatic scale contrast (company names huge, dates
// tiny), asymmetric negative space, oversized section markers instead of
// uniform block-after-block rhythm.

import { devResumeData as d } from "./dev-resume-data"
import { PhotoPlaceholder } from "./photo-placeholder"

export function VariantB1Poster() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Top rule — deliberately sparse */}
        <div className="flex items-center justify-between py-6 font-mono text-[10px] uppercase tracking-[0.3em] text-black/50">
          <span>{d.name}</span>
          <div className="hidden gap-6 sm:flex">
            <a href={`https://${d.github}`} className="hover:text-[var(--color-accent-purple)]">gh</a>
            <a href={`https://${d.linkedin}`} className="hover:text-[var(--color-accent-purple)]">in</a>
            <a href={d.cvHref} className="hover:text-[var(--color-accent-purple)]">cv</a>
          </div>
        </div>

        {/* Hero — name eats the page, everything else is small and pushed to margins */}
        <section className="relative py-10 md:py-16">
          <h1 className="font-bebas text-[clamp(4.5rem,15vw,13rem)] leading-[0.78] tracking-tight">
            {d.name.split(" ")[0]}
            <br />
            <span className="text-black/15">{d.name.split(" ")[1]}</span>
          </h1>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_220px] md:items-end">
            <p className="max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-black/55">
              {d.role}<br />{d.roleLine}<br />{d.location}
            </p>
            <p className="max-w-xs self-end font-space text-sm leading-relaxed text-black/75">
              {d.status}
            </p>
            <PhotoPlaceholder tone="neutral" className="aspect-[4/5] w-full max-w-[220px] justify-self-end border-2 border-black" />
          </div>
        </section>

        {/* Bio — huge, loose, breathing */}
        <section className="max-w-3xl py-16 md:py-24">
          <p className="font-space text-[clamp(1.4rem,2.6vw,2rem)] font-medium leading-[1.35] tracking-tight text-black/90">
            {d.bio}
          </p>
        </section>

        {/* Experience — a single oversized marker per role, not a repeated template */}
        <section className="border-t-2 border-black py-16 md:py-24">
          <p className="mb-10 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">
            § experience
          </p>
          <div className="flex flex-col gap-16">
            {d.experience.map((job, i) => (
              <div key={job.org} className="grid grid-cols-1 gap-4 md:grid-cols-[80px_1fr]">
                <span className="font-bebas text-6xl leading-none text-black/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bebas text-[clamp(2.2rem,5vw,4rem)] leading-[0.9] tracking-tight">
                    {job.org}
                  </h3>
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

        {/* Projects — one giant word per project as the real headline */}
        <section className="border-t-2 border-black py-16 md:py-24">
          <p className="mb-10 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">
            § selected work
          </p>
          <div className="flex flex-col">
            {d.projects.map((p) => (
              <a
                key={p.title}
                href={p.url ?? undefined}
                target={p.url ? "_blank" : undefined}
                rel={p.url ? "noopener noreferrer" : undefined}
                className="group grid grid-cols-1 items-baseline gap-2 border-b border-black/15 py-8 first:pt-0 last:border-b-0 md:grid-cols-[1fr_auto] md:gap-6"
              >
                <h3 className="font-bebas text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.85] tracking-tight transition-colors group-hover:text-[var(--color-accent-purple)]">
                  {p.title}
                </h3>
                <p className="max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-wider text-black/45 md:text-right">
                  {p.tagline}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Background — three unequal columns, not a symmetrical grid */}
        <section className="grid grid-cols-1 gap-10 border-t-2 border-black py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-24">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">stack</p>
            <p className="font-bebas text-3xl leading-[1.05] tracking-tight">
              {d.skills.core.join(" · ")}
            </p>
            <p className="mt-3 max-w-xs font-mono text-[10px] leading-relaxed text-black/40">
              also — {d.skills.also.join(", ")}
            </p>
          </div>
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">education</p>
            <p className="font-space text-sm leading-relaxed text-black/70">
              {d.education.degree}<br />{d.education.org}<br />
              <span className="text-black/40">{d.education.period}</span>
            </p>
          </div>
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">languages</p>
            {d.languages.map((l) => (
              <p key={l.name} className="font-space text-sm leading-relaxed text-black/70">{l.name} — {l.level}</p>
            ))}
          </div>
        </section>

        {/* Contact — the one moment the whole page gets loud */}
        <footer className="border-t-2 border-black py-20 md:py-28">
          <p className="max-w-3xl font-bebas text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.95] tracking-tight">
            {d.lookingFor}
          </p>
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
