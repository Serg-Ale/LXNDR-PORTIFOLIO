// Facts-only content for the /dev landing page (B1a). Locale-independent:
// names, companies, dates-as-numbers, tech stack, and URLs don't change
// between en/pt-BR. Translatable prose (bio, roles, bullets, taglines,
// looking-for copy) lives in messages/{en,pt-BR}.json under "devLanding" —
// see variant-b1a-hero.tsx and variant-b1a-magazine-spread.tsx for how the
// two are merged by array index.

export const devFacts = {
  name: "Sérgio Alexandre",
  email: "sergioalexandre0716@gmail.com",
  github: "github.com/serg-Ale",
  linkedin: "linkedin.com/in/serg-alexandre",
  cvHref: {
    en: "/cv-en.pdf",
    "pt-BR": "/cv-pt-br.pdf",
  },

  // Index-matched with messages["devLanding"].experience — org is the only
  // fact that doesn't translate; role/period/location/bullets do.
  experience: [
    { org: "Aeon Audio (formerly Union Audio)" },
    { org: "Kaizen" },
    { org: "Tata Consultancy Services" },
  ],

  // Index-matched with messages["devLanding"].projectTaglines.
  projects: [
    {
      title: "Como-Eles-Votaram",
      tech: ["Next.js", "tRPC", "Prisma", "PostgreSQL", "n8n"],
      url: "https://github.com/serg-Ale/comoeles-votaram",
    },
    {
      title: "Aeon Audio",
      tech: ["Next.js 16", "React 19", "TypeScript", "React Query", "Prisma"],
      url: "https://www.unionaudio.com.br",
    },
    {
      title: "This Portfolio",
      tech: ["Next.js 16", "React 19", "GSAP", "next-intl"],
      url: null,
    },
  ],

  // Ordered by relevance to the roles being targeted, not alphabetically or
  // by category — core is what ships product day to day; also-uses is real
  // but secondary, and should read quieter, not equal weight. Proper nouns
  // (language/framework names) — same in both locales.
  skills: {
    core: ["TypeScript", "Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    also: ["NestJS", "Prisma ORM", "TypeORM", "Docker", "n8n", "GSAP", "Java", "Python", "Git"],
  },

  education: {
    org: "UTFPR — Federal University of Technology, Paraná",
  },
}

export type DevFacts = typeof devFacts
