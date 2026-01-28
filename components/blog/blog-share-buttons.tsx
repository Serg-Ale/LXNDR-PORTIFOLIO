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

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-40">
      {/* Twitter */}
      <a
        href={shareUrls.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-foreground text-background hover:bg-foreground/80 hover:scale-110 transition-all duration-300 border-2 border-foreground shadow-brutalist-sm"
        aria-label="Share on Twitter"
        data-magnetic
      >
        {FaTwitter({ className: "w-5 h-5" })}
      </a>

      {/* LinkedIn */}
      <a
        href={shareUrls.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-foreground text-background hover:bg-foreground/80 hover:scale-110 transition-all duration-300 border-2 border-foreground shadow-brutalist-sm"
        aria-label="Share on LinkedIn"
        data-magnetic
      >
        {FaLinkedin({ className: "w-5 h-5" })}
      </a>

      {/* Facebook */}
      <a
        href={shareUrls.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-foreground text-background hover:bg-foreground/80 hover:scale-110 transition-all duration-300 border-2 border-foreground shadow-brutalist-sm"
        aria-label="Share on Facebook"
        data-magnetic
      >
        {FaFacebook({ className: "w-5 h-5" })}
      </a>

      {/* WhatsApp */}
      <a
        href={shareUrls.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-foreground text-background hover:bg-foreground/80 transition-colors border-2 border-foreground shadow-brutalist-sm md:block hidden"
        aria-label="Share on WhatsApp"
        data-magnetic
      >
        {FaWhatsapp({ className: "w-5 h-5" })}
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="p-3 bg-foreground text-background hover:bg-foreground/80 hover:scale-110 transition-all duration-300 border-2 border-foreground shadow-brutalist-sm"
        aria-label={t("copyLink")}
        data-magnetic
      >
        {copied ? (
          HiCheck({ className: "w-5 h-5" })
        ) : (
          HiShare({ className: "w-5 h-5" })
        )}
      </button>
    </div>
  )
}
