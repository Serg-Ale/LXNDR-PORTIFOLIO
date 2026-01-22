import type React from "react"
import type { Metadata, Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Geist, Geist_Mono, Bebas_Neue, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import { ThemeProvider } from "@/components/shared/theme-provider"
import "./globals.css"

const geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist",
})
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
})
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
})

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://lxndr.dev"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  
  const titles: Record<string, string> = {
    en: "Sérgio Alexandre — Full-Stack Software Engineer",
    "pt-BR": "Sérgio Alexandre — Engenheiro de Software Full-Stack",
  }

  const descriptions: Record<string, string> = {
    en: "Full-Stack Software Engineer specializing in Next.js, React, TypeScript, and modern web technologies. Building digital experiences that transform. Based in Brazil, working globally.",
    "pt-BR": "Engenheiro de Software Full-Stack especializado em Next.js, React, TypeScript e tecnologias web modernas. Construindo experiências digitais que transformam. Baseado no Brasil, trabalhando globalmente.",
  }

  const keywords = [
    "Next.js",
    "React",
    "TypeScript",
    "Software Engineer",
    "Full-Stack Developer",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "Portfolio",
    "Brazilian Developer",
    "Remote Developer",
  ]

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: keywords.join(", "),
    authors: [{ name: "Sérgio Alexandre", url: BASE_URL }],
    creator: "@lxndr_dev",
    publisher: "Sérgio Alexandre",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        "pt-BR": "/pt-BR",
      },
    },
    openGraph: {
      siteName: "LXNDR Portfolio",
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `${BASE_URL}/${locale}`,
      locale: locale === "pt-BR" ? "pt_BR" : "en_US",
      type: "website",
      images: [
        {
          url: "/og-default.png",
          width: 1200,
          height: 630,
          alt: "Sérgio Alexandre — Software Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@lxndr_dev",
      creator: "@lxndr_dev",
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      images: ["/og-default.png"],
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/favicon.svg",
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      other: [
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    manifest: "/manifest.json",
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

