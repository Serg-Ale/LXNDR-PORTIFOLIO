"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { BlogCard } from "@/components/blog/blog-card"
import { prefersReducedMotion } from "@/lib/gsap-config"
import type { Post } from "@/lib/blog"

gsap.registerPlugin(ScrollTrigger)

interface PortfolioBlogShowcaseProps {
  posts: Post[]
  locale: "en" | "pt-BR"
}

export function PortfolioBlogShowcase({ 
  posts, 
  locale 
}: PortfolioBlogShowcaseProps) {
  const t = useTranslations("blog")
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([titleRef.current, ...cardsRef.current, ctaRef.current], { 
          opacity: 1, 
          y: 0 
        })
        return
      }

      // Animate title reveal on scroll
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      })

      // Stagger card animations
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 80,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      })

      // Animate CTA button
      gsap.from(ctaRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top bottom-=50",
          toggleActions: "play none none reverse",
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative min-h-screen px-6 md:px-12 py-24 md:py-32 bg-accent text-accent-foreground overflow-hidden"
    >
      {/* Grain overlay for texture */}
      <div className="grain-overlay absolute inset-0 opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-16 md:mb-20">
          <SplitTextReveal
            as="h2"
            className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tighter mb-4"
            triggerOnScroll
            staggerFrom="start"
          >
            {t("title")}
          </SplitTextReveal>
          <p className="text-xl md:text-3xl font-bold opacity-80">
            {t("subtitle")}
          </p>
        </div>

        {/* Posts Grid - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {posts.map((post, index) => (
            <div
              key={post.slug}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
            >
              <BlogCard post={post} locale={locale} />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            ref={ctaRef}
            href="/blog"
            className="inline-block text-lg md:text-2xl font-black px-8 md:px-12 py-4 md:py-6 bg-background text-foreground border-4 border-foreground shadow-brutalist hover:shadow-brutalist-lg hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            {t("viewAllPosts")} →
          </Link>
        </div>
      </div>
    </section>
  )
}
