import { Metadata } from "next"
import { getAllLaboratoryEntries, getAllTags } from "@/lib/blog/server"
import { BlogPageClient } from "@/components/blog/blog-page-client"
import { BASE_URL } from "@/lib/constants"

interface PageProps {
  params: Promise<{
    locale: "en" | "pt-BR"
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: "Laboratory — Sérgio Alexandre",
    "pt-BR": "Laboratório — Sérgio Alexandre",
  }

  const descriptions: Record<string, string> = {
    en: "Experiments, automations, technical explorations, and ideas in progress.",
    "pt-BR": "Experimentos, automações, explorações técnicas e ideias em desenvolvimento.",
  }

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${BASE_URL}/${locale}/laboratorio`,
      siteName: "SAERIX",
      type: "website",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
      images: ["/og-default.png"],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/laboratorio`,
      languages: {
        en: "/en/laboratorio",
        "pt-BR": "/pt-BR/laboratorio",
      },
    },
  }
}

export default async function LaboratoryPage({ params }: PageProps) {
  const { locale } = await params

  const [posts, tags] = await Promise.all([
    getAllLaboratoryEntries(locale, true),
    getAllTags(locale),
  ])

  return (
    <BlogPageClient
      initialPosts={posts}
      allTags={tags}
      translationNamespace="laboratory"
      basePath="/laboratorio"
      contentId="laboratory-content"
    />
  )
}
