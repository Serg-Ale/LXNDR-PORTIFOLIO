"use client"

import { BlogCodeBlock } from "./blog-code-block"

interface CodeHighlightedProps {
  language: string
  lightHtml: string
  darkHtml: string
  rawCode: string
}

/**
 * CodeHighlighted Component
 * 
 * Renders syntax-highlighted code with theme switching support.
 * Contains both light and dark versions, CSS handles visibility.
 */
export function CodeHighlighted({
  language,
  lightHtml,
  darkHtml,
  rawCode,
}: CodeHighlightedProps) {
  // Create combined HTML with both theme versions
  const combinedHtml = `
    <div class="code-highlighted">
      <div class="code-light">${lightHtml}</div>
      <div class="code-dark">${darkHtml}</div>
    </div>
  `

  return (
    <BlogCodeBlock 
      language={language} 
      highlightedCode={combinedHtml}
      className="theme-transition-rgb !max-w-full w-full block"
    >
      {rawCode}
    </BlogCodeBlock>
  )
}
