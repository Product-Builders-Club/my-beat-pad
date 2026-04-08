"use client"

import { PAD_COUNT } from "@/lib/constants"
import { FilledPad } from "./filled-pad"
import { EmptyPad } from "./empty-pad"

export type PadState = {
  filename: string
  colorIndex: number
  audioBuffer: AudioBuffer | null
  waveformHeights: number[]
}

type PadGridProps = {
  pads: (PadState | null)[]
  onAddSound: (padIndex: number, file: File) => void
  onPlaySound: (padIndex: number) => void
}

export function PadGrid({ pads, onAddSound, onPlaySound }: PadGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 px-6 pt-8 pb-8">
      {Array.from({ length: PAD_COUNT }, (_, i) => {
        const pad = pads[i]
        if (pad) {
          return (
            <FilledPad
              key={i}
              padIndex={i}
              filename={pad.filename}
              colorIndex={pad.colorIndex}
              waveformHeights={pad.waveformHeights}
              onPlay={() => onPlaySound(i)}
            />
          )
        }
        return (
          <EmptyPad key={i} onFileSelected={(file) => onAddSound(i, file)} />
        )
      })}
    </div>
  )
}
