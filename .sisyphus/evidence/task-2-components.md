# Task 2 — Components Inventory & CTA Source

Generated: 2026-04-14T14:xx:00Z (agent)

Goal
----
Identify which portfolio section components are actively used in `app/[locale]/page.tsx`, which components appear to be unused (candidates for commenting imports in the new page order), and where contact/CTA data is hardcoded vs sourced from i18n.

Findings
--------

1) Imports in `app/[locale]/page.tsx` (current)

Imported components (in order of appearance):
- PortfolioNav
- PortfolioFooter
- PortfolioIntro
- PortfolioOrigin
- PortfolioJourney
- PortfolioSkills
- PortfolioProof
- PortfolioVision
- PortfolioBlogShowcase
- PortfolioConnect
- ScrollProgress
- MatrixZone

Note: `PortfolioCertifications` and `PortfolioImpact` are present in `components/portfolio/` but NOT imported in `app/[locale]/page.tsx` (no top-level usage found). They are therefore candidates to be commented out in the new page order if they are not needed.

2) CTA source — "READY TO SHIP" text

- Both `components/portfolio/connect.tsx` and `components/portfolio/contact.tsx` use `t("callToAction")` (next-intl) to render the CTA lines. The actual string value is located in `messages/en.json` and `messages/pt-BR.json` under `callToAction` and currently contains the corporate CTA: "READY TO SHIP\nYOUR NEXT\nPRODUCTION SYSTEM?".
- Therefore replacing the CTA text requires editing both translation files (atomic commit) rather than editing the component's JSX.

3) Hardcoded contact info

- `components/portfolio/connect.tsx` contains a `contactLinks` array with hardcoded `label`, `value`, and `href` entries (email + LinkedIn). These are NOT sourced from i18n and will remain hardcoded unless we move them to translation files or a config.
- `components/portfolio/contact.tsx` contains hardcoded anchor tags with `href="mailto:..."`, `href="https://linkedin..."`, and `href="tel:+5543988732020"`. The visible text for these links includes the literal addresses/phone numbers, not i18n keys.

4) Components present but not imported

- `components/portfolio/certifications.tsx` — exists and defines `PortfolioCertifications` (documented symbols), but no import found in `app/[locale]/page.tsx`. Confirmed by source search.
- `components/portfolio/impact.tsx` — exists but not imported in page.tsx (candidate for comment/remove from page import list per plan instructions)

5) Hardcoded metrics in components (cross-check with Task 1)

- `components/portfolio/skills.tsx` — `testingStack.metrics` includes `{ value: "308", label: "AUTOMATED TESTS" }` and `{ value: "98%", label: "PASS RATE" }` — hardcoded.
- `components/portfolio/proof.tsx` — several project `metrics` entries contain hardcoded values such as `"19K+"`, `"308"`, `"98%"`.

Commands used (evidence generation)
----------------------------------
- grep "import { Portfolio" app/[locale]/page.tsx
- grep -n "callToAction" components/portfolio/*.tsx
- grep -n "mailto:\|tel:\|linkedin.com" components/portfolio/*.tsx
- grep -n "308\|19K\|99.8\|99%" components/portfolio/*.tsx

Conclusions & Recommended Next Steps
-----------------------------------
1. CTA text (corporate shipping language) should be changed by editing `messages/en.json` and `messages/pt-BR.json` keys `callToAction` atomically.
2. Hardcoded contact info exists in both `connect.tsx` and `contact.tsx`. Decide whether to keep them hardcoded (acceptable) or extract to i18n/config for easier editing.
3. `certifications.tsx` and `impact.tsx` are present in the repo but not imported in `page.tsx` — follow the plan and comment imports in `page.tsx` when reorganizing.
4. `skills.tsx` and `proof.tsx` include hardcoded numeric metrics that must be removed/rewritten in tandem with `messages/*.json` edits. Update both files or replace metric values with i18n-sourced values.

Evidence files to produce next (Task 2 acceptance):
- .sisyphus/evidence/task-2-components.md (this file)
- .sisyphus/evidence/task-2-grep-output.txt (optional - raw grep output)

Prepared by: Sisyphus (agent)
