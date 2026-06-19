import { Metadata } from "next"
import { PortfolioNav } from "@/components/portfolio/nav"
import { PortfolioProof } from "@/components/portfolio/proof"
import { PortfolioFooter } from "@/components/portfolio/footer"
import { BASE_URL } from "@/lib/constants"

interface PageProps {
  params: Promise<{
    locale: "en" | "pt-BR"
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: "Projects — Sérgio Alexandre",
    "pt-BR": "Projetos — Sérgio Alexandre",
  }

  const descriptions: Record<string, string> = {
    en: "Selected projects and proof of execution across product, engineering, and creative systems.",
    "pt-BR": "Projetos selecionados e prova de execução entre produto, engenharia e sistemas criativos.",
  }

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${BASE_URL}/${locale}/projetos`,
      siteName: "SAERIX",
      type: "website",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/projetos`,
      languages: {
        en: "/en/projetos",
        "pt-BR": "/pt-BR/projetos",
      },
    },
  }
}

export default async function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <PortfolioNav />
      <div className="pt-24">
        <PortfolioProof />
      </div>
      <PortfolioFooter />
    </main>
  )
}
