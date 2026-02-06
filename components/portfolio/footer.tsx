"use client"

import { useTranslations } from "next-intl"
import { FaLinkedin, FaGithub } from "react-icons/fa"
import { HiEnvelope, HiPhone } from "react-icons/hi2"

const footerLinks = [
  {
    href: "https://github.com/Serg-Ale",
    icon: FaGithub,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/serg-alexandre",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:sergioalexandre0716@gmail.com",
    icon: HiEnvelope,
    label: "Email",
  },
  {
    href: "tel:+5543988732020",
    icon: HiPhone,
    label: "Phone",
  },
]

export function PortfolioFooter() {
  const t = useTranslations("footer")
  
  return (
    <footer className="border-t-4 border-foreground bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-4xl md:text-6xl font-black mb-4">
              LXNDR
            </h3>
            <p className="text-lg md:text-xl font-bold">
              {t("name")}
              <br />
              {t("role")}
            </p>
          </div>
          
          <div className="flex flex-col md:items-end justify-center">
            <div className="grid grid-cols-2 gap-4 max-w-md">
              {footerLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-4 py-3 border-2 border-foreground shadow-brutalist-sm hover:shadow-brutalist hover:translate-x-1 transition-all focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:outline-none touch-action-manipulation"
                  >
                    <Icon className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
                    <span className="text-base md:text-lg font-bold whitespace-nowrap">
                      {link.label}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border-t-4 border-foreground pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-base md:text-lg font-bold">
            <span suppressHydrationWarning>© {new Date().getFullYear()}</span> {t("copyright")}
          </p>
          <p className="text-base md:text-lg font-bold">
            {t("madeWith")}
          </p>
        </div>
      </div>
    </footer>
  )
}
