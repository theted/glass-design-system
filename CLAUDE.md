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
├── glass.css                ← Tokens: colour (OKLCH), rim, motion, space, layout, radius, type steps, elevation; fonts; text-bevel utilities
├── material.css             ← Component styles: surface layers, pill, field, switch, slider, segmented, divider, toast
├── foundations.css          ← Optional layout (.glass-container/-section/-stack/-cluster/-grid) and type (.glass-h1 …) classes
├── orbs.css                 ← GlassOrbs animation keyframes (all presets)
├── backgrounds.ts           ← Background gradient presets (BG_PRESETS)
├── patterns.ts              ← SVG pattern overlays (PATTERNS)
├── context/
│   └── GlassContext.tsx     ← GlassProvider + useGlass() hook
├── hooks/
│   └── useGlassPointer.ts   ← useGlassPointer (light follows pointer) + useGlassReveal
├── components/
│   ├── GlassPanel.tsx       ← Primary surface (rim light, tilt, reveal, pointer light, padding prop)
│   ├── GlassPill.tsx        ← Button/link (sizes: xs/sm/md/lg, variants: default/active/accent/ghost)
│   ├── GlassInput.tsx       ← Input + Textarea + InputWrap
│   ├── GlassDivider.tsx     ← Fade-to-transparent horizontal rule
│   ├── GlassToast.tsx       ← Spring-up status toast
│   ├── GlassSwitch.tsx      ← On/off toggle (button role=switch)
│   ├── GlassSlider.tsx      ← Styled native range input
│   ├── GlassSegmented.tsx   ← Radio group with a springing glass indicator
│   └── GlassOrbs.tsx        ← Animated background orbs (12 presets)
└── showcase/                ← Interactive documentation app (not shipped in dist/)
    ├── App.tsx              ← Routes, site shell, GlassProvider fed by the theme knobs
    ├── context/             ← BackgroundContext: backdrop, pattern and the global glass knobs
    ├── components/          ← SiteHeader (nav + Theme popover), SiteFooter, ThemePanel, Page (PageHeader/Section/CodeBlock)
    └── pages/               ← One page per section (Home, Foundations, Examples, …); page CSS sits next to its page
```

## Key conventions

- **Color space:** OKLCH everywhere (perceptually uniform, hue-based)
- **Cool glass, warm light:** glass bodies are cool cobalt; only things that catch the light (rims, specular, focus, the primary action) use the warm `--color-light` amber. Don't use amber as decoration.
- **Material CSS:** component styles live in `src/material.css` inside `@layer components` so consumer Tailwind utilities override them. Pointer-driven light uses registered custom properties written by `useGlassPointer` — never React state on mousemove.
- **Motion:** use `--ease-glass` / `--ease-spring` / `--ease-in-glass` and `--dur-1..4`; don't invent new curves. Motion should answer a user action; `reveal` is opt-in.
- **Fonts:** Bricolage Grotesque (display), Schibsted Grotesk (body), JetBrains Mono (code) — via CSS custom properties `--font-display`, `--font-body`, `--font-code`
- **Styling:** Tailwind CSS v4 utilities + inline styles for computed glass values
- **Spacing:** only the scale steps `--space-1 2 3 4 6 8 12 16 24 32` (same numbers as Tailwind's `p-*`/`gap-*`), plus fluid `--space-gutter/section/panel/grid` for page structure. Big gaps hold small ones. No off-scale values like `gap-5` or `mt-7`.
- **Radius:** `--radius-chip/field/card/panel/sheet`; nested corners concentric (inner = outer − padding).
- **Panel internals are plain CSS:** GlassPanel must not rely on Tailwind classes (consumers may not scan this package). Decorative layers sit at `z-index: -1` inside the isolated surface, so content needs no `relative z-10` wrapper.
- **Gradient sizes:** Chrome rejects mixed length + percentage sizes in `radial-gradient` (`max(40rem, 160%)`, `calc(20rem + 100%)`): the whole background silently computes to `none`. Use one unit.
- **Intensity tiers:** `subtle` (background), `medium` (cards), `strong` (modals) — never invert depth order
- **Typography sizing:** the fluid `--step--2 … --step-7` scale (each step is one clamp()); no global font-size multiplier. Nothing smaller than 12px (`--step--2`). Sentence case, no tracked all-caps labels.
- **Text legibility:** Use `text-bevel` / `text-bevel-strong` utilities on light text over glass

## GlassOrbs presets

12 animation presets: `drift`, `pulse`, `aurora`, `float`, `breathe`, `lava`, `orbit`, `silk`, `tide`, `nebula`, `ember`, `kiln` (the house look). All use GPU-composited transforms + opacity only. Softness from radial-gradient falloff (no filter:blur). Respects `prefers-reduced-motion`.

Props: `preset`, `speed` (seconds), `opacity` (0-1), `fixed` (boolean), `blendMode` ('screen' | 'normal' | 'soft-light' | 'overlay' | 'hard-light' | 'color-dodge').

## Guidelines for changes

- Components export from `src/index.ts` — add new exports there
- CSS animations go in `src/orbs.css`, tokens in `src/glass.css`
- Showcase pages live in `src/showcase/pages/` and route from `src/showcase/App.tsx`; add new pages to `PRIMARY_NAV`/`MORE_NAV` in `SiteHeader.tsx`. Use `PageHeader` + `Section` from `components/Page.tsx`.
- Showcase CSS resets go in `@layer base` (unlayered resets override the library's `@layer components`).
- Browser checks: the Claude-in-Chrome tab can stop producing frames on pages without running animation (screenshots time out); headless Chromium over CDP renders them fine.
- Run `npm run build && npm run build:types` before committing to update `dist/`
- The `@utility` warnings from lightningcss during build are expected (Tailwind v4 syntax)
- Keep `dist/` committed — consumers install directly from GitHub
