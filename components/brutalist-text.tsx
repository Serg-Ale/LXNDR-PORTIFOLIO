import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface BrutalistTextProps {
  children: ReactNode
  variant?: "outlined" | "outlined-thick" | "outlined-thin" | "filled" | "inverted"
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  font?: "default" | "bebas" | "space" | "mono"
  hover?: boolean
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
}

const sizeClasses = {
  xs: "text-xl md:text-2xl",
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-5xl",
  lg: "text-4xl md:text-6xl",
  xl: "text-[clamp(4rem,10vw,8rem)]",
  "2xl": "text-[clamp(5rem,12vw,10rem)]",
  "3xl": "text-[clamp(6rem,15vw,14rem)]",
}

const fontClasses = {
  default: "font-sans",
  bebas: "font-bebas",
  space: "font-space",
  mono: "font-mono",
}

const variantClasses = {
  outlined: "text-outlined",
  "outlined-thick": "text-outlined-thick",
  "outlined-thin": "text-outlined-thin",
  filled: "text-foreground",
  inverted: "bg-foreground text-background",
}

export function BrutalistText({
  children,
  variant = "filled",
  size = "md",
  font = "default",
  hover = false,
  className,
  as: Component = "p",
}: BrutalistTextProps) {
  return (
    <Component
      className={cn(
        "font-black leading-none tracking-tighter",
        sizeClasses[size],
        fontClasses[font],
        variantClasses[variant],
        hover && variant.includes("outlined") && "text-outlined-hover",
        variant === "inverted" && "p-6 md:p-8",
        className
      )}
    >
      {children}
    </Component>
  )
}

interface BrutalistBoxProps {
  children: ReactNode
  variant?: "border" | "filled" | "shadow"
  className?: string
}

export function BrutalistBox({
  children,
  variant = "border",
  className,
}: BrutalistBoxProps) {
  return (
    <div
      className={cn(
        "p-6 md:p-8",
        variant === "border" && "border-4 border-foreground",
        variant === "filled" && "bg-foreground text-background",
        variant === "shadow" && "border-4 border-foreground shadow-brutalist-lg",
        className
      )}
    >
      {children}
    </div>
  )
}

interface BrutalistLineProps {
  position?: "left" | "right" | "top" | "bottom"
  thickness?: number
  className?: string
  children: ReactNode
}

export function BrutalistLine({
  position = "left",
  thickness = 8,
  className,
  children,
}: BrutalistLineProps) {
  const positionClasses = {
    left: `border-l-[${thickness}px] pl-6 md:pl-12`,
    right: `border-r-[${thickness}px] pr-6 md:pr-12`,
    top: `border-t-[${thickness}px] pt-6 md:pt-12`,
    bottom: `border-b-[${thickness}px] pb-6 md:pb-12`,
  }

  return (
    <div className={cn("border-foreground", positionClasses[position], className)}>
      {children}
    </div>
  )
}
