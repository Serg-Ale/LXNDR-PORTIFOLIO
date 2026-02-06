import { cn } from "@/lib/utils"

interface BrutalistLineProps {
  children: React.ReactNode
  position?: "left" | "right" | "top" | "bottom"
  thickness?: number
  className?: string
}

/**
 * BrutalistLine Component
 * 
 * Adds a thick accent line (border) to one side of content
 * Used for visual emphasis in brutalist design
 * 
 * Usage:
 * ```tsx
 * <BrutalistLine position="left" thickness={6}>
 *   <h2>Section Title</h2>
 * </BrutalistLine>
 * ```
 */
export function BrutalistLine({
  children,
  position = "left",
  thickness = 4,
  className,
}: BrutalistLineProps) {
  const borderClass = {
    left: `border-l-[${thickness}px]`,
    right: `border-r-[${thickness}px]`,
    top: `border-t-[${thickness}px]`,
    bottom: `border-b-[${thickness}px]`,
  }

  const paddingClass = {
    left: "pl-4 md:pl-6",
    right: "pr-4 md:pr-6",
    top: "pt-4 md:pt-6",
    bottom: "pb-4 md:pb-6",
  }

  return (
    <div
      className={cn(
        "border-foreground",
        borderClass[position],
        paddingClass[position],
        className
      )}
      style={{
        [`border${position.charAt(0).toUpperCase() + position.slice(1)}Width`]: `${thickness}px`
      }}
    >
      {children}
    </div>
  )
}

interface BrutalistTextProps {
  children: React.ReactNode
  variant?: "outlined" | "outlined-thick" | "outlined-thin" | "filled" | "inverted"
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  font?: "default" | "bebas" | "space" | "mono"
  hover?: boolean
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
  className?: string
}

/**
 * BrutalistText Component
 * 
 * Text component with brutalist styling options
 * 
 * Usage:
 * ```tsx
 * <BrutalistText variant="outlined-thick" font="bebas" size="2xl" hover>
 *   CODE WITH PURPOSE
 * </BrutalistText>
 * ```
 */
export function BrutalistText({
  children,
  variant = "filled",
  size = "md",
  font = "default",
  hover = false,
  as: Component = "div",
  className,
}: BrutalistTextProps) {
  const variantClasses = {
    outlined: "text-outlined",
    "outlined-thick": "text-outlined-thick",
    "outlined-thin": "text-outlined-thin",
    filled: "text-foreground bg-background",
    inverted: "text-background bg-foreground",
  }

  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm md:text-base",
    md: "text-base md:text-lg",
    lg: "text-lg md:text-xl",
    xl: "text-xl md:text-2xl",
    "2xl": "text-2xl md:text-4xl",
    "3xl": "text-4xl md:text-6xl",
  }

  const fontClasses = {
    default: "",
    bebas: "font-bebas",
    space: "font-space",
    mono: "font-mono",
  }

  return (
    <Component
      className={cn(
        "font-bold uppercase",
        variantClasses[variant],
        sizeClasses[size],
        fontClasses[font],
        hover && "text-outlined-hover cursor-pointer",
        className
      )}
    >
      {children}
    </Component>
  )
}

interface BrutalistBoxProps {
  children: React.ReactNode
  variant?: "border" | "filled" | "shadow"
  className?: string
}

/**
 * BrutalistBox Component
 * 
 * Container with brutalist styling
 * 
 * Usage:
 * ```tsx
 * <BrutalistBox variant="shadow">
 *   <p>Content here</p>
 * </BrutalistBox>
 * ```
 */
export function BrutalistBox({
  children,
  variant = "border",
  className,
}: BrutalistBoxProps) {
  const variantClasses = {
    border: "border-4 border-foreground p-6",
    filled: "bg-foreground text-background p-6",
    shadow: "border-4 border-foreground p-6 shadow-brutalist",
  }

  return (
    <div className={cn(variantClasses[variant], className)}>
      {children}
    </div>
  )
}
