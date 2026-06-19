"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { lxndrLinks } from "@/components/lxndr/lxndr-links"
import { useLxndrScrollMotion } from "@/components/lxndr/use-lxndr-scroll-motion"

gsap.registerPlugin(ScrollTrigger)

const WAVE_COLORS: [number, number, number][] = [
  [255, 10, 168],
  [255, 10, 168],
  [0, 234, 255],
  [255, 10, 168],
  [140, 255, 0],
]

const CTA_LINKS = [
  {
    id: "cta-whatsapp",
    href: lxndrLinks.whatsapp,
    labelKey: "whatsapp",
    className:
      "border-2 border-[var(--lxndr-pink)] bg-[var(--lxndr-pink)] text-black hover:bg-transparent hover:text-[var(--lxndr-pink)] focus-visible:outline-[var(--lxndr-pink)]",
    icon: WhatsAppIcon,
  },
  {
    id: "cta-instagram",
    href: lxndrLinks.instagram,
    labelKey: "instagram",
    className:
      "border-2 border-white/18 text-white hover:border-[var(--lxndr-pink)] hover:text-[var(--lxndr-pink)] focus-visible:outline-[var(--lxndr-pink)]",
    icon: InstagramIcon,
  },
  {
    id: "cta-soundcloud",
    href: lxndrLinks.soundcloud,
    labelKey: "soundcloud",
    className:
      "border-2 border-white/18 text-white hover:border-[var(--lxndr-cyan)] hover:text-[var(--lxndr-cyan)] focus-visible:outline-[var(--lxndr-cyan)]",
    icon: SoundcloudIcon,
  },
  {
    id: "cta-email",
    href: lxndrLinks.email,
    labelKey: "email",
    className:
      "border-2 border-[var(--lxndr-green)] text-[var(--lxndr-green)] hover:bg-[var(--lxndr-green)] hover:text-black focus-visible:outline-[var(--lxndr-green)]",
    icon: MailIcon,
  },
] as const

export function LxndrBooking() {
  const t = useTranslations("lxndr.booking")
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const year = new Date().getFullYear()

  useLxndrScrollMotion(sectionRef)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(contentRef)

      if (prefersReducedMotion()) {
        gsap.set(sel("[data-anim]"), { opacity: 1, y: 0 })
        return
      }

      gsap.set(sel("[data-booking-title]"), { opacity: 0, y: 60 })
      gsap.set(sel("[data-booking-item]"), { opacity: 0, y: 24 })

      gsap.to(sel("[data-booking-title]"), {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      })

      gsap.to(sel("[data-booking-item]"), {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      })
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="relative overflow-hidden bg-[var(--lxndr-black)]"
    >
      <SonarCanvas />

      <div className="pointer-events-none absolute inset-0 lxndr-noise z-[1] opacity-15" />
      <div className="absolute left-0 top-0 z-[2] h-px w-full bg-[var(--lxndr-pink)]/40" />

      <div
        ref={contentRef}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center md:px-12"
      >
        <div
          data-anim
          data-booking-title
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-[var(--lxndr-pink)]/60" />
          <span className="font-mono text-xs uppercase tracking-[0.44em] text-[var(--lxndr-pink)]">
            08 / chamar
          </span>
          <span className="h-px w-8 bg-[var(--lxndr-pink)]/60" />
        </div>

        <h2
          data-anim
          data-booking-title
          className="font-bebas text-[clamp(5.5rem,20vw,15rem)] leading-none tracking-tight text-[var(--lxndr-pink)]"
          style={{ textShadow: "0 0 80px rgba(255,10,168,0.22)" }}
        >
          {t("title")}
        </h2>

        <p
          data-anim
          data-booking-item
          className="mt-7 max-w-2xl font-space text-lg leading-relaxed text-white/62 md:text-xl"
        >
          {t("sub")}
        </p>

        <p
          data-anim
          data-booking-item
          className="mt-3 font-mono text-xs uppercase tracking-[0.38em] text-[var(--lxndr-steel)]"
        >
          {t("alt")}
        </p>

        <div
          data-anim
          data-booking-item
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center"
        >
          {CTA_LINKS.map(({ id, href, labelKey, className, icon: Icon }) => (
            <a
              key={id}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className={`inline-flex min-w-[200px] items-center justify-center gap-3 px-6 py-4 font-mono text-sm font-bold uppercase tracking-[0.24em] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
            >
              <Icon />
              {t(labelKey)}
            </a>
          ))}
        </div>

        <div
          data-anim
          data-booking-item
          className="mt-16 flex w-full max-w-xl flex-col gap-3 border-t border-white/10 pt-6 font-mono text-xs uppercase tracking-[0.24em] text-white/38 sm:flex-row sm:items-center sm:justify-between"
        >
          <Link
            href="/"
            className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            ← Voltar ao Portal
          </Link>
          <span>© {year} SAERIX</span>
        </div>
      </div>
    </section>
  )
}

function SonarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let frame = 0

    type Wave = { r: number; maxR: number; ci: number }
    const waves: Wave[] = []
    const SPAWN_INTERVAL = 42
    const WAVE_SPEED = 2.6

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const cx = w / 2
      const cy = h / 2
      const maxR = Math.sqrt(cx * cx + cy * cy) + 40

      ctx.clearRect(0, 0, w, h)

      const hudAlpha = 0.048
      ctx.lineWidth = 0.5
      ctx.strokeStyle = `rgba(255,10,168,${hudAlpha})`

      ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke()

      const d = Math.max(w, h) * 1.5
      ctx.beginPath(); ctx.moveTo(cx - d, cy - d); ctx.lineTo(cx + d, cy + d); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx + d, cy - d); ctx.lineTo(cx - d, cy + d); ctx.stroke()

      if (frame % SPAWN_INTERVAL === 0) {
        waves.push({ r: 0, maxR, ci: waves.length % WAVE_COLORS.length })
      }

      for (let i = waves.length - 1; i >= 0; i--) {
        const wv = waves[i]
        wv.r += WAVE_SPEED

        const progress = wv.r / wv.maxR
        const alpha = 0.38 * Math.pow(1 - progress, 2)

        if (alpha <= 0.004 || wv.r > wv.maxR) {
          waves.splice(i, 1)
          continue
        }

        const [r, g, b] = WAVE_COLORS[wv.ci]
        ctx.beginPath()
        ctx.arc(cx, cy, wv.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.lineWidth = wv.ci === 2 ? 1 : 1.5
        ctx.stroke()
      }

      const pulseAlpha = 0.55 + 0.45 * Math.sin(frame * 0.07)
      ctx.beginPath()
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,10,168,${pulseAlpha.toFixed(2)})`
      ctx.fill()

      const outerGlowAlpha = 0.18 + 0.12 * Math.sin(frame * 0.06)
      ctx.beginPath()
      ctx.arc(cx, cy, 8, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255,10,168,${outerGlowAlpha.toFixed(2)})`
      ctx.lineWidth = 1
      ctx.stroke()

      frame++
      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      tabIndex={-1}
      aria-hidden="true"
    />
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function SoundcloudIcon() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor" aria-hidden="true">
      <path d="M0 7.5C0 8.88 1.12 10 2.5 10S5 8.88 5 7.5V5.5C4.4 5.18 3.7 5 3 5 1.34 5 0 6.34 0 7.5zM14 3c-.26 0-.5.04-.74.1C12.85 1.3 11.07 0 9 0c-2.21 0-4 1.79-4 4v6h9c1.1 0 2-.9 2-2s-.9-2-2-2z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 4h16v16H4z" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
}
