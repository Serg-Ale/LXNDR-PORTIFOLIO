// PROTOTYPE — throwaway content for /dev redesign exploration.
// Sourced from the Aug 2026 resume (~/Downloads/curriculo). English only —
// this file exists to let the three variants judge storytelling with real
// facts instead of lorem ipsum. Not wired to next-intl. Delete with the rest
// of the prototype once a direction is picked.

export const devResumeData = {
  name: "Sérgio Alexandre",
  role: "Software Engineer",
  roleLine: "TypeScript, Next.js & AI-Applied Development",
  location: "Londrina, PR — Brazil",
  remoteNote: "Working remotely, open to international teams",
  email: "sergioalexandre0716@gmail.com",
  github: "github.com/serg-Ale",
  linkedin: "linkedin.com/in/serg-alexandre",
  cvHref: "/cv.pdf",

  bio: "Developer with a solid foundation in TypeScript and Next.js, working across two products at Aeon Audio and as a technical partner at a second company. I combine technical execution with product maturity — I've led a ground-up SaaS rebuild, designed a full client-product interaction end to end, and mentor an intern. I'm naturally curious: I question how things work, and build better solutions when something doesn't feel right.",

  // Same bio, broken into typographic beats instead of one block — for the
  // B1 magazine round, where each fragment can carry its own scale/weight.
  bioFragments: [
    "Developer with a solid foundation in TypeScript and Next.js — working across two products at Aeon Audio, and as a technical partner at a second company.",
    "I combine technical execution with product maturity: I've led a ground-up SaaS rebuild, designed a full client-product interaction end to end, and mentor an intern.",
    "I'm naturally curious. When something doesn't feel right, I build a better solution instead of working around it.",
  ],

  // One line for the hero — the full breakdown lives in Experience, this
  // shouldn't repeat it, just orient the reader before the record does.
  status: "Currently building two products end-to-end at Aeon Audio, and running Kaizen as a technical partner.",

  now: [
    "Leading development on a DJ/producer feedback platform at Aeon Audio — rebuilt the MVP from scratch in TypeScript/Next.js after a prior attempt never reached production. It's live now.",
    "Building Corta Aí, a multi-tenant SaaS for barbershops where WhatsApp is the primary customer interface — booking, cancelling and rescheduling happen entirely through conversation, backed by an admin backoffice.",
    "Running a technical partnership at Kaizen, a home/gate automation product connecting WhatsApp to physical access-control hardware (Intelbras, Hikvision) — I own the full customer-facing experience: UI/UX, WhatsApp flow, backoffice, visual identity.",
  ],

  experience: [
    {
      role: "Software Engineer",
      org: "Aeon Audio (formerly Union Audio)",
      period: "Jan 2025 — Present",
      location: "Ponta Grossa, PR (Remote)",
      bullets: [
        "One of the lead developers, full-stack, on a 4–5 person team, across two products.",
        "Led the MVP rebuild of the DJ/producer platform in TypeScript/Next.js after a prior cycle stalled before shipping — now live in production.",
        "Designed and built n8n integrations for Corta Aí, including generative-AI and WhatsApp chatbots handling real booking flows.",
        "Embeds AI into the development cycle itself — review, prototyping, day-to-day productivity.",
        "Mentors an intern, tracking their technical growth and autonomy.",
      ],
    },
    {
      role: "Developer / Technical Partner",
      org: "Kaizen",
      period: "May 2026 — Present",
      location: "Remote",
      bullets: [
        "Own company/partnership, separate from Aeon Audio — home and gate automation via WhatsApp integrated with physical access-control equipment.",
        "Primary owner of the full customer interaction: UI/UX, WhatsApp flow, backoffice, and the product's visual identity.",
      ],
    },
    {
      role: "Trainee & Intern",
      org: "Tata Consultancy Services",
      period: "Jun 2022 — Nov 2023",
      location: "Londrina, PR",
      bullets: [
        "Started in development (frontend to backend), then moved into critical infrastructure support.",
        "Led a team on a capstone project.",
      ],
    },
  ],

  projects: [
    {
      title: "Como-Eles-Votaram",
      tagline: "Political transparency platform: how Brazilian congresspeople actually vote vs. what they promise.",
      tech: ["Next.js", "tRPC", "Prisma", "PostgreSQL", "n8n"],
      detail: "Automatic sync every 6h straight from the official Chamber of Deputies and Federal Senate APIs. Unit tests, full SEO (sitemap, dynamic Open Graph).",
      url: "https://github.com/serg-Ale/comoeles-votaram",
    },
    {
      title: "Aeon Audio",
      tagline: "DJ/producer feedback platform — the product I lead at my day job.",
      tech: ["Next.js 16", "React 19", "TypeScript", "React Query", "Prisma"],
      detail: "Rebuilt the MVP from scratch after a prior attempt never reached production. Live now, core features shipped.",
      url: "https://www.unionaudio.com.br",
    },
    {
      title: "This Portfolio",
      tagline: "The site you're looking at right now.",
      tech: ["Next.js 16", "React 19", "GSAP", "next-intl"],
      detail: "Scroll-triggered animation, i18n (EN/PT-BR), and — as of this redesign — an honest attempt to sound like a person instead of a pitch deck.",
      url: null,
    },
  ],

  // Ordered by relevance to the roles being targeted, not alphabetically or
  // by category — core is what ships product day to day; also-uses is real
  // but secondary, and should read quieter, not equal weight.
  skills: {
    core: ["TypeScript", "Next.js", "React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    also: ["NestJS", "Prisma ORM", "TypeORM", "Docker", "n8n", "GSAP", "Java", "Python", "Git"],
  },

  education: {
    degree: "Systems Analysis and Development",
    org: "UTFPR — Federal University of Technology, Paraná",
    period: "Jul 2022 — Dec 2025",
  },

  languages: [
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "C2, Full Proficiency (EF SET, verifiable certificate)" },
  ],

  lookingFor: "Looking for what's next: a remote role on an international team, shipping real products end to end. Not just shipping them — sticking around to make them better once they're live.",

  // Each fragment does one job: signal (I'm open) → the ask (what,
  // specifically) → the trait (ownership past launch). Mirrors the bio's
  // who/proof/character split, and the last beat gets the same accent
  // treatment as the bio's — a deliberate echo, not a coincidence.
  lookingForFragments: [
    "Looking for what's next.",
    "A remote role on an international team, shipping real products end to end.",
    "Not just shipping it — sticking around to make it better once it's live.",
  ],
}

export type DevResumeData = typeof devResumeData
