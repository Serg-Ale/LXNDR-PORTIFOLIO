## [2026-04-14] Session: ses_273fe31fcffePQAVYL9W0C1zKp
# Learnings — Portfolio Visual Overhaul

## Project Conventions
- Package manager: pnpm
- i18n: next-intl, both en.json and pt-BR.json must always be updated atomically
- GSAP: always use gsap.context() + ctx.revert() cleanup
- All animations must check prefersReducedMotion() from lib/gsap-config.ts
- Font loaded via next/font/google, variable name --font-space must be preserved
- Inter_Tight can replace Space_Grotesk without touching downstream components when --font-space stays unchanged
- Tailwind CSS v4 — uses CSS variables for theming
- Brutalist utilities: shadow-brutalist, border-brutalist, text-outlined in globals.css
- MatrixCanvas MUST NOT be touched
- No new npm packages allowed

## CSS Architecture
- --neon-orange: #ff6600 already declared in globals.css (NOT yet applied anywhere)
- --neon-blue: #00ffff already declared in globals.css
- Dead CSS: evangelion block (~lines 1117-1274) and glitch block (~lines 444-498) confirmed

## Component Patterns
- scrollToSection() pattern lives in nav.tsx — copy for hero CTA
- Brutalist button pattern: border-4 border-foreground shadow-brutalist
- Absolute imports with @/ alias
- Named exports for components (except page.tsx/layout.tsx)

## Task 9-11: Blog Showcase + CSS Cleanup

### Blog Background Fix (Task 9)
**What**: Fixed blog-showcase.tsx dark-theme continuity
- Changed section className from `bg-accent text-accent-foreground` to `bg-foreground text-background`
- Location: components/portfolio/blog-showcase.tsx, line 132
- Reason: `bg-accent` is an inverted color that breaks dark narrative; `bg-foreground` maintains proper dark theme
- Pattern: Now matches intro.tsx dark-mode pattern (bg-foreground text-background)
- Result: ✅ Build passes, visual consistency restored

### CSS Dead Code Analysis (Task 11)
**Finding**: Task description claimed evangelion + glitch CSS blocks were dead, but they're NOT.

**Active Usage Confirmed**:
- `.evangelion-glitch` → Used by components/shared/glitch-text.tsx (line 74, conditional mode)
- `.evangelion-bg` → Used by components/portfolio/evangelion-background.tsx + hero.tsx GSAP animations
- `.evangelion-particles` → Used by evangelion-background.tsx (line 81)
- `.evangelion-shapes` → Used by evangelion-background.tsx (line 98)
- `.glitch-text` → Used by glitch-text.tsx when evangelionMode=false

**Critical Classes Verified Present**:
- ✅ grain-overlay (line 540)
- ✅ text-outlined (line 147)
- ✅ shadow-brutalist (lines 436, 575)
- ✅ split-text (SplitTextReveal component)

**Decision**: Did NOT delete CSS blocks. They serve active components and are essential to the design system.

### Key Insights
1. **Dark theme pattern**: blog-showcase section should use `bg-foreground text-background` + `data-theme="dark"`
2. **CSS validation process**: Always grep for class usage before deleting; task descriptions may be stale
3. **Evangelion system**: These CSS classes form a cohesive animation/styling system used across hero, vision, connect, and background components

## [2026-04-14] T11 Revised — Dead CSS Deletion
Deleted 7 blocks (zero component references confirmed):
- skill-card, skill-text, blend-exclusion/screen/difference
- glitch-card + rgb-shift-1/2 keyframes
- digital-noise + digital-noise-anim keyframe
- scan-lines + scan-lines-anim keyframe
- screen-tear + screen-tear-anim keyframe
- matrix-glitch + matrix-flow keyframe
- binary-overlay + binary-flicker keyframe
Preserved (actively used): .evangelion-*, .glitch-text, .grain-overlay, .text-outlined, .shadow-brutalist
Build passes post-deletion.
