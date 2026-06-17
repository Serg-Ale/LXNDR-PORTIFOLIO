"use client"

import { useEffect, useRef } from "react"
import { Volume2 } from "lucide-react"
import { NOTE_FREQUENCIES, type NoteKey } from "@/components/lxndr/use-scroll-chord-audio"

interface SideChordSequencerProps {
  activeNotes: Set<NoteKey>
  audioEnabled: boolean
  isMuted: boolean
  scrollProgress: number
  analyserNode: AnalyserNode | null
  oscillatorType: OscillatorType
  outputLevel: number
  filterCutoff: number
  detuneAmount: number
  onActivateAudio: () => void
  onToggleMute: () => void
  onSetWaveType: (type: OscillatorType) => void
  onSetOutputLevel: (level: number) => void
  onSetFilterCutoff: (cutoff: number) => void
  onSetDetuneAmount: (detune: number) => void
}

const NOTE_ROWS: Array<{
  note: NoteKey
  label: string
  solfege: string
}> = [
  { note: "C4", label: "C4", solfege: "DÓ" },
  { note: "E4", label: "E4", solfege: "MI" },
  { note: "G4", label: "G4", solfege: "SOL" },
  { note: "C5", label: "C5", solfege: "DÓ" },
  { note: "E5", label: "E5", solfege: "MI" },
]

const NOTE_COLOR: Record<NoteKey, string> = {
  C4: "var(--lxndr-pink)",
  E4: "var(--lxndr-cyan)",
  G4: "var(--lxndr-green)",
  C5: "var(--lxndr-blue)",
  E5: "var(--lxndr-steel)",
}

const CHORD_NOTES = [
  { text: "C", noteKey: "C4" as NoteKey },
  { text: "E", noteKey: "E4" as NoteKey },
  { text: "G", noteKey: "G4" as NoteKey },
  { text: "C", noteKey: "C5" as NoteKey },
  { text: "E", noteKey: "E5" as NoteKey },
]

const WAVE_TYPES: Array<{ type: OscillatorType; label: string }> = [
  { type: "sine",     label: "SINE" },
  { type: "triangle", label: "TRI" },
  { type: "sawtooth", label: "SAW" },
  { type: "square",   label: "SQR" },
]

const METER_BASE_HEIGHTS = [10, 16, 22, 14, 28, 18, 12]
const METER_ACTIVE_BUMPS = [8,   6, 10,  8, 12,  6,  4]

function formatFilterValue(value: number) {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : String(Math.round(value))
}

function formatDetuneValue(value: number) {
  return `${value > 0 ? "+" : ""}${Math.round(value)}C`
}

interface ControlKnobProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  displayValue: string
  color: string
  onChange: (value: number) => void
}

function ControlKnob({ label, value, min, max, step, displayValue, color, onChange }: ControlKnobProps) {
  const progress = (value - min) / (max - min)
  const angle = -135 + Math.min(1, Math.max(0, progress)) * 270

  return (
    <label className="group relative flex min-w-0 flex-col items-center gap-1.5 text-center">
      <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-white/36">{label}</span>
      <span
        className="relative h-10 w-10 rounded-full border bg-black shadow-[inset_0_0_18px_rgba(255,255,255,0.04)]"
        style={{ borderColor: `color-mix(in srgb, ${color} 68%, rgba(255,255,255,0.16))` }}
      >
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35" />
        <span
          className="absolute left-1/2 top-1/2 h-[18px] w-[2px] origin-bottom -translate-x-1/2 -translate-y-full rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`,
            transform: `translate(-50%, -100%) rotate(${angle}deg)`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          aria-label={label}
        />
      </span>
      <span className="font-mono text-[8px] uppercase tracking-[0.18em]" style={{ color }}>
        {displayValue}
      </span>
    </label>
  )
}

function WaveformDisplay({ analyserNode, visualRate }: { analyserNode: AnalyserNode | null; visualRate: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const getCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      return {
        width: rect.width,
        height: rect.height,
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const drawIdleSignal = () => {
      const { width, height } = getCanvasSize()
      ctx.clearRect(0, 0, width, height)

      const centerY = height / 2
      ctx.beginPath()
      ctx.strokeStyle = "rgba(255, 10, 168, 0.18)"
      ctx.lineWidth = 1
      ctx.moveTo(0, centerY)
      ctx.lineTo(width, centerY)
      ctx.stroke()

      ctx.beginPath()
      ctx.strokeStyle = "rgba(255, 10, 168, 0.78)"
      ctx.shadowColor = "rgba(255, 10, 168, 0.9)"
      ctx.shadowBlur = 12
      ctx.lineWidth = 3.5
      ctx.lineJoin = "round"
      ctx.moveTo(0, centerY)
      for (let x = 0; x <= width; x += 8) {
        const y = centerY + Math.sin(x * 0.05 * visualRate) * 11 + Math.sin(x * 0.13 * visualRate) * 5
        ctx.lineTo(x, y)
      }
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    if (!analyserNode) {
      drawIdleSignal()
      return () => window.removeEventListener("resize", resizeCanvas)
    }

    const bufferLength = analyserNode.fftSize
    const dataArray = new Uint8Array(bufferLength)
    let animId: number

    const draw = () => {
      animId = requestAnimationFrame(draw)
      const { width, height } = getCanvasSize()
      analyserNode.getByteTimeDomainData(dataArray)

      ctx.clearRect(0, 0, width, height)

      ctx.beginPath()
      ctx.strokeStyle = "rgba(255, 10, 168, 0.14)"
      ctx.lineWidth = 1
      ctx.moveTo(0, height / 2)
      ctx.lineTo(width, height / 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.strokeStyle = "var(--lxndr-pink)"
      ctx.shadowColor = "rgba(255, 10, 168, 0.85)"
      ctx.shadowBlur = 16
      ctx.lineWidth = 5
      ctx.lineJoin = "round"
      ctx.lineCap = "round"

      const points: Array<{ x: number; y: number }> = []

      const pointCount = bufferLength
      const sliceWidth = width / pointCount
      let x = 0
      for (let i = 0; i < pointCount; i++) {
        const sampleIndex = Math.floor(i * visualRate) % bufferLength
        const v = dataArray[sampleIndex] / 128.0
        const y = (v * height) / 2
        points.push({ x, y })
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
        x += sliceWidth
      }
      ctx.stroke()

      if (points.length > 1) {
        const fillGradient = ctx.createLinearGradient(0, 0, 0, height)
        fillGradient.addColorStop(0, "rgba(255, 10, 168, 0.28)")
        fillGradient.addColorStop(0.55, "rgba(255, 10, 168, 0.08)")
        fillGradient.addColorStop(1, "rgba(255, 10, 168, 0)")

        ctx.beginPath()
        ctx.moveTo(points[0].x, height)
        points.forEach((point) => ctx.lineTo(point.x, point.y))
        ctx.lineTo(points[points.length - 1].x, height)
        ctx.closePath()
        ctx.fillStyle = fillGradient
        ctx.fill()

        ctx.beginPath()
        ctx.strokeStyle = "rgba(255, 190, 235, 0.8)"
        ctx.shadowColor = "rgba(255, 10, 168, 0.65)"
        ctx.shadowBlur = 5
        ctx.lineWidth = 1.4
        points.forEach((point, index) => {
          if (index === 0) ctx.moveTo(point.x, point.y)
          else ctx.lineTo(point.x, point.y)
        })
        ctx.stroke()
      }

      ctx.shadowBlur = 0
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [analyserNode, visualRate])

  return (
    <canvas
      ref={canvasRef}
      width={360}
      height={168}
      className="block h-[128px] w-full sm:h-[168px] md:h-[210px]"
    />
  )
}

export function SideChordSequencer({
  activeNotes,
  audioEnabled,
  isMuted,
  scrollProgress,
  analyserNode,
  oscillatorType,
  outputLevel,
  filterCutoff,
  detuneAmount,
  onActivateAudio,
  onToggleMute,
  onSetWaveType,
  onSetOutputLevel,
  onSetFilterCutoff,
  onSetDetuneAmount,
}: SideChordSequencerProps) {
  const scrollPercent = Math.round(Math.min(1, Math.max(0, scrollProgress)) * 100)
  const visualRate = 1 + (Math.abs(detuneAmount) / 24) * 1.2

  return (
    <aside className="w-full overflow-hidden border border-[var(--lxndr-pink)]/28 bg-[var(--lxndr-black)] font-mono text-[10px] uppercase tracking-[0.24em] text-white/72 shadow-[0_0_48px_rgba(255,10,168,0.08)]">

      <div className="flex items-center justify-between border-b border-white/15 px-4 py-3">
        <span className="text-white/82">CHORD MEMORY</span>
        <span className="text-[var(--lxndr-pink)]">armed</span>
      </div>

      <div className="grid grid-cols-1 border-b border-white/12 sm:grid-cols-[minmax(0,0.72fr)_minmax(150px,1fr)]">
        <div className="px-4 py-4">
          <div className="mb-1.5 text-white/40">C MAJOR / OPEN</div>
          <div className="flex items-baseline gap-1.5 tracking-[0.18em]" aria-hidden="true">
            {CHORD_NOTES.map(({ text, noteKey }, i) => (
              <span key={noteKey}>
                <span style={{ color: NOTE_COLOR[noteKey] }}>{text}</span>
                {i < CHORD_NOTES.length - 1 && (
                  <span className="ml-1.5 text-white/20">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden grid-cols-3 gap-2 border-l border-white/12 px-3 py-3 sm:grid">
          <ControlKnob
            label="DETUNE"
            value={detuneAmount}
            min={-24}
            max={24}
            step={1}
            displayValue={formatDetuneValue(detuneAmount)}
            color="var(--lxndr-green)"
            onChange={onSetDetuneAmount}
          />
          <ControlKnob
            label="FILTER"
            value={filterCutoff}
            min={700}
            max={9500}
            step={100}
            displayValue={formatFilterValue(filterCutoff)}
            color="var(--lxndr-cyan)"
            onChange={onSetFilterCutoff}
          />
          <ControlKnob
            label="GAIN"
            value={outputLevel}
            min={0.04}
            max={0.22}
            step={0.01}
            displayValue={`${Math.round((outputLevel / 0.22) * 100)}`}
            color="var(--lxndr-pink)"
            onChange={onSetOutputLevel}
          />
        </div>
      </div>

      <div className="border-b border-white/12 px-4 py-3">
        <div className="mb-2 text-[9px] tracking-[0.3em] text-white/25">WAVE SHAPE</div>
        <fieldset className="m-0 grid grid-cols-4 gap-1 border-0 p-0" aria-label="Selecionar forma de onda">
          {WAVE_TYPES.map(({ type, label }) => {
            const isSelected = oscillatorType === type
            return (
              <button
                key={type}
                type="button"
                onClick={() => onSetWaveType(type)}
                aria-pressed={isSelected}
                style={isSelected ? {
                  backgroundColor: "color-mix(in srgb, var(--lxndr-pink) 15%, transparent)",
                  color: "var(--lxndr-pink)",
                  border: "1px solid color-mix(in srgb, var(--lxndr-pink) 60%, transparent)",
                } : {
                  backgroundColor: "transparent",
                  color: "rgba(255,255,255,0.38)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                className="py-2 text-[9px] uppercase tracking-[0.18em] transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--lxndr-cyan)] focus-visible:outline-offset-2"
              >
                {label}
              </button>
            )
          })}
        </fieldset>
      </div>

      <div className="border-b border-white/12 px-4 py-3 sm:py-4">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="text-[9px] tracking-[0.34em] text-[var(--lxndr-pink)]/80">SIGNAL VIEW</span>
          <span className="text-[9px] tracking-[0.28em] text-white/28">{scrollPercent}%</span>
        </div>
        <div className="border border-[var(--lxndr-pink)]/45 bg-[radial-gradient(circle_at_50%_45%,rgba(255,10,168,0.12),rgba(255,10,168,0.025)_48%,transparent_78%)] shadow-[0_0_34px_rgba(255,10,168,0.16)]">
          <WaveformDisplay analyserNode={analyserNode} visualRate={visualRate} />
        </div>
      </div>

      <div className="divide-y divide-white/10">
        {NOTE_ROWS.map((row) => {
          const isActive = activeNotes.has(row.note)
          const color = NOTE_COLOR[row.note]
          const frequency = NOTE_FREQUENCIES[row.note].toFixed(2)

          return (
            <div
              key={row.note}
              className={`border-l-4 px-4 transition-[opacity,background-color,border-left-color,box-shadow] duration-300 ${isActive ? "py-3" : "hidden py-2 sm:block"}`}
              style={isActive ? {
                borderLeftColor: color,
                backgroundColor: `color-mix(in srgb, ${color} 6%, transparent)`,
                boxShadow: `inset 1px 0 0 color-mix(in srgb, ${color} 35%, transparent)`,
                opacity: 1,
                transform: "translateY(0)",
                transition: "opacity 0.45s ease, transform 0.45s ease, border-left-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
              } : {
                borderLeftColor: "rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.004)",
                opacity: 0.34,
                transform: "translateY(0)",
                transition: "opacity 0.45s ease, transform 0.45s ease, border-left-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <div className="flex items-end justify-between gap-4">
                <div className="space-y-1">
                  <div
                    className="text-[11px] tracking-[0.3em] transition-colors duration-300"
                    style={{ color: isActive ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.7)" }}
                  >
                    {row.label} / {row.solfege}
                  </div>
                  <div
                    className="text-[10px] tracking-[0.24em] transition-colors duration-300"
                    style={{ color: isActive ? `color-mix(in srgb, ${color} 75%, white)` : "rgba(255,255,255,0.18)" }}
                  >
                    {frequency} Hz
                  </div>
                </div>

                <div className="hidden items-end gap-[3px] sm:flex" aria-hidden="true">
                  {METER_BASE_HEIGHTS.map((baseHeight, index) => {
                    const meterHeight = isActive ? baseHeight + METER_ACTIVE_BUMPS[index] : baseHeight
                    return (
                      <span
                        key={`${row.note}-${baseHeight}`}
                        className="w-1 transition-all duration-300"
                        style={{
                          height: `${meterHeight}px`,
                          backgroundColor: isActive ? color : "rgba(255,255,255,0.1)",
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t border-white/12 px-4 py-3 sm:py-4">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="text-white/38">SCROLL INTERATIVO</span>
          <span className="text-white/38">{scrollPercent}%</span>
        </div>
        <div className="h-1 border border-white/10 bg-white/[0.03]" aria-hidden="true">
          <div
            className="h-full bg-[var(--lxndr-cyan)] transition-[width] duration-150"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
        <div className="mt-3 border-l-2 border-[var(--lxndr-pink)] pl-3 font-mono text-[9px] uppercase tracking-[0.26em] text-white/42">
          Role pra somar o acorde.
        </div>
      </div>

      <div className="border-t border-white/12 px-4 py-3 sm:py-4">
        {audioEnabled ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.28em] text-white/58">
              <span className="h-2 w-2 bg-[var(--lxndr-green)]" aria-hidden="true" />
              <span>SOM ATIVO · SCROLL PARA TOCAR</span>
            </div>
            <button
              type="button"
              onClick={onToggleMute}
              aria-label={isMuted ? "Ativar som" : "Mutar som"}
              className="flex w-full items-center justify-center border border-white/20 bg-transparent px-3 py-3 text-[10px] uppercase tracking-[0.32em] text-white/82 transition-colors duration-200 hover:border-[var(--lxndr-cyan)] hover:text-[var(--lxndr-cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--lxndr-cyan)] focus-visible:outline-offset-2"
            >
              {isMuted ? "ATIVAR" : "MUTAR"}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onActivateAudio}
            aria-label="Ativar som"
            className="group flex w-full items-center gap-3 border border-[var(--lxndr-pink)]/35 bg-[var(--lxndr-pink)]/[0.04] px-3 py-3 text-left text-[10px] uppercase tracking-[0.28em] text-[var(--lxndr-pink)]/85 transition-colors duration-200 hover:border-[var(--lxndr-pink)] hover:bg-[var(--lxndr-pink)]/10 hover:text-[var(--lxndr-pink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--lxndr-pink)] focus-visible:outline-offset-2"
          >
            <Volume2 className="h-5 w-5 shrink-0 animate-pulse transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
            <span>CLIQUE PARA ATIVAR SOM</span>
          </button>
        )}
      </div>
    </aside>
  )
}
