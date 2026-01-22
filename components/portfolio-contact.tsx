"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CopyButton } from "./copy-button"
import { Toast } from "./toast"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioContact() {
  const t = useTranslations("contact")
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [toastMessage, setToastMessage] = useState("")
  const [showToast, setShowToast] = useState(false)

  const handleCopy = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        },
        y: 150,
        opacity: 0,
      })

      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        },
        y: -100,
        opacity: 0,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 md:px-12 py-16 md:py-24 relative bg-foreground text-background overflow-hidden"
      data-theme="dark"
    >
      <div className="max-w-7xl w-full">
        <h2
          ref={titleRef}
          className="text-[clamp(3rem,10vw,8rem)] font-bold leading-none tracking-tighter mb-16"
        >
          {t("title")}
        </h2>

        <div ref={contentRef} className="space-y-8">
          <div className="border-2 border-background p-8 md:p-12 rounded-lg shadow-modern-lg">
            <p className="text-3xl md:text-6xl font-bold leading-tight mb-8 whitespace-pre-line">
              {t("callToAction")}
            </p>
            
            <div className="space-y-4 md:space-y-6">
              <CopyButton
                value="sergioalexandre0716@gmail.com"
                displayText="sergioalexandre0716@gmail.com"
                icon="email"
                theme="dark"
                onCopy={() => handleCopy("Email copied to clipboard!")}
              />
              
              <CopyButton
                value="https://linkedin.com/in/serg-alexandre"
                displayText="linkedin.com/in/serg-alexandre"
                icon="link"
                href="https://linkedin.com/in/serg-alexandre"
                theme="dark"
                onCopy={() => handleCopy("LinkedIn URL copied!")}
              />
              
              <CopyButton
                value="+5543988732020"
                displayText="+55 43 9 8873-2020"
                icon="phone"
                theme="dark"
                onCopy={() => handleCopy("Phone number copied!")}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-background/10 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-background/20">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{t("location")}</h3>
              <p className="text-lg md:text-xl font-semibold">{t("locationValue")}</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-background/20">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{t("english")}</h3>
              <p className="text-lg md:text-xl font-semibold">{t("englishValue")}</p>
            </div>
            <div className="bg-background/10 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-background/20">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{t("availability")}</h3>
              <p className="text-lg md:text-xl font-semibold">{t("availabilityValue")}</p>
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        theme="dark"
      />
    </section>
  )
}
