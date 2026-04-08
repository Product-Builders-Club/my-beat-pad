"use client"

import { useRef } from "react"
import { ACCEPTED_AUDIO_TYPES } from "@/lib/constants"

type EmptyPadProps = {
  onFileSelected: (file: File) => void
}

export function EmptyPad({ onFileSelected }: EmptyPadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex h-[130px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[20px] border-[2.5px] border-dashed border-bp-pad-empty-border bg-bp-pad-empty transition-transform active:scale-[0.97]"
      >
        <div className="flex size-9 items-center justify-center rounded-full bg-bp-pad-accent/10">
          <span className="text-[22px] leading-7 font-medium text-bp-pad-accent">
            +
          </span>
        </div>
        <span className="text-[11px] font-semibold leading-[14px] text-bp-subtitle">
          Add sound
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_AUDIO_TYPES}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            onFileSelected(file)
            e.target.value = ""
          }
        }}
      />
    </>
  )
}
