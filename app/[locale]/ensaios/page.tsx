import { Metadata } from "next"
import { getAllEssays, getAllTags } from "@/lib/blog/server"
import { BlogPageClient } from "@/components/blog/blog-page-client"
import { BASE_URL, ESSAYS_DESCRIPTIONS } from "@/lib/constants"

interface PageProps {
  params: Promise<{
    locale: "en" | "pt-BR"
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: "Essays — Sérgio Alexandre",
    "pt-BR": "Ensaios — Sérgio Alexandre",
  }

  return {
    title: titles[locale],
    description: ESSAYS_DESCRIPTIONS[locale],
    openGraph: {
      title: titles[locale],
      description: ESSAYS_DESCRIPTIONS[locale],
      url: `${BASE_URL}/${locale}/ensaios`,
      siteName: "LXNDR",
      type: "website",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: ESSAYS_DESCRIPTIONS[locale],
      images: ["/og-default.png"],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/ensaios`,
      languages: {
        en: "/en/ensaios",
        "pt-BR": "/pt-BR/ensaios",
      },
    },
  }
}

export default async function EssaysPage({ params }: PageProps) {
  const { locale } = await params

  const [posts, tags] = await Promise.all([
    getAllEssays(locale, true),
    getAllTags(locale),
  ])

  return <BlogPageClient initialPosts={posts} allTags={tags} translationNamespace="essays" />
}
