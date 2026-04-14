# Learnings — portfolio-refactor

## 2026-04-14 Session: Wave 1 Audit Results

### Task 1 — Audit Findings (from evidence/task-1-audit.md)
- Corporate metrics concentrated in messages/en.json and messages/pt-BR.json
- Key dirty locations:
  - hero.tagline: "I build production systems that scale — 19K+ lines of code..."
  - hero.metrics/loc: "20K+", locLabel: "LINES", uptime: "99%"
  - about.paragraph2/paragraph3: 19,000 LOC, 308 tests, 99.8% uptime
  - experience entries with 99.8% numeric metric
  - callToAction: "READY TO SHIP\nYOUR NEXT\nPRODUCTION SYSTEM?"
- No hardcoded numeric literals found in components/portfolio/*.tsx via AST scan
- OG images don't embed old tagline text (no text-in-image found)
- Both en.json and pt-BR.json have the same keys (no drift detected)

### Task 2 — Component Structure Findings (from evidence/task-2-components.md)
- Active imports in page.tsx: PortfolioNav, PortfolioFooter, PortfolioIntro, PortfolioOrigin, PortfolioJourney, PortfolioSkills, PortfolioProof, PortfolioVision, PortfolioBlogShowcase, PortfolioConnect, ScrollProgress, MatrixZone
- PortfolioCertifications and PortfolioImpact exist but NOT imported → candidates to comment
- CTA source: connect.tsx and contact.tsx BOTH use t("callToAction") from i18n — no hardcode
- skills.tsx has hardcoded metrics: { value: "308", label: "AUTOMATED TESTS" }, { value: "98%", label: "PASS RATE" }
- proof.tsx has hardcoded metrics with "19K+", "308", "98%"
- Hardcoded contact info in connect.tsx (email + LinkedIn array) and contact.tsx (href anchors)

### General Patterns
- Translation files: messages/en.json (~430 lines), messages/pt-BR.json (~430 lines)
- i18n: client components use useTranslations(), server components use getTranslations()
- Path alias: @/ maps to project root
- Component export pattern: named exports like `export function PortfolioXxx()`
- GSAP pattern: gsap.context() with .revert() cleanup in useEffect

### JSON Structure Key Areas
- hero section: keys include title, tagline, manifesto, stats, scrollDown, ctaSeeWork, ctaDownloadCV, role
- about section: paragraph1-4, evolutionWord, evolutionQuote  
- origin section: card1, card2, card3
- journey section: conclusion
- timeline section: milestones[*].description
- proof section: projects (cards on homepage)
- projects section: list (full projects page)
- experience section: jobs[*].highlights
- contact section: callToAction
- vision section: quote, lookingFor

## Visual Context
- Current portfolio is from visual-overhaul plan which is complete
- Accent color #FF6600 (orange) was just applied — will be evolved toward purple in Task 9
- Font: Inter Tight (was Space Grotesk) — recently swapped, keep
- Manifesto section: does NOT exist yet — needs to be created (Task 6)
- The code is in good shape post visual-overhaul, no build errors

## 2026-04-14 Session: Task 3 Hero Rewrite

- `components/portfolio/intro.tsx` was still coupled to legacy `hero.manifesto.word1..metrics` keys, so the hero rewrite required a component update alongside the JSON copy change.
- `hero.stats` can be fully deleted from both locale files once the `StatReveal` block and related imports/types are removed from `intro.tsx`.
- No `metadata` key exists in `messages/en.json` or `messages/pt-BR.json`, so Task 3 SEO copy changes were limited to visible content keys only.

## 2026-04-14 Session: Task 5 About Voice Rewrite

- `about`, `origin`, `journey`, and `timeline` in both locale files were structurally aligned, so the rewrite only needed value changes with no key churn.
- The requested identity-marker grep pipeline using `grep ... | grep "about"` does not produce matches on pretty-printed JSON because the `"about"` key and paragraph values live on different lines.
- Section-scoped grep with `-A` around `"about": {` produced the intended proof and captured `creator`/`Linux`/`criador` markers in both locales.

## 2026-04-14 Session: Task 4 Projects Rewrite

- `proof.tsx` was tightly coupled to the old homepage cards through an inline `projects` array and hardcoded metric values, so the content rewrite only became complete after switching the component to `t.raw("projects")`.
- `LightSync` needs an explicit `url: null` in both locale files; keeping the key present makes the homepage and full projects list render consistently while still skipping the external link cleanly.
- Task 6 completed: Created Manifesto component with SVG generative art. Abstract SVG networks scale nicely and are fully compatible with GSAP ScrollTrigger strokeDashoffset animations. Added translation keys.
