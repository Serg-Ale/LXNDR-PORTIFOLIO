// PROTOTYPE — Variant B1b: fragmented collage.
// The boldest reading of "text in unusual places" — indentation ladders,
// a vertical mid-page label, an oversized circled index overlapping the
// experience copy, projects as a horizontal filmstrip. Still fixes the
// same two complaints as the other B1 evolutions: paragraph blocks broken
// into beats, and dark-enough numbers.

import { devResumeData as d } from "./dev-resume-data"
import { PhotoPlaceholder } from "./photo-placeholder"
import { FragmentReveal } from "./fragment-reveal"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"

export function VariantB1bCollage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex items-center justify-between py-6 font-mono text-[10px] uppercase tracking-[0.3em] text-black/50">
          <span>{d.name}</span>
          <div className="hidden gap-6 sm:flex">
            <a href={`https://${d.github}`} className="hover:text-[var(--color-accent-purple)]">gh</a>
            <a href={`https://${d.linkedin}`} className="hover:text-[var(--color-accent-purple)]">in</a>
            <a href={d.cvHref} className="hover:text-[var(--color-accent-purple)]">cv</a>
          </div>
        </div>

        {/* Hero */}
        <section className="relative py-10 md:py-16">
          <SplitTextReveal as="h1" className="font-bebas text-[clamp(4.5rem,15vw,13rem)] leading-[0.78] tracking-tight">
            {d.name.split(" ")[0]}
          </SplitTextReveal>
          <p className="font-bebas text-[clamp(4.5rem,15vw,13rem)] leading-[0.78] tracking-tight text-black/15">
            {d.name.split(" ")[1]}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto_220px] md:items-end">
            <p className="max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-black/55">
              {d.role}<br />{d.roleLine}<br />{d.location}
            </p>
            <p className="max-w-xs self-end font-space text-sm leading-relaxed text-black/75">{d.status}</p>
            <PhotoPlaceholder tone="neutral" className="aspect-[4/5] w-full max-w-[220px] justify-self-end border-2 border-black" />
          </div>
        </section>

        {/* Bio — indentation ladder, one fragment set vertical */}
        <section className="relative border-t-2 border-black py-16 md:py-24">
          <FragmentReveal stagger={0.15}>
            <p className="max-w-xl font-space text-[clamp(1.5rem,2.8vw,2.1rem)] font-bold leading-[1.25] tracking-tight">
              {d.bioFragments[0]}
            </p>
            <p className="mt-6 max-w-lg font-space text-[1.05rem] leading-relaxed text-black/75 md:ml-16">
              {d.bioFragments[1]}
            </p>
            <p className="mt-6 max-w-sm font-mono text-sm leading-relaxed text-[var(--color-accent-purple)] md:ml-32">
              {d.bioFragments[2]}
            </p>
          </FragmentReveal>

          <div
            className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.5em] text-black/15 lg:block"
            style={{ writingMode: "vertical-rl" }}
            aria-hidden="true"
          >
            curious by default
          </div>
        </section>

        {/* Experience — huge circled index overlapping the copy */}
        <section className="border-t-2 border-black py-16 md:py-24">
          <p className="mb-10 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">§ experience</p>
          <div className="flex flex-col gap-20">
            {d.experience.map((job, i) => (
              <div key={job.org} className="relative">
                <span
                  className="pointer-events-none absolute -left-4 -top-10 select-none font-bebas text-[7rem] leading-none text-black md:-left-8 md:-top-14 md:text-[9rem]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative z-10 ml-24 md:ml-40">
                  <h3 className="font-bebas text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.9] tracking-tight">
                    {job.org}
                  </h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-black/45">
                    {job.role} · {job.period} · {job.location}
                  </p>
                  <ul className="mt-4 flex max-w-lg flex-col gap-2">
                    {job.bullets.map((b) => (
                      <li key={b} className="font-space text-[0.9rem] leading-relaxed text-black/75">{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects — horizontal filmstrip, scroll-x on all sizes */}
        <section className="border-t-2 border-black py-16 md:py-24">
          <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">§ selected work — scroll →</p>
          <div className="-mx-6 flex gap-6 overflow-x-auto px-6 pb-4 md:-mx-10 md:px-10">
            {d.projects.map((p, i) => (
              <a
                key={p.title}
                href={p.url ?? undefined}
                target={p.url ? "_blank" : undefined}
                rel={p.url ? "noopener noreferrer" : undefined}
                className="group flex w-[min(80vw,340px)] shrink-0 flex-col justify-between border-2 border-black p-6"
              >
                <div>
                  <span className="font-mono text-xs text-black/40">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-bebas text-3xl leading-none transition-colors group-hover:text-[var(--color-accent-purple)]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/70">{p.tagline}</p>
                </div>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-wider text-black/40">
                  {p.tech.join(" · ")}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Background */}
        <section className="grid grid-cols-1 gap-10 border-t-2 border-black py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-24">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">stack</p>
            <p className="font-bebas text-3xl leading-[1.05] tracking-tight">{d.skills.core.join(" · ")}</p>
            <p className="mt-3 max-w-xs font-mono text-[10px] leading-relaxed text-black/40">also — {d.skills.also.join(", ")}</p>
          </div>
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">education</p>
            <p className="font-space text-sm leading-relaxed text-black/70">
              {d.education.degree}<br />{d.education.org}<br /><span className="text-black/40">{d.education.period}</span>
            </p>
          </div>
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">languages</p>
            {d.languages.map((l) => (
              <p key={l.name} className="font-space text-sm leading-relaxed text-black/70">{l.name} — {l.level}</p>
            ))}
          </div>
        </section>

        {/* Contact — ladder assembles toward the CTA */}
        <footer className="border-t-2 border-black py-20 md:py-28">
          <FragmentReveal stagger={0.18}>
            <p className="font-space text-base text-black/45">{d.lookingForFragments[0]}</p>
            <p className="mt-2 max-w-2xl font-bebas text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-tight md:ml-10">
              {d.lookingForFragments[1]}
            </p>
            <p className="mt-3 max-w-xl font-space text-base leading-relaxed text-black/70 md:ml-20">
              {d.lookingForFragments[2]}
            </p>
          </FragmentReveal>
          <a
            href={`mailto:${d.email}`}
            className="mt-8 inline-block border-b-2 border-black pb-1 font-mono text-sm font-bold uppercase tracking-widest hover:border-[var(--color-accent-purple)] hover:text-[var(--color-accent-purple)] md:ml-32"
          >
            {d.email} →
          </a>
        </footer>
      </div>
    </main>
  )
}
