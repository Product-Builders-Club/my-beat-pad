type WaveformBarsProps = {
  heights: number[]
}

export function WaveformBars({ heights }: WaveformBarsProps) {
  return (
    <div className="flex items-end h-[18px] gap-[2px] shrink-0">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[2px] rounded-[1px] bg-bp-pad-waveform shrink-0"
          style={{ height: h }}
        />
      ))}
    </div>
  )
}
