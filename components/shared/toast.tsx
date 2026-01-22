"use client"

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import gsap from "gsap"
import { HiCheckCircle } from "react-icons/hi2"

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
  theme?: "light" | "dark"
}

export function Toast({ message, isVisible, onClose, theme = "dark" }: ToastProps) {
  const toastRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!toastRef.current || !isVisible) return undefined

    // Entrada animation
    gsap.fromTo(
      toastRef.current,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      }
    )

    // Auto-close após 2 segundos
    timeoutRef.current = setTimeout(() => {
      if (toastRef.current) {
        gsap.to(toastRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => onClose(),
        })
      }
    }, 2000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  const toastElement = (
    <div
      ref={toastRef}
      role="alert"
      aria-live="polite"
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-[9999] min-w-[280px] max-w-[90vw] ${
        theme === "dark"
          ? "bg-foreground text-background border-background/20"
          : "bg-background text-foreground border-foreground/20"
      } px-6 py-4 rounded-lg shadow-modern-lg border-2 backdrop-blur-sm`}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 text-green-500">
          <HiCheckCircle className="w-6 h-6" />
        </div>
        <p className="text-base md:text-lg font-semibold">{message}</p>
      </div>
    </div>
  )

  return typeof document !== "undefined"
    ? createPortal(toastElement, document.body)
    : null
}
