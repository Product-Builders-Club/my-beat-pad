"use client"

import { PAD_COLORS } from "@/lib/constants"
import { WaveformBars } from "./waveform-bars"

type FilledPadProps = {
  padIndex: number
  filename: string
  colorIndex: number
  waveformHeights: number[]
  onPlay: () => void
}

export function FilledPad({
  padIndex,
  filename,
  colorIndex,
  waveformHeights,
  onPlay,
}: FilledPadProps) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="flex h-[130px] cursor-pointer flex-col items-center justify-center gap-2.5 rounded-[20px] p-4 transition-transform active:scale-[0.97]"
      style={{ backgroundColor: PAD_COLORS[colorIndex % PAD_COLORS.length] }}
    >
      <span className="text-[10px] font-bold uppercase leading-3 tracking-[1px] text-bp-pad-label">
        Pad {padIndex + 1}
      </span>
      <span className="max-w-full truncate text-[15px] font-bold leading-[18px] tracking-[-0.2px] text-white">
        {filename}
      </span>
      <WaveformBars heights={waveformHeights} />
    </button>
  )
}
