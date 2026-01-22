# Agent Guidelines for Next.js Portfolio Project

## Project Overview

This is a **Next.js 16 App Router** application with the following stack:
- **Framework**: Next.js 16 with React 19, TypeScript 5
- **Styling**: Tailwind CSS v4, shadcn/ui components, brutalist design aesthetic
- **Animations**: GSAP with ScrollTrigger for complex scroll-based animations
- **Internationalization**: next-intl supporting `en` and `pt-BR` locales
- **Architecture**: Server Components by default, client components for interactivity
- **Package Manager**: pnpm
- **Note**: No test framework currently configured. Consider jest or vitest for future testing needs.

---

## Build, Lint, and Development Commands

```bash
# Development server (with hot reload)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint

# Type checking (recommended before commits)
pnpm tsc --noEmit

# Note: No test command available - no test framework configured yet
```

**Important**: `next.config.mjs` has `ignoreBuildErrors: true` which is not recommended for production. Consider addressing TypeScript errors and removing this flag.

---

## Naming Conventions

### File Naming

#### Next.js Special Files (Framework conventions - must follow exactly)
- **Route files**: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
- **API routes**: `route.ts`
- **Other special files**: `template.tsx`, `default.tsx`, `middleware.ts`

#### Component Files
- **Regular components**: `kebab-case.tsx`
  - ✅ `portfolio-hero.tsx`, `language-switcher.tsx`, `theme-provider.tsx`
  - ❌ `PortfolioHero.tsx`, `portfolio_hero.tsx`
- **UI components** (shadcn/ui): `kebab-case.tsx` in `components/ui/`
  - ✅ `button.tsx`, `input.tsx`, `card.tsx`

#### Utility & Configuration Files
- **Utilities**: `kebab-case.ts`
  - ✅ `utils.ts`, `api-client.ts`
- **Config files**: Follow framework conventions
  - `next.config.mjs`, `tailwind.config.ts`, `i18n.ts`

#### Test Files (when implemented)
- Match source file with `.test.tsx` or `.spec.tsx` suffix
  - ✅ `portfolio-hero.test.tsx`, `utils.spec.ts`

### Folder Naming

#### Next.js Route Segments (Framework conventions)
- **Regular routes**: `lowercase` (single word) or `kebab-case` (multi-word)
  - ✅ `app/blog/`, `app/user-profile/`, `app/about/`
  - ❌ `app/Blog/`, `app/UserProfile/`
- **Dynamic routes**: `[param]`, `[...slug]`, `[[...slug]]`
  - ✅ `app/blog/[slug]/`, `app/shop/[...categories]/`
- **Route groups**: `(group-name)` - organize routes without affecting URL
  - ✅ `app/(marketing)/`, `app/(shop)/` for shared layouts
- **Private folders**: `_folder-name` - non-routable, safe for colocation
  - ✅ `app/_components/`, `app/blog/_lib/` for route-specific code
- **Parallel routes**: `@slot-name` for named slots
  - ✅ `app/@modal/`, `app/dashboard/@analytics/`

#### Component Organization Folders
- **Shared folders**: `lowercase` preferred
  - ✅ `components/`, `lib/`, `hooks/`, `utils/`, `types/`
- **Feature folders**: `kebab-case`
  - ✅ `components/user-profile/`, `lib/api-client/`

### Code Naming

#### Components
- **React components**: `PascalCase`
  ```typescript
  export function PortfolioHero() { }
  export function LanguageSwitcher() { }
  ```

#### Functions & Variables
- **Functions**: `camelCase`
  ```typescript
  function toggleLocale() { }
  async function generateMetadata() { }
  ```
- **Custom hooks**: `camelCase` with `use` prefix
  ```typescript
  function useScrollPosition() { }
  ```
- **Variables**: `camelCase`
  ```typescript
  const isScrolled = true
  const heroRef = useRef<HTMLDivElement>(null)
  ```
- **Constants**: `camelCase` for objects, `UPPER_SNAKE_CASE` for env/config
  ```typescript
  const buttonVariants = cva(...)       // Objects/arrays
  const defaultLocale = "en"            // Regular constants
  const API_KEY = process.env.API_KEY   // Environment variables
  ```

#### Types & Interfaces
- **Types/Interfaces**: `PascalCase`
  ```typescript
  type UserProfile = { ... }
  interface ButtonProps { ... }
  type PageProps<T extends string> = { ... }
  ```
- **Type parameters**: Single `T` or descriptive `PascalCase`
  ```typescript
  function identity<T>(value: T): T
  function groupBy<TItem, TKey>(...)
  ```

#### CSS & Styling
- **CSS classes**: `kebab-case` or Tailwind utilities
  ```typescript
  className="portfolio-hero text-brutalist shadow-brutalist"
  ```
- **CSS variables**: `--kebab-case`
  ```css
  --color-primary, --font-size-base
  ```

#### Translation Keys (i18n)
- **Keys**: `camelCase` with dot notation for nesting
  ```json
  {
    "hero": { "title": "...", "callToAction": "..." },
    "nav": { "home": "...", "aboutUs": "..." }
  }
  ```

### Next.js 15+ Specific Patterns

#### Async Params (Required in Next.js 15+)
```typescript
// ✅ Correct - params is Promise
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
}
```

#### Exports
- **Components**: Named exports preferred (except `page.tsx`, `layout.tsx`)
  ```typescript
  export function PortfolioHero() { }  // Named export
  export default function Page() { }    // Default for page/layout
  ```

---

## Code Style Guidelines

### Import Patterns

Use **absolute imports** with `@/` path alias configured in `tsconfig.json`:

```typescript
// ✅ Correct
import { PortfolioHero } from "@/components/portfolio-hero"
import { cn } from "@/lib/utils"
import { routing } from "@/i18n/routing"

// ❌ Avoid relative imports for shared code
import { cn } from "../../lib/utils"
```

**Import order** (not strictly enforced, but recommended):
1. React/Next.js imports
2. Third-party libraries
3. Internal components/utilities

```typescript
import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { PortfolioNav } from "@/components/portfolio-nav"
```

### TypeScript Usage

- **Strict mode enabled**: All code must be type-safe
- **Type inference preferred**: Let TypeScript infer when possible
- **Inline types**: No separate type files unless needed for sharing
- **Explicit typing for refs**:
  ```typescript
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  ```
- **Async params**: Always type as `Promise<{ param: type }>`
- **Avoid `any`**: Use proper types or `unknown` with type guards

### Component Structure

#### Client Components Pattern
```typescript
"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioHero() {
  const t = useTranslations("hero")
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
      })
    }, heroRef)

    return () => ctx.revert() // Always cleanup
  }, [])

  return (
    <section ref={heroRef}>
      <h1>{t("title")}</h1>
    </section>
  )
}
```

**Key patterns**:
- Use `"use client"` directive for client components
- Import `useTranslations` for i18n
- Register GSAP plugins at module level
- Use `gsap.context()` for animation cleanup
- Always return cleanup function from `useEffect`

### Formatting Style

- **Indentation**: 2 spaces
- **Quotes**: Double quotes `"..."` for strings
- **Semicolons**: Not used (omit semicolons)
- **JSX**: Multi-line attributes with proper indentation
  ```typescript
  <section
    ref={heroRef}
    className="min-h-screen flex items-center"
  >
    {children}
  </section>
  ```
- **Long Tailwind classes**: Keep on single line
  ```typescript
  className="text-[clamp(3rem,15vw,12rem)] font-black leading-none"
  ```

### State Management

- **No global state library** - Use React hooks only
- **Local state**: `useState` for component state
- **DOM refs**: `useRef` for DOM manipulation and GSAP targets
- **Server state**: Pass data via props from Server Components
- **URL state**: Use `useRouter`, `usePathname` from `@/i18n/routing`

```typescript
const [isScrolled, setIsScrolled] = useState(false)
const heroRef = useRef<HTMLDivElement>(null)
const locale = useLocale()
```

### GSAP Animation Patterns

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    // Animations here
    gsap.from(element, { ... })
    
    ScrollTrigger.create({
      trigger: element,
      start: "top center",
      // ...
    })
  }, containerRef)

  return () => ctx.revert() // Required cleanup
}, [])
```

### Internationalization (i18n)

- **Client components**: Use `useTranslations` hook
  ```typescript
  const t = useTranslations("hero")
  return <h1>{t("title")}</h1>
  ```
- **Server components**: Use `getTranslations`
  ```typescript
  const t = await getTranslations("hero")
  ```
- **Translation files**: Located in `messages/en.json`, `messages/pt-BR.json`
- **Routing**: Use imports from `@/i18n/routing` not `next/navigation`

### Error Handling

- **Minimal explicit error handling** - Rely on Next.js error boundaries
- Use `notFound()` for invalid routes
- Use optional chaining for defensive checks
- GSAP cleanup prevents most animation-related errors

```typescript
if (!routing.locales.includes(locale as any)) {
  notFound()
}

if (!element) return // Guard clauses
```

### CSS & Styling

- **Utility-first Tailwind**: Use Tailwind classes directly
- **Class merging**: Use `cn()` utility from `@/lib/utils`
  ```typescript
  import { cn } from "@/lib/utils"
  className={cn(buttonVariants({ variant, size }), className)}
  ```
- **Custom utilities**: Available in `styles/globals.css`
  - `text-brutalist`, `shadow-brutalist`, `border-brutalist`
- **Responsive**: Use Tailwind breakpoints and `clamp()` for fluid typography

---

## Project Structure

**Strategy**: Files outside `app/` directory (clear separation of routing and code)

```
project/
├── app/
│   └── [locale]/          # Internationalized routes
│       ├── page.tsx       # Home page (default export)
│       └── layout.tsx     # Root layout (default export)
├── components/            # All React components (named exports)
│   ├── ui/               # shadcn/ui components
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── portfolio-hero.tsx
│   ├── portfolio-nav.tsx
│   └── language-switcher.tsx
├── lib/                   # Utility functions
│   └── utils.ts          # Contains cn() utility
├── messages/              # Translation files
│   ├── en.json
│   └── pt-BR.json
├── i18n/                  # i18n configuration
│   └── routing.ts
├── styles/                # Global styles
│   └── globals.css
└── public/                # Static assets

# Path alias: @/* maps to ./* (root directory)
```

**Optional pattern**: Use `_folder` for route-specific code inside `app/`:
```
app/
  blog/
    page.tsx
    _components/     # Blog-specific components (not routable)
    _lib/            # Blog-specific utilities (not routable)
```

---

## Blog Content Structure

Published posts live in `content/posts/` with each post in its own folder:

```
content/posts/
├── post-name/
│   ├── index.en.mdx      # English version
│   ├── index.pt-BR.mdx   # Brazilian Portuguese version
│   └── images/           # Post-specific assets (optional)
```

**Frontmatter format:**

```yaml
---
title: "Post Title"
date: "2024-01-22"
description: "Brief description for SEO and previews"
tags: ["tag1", "tag2"]
draft: false
---
```

### Drafts

Work-in-progress posts in `content/drafts/`. Drafts are only visible in development mode. Move to `content/posts/` when both language versions are complete.

### Adding Images

Place images in the post's `images/` folder and reference in MDX:

```markdown
![Description](/images/diagram.png)
```

---

## Common Code Patterns

### Client Component with GSAP Animation

```typescript
"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function AnimatedSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return <div ref={sectionRef}>Content</div>
}
```

### Async Page with Params

```typescript
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const data = await fetchData(slug)
  
  return <div>{data.title}</div>
}
```

### Translation Usage

```typescript
// Client component
"use client"
import { useTranslations } from "next-intl"

export function Hero() {
  const t = useTranslations("hero")
  return <h1>{t("title")}</h1>
}

// Server component
import { getTranslations } from "next-intl/server"

export default async function Page() {
  const t = await getTranslations("hero")
  return <h1>{t("title")}</h1>
}
```

### Locale Switching

```typescript
"use client"

import { usePathname, useRouter } from "@/i18n/routing"
import { useLocale } from "next-intl"
import { useTransition } from "react"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "pt-BR" : "en"
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <button onClick={toggleLocale} disabled={isPending}>
      {locale === "en" ? "PT" : "EN"}
    </button>
  )
}
```

---

## Additional Notes

- **ESLint**: Linting is available via `pnpm lint` (config uses Next.js defaults)
- **No index files**: Import components directly by file name
- **Vercel Analytics**: Integrated for production deployments
- **Image optimization**: Disabled (`unoptimized: true` in next.config.mjs)
- **Brutalist design**: Bold typography, high contrast, minimal decoration

---

**For questions or updates to these guidelines, consult the project maintainer.**
