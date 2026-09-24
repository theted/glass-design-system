# CLAUDE.md — Agent instructions for glass-design-system

## Project overview

A frosted-glass UI component library for React 19+. Ships as an ES module with CSS tokens. Every surface shares a single coherent material governed by two master knobs: **blur** and **opacity**.

## Commands

```sh
npm install                # Install dependencies
npm run build              # Build library (dist/index.js + dist/glass.css)
npm run build:types        # Generate TypeScript declarations
npm run showcase           # Dev server for the interactive showcase app
npm run typecheck          # Type-check (note: will show errors for missing react types as peer dep)
```

Build uses Vite 8. The showcase uses a separate Vite config (`vite.showcase.config.ts`).

## Architecture

```
src/
├── index.ts                 ← Public API (re-exports everything)
├── glass.ts                 ← Style computation engine (getGlassStyles)
├── glass.css                ← CSS tokens (OKLCH, rim, motion), font imports, text-bevel utilities
├── material.css             ← Component styles: rim/spectrum/sheen, pill, field, divider, toast
├── orbs.css                 ← GlassOrbs animation keyframes (all presets)
├── backgrounds.ts           ← Background gradient presets (BG_PRESETS)
├── patterns.ts              ← SVG pattern overlays (PATTERNS)
├── context/
│   └── GlassContext.tsx     ← GlassProvider + useGlass() hook
├── hooks/
│   └── useGlassPointer.ts   ← useGlassPointer (light follows pointer) + useGlassReveal
├── components/
│   ├── GlassPanel.tsx       ← Primary surface (rim light, tilt, reveal, pointer light)
│   ├── GlassPill.tsx        ← Button/link (sizes: xs/sm/md/lg, variants: default/active/accent)
│   ├── GlassInput.tsx       ← Input + Textarea + InputWrap
│   ├── GlassDivider.tsx     ← Fade-to-transparent horizontal rule
│   ├── GlassToast.tsx       ← Spring-up status toast
│   └── GlassOrbs.tsx        ← Animated background orbs (12 presets)
└── showcase/                ← Interactive documentation app (not shipped in dist/)
    ├── App.tsx              ← Routes, nav, background/pattern switcher
    ├── context/             ← BackgroundContext for showcase state
    ├── components/          ← BackgroundSwitcher UI
    └── pages/               ← One page per showcase section
```

## Key conventions

- **Color space:** OKLCH everywhere (perceptually uniform, hue-based)
- **Cool glass, warm light:** glass bodies are cool cobalt; only things that catch the light (rims, specular, focus, the primary action) use the warm `--color-light` amber. Don't use amber as decoration.
- **Material CSS:** component styles live in `src/material.css` inside `@layer components` so consumer Tailwind utilities override them. Pointer-driven light uses registered custom properties written by `useGlassPointer` — never React state on mousemove.
- **Motion:** use `--ease-glass` / `--ease-spring` / `--ease-in-glass` and `--dur-1..4`; don't invent new curves. Motion should answer a user action; `reveal` is opt-in.
- **Fonts:** Bricolage Grotesque (display), Schibsted Grotesk (body), JetBrains Mono (code) — via CSS custom properties `--font-display`, `--font-body`, `--font-code`
- **Styling:** Tailwind CSS v4 utilities + inline styles for computed glass values
- **Content elevation:** Always wrap content inside GlassPanel with `<div className="relative z-10">` so it sits above decorative overlays (shimmer, glows)
- **Intensity tiers:** `subtle` (background), `medium` (cards), `strong` (modals) — never invert depth order
- **Typography sizing:** Per-element `clamp(min, preferred, max)` — no global font-size multiplier
- **Text legibility:** Use `text-bevel` / `text-bevel-strong` utilities on light text over glass

## GlassOrbs presets

12 animation presets: `drift`, `pulse`, `aurora`, `float`, `breathe`, `lava`, `orbit`, `silk`, `tide`, `nebula`, `ember`, `kiln` (the house look). All use GPU-composited transforms + opacity only. Softness from radial-gradient falloff (no filter:blur). Respects `prefers-reduced-motion`.

Props: `preset`, `speed` (seconds), `opacity` (0-1), `fixed` (boolean), `blendMode` ('screen' | 'normal' | 'soft-light' | 'overlay' | 'hard-light' | 'color-dodge').

## Guidelines for changes

- Components export from `src/index.ts` — add new exports there
- CSS animations go in `src/orbs.css`, tokens in `src/glass.css`
- Showcase pages live in `src/showcase/pages/` and route from `src/showcase/App.tsx`
- Run `npm run build && npm run build:types` before committing to update `dist/`
- The `@utility` warnings from lightningcss during build are expected (Tailwind v4 syntax)
- Keep `dist/` committed — consumers install directly from GitHub
