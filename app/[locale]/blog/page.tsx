import { getTranslations } from "next-intl/server"
import { getAllPosts, getAllTags } from "@/lib/blog/server"
import { BlogPageClient } from "@/components/blog/blog-page-client"

interface PageProps {
  params: Promise<{
    locale: "en" | "pt-BR"
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "blog" })

  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      type: "website",
    },
  }
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params

  const [posts, tags] = await Promise.all([
    getAllPosts(locale, true),
    getAllTags(locale),
  ])

  return <BlogPageClient initialPosts={posts} allTags={tags} />
}
