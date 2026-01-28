"use client"

import { usePathname, useRouter } from "@/i18n/routing"
import { useLocale } from "next-intl"
import { useTransition } from "react"
import { cn } from "@/lib/utils"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "pt-BR" : "en"
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className={cn(
        "w-12 h-12 md:w-14 md:h-14",
        "border-2 border-foreground bg-background text-foreground",
        "long-shadow hover:long-shadow-lg",
        "hover:-translate-y-0.5 active:translate-y-0",
        "transition-all duration-200 ease-out",
        "font-bold text-sm md:text-base",
        "flex items-center justify-center",
        "disabled:opacity-50"
      )}
      aria-label={locale === "en" ? "Switch to Portuguese" : "Switch to English"}
      title={locale === "en" ? "English" : "Português"}
    >
      {locale === "en" ? "EN" : "PT"}
    </button>
  )
}
