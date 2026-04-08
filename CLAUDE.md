# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `pnpm dev` (uses Turbopack)
- **Build:** `pnpm build`
- **Lint:** `pnpm lint`
- **Type check:** `pnpm typecheck`
- **Format:** `pnpm format`
- **Add shadcn component:** `npx shadcn@latest add <component>`

## Architecture

Next.js 16 App Router project with React 19, Tailwind CSS v4, and shadcn/ui (base-nova style, using Base UI primitives).

- `app/` — App Router pages and layouts. Single root layout wraps all pages in `ThemeProvider` (next-themes, class-based dark mode toggled via `d` key).
- `app/beat-pad/` — Beat pad route (`/beat-pad`). Client-heavy page using Web Audio API and IndexedDB.
- `components/ui/` — shadcn/ui components. Added via `npx shadcn@latest add`.
- `components/beat-pad/` — Beat pad feature components. `BeatPadPage` is the client orchestrator; visual components are `Header`, `PadGrid`, `FilledPad`, `EmptyPad`, `WaveformBars`.
- `components/` — App-level shared components.
- `hooks/use-audio-engine.ts` — Web Audio API wrapper: lazy `AudioContext`, decode audio, play/re-trigger per pad.
- `hooks/use-beat-pad-store.ts` — Pad state management with IndexedDB persistence.
- `lib/indexed-db.ts` — IndexedDB CRUD for storing audio blobs and pad metadata.
- `lib/constants.ts` — Beat pad constants: color palette CSS vars, pad count, waveform generation.
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge).

## Style & Conventions

- Path alias: `@/*` maps to project root.
- Prettier: no semicolons, double quotes, 2-space indent, trailing commas (es5). Tailwind class sorting enabled via `prettier-plugin-tailwindcss` using `cn` and `cva` functions.
- Tailwind v4: configured via CSS (`app/globals.css` with `@theme inline`), not `tailwind.config`. Design tokens are CSS custom properties using oklch colors.
- Fonts: Young Serif (heading, `--font-heading`) and DM Sans (sans, `--font-sans`), loaded via `next/font/google`.
- Beat pad colors: defined as `--bp-*` CSS custom properties in `globals.css`, mapped to Tailwind via `@theme inline` (e.g., `bg-bp-bg`, `text-bp-title`, `bg-bp-pad-1`). No hardcoded hex values in components.
