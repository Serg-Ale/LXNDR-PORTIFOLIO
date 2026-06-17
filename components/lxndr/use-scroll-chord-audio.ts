"use client"

import { useCallback, useRef, useState } from "react"

export type NoteKey = "C4" | "E4" | "G4" | "C5" | "E5"

export const NOTE_FREQUENCIES: Record<NoteKey, number> = {
  C4: 261.63,
  E4: 329.63,
  G4: 392.00,
  C5: 523.25,
  E5: 659.25,
}

export const NOTE_KEYS: NoteKey[] = ["C4", "E4", "G4", "C5", "E5"]

const DEFAULT_OUTPUT_LEVEL = 0.14
const DEFAULT_FILTER_CUTOFF = 6500
const DEFAULT_DETUNE = 0
const FADE_IN_TIME = 0.2
const FADE_OUT_TIME = 0.3
const ACTIVATION_FADE_TIME = 2.2

type NoteNode = {
  oscillator: OscillatorNode
  gain: GainNode
}

type AudioContextConstructor = typeof AudioContext

type WindowWithWebkitAudioContext = Window & {
  webkitAudioContext?: AudioContextConstructor
}

export interface UseScrollChordAudioResult {
  isEnabled: boolean
  isMuted: boolean
  analyserNode: AnalyserNode | null
  oscillatorType: OscillatorType
  outputLevel: number
  filterCutoff: number
  detuneAmount: number
  activateAudio: () => void
  toggleMute: () => void
  setWaveType: (type: OscillatorType) => void
  setOutputLevel: (level: number) => void
  setFilterCutoff: (cutoff: number) => void
  setDetuneAmount: (detune: number) => void
  activateNote: (note: NoteKey) => void
  deactivateNote: (note: NoteKey) => void
  deactivateAll: () => void
  cleanup: () => void
}

function rampGainNode(gainNode: GainNode, target: number, now: number, duration: number) {
  gainNode.gain.cancelScheduledValues(now)
  gainNode.gain.setValueAtTime(gainNode.gain.value, now)
  gainNode.gain.linearRampToValueAtTime(target, now + duration)
}

export function useScrollChordAudio(): UseScrollChordAudioResult {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null)
  const [oscillatorType, setOscillatorTypeState] = useState<OscillatorType>("sawtooth")
  const [outputLevel, setOutputLevelState] = useState(DEFAULT_OUTPUT_LEVEL)
  const [filterCutoff, setFilterCutoffState] = useState(DEFAULT_FILTER_CUTOFF)
  const [detuneAmount, setDetuneAmountState] = useState(DEFAULT_DETUNE)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const filterRef = useRef<BiquadFilterNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const displayGainRef = useRef<GainNode | null>(null)
  const noteNodesRef = useRef<Partial<Record<NoteKey, NoteNode>>>({})
  const activeNotesRef = useRef<Set<NoteKey>>(new Set())
  const isEnabledRef = useRef(false)
  const isMutedRef = useRef(false)
  const outputLevelRef = useRef(DEFAULT_OUTPUT_LEVEL)
  const filterCutoffRef = useRef(DEFAULT_FILTER_CUTOFF)
  const detuneAmountRef = useRef(DEFAULT_DETUNE)

  const syncMasterGain = useCallback(() => {
    const audioCtx = audioCtxRef.current
    const masterGain = masterGainRef.current
    if (!audioCtx || !masterGain) return

    const activeCount = activeNotesRef.current.size
    const target = isMutedRef.current ? 0 : outputLevelRef.current * activeCount
    const now = audioCtx.currentTime

    masterGain.gain.cancelScheduledValues(now)
    masterGain.gain.setValueAtTime(masterGain.gain.value, now)
    masterGain.gain.linearRampToValueAtTime(target, now + FADE_OUT_TIME)
  }, [])

  const activateAudio = useCallback(() => {
    if (typeof window === "undefined") return

    const currentCtx = audioCtxRef.current
    if (isEnabledRef.current && currentCtx) {
      if (currentCtx.state === "suspended") {
        void currentCtx.resume().catch(() => undefined)
      }
      return
    }

    const AudioContextCtor = window.AudioContext ?? (window as WindowWithWebkitAudioContext).webkitAudioContext
    if (!AudioContextCtor) return

    const audioCtx = new AudioContextCtor()
    const masterGain = audioCtx.createGain()
    const filter = audioCtx.createBiquadFilter()
    const analyser = audioCtx.createAnalyser()

    analyser.fftSize = 512
    analyser.smoothingTimeConstant = 0

    const displayGain = audioCtx.createGain()
    displayGain.gain.value = 12

    filter.type = "lowpass"
    filter.frequency.value = filterCutoffRef.current
    filter.Q.value = 0.85

    masterGain.gain.value = 0
    masterGain.connect(filter)
    filter.connect(audioCtx.destination)
    filter.connect(displayGain)
    displayGain.connect(analyser)

    audioCtxRef.current = audioCtx
    masterGainRef.current = masterGain
    filterRef.current = filter
    analyserRef.current = analyser
    displayGainRef.current = displayGain
    setAnalyserNode(analyser)

    const nodes: Partial<Record<NoteKey, NoteNode>> = {}

    NOTE_KEYS.forEach((note) => {
      const oscillator = audioCtx.createOscillator()
      const gain = audioCtx.createGain()

      oscillator.type = "sawtooth"
      oscillator.frequency.setValueAtTime(NOTE_FREQUENCIES[note], audioCtx.currentTime)
      oscillator.detune.setValueAtTime(detuneAmountRef.current, audioCtx.currentTime)
      gain.gain.value = 0

      oscillator.connect(gain)
      gain.connect(masterGain)
      oscillator.start()

      nodes[note] = { oscillator, gain }
    })

    noteNodesRef.current = nodes
    isEnabledRef.current = true
    setIsEnabled(true)

    void audioCtx.resume().catch(() => undefined)

    const now = audioCtx.currentTime
    const noteCount = activeNotesRef.current.size
    const activeFadeTime = noteCount > 0 ? ACTIVATION_FADE_TIME : FADE_IN_TIME

    activeNotesRef.current.forEach((note) => {
      const node = noteNodesRef.current[note]
      if (!node) return
      node.gain.gain.cancelScheduledValues(now)
      node.gain.gain.setValueAtTime(0, now)
      node.gain.gain.linearRampToValueAtTime(outputLevelRef.current, now + activeFadeTime)
    })

    const masterTarget = isMutedRef.current ? 0 : outputLevelRef.current * noteCount
    masterGain.gain.cancelScheduledValues(now)
    masterGain.gain.setValueAtTime(0, now)
    masterGain.gain.linearRampToValueAtTime(masterTarget, now + activeFadeTime)
  }, [])

  const toggleMute = useCallback(() => {
    if (!isEnabledRef.current) return

    isMutedRef.current = !isMutedRef.current
    setIsMuted(isMutedRef.current)
    syncMasterGain()
  }, [syncMasterGain])

  const setWaveType = useCallback((type: OscillatorType) => {
    NOTE_KEYS.forEach((note) => {
      const node = noteNodesRef.current[note]
      if (node) node.oscillator.type = type
    })
    setOscillatorTypeState(type)
  }, [])

  const setOutputLevel = useCallback((level: number) => {
    const nextLevel = Math.min(0.22, Math.max(0.04, level))
    outputLevelRef.current = nextLevel
    setOutputLevelState(nextLevel)

    const audioCtx = audioCtxRef.current
    if (!audioCtx || !isEnabledRef.current) return

    const now = audioCtx.currentTime
    activeNotesRef.current.forEach((note) => {
      const node = noteNodesRef.current[note]
      if (!node) return
      rampGainNode(node.gain, nextLevel, now, 0.12)
    })
    syncMasterGain()
  }, [syncMasterGain])

  const setFilterCutoff = useCallback((cutoff: number) => {
    const nextCutoff = Math.min(9500, Math.max(700, cutoff))
    filterCutoffRef.current = nextCutoff
    setFilterCutoffState(nextCutoff)

    const audioCtx = audioCtxRef.current
    const filter = filterRef.current
    if (!audioCtx || !filter) return

    filter.frequency.cancelScheduledValues(audioCtx.currentTime)
    filter.frequency.setValueAtTime(filter.frequency.value, audioCtx.currentTime)
    filter.frequency.linearRampToValueAtTime(nextCutoff, audioCtx.currentTime + 0.12)
  }, [])

  const setDetuneAmount = useCallback((detune: number) => {
    const nextDetune = Math.min(24, Math.max(-24, detune))
    detuneAmountRef.current = nextDetune
    setDetuneAmountState(nextDetune)

    const audioCtx = audioCtxRef.current
    if (!audioCtx || !isEnabledRef.current) return

    NOTE_KEYS.forEach((note) => {
      const node = noteNodesRef.current[note]
      if (!node) return
      node.oscillator.detune.cancelScheduledValues(audioCtx.currentTime)
      node.oscillator.detune.setValueAtTime(node.oscillator.detune.value, audioCtx.currentTime)
      node.oscillator.detune.linearRampToValueAtTime(nextDetune, audioCtx.currentTime + 0.12)
    })
  }, [])

  const activateNote = useCallback((note: NoteKey) => {
    activeNotesRef.current.add(note)

    const audioCtx = audioCtxRef.current
    const node = noteNodesRef.current[note]
    if (!audioCtx || !node || !isEnabledRef.current) return

    rampGainNode(node.gain, outputLevelRef.current, audioCtx.currentTime, FADE_IN_TIME)
    syncMasterGain()
  }, [syncMasterGain])

  const deactivateNote = useCallback((note: NoteKey) => {
    activeNotesRef.current.delete(note)

    const audioCtx = audioCtxRef.current
    const node = noteNodesRef.current[note]
    if (!audioCtx || !node || !isEnabledRef.current) return

    rampGainNode(node.gain, 0, audioCtx.currentTime, FADE_OUT_TIME)
    syncMasterGain()
  }, [syncMasterGain])

  const deactivateAll = useCallback(() => {
    activeNotesRef.current.clear()

    const audioCtx = audioCtxRef.current
    if (!audioCtx || !isEnabledRef.current) return

    const now = audioCtx.currentTime
    NOTE_KEYS.forEach((note) => {
      const node = noteNodesRef.current[note]
      if (!node) return
      rampGainNode(node.gain, 0, now, FADE_OUT_TIME)
    })

    syncMasterGain()
  }, [syncMasterGain])

  const cleanup = useCallback(() => {
    const audioCtx = audioCtxRef.current
    const nodes = noteNodesRef.current

    NOTE_KEYS.forEach((note) => {
      const node = nodes[note]
      if (!node) return

      try {
        node.oscillator.stop()
      } catch {
      }

      node.oscillator.disconnect()
      node.gain.disconnect()
    })

    if (analyserRef.current) {
      analyserRef.current.disconnect()
      analyserRef.current = null
    }

    if (filterRef.current) {
      filterRef.current.disconnect()
      filterRef.current = null
    }

    if (displayGainRef.current) {
      displayGainRef.current.disconnect()
      displayGainRef.current = null
    }

    if (audioCtx) {
      void audioCtx.close().catch(() => undefined)
    }

    audioCtxRef.current = null
    masterGainRef.current = null
    noteNodesRef.current = {}
    activeNotesRef.current.clear()
    isEnabledRef.current = false
    isMutedRef.current = false
    setIsEnabled(false)
    setIsMuted(false)
    setAnalyserNode(null)
    setOscillatorTypeState("sawtooth")
    setOutputLevelState(outputLevelRef.current)
    setFilterCutoffState(filterCutoffRef.current)
    setDetuneAmountState(detuneAmountRef.current)
  }, [])

  return {
    isEnabled,
    isMuted,
    analyserNode,
    oscillatorType,
    outputLevel,
    filterCutoff,
    detuneAmount,
    activateAudio,
    toggleMute,
    setWaveType,
    setOutputLevel,
    setFilterCutoff,
    setDetuneAmount,
    activateNote,
    deactivateNote,
    deactivateAll,
    cleanup,
  }
}
