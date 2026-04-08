"use client"

import { useBeatPadStore } from "@/hooks/use-beat-pad-store"
import { Header } from "./header"
import { PadGrid } from "./pad-grid"

export function BeatPadPage() {
  const { pads, isLoading, addSound, playSound } = useBeatPadStore()

  return (
    <div className="mx-auto flex min-h-svh max-w-[390px] flex-col bg-bp-bg font-sans">
      <Header />
      {isLoading ? null : (
        <PadGrid
          pads={pads}
          onAddSound={addSound}
          onPlaySound={playSound}
        />
      )}
    </div>
  )
}
