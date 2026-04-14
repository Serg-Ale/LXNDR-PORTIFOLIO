# Task 1 — Audit: Map of corporate metrics & hardcoded stats

Generated: 2026-04-14T14:xx:00Z (agent)

Summary
-------
- Context: Preparing portfolio-refactor. Goal: find all corporate vanity metrics (lines of code, uptime, tests, %s, "ship" language) present in the codebase so we can remove or rewrite them.
- Outcome: Matches located primarily in translation files (messages/en.json and messages/pt-BR.json). No hardcoded occurrences found in components/portfolio/*.tsx by the initial AST/grep sweep (see notes). Next steps listed below.

Findings (grep results)
-----------------------

1) messages/en.json
  - tagline (hero): "I build production systems that scale — 19K+ lines of code, 15+ shipped projects, and counting." (contains lines-of-code + shipped projects)
  - metrics: "— 19K+ lines, 15+ projects, and counting."
  - loc: "20K+" and locLabel: "LINES" / multiple labels referencing "LINES OF CODE"
  - uptime: "99%" / uptimeLabel: "UPTIME"
  - metric: "99.8%" (multiple timeline/experience entries)
  - repeated paragraphs with exact numeric claims (19,000 LOC, 308 tests, 99.8% uptime) at keys around paragraph2/paragraph3 and experience timeline entries
  - CTA: callToAction: "READY TO SHIP\nYOUR NEXT\nPRODUCTION SYSTEM?" (hero/contact CTA)

2) messages/pt-BR.json
  - tagline (hero): "Construo sistemas de produção que escalam — 19K+ linhas de código, 15+ projetos entregues, e contando." (same corporate tone)
  - metrics: "— 19K+ linhas, 15+ projetos, e contando."
  - loc: "20K+"
  - uptime keys: "99%" / metric: "99,8%" (comma decimal localization) and metricLabel: "UPTIME"
  - body paragraphs with explicit numeric claims: 19.000 linhas, 308 casos de teste, 99,8% disponibilidade

Exact grep snippets (selected)
--------------------------------
- messages/en.json:22: "tagline": "I build production systems that scale — 19K+ lines of code, 15+ shipped projects, and counting."
- messages/en.json:164: "paragraph2": "... contributed to the Union Audio MVP with over 19,000 lines of code... building a test suite with 308 automated cases."
- messages/en.json:165: "paragraph3": "... monitoring 150+ batch jobs for Carrefour logistics with 99.8% uptime."
- messages/en.json:372: "description": "Established comprehensive testing infrastructure with 308 automated test cases achieving 98% pass rate..."
- messages/en.json:385: "callToAction": "READY TO SHIP\nYOUR NEXT\nPRODUCTION SYSTEM?"

- messages/pt-BR.json:22: "tagline": "Construo sistemas de produção que escalam — 19K+ linhas de código, 15+ projetos entregues, e contando."
- messages/pt-BR.json:164: paragraph2 with >19.000 linhas and 308 testes
- messages/pt-BR.json:165: paragraph3 references 99,8% disponibilidade

Notes from AST-grep + explore (partial)
-------------------------------------
- Initial AST-grep/search found the primary matches inside the translation JSON files. No direct hardcoded numeric literals ("308", "19K", "99.8%") were observed in components/portfolio/*.tsx during the quick AST scan. However, some components render labels (e.g., LINES, TESTS, UPTIME) using translation keys — the labels exist in components and will need i18n key updates rather than component edits.
- OG image / public asset scan: no image files were found that embed the old tagline text (no obvious "og-image" PNG containing text), but confirm with a visual check if needed.

Risks / Observations
---------------------
- The bulk of corporate metrics live in messages/en.json and messages/pt-BR.json. Removing them is purely content work but must be done atomically (both files updated together).
- Some narrative text in experience paragraphs references the numeric claims (19k LOC, 308 tests, 99.8% uptime). These should be rewritten to match the new manifesto voice (no vanity metrics) — be cautious not to accidentally remove factual employment history (job titles/dates).
- CTA "READY TO SHIP" is present and must be replaced per the plan.

Next Steps (Task 1 → Task 2 handoff)
-----------------------------------
1) Finalize Task 1 evidence (this file) and commit it to the repo (done by agent in next step).
2) Run Task 2: components inventory (LSP references) to identify where components read these keys and to confirm there is no hardcoded fallback text in JSX.
3) Prepare precise translation edits for Task 3–5 (hero/projects/about) based on these findings.

Files created as evidence
-------------------------
- .sisyphus/evidence/task-1-audit.md (this file)

Prepared by: Sisyphus (agent)
