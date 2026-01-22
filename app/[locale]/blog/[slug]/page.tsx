import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog/server"
import { BlogPostHeader } from "@/components/blog/blog-post-header"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { BlogShareButtons } from "@/components/blog/blog-share-buttons"
import { BlogRelatedPosts } from "@/components/blog/blog-related-posts"
import { PortfolioNav } from "@/components/portfolio/nav"
import { PortfolioFooter } from "@/components/portfolio/footer"

interface PageProps {
  params: Promise<{
    locale: "en" | "pt-BR"
    slug: string
  }>
}

export async function generateStaticParams() {
  const locales: Array<"en" | "pt-BR"> = ["en", "pt-BR"]
  const params = []

  for (const locale of locales) {
    const posts = await getAllPosts(locale, false)
    for (const post of posts) {
      params.push({ locale, slug: post.slug })
    }
  }

  return params
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  // Get related posts
  const allPosts = await getAllPosts(locale, false)
  const relatedPosts = getRelatedPosts(post, allPosts, 3)

  // Get current URL for sharing
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const postUrl = `${baseUrl}/${locale}/blog/${slug}`

  return (
    <main className="min-h-screen bg-background">
      <PortfolioNav />

      <article className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <BlogPostHeader post={post} locale={locale} />
          <BlogPostContent content={post.content} />
          <BlogRelatedPosts posts={relatedPosts} locale={locale} />
        </div>
      </article>

      {/* Share Buttons */}
      <BlogShareButtons title={post.title} url={postUrl} />

      <PortfolioFooter />
    </main>
  )
}
