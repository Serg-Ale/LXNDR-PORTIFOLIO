# Issues — portfolio-refactor

## 2026-04-14 Session: Known Issues

### Pre-existing LSP Errors (not our problem)
- globals.css has Tailwind v4 syntax that LSP doesn't understand — this is expected, build works fine
- page.tsx line 117: dangerouslySetInnerHTML warning — pre-existing, not related to our tasks
- gsap-parallax.ts forEach callback return — pre-existing, linting issue only
- scroll-text-reveal.tsx and parallax-background.tsx: key prop index — pre-existing

### Uncommitted Changes from Visual Overhaul (need to commit first)
- components/portfolio/intro.tsx — hero layout changes (flex-col, padding-top fix for nav)
- components/portfolio/nav.tsx — padding/sizing changes to nav bar
These are from the "fix(hero): add padding-top for fixed nav" task that was in progress

### skills.tsx and proof.tsx hardcoded metrics
- skills.tsx: testingStack.metrics has hardcoded { value: "308", label: "AUTOMATED TESTS" } and { value: "98%", label: "PASS RATE" }
- proof.tsx: project metrics hardcoded with "19K+", "308", "98%"
- Plan says "only content (JSON) and style" — but these COMPONENTS have the metrics hardcoded
- Decision needed: either update components to not show metrics at all, or change the hardcoded values
- TASK 4 note says "verify how proof.tsx handles URL null" — check this before editing

### LightSync URL null handling
- Must verify proof.tsx before adding projects with url: null
- If component doesn't handle null gracefully, may need minimal component fix
