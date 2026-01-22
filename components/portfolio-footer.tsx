"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { CopyButton } from "./copy-button"
import { Toast } from "./toast"

export function PortfolioFooter() {
  const t = useTranslations("footer")
  const nav = useTranslations("nav")
  const [toastMessage, setToastMessage] = useState("")
  const [showToast, setShowToast] = useState(false)

  const handleCopy = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
  }
  
  return (
    <footer className="border-t bg-background text-foreground overflow-hidden" data-theme="light">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-4xl md:text-6xl font-bold mb-4">
              {nav("logo")}
            </h3>
            <p className="text-lg md:text-xl font-semibold">
              {t("name")}
              <br />
              {t("role")}
            </p>
          </div>
          
          <div className="flex flex-col md:items-end space-y-4">
            <CopyButton
              value="https://linkedin.com/in/serg-alexandre"
              displayText={t("links.linkedin")}
              icon="link"
              href="https://linkedin.com/in/serg-alexandre"
              theme="light"
              className="text-xl md:text-2xl font-semibold"
              onCopy={() => handleCopy("LinkedIn URL copied!")}
            />
            
            <CopyButton
              value="sergioalexandre0716@gmail.com"
              displayText={t("links.email")}
              icon="email"
              theme="light"
              className="text-xl md:text-2xl font-semibold"
              onCopy={() => handleCopy("Email copied!")}
            />
            
            <CopyButton
              value="+5543988732020"
              displayText={t("links.phone")}
              icon="phone"
              theme="light"
              className="text-xl md:text-2xl font-semibold"
              onCopy={() => handleCopy("Phone number copied!")}
            />
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-base md:text-lg font-medium">
            © {new Date().getFullYear()} {t("copyright")}
          </p>
          <p className="text-base md:text-lg font-medium">
            {t("madeWith").replace("❤️", "")} <span className="text-red-500">❤️</span>
          </p>
        </div>
      </div>

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        theme="light"
      />
    </footer>
  )
}
