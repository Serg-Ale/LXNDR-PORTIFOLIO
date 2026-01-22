"use client"

import { useState } from "react"
import { HiClipboardDocument, HiMiniArrowTopRightOnSquare } from "react-icons/hi2"
import type { IconType } from "react-icons"

interface CopyButtonProps {
  value: string
  displayText: string
  icon?: "email" | "phone" | "link"
  theme?: "light" | "dark"
  href?: string
  className?: string
  onCopy?: () => void
}

export function CopyButton({
  value,
  displayText,
  icon = "email",
  theme = "dark",
  href,
  className = "",
  onCopy,
}: CopyButtonProps) {
  const [isCopying, setIsCopying] = useState(false)

  const handleCopy = async () => {
    setIsCopying(true)

    try {
      // Tentar usar Clipboard API moderna
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        // Fallback para navegadores antigos
        const textArea = document.createElement("textarea")
        textArea.value = value
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand("copy")
        textArea.remove()
      }

      // Callback de sucesso
      if (onCopy) {
        onCopy()
      }
    } catch (err) {
      console.error("Failed to copy:", err)
    } finally {
      setTimeout(() => setIsCopying(false), 300)
    }
  }

  // Se tem href (LinkedIn), renderizar com dois botões
  if (href) {
    return (
      <div className={`flex gap-2 ${className}`}>
        <button
          onClick={handleCopy}
          disabled={isCopying}
          className={`flex-1 group block text-left ${
            theme === "dark"
              ? "bg-background/10 hover:bg-background/20 border-background/20"
              : "bg-foreground/10 hover:bg-foreground/20 border-foreground/20"
          } border p-4 rounded-md transition-all disabled:opacity-50`}
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-base md:text-3xl font-semibold truncate">
              {displayText}
            </span>
            <div className="flex-shrink-0 transition-transform group-hover:scale-110">
              {HiClipboardDocument({ className: "w-6 h-6 md:w-7 md:h-7" })}
            </div>
          </div>
        </button>
        
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-shrink-0 ${
            theme === "dark"
              ? "bg-background/10 hover:bg-background/20 border-background/20"
              : "bg-foreground/10 hover:bg-foreground/20 border-foreground/20"
          } border p-4 rounded-md transition-all hover:scale-105 flex items-center justify-center min-w-[60px]`}
        >
          {HiMiniArrowTopRightOnSquare({ className: "w-6 h-6 md:w-7 md:h-7" })}
        </a>
      </div>
    )
  }

  // Botão simples de copy apenas
  return (
    <button
      onClick={handleCopy}
      disabled={isCopying}
      className={`group block w-full text-left ${
        theme === "dark"
          ? "bg-background/10 hover:bg-background/20 border-background/20"
          : "bg-foreground/10 hover:bg-foreground/20 border-foreground/20"
      } border p-4 rounded-md transition-all disabled:opacity-50 ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-base md:text-3xl font-semibold truncate">
          {displayText}
        </span>
        <div className="flex-shrink-0 transition-transform group-hover:scale-110">
          {HiClipboardDocument({ className: "w-6 h-6 md:w-7 md:h-7" })}
        </div>
      </div>
    </button>
  )
}
