import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog/server"
import { BlogPostHeader } from "@/components/blog/blog-post-header"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { BlogShareButtons } from "@/components/blog/blog-share-buttons"
import { BlogRelatedPosts } from "@/components/blog/blog-related-posts"
import { PortfolioNav } from "@/components/portfolio/nav"
import { PortfolioFooter } from "@/components/portfolio/footer"
import { BlogArticleContainer } from "@/components/blog/blog-article-container"
import { BASE_URL } from "@/lib/constants"
import { Metadata } from "next"

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const t = await getTranslations({ locale, namespace: "blog" })

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      siteName: "LXNDR Portfolio",
      type: "article",
      locale: locale === "pt-BR" ? "pt_BR" : "en_US",
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
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: {
        en: `/en/blog/${slug}`,
        "pt-BR": `/pt-BR/blog/${slug}`,
      },
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  const allPosts = await getAllPosts(locale, false)
  const relatedPosts = getRelatedPosts(post, allPosts, 3)

  const postUrl = `${BASE_URL}/${locale}/blog/${slug}`

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
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
    publisher: {
      "@type": "Person",
      name: post.author,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    articleSection: "Technical",
    keywords: post.tags.join(", "),
    inLanguage: locale === "pt-BR" ? "pt-BR" : "en-US",
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
        name: "Blog",
        item: `${BASE_URL}/${locale}/blog`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }}
      />
      <main className="min-h-screen bg-background">
        <PortfolioNav />

        <article className="pt-32 pb-20 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <BlogArticleContainer>
              <BlogPostHeader post={post} locale={locale} />
              <BlogPostContent content={post.content} />
              <BlogRelatedPosts posts={relatedPosts} locale={locale} />
            </BlogArticleContainer>
          </div>
        </article>

        <BlogShareButtons title={post.title} url={postUrl} />

        <PortfolioFooter />
      </main>
    </>
  )
}
