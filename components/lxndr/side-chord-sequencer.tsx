"use client"

import { useEffect, useRef } from "react"
import { NOTE_FREQUENCIES, type NoteKey } from "@/components/lxndr/use-scroll-chord-audio"

interface SideChordSequencerProps {
  activeNotes: Set<NoteKey>
  audioEnabled: boolean
  isMuted: boolean
  scrollProgress: number
  analyserNode: AnalyserNode | null
  oscillatorType: OscillatorType
  onToggleMute: () => void
  onSetWaveType: (type: OscillatorType) => void
}

const NOTE_ROWS: Array<{
  note: NoteKey
  label: string
  solfege: string
}> = [
  { note: "F3", label: "F3", solfege: "FÁ" },
  { note: "A3", label: "A3", solfege: "LÁ" },
  { note: "C4", label: "C4", solfege: "DÓ" },
  { note: "E4", label: "E4", solfege: "MI" },
  { note: "B4", label: "B4", solfege: "SI" },
]

const NOTE_COLOR: Record<NoteKey, string> = {
  F3: "var(--lxndr-pink)",
  A3: "var(--lxndr-cyan)",
  C4: "var(--lxndr-green)",
  E4: "var(--lxndr-blue)",
  B4: "var(--lxndr-steel)",
}

const CHORD_NOTES = [
  { text: "F", noteKey: "F3" as NoteKey },
  { text: "A", noteKey: "A3" as NoteKey },
  { text: "C", noteKey: "C4" as NoteKey },
  { text: "E", noteKey: "E4" as NoteKey },
  { text: "B", noteKey: "B4" as NoteKey },
]

const WAVE_TYPES: Array<{ type: OscillatorType; label: string }> = [
  { type: "sine",     label: "SINE" },
  { type: "triangle", label: "TRI" },
  { type: "sawtooth", label: "SAW" },
  { type: "square",   label: "SQR" },
]

const METER_BASE_HEIGHTS = [10, 16, 22, 14, 28, 18, 12]
const METER_ACTIVE_BUMPS = [8,   6, 10,  8, 12,  6,  4]

function WaveformDisplay({ analyserNode }: { analyserNode: AnalyserNode | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    if (!analyserNode) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.beginPath()
      ctx.strokeStyle = "rgba(255,255,255,0.12)"
      ctx.lineWidth = 1
      ctx.moveTo(0, canvas.height / 2)
      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.stroke()
      return
    }

    const bufferLength = analyserNode.fftSize
    const dataArray = new Uint8Array(bufferLength)
    let animId: number

    const draw = () => {
      animId = requestAnimationFrame(draw)
      analyserNode.getByteTimeDomainData(dataArray)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.beginPath()
      ctx.strokeStyle = "rgba(255,255,255,0.06)"
      ctx.lineWidth = 1
      ctx.moveTo(0, canvas.height / 2)
      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.stroke()

      ctx.beginPath()
      ctx.strokeStyle = "var(--lxndr-cyan)"
      ctx.lineWidth = 1.5
      ctx.lineJoin = "round"

      const sliceWidth = canvas.width / bufferLength
      let x = 0
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0
        const y = (v * canvas.height) / 2
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
        x += sliceWidth
      }
      ctx.stroke()
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [analyserNode])

  return (
    <canvas
      ref={canvasRef}
      width={240}
      height={52}
      className="block w-full"
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
  onToggleMute,
  onSetWaveType,
}: SideChordSequencerProps) {
  const scrollPercent = Math.round(Math.min(1, Math.max(0, scrollProgress)) * 100)

  return (
    <aside className="w-full border border-white/15 bg-[var(--lxndr-black)] font-mono text-[10px] uppercase tracking-[0.24em] text-white/72">

      <div className="flex items-center justify-between border-b border-white/15 px-4 py-3">
        <span className="text-white/82">CHORD MEMORY</span>
        <span className="text-[var(--lxndr-pink)]">armed</span>
      </div>

      <div className="border-b border-white/12 px-4 py-4">
        <div className="mb-1.5 text-white/40">FMAJ7♯11</div>
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

      <div className="border-b border-white/12 px-4 py-3">
        <div className="mb-2 text-[9px] tracking-[0.3em] text-white/25">OSCILLOSCOPE</div>
        <div className="border border-white/8 bg-white/[0.02]">
          <WaveformDisplay analyserNode={analyserNode} />
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

      <div className="divide-y divide-white/10">
        {NOTE_ROWS.map((row) => {
          const isActive = activeNotes.has(row.note)
          const color = NOTE_COLOR[row.note]
          const frequency = NOTE_FREQUENCIES[row.note].toFixed(2)

          return (
            <div
              key={row.note}
              className="border-l-4 px-4 py-3"
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
                opacity: 0,
                transform: "translateY(10px)",
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

                <div className="flex items-end gap-[3px]" aria-hidden="true">
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

      <div className="border-t border-white/12 px-4 py-4">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="text-white/38">SCROLL</span>
          <span className="text-white/38">{scrollPercent}%</span>
        </div>
        <div className="h-1 border border-white/10 bg-white/[0.03]" aria-hidden="true">
          <div
            className="h-full bg-[var(--lxndr-cyan)] transition-[width] duration-150"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
      </div>

      <div className="border-t border-white/12 px-4 py-4">
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
          <div className="flex items-center gap-2 text-[10px] tracking-[0.28em] text-white/25">
            <span className="h-1.5 w-1.5 bg-white/20" aria-hidden="true" />
            <span>SOM INATIVO</span>
          </div>
        )}
      </div>
    </aside>
  )
}
