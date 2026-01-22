"use client"

import { usePathname, useRouter } from "@/i18n/routing"
import { useLocale } from "next-intl"
import { useTransition } from "react"

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
      className="text-lg md:text-xl font-bold bg-foreground text-background px-3 md:px-4 py-2 hover:opacity-80 transition-opacity disabled:opacity-50"
      title={locale === "en" ? "Switch to Português" : "Mudar para English"}
    >
      {locale === "en" ? "PT" : "EN"}
    </button>
  )
}
