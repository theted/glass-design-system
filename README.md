# Glass

**Cool glass, warm light.** A frosted-glass design system for React 19 where every surface is one material, lit from the upper right, and five CSS variables tune all of it.

Live docs, with every component, example and its source: **[glass.sundbergsolutions.se](https://glass.sundbergsolutions.se)**

- **One material, one class.** `class="glass"` draws the tint, the rim that catches the light and the sheen that follows the pointer. The React components are thin, typed wrappers around classes like it, so the whole system also works in plain HTML.
- **Five knobs.** `--glass-blur`, `--glass-opacity`, `--glass-sheen`, `--glass-hue` and `--light-hue` are CSS custom properties. Set them on `:root`, on a sidebar, or with `<GlassProvider>`; every pane follows.
- **Cool glass, warm light.** The glass, the ground and every neutral share one hue. The light is the only warm colour: rims, focus, the primary action, anything switched on.
- **No re-renders on mousemove.** The pointer light lives in registered CSS properties written straight onto the element. The browser interpolates them; React stays idle.
- **Built on the platform.** Dialogs are `<dialog>`, popovers use the `popover` attribute, form controls are the native elements. Focus, Escape, the top layer and form libraries just work.
- **Tokens all the way down.** OKLCH colour, a fluid type scale, a ten-step spacing scale, radius, elevation and motion tokens, plus a Tailwind v4 bridge that turns them into utilities.

## Install

```sh
npm install github:theted/glass-design-system
```

The build is committed to `dist/`, so there's nothing to configure.

## Set up

```tsx
// main.tsx: the stylesheet once, before your own CSS
import 'glass-design-system/styles';

// App.tsx
import { GlassBackdrop, GlassButton, GlassPanel } from 'glass-design-system';

export const App = () => (
  <>
    <GlassBackdrop fixed texture="grain" />
    <GlassPanel intensity="strong" glow>
      <h1 className="glass-h2">Hello, glass</h1>
      <GlassButton variant="primary">Get started</GlassButton>
    </GlassPanel>
  </>
);
```

Glass needs light behind it: backdrop blur on a flat colour is just grey. `GlassBackdrop fixed` covers the viewport once and sits behind everything.

The stylesheet brings the fonts (Bricolage Grotesque, Schibsted Grotesk, JetBrains Mono), the tokens in `@layer theme`, a few element defaults in `@layer base`, and every component in `@layer components`. Anything you write, Tailwind utilities included, overrides them without a specificity fight.

The fonts ship inside the package as woff2 files in `dist/fonts/`. Your bundler copies them next to your own assets, so they load from your origin and nothing waits on a font service before the first paint. A page downloads only the files it uses, usually the latin cuts of the display and body faces (about 125 kB together). To use other fonts, set `--font-display`, `--font-body` or `--font-code`; a family you replace is never downloaded.

## Components

| | |
|---|---|
| **Surfaces** | `GlassPanel` (the material, any element via `as`), `GlassBackdrop` (nine palettes) |
| **Actions** | `GlassButton` (primary, secondary, ghost, danger; four sizes; toggle, loading, icon) |
| **Forms** | `GlassField` (label, hint, error, wired up), `GlassInput` (with leading/trailing), `GlassTextarea`, `GlassSelect`, `GlassCheckbox`, `GlassRadio`, `GlassSwitch`, `GlassSlider`, `GlassSegmented` |
| **Navigation** | `GlassNav` (a pane glides to the link with `aria-current`) |
| **Overlays** | `GlassDialog`, `GlassPopover`, `GlassMenu`, `GlassMenuItem`, `GlassToast` |
| **Display** | `GlassBadge`, `GlassKbd`, `GlassAvatar`, `GlassDivider` |
| **Layout** | `GlassContainer`, `GlassStack`, `GlassCluster`, `GlassGrid`, `GlassSplit` (gaps take only steps on the scale) |
| **Hooks** | `useGlassPointer`, `useGlassIndicator`, `useGlassReveal`, `useGlass` |

Polymorphic components keep the props of whatever they render as, typed:

```tsx
<GlassPanel as="form" onSubmit={save} intensity="strong">…</GlassPanel>
<GlassButton as={Link} to="/docs" variant="ghost">Docs</GlassButton>
<GlassPanel as={GlassCluster} gap={3} intensity="subtle">…</GlassPanel>
```

Every component has a page with live demos, props and its plain-CSS form at [glass.sundbergsolutions.se/components](https://glass.sundbergsolutions.se/components).

## A form, start to finish

```tsx
import { useState } from 'react';
import {
  GlassButton, GlassCluster, GlassField, GlassInput,
  GlassPanel, GlassStack, GlassTextarea, GlassToast,
} from 'glass-design-system';

export const Contact = () => {
  const [sent, setSent] = useState(false);

  return (
    <>
      <GlassPanel as="form" intensity="strong" padding="lg"
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <GlassStack gap={6}>
          <GlassField label="Email" hint="Only used to reply.">
            <GlassInput type="email" autoComplete="email" required />
          </GlassField>
          <GlassField label="Message">
            <GlassTextarea rows={5} required />
          </GlassField>
          <GlassCluster justify="end">
            <GlassButton type="submit" variant="primary">Send message</GlassButton>
          </GlassCluster>
        </GlassStack>
      </GlassPanel>
      <GlassToast open={sent} onClose={() => setSent(false)}>Message sent.</GlassToast>
    </>
  );
};
```

`GlassField` gives the control its id, `aria-describedby` and `aria-invalid`. Native controls keep native events (`onChange={(e) => …}`), so form libraries work unchanged; custom controls (`GlassSwitch`, `GlassSlider`, `GlassSegmented`) hand you the value.

## Theming

```css
:root {
  --glass-blur: 40px;     /* how frosted */
  --glass-opacity: 0.66;  /* tint density, 0 clear → 1 smoked */
  --glass-sheen: 0.22;    /* the light under the pointer */
  --glass-hue: 262;       /* the glass, the ground, every neutral (cobalt) */
  --light-hue: 76;        /* the light: rims, focus, the primary action (amber) */
}

.sidebar { --glass-opacity: 0.9; }
```

From React, a provider retunes its subtree (it renders a `display: contents` wrapper carrying the variables):

```tsx
<GlassProvider hue={160} lightHue={92} blur={24}>
  <Sidebar />
</GlassProvider>
```

`glassVars({ hue: 200 })` returns the same variables as an object, for `style` or `setProperty`.

## Tailwind v4

```css
@import 'glass-design-system/styles';
@import 'tailwindcss';
@import 'glass-design-system/tailwind';
```

The bridge registers the tokens with `@theme inline reference`, so utilities read the live variables and follow the knobs: `text-muted`, `text-subtle`, `bg-well`, `border-line`, `text-light`, `font-display`, `text-step-2`, `p-panel`, `px-gutter`, `max-w-measure`, `rounded-card`, `shadow-2`, `ease-spring`, and the rest.

## Without React

Every component is a class first:

```html
<link rel="stylesheet" href="node_modules/glass-design-system/dist/glass.css" />

<article class="glass glass--strong glass--pad-lg glass--glow">
  <h1 class="glass-h2">Plain HTML</h1>
  <p class="glass-body">The material, the type and the controls are all classes.</p>
  <button class="glass-button glass-button--primary">It works</button>
</article>
```

Hover lights the rim in pure CSS; `useGlassPointer` (built into `GlassPanel`) makes the light follow the pointer.

## Foundations

- **Colour:** OKLCH throughout. Ground, three text steps (`--color-text`, `-muted`, `-subtle`), hairlines and fills, recessed wells, the light (`--color-light`, `-bright`, `-soft`, `--color-on-light`) and four status colours. All derived from the two hues.
- **Type:** a fluid scale `--step--2` (12px) to `--step-7` (57 → 107px); one class per role: `.glass-display`, `.glass-h1` … `.glass-h4`, `.glass-lede`, `.glass-body`, `.glass-small`, `.glass-caption`, `.glass-label`, `.glass-code`, `.glass-link`, `.glass-prose`.
- **Space:** `--space-1 2 3 4 6 8 12 16 24 32` on a 4px grid, named like Tailwind's steps, plus fluid `--space-gutter`, `--space-section`, `--space-panel`, `--space-grid`.
- **Shape:** `--radius-chip` 8, `-field` 12, `-card` 20, `-panel` 28, `-sheet` 36, `-round`. Control heights `--control-xs/sm/md/lg` (28/34/40/48px) shared by buttons, fields and selects.
- **Depth:** three intensities of glass with `--elevation-1` … `-3`.
- **Motion:** `--ease-glass`, `--ease-spring`, `--ease-in-glass` and `--dur-1` … `-4` (140 → 1120ms). Reduced motion collapses them; reduced transparency makes glass solid; more contrast makes it denser.

## Upgrading from 0.x

1.0 is a clean break: one CSS-first material instead of seven layered divs, nine backdrop palettes instead of 39 presets, and a dozen new components. The main renames are `GlassPill` → `GlassButton` (accent → primary), `GlassPanel`'s `topGlow`/`spectrum`/`rounded` → `glow`/`prism`/`radius`, and `getGlassStyles()` → `class="glass"`. **[MIGRATION.md](./MIGRATION.md)** lists every change with before-and-after code.

## Develop

```sh
npm install
npm run showcase        # the docs site, with hot reload
npm run typecheck
npm run build           # dist/index.js, dist/glass.css, dist/tailwind.css
npm run build:types     # dist/*.d.ts
npm run build:showcase  # showcase-dist/, checked for missing library CSS
```

Commit `dist/` with your changes: consumers install straight from GitHub.
