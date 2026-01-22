import { getTranslations } from "next-intl/server"
import { getAllPosts, getAllTags } from "@/lib/blog/server"
import { BlogPageClient } from "@/components/blog/blog-page-client"
import { BASE_URL, BLOG_DESCRIPTIONS } from "@/lib/constants"
import { Metadata } from "next"

interface PageProps {
  params: Promise<{
    locale: "en" | "pt-BR"
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: "Blog — Sérgio Alexandre",
    "pt-BR": "Blog — Sérgio Alexandre",
  }

  const keywords: Record<string, string> = {
    en: "tech blog, software engineering, Next.js tutorial, React patterns, TypeScript tips, web development, programming blog",
    "pt-BR": "blog tech, engenharia de software, tutorial Next.js, padrões React, dicas TypeScript, desenvolvimento web",
  }

  return {
    title: titles[locale],
    description: BLOG_DESCRIPTIONS[locale],
    keywords: keywords[locale],
    openGraph: {
      title: titles[locale],
      description: BLOG_DESCRIPTIONS[locale],
      url: `${BASE_URL}/${locale}/blog`,
      siteName: "LXNDR Portfolio",
      type: "website",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: BLOG_DESCRIPTIONS[locale],
      images: ["/og-default.png"],
    },
  }
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params

  const [posts, tags] = await Promise.all([
    getAllPosts(locale, true),
    getAllTags(locale),
  ])

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "LXNDR Blog",
    description: BLOG_DESCRIPTIONS[locale],
    url: `${BASE_URL}/${locale}/blog`,
    author: {
      "@type": "Person",
      name: "Sérgio Alexandre",
      url: BASE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogPageClient initialPosts={posts} allTags={tags} />
    </>
  )
}
