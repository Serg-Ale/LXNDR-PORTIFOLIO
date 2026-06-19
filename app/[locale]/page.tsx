import { PortalPage } from "@/components/portal/portal-page"
import { BASE_URL } from "@/lib/constants"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ locale: "en" | "pt-BR" }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: "Sérgio Alexandre — Software Engineer & SAERIX",
    "pt-BR": "Sérgio Alexandre — Engenheiro de Software & SAERIX",
  }

  const descriptions: Record<string, string> = {
    en: "Software Engineer and electronic music artist SAERIX. Choose your path.",
    "pt-BR": "Engenheiro de Software e artista de música eletrônica SAERIX. Escolha seu caminho.",
  }

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${BASE_URL}/${locale}`,
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

export default function Portal() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-bold focus:border-2 focus:border-black"
      >
        Skip to main content
      </a>
      <PortalPage />
    </>
  )
}
