"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

interface BlogFiltersProps {
  allTags: string[]
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  searchTerm: string
  onSearchChange: (search: string) => void
  sortBy: "newest" | "oldest"
  onSortChange: (sort: "newest" | "oldest") => void
  resultCount: number
}

export function BlogFilters({
  allTags,
  selectedTags,
  onTagsChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  resultCount,
}: BlogFiltersProps) {
  const t = useTranslations("blog")
  const [isTagsOpen, setIsTagsOpen] = useState(false)

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }

  const clearFilters = () => {
    onTagsChange([])
    onSearchChange("")
  }

  const hasFilters = selectedTags.length > 0 || searchTerm.length > 0

  return (
    <div className="space-y-6 mb-12">
      {/* Search Bar */}
      <div>
        <input
          type="text"
          placeholder={t("search")}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full text-xl md:text-3xl font-bold border-4 border-foreground bg-background px-6 py-4 focus:outline-none focus:shadow-brutalist transition-shadow placeholder:text-foreground/30"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Tags Filter */}
        <div className="relative">
          <button
            onClick={() => setIsTagsOpen(!isTagsOpen)}
            className="px-6 py-3 border-4 border-foreground bg-background font-bold text-sm md:text-base hover:shadow-brutalist-sm transition-shadow"
          >
            {t("filterByTag")} {selectedTags.length > 0 && `(${selectedTags.length})`}
          </button>

          {isTagsOpen && (
            <div className="absolute top-full left-0 mt-2 bg-background border-4 border-foreground p-4 shadow-brutalist z-10 min-w-[250px]">
              <div className="max-h-60 overflow-y-auto space-y-2">
                {allTags.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center gap-3 cursor-pointer hover:bg-foreground/5 p-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                      className="w-5 h-5 border-2 border-foreground"
                    />
                    <span className="text-sm font-semibold uppercase">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as "newest" | "oldest")}
          className="px-6 py-3 border-4 border-foreground bg-background font-bold text-sm md:text-base hover:shadow-brutalist-sm transition-shadow cursor-pointer"
        >
          <option value="newest">{t("newest")}</option>
          <option value="oldest">{t("oldest")}</option>
        </select>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-6 py-3 border-4 border-foreground bg-foreground text-background font-bold text-sm md:text-base hover:bg-foreground/80 transition-colors"
          >
            {t("clearFilters")}
          </button>
        )}

        {/* Results Count */}
        <div className="ml-auto text-sm md:text-base font-bold text-muted-foreground">
          {t("resultsCount", { count: resultCount })}
        </div>
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className="px-4 py-2 border-2 border-foreground bg-foreground/10 font-bold text-xs md:text-sm uppercase hover:bg-foreground/20 transition-colors"
            >
              {tag} ✕
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
