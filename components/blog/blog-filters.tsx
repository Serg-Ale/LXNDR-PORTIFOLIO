"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useTranslations } from "next-intl"
import { HiXMark, HiChevronDown } from "react-icons/hi2"
import type { IconType } from "react-icons"

// Helper component to render IconType correctly (React 19 compatibility)
function Icon({ icon: IconComponent, className }: { icon: IconType; className?: string }) {
  const Comp = IconComponent as React.ComponentType<{ className?: string }>
  return <Comp className={className} />
}

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
  const tA11y = useTranslations("accessibility")
  const [isTagsOpen, setIsTagsOpen] = useState(false)
  const [focusedTagIndex, setFocusedTagIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const tagButtonRef = useRef<HTMLButtonElement>(null)
  const tagListRef = useRef<HTMLDivElement>(null)

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTagsOpen(false)
        setFocusedTagIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Keyboard navigation for dropdown
  const handleDropdownKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!isTagsOpen) {
      if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
        event.preventDefault()
        setIsTagsOpen(true)
        setFocusedTagIndex(0)
      }
      return
    }

    switch (event.key) {
      case "Escape":
        event.preventDefault()
        setIsTagsOpen(false)
        setFocusedTagIndex(-1)
        tagButtonRef.current?.focus()
        break
      case "ArrowDown":
        event.preventDefault()
        setFocusedTagIndex((prev) => 
          prev < allTags.length - 1 ? prev + 1 : 0
        )
        break
      case "ArrowUp":
        event.preventDefault()
        setFocusedTagIndex((prev) => 
          prev > 0 ? prev - 1 : allTags.length - 1
        )
        break
      case "Enter":
      case " ":
        event.preventDefault()
        if (focusedTagIndex >= 0 && focusedTagIndex < allTags.length) {
          toggleTag(allTags[focusedTagIndex])
        }
        break
      case "Tab":
        setIsTagsOpen(false)
        setFocusedTagIndex(-1)
        break
    }
  }, [isTagsOpen, focusedTagIndex, allTags, toggleTag])

  // Focus management for dropdown items
  useEffect(() => {
    if (isTagsOpen && focusedTagIndex >= 0 && tagListRef.current) {
      const items = tagListRef.current.querySelectorAll('[role="option"]')
      const item = items[focusedTagIndex] as HTMLElement
      item?.focus()
    }
  }, [focusedTagIndex, isTagsOpen])

  return (
    <div className="space-y-6 mb-12 theme-transition-rgb">
      {/* Search Input with Label */}
      <div>
        <label htmlFor="blog-search" className="sr-only">
          {tA11y("searchPosts")}
        </label>
        <input
          id="blog-search"
          type="search"
          placeholder={`${t("search")}`}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          className="w-full text-xl md:text-3xl font-bold border-4 border-border bg-card text-card-foreground px-6 py-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus:shadow-brutalist transition-shadow placeholder:text-muted-foreground/50"
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        {/* Tag Filter Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            ref={tagButtonRef}
            onClick={() => setIsTagsOpen(!isTagsOpen)}
            onKeyDown={handleDropdownKeyDown}
            aria-expanded={isTagsOpen}
            aria-haspopup="listbox"
            aria-controls="tag-filter-listbox"
            aria-label={tA11y("filterByTag")}
            className="px-6 py-3 border-4 border-border bg-card text-card-foreground font-bold text-sm md:text-base hover:shadow-brutalist-sm transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 flex items-center gap-2"
          >
            {t("filterByTag")} {selectedTags.length > 0 && `(${selectedTags.length})`}
            <Icon 
              icon={HiChevronDown}
              className={`w-4 h-4 transition-transform duration-200 ${isTagsOpen ? "rotate-180" : ""}`} 
            />
          </button>

          {isTagsOpen && (
            <div
              id="tag-filter-listbox"
              role="listbox"
              aria-multiselectable="true"
              aria-label={tA11y("filterByTag")}
              ref={tagListRef}
              onKeyDown={handleDropdownKeyDown}
              className="absolute top-full left-0 mt-2 bg-card border-4 border-border p-4 shadow-brutalist z-10 min-w-[250px] max-h-60 overflow-y-auto"
            >
              {allTags.map((tag, index) => (
                <div
                  key={tag}
                  role="option"
                  aria-selected={selectedTags.includes(tag)}
                  tabIndex={focusedTagIndex === index ? 0 : -1}
                  onClick={() => toggleTag(tag)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      toggleTag(tag)
                    }
                  }}
                  className={`
                    flex items-center gap-3 cursor-pointer p-2 
                    hover:bg-accent focus:bg-accent focus:outline-none
                    ${focusedTagIndex === index ? "bg-accent" : ""}
                    ${selectedTags.includes(tag) ? "bg-accent/50" : ""}
                  `}
                >
                  <span 
                    className={`
                      w-5 h-5 border-2 border-border flex items-center justify-center
                      ${selectedTags.includes(tag) ? "bg-foreground" : "bg-transparent"}
                    `}
                    aria-hidden="true"
                  >
                    {selectedTags.includes(tag) && (
                      <svg className="w-3 h-3 text-background" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                  <span className="text-sm font-semibold uppercase">{tag}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sort Select with Label */}
        <div>
          <label htmlFor="blog-sort" className="sr-only">
            {tA11y("sortPosts")}
          </label>
          <select
            id="blog-sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as "newest" | "oldest")}
            className="px-6 py-3 border-4 border-border bg-card text-card-foreground font-bold text-sm md:text-base hover:shadow-brutalist-sm transition-shadow cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          >
            <option value="newest">{t("newest")}</option>
            <option value="oldest">{t("oldest")}</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-6 py-3 border-4 border-border bg-accent text-accent-foreground font-bold text-sm md:text-base hover:bg-accent/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
          >
            {t("clearFilters")}
          </button>
        )}

        {/* Results Count */}
        <div 
          className="ml-auto text-sm md:text-base font-bold text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          {t("resultsCount", { count: resultCount })}
        </div>
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2" role="list" aria-label={t("tags")}>
          {selectedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              aria-label={`${tA11y("removeTag")}: ${tag}`}
              className="px-4 py-2 border-2 border-border bg-accent text-accent-foreground font-bold text-xs md:text-sm uppercase hover:bg-accent/80 transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            >
              {tag}
              <Icon icon={HiXMark} className="w-3 h-3" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
