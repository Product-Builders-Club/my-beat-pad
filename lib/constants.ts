export const PAD_COUNT = 8

export const ACCEPTED_AUDIO_TYPES = ".wav,.mp3"

export const WAVEFORM_BAR_COUNT = 10
export const WAVEFORM_MIN_HEIGHT = 3
export const WAVEFORM_MAX_HEIGHT = 18

export function generateWaveformHeights(): number[] {
  return Array.from({ length: WAVEFORM_BAR_COUNT }, () =>
    Math.floor(
      Math.random() * (WAVEFORM_MAX_HEIGHT - WAVEFORM_MIN_HEIGHT + 1) +
        WAVEFORM_MIN_HEIGHT
    )
  )
}

export const PAD_COLORS = [
  "var(--bp-pad-1)",
  "var(--bp-pad-2)",
  "var(--bp-pad-3)",
  "var(--bp-pad-4)",
  "var(--bp-pad-5)",
  "var(--bp-pad-6)",
  "var(--bp-pad-7)",
  "var(--bp-pad-8)",
] as const
