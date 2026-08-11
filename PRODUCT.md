# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two distinct primary audiences arrive through a shared portal (`/`) that lets them self-select a path — this split is the site's central structural decision, not an afterthought:

- **DEV path** (`/dev` and related pages): recruiters, hiring managers, and engineering peers evaluating Sérgio Alexandre as a full-stack software engineer — for full-time roles, technical partnerships, or professional credibility (talks, writing).
- **SAERIX path** (`/saerix`, legacy `/lxndr` permanently redirects here): people who book DJs for bars/parties/events in Londrina, PR, and people discovering or following the DJ act SAERIX (open format, techno/psytrance) on SoundCloud/Instagram.

Both audiences are equally central goals of the product, not a primary side with a secondary experiment attached.

## Product Purpose

A single personal site that cleanly forks into two credible, self-contained identities for the same person: a software engineer portfolio built to earn interviews/opportunities, and a DJ/artist page (SAERIX) built to earn bookings and followers. The portal (`choose your path`) is the mechanism that keeps the two from diluting each other.

## Positioning

- **Dev side:** not a generic "full-stack developer" — the pitch is ownership end-to-end (architecture, requirements, prioritization) plus shipping AI-powered automation (n8n, WhatsApp/Evolution API flows) plus mentoring, evidenced by a documented promotion path (Intern → Analyst → Jr → Pleno) and concrete systems built from zero (e.g., test coverage taken from 0 to 80%+).
- **SAERIX side:** open-format DJ identity built around reading the room/floor ("a leitura vem antes do drop") rather than a fixed genre set — techno/psytrance leaning, framed as a live, adaptive sonic experience for Londrina's nightlife scene rather than a studio-only producer brand.

## Operating Context

- Bilingual by design: every route is served under `/en` and `/pt-BR` via next-intl; content, not just chrome, is translated (see `messages/en.json`, `messages/pt-BR.json`).
- The portal at `/` is the mandatory entry fork; direct deep links into `/dev` or `/saerix` skip it.
- `/lxndr` is a legacy route that permanently redirects to `/saerix` — SAERIX is the current, correct artist name; LXNDR is a retired brand and should not be reintroduced as user-facing identity.
- Dev side includes a personal blog/essays/lab area (`/blog`, `/ensaios`, `/laboratorio`) for long-form writing and in-progress experiments — this is part of the professional credibility surface, not a separate audience.
- Content authored as MDX (via `next-mdx-remote`, `gray-matter`, `reading-time`, `shiki`), so posts are files, not a CMS.

## Capabilities and Constraints

- Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS, GSAP (ScrollTrigger-driven scroll animation on both dev and SAERIX sides), shadcn/ui component base, deployed on Vercel.
- `next.config.mjs` currently has `ignoreBuildErrors: true` — a known, acknowledged tech-debt constraint (see AGENTS.md), not a design concern.
- No test framework configured yet — not a blocker for design work, but future claims of "tested" behavior should not be implied by UI copy beyond what's documented (e.g., the "80%+ test coverage" metric refers to the Union Audio/Aeon Tech product, not this portfolio codebase itself).
- Reduced-motion support is an existing, confirmed constraint (GSAP animations must respect `prefers-reduced-motion`; see `lib/gsap-config.ts`'s `prefersReducedMotion()`), used across both dev and SAERIX sides.

## Brand Commitments

- Person: **Sérgio Alexandre**, based in Londrina, PR, Brasil. Current role: Software Engineer (Pleno) at Aeon Tech / Union Audio; also Technical Partner at Kaizen (condo-automation startup).
- Artist name: **SAERIX** — DJ, open format, techno/psytrance, "Londrina / PR / DJ Sets / Noite / Bar / Festa / Warm-up / After." This is the current, binding artist identity (rebranded from the earlier LXNDR name; do not reuse LXNDR as a public-facing label).
- Dev-side voice: brutalist, high-signal, mono/display type mix, "console"/"transmission"/"signal" register (e.g. "engineering console", "RAW SIGNAL / TRANSMISSION") — an intentional aesthetic commitment already present in the codebase, not just incidental copy.
- Availability status ("open to the next opportunity") is a live, factual claim tied to current job-search status — treat as content to keep accurate, not a fixed slogan.

## Evidence on Hand

- SoundCloud and Instagram accounts for SAERIX are real and active and may be linked/referenced as genuine.
- **No shows, event dates, or performance photos exist yet for SAERIX.** Do not fabricate or imply a live-performance history, venue credits, testimonials, or booking track record — the SAERIX booking/scene sections should be written and designed to work convincingly for an artist who is real and active online but has not yet documented live gigs.
- Dev-side evidence is real and detailed: named employers (Aeon Tech/Union Audio, Kaizen, TCS), a specific promotion path, named projects with live GitHub links (e.g. Matrix Rain, LightSync, ThinkFlow) and one credential with a verifiable score (EF SET C2, 72/100). Treat this as real, checkable content — do not water it down or invent additional credentials.

## Product Principles

1. **The portal fork is load-bearing.** Every design decision on either side should reinforce, not blur, the DEV/SAERIX split — a recruiter and a promoter should each feel the page was built specifically for them.
2. **Claim only what's proven.** Dev-side credibility rests on real, specific, checkable facts (roles, metrics, links); SAERIX-side credibility rests on the DJ being real and active, without inventing a gig history it doesn't have yet.
3. **Bilingual is not an afterthought.** Any new copy, layout, or component must work in both `en` and `pt-BR` without breaking rhythm (brutalist type at large sizes is sensitive to string-length differences between the two languages).
4. **Motion respects opt-out.** GSAP-driven scroll/reveal work is part of the identity on both sides, but must degrade cleanly under reduced motion.
5. **LXNDR is retired.** Legacy routes/assets under the old name are migration debris, not brand material — extend SAERIX, don't resurrect LXNDR.

## Accessibility & Inclusion

`prefers-reduced-motion` support is an established, confirmed requirement across both dev and SAERIX GSAP animation work (not merely aspirational README copy) — preserve it in any new motion design.
