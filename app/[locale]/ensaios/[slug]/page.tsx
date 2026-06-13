import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getAllEssays, getEssayBySlug, getRelatedPosts } from "@/lib/blog/server"
import { BlogPostHeader } from "@/components/blog/blog-post-header"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { BlogShareButtons } from "@/components/blog/blog-share-buttons"
import { BlogRelatedPosts } from "@/components/blog/blog-related-posts"
import { PortfolioNav } from "@/components/portfolio/nav"
import { PortfolioFooter } from "@/components/portfolio/footer"
import { BlogArticleContainer } from "@/components/blog/blog-article-container"
import { SkipLink } from "@/components/shared/skip-link"
import { BASE_URL } from "@/lib/constants"

interface PageProps {
  params: Promise<{
    locale: "en" | "pt-BR"
    slug: string
  }>
}

export async function generateStaticParams() {
  const locales: Array<"en" | "pt-BR"> = ["en", "pt-BR"]
  const params: Array<{ locale: "en" | "pt-BR"; slug: string }> = []

  for (const locale of locales) {
    const posts = await getAllEssays(locale, false)
    for (const post of posts) {
      params.push({ locale, slug: post.slug })
    }
  }

  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getEssayBySlug(slug, locale)

  if (!post) {
    return {
      title: "Essay Not Found",
    }
  }

  const canonicalLocale = post.isLocaleFallback ? (post.sourceLocale || "pt-BR") : locale

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/${canonicalLocale}/ensaios/${slug}`,
      siteName: "LXNDR",
      type: "article",
      locale: canonicalLocale === "pt-BR" ? "pt_BR" : "en_US",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: `/og-blog/${slug}.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/og-blog/${slug}.png`],
    },
    alternates: {
      canonical: `${BASE_URL}/${canonicalLocale}/ensaios/${slug}`,
      languages: {
        en: `/en/ensaios/${slug}`,
        "pt-BR": `/pt-BR/ensaios/${slug}`,
      },
    },
  }
}

export default async function EssayPostPage({ params }: PageProps) {
  const { locale, slug } = await params
  const post = await getEssayBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  const allPosts = await getAllEssays(locale, false)
  const relatedPosts = getRelatedPosts(post, allPosts, 3)
  const postContent = await BlogPostContent({ content: post.content })

  const pageLocale = post.isLocaleFallback ? (post.sourceLocale || locale) : locale
  const postUrl = `${BASE_URL}/${pageLocale}/ensaios/${slug}`

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.coverImage || `${BASE_URL}/og-default.png`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    articleSection: "Essays",
    keywords: post.tags.join(", "),
    inLanguage: pageLocale === "pt-BR" ? "pt-BR" : "en-US",
    wordCount: post.readingTime * 200,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Essays",
        item: `${BASE_URL}/${pageLocale}/ensaios`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
      >
        {JSON.stringify([articleSchema, breadcrumbSchema])}
      </script>
      <main className="min-h-screen bg-background">
        <SkipLink targetId="essay-content" />
        <PortfolioNav />

        <article id="essay-content" className="pt-32 pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <BlogArticleContainer>
              <BlogPostHeader
                post={post}
                locale={pageLocale}
                backHref="/ensaios"
                translationNamespace="essays"
              />
              {postContent}
              <BlogRelatedPosts
                posts={relatedPosts}
                locale={pageLocale}
                basePath="/ensaios"
                translationNamespace="essays"
              />
            </BlogArticleContainer>
          </div>
        </article>

        <BlogShareButtons title={post.title} url={postUrl} />

        <PortfolioFooter />
      </main>
    </>
  )
}
