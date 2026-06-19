# Style Context — SAERIX Portfolio

> Compact reference for anyone overhauling the visual identity of this app.
> Generated from codebase inspection. Keep updated after major style changes.

---

## 1. Design Aesthetic (Current)

**Brutalist** — Bold, raw, high-contrast, zero border-radius, geometric shadows.

Key traits:
- Zero border radius everywhere (`--radius: 0rem`)
- Thick borders (4–6px solid) in place of soft cards
- Hard offset shadows (`8px 8px 0` — no blur, just displacement)
- Heavy uppercase typography with negative letter-spacing
- Text-stroke/outlined text as a visual signature
- Inverted sections (dark bg + light text) interspersed with light sections
- Grain texture overlay on dark sections
- Magnetic cursor (hidden native cursor on desktop)
- Neon accent colors (Evangelion-inspired: cyan, orange, purple)
- Purple (`#7C3AED`) as the single accent color across interactive elements

---

## 2. Color System

### CSS Custom Properties (`app/[locale]/globals.css` — `:root` and `.dark`)

| Variable | Light | Dark | Purpose |
|---|---|---|---|
| `--background` | `#fafafa` | `#000000` | Page background |
| `--foreground` | `#000000` | `#ffffff` | Main text / inverted bg |
| `--card` | `#ffffff` | `#0a0a0a` | Card surface |
| `--primary` | `#000000` | `#ffffff` | Primary actions |
| `--secondary` | `#f5f5f5` | `#171717` | Secondary surfaces |
| `--muted` | `#e5e5e5` | `#262626` | Muted backgrounds |
| `--muted-foreground` | `#737373` | `#a3a3a3` | Muted text |
| `--border` | `#000000` | `#ffffff` | All borders |
| `--ring` | `#000000` | `#ffffff` | Focus rings |
| `--destructive` | `#dc2626` | `#dc2626` | Error states |
| `--radius` | `0rem` | `0rem` | Border radius (none) |

### Accent Colors (same in both modes)
```
--neon-blue:   #00ffff   (cyan, Evangelion)
--neon-orange: #ff6600   (orange, Evangelion)
--neon-purple: #9900ff   (neon purple, Evangelion)

--color-accent-purple:       #7C3AED   (main UI accent)
--color-accent-purple-light: #A78BFA
--color-accent-purple-dark:  #5B21B6
--color-accent-purple-glow:  rgba(124, 58, 237, 0.3)
--color-accent:              var(--color-accent-purple)  (global accent pointer)
```

### Text selection
```css
::selection { background-color: var(--color-accent); color: #000000; }
```

### Tailwind color tokens (`tailwind.config.js`)
All colors are wired to CSS vars above. Notable extras:
- `accent-purple.DEFAULT` → `var(--color-accent-purple)`
- `accent-purple.light` → `var(--color-accent-purple-light)`
- `accent-purple.dark` → `var(--color-accent-purple-dark)`
- `accent-purple.glow` → `var(--color-accent-purple-glow)`

---

## 3. Font System

### Loaded in `app/[locale]/layout.tsx`
```
Geist         → --font-geist      → CSS var  → font-sans (body default)
Geist Mono    → --font-geist-mono → CSS var  → font-mono
Bebas Neue    → --font-bebas      → CSS var  → font-bebas (display/headings)
Inter Tight   → --font-space      → CSS var  → font-space (alt sans)
```

### Usage in `tailwind.config.js`
```js
fontFamily: {
  sans:  ["var(--font-geist)", "sans-serif"],
  mono:  ["var(--font-geist-mono)", "monospace"],
  bebas: ["var(--font-bebas)", "sans-serif"],   // <-- display font
  space: ["var(--font-space)", "sans-serif"],    // <-- alt sans
}
```

### CSS utility classes
```css
.font-bebas  → Bebas Neue (all-caps display font, used for giant headings)
.font-space  → Inter Tight (geometric, used for subheadings and body alt)
.font-mono   → Geist Mono (code blocks)
```

### Typography scale patterns
- Hero names: `text-[clamp(6rem,22vw,20rem)] font-black leading-[0.85] tracking-tighter font-bebas`
- Outlined last name: `text-[clamp(4rem,15vw,14rem)] text-outlined font-space`
- Role/subtitle: `text-lg md:text-2xl font-bold tracking-widest font-mono`

---

## 4. Key CSS Utility Classes (all in `globals.css`)

### Typography utilities
```
.text-brutalist         font-weight:900, line-height:0.9, letter-spacing:-0.05em, uppercase
.text-outlined          -webkit-text-stroke:2px currentColor, transparent fill
.text-outlined-thick    stroke: 3px
.text-outlined-light    stroke with --background color
.text-highlight-block   inverted block (bg=foreground, color=background)

// Expressive manifesto system
.typo-thin / light / medium / bold / black  → font-weight variants
.typo-italic / italic-extreme               → italic + skew
.typo-tight / normal / wide / ultra-wide    → letter-spacing
.typo-uppercase / lowercase / small-caps    → text transforms
.typo-outlined / outlined-thin / thick      → text-stroke variants
.typo-shadow                                → text-shadow offset
.typo-glow                                  → glow text-shadow
.typo-rotate-slight / medium                → inline-block rotate
.typo-highlight-block / large               → inverted block with slight rotate
.typo-condensed / extended                  → scaleX transforms
.typo-vertical                              → writing-mode vertical
.typo-muted / faded                         → opacity
.typo-hero / whisper / scream / technical   → combined preset styles
```

### Border & shadow utilities
```
.border-brutalist        border: 4px solid currentColor
.border-3 / .border-6    border-width: 3px / 6px

.shadow-brutalist        box-shadow: 8px 8px 0 0 currentColor (also: !important with #000/#fff)
.shadow-brutalist-lg     12px 12px 0 0
.shadow-brutalist-sm     4px 4px 0 0
.shadow-brutalist-purple        8px 8px 0 0 var(--color-accent-purple)
.shadow-brutalist-purple-lg     12px 12px
.shadow-brutalist-purple-sm     4px 4px
.shadow-brutalist-inverted      8px 8px 0 #fff (dark mode: #000)
```

### Purple accent utilities
```
.text-accent-purple / light / dark
.bg-accent-purple / light / dark / glow
.border-accent-purple / light
.border-l-purple             border-left: 4px solid var(--color-accent-purple)
.underline-purple            text-underline-color: purple, 3px, offset 0.2em
.glow-purple / sm            box-shadow glow with rgba(124,58,237,0.3)
.nav-link-purple             underline grows from 0→100% on hover (::after pseudo)

// Hover variants
.hover\:shadow-brutalist-purple:hover
.hover\:shadow-brutalist-purple-lg:hover
.hover\:glow-purple:hover
.hover\:border-accent-purple:hover
.hover\:text-accent-purple:hover
```

### Hover interaction utilities
```
.hover-glow              transition + glow + brutalist shadow on hover
.hover-rotate            rotate(1deg) scale(1.02) on hover
.hover-border-pulse      pulsing border animation on hover
.hover-text-shimmer      shimmer sweep + color inversion on hover
.hover-magnetic-enhanced scale + rotate + bigger shadow on hover
.hover-distort           scale(1.02) rotate(0.5deg)
.text-invert-hover       text background inversion on hover (children span)
```

### Special effects
```
.glitch-text             CSS glitch animation on hover (::before red, ::after cyan)
.grain-overlay           SVG fractal noise texture, opacity 0.03, animated
.pulse-dot               pulsing dot animation
.scrollbar-hide          hides scrollbar cross-browser

// Parallax layers
.parallax-layer          will-change:transform, translateZ(0)
.parallax-very-slow / slow / medium / fast / very-fast  (CSS var --parallax-speed)
.parallax-container      position:relative, overflow:hidden
.parallax-3d / 3d-child  perspective 1000px for 3D depth

// Section spacing
.section-full            min-h-100vh, flex-col, justify-center
.section-hero            min-h-100vh, pt:8rem/pb:8rem (md: 12rem)
```

### Blog/Code block utilities
```
.badge-brutalist         font-bebas, uppercase, border-3
.badge-brutalist-sm / md / lg   size variants
.badge-brutalist-primary        inverted colors + brutalist shadow

.code-block-brutalist    border-6, inverted bg (light:dark bg, dark:light bg)
.code-block-header       flex header above code, separator line
.language-badge-brutalist       absolute top-left language label
.copy-button-brutalist   absolute top-right copy button
.inline-code-brutalist   inline inverted code with small shadow

.code-highlighted        Shiki dual-theme (code-light/code-dark toggled by .dark class)
```

---

## 5. Reusable Style Components

### `components/brutalist-text.tsx`
Three exported components:

```tsx
// Accent line on one side
<BrutalistLine position="left|right|top|bottom" thickness={4}>
  children
</BrutalistLine>

// Text with brutalist variants
<BrutalistText
  variant="outlined|outlined-thick|outlined-thin|filled|inverted"
  size="xs|sm|md|lg|xl|2xl|3xl"
  font="default|bebas|space|mono"
  hover={true}   // fills text on hover
  as="h1|h2|p|span|div"
>
  UPPERCASE TEXT
</BrutalistText>

// Container box
<BrutalistBox variant="border|filled|shadow">
  children
</BrutalistBox>
```

### shadcn/ui config (`components.json`)
```json
{
  "style": "new-york",
  "baseColor": "neutral",
  "cssVariables": true,
  "tailwind": { "css": "app/[locale]/globals.css" }
}
```

---

## 6. Animation System

### GSAP (primary animation library)
- Registered globally: `gsap.registerPlugin(ScrollTrigger)`
- Always wrapped in `gsap.context()` → cleanup with `ctx.revert()` in `useEffect` return
- Reduced motion guard: `prefersReducedMotion()` from `lib/gsap-config.ts`

### Common patterns
```ts
// Entrance: name reveal
gsap.set(el, { opacity: 0, x: -100 })
gsap.to(el, { opacity: 1, x: 0, duration: 1, ease: "power3.out" })

// Scroll parallax (scrub)
gsap.to(el, {
  y: -100,
  scrollTrigger: { trigger, start: "top top", end: "bottom top", scrub: 1 }
})

// Scroll-triggered fade entrance
gsap.from(el, {
  opacity: 0, y: 50,
  scrollTrigger: { trigger, start: "top bottom-=100" },
  duration: 1.2, ease: "power3.out"
})

// Stagger reveal
gsap.from(".items", {
  y: 100, opacity: 0, stagger: 0.15,
  scrollTrigger: { scrub: 1 }
})
```

### Cursor
`components/shared/magnetic-cursor.tsx` — custom cursor that follows mouse with lag; hides native cursor on desktop via CSS (`body { cursor: none }`).

---

## 7. Dark Mode

- Implemented via `class` strategy (Tailwind `darkMode: "class"`)
- `ThemeProvider` from `components/shared/theme-provider.tsx` wraps layout
- Default: `system` — respects OS preference
- Toggle: `ThemeToggle` component in nav
- Shadows: many classes have explicit `.dark` variants with inverted colors (e.g. `shadow-brutalist` → dark: `#ffffff` shadow)
- Sections with `data-theme="dark"` manually apply dark colors regardless of theme (hero section always dark)

---

## 8. Section Structure (`app/[locale]/page.tsx`)

```
PortfolioNav           → sticky top nav, adapts bg based on section color
ScrollProgress         → thin right-side progress indicator
PortfolioIntro         → hero (dark bg) + manifesto word reveal
Manifesto              → scroll-pinned word-by-word reveal
  └─ MatrixZone wrapper (matrix canvas background effect)
    PortfolioProof     → impact stats
    PortfolioOrigin    → personal origin story
    PortfolioJourney   → career timeline
    PortfolioSkills    → tech skills grid
PortfolioVision        → future/vision section
PortfolioBlogShowcase  → recent essays
PortfolioConnect       → contact CTA
PortfolioFooter        → footer
```

---

## 9. File Map — Where to Go for Style Changes

| What to change | File(s) |
|---|---|
| CSS variables (colors, radius) | `app/[locale]/globals.css` → `:root` and `.dark` |
| Tailwind color tokens | `tailwind.config.js` → `theme.extend.colors` |
| Font families | `app/[locale]/layout.tsx` (load fonts) + `tailwind.config.js` (register) + `globals.css` (utility classes) |
| Global base styles | `globals.css` → `@layer base` |
| Custom utility classes | `globals.css` → `@layer utilities` |
| Brutalist component variants | `components/brutalist-text.tsx` |
| shadcn/ui base style | `components.json` → `style` / `baseColor` |
| shadcn/ui component styles | `components/ui/*.tsx` |
| Hero section layout/colors | `components/portfolio/intro.tsx` |
| Nav styles | `components/portfolio/nav.tsx` |
| Animations config | `lib/gsap-config.ts` |
| Cursor | `components/shared/magnetic-cursor.tsx` |
| Glitch effect | `components/shared/glitch-text.tsx` + `.glitch-text` in `globals.css` |
| Grain texture | `.grain-overlay` in `globals.css` |
| Code block appearance | `.code-block-brutalist`, `.language-badge-brutalist` in `globals.css` |
| Blog typography | `components/blog/` + blog-specific classes in `globals.css` |

---

## 10. Constraints to Keep in Mind

1. **`--radius: 0rem` is intentional** — changing it will affect all shadcn/ui components globally.
2. **`shadow-brutalist` has two definitions** — once in `@layer utilities` (uses `currentColor`) and once outside it (hardcoded `#000`/`#fff` with `!important`). The `!important` version wins.
3. **Nav background adapts dynamically** — it reads the section's computed background via `lib/use-section-background.ts` and inverts text/border color for contrast. Changing section backgrounds may break nav readability.
4. **Hero is always dark** — `data-theme="dark"` on the section hardcodes dark colors. This is intentional, not a mode issue.
5. **`ignoreBuildErrors: true` in `next.config.mjs`** — TS errors won't block builds, but they should still be fixed.
6. **Fonts**: `--font-space` is wired to Inter Tight (not Space Grotesk despite the variable name). Update the import in `layout.tsx` if you swap it.
7. **i18n routing** — always use `@/i18n/routing` imports, not `next/navigation`, for locale-aware links.
8. **Neon colors are CSS-only** — `--neon-blue`, `--neon-orange`, `--neon-purple` are declared but not exposed as Tailwind tokens. Use `text-[var(--neon-blue)]` syntax or extend `tailwind.config.js` to expose them.

---

## 11. Quick Reference — Class Cheatsheet

```tsx
// Brutalist card
<div className="border-4 border-foreground p-6 shadow-brutalist">

// Brutalist button (standard)
<button className="px-8 py-4 bg-foreground text-background border-4 border-foreground
                   font-black tracking-wide shadow-brutalist
                   hover:shadow-brutalist-lg hover:translate-x-1 hover:translate-y-1 transition-all">

// Brutalist button (purple accent)
<button className="px-8 py-4 bg-accent-purple text-black border-4 border-background
                   font-black tracking-wide shadow-brutalist
                   hover:shadow-brutalist-purple-lg hover:translate-x-1 hover:translate-y-1 transition-all">

// Giant outlined heading
<h1 className="text-[clamp(4rem,12vw,10rem)] font-black leading-[0.85]
               tracking-tighter text-outlined font-bebas uppercase">

// Section (dark, inverted)
<section className="bg-foreground text-background">
  <div className="grain-overlay absolute inset-0 z-0" />
</section>

// Glitch hover text
<span className="glitch-text" data-text="YOUR TEXT">YOUR TEXT</span>

// Nav link with purple underline
<a className="nav-link-purple font-semibold hover:text-accent-purple">Link</a>
```
