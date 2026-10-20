# CLAUDE.md — Agent instructions for glass-design-system

## Project overview

Glass 1.0: a frosted-glass design system for React 19+. Ships an ES module, a stylesheet, a Tailwind v4 bridge and a 0.x compatibility sheet. Every surface is one material, drawn by one class (`.glass`), tuned by five CSS custom properties: `--glass-blur`, `--glass-opacity`, `--glass-sheen`, `--glass-hue`, `--light-hue`.

Dependents: the portfolio (theted/sundbergsolutions) and Snippets (theted/snippets). Both install from GitHub and pin a commit in their lockfile.

## Commands

```sh
npm install
npm run showcase        # docs site dev server (vite.showcase.config.ts)
npm run typecheck       # tsc --noEmit over src/, showcase included
npm run build           # dist/index.js + dist/glass.css, then copies tailwind.css and compat.css
npm run build:types     # dist/*.d.ts (drops the stylesheet import from index.d.ts)
npm run build:showcase  # showcase-dist/, then scripts/check-showcase-css.mjs
```

Run `npm run build && npm run build:types` before committing; `dist/` is committed because consumers install from GitHub.

## Architecture

```
src/
├── index.ts                  ← Public API. Imports styles/index.css so the lib build emits dist/glass.css
├── utils.ts                  ← cx, PolymorphicProps, mergeRefs/useMergedRef, SpaceStep
├── styles/
│   ├── index.css             ← Entry: @imports the files below (order matters)
│   ├── tokens.css            ← @layer theme: knobs, type steps, space, layout, radius, control heights, motion;
│   │                            colours on `:root, .glass-scope` so a nested hue recomputes them
│   ├── fonts.css             ← @layer theme: @font-face for the self-hosted woff2 in fonts/ (latin + latin-ext,
│   │                            from @fontsource-variable; `?no-inline` keeps the lib build from base64-ing them)
│   ├── base.css              ← @layer base: box-sizing, body, element resets, ::selection
│   ├── material.css          ← .glass (+ --subtle/--strong/--pad-*/--radius-*/--glow/--prism/--tilt/--reveal),
│   │                            @property --glass-x/-y/-hover/-angle
│   ├── type.css              ← .glass-display, -h1…-h4, -lede, -body, -small, -caption, -label, -code, -link, -prose
│   ├── layout.css            ← .glass-scope, -container, -section, -stack, -cluster, -grid, -split, -measure, -sr-only
│   ├── controls.css          ← button, spinner, field, input/textarea/select, checkbox/radio, switch, slider,
│   │                            segmented, .glass-indicator
│   ├── display.css           ← badge, avatar, kbd, divider, nav, toast
│   ├── overlay.css           ← dialog, popover, menu
│   ├── backdrop.css          ← .glass-backdrop: palettes × motion × texture, .glass-stage
│   ├── tailwind.css          ← @theme inline reference bridge (copied to dist/, not bundled)
│   └── compat.css            ← 0.x token aliases + text-bevel (copied to dist/, not bundled)
├── components/               ← One file per component (layout.tsx holds the five layout primitives)
├── hooks/                    ← useGlassPointer, useGlassReveal, useGlassIndicator
└── showcase/                 ← The docs site (not shipped)
    ├── App.tsx               ← Routes; applies the theme knobs to :root via glassVars()
    ├── site/                 ← Header, Footer, ThemeControls, theme state, Page/Section/PropsTable, Code, Demo, registry
    ├── docs/                 ← Component page data (surfaces, forms, overlays, system), DOCS/GROUPS in index.ts
    ├── demos/<component>/    ← One file per demo; icons.tsx is shared
    ├── examples/             ← Whole screens (SignIn, Settings, …)
    └── pages/                ← Home, GetStarted, Foundations, ComponentsIndex, ComponentPage, Examples, Backdrops
```

## Key conventions

- **CSS first.** Every component is a class in `src/styles/`; React components only compose class names, wire ARIA and add behaviour. If something can be CSS (focus, hover, states via `aria-*`/`data-*`), it is CSS.
- **Layers.** Tokens in `@layer theme`, resets in `@layer base`, components in `@layer components`. tokens.css declares `@layer theme, base, components, utilities;` first. Never write unlayered rules in the library.
- **Colour:** OKLCH, derived from `--glass-hue` (cool) and `--light-hue` (warm). Use tokens; when a component needs a one-off alpha, write `oklch(… var(--glass-hue) / a)`. Colour tokens live on `:root, .glass-scope`; a token that depends on a hue must go there too.
- **Cool glass, warm light:** only things that catch the light are warm: rims, focus rings, the primary button, switched-on controls, the slider fill. Never amber as decoration.
- **The material:** `.glass` draws the rim (`::before`, on the 1px edge, z-index 1) and the sheen (`::after`, z-index −1 in the isolated pane). Consumers can't use `::before`/`::after` on a `.glass` element. Pointer state is written by `useGlassPointer` straight to the element; `--glass-hover` comes from CSS `:hover`. Never React state on pointer move.
- **Intensity tiers:** `subtle` (regions, rows), `medium` (cards; default), `strong` (dialogs, popovers, focused forms). Never a thinner pane on a thicker one.
- **Fixed inside glass:** `backdrop-filter` makes a containing block, so `position: fixed` inside a pane is pinned to the pane. Toasts portal to `document.body`; dialogs and popovers use the top layer.
- **Polymorphic components** (`GlassPanel`, `GlassButton`, `GlassMenuItem`, layout) take `as` and use `PolymorphicProps<E, Own>` so the rendered element's props stay typed. `ref` is a plain prop (React 19).
- **Events:** native controls (input, textarea, select, checkbox, radio) keep native `onChange`; custom controls (switch, slider, segmented) call `onChange(value)`.
- **Spacing:** only `--space-1 2 3 4 6 8 12 16 24 32`, plus fluid `--space-gutter/section/panel/grid`. Layout components accept only `SpaceStep`. Big gaps hold small ones.
- **Radius:** `--radius-chip/field/card/panel/sheet/round`; nested corners concentric (inner = outer − padding).
- **Controls share heights:** `--control-xs/sm/md/lg` for buttons, inputs, selects, segmented.
- **Motion:** `--ease-glass`, `--ease-spring`, `--ease-in-glass`; durations `--dur-1…4`. Motion answers a user action; `reveal` and backdrop motion are opt-in/ambient. Respect `prefers-reduced-motion`.
- **Gradient sizes:** Chrome drops a `radial-gradient` whose size mixes lengths and percentages. Use one unit.
- **Type:** the fluid `--step--2 … --step-7` scale, nothing under 12px, sentence case, no tracked all-caps.
- **Writing:** comments and docs say what something does for the person using it, in plain sentences.

## Showcase conventions

- Every demo and example is a real file whose source is shown with `?raw` (see `site/registry.ts`). Demos import only from `'glass-design-system'` and `../icons` (or `../demos/icons`), use only library classes plus inline styles, and export a default component. Keep them copy-pasteable.
- Add a component page by adding an entry to a file in `docs/` (slug, intro, demos, props, css, guidelines). Pages and the index are generated from `DOCS`.
- Site CSS lives in `showcase.css` and uses only tokens. `showcase.css` imports `../styles/index.css` like a consumer would; `build:showcase` checks the bundle for library selectors.
- Browser checks: headless Chromium (`/opt/pw-browsers/chromium`) via Playwright renders the site; full-page screenshots break the fixed backdrop, so scroll and stitch instead.

## Guidelines for changes

- New component: CSS in the matching `styles/*.css` file, component in `components/`, export (and its types) from `src/index.ts`, a docs entry and at least one demo.
- Keep `README.md` and `MIGRATION.md` in step with the API.
- Keep `dist/` committed and rebuilt.
