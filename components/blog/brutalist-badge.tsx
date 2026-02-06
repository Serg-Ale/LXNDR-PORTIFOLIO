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
 * Usage:
 * ```tsx
 * <BrutalistBadge size="md">Python</BrutalistBadge>
 * <BrutalistBadge size="sm">Terminal</BrutalistBadge>
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

  return (
    <span
      className={cn(
        "badge-brutalist badge-brutalist-primary",
        sizeClasses[size],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
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
