import { Metadata } from "next"
import { PortfolioNav } from "@/components/portfolio/nav"
import { PortfolioContact } from "@/components/portfolio/contact"
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
    en: "Contact — Sérgio Alexandre",
    "pt-BR": "Contato — Sérgio Alexandre",
  }

  const descriptions: Record<string, string> = {
    en: "Get in touch for product, engineering, and creative collaborations.",
    "pt-BR": "Entre em contato para colaborações em produto, engenharia e criação.",
  }

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${BASE_URL}/${locale}/contato`,
      siteName: "SAERIX",
      type: "website",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/contato`,
      languages: {
        en: "/en/contato",
        "pt-BR": "/pt-BR/contato",
      },
    },
  }
}

export default async function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <PortfolioNav />
      <div className="pt-24">
        <PortfolioContact />
      </div>
      <PortfolioFooter />
    </main>
  )
}
