import { PortfolioNav } from "@/components/portfolio/nav"
import { PortfolioFooter } from "@/components/portfolio/footer"
import { VariantB1aMagazineSpread } from "@/components/portfolio/prototype/variant-b1a-magazine-spread"
import { getAllEssays } from "@/lib/blog/server"
import { BASE_URL } from "@/lib/constants"
import { Metadata } from "next"

interface PageProps {
  params: Promise<{ locale: "en" | "pt-BR" }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: "Sérgio Alexandre — Full-Stack Software Engineer",
    "pt-BR": "Sérgio Alexandre — Engenheiro de Software Full-Stack",
  }

  const descriptions: Record<string, string> = {
    en: "Full-stack software engineer with 4+ years owning architecture end-to-end and shipping AI-powered automation at Aeon Tech and Kaizen. Open to the next opportunity.",
    "pt-BR":
      "Engenheiro de software full-stack com 4+ anos de experiência, responsável por arquitetura de ponta a ponta e automações com IA na Aeon Tech e na Kaizen. Aberto à próxima oportunidade.",
  }

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${BASE_URL}/${locale}/dev`,
      siteName: "SAERIX Portfolio",
      type: "website",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
      images: ["/og-default.png"],
    },
  }
}

export default async function DevPortfolio({ params }: PageProps) {
  const { locale } = await params

  const allPosts = await getAllEssays(locale, false)
  const recentPosts = allPosts.slice(0, 2)

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sérgio Alexandre",
    jobTitle: "Full-Stack Software Engineer",
    url: BASE_URL,
    sameAs: [
      "https://github.com/Serg-Ale",
      "https://x.com/OAlexandreSerg",
      "https://linkedin.com/in/serg-alexandre",
    ],
    worksFor: [
      {
        "@type": "Organization",
        name: "Aeon Tech",
      },
      {
        "@type": "Organization",
        name: "Kaizen",
      },
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "UTFPR",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "FastAPI",
      "Node.js",
      "PostgreSQL",
      "tRPC",
      "n8n",
      "AI Agent Orchestration",
      "WhatsApp API",
    ],
    nationality: {
      "@type": "Country",
      name: "Brazil",
    },
    speakingLanguages: ["en", "pt-BR"],
  }

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:font-bold focus:border-2 focus:border-background"
      >
        Skip to main content
      </a>
      <PortfolioNav />
      <VariantB1aMagazineSpread locale={locale} posts={recentPosts} />
      <PortfolioFooter />
    </>
  )
}
