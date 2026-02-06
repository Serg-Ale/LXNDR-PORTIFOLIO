import { cn } from "@/lib/utils"

interface BrutalistInlineCodeProps {
  children: React.ReactNode
  className?: string
}

/**
 * BrutalistInlineCode Component
 * 
 * Inline code element with brutalist design:
 * - Maximum contrast: inverted colors (black bg in light mode, white in dark)
 * - Bold monospace font (Geist Mono)
 * - 2px solid border
 * - 2px offset shadow (brutalist aesthetic)
 * - No border-radius (brutalist aesthetic)
 * - Inline-block display (mantém no fluxo do texto)
 * - Compact padding
 * 
 * Usage in MDX:
 * This component is automatically used for inline `code` elements
 * Example: texto com `cmatrix` no meio do parágrafo
 * 
 * Manual usage:
 * ```tsx
 * <BrutalistInlineCode>cmatrix</BrutalistInlineCode>
 * <BrutalistInlineCode>curses.init_color()</BrutalistInlineCode>
 * ```
 */
export function BrutalistInlineCode({
  children,
  className,
  ...props
}: BrutalistInlineCodeProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn("inline-code-brutalist", className)}
      {...props}
    >
      {children}
    </code>
  )
}
