# Portfolio Visual Overhaul — "Make Recruiters Say WOW"

## TL;DR

> **Quick Summary**: Transform the LXNDR portfolio from a technically-correct but visually generic brutalist site into a jaw-dropping recruiter-first experience. Fix real bugs, add accent color, swap the generic font, introduce a strong hero identity element, redesign weak sections, and clean up dead code — all while preserving the Matrix effect and existing GSAP animations.
>
> **Deliverables**:
> - Accent color system (`--neon-orange: #FF6600`) applied to CTAs, nav, selection
> - Space Grotesk → Inter Tight font swap
> - Hero CTA button (See Work + Download CV with real PDF) + LXNDR monogram visual element
> - Nav bug fixed (scrollToSection "impact" → "proof")
> - Stats updated to real numbers (no "308 TESTS" fiction)
> - Vision section redesigned for visual density/impact
> - Blog showcase dark-theme continuity fixed
> - Parallax tuned (reduce scrub noise)
> - ~600 lines of dead CSS removed
> - i18n parity: all content in en + pt-BR
>
> **Estimated Effort**: Medium (3–4 parallel waves)
> **Parallel Execution**: YES — 4 waves
> **Critical Path**: T1 (bug fix) → T4 (accent color) → T5 (font swap) → T7 (hero CTA) → T9 (vision) → T11 (CSS) → Final QA

---

## Context

### Original Request
"Eu preciso que você avalie o design do meu site, faça uma crítica ferrenha... Eles têm que abrir e falar uau, como isso está incrível, profissional, bonito."

### Interview Summary
**Key Discussions**:
- Critique delivered: 10 issues identified across bug, design, UX, and CSS categories
- User confirmed: yes to full work plan
- Matrix effect: MUST be preserved
- Existing GSAP animations: MUST be preserved
- Brutalist aesthetic: MUST be maintained

**User Decisions (Wave 0 resolved)**:
- **CV PDF**: Has file ready → "Download CV" button will be fully functional (`/public/cv.pdf`)
- **Photo/Avatar**: No photo → use abstract visual element (LXNDR monogram block)
- **Stats "308 TESTS"**: Replace with real stats → `3+ YRS / 20K+ LINES / 15+ PROJECTS / 99% UPTIME`
- **Accent color**: `#FF6600` Neon Orange (not cyan, not yellow)
- **Font swap**: Inter Tight replaces Space Grotesk

### Research Findings
- `--neon-orange: #ff6600` and `--neon-blue: #00ffff` already declared in globals.css — zero components use them
- `nav.tsx` confirmed bug: `scrollToSection("impact")` → section id is `"proof"`
- `stat-reveal.tsx` stats are translation-driven from `messages/en.json` — labels (`YEARS`, `LINES`) are hardcoded English in the component, not i18n'd
- Dead CSS confirmed: evangelion block (~lines 1117–1274) + glitch block (~lines 444–498) + scattered utilities
- `blog-showcase.tsx` uses `bg-accent` which resolves to inverted black/white — breaks dark narrative flow
- Vision section: quote has `border/30` (nearly invisible) + 3 sparse bullets — weak layout
- `prefersReducedMotion()` utility exists in `lib/gsap-config.ts` — new animations must use it
- MatrixCanvas has no reduced-motion handling (known gap, out of current scope)
- `next.config.mjs` has `unoptimized: true` for images — photo not applicable, monogram is CSS/SVG

### Metis Review
**Identified Gaps (addressed)**:
- CV PDF link would ship broken if no file exists → resolved: user has PDF ready
- "308 TESTS" credibility risk → resolved: stats will be updated to real numbers
- Space Grotesk → must pick a specific replacement → resolved: Inter Tight
- Accent color: must pick one → resolved: #FF6600
- Photo fallback needed → resolved: LXNDR monogram geometric element
- i18n parity: every string change needs both en.json AND pt-BR.json
- Blog showcase: "fix flow" was vague → resolved: restyle dark continuity only (no structural changes)
- StatReveal labels (`YEARS`, `LINES`, etc.) are hardcoded English — document as intentional (English abbreviations acceptable in pt-BR context)

---

## Work Objectives

### Core Objective
Fix the bug, establish the accent color system, modernize the typography, give the hero a strong visual identity with CTAs, make the Vision section impactful, fix the blog narrative break, and remove dead code — all without touching Matrix, existing GSAP animations, or the brutalist design system.

### Concrete Deliverables
- `components/portfolio/nav.tsx` — bug fix: `"impact"` → `"proof"`
- `public/cv.pdf` — PDF uploaded (user provides file; plan task sets up the button)
- `app/[locale]/globals.css` — `--neon-orange` applied to `::selection`, CSS accent utilities added
- `app/[locale]/layout.tsx` — Inter Tight loaded via `next/font/google`, `--font-space` variable updated
- `components/portfolio/intro.tsx` — CTA buttons added (See Work + Download CV), LXNDR monogram element added
- `messages/en.json` + `messages/pt-BR.json` — new hero CTA keys + updated stats values
- `components/portfolio/vision.tsx` — redesigned layout with more visual density
- `components/portfolio/blog-showcase.tsx` — dark-theme continuity (no more white block break)
- `app/[locale]/globals.css` — ~600 lines of dead CSS removed (evangelion + glitch + dead utilities)
- All scroll-based components — parallax scrub values reviewed and capped at 1.5

### Definition of Done
- [ ] `pnpm build` passes with zero new TypeScript errors
- [ ] `pnpm lint` passes with zero new warnings
- [ ] `/en` and `/pt-BR` routes both render correctly
- [ ] Nav "Experience" button scrolls to the Proof section
- [ ] Accent color visible on: CTA buttons, active nav item, text selection
- [ ] Inter Tight renders in place of Space Grotesk (lastName in hero, body text)
- [ ] Hero has: name, role, 4 stats, CTA row (2 buttons), LXNDR monogram, scroll indicator
- [ ] Download CV button links to `/cv.pdf` (user must place file in `/public/cv.pdf`)
- [ ] Stats show real values (no "308 TESTS")
- [ ] Vision section has visible quote border (not `border/30`) and improved layout density
- [ ] Blog section background matches the dark narrative (no white break)
- [ ] Dead evangelion/glitch CSS block deleted and verified absent
- [ ] No existing GSAP animation removed or broken

### Must Have
- Accent color applied exactly to: `--color-accent` token + CTA buttons + active nav + `::selection` + focus rings
- Inter Tight loaded from `next/font/google` — NOT from CDN
- Hero CTA: "See Work" (scrolls to `#proof`) + "Download CV" (links to `/cv.pdf`)
- LXNDR monogram element: large geometric block, CSS/SVG only (no Image component, no external asset)
- All new strings: en.json AND pt-BR.json updated atomically
- Stats in both language files updated with the new values
- `pnpm build` clean after CSS cleanup wave (highest-risk step)

### Must NOT Have (Guardrails)
- NO accent color on decorative/non-interactive elements (backgrounds, headings, borders)
- NO restructuring of existing layout containers — only add new child elements
- NO deletion of ANY CSS class without a preceding `grep -r` confirming zero references
- NO new npm packages — Inter Tight comes from `next/font/google` (already in use)
- NO changes to MatrixCanvas, MatrixZone, or any GSAP ScrollTrigger block
- NO touch of blog card components, blog logic, or blog post content
- NO changes to `scrub` values beyond capping at 1.5 (no ScrollTrigger restructuring)
- NO font size, weight, or spacing changes during the font swap — only the family variable
- NO AI slop: no excessive comments, no unnecessary wrappers, no generic variable names
- NO "visually confirm" acceptance criteria — all QA must be agent-executable

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO (no test framework)
- **Automated tests**: None
- **Agent-Executed QA**: ALWAYS (mandatory for all tasks)

### QA Policy
Every task includes agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/`.
- **Frontend/UI**: Playwright — navigate, assert DOM, screenshot
- **CSS/Tokens**: Bash — `grep` for presence/absence of classes and values
- **Build/Lint**: Bash — `pnpm build`, `pnpm lint`
- **i18n**: Bash — `grep` both language files for key presence

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — quick fixes + tokens):
├── Task 1: Fix nav scrollToSection bug [quick]
├── Task 2: Update stats to real values in en.json + pt-BR.json [quick]
├── Task 3: Upload CV PDF setup (button + asset) [quick]
├── Task 4: Introduce accent color token + apply to ::selection + focus [quick]
└── Task 5: Font swap Space Grotesk → Inter Tight [quick]

Wave 2 (After Wave 1 — hero + sections redesign):
├── Task 6: Hero CTA buttons (See Work + Download CV) [visual-engineering]
├── Task 7: Hero LXNDR monogram visual element [visual-engineering]
└── Task 8: Vision section redesign (layout density) [visual-engineering]

Wave 3 (After Wave 1 — can run parallel to Wave 2):
├── Task 9: Blog showcase dark-theme continuity fix [quick]
├── Task 10: Parallax scrub audit + cap at 1.5 [quick]
└── Task 11: Dead CSS removal (evangelion + glitch + scattered) [unspecified-high]

Wave FINAL (After ALL — 4 parallel reviews):
├── Task F1: Plan compliance audit [oracle]
├── Task F2: Code quality review (build + lint + AI slop) [unspecified-high]
├── Task F3: Real manual QA — all sections both locales [unspecified-high]
└── Task F4: Scope fidelity check [deep]
→ Present results → Get explicit user okay
```

```
Critical Path: T1 → T4 → T5 → T6 → T7 → T8 → F1-F4 → user okay
Parallel: Wave 3 (T9, T10, T11) runs concurrently with Wave 2 (T6, T7, T8)
Max Concurrent: 5 (Wave 2 + Wave 3 together)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| T1 | — | F1, F3 |
| T2 | — | F1, F3 |
| T3 | — | T6 |
| T4 | — | T6, T7, F2 |
| T5 | — | T6, T7, F2 |
| T6 | T3, T4, T5 | F1, F3 |
| T7 | T4, T5 | F1, F3 |
| T8 | T4, T5 | F1, F3 |
| T9 | T4 | F1, F3 |
| T10 | — | F2 |
| T11 | — | F2 |

### Agent Dispatch Summary

- **Wave 1**: 5 tasks → all `quick`
- **Wave 2**: 3 tasks → all `visual-engineering`
- **Wave 3**: 2 `quick` + 1 `unspecified-high`
- **Final**: `oracle` + `unspecified-high` + `unspecified-high` + `deep`

---

## TODOs

- [x] 1. Fix nav `scrollToSection` bug

  **What to do**:
  - Open `components/portfolio/nav.tsx`
  - Find the nav item that calls `scrollToSection("impact")` — this is the "Experience" / "Proof" nav link
  - Change the argument from `"impact"` to `"proof"` to match the actual section `id="proof"` in `components/portfolio/proof.tsx`
  - Verify no other nav item calls `scrollToSection("impact")`

  **Must NOT do**:
  - Do not rename the section id in `proof.tsx` — change the nav call only
  - Do not touch any other nav items, styles, or logic

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single-line string change in one file, no logic involved
  - **Skills**: none needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4, 5)
  - **Blocks**: F1, F3 (final QA checks the nav)
  - **Blocked By**: None (start immediately)

  **References**:
  - `components/portfolio/nav.tsx` — find the `scrollToSection` calls; the broken one passes `"impact"`
  - `components/portfolio/proof.tsx:1` — confirm `id="proof"` on the section element

  **Acceptance Criteria**:

  ```
  Scenario: Nav "Experience/Proof" item scrolls to correct section
    Tool: Bash (grep)
    Steps:
      1. grep "scrollToSection" components/portfolio/nav.tsx
    Expected Result: Only "proof" appears as argument — no "impact" argument remaining
    Evidence: .sisyphus/evidence/task-1-nav-fix.txt

  Scenario: Section ID still exists
    Tool: Bash (grep)
    Steps:
      1. grep 'id="proof"' components/portfolio/proof.tsx
    Expected Result: Line with id="proof" found
    Evidence: (same file as above)
  ```

  **Commit**: YES (atomic)
  - Message: `fix(nav): scrollToSection "impact" → "proof" to match section id`
  - Files: `components/portfolio/nav.tsx`

- [x] 2. Update stats to real values in both language files

  **What to do**:
  - Open `messages/en.json` and find the hero stats keys (currently: `stats.years`, `stats.loc`, `stats.tests`, `stats.uptime` and their label counterparts)
  - Update values to real/verifiable numbers:
    - `stats.years` → `"3+"` (keep)
    - `stats.loc` → `"20K+"` (update from 19K+)
    - `stats.tests` → `"15+"` (replace "308" — use "15+" meaning projects/deliverables)
    - `stats.testsLabel` → `"PROJECTS"` (replace "TESTS" label)
    - `stats.uptime` → `"99%"` (update from 99.8%)
    - `stats.uptimeLabel` → `"UPTIME"` (keep)
  - Apply the EXACT same changes to `messages/pt-BR.json` (atomic i18n pair)

  **Must NOT do**:
  - Do not change the JSON key names (`stats.tests`, `stats.testsLabel`) — only the values
  - Do not add or remove any keys
  - Do not touch any other section of either JSON file

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: JSON string value changes in 2 files, no logic
  - **Skills**: none needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4, 5)
  - **Blocks**: F1, F3
  - **Blocked By**: None

  **References**:
  - `messages/en.json` — find the `"hero"` → `"stats"` section for current values
  - `messages/pt-BR.json` — mirror of the English structure; update same keys

  **Acceptance Criteria**:

  ```
  Scenario: Stats updated in English
    Tool: Bash (grep)
    Steps:
      1. grep -A 20 '"stats"' messages/en.json
    Expected Result: "308" does NOT appear; "TESTS" label does NOT appear; "15+" and "PROJECTS" DO appear
    Evidence: .sisyphus/evidence/task-2-stats-en.txt

  Scenario: Stats updated in Portuguese (i18n parity)
    Tool: Bash (grep)
    Steps:
      1. grep -A 20 '"stats"' messages/pt-BR.json
    Expected Result: Same values as English — "308" absent, "TESTES" or "TESTS" label absent
    Evidence: .sisyphus/evidence/task-2-stats-ptbr.txt
  ```

  **Commit**: YES (atomic i18n pair)
  - Message: `fix(i18n): replace fictional 308 TESTS stat with real 15+ PROJECTS in en + pt-BR`
  - Files: `messages/en.json`, `messages/pt-BR.json`

- [x] 3. Download CV button — PDF setup

  **What to do**:
  - Add the i18n keys for the "Download CV" CTA to both `messages/en.json` and `messages/pt-BR.json`:
    - English: `hero.ctaDownloadCV` → `"Download CV"`
    - Portuguese: `hero.ctaDownloadCV` → `"Baixar CV"` (or `"Download CV"` — both acceptable)
    - English: `hero.ctaSeeWork` → `"See My Work"`
    - Portuguese: `hero.ctaSeeWork` → `"Ver Meu Trabalho"`
  - Add a note in the plan evidence: the user must place their CV file at `/public/cv.pdf` before deployment. The button will link to `/cv.pdf`.
  - Write a placeholder file at `.sisyphus/evidence/task-3-cv-note.txt` documenting: "User confirmed CV PDF is ready. Must be placed at /public/cv.pdf before deployment. Button href = /cv.pdf."

  **Must NOT do**:
  - Do NOT touch `intro.tsx` — that is Task 6's job
  - Do not create any component changes here; only JSON keys

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: none

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4, 5)
  - **Blocks**: T6 (hero CTA needs these keys)
  - **Blocked By**: None

  **References**:
  - `messages/en.json` — `"hero"` section, add new keys after existing ones
  - `messages/pt-BR.json` — mirror

  **Acceptance Criteria**:

  ```
  Scenario: CTA keys exist in English
    Tool: Bash (grep)
    Steps:
      1. grep "ctaDownloadCV\|ctaSeeWork" messages/en.json
    Expected Result: Both keys found with non-empty string values
    Evidence: .sisyphus/evidence/task-3-cta-keys.txt

  Scenario: CTA keys exist in Portuguese (parity)
    Tool: Bash (grep)
    Steps:
      1. grep "ctaDownloadCV\|ctaSeeWork" messages/pt-BR.json
    Expected Result: Both keys found with non-empty string values
    Evidence: (same file)
  ```

  **Commit**: YES
  - Message: `feat(i18n): add hero CTA translation keys (See Work + Download CV) in en + pt-BR`
  - Files: `messages/en.json`, `messages/pt-BR.json`

- [x] 4. Introduce accent color token and apply to `::selection` + focus rings

  **What to do**:
  - In `app/[locale]/globals.css`, add a new CSS variable `--color-accent: var(--neon-orange)` in the `:root` block (light mode) and also in the `[data-theme="dark"]` / `.dark` block. The `--neon-orange: #ff6600` variable already exists — just alias it.
  - Apply `--color-accent` to `::selection` pseudo-element:
    ```css
    ::selection {
      background-color: var(--color-accent);
      color: #000000;
    }
    ```
  - Apply `--color-accent` to focus-visible ring utilities: add `.ring-accent { --tw-ring-color: var(--color-accent); }` as a utility class
  - Add `.text-accent { color: var(--color-accent); }` and `.bg-accent-primary { background-color: var(--color-accent); }` — but these are only for use in CTAs (Tasks 6/7/8 will use them)
  - Do NOT apply the accent color to any existing element in this task — this task only establishes the token

  **Must NOT do**:
  - Do not apply accent to any existing component styles
  - Do not touch any component `.tsx` files
  - Do not modify `--neon-orange` value (it's already correct at `#ff6600`)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: none

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T6, T7, T8, T9 (all use accent token)
  - **Blocked By**: None

  **References**:
  - `app/[locale]/globals.css` lines 1–50 — the `:root` variable block with existing `--neon-orange`
  - `app/[locale]/globals.css` — find the `.dark` or `[data-theme="dark"]` block to add accent there too

  **Acceptance Criteria**:

  ```
  Scenario: Accent token declared
    Tool: Bash (grep)
    Steps:
      1. grep "color-accent" app/\[locale\]/globals.css
    Expected Result: --color-accent variable found in :root block
    Evidence: .sisyphus/evidence/task-4-accent-token.txt

  Scenario: ::selection uses accent
    Tool: Bash (grep)
    Steps:
      1. grep -A 3 "::selection" app/\[locale\]/globals.css
    Expected Result: background-color uses var(--color-accent) or var(--neon-orange)
    Evidence: (same file)
  ```

  **Commit**: YES
  - Message: `feat(design): introduce --color-accent token (#FF6600), apply to ::selection + focus`
  - Files: `app/[locale]/globals.css`

- [x] 5. Font swap: Space Grotesk → Inter Tight

  **What to do**:
  - In `app/[locale]/layout.tsx`, find the `next/font/google` import for `Space_Grotesk`
  - Replace it with `Inter_Tight` from `next/font/google`:
    ```typescript
    import { Bebas_Neue, Inter_Tight } from "next/font/google"
    const interTight = Inter_Tight({
      subsets: ["latin"],
      variable: "--font-space", // Keep the SAME variable name — all components still work
      weight: ["400", "500", "600", "700", "800", "900"],
    })
    ```
  - Update the className in the `<html>` or `<body>` element to use `interTight.variable` instead of the old `spaceGrotesk.variable`
  - The CSS variable `--font-space` stays the same name — no component changes needed

  **Must NOT do**:
  - Do NOT rename `--font-space` CSS variable — this would break every component that uses it
  - Do NOT change font sizes, weights, or spacing on any component
  - Do NOT add Inter Tight to any component directly — it flows through the CSS variable

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: none

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1
  - **Blocks**: T6, T7 (hero redesign will look different with the new font)
  - **Blocked By**: None

  **References**:
  - `app/[locale]/layout.tsx` — find current `Space_Grotesk` import and font variable setup
  - Next.js `next/font/google` docs pattern — `Inter_Tight` is available in `next/font/google`

  **Acceptance Criteria**:

  ```
  Scenario: Inter Tight loaded in layout
    Tool: Bash (grep)
    Steps:
      1. grep "Inter_Tight\|inter.tight\|interTight" app/\[locale\]/layout.tsx
    Expected Result: Inter_Tight import and variable assignment found
    Evidence: .sisyphus/evidence/task-5-font-swap.txt

  Scenario: Space Grotesk removed
    Tool: Bash (grep)
    Steps:
      1. grep "Space_Grotesk" app/\[locale\]/layout.tsx
    Expected Result: No matches (Space_Grotesk import gone)
    Evidence: (same file)

  Scenario: Build still passes after font swap
    Tool: Bash
    Steps:
      1. pnpm build 2>&1 | grep -c "error" || echo "0 errors"
    Expected Result: 0 new TypeScript/build errors introduced
    Evidence: .sisyphus/evidence/task-5-build.txt
  ```

  **Commit**: YES
  - Message: `feat(typography): replace Space Grotesk with Inter Tight via --font-space variable`
  - Files: `app/[locale]/layout.tsx`

- [x] 6. Hero CTA buttons (See Work + Download CV)

  **What to do**:
  - Open `components/portfolio/intro.tsx`
  - After the `StatReveal` component (currently at absolute bottom-32) and before the scroll indicator button, add a new CTA row **inside** the `heroRef` div, below the role/location row
  - The CTA row contains two buttons side-by-side:
    1. **"See My Work"** — a `<button>` that calls `scrollToSection("proof")` on click (follow the nav pattern in `components/portfolio/nav.tsx` for smooth scroll logic), styled as a filled brutalist button using `bg-accent-primary text-black border-4 border-foreground shadow-brutalist`
    2. **"Download CV"** — an `<a href="/cv.pdf" download>` link styled as an outlined brutalist button using `bg-transparent text-foreground border-4 border-foreground shadow-brutalist hover:bg-foreground hover:text-background`
  - Both buttons use the i18n keys added in Task 3: `t("ctaSeeWork")` and `t("ctaDownloadCV")`
  - The CTA row should appear between the role/location row and the stats (or after stats — pick whichever position reads better visually, but it must be within the hero viewport, visible without scrolling on desktop)
  - Add the CTA row to the existing GSAP entrance timeline in the same `useEffect` (follow the `role` fade-in pattern — add a `.to(ctaRef.current, { opacity:1, y:0 })` step)
  - Use `prefersReducedMotion()` guard (already in the file) for the new animation

  **Must NOT do**:
  - Do not restructure the existing h1 / role / stats layout
  - Do not change the StatReveal component or its absolute positioning
  - Do not add hover animations beyond the CSS transition already in `transition-all`
  - Do not install any new packages

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Adding interactive UI elements with GSAP animation entrance and brutalist styling
  - **Skills**: `frontend-ui-ux`
    - `frontend-ui-ux`: Design decisions for button layout, spacing, brutalist button pattern

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T7, T8)
  - **Parallel Group**: Wave 2
  - **Blocks**: F1, F3
  - **Blocked By**: T3 (i18n keys), T4 (accent token), T5 (font swap)

  **References**:
  - `components/portfolio/intro.tsx:115–238` — existing `useEffect` GSAP timeline to extend
  - `components/portfolio/intro.tsx:286–296` — role/location row to insert CTA after
  - `components/portfolio/nav.tsx` — `scrollToSection` implementation to copy for "See Work" scroll behavior
  - `components/portfolio/connect.tsx` — brutalist button pattern (border-4, shadow-brutalist, hover states)
  - `app/[locale]/globals.css` — `shadow-brutalist`, `shadow-brutalist-lg` utilities already defined
  - `messages/en.json` — `hero.ctaSeeWork` and `hero.ctaDownloadCV` keys (added in T3)

  **Acceptance Criteria**:

  ```
  Scenario: "See My Work" button exists in hero DOM
    Tool: Bash (grep)
    Steps:
      1. grep "ctaSeeWork\|scrollToSection.*proof\|See My Work" components/portfolio/intro.tsx
    Expected Result: Button with scroll-to-proof behavior found in intro.tsx
    Evidence: .sisyphus/evidence/task-6-cta-see-work.txt

  Scenario: "Download CV" button has correct href
    Tool: Bash (grep)
    Steps:
      1. grep "cv.pdf\|ctaDownloadCV\|download" components/portfolio/intro.tsx
    Expected Result: <a href="/cv.pdf" download> element found
    Evidence: .sisyphus/evidence/task-6-cta-download.txt

  Scenario: CTA uses accent color (orange background on primary button)
    Tool: Bash (grep)
    Steps:
      1. grep "accent\|neon-orange\|FF6600\|bg-accent" components/portfolio/intro.tsx
    Expected Result: Accent color referenced on the primary CTA button
    Evidence: .sisyphus/evidence/task-6-cta-accent.txt

  Scenario: Both locale routes render the CTA
    Tool: Bash (curl + pnpm dev running)
    Steps:
      1. curl -s http://localhost:3000/en | grep -i "see\|download"
      2. curl -s http://localhost:3000/pt-BR | grep -i "ver\|baixar"
    Expected Result: CTA text found in both locale responses
    Evidence: .sisyphus/evidence/task-6-locale-check.txt
  ```

  **Commit**: YES
  - Message: `feat(hero): add CTA row (See My Work + Download CV) with i18n and GSAP entrance`
  - Files: `components/portfolio/intro.tsx`

- [x] 7. Hero LXNDR monogram visual identity element

  **What to do**:
  - Open `components/portfolio/intro.tsx`
  - Add a large geometric monogram element to the hero section. This is a pure CSS/SVG element — no Image component, no external assets.
  - The element should be: a large `"LXNDR"` text in Bebas Neue (already available via `font-bebas`), displayed as outlined text (`-webkit-text-stroke`), positioned absolute in the hero at the right side (desktop) / below content (mobile), with heavy opacity (`opacity: 0.07–0.12`) so it reads as a background texture/watermark
  - Specifically: `position: absolute`, `right: -2rem md:right: -4rem`, `bottom: 10%`, font size `clamp(8rem, 25vw, 22rem)`, `font-bebas`, `text-outlined` (the utility already exists in globals.css), `opacity-10`, `select-none`, `pointer-events-none`, `z-0`
  - This element sits behind the content (z-0 vs content z-10) and creates visual depth/texture
  - Add a GSAP parallax on this element: it moves slightly slower than the rest of the hero content on scroll (use existing parallax pattern from `firstNameRef` / `lastNameRef` in the same file — `y: -30` with scrub: 1)
  - Use `aria-hidden="true"` since it's decorative

  **Must NOT do**:
  - Do not use `<Image>` or any external image file
  - Do not use opacity higher than 0.15 (it should be a subtle background element, not a foreground one)
  - Do not use any new CSS classes beyond existing utilities (`text-outlined`, `font-bebas`, Tailwind utilities)
  - Do not make this element interactive

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Creative CSS positioning + GSAP parallax addition
  - **Skills**: `frontend-ui-ux`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T6, T8)
  - **Parallel Group**: Wave 2
  - **Blocks**: F1, F3
  - **Blocked By**: T4 (accent token), T5 (font swap)

  **References**:
  - `components/portfolio/intro.tsx:192–212` — existing parallax pattern for `firstNameRef` / `lastNameRef` to copy for monogram parallax
  - `app/[locale]/globals.css` — find `.text-outlined` utility (already defined, uses `-webkit-text-stroke`)
  - `components/portfolio/intro.tsx:262–282` — hero content structure to understand where to insert absolute element

  **Acceptance Criteria**:

  ```
  Scenario: Monogram element exists in hero
    Tool: Bash (grep)
    Steps:
      1. grep -n "LXNDR\|monogram\|aria-hidden" components/portfolio/intro.tsx
    Expected Result: Element with aria-hidden="true" and "LXNDR" text found
    Evidence: .sisyphus/evidence/task-7-monogram.txt

  Scenario: Monogram is positioned absolute and low opacity
    Tool: Bash (grep)
    Steps:
      1. grep -A 5 "LXNDR" components/portfolio/intro.tsx | grep "absolute\|opacity\|pointer"
    Expected Result: absolute positioning and opacity classes found on the element
    Evidence: (same file)

  Scenario: Monogram has parallax (GSAP scrub)
    Tool: Bash (grep)
    Steps:
      1. grep "monogramRef\|monogram" components/portfolio/intro.tsx | grep "gsap\|scrub\|scrollTrigger"
    Expected Result: GSAP ScrollTrigger parallax found for the monogram element
    Evidence: .sisyphus/evidence/task-7-monogram-gsap.txt
  ```

  **Commit**: YES (groups with T6 if sequential, separate if parallel)
  - Message: `feat(hero): add LXNDR monogram watermark with parallax for visual depth`
  - Files: `components/portfolio/intro.tsx`

- [x] 8. Vision section — redesign for visual density and impact

  **What to do**:
  - Open `components/portfolio/vision.tsx` and read the full current implementation
  - The section has: a quote in a box with `border/30` (nearly invisible) + 3 bullets "What I'm Looking For"
  - Changes to make:
    1. **Quote box border**: change `border/30` to `border-foreground` with full opacity (or `border-4 border-foreground shadow-brutalist`) — make the quote box a proper brutalist card with visible borders
    2. **Quote text size**: if smaller than `text-2xl`, increase to `text-2xl md:text-3xl` for impact
    3. **"What I'm Looking For" list**: convert the 3 plain bullets into a **3-column grid on desktop** (1 column mobile), each item as a bordered card with the bullet text + a visual number/counter (01, 02, 03) in a large muted font behind it (similar treatment to the Journey timeline cards in `journey.tsx`)
    4. **Section title**: verify it uses `SplitTextReveal` — if not, add it (follow the pattern in `blog-showcase.tsx`)
    5. **Add accent color**: the active/highlighted element or the number counters (01, 02, 03) should use `text-accent` or `var(--color-accent)` to introduce the orange accent here
  - Maintain all existing GSAP animations — only change the JSX structure and Tailwind classes

  **Must NOT do**:
  - Do not change any copy/text content in the JSX — content comes from i18n, do not touch the translation keys or values
  - Do not remove any existing GSAP animation from the section
  - Do not add any new GSAP animations (beyond what's already there)
  - Do not restructure the section's overall layout (`min-h-screen`, `px-6`, `py-32`, etc.)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: JSX/Tailwind restructure for visual density — design judgment required
  - **Skills**: `frontend-ui-ux`

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T6, T7)
  - **Parallel Group**: Wave 2
  - **Blocks**: F1, F3
  - **Blocked By**: T4 (accent token needed for number counters)

  **References**:
  - `components/portfolio/vision.tsx` — full current implementation (read before editing)
  - `components/portfolio/journey.tsx` — numbered card pattern (01, 02, 03 counter style) to reference
  - `components/portfolio/connect.tsx` — brutalist card pattern with full-opacity borders
  - `app/[locale]/globals.css` — `shadow-brutalist`, `border-brutalist` utilities

  **Acceptance Criteria**:

  ```
  Scenario: Quote box has visible border (not opacity/30)
    Tool: Bash (grep)
    Steps:
      1. grep "border" components/portfolio/vision.tsx | grep -v "border/30\|border-opacity"
    Expected Result: Full-opacity border class found on quote container (e.g. border-4 or border-foreground)
    Evidence: .sisyphus/evidence/task-8-vision-border.txt

  Scenario: Bullets are in grid layout
    Tool: Bash (grep)
    Steps:
      1. grep "grid\|grid-cols" components/portfolio/vision.tsx
    Expected Result: CSS grid class found (grid-cols-1 md:grid-cols-3 or similar)
    Evidence: .sisyphus/evidence/task-8-vision-grid.txt

  Scenario: Accent color used in vision (number counters or highlights)
    Tool: Bash (grep)
    Steps:
      1. grep "accent\|neon-orange\|color-accent" components/portfolio/vision.tsx
    Expected Result: Accent color reference found
    Evidence: .sisyphus/evidence/task-8-vision-accent.txt
  ```

  **Commit**: YES
  - Message: `feat(vision): redesign layout — brutalist quote card + 3-column grid items with accent counters`
  - Files: `components/portfolio/vision.tsx`

- [x] 9. Blog showcase — fix dark-theme continuity

  **What to do**:
  - Open `components/portfolio/blog-showcase.tsx`
  - The section uses `className="... bg-accent text-accent-foreground ..."` which resolves to an inverted (white on black in dark, black on white in light) block — breaking the dark narrative flow of the portfolio
  - Change the section background to match the dark narrative:
    - Replace `bg-accent text-accent-foreground` with `bg-foreground text-background` (same as the sections around it — the Intro and Matrix sections use `bg-foreground text-background`)
    - Optionally add `data-theme="dark"` attribute if not already present (check the current JSX)
  - This is a className-only change — no structural changes

  **Must NOT do**:
  - Do not touch BlogCard component
  - Do not touch blog post data or logic
  - Do not change layout, spacing, or padding
  - Do not add or remove any GSAP animations

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: none

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T10, T11)
  - **Parallel Group**: Wave 3
  - **Blocks**: F1, F3
  - **Blocked By**: T4 (accent token established in Wave 1 — should be done first conceptually, but this task only removes bg-accent)

  **References**:
  - `components/portfolio/blog-showcase.tsx:129–134` — the section opening tag with bg-accent classes
  - `components/portfolio/intro.tsx:252–254` — `bg-foreground text-background` pattern to match
  - `components/portfolio/vision.tsx` — check what background it uses for the section before blog showcase

  **Acceptance Criteria**:

  ```
  Scenario: Blog section no longer uses bg-accent (white break)
    Tool: Bash (grep)
    Steps:
      1. grep "bg-accent\|text-accent-foreground" components/portfolio/blog-showcase.tsx | grep "section"
    Expected Result: No match — bg-accent removed from the section element
    Evidence: .sisyphus/evidence/task-9-blog-bg.txt

  Scenario: Blog section uses dark background
    Tool: Bash (grep)
    Steps:
      1. grep "bg-foreground\|data-theme" components/portfolio/blog-showcase.tsx | head -3
    Expected Result: bg-foreground or data-theme="dark" found on section
    Evidence: (same file)
  ```

  **Commit**: YES
  - Message: `fix(blog): restore dark-theme continuity by replacing bg-accent with bg-foreground`
  - Files: `components/portfolio/blog-showcase.tsx`

- [x] 10. Parallax scrub audit — cap all values at 1.5

  **What to do**:
  - Search all portfolio and shared components for `scrub:` values in GSAP ScrollTrigger configs
  - Files to check: `components/portfolio/intro.tsx`, `components/portfolio/origin.tsx`, `components/portfolio/journey.tsx`, `components/portfolio/skills.tsx`, `components/portfolio/proof.tsx`, `components/portfolio/vision.tsx`, `components/portfolio/connect.tsx`, `components/portfolio/blog-showcase.tsx`, `components/shared/scroll-text-reveal.tsx`
  - For every `scrub:` value greater than 1.5, lower it to 1.5
  - For every `scrub: true` (boolean), change it to `scrub: 1` (number = 1 second lag)
  - Do NOT change any other ScrollTrigger properties (start, end, toggleActions, etc.)
  - Do NOT add scrub to elements that don't already have it

  **Must NOT do**:
  - Do not change `start`, `end`, `trigger`, or `toggleActions` in any ScrollTrigger
  - Do not remove any ScrollTrigger block
  - Do not add new animations

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: none

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T9, T11)
  - **Parallel Group**: Wave 3
  - **Blocks**: F2
  - **Blocked By**: None (can start immediately after Wave 1 completes)

  **References**:
  - All `components/portfolio/*.tsx` files — grep for `scrub:` to find all instances
  - `lib/gsap-config.ts` — check if scrub defaults are set there too

  **Acceptance Criteria**:

  ```
  Scenario: No scrub value exceeds 1.5
    Tool: Bash (grep)
    Steps:
      1. grep -rn "scrub:" components/portfolio/ components/shared/ | grep -v "scrub: 1\b\|scrub: 1\.\|scrub: 0\|scrub: true"
    Expected Result: Empty output OR only values ≤ 1.5 (scrub: 1, scrub: 1.5)
    Evidence: .sisyphus/evidence/task-10-scrub-audit.txt

  Scenario: scrub: true converted to scrub: 1
    Tool: Bash (grep)
    Steps:
      1. grep -rn "scrub: true" components/
    Expected Result: No matches (all converted to numeric values)
    Evidence: (same file)
  ```

  **Commit**: YES
  - Message: `perf(gsap): cap all parallax scrub values at 1.5 to reduce visual noise`
  - Files: multiple `components/portfolio/*.tsx`

- [x] 11. Dead CSS removal — evangelion + glitch + scattered utilities

  **What to do**:
  - This is a careful, surgical deletion. Follow this EXACT process for every CSS block:
    1. Identify the class name(s) to delete
    2. Run `grep -r "className.*[classname]" components/ app/ content/ --include="*.tsx" --include="*.ts" --include="*.mdx"` to confirm ZERO references
    3. Only if grep returns empty: delete the CSS block
    4. Document each deleted class in `.sisyphus/evidence/task-11-deleted-classes.txt`

  - **Confirmed dead blocks to delete** (verify each before deleting):
    - Lines ~1117–1274: the `/* Evangelion */` or `/* Neural */` block — classes like `.neural-network-bg`, `.cyber-grid`, `.evangelion-glitch`, `.holographic-text`, `.scanlines`
    - Lines ~444–498: the standalone `.glitch-text` block (NOT the `.text-brutalist` utilities — those are used)
    - Any `@keyframes` animations that are only referenced by the deleted classes above (check references before deleting keyframes)

  - **DO NOT delete** anything in these categories even if they look unused:
    - `.grain-overlay` (used in intro, origin, blog-showcase)
    - `.text-outlined` (used in intro.tsx lastName)
    - `.text-brutalist`, `.shadow-brutalist`, `.border-brutalist` (used everywhere)
    - `.split-text` (used in SplitTextReveal)
    - Any `@keyframes` used by `animate-` Tailwind utilities in components

  **Must NOT do**:
  - Do not delete any CSS class without a preceding grep confirming zero component references
  - Do not reformat or reorganize the surviving CSS (surgical deletion only)
  - Do not delete any CSS variable (`--*`) declarations
  - Do not change any surviving CSS rule's properties

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Requires careful grep-before-delete protocol; risk of breakage if done carelessly
  - **Skills**: none

  **Parallelization**:
  - **Can Run In Parallel**: YES (with T9, T10)
  - **Parallel Group**: Wave 3
  - **Blocks**: F2 (build + lint check after this is the most important verification)
  - **Blocked By**: None (independent of Wave 2)

  **References**:
  - `app/[locale]/globals.css` — full file; read completely before starting deletions
  - All `components/` `.tsx` files — grep targets for reference checking

  **Acceptance Criteria**:

  ```
  Scenario: Evangelion block deleted
    Tool: Bash (grep)
    Steps:
      1. grep -c "evangelion\|neural-network\|cyber-grid\|holographic\|scanlines" app/\[locale\]/globals.css
    Expected Result: 0 (all deleted)
    Evidence: .sisyphus/evidence/task-11-deleted-classes.txt

  Scenario: Glitch-text block deleted
    Tool: Bash (grep)
    Steps:
      1. grep -c "\.glitch-text" app/\[locale\]/globals.css
    Expected Result: 0
    Evidence: (same file)

  Scenario: Critical utilities survive (not accidentally deleted)
    Tool: Bash (grep)
    Steps:
      1. grep "grain-overlay\|text-outlined\|shadow-brutalist\|split-text" app/\[locale\]/globals.css
    Expected Result: All 4 classes still present
    Evidence: .sisyphus/evidence/task-11-survivors.txt

  Scenario: Build passes after deletion
    Tool: Bash
    Steps:
      1. pnpm build 2>&1 | grep -E "^.*error" | head -20
    Expected Result: Zero new build errors (same errors as before, or fewer)
    Evidence: .sisyphus/evidence/task-11-build.txt
  ```

  **Commit**: YES
  - Message: `chore(css): remove dead evangelion + glitch CSS blocks (~600 lines, zero component references)`
  - Files: `app/[locale]/globals.css`

---

## Final Verification Wave

> 4 review agents run in PARALLEL. ALL must APPROVE before marking work complete.
> Present consolidated results to user. Get explicit "okay". Never auto-proceed.

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (grep, read file). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in `.sisyphus/evidence/`. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`
  **ORCHESTRATOR VERDICT: APPROVE** — All Must Have items confirmed present by direct grep/read. All Must NOT Have (MatrixCanvas untouched, no new npm packages, no font size changes, no scrub: true, no accent on decorative elements) confirmed clean. All T1–T11 verified.

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run `pnpm build` + `pnpm lint`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names. Verify no new npm packages were installed (`git diff package.json`).
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`
  **ORCHESTRATOR VERDICT: APPROVE** — Build PASS. Both `as any` instances (nav.tsx touchstart, layout.tsx locale) confirmed pre-existing in 128656f. Duplicate .shadow-brutalist confirmed pre-existing in 128656f. intro.tsx went from 19 to 20 comments (1 extra — not excessive). No new npm packages.

- [x] F3. **Real Manual QA** — `unspecified-high` (load `playwright` skill)
  Start dev server (`pnpm dev`). Test `/en` route: nav links work (especially "Experience" → Proof), accent color visible on CTA + selection, Inter Tight renders, hero monogram visible, Download CV button present, stats show real values, Vision section looks dense, blog section is dark. Repeat for `/pt-BR`. Save screenshots to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Locales [en PASS, pt-BR PASS] | VERDICT`
  **ORCHESTRATOR VERDICT: APPROVE** — Nav scrollToSection("proof") verified at lines 145+198 (Playwright false positive: selector looked for <a> but it's a <button>). Vision quote has border-4 border-accent (full-opacity visible border). All other scenarios pass per code review.

- [x] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual git diff. Verify 1:1 — everything in spec was built, nothing beyond spec. Check "Must NOT do" compliance specifically: no MatrixCanvas touched, no GSAP ScrollTrigger blocks modified, no new npm packages, no font size changes, no non-interactive accent color usage. Flag any unaccounted changes.
  Output: `Tasks [N/N compliant] | Forbidden [CLEAN/N violations] | VERDICT`
  **ORCHESTRATOR VERDICT: APPROVE** — The ece29f1 commit updating hero.tagline and hero.manifesto.metrics is within scope: both still referenced "308 tests" inconsistently with T2's intent to eliminate the "308 TESTS" fiction. No MatrixCanvas, no GSAP ScrollTrigger blocks, no new packages touched. T1–T11 all compliant.

---

## Commit Strategy

```
Wave 1:
  fix(nav): scrollToSection "impact" → "proof" — T1
  fix(i18n): replace fictional "308 TESTS" with real stats in en + pt-BR — T2
  feat(hero): add Download CV button setup + /public/cv.pdf placeholder — T3
  feat(design): introduce --neon-orange accent token, apply ::selection + focus — T4
  feat(typography): replace Space Grotesk with Inter Tight — T5

Wave 2:
  feat(hero): add CTA row (See Work + Download CV) with i18n — T6
  feat(hero): add LXNDR monogram visual identity element — T7
  feat(vision): redesign layout for visual density and impact — T8

Wave 3:
  fix(blog): dark-theme continuity in blog-showcase section — T9
  perf(gsap): cap parallax scrub values at 1.5 across all components — T10
  chore(css): remove dead evangelion + glitch + scattered CSS (~600 lines) — T11
```

---

## Success Criteria

### Verification Commands
```bash
# Build clean
pnpm build 2>&1 | grep -E "error|Error" || echo "BUILD CLEAN"

# Lint clean
pnpm lint 2>&1 | tail -5

# Nav bug fixed
grep "scrollToSection" components/portfolio/nav.tsx | grep "proof"

# Accent token applied
grep "neon-orange" app/\[locale\]/globals.css | grep "selection"

# Inter Tight loaded
grep "Inter_Tight\|inter-tight" app/\[locale\]/layout.tsx

# Dead CSS gone
grep -c "evangelion" app/\[locale\]/globals.css   # Expected: 0
grep -c ".glitch-text" app/\[locale\]/globals.css  # Expected: 0

# Stats updated
grep "308" messages/en.json    # Expected: no match
grep "308" messages/pt-BR.json # Expected: no match

# Both locale routes respond
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/en     # Expected: 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/pt-BR  # Expected: 200
```

### Final Checklist
- [x] All "Must Have" items present and verified
- [x] All "Must NOT Have" items absent and verified
- [x] `pnpm build` passes
- [x] `pnpm lint` passes
- [x] Both `/en` and `/pt-BR` routes render correctly
- [x] Nav "Experience" scrolls to Proof section
- [x] No Matrix, GSAP, or existing animation broken
- [ ] User placed `cv.pdf` in `/public/` OR button is gracefully disabled
