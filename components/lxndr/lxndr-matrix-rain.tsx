"use client"

import { useEffect, useRef } from "react"
import { prefersReducedMotion } from "@/lib/gsap-config"

const NOTE_CHARS = ["♩", "♪", "♫", "♬", "♭", "♯", "♮"] as const

const FONT_SIZE = 16
const ROW_HEIGHT = 32
const COL_SPACING = 14
const FPS = 20
const TRAIL_LENGTH = 5
const SPAWN_CHANCE = 0.004
const MAX_DROPS_PER_COL = 2
const MIN_SPEED = 0.08
const MAX_SPEED = 0.20

const TRAIL_COLORS = [
  { color: "#ffffff", alpha: 1.0 },
  { color: "#ffbbee", alpha: 0.72 },
  { color: "#ff55cc", alpha: 0.46 },
  { color: "#ff0aa8", alpha: 0.24 },
  { color: "#aa0070", alpha: 0.10 },
] as const

interface Drop {
  pos: number
  lastRow: number
  speed: number
  chars: string[]
}

function randomNote(): string {
  return NOTE_CHARS[Math.floor(Math.random() * NOTE_CHARS.length)]
}

function spawnDrop(startRow: number): Drop {
  return {
    pos: startRow,
    lastRow: Math.floor(startRow),
    speed: MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
    chars: Array.from({ length: TRAIL_LENGTH }, () => randomNote()),
  }
}

export function LxndrMatrixRain({ opacity = 0.22 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion()) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.max(1, window.devicePixelRatio || 1)
    const frameInterval = 1000 / FPS

    let animationFrame = 0
    let lastFrame = 0
    let canvasWidth = 0
    let canvasHeight = 0
    let columns = 0
    let columnDrops: Drop[][] = []

    const initColumns = (width: number, height: number) => {
      if (!width || !height) return
      canvasWidth = width
      canvasHeight = height
      columns = Math.max(1, Math.floor(width / COL_SPACING))

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = `900 ${FONT_SIZE}px "Segoe UI Symbol", "Apple Symbols", "Noto Symbols 2", monospace`
      ctx.textAlign = "center"
      ctx.textBaseline = "top"

      columnDrops = Array.from({ length: columns }, (_, col) => {
        const count = 1 + Math.floor(Math.random() * 2)
        return Array.from({ length: count }, (_el, dropIdx) =>
          spawnDrop(-Math.floor(Math.random() * 60) - dropIdx * 25 - (col % 19) * 2)
        )
      })
    }

    const draw = (timestamp: number) => {
      if (timestamp - lastFrame < frameInterval) {
        animationFrame = requestAnimationFrame(draw)
        return
      }
      lastFrame = timestamp

      ctx.fillStyle = "rgba(3, 3, 3, 0.38)"
      ctx.fillRect(0, 0, canvasWidth, canvasHeight)

      for (let col = 0; col < columns; col++) {
        const x = col * COL_SPACING + COL_SPACING / 2
        const active = columnDrops[col]

        if (active.length < MAX_DROPS_PER_COL && Math.random() < SPAWN_CHANCE) {
          active.push(spawnDrop(-Math.floor(Math.random() * 20)))
        }

        for (let d = active.length - 1; d >= 0; d--) {
          const drop = active[d]
          const currentRow = Math.floor(drop.pos)

          if (currentRow !== drop.lastRow) {
            drop.chars = [randomNote(), ...drop.chars.slice(0, TRAIL_LENGTH - 1)]
            drop.lastRow = currentRow
          }

          for (let t = 0; t < TRAIL_LENGTH; t++) {
            const row = currentRow - t
            const y = row * ROW_HEIGHT
            if (y < -ROW_HEIGHT || y > canvasHeight) continue

            const char = drop.chars[t]
            if (!char) continue

            const { color, alpha } = TRAIL_COLORS[t]
            ctx.save()
            ctx.globalAlpha = alpha
            ctx.fillStyle = color
            ctx.fillText(char, x, y)
            ctx.restore()
          }

          drop.pos += drop.speed

          if (currentRow * ROW_HEIGHT > canvasHeight + ROW_HEIGHT * TRAIL_LENGTH) {
            active.splice(d, 1)
          }
        }
      }

      animationFrame = requestAnimationFrame(draw)
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      initColumns(entry.contentRect.width, entry.contentRect.height)
    })

    const parent = canvas.parentElement
    if (!parent) return undefined

    initColumns(parent.clientWidth, parent.clientHeight)
    observer.observe(parent)
    animationFrame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full select-none pointer-events-none"
      style={{ opacity }}
    />
  )
}


