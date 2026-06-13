# Site Repositioning — Essays & Laboratory First

## TL;DR
> **Summary**: Reposition the site from a portfolio-first landing page into an editorial hub centered on essays, systems, experiments, and thought. Reuse the existing Next.js + MDX infrastructure, but change the information architecture, navigation, content model, homepage narrative, and SEO so `/ensaios` becomes the primary publishing surface and `/blog` becomes a redirect.
> **Deliverables**:
> - Editorial-first homepage at `app/[locale]/page.tsx`
> - New route surfaces for `/sobre`, `/projetos`, `/ensaios`, `/laboratorio`, `/contato`
> - Distinct editorial content model for `ensaios` vs `laboratorio`
> - PT-BR-first publication support without mandatory English pair
> - Redirect strategy from `/blog/*` to `/ensaios/*`
> - First launch with 4 curated essays only
> **Effort**: Large
> **Parallel**: YES - 3 waves
> **Critical Path**: Task 1 → Task 2 → Task 3 → Task 4/5/6 → Task 7/8 → F1-F4

## Context
### Original Request
The site should stop being mainly a hiring/portfolio artifact and become a place that proves how the author thinks, writes, builds, analyzes, and turns ideas into real things. The desired direction is a stronger authorial/editorial identity, with essays, rants, analysis, and a “laboratory” space for experiments.

### Interview Summary
- Home becomes an editorial hub for “ensaios, sistemas e experimentos”
- Primary top-level IA: `/`, `/sobre`, `/projetos`, `/ensaios/*`, `/laboratorio/*`, `/contato`
- `projetos` remains important but secondary to essays/laboratory
- `sobre` and `contato` become dedicated pages, not home anchors
- Essays use a new `/ensaios` section; existing `/blog` routes must redirect to `/ensaios`
- `laboratorio` is a distinct section, not just a tag cloud
- Essays and laboratory are different content types:
  - `ensaios`: long-form, authorial, analytical texts
  - `laboratorio`: experiments, automations, technology explorations, music, in-progress ideas
- PT-BR-first publishing is allowed without an English counterpart
- No new formal testing framework in this phase
- Initial content migration publishes only the 4 curated final essays

### Metis Review (gaps addressed)
- Resolved: `/blog` does not coexist as a primary section; it redirects to `/ensaios`
- Resolved: `ensaios` and `laboratorio` require distinct content typing, not one undifferentiated “blog” bucket
- Guardrail added: route-based navigation must replace anchor-dependent navigation before new routes become primary
- Guardrail added: `pnpm tsc --noEmit` is the primary correctness gate because `next.config.mjs` currently ignores build TypeScript errors
- Guardrail added: do not refactor unrelated GSAP-heavy portfolio sections unless they are explicitly reused on new pages

## Work Objectives
### Core Objective
Transform the existing portfolio site into an editorial-first product that showcases thought, essays, experiments, and systems-building while preserving projects as proof rather than the main narrative.

### Deliverables
- Editorial homepage rewrite in `app/[locale]/page.tsx`
- New route pages:
  - `app/[locale]/sobre/page.tsx`
  - `app/[locale]/projetos/page.tsx`
  - `app/[locale]/ensaios/page.tsx`
  - `app/[locale]/ensaios/[slug]/page.tsx`
  - `app/[locale]/laboratorio/page.tsx`
  - `app/[locale]/contato/page.tsx`
- Redirect implementation from `/blog` and `/blog/[slug]` to `/ensaios` and `/ensaios/[slug]`
- Updated content pipeline supporting content type discrimination and PT-BR-only entries
- Updated navigation and metadata/SEO/sitemap aligned with the new IA
- Four curated essay entries prepared under the chosen essay content model

### Definition of Done (verifiable conditions with commands)
- [ ] `pnpm tsc --noEmit` exits 0
- [ ] `pnpm lint` exits 0
- [ ] `pnpm build` exits 0
- [ ] `curl -I http://localhost:3000/pt-BR/blog` returns redirect status to `/pt-BR/ensaios`
- [ ] `curl -I http://localhost:3000/pt-BR/blog/<essay-slug>` returns redirect status to `/pt-BR/ensaios/<essay-slug>`
- [ ] `curl -o /dev/null -s -w "%{http_code}" http://localhost:3000/pt-BR/ensaios` returns `200`
- [ ] `curl -o /dev/null -s -w "%{http_code}" http://localhost:3000/pt-BR/laboratorio` returns `200`
- [ ] `curl -o /dev/null -s -w "%{http_code}" http://localhost:3000/pt-BR/sobre` returns `200`
- [ ] `curl -o /dev/null -s -w "%{http_code}" http://localhost:3000/pt-BR/projetos` returns `200`
- [ ] `curl -o /dev/null -s -w "%{http_code}" http://localhost:3000/pt-BR/contato` returns `200`
- [ ] `curl -o /dev/null -s -w "%{http_code}" http://localhost:3000/en/ensaios/<ptbr-only-slug>` does **not** return `404`
- [ ] `curl -s http://localhost:3000/pt-BR/ensaios/<essay-slug> | grep 'og:title'` returns non-empty output

### Must Have
- Essays-first homepage narrative
- Route-based primary navigation
- Distinct editorial content typing for `ensaios` and `laboratorio`
- PT-BR-first publication support without mandatory EN mirror file
- `/blog` redirect coverage in routing and sitemap behavior
- Reuse existing MDX renderer and blog shell patterns where appropriate
- `sobre`, `projetos`, `contato` as dedicated destinations
- Initial publication scope limited to the 4 curated final essays

### Must NOT Have (guardrails, AI slop patterns, scope boundaries)
- Must NOT add Jest, Vitest, Cypress, or a new test framework
- Must NOT rewrite GSAP systems in unrelated portfolio components
- Must NOT keep anchor-scroll navigation as the primary interaction model
- Must NOT leave `ensaios` and `laboratorio` sharing an undifferentiated content bucket
- Must NOT depend on `pnpm build` alone as correctness proof because `ignoreBuildErrors: true` exists in `next.config.mjs:6-13`
- Must NOT migrate duplicate/source-of-truth text files into public content; publish only the 4 curated final versions
- Must NOT localize pathnames (`/essays` vs `/ensaios`) in this phase; keep route segments aligned to the chosen IA (`/ensaios`, `/laboratorio`, `/sobre`, `/projetos`, `/contato`) across locales unless explicitly revisited later
- Must NOT remove existing projects; demote and reorganize them instead

## Verification Strategy
> ZERO HUMAN INTERVENTION - all verification is agent-executed.
- Test decision: **tests-after / no new test infra** using `pnpm tsc --noEmit`, `pnpm lint`, `pnpm build`, HTTP verification with Bash/curl, and browser QA via Playwright
- QA policy: Every task below includes at least one happy-path and one failure/edge-path scenario
- Evidence: `.sisyphus/evidence/task-{N}-{slug}.{ext}`

## Execution Strategy
### Parallel Execution Waves
> Target: 5-8 tasks per wave. <3 per wave (except final) = under-splitting.
> Extract shared dependencies as Wave-1 tasks for max parallelism.

Wave 1: content model + routing foundation + IA shell
- Task 1 — Extend content schema and filesystem rules
- Task 2 — Refactor content loaders for type filtering and locale fallback
- Task 3 — Replace anchor navigation with route navigation

Wave 2: route surfaces and product narrative
- Task 4 — Build `/ensaios` index and detail routes from existing blog patterns
- Task 5 — Build `/laboratorio`, `/sobre`, `/projetos`, `/contato` pages
- Task 6 — Rewrite homepage as editorial hub and demote portfolio proof

Wave 3: migration, SEO, publication surface
- Task 7 — Add redirects, metadata, sitemap, and site identity updates
- Task 8 — Migrate the 4 curated essays and prepare the launch editorial set

### Dependency Matrix (full, all tasks)
- Task 1: no blockers
- Task 2: blocked by Task 1
- Task 3: no blockers
- Task 4: blocked by Task 2 and Task 3
- Task 5: blocked by Task 3
- Task 6: blocked by Task 3 and informed by Task 5
- Task 7: blocked by Tasks 4, 5, 6
- Task 8: blocked by Tasks 1, 2, 4, 7
- F1-F4: blocked by Tasks 1-8

### Agent Dispatch Summary (wave → task count → categories)
- Wave 1 → 3 tasks → `unspecified-high`, `deep`, `visual-engineering`
- Wave 2 → 3 tasks → `deep`, `visual-engineering`, `unspecified-high`
- Wave 3 → 2 tasks → `unspecified-high`, `writing`
- Final Verification → 4 tasks → `oracle`, `unspecified-high`, `unspecified-high`, `deep`

## TODOs
> Implementation + Test = ONE task. Never separate.
> EVERY task MUST have: Agent Profile + Parallelization + QA Scenarios.

- [ ] 1. Extend the editorial content model and repository rules

  **What to do**: Update the MDX content contract so entries can be classified as `essay` or `lab`, support PT-BR-first publication, and reconcile the current schema drift around `draft`. Keep the filesystem model simple and explicit: use separate top-level content roots for essays and lab content (`content/essays/`, `content/laboratory/`) rather than overloading `content/posts/` with an ambiguous mixed taxonomy. Update related types and README documentation so the code and docs agree.
  **Must NOT do**: Do not add a CMS, database, or remote content source. Do not introduce localized pathname config in `i18n/routing.ts`. Do not change existing tutorial post content yet.

  **Recommended Agent Profile**:
  - Category: `deep` - Reason: this task defines the durable content architecture the rest of the plan depends on
  - Skills: []
  - Omitted: [`frontend-ui-ux`] - not a visual task

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: 2, 8 | Blocked By: none

  **References**:
  - Pattern: `lib/blog/types.ts:1-16` - current frontmatter/post contracts; missing `draft` and any type discriminator
  - Pattern: `content/README.md:1-68` - current documented assumptions require both locales and only `posts`/`drafts`
  - Pattern: `lib/blog/get-posts.ts:10-24` - existing hard-coded content roots and draft handling
  - API/Type: `lib/blog/types.ts:1-11` - update source-of-truth types first

  **Acceptance Criteria**:
  - [ ] `lib/blog/types.ts` includes explicit fields required by the new editorial model
  - [ ] Content docs explain PT-BR-first publication and distinct essay/laboratory content roots
  - [ ] No code references a content type that is undocumented
  - [ ] `pnpm tsc --noEmit` passes

  **QA Scenarios**:
  ```
  Scenario: Schema compiles after content-model update
    Tool: Bash
    Steps: Run `pnpm tsc --noEmit`
    Expected: Exit code 0 with no type errors from `lib/blog/*`
    Evidence: .sisyphus/evidence/task-1-typecheck.txt

  Scenario: Documentation no longer claims bilingual pair is mandatory
    Tool: Bash
    Steps: Search `content/README.md` for language rules and inspect that PT-BR-first publication is documented without requiring `index.en.mdx`
    Expected: README reflects the new rule and no longer states that every essay must have both versions before publication
    Evidence: .sisyphus/evidence/task-1-content-readme.txt
  ```

  **Commit**: YES | Message: `feat(content): define editorial content model` | Files: `lib/blog/types.ts`, `content/README.md`, related content docs

- [ ] 2. Refactor loaders for essay/lab filtering and PT-BR fallback

  **What to do**: Refactor the current content loading layer to support separate retrieval for essays and lab entries, plus locale fallback behavior that prevents EN requests for PT-BR-only essays from 404ing. Preserve the existing MDX parsing/highlighting approach. Introduce clear helper functions for all essay listings, all lab listings, and single-entry lookup with locale fallback metadata.
  **Must NOT do**: Do not duplicate the parser. Do not keep `getPostBySlug` silently searching drafts in production without intentional rules. Do not implement an opaque fallback that hides locale provenance.

  **Recommended Agent Profile**:
  - Category: `deep` - Reason: core content pipeline logic with edge-case handling
  - Skills: []
  - Omitted: [`frontend-ui-ux`] - no UI work

  **Parallelization**: Can Parallel: NO | Wave 1 | Blocks: 4, 8 | Blocked By: 1

  **References**:
  - Pattern: `lib/blog/get-posts.ts:13-62` - current list loading behavior
  - Pattern: `lib/blog/get-posts.ts:64-96` - current per-slug lookup returns `null` when locale file is absent
  - Pattern: `app/[locale]/blog/[slug]/page.tsx:22-34` - static params currently built from locale-specific listings
  - Pattern: `content/README.md:61-68` - outdated bilingual assumptions to replace in code behavior

  **Acceptance Criteria**:
  - [ ] There are dedicated helpers for essay listing, lab listing, and single-entry retrieval
  - [ ] EN requests for PT-BR-only essays resolve to content or explicit fallback behavior, not `404`
  - [ ] Draft visibility rules are explicit and environment-safe
  - [ ] `pnpm tsc --noEmit` passes

  **QA Scenarios**:
  ```
  Scenario: PT-BR-only essay resolves from EN route
    Tool: Bash
    Steps: Start dev server, request `http://localhost:3000/en/ensaios/<ptbr-only-slug>`
    Expected: HTTP status is not 404 and the page indicates or serves the PT-BR content correctly
    Evidence: .sisyphus/evidence/task-2-en-fallback.txt

  Scenario: Missing slug still fails cleanly
    Tool: Bash
    Steps: Request `http://localhost:3000/pt-BR/ensaios/slug-inexistente-prometheus-check`
    Expected: HTTP status is 404
    Evidence: .sisyphus/evidence/task-2-missing-slug.txt
  ```

  **Commit**: YES | Message: `feat(content): add editorial loaders and locale fallback` | Files: `lib/blog/get-posts.ts`, `lib/blog/server.ts`, supporting types/helpers

- [ ] 3. Replace portfolio anchor navigation with route-first navigation

  **What to do**: Redesign `PortfolioNav` so the primary navigation uses real routes for home, essays, laboratory, projects, about, and contact. Remove the home-only anchor assumptions and ensure the component works consistently across all route surfaces, including mobile. Preserve locale switching and theme toggling.
  **Must NOT do**: Do not keep `document.getElementById()` or `window.location.href = /#anchor` behavior for primary destinations. Do not leave `/blog` in the main nav.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` - Reason: navigation refactor touches behavior and UI across the entire experience
  - Skills: [`frontend-ui-ux`] - route navigation must remain legible and intentional across desktop/mobile
  - Omitted: []

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: 4, 5, 6 | Blocked By: none

  **References**:
  - Pattern: `components/portfolio/nav.tsx:14-235` - current nav mixes route link to `/blog` with anchor scroll buttons
  - Pattern: `components/shared/language-switcher.tsx` - preserve locale switching behavior
  - API/Type: `i18n/routing.ts:4-11` - current navigation helpers already exist
  - Pattern: `app/[locale]/page.tsx:128-170` - current home assumes nav drives on-page sections

  **Acceptance Criteria**:
  - [ ] Desktop and mobile nav expose route links for all top-level destinations
  - [ ] No primary nav action relies on missing section anchors
  - [ ] `/blog` is absent from the primary nav
  - [ ] `pnpm tsc --noEmit` and `pnpm lint` pass

  **QA Scenarios**:
  ```
  Scenario: Desktop nav reaches all destinations
    Tool: Playwright
    Steps: Open `http://localhost:3000/pt-BR`, click each primary nav item, verify resulting pathname
    Expected: Home, Ensaios, Laboratório, Projetos, Sobre, Contato each load their own route successfully
    Evidence: .sisyphus/evidence/task-3-nav-desktop.png

  Scenario: Mobile nav no longer depends on anchors
    Tool: Playwright
    Steps: Open mobile viewport, navigate to `/pt-BR/ensaios`, open menu, click `Contato`
    Expected: App navigates to `/pt-BR/contato` rather than attempting same-page scroll behavior
    Evidence: .sisyphus/evidence/task-3-nav-mobile.png
  ```

  **Commit**: YES | Message: `refactor(nav): move to route-first information architecture` | Files: `components/portfolio/nav.tsx`, related nav translation keys

- [ ] 4. Build the `/ensaios` index and article experience from the current blog engine

  **What to do**: Create the new `/ensaios` index and `[slug]` article routes by reusing the working blog patterns, but rename all user-facing semantics to essays. The index must list essay entries only. The detail route must support metadata, related entries, locale fallback behavior, and a narrative shell appropriate for essays rather than tutorials. Keep the existing MDX render pipeline and article container patterns.
  **Must NOT do**: Do not break article SEO metadata. Do not retain canonical URLs under `/blog`. Do not show lab entries in essay listings.

  **Recommended Agent Profile**:
  - Category: `deep` - Reason: route creation, metadata, static params, and content loading all intersect here
  - Skills: []
  - Omitted: [`frontend-ui-ux`] - reuse existing patterns rather than redesigning every article component from scratch

  **Parallelization**: Can Parallel: NO | Wave 2 | Blocks: 7, 8 | Blocked By: 2, 3

  **References**:
  - Pattern: `app/[locale]/blog/page.tsx:13-77` - index route metadata and listing structure
  - Pattern: `app/[locale]/blog/[slug]/page.tsx:22-182` - static params, metadata, schema, article shell
  - Pattern: `components/blog/blog-page-client.tsx:19-157` - current listing client logic if reused or forked
  - Pattern: `components/blog/blog-post-header.tsx`, `blog-post-content.tsx`, `blog-related-posts.tsx` - reusable article presentation pieces
  - API/Type: `lib/constants.ts:1-6` - site-level descriptive constants likely need essay-specific replacements

  **Acceptance Criteria**:
  - [ ] `/pt-BR/ensaios` returns 200 and lists essays only
  - [ ] `/pt-BR/ensaios/<slug>` returns 200 with valid article metadata
  - [ ] Canonical/alternate URLs point to `/ensaios`, not `/blog`
  - [ ] `pnpm tsc --noEmit`, `pnpm lint`, and essay route curl checks pass

  **QA Scenarios**:
  ```
  Scenario: Essays index renders correctly
    Tool: Bash
    Steps: Request `http://localhost:3000/pt-BR/ensaios`
    Expected: HTTP 200 and response contains the essays section heading
    Evidence: .sisyphus/evidence/task-4-essays-index.txt

  Scenario: Essay detail has correct metadata path
    Tool: Bash
    Steps: Request `http://localhost:3000/pt-BR/ensaios/<essay-slug>` and grep for `og:title` and `/pt-BR/ensaios/<essay-slug>`
    Expected: Both are present; `/blog/<slug>` is absent from canonical metadata
    Evidence: .sisyphus/evidence/task-4-essay-metadata.txt
  ```

  **Commit**: YES | Message: `feat(essays): create editorial routes from blog engine` | Files: `app/[locale]/ensaios/**`, essay-aware listing/detail components if needed

- [ ] 5. Create dedicated pages for laboratório, sobre, projetos, and contato

  **What to do**: Build the four fixed-route surfaces required by the new IA. Reuse and adapt existing portfolio components only where they are already semantically aligned: `PortfolioAbout`, `PortfolioOrigin`, and `PortfolioJourney` can inform `/sobre`; `PortfolioProof` and/or `PortfolioProjects` can inform `/projetos`; `PortfolioContact` or `PortfolioConnect` should be consolidated into one clear `/contato` page. `/laboratorio` should launch as a real section shell with distinct messaging even if no lab entries are published in the first wave.
  **Must NOT do**: Do not leave these destinations as thin redirects back to home anchors. Do not merge `ensaios` and `laboratorio` presentation into one page. Do not keep both contact component styles live without choosing a canonical route presentation.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` - Reason: this is mostly page composition and content framing using existing components
  - Skills: [`frontend-ui-ux`] - to keep the new fixed pages coherent with the editorial repositioning
  - Omitted: []

  **Parallelization**: Can Parallel: YES | Wave 2 | Blocks: 7 | Blocked By: 3

  **References**:
  - Pattern: `components/portfolio/about.tsx:12-143` - reusable about narrative block
  - Pattern: `components/portfolio/origin.tsx:12-208` - background/origin storytelling
  - Pattern: `components/portfolio/journey.tsx:20-232` - timeline narrative for about page
  - Pattern: `components/portfolio/proof.tsx:20-174` and `components/portfolio/projects.tsx:10-108` - project/proof framing
  - Pattern: `components/portfolio/contact.tsx:10-105` and `components/portfolio/connect.tsx:31-265` - choose one contact direction and unify

  **Acceptance Criteria**:
  - [ ] `/pt-BR/laboratorio`, `/pt-BR/sobre`, `/pt-BR/projetos`, `/pt-BR/contato` each return 200
  - [ ] Each page has route-specific heading/metadata and does not depend on home-only anchors
  - [ ] Contact page exposes canonical contact actions once, not duplicated across competing components
  - [ ] `pnpm tsc --noEmit` passes

  **QA Scenarios**:
  ```
  Scenario: Fixed pages exist and render
    Tool: Bash
    Steps: Curl `/pt-BR/laboratorio`, `/pt-BR/sobre`, `/pt-BR/projetos`, `/pt-BR/contato`
    Expected: All return HTTP 200
    Evidence: .sisyphus/evidence/task-5-fixed-pages.txt

  Scenario: Laboratório launches without published lab posts
    Tool: Playwright
    Steps: Open `/pt-BR/laboratorio` before any lab entries are added
    Expected: Page shows intentional empty-state or framing copy, not a broken or blank listing
    Evidence: .sisyphus/evidence/task-5-lab-empty-state.png
  ```

  **Commit**: YES | Message: `feat(routes): add dedicated editorial support pages` | Files: `app/[locale]/laboratorio/page.tsx`, `sobre/page.tsx`, `projetos/page.tsx`, `contato/page.tsx`, reused supporting components

- [ ] 6. Rewrite the locale home page as an editorial hub

  **What to do**: Replace the current portfolio-first composition on `app/[locale]/page.tsx` with an editorial hub that introduces the site as a place for essays, systems, experiments, and real-world proof. The home should foreground the latest/featured essays, establish the positioning statement, preview the lab and projects sections, and keep projects/proof secondary. Reuse current narrative sections selectively instead of preserving the entire scroll-story stack.
  **Must NOT do**: Do not keep the old long-scrolling section stack as the primary home experience. Do not leave “Full-Stack Software Engineer portfolio” as the homepage message or schema identity.

  **Recommended Agent Profile**:
  - Category: `visual-engineering` - Reason: this is the central product/narrative composition task
  - Skills: [`frontend-ui-ux`] - homepage hierarchy is the heart of the repositioning
  - Omitted: []

  **Parallelization**: Can Parallel: NO | Wave 2 | Blocks: 7 | Blocked By: 3, 5

  **References**:
  - Pattern: `app/[locale]/page.tsx:22-173` - current home metadata, schema, and composition to replace
  - Pattern: `components/portfolio/manifesto.tsx`, `origin.tsx`, `vision.tsx` - existing editorial-toned components that may be selectively reused
  - Pattern: `components/portfolio/blog-showcase.tsx` - current editorial teaser concept, but now subordinate to `/ensaios`
  - Pattern: `app/[locale]/blog/page.tsx:50-75` - existing content-loading pattern for recent entries

  **Acceptance Criteria**:
  - [ ] Homepage headline and metadata align with editorial identity, not portfolio identity
  - [ ] Homepage includes an essay-forward section and secondary previews for projects/laboratory
  - [ ] Homepage works with the new route-based nav and no longer depends on section-progress IDs for core navigation
  - [ ] `pnpm tsc --noEmit`, `pnpm lint`, and home-page browser QA pass

  **QA Scenarios**:
  ```
  Scenario: Editorial home loads with correct hierarchy
    Tool: Playwright
    Steps: Open `http://localhost:3000/pt-BR`, capture above-the-fold screenshot, inspect hero/headline text and first card block
    Expected: Essays/editorial identity is primary; projects are visibly secondary
    Evidence: .sisyphus/evidence/task-6-home-editorial.png

  Scenario: Home metadata no longer describes a portfolio site
    Tool: Bash
    Steps: Request `http://localhost:3000/pt-BR` and inspect title/description-related output or rendered HTML
    Expected: Portfolio-first title/description strings are gone
    Evidence: .sisyphus/evidence/task-6-home-metadata.txt
  ```

  **Commit**: YES | Message: `feat(home): reposition root as editorial hub` | Files: `app/[locale]/page.tsx`, reused/added home components, relevant translation keys

- [ ] 7. Update redirects, metadata, sitemap, and site identity for the new IA

  **What to do**: Implement redirect behavior from `/blog` to `/ensaios`, update sitemap generation to include the new sections, and revise site-wide metadata/open graph strings away from “portfolio” language. Ensure canonical URLs and alternates align with the new editorial paths. Keep the global layout and constants consistent with the repositioned product identity.
  **Must NOT do**: Do not leave stale `/blog` URLs in sitemap, metadata, or navigation. Do not leave `LXNDR Portfolio` as the site name on essay-first routes unless intentionally retained as brand naming.

  **Recommended Agent Profile**:
  - Category: `unspecified-high` - Reason: this crosses routing config, metadata, and SEO plumbing
  - Skills: []
  - Omitted: [`frontend-ui-ux`] - mostly system wiring

  **Parallelization**: Can Parallel: NO | Wave 3 | Blocks: 8 | Blocked By: 4, 5, 6

  **References**:
  - Pattern: `next.config.mjs:1-15` - place for redirects if implemented via Next config
  - Pattern: `app/sitemap.ts:6-35` - currently only home and blog are included
  - Pattern: `app/[locale]/layout.tsx:48-150` - site-wide metadata/openGraph defaults still describe portfolio identity
  - Pattern: `lib/constants.ts:1-6` - existing blog descriptions and base URL constants to evolve
  - Pattern: `app/[locale]/blog/[slug]/page.tsx:78-84` - current alternates target `/blog`

  **Acceptance Criteria**:
  - [ ] `/blog` and `/blog/[slug]` redirect cleanly to `/ensaios` equivalents
  - [ ] Sitemap contains `/ensaios` and new static routes
  - [ ] Global metadata/site identity no longer describe the site as a portfolio-first product
  - [ ] `pnpm tsc --noEmit` passes

  **QA Scenarios**:
  ```
  Scenario: Blog route redirects
    Tool: Bash
    Steps: Run `curl -I http://localhost:3000/pt-BR/blog` and `curl -I http://localhost:3000/pt-BR/blog/<essay-slug>`
    Expected: Redirect status with `Location` header pointing to `/pt-BR/ensaios` equivalents
    Evidence: .sisyphus/evidence/task-7-blog-redirects.txt

  Scenario: Sitemap reflects the new IA
    Tool: Bash
    Steps: Request `http://localhost:3000/sitemap.xml` and search for `/ensaios`, `/laboratorio`, `/sobre`, `/projetos`, `/contato`
    Expected: New paths are present; stale `/blog` primary entries are absent or intentionally handled only via redirect strategy
    Evidence: .sisyphus/evidence/task-7-sitemap.txt
  ```

  **Commit**: YES | Message: `feat(seo): align redirects and metadata with editorial IA` | Files: `next.config.mjs`, `app/sitemap.ts`, `app/[locale]/layout.tsx`, `lib/constants.ts`, route metadata blocks

- [ ] 8. Publish the first 4 curated essays under the new section

  **What to do**: Add the four curated final essays as the initial `/ensaios` publication set using the new editorial content model. Normalize slug naming, frontmatter, and publication metadata. Only migrate the final versions chosen by the user; exclude duplicate, earlier, or intermediate source documents from the public content set. Ensure the essays are visible on the homepage and `/ensaios` index.
  **Must NOT do**: Do not import duplicate draft/source files into the public tree. Do not publish unfinished lab content. Do not require English copies for launch.

  **Recommended Agent Profile**:
  - Category: `writing` - Reason: content migration demands precision with long-form text structure and frontmatter hygiene
  - Skills: []
  - Omitted: [`frontend-ui-ux`] - this is content assembly, not layout

  **Parallelization**: Can Parallel: NO | Wave 3 | Blocks: Final verification | Blocked By: 1, 2, 4, 7

  **References**:
  - Pattern: `content/posts/typescript-advanced-patterns/index.en.mdx` - example post file layout and frontmatter style
  - Pattern: `content/README.md` - update-aligned content placement rules after Task 1
  - Pattern: `app/[locale]/ensaios/page.tsx` and `[slug]/page.tsx` - new publication surface to satisfy
  - Source set from interview: `a-guerra-e-a-tela-azul-da-politica`, `a-captura-da-imaginacao`, `o-heroi-o-dragao-o-abismo-e-o-ruido-humano`, `a-vida-nao-tem-pause`

  **Acceptance Criteria**:
  - [ ] Exactly 4 curated essays are published in the new essay content root
  - [ ] No duplicate/intermediate versions appear in the public content tree
  - [ ] `/pt-BR/ensaios` lists the 4 essays
  - [ ] At least one PT-BR-only essay is reachable without EN 404 regression
  - [ ] `pnpm tsc --noEmit` passes

  **QA Scenarios**:
  ```
  Scenario: Launch set contains exactly the curated essays
    Tool: Bash
    Steps: Inspect the essay content directory and curl the essays index
    Expected: The index exposes the 4 curated essay slugs and no duplicate source variants
    Evidence: .sisyphus/evidence/task-8-launch-set.txt

  Scenario: Essay detail renders long-form content correctly
    Tool: Playwright
    Steps: Open one published essay, verify heading, body content, and reading flow on desktop
    Expected: Long-form MDX renders correctly with no broken layout or missing body sections
    Evidence: .sisyphus/evidence/task-8-essay-render.png
  ```

  **Commit**: YES | Message: `content(essays): publish first editorial set` | Files: essay MDX files and supporting assets only

## Final Verification Wave (MANDATORY — after ALL implementation tasks)
> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**
> **Never mark F1-F4 as checked before getting user's okay.** Rejection or user feedback -> fix -> re-run -> present again -> wait for okay.
- [ ] F1. Plan Compliance Audit — oracle
- [ ] F2. Code Quality Review — unspecified-high
- [ ] F3. Real Manual QA — unspecified-high (+ playwright if UI)
- [ ] F4. Scope Fidelity Check — deep

## Commit Strategy
- Commit after each numbered task; do not batch multiple architectural tasks into one commit
- Preserve deployable states in this order:
  1. content model
  2. loaders/fallback
  3. nav
  4. essays routes
  5. support pages
  6. homepage
  7. redirects/SEO/sitemap
  8. content publication
- Avoid commits that combine route creation, redirect wiring, and content publication unless they are the exact task boundary above

## Success Criteria
- The site’s first read is editorial, not résumé-like
- The route tree matches the chosen IA without anchor-dependent navigation hacks
- Essays and laboratory have explicit content boundaries
- PT-BR-first publication works without breaking EN routes
- Existing `/blog` traffic is preserved through redirects
- The 4 curated essays are live and discoverable from both the homepage and `/ensaios`
- Verification passes with `pnpm tsc --noEmit`, `pnpm lint`, `pnpm build`, targeted curl checks, and browser QA evidence
