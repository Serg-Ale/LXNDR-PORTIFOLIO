# Brutalist Typography System - Usage Examples

## Overview
Your new brutalist typography system includes:
- **2 new fonts**: Bebas Neue (ultra-bold display) and Space Grotesk (geometric sans)
- **Custom CSS utilities**: Outlined text effects and brutalist shadows
- **Reusable components**: `BrutalistText`, `BrutalistBox`, `BrutalistLine`
- **Full i18n support**: Works with both English and Portuguese

## CSS Utilities

### Outlined Text
```tsx
<h1 className="text-outlined">Outlined Text</h1>
<h1 className="text-outlined-thick">Thicker Outline</h1>
<h1 className="text-outlined-thin">Thin Outline</h1>

// With hover effect (fills on hover)
<h1 className="text-outlined text-outlined-hover">Hover Me</h1>
```

### Font Families
```tsx
<h1 className="font-bebas">Bebas Neue Font</h1>
<p className="font-space">Space Grotesk Font</p>
<code className="font-mono">Geist Mono Font</code>
```

### Brutalist Shadows
```tsx
<div className="shadow-brutalist">Regular Shadow</div>
<div className="shadow-brutalist-lg">Large Shadow</div>
<div className="shadow-brutalist-sm">Small Shadow</div>
```

## Reusable Components

### BrutalistText Component
Located at: `components/brutalist-text.tsx:5`

```tsx
import { BrutalistText } from "@/components/brutalist-text"

// Basic usage
<BrutalistText>Hello World</BrutalistText>

// Outlined text with Bebas Neue font
<BrutalistText 
  variant="outlined-thick" 
  font="bebas" 
  size="2xl"
  hover
>
  CODE WITH PURPOSE
</BrutalistText>

// Inverted style (black background, white text)
<BrutalistText variant="inverted" size="lg">
  Important Message
</BrutalistText>

// Custom element (h1, h2, etc.)
<BrutalistText as="h1" size="xl" font="space">
  Page Title
</BrutalistText>
```

**Props:**
- `variant`: "outlined" | "outlined-thick" | "outlined-thin" | "filled" | "inverted"
- `size`: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
- `font`: "default" | "bebas" | "space" | "mono"
- `hover`: boolean (enables fill-on-hover for outlined text)
- `as`: HTML element to render (h1-h6, p, span, div)

### BrutalistBox Component
Located at: `components/brutalist-text.tsx:51`

```tsx
import { BrutalistBox } from "@/components/brutalist-text"

// Border style (4px border)
<BrutalistBox variant="border">
  <p>Content inside bordered box</p>
</BrutalistBox>

// Filled style (inverted colors)
<BrutalistBox variant="filled">
  <h3>Important Content</h3>
</BrutalistBox>

// Shadow style (border + brutalist shadow)
<BrutalistBox variant="shadow">
  <p>Content with shadow effect</p>
</BrutalistBox>
```

### BrutalistLine Component
Located at: `components/brutalist-text.tsx:73`

```tsx
import { BrutalistLine } from "@/components/brutalist-text"

// Left border accent
<BrutalistLine position="left" thickness={8}>
  <p>Text with left accent line</p>
</BrutalistLine>

// Top border
<BrutalistLine position="top" thickness={4}>
  <div>Section with top border</div>
</BrutalistLine>
```

## Real-World Examples

### Hero Section Enhancement
```tsx
export function EnhancedHero() {
  return (
    <section>
      <BrutalistText 
        as="h1" 
        variant="outlined-thick" 
        font="bebas" 
        size="3xl"
        hover
      >
        YOUR NAME
      </BrutalistText>
      
      <BrutalistLine position="left" thickness={8}>
        <BrutalistText size="xl" font="space">
          YOUR TITLE
        </BrutalistText>
      </BrutalistLine>
    </section>
  )
}
```

### Project Card with Impact Typography
```tsx
export function ProjectCard({ title, description }: Props) {
  return (
    <BrutalistBox variant="shadow">
      <BrutalistText as="h3" size="lg" font="bebas">
        {title}
      </BrutalistText>
      <p className="text-lg font-semibold mt-4">{description}</p>
    </BrutalistBox>
  )
}
```

### Call-to-Action Section
```tsx
export function ImpactCTA() {
  return (
    <section className="py-24">
      <BrutalistText 
        variant="outlined" 
        font="bebas" 
        size="2xl"
        hover
        className="cursor-pointer"
      >
        LET'S BUILD SOMETHING
      </BrutalistText>
      
      <BrutalistBox variant="filled" className="mt-8">
        <BrutalistText as="p" size="md">
          REACH OUT TODAY
        </BrutalistText>
      </BrutalistBox>
    </section>
  )
}
```

## Animation Patterns

The manifesto section demonstrates advanced GSAP patterns you can reuse:

### Scale + Fade Entrance
```tsx
gsap.from(element, {
  scrollTrigger: {
    trigger: element,
    start: "top bottom-=100",
  },
  scale: 0.8,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
})
```

### Stagger Animation
```tsx
gsap.from(".items", {
  scrollTrigger: {
    trigger: container,
    start: "top bottom-=50",
    scrub: 1,
  },
  y: 100,
  opacity: 0,
  stagger: 0.15,
})
```

### Parallax Effect
```tsx
gsap.to(element, {
  scrollTrigger: {
    trigger: section,
    start: "top center",
    end: "bottom top",
    scrub: 2,
  },
  y: -50,
})
```

## Responsive Considerations

All components are fully responsive:
- Text sizes use `clamp()` for fluid typography
- Padding adjusts with `md:` breakpoints
- Mobile-optimized stroke widths (thinner on small screens)

## Performance Tips

1. Use `will-change: transform` on animated elements
2. Limit outlined text to large headings (rendering intensive)
3. Prefer GSAP's scrub animations for smooth scroll effects
4. Use `gsap.context()` for automatic cleanup

## Color Customization

All utilities use theme colors, so they adapt to light/dark mode:
- `theme('colors.foreground')` for text/borders
- `theme('colors.background')` for fills
- Works with your existing color system

## Files Modified/Created

1. `app/[locale]/layout.tsx:4` - Added Bebas Neue & Space Grotesk fonts
2. `styles/globals.css:118` - Added outlined text and shadow utilities
3. `messages/en.json:23` - Added manifesto translations (English)
4. `messages/pt-BR.json:23` - Added manifesto translations (Portuguese)
5. `components/portfolio-manifesto.tsx` - Main manifesto section
6. `components/brutalist-text.tsx` - Reusable typography components
7. `app/[locale]/page.tsx:16` - Integrated manifesto between About and Experience

## Next Steps

To test the new section:
```bash
pnpm dev
```

Then visit:
- http://localhost:3000/en - English version
- http://localhost:3000/pt-BR - Portuguese version

Scroll to the manifesto section (between About and Experience) to see the impact typography in action!
