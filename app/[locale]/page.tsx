import { PortfolioNav } from "@/components/portfolio/nav";
import { PortfolioFooter } from "@/components/portfolio/footer";
import { PortfolioIntro } from "@/components/portfolio/intro";
import { PortfolioOrigin } from "@/components/portfolio/origin";
import { PortfolioJourney } from "@/components/portfolio/journey";
import { PortfolioSkills } from "@/components/portfolio/skills";
import { PortfolioProof } from "@/components/portfolio/proof";
import { PortfolioVision } from "@/components/portfolio/vision";
import { PortfolioBlogShowcase } from "@/components/portfolio/blog-showcase";
import { PortfolioConnect } from "@/components/portfolio/connect";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { getAllPosts } from "@/lib/blog/server";
import { BASE_URL } from "@/lib/constants";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ locale: "en" | "pt-BR" }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Sérgio Alexandre — Full-Stack Software Engineer",
    "pt-BR": "Sérgio Alexandre — Engenheiro de Software Full-Stack",
  };

  const descriptions: Record<string, string> = {
    en: "Full-Stack Software Engineer specializing in Next.js, React, TypeScript. Building digital experiences that transform at Union. Open for opportunities.",
    "pt-BR":
      "Engenheiro de Software Full-Stack especializado em Next.js, React, TypeScript. Construindo experiências digitais que transformam na Union. Aberto a oportunidades.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${BASE_URL}/${locale}`,
      siteName: "LXNDR Portfolio",
      type: "website",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
      images: ["/og-default.png"],
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  // Fetch 2 most recent blog posts
  const allPosts = await getAllPosts(locale, false);
  const recentPosts = allPosts.slice(0, 2);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sérgio Alexandre",
    jobTitle: "Full-Stack Software Engineer",
    url: BASE_URL,
    sameAs: [
      "https://github.com/lxndr",
      "https://x.com/OAlexandreSerg",
      "https://linkedin.com/in/lxndr",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Union",
      url: "https://union.dev",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "UTFPR",
    },
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "tRPC",
      "Prisma",
      "PostgreSQL",
    ],
    nationality: {
      "@type": "Country",
      name: "Brazil",
    },
    speakingLanguages: ["en", "pt-BR"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LXNDR Portfolio",
    url: BASE_URL,
    description: "Portfolio of Sérgio Alexandre, Full-Stack Software Engineer",
    author: {
      "@type": "Person",
      name: "Sérgio Alexandre",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personSchema, websiteSchema]),
        }}
      />
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:font-bold focus:border-2 focus:border-background"
      >
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen">
        <PortfolioNav />
        <ScrollProgress
          sections={["intro", "origin", "journey", "skills", "proof", "vision", "blog", "connect"]}
        />

        <PortfolioIntro />
        <PortfolioOrigin />
        <PortfolioJourney />
        <PortfolioSkills />
        <PortfolioProof />
        <PortfolioVision />
        <PortfolioBlogShowcase posts={recentPosts} locale={locale} />
        <PortfolioConnect />
        <PortfolioFooter />
      </main>
    </>
  );
}
