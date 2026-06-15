"use client"

import { useCallback, useRef, useState } from "react"

export type NoteKey = "F3" | "A3" | "C4" | "E4" | "B4"

export const NOTE_FREQUENCIES: Record<NoteKey, number> = {
  F3: 174.61,
  A3: 220.00,
  C4: 261.63,
  E4: 329.63,
  B4: 493.88,
}

export const NOTE_KEYS: NoteKey[] = ["F3", "A3", "C4", "E4", "B4"]

const NOTE_MAX_GAIN = 0.05
const FADE_IN_TIME = 0.2
const FADE_OUT_TIME = 0.3

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
  activateAudio: () => void
  toggleMute: () => void
  setWaveType: (type: OscillatorType) => void
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

  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const displayGainRef = useRef<GainNode | null>(null)
  const noteNodesRef = useRef<Partial<Record<NoteKey, NoteNode>>>({})
  const activeNotesRef = useRef<Set<NoteKey>>(new Set())
  const isEnabledRef = useRef(false)
  const isMutedRef = useRef(false)

  const syncMasterGain = useCallback(() => {
    const audioCtx = audioCtxRef.current
    const masterGain = masterGainRef.current
    if (!audioCtx || !masterGain) return

    const activeCount = activeNotesRef.current.size
    const target = isMutedRef.current ? 0 : NOTE_MAX_GAIN * activeCount
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
    const analyser = audioCtx.createAnalyser()

    analyser.fftSize = 512
    analyser.smoothingTimeConstant = 0

    const displayGain = audioCtx.createGain()
    displayGain.gain.value = 12

    masterGain.gain.value = 0
    masterGain.connect(audioCtx.destination)
    masterGain.connect(displayGain)
    displayGain.connect(analyser)

    audioCtxRef.current = audioCtx
    masterGainRef.current = masterGain
    analyserRef.current = analyser
    displayGainRef.current = displayGain
    setAnalyserNode(analyser)

    const nodes: Partial<Record<NoteKey, NoteNode>> = {}

    NOTE_KEYS.forEach((note) => {
      const oscillator = audioCtx.createOscillator()
      const gain = audioCtx.createGain()

      oscillator.type = "sawtooth"
      oscillator.frequency.setValueAtTime(NOTE_FREQUENCIES[note], audioCtx.currentTime)
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
    activeNotesRef.current.forEach((note) => {
      const node = noteNodesRef.current[note]
      if (!node) return
      node.gain.gain.cancelScheduledValues(now)
      node.gain.gain.setValueAtTime(0, now)
      node.gain.gain.linearRampToValueAtTime(NOTE_MAX_GAIN, now + FADE_IN_TIME)
    })

    syncMasterGain()
  }, [syncMasterGain])

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

  const activateNote = useCallback((note: NoteKey) => {
    activeNotesRef.current.add(note)

    const audioCtx = audioCtxRef.current
    const node = noteNodesRef.current[note]
    if (!audioCtx || !node || !isEnabledRef.current) return

    rampGainNode(node.gain, NOTE_MAX_GAIN, audioCtx.currentTime, FADE_IN_TIME)
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
  }, [])

  return {
    isEnabled,
    isMuted,
    analyserNode,
    oscillatorType,
    activateAudio,
    toggleMute,
    setWaveType,
    activateNote,
    deactivateNote,
    deactivateAll,
    cleanup,
  }
}
