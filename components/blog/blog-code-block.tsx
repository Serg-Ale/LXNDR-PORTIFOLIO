"use client"

import { useState } from "react"
import { HiClipboardDocument, HiCheck } from "react-icons/hi2"
import { getLanguageIcon, getLanguageDisplayName } from "@/lib/blog/language-icons"
import type { IconType } from "react-icons"

interface BlogCodeBlockProps {
  children: string
  language?: string
  highlightedCode?: string
  className?: string
}

// Helper component to render IconType correctly
function IconWrapper({ Icon, className }: { Icon: IconType; className?: string }) {
  const IconComponent = Icon as React.ComponentType<{ className?: string }>
  return <IconComponent className={className} />
}

/**
 * BlogCodeBlock Component
 * 
 * Brutalist-styled code block with:
 * - Language badge with icon (top-left corner)
 * - Always-visible copy button (top-right corner)
 * - 6px border for strong visual impact
 * - Offset shadow (brutalist aesthetic)
 * - Theme-aware colors
 * 
 * Usage:
 * Automatically used by MDX for code blocks:
 * ```language
 * code here
 * ```
 */
export function BlogCodeBlock({
  children,
  language = "text",
  highlightedCode,
  className = "",
}: BlogCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  // Get icon and display name for the language
  const LanguageIconComponent = getLanguageIcon(language)
  const displayName = getLanguageDisplayName(language)
  const shouldShowLanguage = language && language !== "text" && language !== "plaintext"

  return (
    <div className={`relative group my-8 theme-transition-rgb block w-full ${className}`}>
      {/* Unified Container with border and shadow */}
      <div className="code-block-brutalist overflow-hidden">
        {/* Header Bar - Contains language badge and copy button */}
        <div className="code-block-header">
          {/* Language Badge with Icon - Top Left */}
          {shouldShowLanguage && (
            <div className="language-badge-brutalist">
              <IconWrapper Icon={LanguageIconComponent} className="w-4 h-4 md:w-5 md:h-5" />
              <span>{displayName}</span>
            </div>
          )}

          {/* Copy Button - Top Right */}
          <button
            onClick={handleCopy}
            className="copy-button-brutalist"
            aria-label={copied ? "Copied!" : "Copy code to clipboard"}
            title={copied ? "Copied!" : "Copy code"}
          >
            <IconWrapper Icon={copied ? HiCheck : HiClipboardDocument} className="w-5 h-5" />
          </button>
        </div>

        {/* Code Content - Scrollable if needed */}
        <div className="overflow-x-auto">
          {highlightedCode ? (
            <div
              className="px-8 md:px-16 py-8 md:py-10 w-full code-highlighted-content"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          ) : (
            <pre className="px-8 md:px-16 py-8 md:py-10 w-full">
              <code className="block w-full text-sm md:text-base font-mono leading-relaxed whitespace-pre">
                {children}
              </code>
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}
