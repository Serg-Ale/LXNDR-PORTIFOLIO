"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { HiShare, HiCheck } from "react-icons/hi2"
import {
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa"
import type { IconType } from "react-icons"

// Helper component to render IconType correctly (React 19 compatibility)
function Icon({ icon: IconComponent, className }: { icon: IconType; className?: string }) {
  const Comp = IconComponent as React.ComponentType<{ className?: string }>
  return <Comp className={className} />
}

interface BlogShareButtonsProps {
  title: string
  url: string
}

export function BlogShareButtons({ title, url }: BlogShareButtonsProps) {
  const t = useTranslations("blog")
  const [copied, setCopied] = useState(false)

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const buttonBaseClass = "p-3 bg-foreground text-background hover:bg-foreground/80 hover:scale-110 transition-all duration-300 border-2 border-foreground shadow-brutalist-sm hover-glow motion-reduce:hover:scale-100 motion-reduce:transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-40 pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]">
      {/* Twitter */}
      <a
        href={shareUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonBaseClass}
        aria-label={`${t("shareOn")} Twitter`}
        data-magnetic
      >
        <Icon icon={FaTwitter} className="w-5 h-5" />
      </a>

      {/* LinkedIn */}
      <a
        href={shareUrls.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonBaseClass}
        aria-label={`${t("shareOn")} LinkedIn`}
        data-magnetic
      >
        <Icon icon={FaLinkedin} className="w-5 h-5" />
      </a>

      {/* Facebook */}
      <a
        href={shareUrls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonBaseClass}
        aria-label={`${t("shareOn")} Facebook`}
        data-magnetic
      >
        <Icon icon={FaFacebook} className="w-5 h-5" />
      </a>

      {/* WhatsApp */}
      <a
        href={shareUrls.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonBaseClass}
        aria-label={`${t("shareOn")} WhatsApp`}
        data-magnetic
      >
        <Icon icon={FaWhatsapp} className="w-5 h-5" />
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className={buttonBaseClass}
        aria-label={copied ? "Link copied!" : t("copyLink")}
        aria-live="polite"
        data-magnetic
      >
        <Icon icon={copied ? HiCheck : HiShare} className="w-5 h-5" />
      </button>
    </div>
  )
}
