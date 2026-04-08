"use client"

import { useRef, useCallback } from "react"

export function useAudioEngine() {
  const ctxRef = useRef<AudioContext | null>(null)
  const activeSourcesRef = useRef<Map<number, AudioBufferSourceNode>>(
    new Map()
  )

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext()
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const decodeAudioFile = useCallback(
    async (file: File): Promise<AudioBuffer> => {
      const ctx = getContext()
      const arrayBuffer = await file.arrayBuffer()
      return ctx.decodeAudioData(arrayBuffer)
    },
    [getContext]
  )

  const decodeAudioBlob = useCallback(
    async (blob: Blob): Promise<AudioBuffer> => {
      const ctx = getContext()
      const arrayBuffer = await blob.arrayBuffer()
      return ctx.decodeAudioData(arrayBuffer)
    },
    [getContext]
  )

  const playBuffer = useCallback(
    (padIndex: number, buffer: AudioBuffer) => {
      const ctx = getContext()

      const existing = activeSourcesRef.current.get(padIndex)
      if (existing) {
        try {
          existing.onended = null
          existing.stop()
          existing.disconnect()
        } catch {
          // Source may have already ended
        }
      }

      const source = ctx.createBufferSource()
      source.buffer = buffer
      source.connect(ctx.destination)
      source.onended = () => {
        activeSourcesRef.current.delete(padIndex)
      }
      source.start(0)
      activeSourcesRef.current.set(padIndex, source)
    },
    [getContext]
  )

  return { decodeAudioFile, decodeAudioBlob, playBuffer }
}
