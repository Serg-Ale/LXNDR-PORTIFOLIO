"use client"

import { useState } from "react"
import { HiClipboardDocument, HiCheck } from "react-icons/hi2"

interface BlogCodeBlockProps {
  children: string
  language?: string
  highlightedCode?: string
  className?: string
}

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

  return (
    <div className={`relative group my-6 theme-transition-rgb ${className}`}>
      {language && language !== "text" && (
        <div className="absolute top-0 left-0 px-4 py-2 bg-primary text-primary-foreground text-xs md:text-sm font-bold uppercase z-10">
          {language}
        </div>
      )}

      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-primary/90 text-primary-foreground hover:bg-primary transition-colors z-10 opacity-0 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          HiCheck({ className: "w-5 h-5" })
        ) : (
          HiClipboardDocument({ className: "w-5 h-5" })
        )}
      </button>

      {highlightedCode ? (
        <div
          className="overflow-x-auto border-4 border-border bg-card"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      ) : (
        <pre className="overflow-x-auto border-4 border-border bg-card p-6">
          <code className="text-sm md:text-base font-mono text-card-foreground">{children}</code>
        </pre>
      )}
    </div>
  )
}
