"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { BlogMasonry } from "./blog-masonry"
import { BlogFilters } from "./blog-filters"
import { PortfolioNav } from "@/components/portfolio/nav"
import { PortfolioFooter } from "@/components/portfolio/footer"
import { ScrollProgress } from "@/components/shared/scroll-progress"
import { SkipLink } from "@/components/shared/skip-link"
import type { Post } from "@/lib/blog"

interface BlogPageClientProps {
  initialPosts: Post[]
  allTags: string[]
}

export function BlogPageClient({ initialPosts, allTags }: BlogPageClientProps) {
  const t = useTranslations("blog")
  const locale = useLocale() as "en" | "pt-BR"
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Initialize state from URL params
  const [searchTerm, setSearchTerm] = useState(() => 
    searchParams.get("q") || ""
  )
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    const tagsParam = searchParams.get("tags")
    return tagsParam ? tagsParam.split(",").filter(Boolean) : []
  })
  const [sortBy, setSortBy] = useState<"newest" | "oldest">(() => {
    const sortParam = searchParams.get("sort")
    return sortParam === "oldest" ? "oldest" : "newest"
  })

  // Update URL when filters change
  const updateURL = useCallback((
    search: string, 
    tags: string[], 
    sort: "newest" | "oldest"
  ) => {
    const params = new URLSearchParams()
    
    if (search) params.set("q", search)
    if (tags.length > 0) params.set("tags", tags.join(","))
    if (sort !== "newest") params.set("sort", sort)
    
    const queryString = params.toString()
    const newURL = queryString ? `${pathname}?${queryString}` : pathname
    
    router.replace(newURL, { scroll: false })
  }, [pathname, router])

  // Debounce URL updates for search term
  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL(searchTerm, selectedTags, sortBy)
    }, 300) // Debounce search by 300ms

    return () => clearTimeout(timer)
  }, [searchTerm, selectedTags, sortBy, updateURL])

  // Handlers that update state (URL updates via effect above)
  const handleSearchChange = (search: string) => {
    setSearchTerm(search)
  }

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags)
  }

  const handleSortChange = (sort: "newest" | "oldest") => {
    setSortBy(sort)
  }

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
      <SkipLink targetId="blog-content" />
      <PortfolioNav />
      <ScrollProgress />

      <section id="blog-content" className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-16">
            <h1 className="text-6xl md:text-9xl font-bebas font-black mb-4">
              {t("title")}
            </h1>
            <p className="text-xl md:text-3xl font-bold text-muted-foreground">
              {t("subtitle")}
            </p>
          </header>

          {/* Filters */}
          <BlogFilters
            allTags={allTags}
            selectedTags={selectedTags}
            onTagsChange={handleTagsChange}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            resultCount={filteredPosts.length}
          />

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <BlogMasonry posts={filteredPosts} locale={locale} />
          ) : (
            <div className="text-center py-20" role="status">
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
