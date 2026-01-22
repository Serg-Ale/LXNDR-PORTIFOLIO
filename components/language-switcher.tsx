"use client"

import { usePathname, useRouter } from "@/i18n/routing"
import { useLocale } from "next-intl"
import { useTransition } from "react"

export function LanguageSwitcher({ theme }: { theme: "light" | "dark" }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "pt-BR" : "en"
    startTransition(() => {
      // Use push instead of replace to maintain history
      router.push(pathname, { locale: nextLocale })
    })
  }

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className={`text-lg md:text-xl font-semibold px-4 py-2 rounded-md transition-all disabled:opacity-50 ${
        theme === "dark"
          ? "bg-background/10 hover:bg-background/20 hover:scale-105"
          : "bg-foreground/5 hover:bg-foreground/10 hover:scale-105"
      }`}
      title={locale === "en" ? "Switch to Português" : "Mudar para English"}
    >
      {locale === "en" ? "PT" : "EN"}
    </button>
  )
}
