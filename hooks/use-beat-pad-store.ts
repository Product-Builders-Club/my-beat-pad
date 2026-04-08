"use client"

import { useState, useEffect, useCallback } from "react"
import { useAudioEngine } from "./use-audio-engine"
import { getAllPads, savePad } from "@/lib/indexed-db"
import { PAD_COUNT, PAD_COLORS, generateWaveformHeights } from "@/lib/constants"
import type { PadState } from "@/components/beat-pad/pad-grid"

export function useBeatPadStore() {
  const [pads, setPads] = useState<(PadState | null)[]>(
    () => Array(PAD_COUNT).fill(null) as (PadState | null)[]
  )
  const [nextColorIndex, setNextColorIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { decodeAudioFile, decodeAudioBlob, playBuffer } = useAudioEngine()

  // Hydrate from IndexedDB on mount
  useEffect(() => {
    async function hydrate() {
      try {
        const records = await getAllPads()
        const hydrated: (PadState | null)[] = Array(PAD_COUNT).fill(null)
        let maxColorIndex = 0

        await Promise.all(
          records.map(async (record) => {
            const audioBuffer = await decodeAudioBlob(record.audioBlob)
            hydrated[record.padIndex] = {
              filename: record.filename,
              colorIndex: record.colorIndex,
              audioBuffer,
              waveformHeights: record.waveformHeights,
            }
            if (record.colorIndex >= maxColorIndex) {
              maxColorIndex = record.colorIndex + 1
            }
          })
        )

        setPads(hydrated)
        setNextColorIndex(maxColorIndex)
      } catch {
        // IndexedDB unavailable — start with empty pads
      } finally {
        setIsLoading(false)
      }
    }

    hydrate()
  }, [decodeAudioBlob])

  const addSound = useCallback(
    async (padIndex: number, file: File) => {
      const audioBuffer = await decodeAudioFile(file)
      const colorIndex = nextColorIndex % PAD_COLORS.length
      const waveformHeights = generateWaveformHeights()

      await savePad({
        padIndex,
        filename: file.name,
        mimeType: file.type,
        audioBlob: file,
        colorIndex,
        waveformHeights,
      })

      setPads((prev) => {
        const next = [...prev]
        next[padIndex] = {
          filename: file.name,
          colorIndex,
          audioBuffer,
          waveformHeights,
        }
        return next
      })
      setNextColorIndex((prev) => prev + 1)
    },
    [nextColorIndex, decodeAudioFile]
  )

  const playSound = useCallback(
    (padIndex: number) => {
      const pad = pads[padIndex]
      if (pad?.audioBuffer) {
        playBuffer(padIndex, pad.audioBuffer)
      }
    },
    [pads, playBuffer]
  )

  return { pads, isLoading, addSound, playSound }
}
