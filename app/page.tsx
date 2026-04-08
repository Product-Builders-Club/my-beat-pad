import Link from "next/link"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 bg-bp-bg">
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-[13px]/4 font-normal tracking-[1px] uppercase text-bp-subtitle">
          Welcome to
        </p>
        <h1 className="font-heading text-[42px]/12 tracking-[-0.5px] text-bp-title">
          my beat pad
        </h1>
      </div>
      <p className="max-w-65 text-center text-[15px]/5.5 text-bp-subtitle">
        Tap, loop, and layer beats with a retro-inspired drum machine.
      </p>
      <Link
        href="/beat-pad"
        className="rounded-[20px] bg-bp-pad-1 px-12 py-4 text-base/5 font-semibold tracking-[0.5px] uppercase text-white"
      >
        Start Jamming
      </Link>
    </div>
  )
}
