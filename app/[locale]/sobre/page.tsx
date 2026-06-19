import { Metadata } from "next"
import { PortfolioNav } from "@/components/portfolio/nav"
import { PortfolioAbout } from "@/components/portfolio/about"
import { PortfolioOrigin } from "@/components/portfolio/origin"
import { PortfolioJourney } from "@/components/portfolio/journey"
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
    en: "About — Sérgio Alexandre",
    "pt-BR": "Sobre — Sérgio Alexandre",
  }

  const descriptions: Record<string, string> = {
    en: "Who I am, where I come from, and how my trajectory shaped the way I build.",
    "pt-BR": "Quem eu sou, de onde venho e como a minha trajetória moldou a forma como construo.",
  }

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${BASE_URL}/${locale}/sobre`,
      siteName: "SAERIX",
      type: "website",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/sobre`,
      languages: {
        en: "/en/sobre",
        "pt-BR": "/pt-BR/sobre",
      },
    },
  }
}

export default async function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <PortfolioNav />
      <div className="pt-24">
        <PortfolioAbout />
        <PortfolioOrigin />
        <PortfolioJourney />
      </div>
      <PortfolioFooter />
    </main>
  )
}
