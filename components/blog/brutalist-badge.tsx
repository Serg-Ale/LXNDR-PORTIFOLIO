import { cn } from "@/lib/utils"

interface BrutalistBadgeProps {
  children: React.ReactNode
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
}

/**
 * BrutalistBadge Component
 * 
 * A high-contrast badge component with brutalist design principles:
 * - Solid background (inverts with theme: black in light mode, white in dark mode)
 * - Bold borders (3px)
 * - Offset shadow (brutalist aesthetic)
 * - Bebas Neue font (uppercase, bold)
 * - Hover effect (scale + shadow increase)
 * 
 * Accessibility: Uses <button> when onClick is provided, <span> otherwise.
 * 
 * Usage:
 * ```tsx
 * <BrutalistBadge size="md">Python</BrutalistBadge>
 * <BrutalistBadge size="sm" onClick={() => handleClick()}>Terminal</BrutalistBadge>
 * ```
 */
export function BrutalistBadge({
  children,
  size = "md",
  className,
  onClick,
}: BrutalistBadgeProps) {
  const sizeClasses = {
    sm: "badge-brutalist-sm",
    md: "badge-brutalist-md",
    lg: "badge-brutalist-lg",
  }

  const baseClasses = cn(
    "badge-brutalist badge-brutalist-primary",
    sizeClasses[size],
    onClick && "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
    className
  )

  // Use button when clickable for proper accessibility
  if (onClick) {
    return (
      <button
        type="button"
        className={baseClasses}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  return (
    <span className={baseClasses}>
      {children}
    </span>
  )
}

/**
 * BrutalistBadgeGroup Component
 * 
 * Wrapper for multiple badges with proper spacing
 * 
 * Usage:
 * ```tsx
 * <BrutalistBadgeGroup>
 *   <BrutalistBadge>Python</BrutalistBadge>
 *   <BrutalistBadge>CLI</BrutalistBadge>
 * </BrutalistBadgeGroup>
 * ```
 */
export function BrutalistBadgeGroup({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-wrap gap-3 md:gap-4", className)}>
      {children}
    </div>
  )
}
