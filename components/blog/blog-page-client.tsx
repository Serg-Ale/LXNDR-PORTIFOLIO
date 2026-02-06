"use client"

import { useState, useMemo } from "react"
import { useLocale, useTranslations } from "next-intl"
import { BlogMasonry } from "./blog-masonry"
import { BlogFilters } from "./blog-filters"
import { PortfolioNav } from "@/components/portfolio/nav"
import { PortfolioFooter } from "@/components/portfolio/footer"
import { ScrollProgress } from "@/components/shared/scroll-progress"
import type { Post } from "@/lib/blog"

interface BlogPageClientProps {
  initialPosts: Post[]
  allTags: string[]
}

export function BlogPageClient({ initialPosts, allTags }: BlogPageClientProps) {
  const t = useTranslations("blog")
  const locale = useLocale() as "en" | "pt-BR"

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest")

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = initialPosts

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(search) ||
          post.description.toLowerCase().includes(search) ||
          post.tags.some((tag) => tag.toLowerCase().includes(search))
      )
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        selectedTags.every((tag) => post.tags.includes(tag))
      )
    }

    // Sort
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortBy === "newest" ? dateB - dateA : dateA - dateB
    })

    return filtered
  }, [initialPosts, searchTerm, selectedTags, sortBy])

  return (
    <main className="min-h-screen bg-background">
      <PortfolioNav />
      <ScrollProgress />

      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-6xl md:text-9xl font-bebas font-black mb-4">
              {t("title")}
            </h1>
            <p className="text-xl md:text-3xl font-bold text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>

          {/* Filters */}
          <BlogFilters
            allTags={allTags}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            resultCount={filteredPosts.length}
          />

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <BlogMasonry posts={filteredPosts} locale={locale} />
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl md:text-4xl font-bebas font-bold text-muted-foreground">
                {initialPosts.length === 0 ? t("noPosts") : t("noResults")}
              </p>
            </div>
          )}
        </div>
      </section>

      <PortfolioFooter />
    </main>
  )
}
