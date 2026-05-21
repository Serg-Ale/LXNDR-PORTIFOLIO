# Landing Page Sections Redesign

## TL;DR

> **Quick Summary**: Redesign 3 portfolio landing sections (Skills, Projects, Blog Showcase) with a clear visual hierarchy and a controlled GSAP animation strategy — one clean reveal moment per section, no competing scroll tweens.
>
> **Deliverables**:
> - `components/portfolio/skills.tsx` — redesigned with dominant Core Stack, supporting Architecture/Testing, faded Also Proficient
> - `components/portfolio/proof.tsx` — professional vs personal project visual split
> - `components/portfolio/blog-showcase.tsx` — single staggered entrance, no competing parallaxes
> - Any new sub-components in `components/portfolio/`
> - Translation keys updated in both `messages/en.json` and `messages/pt-BR.json`
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES — 3 independent waves
> **Critical Path**: Task 1 → Task 2 → Task 3 → Final Verification

---

## Context

### Original Request
User wants to change the Skills, Projects, and Blog sections of a portfolio landing page. Main problems: GSAP text doesn't fit the page properly; no storytelling strategy for animations and scroll.

### Interview Summary
**Key Discussions**:
- **Skills**: Redesign layout hierarchy — Core Stack dominant/huge → Architecture/Testing supporting → Also Proficient small/context
- **Projects**: Visual distinction between professional work (Union Audio, Barber App) and personal experiments (Matrix Rain, LightSync, ThinkFlow, Como-Eles-Votaram)
- **Blog**: Keep dark section, fix animation conflicts — one clean staggered entrance only
- **Animation philosophy**: Controlled — ONE clean ScrollTrigger reveal per section. No scrub on content elements. Parallax only on decorative elements.
- **Mobile**: Entrance animations run on mobile, but zero parallax/scrub on `< 768px`
- **New components**: Allowed in `components/portfolio/`

**Research Findings**:
- `SplitTextReveal` owns its own GSAP context + ScrollTrigger internally (confirmed). It must NOT have additional `gsap.from` or `scrub` tweens applied to its root element from the outside.
- All 3 sections currently have competing tweens: entrance `gsap.from` + scrub `gsap.to` on the same element = undefined/conflicting behavior
- Project classification source-of-truth: typed constant in the component file (`PROFESSIONAL_PROJECTS` array of titles)
- Blog section currently has no empty-state guard — `posts.length === 0` would render a broken section
- `data-theme` attributes must be preserved on section root elements

### Metis Review
**Identified Gaps** (addressed):
- Project classification source-of-truth → resolved: typed constant in component
- SplitTextReveal conflict → resolved: keep component, remove outer competing tweens
- Mobile animation strategy → resolved: entrance only, no parallax/scrub below 768px
- Empty posts guard → added to blog task acceptance criteria
- Accessibility: semantic heading order must be preserved in all layout changes
- i18n: any new copy keys must be added to both locale files simultaneously

---

## Work Objectives

### Core Objective
Fix the visual hierarchy and GSAP animation strategy of 3 landing page sections so they feel intentionally designed, narratively coherent, and technically correct.

### Concrete Deliverables
- Redesigned `skills.tsx` with visual hierarchy (Core dominant → Supporting → Context)
- Redesigned `proof.tsx` with professional/personal project split
- Fixed `blog-showcase.tsx` with single-entrance animation
- New sub-components if needed (e.g. `featured-project-card.tsx`, `personal-project-grid.tsx`)

### Definition of Done
- [ ] `pnpm tsc --noEmit` passes with zero errors
- [ ] `pnpm lint` passes with zero errors
- [ ] `pnpm build` completes without error
- [ ] No GSAP console warnings/errors on page load
- [ ] Both EN and PT-BR routes render without missing translation key errors
- [ ] `prefers-reduced-motion` respected: no animations run when OS setting active

### Must Have
- One entrance animation per section, triggered by ScrollTrigger once
- `SplitTextReveal` on section titles NOT fighting with outer GSAP tweens
- Professional project cards visually heavier/larger than personal experiments
- Core Stack (Next.js/React/TypeScript) as the dominant visual element in Skills
- Empty state guard in blog-showcase (0 or 1 posts renders gracefully)
- All existing `gsap.context()` + `ctx.revert()` cleanup patterns maintained
- `prefersReducedMotion()` wrapping ALL new GSAP blocks

### Must NOT Have (Guardrails)
- NO `scrub` on any content element (only allowed on purely decorative/background elements)
- NO competing tweens on the same element (entrance tween + parallax tween on same ref = forbidden)
- NO additional `gsap.from/to` on the root element of `SplitTextReveal` — it owns that element
- NO touching sections outside skills.tsx, proof.tsx, blog-showcase.tsx (and new sub-components)
- NO new npm packages installed
- NO new GSAP plugins (no SplitText, Flip, etc.)
- NO changes to `globals.css` CSS utilities (use existing ones)
- NO `any` TypeScript casts in new code
- NO new translation keys without updating BOTH locale files simultaneously
- NO hardcoded user-visible strings in JSX — all copy via `t()`
- NO index-based identification of professional vs personal projects (use title matching)
- NO changes to MatrixZone, SplitTextReveal, or any shared component

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: NO (no test framework configured)
- **Automated tests**: None
- **Agent-Executed QA**: MANDATORY for all tasks via Playwright browser verification

### QA Policy
All tasks verified by Playwright screenshots at 375px, 768px, and 1280px viewports. Animation verification via console log inspection and DOM state checks.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (All 3 sections are independent — run in parallel):
├── Task 1: Redesign skills.tsx — hierarchy + animation fix [visual-engineering]
├── Task 2: Redesign proof.tsx — professional/personal split + animation fix [visual-engineering]
└── Task 3: Fix blog-showcase.tsx — single entrance, no competing parallaxes [visual-engineering]

Wave FINAL (After ALL tasks):
├── Task F1: Plan compliance + code quality audit (oracle)
├── Task F2: Real visual QA — Playwright screenshots all 3 sections (unspecified-high + playwright)
└── Task F3: TypeScript + lint verification (quick)
```

### Dependency Matrix
- Task 1, 2, 3: No dependencies — fully parallel
- F1, F2, F3: Depend on Tasks 1+2+3 completing

---

## TODOs

- [ ] 1. Redesign `skills.tsx` — Visual hierarchy + controlled animation

  **What to do**:
  - Read `components/portfolio/skills.tsx` fully before touching anything
  - Redesign the 3-tier visual hierarchy:
    - **CORE STACK tier** (Next.js, React, TypeScript): Make these the dominant visual element of the section. Think oversized — these icons + names should be huge, commanding the first read of the section. Cards can be full-width or near-full-width, with the icon and name at a large scale (e.g. icon at `w-16 h-16 md:w-24 md:h-24`, text at `text-3xl md:text-6xl font-black`). These are your identity — they should feel like a statement.
    - **ARCHITECTURE + TESTING tier**: Keep the 2-column grid layout but give each panel more editorial weight — heavier labels, clear panel boundaries with `border-4 border-foreground shadow-brutalist`. The testing metrics (`308 AUTOMATED TESTS`, `98% PASS RATE`) should be prominent inside the testing panel.
    - **ALSO PROFICIENT tier**: This is intentionally the quietest tier — small tags, lower opacity, no animation drama. It reads as context, not claim.
  - Fix GSAP animations — apply the controlled philosophy:
    - **Remove** all `scrub: 1` ScrollTrigger tweens from content elements
    - Each tier gets ONE entrance: `gsap.from(element, { opacity: 0, y: 40, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top bottom-=80", once: true } })`
    - Stagger the 3 tiers with `delay` increments (0, 0.15, 0.3) so they cascade in cleanly
    - Keep the hover lift on Core Stack cards (it's good, not conflicting)
    - Wrap ALL animation code in `if (!prefersReducedMotion()) { ... }` guard
    - On mobile (`window.innerWidth < 768`): skip parallax and scrub, entrance animation still runs
  - Preserve: `id="skills"`, `data-theme="light"`, `SplitTextReveal` on the title (do NOT add outer tweens on the same `h2` element)
  - Preserve: all existing translation keys (`t("title")`, `t("core.label")`, etc.) — no copy changes unless you add a new key that improves the design (then update both locale files)
  - TypeScript: fix the existing `'Icon' cannot be used as a JSX component` error in this file — cast the icon type properly: `const Icon = skill.icon as React.ComponentType<{ className?: string }>`

  **Must NOT do**:
  - Do NOT add `gsap.to(titleRef, { y: ..., scrub: 1 })` — SplitTextReveal owns that element
  - Do NOT install new packages
  - Do NOT use `as any` — fix the icon type properly
  - Do NOT touch `SplitTextReveal` component itself

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: This is a pure frontend visual redesign task requiring design judgment, Tailwind layout skills, and GSAP animation knowledge
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Design direction for the tier hierarchy — how to make Core Stack feel dominant vs the supporting tiers

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2 and 3)
  - **Blocks**: Final verification tasks
  - **Blocked By**: None (can start immediately)

  **References**:
  - `components/portfolio/skills.tsx` — full file to modify
  - `components/shared/split-text-reveal.tsx:20-98` — confirms it owns its own GSAP context; do NOT apply outer tweens to its root element
  - `lib/gsap-config.ts` — `prefersReducedMotion()` utility location
  - `app/[locale]/globals.css` — `.shadow-brutalist`, `.shadow-brutalist-lg`, `.text-outlined` utilities available
  - `messages/en.json:99-113` — existing translation keys for skills section
  - `messages/pt-BR.json` — must update simultaneously with any new i18n keys

  **Acceptance Criteria**:

  - [ ] `pnpm tsc --noEmit` passes with zero errors (including the icon type fix)
  - [ ] `pnpm lint` passes with zero errors
  - [ ] No console errors/warnings related to GSAP on page load

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Core Stack dominance — desktop
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000/en
      2. Scroll to the skills section (#skills)
      3. Take screenshot at 1280px viewport
      4. Verify Core Stack cards are visually larger than architecture tags (DOM: check computed font-size or className contains text-3xl or larger)
    Expected Result: Core Stack cards occupy dominant visual space; architecture/testing panels are clearly secondary; also-proficient tags are faded/small
    Evidence: .sisyphus/evidence/task-1-skills-desktop.png

  Scenario: Mobile entrance animation — no parallax
    Tool: Playwright
    Steps:
      1. Set viewport to 375px width
      2. Navigate to http://localhost:3000/en
      3. Scroll to #skills
      4. Confirm section renders without broken layout or horizontal overflow
      5. Take screenshot
    Expected Result: Section renders cleanly at 375px with no overflow; all tiers readable
    Evidence: .sisyphus/evidence/task-1-skills-mobile.png

  Scenario: Reduced motion — no animations
    Tool: Playwright
    Steps:
      1. Set emulateMedia({ reducedMotion: 'reduce' })
      2. Navigate to http://localhost:3000/en, scroll to #skills
      3. Verify all elements are visible (opacity: 1) without animation
    Expected Result: All skill items visible immediately, no opacity-0 stuck states
    Evidence: .sisyphus/evidence/task-1-skills-reduced-motion.png
  ```

  **Commit**: YES (with Tasks 2 and 3 together)

---

- [ ] 2. Redesign `proof.tsx` — Professional/personal project split + animation fix

  **What to do**:
  - Read `components/portfolio/proof.tsx` fully before touching anything
  - Define a typed constant at the top of the file to classify projects:
    ```typescript
    const PROFESSIONAL_PROJECT_TITLES = ["UNION AUDIO", "BARBER APP"] as const
    type ProfessionalTitle = typeof PROFESSIONAL_PROJECT_TITLES[number]
    const isProfessional = (title: string): boolean =>
      PROFESSIONAL_PROJECT_TITLES.includes(title as ProfessionalTitle)
    ```
  - **Layout redesign — 2 visual tiers**:
    - **Professional projects** (Union Audio, Barber App): Featured treatment. Each gets a larger card with more visual weight. Consider a wider layout — e.g. full-width card with a heavier left accent (`border-l-8 border-l-foreground` or a colored left bar using `border-l-purple`), larger project title (`text-4xl md:text-6xl`), and the tagline prominently below. The project number badge can be hidden or deprioritized. Keep the tech stack tags and link. These 2 cards should feel like "the work that matters most."
    - **Personal experiments** (Matrix Rain, LightSync, ThinkFlow, Como-Eles-Votaram): Secondary treatment. A 2-column grid (`grid-cols-1 md:grid-cols-2`) with smaller, denser cards. Project number is prominent (the numbering is editorial and good). Smaller title (`text-2xl md:text-3xl`), tagline at normal size. Same border style but lighter shadow (`shadow-brutalist` not `shadow-brutalist-lg`). These cards feel like "experiments from a restless builder."
    - Add a visual separator/label between the two tiers — a small uppercase label like `PROFESSIONAL WORK` / `PERSONAL EXPERIMENTS` as section dividers (add translation keys for these labels)
  - Fix GSAP animations — apply controlled philosophy:
    - **Remove** all 4 competing tweens per card (3D tilt is OK to keep — it's a hover effect not a scroll effect, and it doesn't conflict)
    - **Remove** the `scrub:1` parallax per card (this is the main culprit)
    - **Remove** the scale-down exit tween
    - Keep only: entrance animation per card with stagger
    - Entrance: `gsap.from(cards, { opacity: 0, y: 60, stagger: 0.1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: firstCard, start: "top bottom-=80", once: true } })`
    - Professional cards and personal cards get separate staggered entrances (professional first, then personal)
    - Wrap ALL animation in `prefersReducedMotion()` guard
    - On mobile: entrance animation only, no 3D tilt (touch devices don't have mouse events but also no need to explicitly disable — mousemove/mouseleave won't fire)
  - If the featured professional card layout is complex enough, extract it to `components/portfolio/featured-project-card.tsx` (named export). This is encouraged if the JSX exceeds ~40 lines for just the card.
  - Preserve: `id="proof"`, `data-theme="light"`, `SplitTextReveal` on title, all project data from translations

  **Must NOT do**:
  - Do NOT change the 6 project entries — only reclassify/restyle them
  - Do NOT add `scrub` on content elements
  - Do NOT apply outer tweens to the `SplitTextReveal` title element
  - Do NOT install new packages

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Layout design work — creating two distinct card treatments within the same section requires design judgment
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Guidance on how to create visual hierarchy between "featured" and "secondary" cards

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1 and 3)
  - **Blocks**: Final verification tasks
  - **Blocked By**: None (can start immediately)

  **References**:
  - `components/portfolio/proof.tsx` — full file to modify
  - `messages/en.json:114-153` — proof section project data and existing keys
  - `messages/pt-BR.json` — update simultaneously when adding new label keys
  - `app/[locale]/globals.css:522-530` — `.border-l-purple` utility available
  - `components/shared/split-text-reveal.tsx:59-73` — confirms SplitTextReveal owns ScrollTrigger; no outer tweens on same element

  **Acceptance Criteria**:

  - [ ] `pnpm tsc --noEmit` passes
  - [ ] `pnpm lint` passes
  - [ ] Professional projects (Union Audio, Barber App) render with larger/heavier card treatment
  - [ ] Personal experiments render in 2-column grid with lighter cards
  - [ ] "VIEW LIVE" links still navigate correctly (regression check)
  - [ ] 3D tilt still works on hover for professional cards

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Professional vs personal visual distinction — desktop
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000/en
      2. Scroll to #proof section
      3. Take full screenshot of section at 1280px
      4. Verify "UNION AUDIO" and "BARBER APP" cards have heavier visual weight than "MATRIX RAIN" grid
    Expected Result: Two distinct visual tiers visible — featured professional cards above, compact personal grid below
    Evidence: .sisyphus/evidence/task-2-proof-desktop.png

  Scenario: PROJECT LINK navigation
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000/en
      2. Scroll to #proof
      3. Find the "UNION AUDIO" card "VIEW LIVE" link
      4. Check that href="https://www.unionaudio.com.br"
    Expected Result: Link href is correct (not broken by layout change)
    Evidence: .sisyphus/evidence/task-2-proof-link-check.png

  Scenario: Mobile 2-column grid
    Tool: Playwright
    Steps:
      1. Set viewport to 375px
      2. Navigate to http://localhost:3000/en, scroll to #proof
      3. Confirm personal experiments grid collapses to 1-column on mobile
      4. No horizontal overflow
    Expected Result: Single column on mobile, no overflow
    Evidence: .sisyphus/evidence/task-2-proof-mobile.png
  ```

  **Commit**: YES (with Tasks 1 and 3 together)

---

- [ ] 3. Fix `blog-showcase.tsx` — Single staggered entrance, no competing parallaxes

  **What to do**:
  - Read `components/portfolio/blog-showcase.tsx` fully before touching anything
  - **Fix animation conflicts** — this is the primary task:
    - Remove `gsap.from(titleRef.current, { opacity: 0, y: 100 ... })` — the title uses `SplitTextReveal` which owns that element. This outer tween is the conflict.
    - Remove `gsap.to(titleRef.current, { y: -50, scrub: 1 ... })` — competing parallax on title.
    - Remove `gsap.to(card, { y: -60 * speed, scrub: 1 ... })` per card — competing parallax on cards.
    - Remove `gsap.to(ctaRef.current, { y: -30, scrub: 1 ... })` — competing parallax on CTA.
    - Keep: `gsap.from(cardsRef.current, { opacity: 0, y: 80, scale: 0.95, stagger: 0.2 ... })` but move the ScrollTrigger to `once: true`
    - Keep: `gsap.from(ctaRef.current, { opacity: 0, scale: 0.9 ... })` entrance, update to `once: true`
    - Final animation: ONE staggered entrance that reveals [cards, CTA] as you scroll into section. Clean. Done. No scrub.
  - **Add empty state guard**:
    ```tsx
    if (posts.length === 0) {
      return null // or a minimal placeholder — section doesn't render if no posts
    }
    ```
    (This is a critical bug fix — if no posts are available, the section currently renders broken)
  - **Single post guard**: if `posts.length === 1`, the 2-column grid should show the single card at full-width (not half-width with an empty slot). Use `grid-cols-1` when only 1 post, `md:grid-cols-2` when 2.
  - Preserve: `id="blog"`, `data-theme="dark"`, `bg-foreground text-background`, grain overlay, `SplitTextReveal` on title
  - On mobile: entrance animations still run; the already-removed scrubs mean mobile is already clean after this fix
  - TypeScript: no new types needed here, but remove the `titleRef` if it's no longer used after removing the outer title tweens

  **Must NOT do**:
  - Do NOT apply outer tweens to the `SplitTextReveal` h2 element
  - Do NOT add scrub back
  - Do NOT change the dark section styling or grain overlay
  - Do NOT touch `BlogCard` component

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Animation fix + defensive coding (empty state) on a styled section
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1 and 2)
  - **Blocks**: Final verification tasks
  - **Blocked By**: None (can start immediately)

  **References**:
  - `components/portfolio/blog-showcase.tsx` — full file to modify
  - `components/shared/split-text-reveal.tsx:59-73` — SplitTextReveal with `triggerOnScroll=true` owns a ScrollTrigger on its root element. Line 68-73 shows the ScrollTrigger config. Do NOT add outer tweens on same element.
  - `app/[locale]/page.tsx:62-63` — how posts are fetched and passed as props (max 2)

  **Acceptance Criteria**:

  - [ ] `pnpm tsc --noEmit` passes with zero errors
  - [ ] `pnpm lint` passes
  - [ ] Section renders correctly with 0 posts (no crash — returns null or placeholder)
  - [ ] Section renders correctly with 1 post (full-width card, no empty slot)
  - [ ] Section renders correctly with 2 posts (2-column grid)
  - [ ] No GSAP console warnings on page load

  **QA Scenarios (MANDATORY)**:

  ```
  Scenario: Blog section dark render — desktop
    Tool: Playwright
    Steps:
      1. Navigate to http://localhost:3000/en
      2. Scroll to #blog section
      3. Take screenshot at 1280px viewport
      4. Verify dark background (bg-foreground), grain overlay visible, cards rendering
    Expected Result: Dark inverted section renders correctly with staggered card entrance
    Evidence: .sisyphus/evidence/task-3-blog-desktop.png

  Scenario: Blog section — mobile render
    Tool: Playwright
    Steps:
      1. Set viewport to 375px
      2. Navigate to http://localhost:3000/en, scroll to #blog
      3. Verify cards stack to single column, no overflow
    Expected Result: Single column cards, no layout breakage at 375px
    Evidence: .sisyphus/evidence/task-3-blog-mobile.png

  Scenario: Verify no competing GSAP on title
    Tool: Playwright (console monitoring)
    Steps:
      1. Navigate to http://localhost:3000/en with browser console open
      2. Scroll through blog section
      3. Confirm zero GSAP-related console errors or warnings
    Expected Result: Console clean of GSAP errors
    Evidence: .sisyphus/evidence/task-3-blog-console.png
  ```

  **Commit**: YES (with Tasks 1 and 2 together)

---

> 3 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [ ] F1. **Plan Compliance + Code Quality Audit** — `oracle`
  Read skills.tsx, proof.tsx, blog-showcase.tsx post-changes. Verify: no competing tweens on same element (grep for same ref used in both gsap.from AND gsap.to with scrub). Verify `prefersReducedMotion()` wraps all animation blocks. Verify `data-theme` attributes preserved. Verify no `any` types. Verify `ctx.revert()` called in all useEffect cleanups.
  Output: `Guardrails [N/N pass] | TypeScript [CLEAN/issues] | GSAP patterns [CLEAN/issues] | VERDICT`

- [ ] F2. **Visual QA** — `unspecified-high` + playwright skill
  Use Playwright to: navigate to `http://localhost:3000/en`, take full-page screenshot, scroll through all 3 sections at 375px, 768px, 1280px viewports. Check Core Stack renders visually dominant vs Architecture/Testing tags. Check professional project cards are visually distinct from personal experiments. Check blog section dark background renders with grain overlay. Verify no layout overflow on any viewport.
  Output: `Viewports [3/3 checked] | Sections [3/3 rendering] | VERDICT`

- [ ] F3. **TypeScript + Lint** — `quick`
  Run `pnpm tsc --noEmit` and `pnpm lint` in the project root. Report any errors.
  Output: `tsc [PASS/FAIL N errors] | lint [PASS/FAIL N errors] | VERDICT`

---

## Commit Strategy

- **All 3 sections**: `feat(portfolio): redesign skills, projects, blog sections with controlled GSAP animation strategy`
- Files: `components/portfolio/skills.tsx`, `components/portfolio/proof.tsx`, `components/portfolio/blog-showcase.tsx`, any new sub-components, `messages/en.json`, `messages/pt-BR.json`
- Pre-commit: `pnpm tsc --noEmit && pnpm lint`

---

## Success Criteria

### Verification Commands
```bash
pnpm tsc --noEmit    # Expected: no output (zero errors)
pnpm lint            # Expected: no errors
pnpm build           # Expected: ✓ Compiled successfully
```

### Final Checklist
- [ ] Skills section: Core Stack visually dominant, 3 tiers of hierarchy
- [ ] Projects section: Professional cards visually heavier than personal experiments
- [ ] Blog section: Single staggered entrance, no competing parallaxes
- [ ] All sections: SplitTextReveal not fighting outer GSAP tweens
- [ ] All sections: Mobile entrance-only animations (no scrub/parallax below 768px)
- [ ] Both locale routes render without errors
- [ ] `pnpm tsc --noEmit` passes
- [ ] `pnpm lint` passes
