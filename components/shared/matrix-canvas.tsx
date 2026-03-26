"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useTheme } from "next-themes"
import { prefersReducedMotion } from "@/lib/gsap-config"

// Character sets - authentic Matrix style
const HALF_WIDTH_KATAKANA = "ｦｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ"
const NUMBERS = "0123456789"
const SYMBOLS = ":<>*+=-@#$%&"
const TECH_TERMS = "NEXTJSREACTTYPESCRIPTTAILWINDPRISMAJESTNODEAPIAUTHTESTCODEBUILDSHIP"

// Combined character set (weighted towards Japanese for authenticity)
const MATRIX_CHARS = HALF_WIDTH_KATAKANA + HALF_WIDTH_KATAKANA + NUMBERS + SYMBOLS + TECH_TERMS

// Number of brightness levels (0 = brightest, 7 = dimmest)
const NUM_SHADES = 8

// 8-shade color palettes for high contrast
const DARK_MODE_PALETTE = [
  "#FFFFFF", // 0: Pure white (head)
  "#E8E8E8", // 1: Very bright (glow zone)
  "#D0D0D0", // 2: Bright (glow zone)
  "#B0B0B0", // 3: Medium-bright
  "#888888", // 4: Medium
  "#606060", // 5: Medium-dim
  "#404040", // 6: Dim
  "#252525", // 7: Very dim (near background)
]

const LIGHT_MODE_PALETTE = [
  "#000000", // 0: Pure black (head)
  "#1A1A1A", // 1: Very dark (glow zone)
  "#333333", // 2: Dark (glow zone)
  "#4D4D4D", // 3: Medium-dark
  "#666666", // 4: Medium
  "#888888", // 5: Medium-light
  "#AAAAAA", // 6: Light
  "#CCCCCC", // 7: Very light (near background)
]

interface MatrixColumn {
  x: number
  headY: number
  speed: number
  trailLength: number
  spawnDelay: number
  lastHeadY: number
}

interface MatrixCanvasProps {
  /** 0 = fully hidden, 1 = fully visible */
  clipProgress: number
}

export function MatrixCanvas({ clipProgress }: MatrixCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  
  // Grids stored as refs to avoid re-renders
  const columnsRef = useRef<MatrixColumn[]>([])
  const charGridRef = useRef<string[][]>([])
  const brightnessGridRef = useRef<number[][]>([])
  const dimensionsRef = useRef({ width: 0, height: 0, cols: 0, rows: 0 })
  
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get random Matrix character
  const getRandomChar = useCallback(() => {
    return MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length))
  }, [])

  // Initialize or resize grids
  const initializeGrids = useCallback((cols: number, rows: number) => {
    charGridRef.current = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => " ")
    )
    brightnessGridRef.current = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => NUM_SHADES + 1)
    )
  }, [])

  // Initialize columns
  const initializeColumns = useCallback((cols: number, rows: number) => {
    const columns: MatrixColumn[] = []
    
    for (let x = 0; x < cols; x++) {
      const minTrail = Math.max(8, Math.floor(rows / 4))
      const maxTrail = Math.max(minTrail + 5, Math.floor(rows / 2))
      
      columns.push({
        x,
        headY: -Math.random() * rows,
        speed: 0.3 + Math.random() * 0.7,
        trailLength: minTrail + Math.floor(Math.random() * (maxTrail - minTrail)),
        spawnDelay: Math.floor(Math.random() * 30),
        lastHeadY: -1,
      })
    }
    
    columnsRef.current = columns
  }, [])

  // Respawn a column at the top
  const respawnColumn = useCallback((col: MatrixColumn, rows: number) => {
    const minTrail = Math.max(8, Math.floor(rows / 4))
    const maxTrail = Math.max(minTrail + 5, Math.floor(rows / 2))
    
    col.headY = -Math.random() * 10 - 1
    col.lastHeadY = -1
    col.speed = 0.3 + Math.random() * 0.7
    col.trailLength = minTrail + Math.floor(Math.random() * (maxTrail - minTrail))
    col.spawnDelay = Math.floor(Math.random() * 20)
  }, [])

  // Update a single column
  const updateColumn = useCallback((col: MatrixColumn, rows: number) => {
    const { cols } = dimensionsRef.current
    const charGrid = charGridRef.current
    const brightnessGrid = brightnessGridRef.current
    
    if (col.spawnDelay > 0) {
      col.spawnDelay--
      return
    }
    
    col.headY += col.speed
    const currentHeadY = Math.floor(col.headY)
    
    if (currentHeadY !== col.lastHeadY && currentHeadY >= 0) {
      if (currentHeadY < rows && col.x < cols) {
        charGrid[currentHeadY][col.x] = getRandomChar()
        brightnessGrid[currentHeadY][col.x] = 0
      }
      col.lastHeadY = currentHeadY
    }
    
    for (let y = 0; y < rows; y++) {
      if (col.x >= cols) continue
      
      const distanceFromHead = currentHeadY - y
      
      if (distanceFromHead < 0) {
        continue
      } else if (distanceFromHead === 0) {
        brightnessGrid[y][col.x] = 0
      } else if (distanceFromHead <= 3) {
        brightnessGrid[y][col.x] = Math.min(distanceFromHead, 2)
      } else if (distanceFromHead < col.trailLength) {
        const progress = (distanceFromHead - 3) / Math.max(1, col.trailLength - 3)
        const brightness = 3 + Math.floor(progress * 4)
        brightnessGrid[y][col.x] = Math.min(brightness, NUM_SHADES - 1)
      } else {
        const fadeDistance = distanceFromHead - col.trailLength
        const fadeBrightness = NUM_SHADES + Math.floor(fadeDistance / 2)
        brightnessGrid[y][col.x] = Math.min(fadeBrightness, NUM_SHADES + 10)
      }
    }
    
    if (col.headY - col.trailLength > rows + 5) {
      respawnColumn(col, rows)
    }
  }, [getRandomChar, respawnColumn])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !mounted) return

    if (prefersReducedMotion()) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        const isDark = theme === "dark"
        ctx.fillStyle = isDark ? "#000000" : "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      return
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const CHAR_WIDTH = 14
    const CHAR_HEIGHT = 18
    const TARGET_FPS = 30
    const FRAME_INTERVAL = 1000 / TARGET_FPS
    let lastFrameTime = 0

    ctx.font = `bold ${CHAR_HEIGHT - 2}px 'Courier New', monospace`
    ctx.textBaseline = "top"

    const resizeCanvas = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      canvas.width = width
      canvas.height = height
      
      const cols = Math.ceil(width / CHAR_WIDTH)
      const rows = Math.ceil(height / CHAR_HEIGHT)
      
      if (
        cols !== dimensionsRef.current.cols ||
        rows !== dimensionsRef.current.rows
      ) {
        dimensionsRef.current = { width, height, cols, rows }
        initializeGrids(cols, rows)
        initializeColumns(cols, rows)
      }
      
      ctx.font = `bold ${CHAR_HEIGHT - 2}px 'Courier New', monospace`
      ctx.textBaseline = "top"
    }

    const draw = (timestamp: number) => {
      if (timestamp - lastFrameTime < FRAME_INTERVAL) {
        animationRef.current = requestAnimationFrame(draw)
        return
      }
      lastFrameTime = timestamp

      const { cols, rows } = dimensionsRef.current
      const isDark = theme === "dark"
      const palette = isDark ? DARK_MODE_PALETTE : LIGHT_MODE_PALETTE
      const charGrid = charGridRef.current
      const brightnessGrid = brightnessGridRef.current

      ctx.fillStyle = isDark ? "#000000" : "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      columnsRef.current.forEach((col) => {
        updateColumn(col, rows)
      })

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const brightness = brightnessGrid[y]?.[x]
          
          if (brightness === undefined || brightness >= NUM_SHADES) {
            continue
          }
          
          const char = charGrid[y]?.[x]
          if (!char || char === " ") {
            continue
          }
          
          ctx.fillStyle = palette[brightness]
          ctx.fillText(char, x * CHAR_WIDTH, y * CHAR_HEIGHT)
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animationRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme, mounted, initializeGrids, initializeColumns, updateColumn])

  // Calculate clip-path based on progress
  // clipProgress 0 = inset(100% 0 0 0) = hidden from top
  // clipProgress 1 = inset(0% 0 0 0) = fully visible
  const clipPath = `inset(${(1 - clipProgress) * 100}% 0 0 0)`

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ 
        clipPath,
        WebkitClipPath: clipPath,
        transition: "clip-path 0.3s ease-in-out",
      }}
      aria-hidden="true"
    />
  )
}
