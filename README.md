# LXNDR Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14.2-0AC775?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

A modern, interactive portfolio showcasing full-stack development expertise with cutting-edge web technologies. Built with Next.js 16 App Router, featuring scroll-based animations, internationalization, and brutalist design aesthetics.

## 🚀 Live Demo

[View Portfolio](https://lxndr-portifolio.vercel.app/) • [LinkedIn](https://linkedin.com/in/serg-alexandre) • [Email](mailto:sergioalexandre0716@gmail.com)

## 📸 Preview

### Hero Section
![Portfolio Hero](./public/assets/intro.png)

### Journey Section
![Portfolio Journey](./public/assets/journey.png)

### Skills Section
![Portfolio Skills](./public/assets/skills.png)

### Impact Section
![Portfolio Impact](./public/assets/impact.png)

## 🛠️ Tech Stack

### Core Framework & Runtime
- **Next.js 16** - App Router with Server Components
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Strict type safety and modern language features
- **Node.js** - Server-side runtime

### Styling & Animation
- **Tailwind CSS v4** - Utility-first CSS framework
- **GSAP 3** - High-performance animation library with ScrollTrigger
- **shadcn/ui** - Accessible component library
- **Lucide React** - Beautiful icon library

### Internationalization & State
- **next-intl** - Complete i18n solution for Next.js
- **React Hook Form** - Performant forms with validation
- **Zod** - TypeScript-first schema validation

### Development & Deployment
- **pnpm** - Fast, disk-efficient package manager
- **ESLint** - Code linting and formatting
- **Vercel** - Production deployment with analytics
- **Vercel Analytics** - Performance monitoring

## 🎨 Design Features

### Brutalist Aesthetic
- High-contrast typography with custom font stacks
- Bold shadows and geometric elements
- Text stroke effects and outlined typography
- Custom CSS utilities for design consistency

### Interactive Animations
- **Scroll-triggered animations** using GSAP ScrollTrigger
- **Text reveal effects** with character-by-character animations
- **Glitch effects** on hover interactions
- **Magnetic cursor** for enhanced user experience
- **Parallax scrolling** with layered backgrounds
- **3D card tilts** and hover distortions

### Accessibility & Performance
- **Reduced motion support** for users with vestibular disorders
- **Keyboard navigation** and screen reader compatibility
- **Optimized images** with Next.js Image component
- **Progressive enhancement** with JavaScript fallbacks

## 🏗️ Architecture

### Project Structure
```
├── app/[locale]/           # Internationalized routes
│   ├── layout.tsx          # Root layout with i18n provider
│   └── page.tsx            # Homepage composition
├── components/             # React components
│   ├── portfolio-*.tsx     # Portfolio-specific components
│   ├── ui/                 # Reusable UI components
│   └── *-effect.tsx        # Animation utilities
├── lib/                    # Utility functions
├── messages/               # Translation files (en/pt-BR)
├── i18n/                   # Internationalization config
└── styles/                 # Global styles and Tailwind config
```

### Component Architecture
- **Server Components** by default for optimal performance
- **Client Components** for interactive features (animations, forms)
- **Composition over inheritance** with React hooks
- **Absolute imports** with `@/` path alias
- **Named exports** for better tree-shaking

### State Management
- **React hooks** for local component state
- **URL state** via Next.js router for navigation
- **Form state** with React Hook Form + Zod validation
- **No global state library** - keeping it simple and performant

## 🌍 Internationalization

Full internationalization support with:
- **English** and **Portuguese (Brazil)** locales
- **Dynamic routing** with locale prefixes
- **Client-side switching** with smooth transitions
- **SEO-optimized** metadata for each language

## 📱 Responsive Design

- **Mobile-first approach** with Tailwind CSS
- **Fluid typography** using `clamp()` functions
- **Adaptive layouts** with CSS Grid and Flexbox
- **Touch-friendly interactions** for mobile devices

## 🚀 Development

### Prerequisites
- Node.js 18+
- pnpm package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/lxndr-portifolio.git
cd lxndr-portifolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts
```bash
pnpm dev      # Development server with hot reload
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
pnpm tsc      # Type checking
```

### Environment Variables
No environment variables required for basic functionality. Add your own keys for extended features.

## 🎯 Key Components

### Portfolio Sections
- **Intro/Hero** - Animated name reveal with glitch effects
- **Journey** - Personal story with scroll animations
- **Skills** - Technical expertise with hover interactions
- **Impact** - Project highlights and achievements
- **Connect** - Contact information and call-to-action

### Animation Components
- **SplitTextReveal** - Character-by-character text animations
- **GlitchText** - CSS-based glitch effects
- **MagneticCursor** - Mouse-following cursor interactions
- **ScrollProgress** - Visual progress indicator

## 📊 Performance Features

- **Static generation** for fast loading
- **Code splitting** with dynamic imports
- **Image optimization** disabled for custom handling
- **Font optimization** with Next.js font loading
- **Bundle analysis** with built-in Next.js tools

## 🔧 Configuration

### Next.js Config
- **Internationalization** with next-intl plugin
- **TypeScript strict mode** (temporarily disabled for build)
- **Image optimization** disabled for custom asset handling
- **Analytics integration** with Vercel

### Tailwind CSS v4
- **CSS variables** for theme consistency
- **Custom utilities** for brutalist design
- **Animation keyframes** for glitch effects
- **Dark mode support** with CSS custom properties

## 📈 Professional Experience

### Current Role
**Junior Software Engineer** at Union (Sep 2025 - Present)
- Rebuilt MVP front-end with Turborepo + Next.js
- Reduced First Contentful Paint by 35% (1.2s improvement)
- Increased mobile NPS by 20% with responsive UIs
- Cut fetch errors by 40% using tRPC contracts

### Previous Experience
- **Software Engineer Intern** at Union (Jan 2025 - Sep 2025)
- **Trainee** at Tata Consultancy Services (Feb 2023 - Nov 2023)
- **Development Intern** at Tata Consultancy Services (Jun 2022 - Feb 2023)

### Education
**Systems Analysis & Development** - UTFPR (Graduating Jul 2026)

## 📞 Contact

- **Email**: sergioalexandre0716@gmail.com
- **Phone**: +55 43 98873-2020
- **Location**: Londrina, PR — Brazil
- **LinkedIn**: [linkedin.com/in/serg-alexandre](https://linkedin.com/in/serg-alexandre)
- **English**: C2 Proficiency (EF SET 72/100)

## 🤝 Contributing

This is a personal portfolio project. While contributions are not actively sought, feel free to open issues for bugs or suggestions.

## 📄 License

© 2025 Sérgio Alexandre. All rights reserved.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and deployed on [Vercel](https://vercel.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Animations powered by [GSAP](https://greensock.com/gsap/)
- Icons from [Lucide React](https://lucide.dev/)

---

*"Turning ideas into digital experiences with Next.js, React & TypeScript"*