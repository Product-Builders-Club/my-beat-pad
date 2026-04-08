"use client"

import { useEffect } from "react"
import { useBeatPadStore } from "@/hooks/use-beat-pad-store"
import { PAD_KEY_MAP } from "@/lib/constants"
import { Header } from "./header"
import { PadGrid } from "./pad-grid"

export function BeatPadPage() {
  const { pads, isLoading, addSound, playSound } = useBeatPadStore()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return

      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return
      }

      const padIndex = PAD_KEY_MAP[event.key.toLowerCase()]
      if (padIndex !== undefined) {
        playSound(padIndex)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [playSound])

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
