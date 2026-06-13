# Style Files Snapshot — LXNDR Portfolio

> Conteúdo literal dos arquivos críticos de estilo compactado em um único arquivo.
> Use como contexto completo para mudanças visuais sem precisar abrir múltiplos arquivos.
> Gerado em: 2026-06-12

---

## FILE: `app/[locale]/globals.css` (critical — CSS variables + all utilities)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Brutalist Portfolio Theme */
  --background: #fafafa;
  --foreground: #000000;
  --card: #ffffff;
  --card-foreground: #000000;
  --popover: #ffffff;
  --popover-foreground: #000000;
  --primary: #000000;
  --primary-foreground: #ffffff;
  --secondary: #f5f5f5;
  --secondary-foreground: #000000;
  --muted: #e5e5e5;
  --muted-foreground: #737373;
  --accent: #000000;
  --accent-foreground: #ffffff;
  --destructive: #dc2626;
  --destructive-foreground: #ffffff;
  --border: #000000;
  --input: #e5e5e5;
  --ring: #000000;
  --radius: 0rem;
  --sidebar: #fafafa;
  --sidebar-foreground: #000000;
  --sidebar-primary: #000000;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f5f5f5;
  --sidebar-accent-foreground: #000000;
  /* Evangelion-inspired neon colors */
  --neon-blue: #00ffff;
  --neon-orange: #ff6600;
  --neon-purple: #9900ff;
  --color-accent-purple: #7C3AED;
  --color-accent-purple-light: #A78BFA;
  --color-accent-purple-dark: #5B21B6;
  --color-accent-purple-glow: rgba(124, 58, 237, 0.3);
  --color-accent: var(--color-accent-purple);
}

.dark {
  --background: #000000;
  --foreground: #ffffff;
  --card: #0a0a0a;
  --card-foreground: #ffffff;
  --popover: #0a0a0a;
  --popover-foreground: #ffffff;
  --primary: #ffffff;
  --primary-foreground: #000000;
  --secondary: #171717;
  --secondary-foreground: #ffffff;
  --muted: #262626;
  --muted-foreground: #a3a3a3;
  --accent: #ffffff;
  --accent-foreground: #000000;
  --destructive: #dc2626;
  --destructive-foreground: #ffffff;
  --border: #ffffff;
  --input: #262626;
  --ring: #ffffff;
  --sidebar: #0a0a0a;
  --sidebar-foreground: #ffffff;
  --sidebar-primary: #ffffff;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #171717;
  --sidebar-accent-foreground: #ffffff;
  --sidebar-border: #ffffff;
  --sidebar-ring: #ffffff;
  --neon-blue: #00ffff;
  --neon-orange: #ff6600;
  --neon-purple: #9900ff;
  --color-accent-purple: #7C3AED;
  --color-accent-purple-light: #A78BFA;
  --color-accent-purple-dark: #5B21B6;
  --color-accent-purple-glow: rgba(124, 58, 237, 0.3);
  --color-accent: var(--color-accent-purple);
}

::selection {
  background-color: var(--color-accent);
  color: #000000;
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
}

@layer utilities {
  /* BRUTALIST TYPOGRAPHY */
  .text-brutalist { font-weight:900; line-height:0.9; letter-spacing:-0.05em; text-transform:uppercase; }
  .font-bebas  { font-family: var(--font-bebas), system-ui, sans-serif; }
  .font-space  { font-family: var(--font-space), system-ui, sans-serif; }
  .font-mono   { font-family: var(--font-geist-mono), ui-monospace, monospace; }
  .text-outlined       { -webkit-text-stroke: 2px currentColor; -webkit-text-fill-color: transparent; }
  .text-outlined-thick { -webkit-text-stroke: 3px currentColor; -webkit-text-fill-color: transparent; }
  .text-outlined-light { -webkit-text-stroke: 2px var(--background); -webkit-text-fill-color: transparent; }
  .text-highlight-block { background: var(--foreground); color: var(--background); padding: 0.25em 0.5em; display: inline-block; }
  .text-accent { color: var(--color-accent); }
  .bg-accent-primary { background-color: var(--color-accent); }

  /* EXPRESSIVE MANIFESTO SYSTEM */
  .manifesto-word { display: block; will-change: transform, opacity; }
  .manifesto-left { text-align: left; }
  .manifesto-center { text-align: center; }
  .manifesto-right { text-align: right; }
  .manifesto-indent-1 { padding-left: 10%; }
  .manifesto-indent-2 { padding-left: 20%; }
  .manifesto-indent-3 { padding-left: 30%; }

  /* Weight / style / tracking / case / visual variations */
  .typo-thin { font-weight: 100; }
  .typo-light { font-weight: 300; }
  .typo-medium { font-weight: 500; }
  .typo-bold { font-weight: 700; }
  .typo-black { font-weight: 900; }
  .typo-italic { font-style: italic; transform: skewX(-6deg); }
  .typo-italic-extreme { font-style: italic; transform: skewX(-12deg); }
  .typo-tight { letter-spacing: -0.08em; }
  .typo-normal { letter-spacing: 0; }
  .typo-wide { letter-spacing: 0.15em; }
  .typo-ultra-wide { letter-spacing: 0.35em; }
  .typo-uppercase { text-transform: uppercase; }
  .typo-lowercase { text-transform: lowercase; }
  .typo-capitalize { text-transform: capitalize; }
  .typo-small-caps { font-variant: small-caps; letter-spacing: 0.1em; }
  .typo-outlined { -webkit-text-stroke: 2px currentColor; -webkit-text-fill-color: transparent; }
  .typo-outlined-thin { -webkit-text-stroke: 1px currentColor; -webkit-text-fill-color: transparent; }
  .typo-outlined-thick { -webkit-text-stroke: 4px currentColor; -webkit-text-fill-color: transparent; }
  .typo-shadow { text-shadow: 4px 4px 0 currentColor; -webkit-text-stroke: 1px currentColor; }
  .typo-glow { text-shadow: 0 0 20px currentColor, 0 0 40px currentColor; }
  .typo-rotate-slight { transform: rotate(-2deg); display: inline-block; }
  .typo-rotate-medium { transform: rotate(-5deg); display: inline-block; }
  .typo-highlight-block { background: var(--background); color: var(--foreground); padding: 0.15em 0.4em; transform: rotate(-1deg); }
  .typo-condensed { transform: scaleX(0.85); transform-origin: left; }
  .typo-extended { transform: scaleX(1.15); transform-origin: left; }
  .typo-vertical { writing-mode: vertical-rl; text-orientation: mixed; }
  .typo-muted { opacity: 0.5; }
  .typo-faded { opacity: 0.3; }
  .typo-hero { font-weight:900; letter-spacing:-0.05em; line-height:0.85; }
  .typo-whisper { font-weight:300; letter-spacing:0.2em; opacity:0.7; text-transform:uppercase; }
  .typo-scream { font-weight:900; letter-spacing:-0.03em; transform:scaleY(1.1); }
  .typo-technical { font-family: var(--font-geist-mono), ui-monospace, monospace; letter-spacing:0.05em; font-weight:400; }

  /* BORDERS & SHADOWS */
  .border-brutalist { border: 4px solid currentColor; }
  .shadow-brutalist { box-shadow: 8px 8px 0 0 currentColor; }
  .shadow-brutalist-lg { box-shadow: 12px 12px 0 0 currentColor; }
  .shadow-brutalist-purple { box-shadow: 8px 8px 0 0 var(--color-accent-purple); }
  .shadow-brutalist-purple-lg { box-shadow: 12px 12px 0 0 var(--color-accent-purple); }
  .shadow-brutalist-purple-sm { box-shadow: 4px 4px 0 0 var(--color-accent-purple); }
  .glow-purple { box-shadow: 0 0 20px var(--color-accent-purple-glow), 0 0 40px var(--color-accent-purple-glow); }
  .glow-purple-sm { box-shadow: 0 0 12px var(--color-accent-purple-glow); }

  /* PURPLE ACCENT */
  .text-accent-purple { color: var(--color-accent-purple); }
  .text-accent-purple-light { color: var(--color-accent-purple-light); }
  .text-accent-purple-dark { color: var(--color-accent-purple-dark); }
  .bg-accent-purple { background-color: var(--color-accent-purple); }
  .bg-accent-purple-light { background-color: var(--color-accent-purple-light); }
  .bg-accent-purple-dark { background-color: var(--color-accent-purple-dark); }
  .bg-accent-purple-glow { background-color: var(--color-accent-purple-glow); }
  .border-accent-purple { border-color: var(--color-accent-purple); }
  .border-accent-purple-light { border-color: var(--color-accent-purple-light); }
  .underline-purple { text-decoration: underline; text-decoration-color: var(--color-accent-purple); text-decoration-thickness:3px; text-underline-offset:0.2em; }
  .border-l-purple { border-left: 4px solid var(--color-accent-purple); }
  .nav-link-purple { position: relative; }
  .nav-link-purple::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:3px; background-color:var(--color-accent-purple); transition:width 0.25s ease; }
  .nav-link-purple:hover::after, .nav-link-purple:focus-visible::after { width: 100%; }
}

/* GLITCH EFFECT */
.glitch-text { position: relative; overflow: hidden; }
.glitch-text::before, .glitch-text::after { content: attr(data-text); position:absolute; top:0; left:0; width:100%; height:100%; }
@keyframes glitch-anim-1 { 0%,100%{transform:translate(0);opacity:0} 50%{transform:translate(-2px,2px);opacity:0.8} }
@keyframes glitch-anim-2 { 0%,100%{transform:translate(0);opacity:0} 50%{transform:translate(2px,-2px);opacity:0.8} }
.glitch-text:hover::before { animation: glitch-anim-1 0.3s cubic-bezier(0.25,0.46,0.45,0.94) both; color:#ff0000; z-index:-1; }
.glitch-text:hover::after  { animation: glitch-anim-2 0.3s cubic-bezier(0.25,0.46,0.45,0.94) both; color:#00ffff; z-index:-1; }

/* MAGNETIC CURSOR — hides native on desktop */
@media (min-width: 768px) {
  body { cursor: none; }
  a, button, [data-magnetic], [role="button"] { cursor: none; }
}

/* GRAIN TEXTURE */
.grain-overlay { position: relative; overflow: hidden; }
.grain-overlay::before {
  content: ''; position:absolute; top:0; left:0; width:100%; height:100%;
  background-image: url("data:image/svg+xml,..."); /* SVG fractal noise */
  opacity: 0.03; pointer-events: none;
  animation: grain 8s steps(10) infinite;
}
@keyframes grain {
  0%,100%{transform:translate(0,0)} 10%{transform:translate(-5%,-10%)} 20%{transform:translate(-15%,5%)}
  30%{transform:translate(7%,-25%)} 40%{transform:translate(-5%,25%)} 50%{transform:translate(-15%,10%)}
  60%{transform:translate(15%,0%)} 70%{transform:translate(0%,15%)} 80%{transform:translate(3%,35%)} 90%{transform:translate(-10%,10%)}
}

/* SHADOW OVERRIDES (hardcoded with !important — beats @layer utilities) */
.shadow-brutalist { box-shadow: 8px 8px 0 #000000 !important; }
.dark .shadow-brutalist { box-shadow: 8px 8px 0 #ffffff !important; }
.shadow-brutalist-inverted { box-shadow: 8px 8px 0 #ffffff !important; }
.dark .shadow-brutalist-inverted { box-shadow: 8px 8px 0 #000000 !important; }
.shadow-brutalist-sm { box-shadow: 4px 4px 0 #ffffff !important; }
.dark .shadow-brutalist-sm { box-shadow: 4px 4px 0 #000000 !important; }
```

---

## FILE: `tailwind.config.js` (tokens + plugins)

```js
const plugin = require("tailwindcss/plugin")
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        "accent-purple": {
          DEFAULT: "var(--color-accent-purple)",
          light: "var(--color-accent-purple-light)",
          dark: "var(--color-accent-purple-dark)",
          glow: "var(--color-accent-purple-glow)",
        },
        destructive: "var(--destructive)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        sm: "var(--radius-sm)", md: "var(--radius-md)",
        lg: "var(--radius-lg)", xl: "var(--radius-xl)",
      },
      fontFamily: {
        sans:  ["var(--font-geist)", "sans-serif"],
        mono:  ["var(--font-geist-mono)", "monospace"],
        bebas: ["var(--font-bebas)", "sans-serif"],
        space: ["var(--font-space)", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities, theme }) {
      addUtilities({
        ".text-outlined": {
          "-webkit-text-stroke": `4px ${theme("colors.foreground")}`,
          "-webkit-text-fill-color": "transparent",
          "paint-order": "stroke fill",
        },
        ".text-outlined-hover": {
          "-webkit-text-stroke": `2px ${theme("colors.foreground")}`,
          "-webkit-text-fill-color": "transparent",
          "transition": "-webkit-text-fill-color 0.3s ease",
        },
        ".text-outlined-hover:hover": {
          "-webkit-text-fill-color": theme("colors.foreground"),
        },
      })
    }),
  ],
}
```

---

## FILE: `app/[locale]/layout.tsx` (font loading + providers)

```tsx
import { Geist, Geist_Mono, Bebas_Neue, Inter_Tight } from "next/font/google"
import { ThemeProvider } from "@/components/shared/theme-provider"
import { MagneticCursor } from "@/components/shared/magnetic-cursor"
import "./globals.css"

const geist     = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" })
const interTight = Inter_Tight({
  subsets: ["latin"], variable: "--font-space",
  weight: ["400","500","600","700","800","900"]
})

// Body class:
// `${geist.variable} ${geistMono.variable} ${bebasNeue.variable} ${interTight.variable} font-sans antialiased`

// Providers: ThemeProvider (attribute="class", defaultTheme="system") + NextIntlClientProvider
// Cursor: <MagneticCursor /> rendered inside ThemeProvider, outside content
```

---

## FILE: `components/brutalist-text.tsx` (reusable style components)

```tsx
// BrutalistLine: thick accent border on one side
export function BrutalistLine({ position="left", thickness=4, children, className })
// → className="border-foreground" + dynamic border-{position}-width style

// BrutalistText: text with brutalist variants
export function BrutalistText({ variant="filled", size="md", font="default", hover=false, as="div" })
// variants: outlined | outlined-thick | outlined-thin | filled | inverted
// sizes: xs | sm | md | lg | xl | 2xl | 3xl
// fonts: default | bebas | space | mono
// hover: adds text-outlined-hover (fills on hover)
// always: font-bold uppercase

// BrutalistBox: container box
export function BrutalistBox({ variant="border" })
// border:  "border-4 border-foreground p-6"
// filled:  "bg-foreground text-background p-6"
// shadow:  "border-4 border-foreground p-6 shadow-brutalist"
```

---

## FILE: `components.json` (shadcn/ui config)

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "app/[locale]/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": { "components": "@/components", "utils": "@/lib/utils", "ui": "@/components/ui" }
}
```

---

## FILE: `lib/color-utils.ts` (nav dynamic contrast)

```ts
// Used by nav to auto-detect section bg and set text/border color for contrast
export function rgbToHex(rgb: string): string  // "rgb(250,250,250)" → "#fafafa"
export function isLightColor(color: string): boolean  // W3C luminance formula
export function getContrastColor(bg: string): string  // returns "#000000" or "#ffffff"
```

---

## SECTION ARCHITECTURE SUMMARY

```
PortfolioIntro  → bg-foreground text-background (always dark)  id="intro"
  └─ grain-overlay, BackgroundBlobs (parallax), GSAP name reveal
  └─ Sub-section: id="manifesto" → ScrollTextReveal (pinned word reveal)

MatrixZone      → matrix canvas bg, wraps 4 sections
  PortfolioProof   → impact stats
  PortfolioOrigin  → origin story
  PortfolioJourney → career timeline
  PortfolioSkills  → tech skills grid

PortfolioVision → vision/future section
PortfolioBlogShowcase → recent essays
PortfolioConnect → contact CTA
PortfolioFooter → footer
```

---

## KEY INTERACTIVE ELEMENTS

### Nav (`components/portfolio/nav.tsx`)
- Fixed top, z-50
- Background and text/border color **auto-adapts** to the section below via `lib/use-section-background.ts` + `getContrastColor`
- Purple hover underline on all links (`.nav-link-purple`)
- GSAP entrance animation (slide from top, once per session)
- Mobile: portal-rendered overlay menu

### CTA Buttons (from `intro.tsx`)
```tsx
// Primary (purple bg)
className="px-8 py-4 bg-accent-purple text-black border-4 border-background
           font-black text-lg tracking-wide shadow-brutalist
           hover:shadow-brutalist-lg hover:translate-x-1 hover:translate-y-1 transition-all"

// Secondary (ghost)
className="px-8 py-4 bg-transparent text-background border-4 border-background
           font-black text-lg tracking-wide shadow-brutalist
           hover:shadow-brutalist-lg hover:bg-background hover:text-foreground
           hover:translate-x-1 hover:translate-y-1 transition-all"
```

### Scroll Indicator (from `intro.tsx`)
```tsx
// Mouse icon with bouncing dot animation (GSAP y:10, repeat:-1, yoyo)
<div className="w-6 h-10 border-2 border-background flex items-start justify-center p-2">
  <div className="w-1.5 h-3 bg-background" />
</div>
```
