# glass-design-system

A frosted-glass UI component library for dark, depth-rich interfaces. Every surface — panels, inputs, buttons, dividers — shares a single coherent material governed by two master knobs: **blur** and **opacity**.

**Cool glass, warm light.** The glass body is cobalt smoke; the one light source is a low, warm sun in the upper right. Anything that catches that light turns amber: panel rims, the specular under your pointer, focus, the primary action. Everything else stays cool.

- **Rim light.** Every panel edge has a warm catch-light, a cool reflection opposite, and a faint spectral fringe where thick glass splits the light. On hover the rim turns toward the pointer.
- **No re-renders on mousemove.** Pointer state is written to registered CSS custom properties (`--glass-x`, `--glass-y`, `--glass-angle`, `--glass-hover`), so the browser interpolates the light and React stays idle.
- **Shared motion.** Three curves (`--ease-glass`, `--ease-spring`, `--ease-in-glass`) and a doubling duration scale (`--dur-1` … `--dur-4`). `prefers-reduced-motion` collapses all of them.
- **A spacing system you can count.** Ten steps on a 4px grid whose names match Tailwind's (`var(--space-6)` is `p-6`), four fluid tokens for page structure, plus radius, type-step and elevation scales. See [Foundations](#foundations).
- **Plain CSS underneath.** Components don't depend on your Tailwind scanning this package; their styles ship in `@layer components`.

---

## Installation

Install directly from GitHub:

```json
// package.json
"dependencies": {
  "glass-design-system": "github:theted/glass-design-system"
}
```

Then run:

```sh
npm install
```

Import in the app:

```ts
import { GlassProvider, GlassPanel, GlassInput } from 'glass-design-system';
import 'glass-design-system/styles'; // CSS tokens and utilities
```

No Vite alias or workspace configuration required — the package ships pre-built in `dist/`.

---

## Quick start

```tsx
import { GlassProvider, GlassPanel, GlassPill } from 'glass-design-system';
import 'glass-design-system/styles';

export default function App() {
  return (
    <GlassProvider blur={40} opacity={0.66}>
      <GlassPanel intensity="medium" padding="md">
        <h2 className="glass-h3">Hello glass</h2>
        <GlassPill size="lg" variant="accent">Get started</GlassPill>
      </GlassPanel>
    </GlassProvider>
  );
}
```

> **No content wrapper needed.** The panel's decorative layers (glows, specular, shade) sit at `z-index: -1` inside its isolated stacking context, beneath your content. Existing `relative z-10` wrappers keep working.

---

## GlassProvider

Configures all glass components beneath it. Nest providers to override a subtree.

```tsx
<GlassProvider blur={40} opacity={0.66} lightAlpha={0.22} shadowAlpha={0.20}>
  <App />
</GlassProvider>

{/* Only this subtree gets a tighter blur */}
<GlassProvider blur={20}>
  <CompactSidebar />
</GlassProvider>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `blur` | `number` | `40` | `backdrop-filter: blur(Npx)` applied to all panels |
| `opacity` | `number` | `0.66` | Global alpha multiplier for all glass surfaces (0–1) |
| `lightAlpha` | `number` | `0.22` | Specular wash intensity on hover (0–1) |
| `shadowAlpha` | `number` | `0.20` | Shadow intensity on the far side from the cursor (0–1) |

All props are optional; unspecified values inherit from the nearest parent provider.

### `useGlass()`

Read the current provider config from any component:

```ts
import { useGlass } from 'glass-design-system';

const { blur, opacity } = useGlass();
```

---

## GlassPanel

The primary surface component. Applies the glass material, rim light and spectral fringe, top-edge shimmer, ambient glows, and a pointer-tracking specular: a wide, faint pool of warm light sized to the pane.

```tsx
<GlassPanel intensity="medium" padding="md">
  {/* your content */}
</GlassPanel>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `intensity` | `'subtle' \| 'medium' \| 'strong'` | `'medium'` | Opacity / visual weight tier |
| `topGlow` | `boolean` | `true` | Upper-right warm glow from the light source |
| `bottomGlow` | `boolean` | `false` | Lower-left cobalt bounce light |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | `sm` 24px, `md` fluid 20→40px (`--space-panel`), `lg` fluid 28→64px |
| `rounded` | `string` | — | A border-radius class. Without it the panel uses `var(--radius-panel)` (28px) |
| `tilt` | `boolean` | `false` | Leans up to 3° away from the pointer, like pressing on a pane |
| `reveal` | `boolean` | `false` | Frost condenses onto the pane the first time it scrolls into view |
| `spectrum` | `boolean` | `true` | Spectral dispersion fringe along the rim |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to the root element |
| `className` | `string` | `''` | Appended to root element |
| `style` | `CSSProperties` | — | Merged after the glass styles (can override) |
| `as` | `React.ElementType` | `'div'` | Render as any HTML element (`'form'`, `'section'`, etc.) |

### Intensity tiers

All alphas scale against the nearest `GlassProvider`'s `opacity` value.

| Intensity | Use case |
|-----------|----------|
| `'subtle'` | Background context panels, nested inner containers |
| `'medium'` | Standard cards, navigation bars, sidebars |
| `'strong'` | Modals, dialogs, elevated popovers |

### Nesting rule

Outer panels should have equal or higher intensity than inner panels:

```
subtle  → nested medium  → nested strong   ✓
strong  → nested subtle                    ✓
subtle  → nested strong                    ✗  (inverted depth)
```

---

## GlassInput

A glass-styled `<input>` element. Accepts all standard `<input>` props plus shared glass options.

```tsx
import { GlassInput } from 'glass-design-system';

<GlassInput
  type="text"
  placeholder="Search…"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fieldBlur` | `number` | `16` | `backdrop-filter` blur for the field (independent of provider) |
| `shimmer` | `boolean` | `true` | Top-edge shimmer line |
| `wrapperClassName` | `string` | — | Class added to the outer wrapper div |
| `wrapperStyle` | `CSSProperties` | — | Inline style for the outer wrapper div |

---

## GlassTextarea

A glass-styled `<textarea>`. Same props as `GlassInput` plus all standard `<textarea>` props.

```tsx
import { GlassTextarea } from 'glass-design-system';

<GlassTextarea
  placeholder="Describe your snippet…"
  rows={4}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
```

---

## GlassInputWrap

Wraps any child element with the glass input treatment. On focus a catch-light runs once around the rim and settles where the light comes from. Give your own control the `glass-field__control` class for matching padding, type and caret. Use when you need glass styling on a native `<select>`, a custom component, or any element `GlassInput` and `GlassTextarea` don't cover.

```tsx
import { GlassInputWrap } from 'glass-design-system';

<GlassInputWrap>
  <select className="glass-field__control">
    <option>Option A</option>
    <option>Option B</option>
  </select>
</GlassInputWrap>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `focused` | `boolean` | — | Controlled focus state; auto-detected from child focus events when omitted |
| `radius` | `string` | `var(--radius-field)` | CSS border-radius value |
| `fieldBlur` | `number` | `16` | Backdrop blur in px |
| `shimmer` | `boolean` | `true` | Top-edge shimmer line |
| `wrapperClassName` | `string` | — | Extra class on the wrapper div |
| `wrapperStyle` | `CSSProperties` | — | Inline style on the wrapper div |

---

## GlassPill

The canonical button / navigation link. Sentence-case label, a single glint that crosses the pill on hover, a spring on press, and an amber focus ring.

```tsx
import { GlassPill } from 'glass-design-system';
import { Link } from 'react-router-dom';

{/* Navigation link */}
<GlassPill size="lg" as={Link} to="/favorites">
  Favorites
</GlassPill>

{/* Toggle button */}
<GlassPill
  size="xs"
  variant={isActive ? 'active' : 'default'}
  onClick={toggle}
>
  Grid
</GlassPill>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size tier |
| `variant` | `'default' \| 'active' \| 'accent' \| 'ghost'` | `'default'` | Colour / state variant |
| `as` | `React.ElementType` | `'button'` | Underlying element (`Link`, `'a'`, `'button'`) |
| `className` | `string` | `''` | Appended to root |

### Size guide

| Size | Text | Typical use |
|------|------|-------------|
| `xs` | 12px | Layout toggles, tags, tiny controls |
| `sm` | 13px | Card controls, compact nav |
| `md` | 14px | Standard nav links and buttons |
| `lg` | 15px | Primary actions, toolbar actions |

### Variants

| Variant | Appearance | Use |
|---------|-----------|-----|
| `default` | Clear glass that frosts over on hover | Secondary actions, filters, tags |
| `active` | Denser, brighter glass | Already-selected state. `aria-current="page"` gets it too, so `NavLink`s light up on their own |
| `accent` | The warm light as a solid surface, dark ink | The primary action on a screen. Use one. |
| `ghost` | No glass until hovered | Navigation bars, toolbars, cancel buttons |

---

## GlassDivider

A 1px rule that fades out at both ends and warms where the light hits its centre, with a faint split-light line beneath.

```tsx
import { GlassDivider } from 'glass-design-system';

<GlassDivider className="my-10" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Tailwind spacing / sizing classes |

---

## GlassToast

A pill of glass that springs up from the bottom edge; its icon draws itself in once it lands. Announced politely to screen readers (errors assertively).

```tsx
import { GlassToast } from 'glass-design-system';

<GlassToast open={sent} onClose={() => setSent(false)}>
  Message sent. I'll get back to you soon.
</GlassToast>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Whether the toast is showing |
| `onClose` | `() => void` | — | Called after `duration` |
| `duration` | `number` | `4500` | Auto-close delay in ms; `0` keeps it open |
| `tone` | `'success' \| 'error' \| 'info'` | `'success'` | Icon and tint |

---

## GlassSwitch

An on/off toggle. The recessed track fills with the warm light when on; the thumb springs across. Renders a `<button role="switch">`.

```tsx
import { GlassSwitch } from 'glass-design-system';

<GlassSwitch checked={notify} onChange={setNotify}>
  Email me when someone replies
</GlassSwitch>

<GlassSwitch aria-label="Line numbers" defaultChecked />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Controlled state; omit and use `defaultChecked` for uncontrolled |
| `onChange` | `(checked: boolean) => void` | — | Called with the new state |
| `children` | `ReactNode` | — | Visible label, rendered before the switch inside a `<label>` |
| `size` | `'sm' \| 'md'` | `'md'` | 36×22 or 44×26px |

All other `<button>` props (`disabled`, `aria-label`, …) are forwarded.

---

## GlassSlider

A native range input on a recessed glass track. The filled part is the warm light; the thumb is a bead of frosted glass.

```tsx
import { GlassSlider } from 'glass-design-system';

<GlassSlider label="Blur" min={0} max={80} value={blur} onChange={setBlur} format={(v) => `${v}px`} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` / `defaultValue` | `number` | — | Controlled or initial value |
| `onChange` | `(value: number) => void` | — | Called with the new value as a number |
| `min` / `max` / `step` | `number` | `0` / `100` / `1` | Range |
| `label` | `ReactNode` | — | Visible label above the track; without it pass `aria-label` |
| `showValue` | `boolean` | `true` with a label | Show the current value opposite the label |
| `format` | `(value: number) => string` | `String` | Format the shown value |

---

## GlassSegmented

Pick one of a few options. The selection is a pane of glass that springs across the tray. A radio group underneath: arrow keys move the selection.

```tsx
import { GlassSegmented } from 'glass-design-system';

<GlassSegmented aria-label="View" options={['Grid', 'List']} value={view} onChange={setView} />

// Custom labels
<GlassSegmented
  options={[{ value: '7d', label: '7 days' }, { value: '30d', label: '30 days' }]}
  value={range}
  onChange={setRange}
  size="sm"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `T[] \| { value: T; label: ReactNode }[]` | — | Strings, or values with custom labels |
| `value` | `T` | — | Selected value (controlled) |
| `onChange` | `(value: T) => void` | — | Called with the picked value |
| `size` | `'sm' \| 'md'` | `'md'` | Option padding and type size |
| `block` | `boolean` | `false` | Fill the container, options sharing the width |

---

## Material hooks

Put the glass light on your own elements:

```tsx
import { useGlassPointer, useGlassReveal } from 'glass-design-system';

const ref = useRef<HTMLDivElement>(null);
useGlassPointer(ref);   // writes --glass-x/-y/-angle/-hover on pointer move
useGlassReveal(ref);    // data-reveal="pending" → "in" when scrolled into view

<div ref={ref} className="glass-surface glass-surface--reveal">
  <div className="glass-surface__sheen" />
  <div className="glass-surface__rim" />
  <div className="glass-surface__spectrum" />
  …
</div>
```

---

## Low-level API

For custom surfaces that need the glass material without `GlassPanel`:

```tsx
import { getGlassStyles, useGlass } from 'glass-design-system';

function CustomSurface() {
  const config = useGlass();
  const glass = getGlassStyles('medium', config);

  return (
    <div
      className="relative overflow-hidden rounded-[2rem]"
      style={glass.panel}
    >
      {/* Top-edge shimmer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${glass.shimmerColor}, transparent)` }}
      />
      <div className="relative z-10">{/* content */}</div>
    </div>
  );
}
```

`getGlassStyles(intensity, config)` returns:

```ts
{
  panel: {
    background:     string;  // oklch background with computed alpha
    backdropFilter: string;  // blur(Npx)
    border:         string;  // 1px solid semi-transparent edge
    boxShadow:      string;  // outer depth shadow + inset shimmer
  };
  shimmerColor:  string;     // colour for the 1px top-edge gradient
  topRightGlow:  { background: string; filter: string };
  bottomLeftGlow:{ background: string; filter: string };
}
```

---

## Foundations

Tokens every part is built from. Use the steps; don't invent values.

### Space

| Token | Size | Tailwind | Use it for |
|-------|------|----------|------------|
| `--space-1` | 4px | `p-1` | Icon to its label |
| `--space-2` | 8px | `p-2` | Pills in a group, tight stacks |
| `--space-3` | 12px | `p-3` | Label to field, title to body |
| `--space-4` | 16px | `p-4` | Padding inside small parts |
| `--space-6` | 24px | `p-6` | Between related blocks |
| `--space-8` | 32px | `p-8` | Card padding, form groups |
| `--space-12` | 48px | `p-12` | Heading to section content |
| `--space-16` | 64px | `p-16` | Between groups inside a section |
| `--space-24` | 96px | `p-24` | Between sections |
| `--space-32` | 128px | `p-32` | Hero breathing room |

Fluid tokens for page structure: `--space-gutter` (16→40px), `--space-section` (64→128px), `--space-panel` (20→40px) and `--space-grid` (12→24px). Big gaps hold small ones: the space inside a group is always smaller than the space around it.

### Layout, radius, type, elevation

- **Widths:** `--page-max` (76rem), `--page-wide` (96rem), `--measure` (62ch).
- **Radius:** `--radius-chip` 8, `--radius-field` 14, `--radius-card` 20, `--radius-panel` 28, `--radius-sheet` 36. Nested corners stay concentric when inner = outer − padding.
- **Type steps:** `--step--2` (12px) through `--step-7` (57→107px), a fluid modular scale with ratio 1.2 on phones and 1.3 on laptops.
- **Elevation:** `--elevation-1` … `--elevation-3` for menus, sticky bars and dialogs.

### Layout and type classes

Optional classes in `@layer components` (any Tailwind utility wins): `.glass-container` (`--wide`), `.glass-section`, `.glass-stack` (gap `--stack`), `.glass-cluster` (gap `--cluster`), `.glass-grid` (min `--grid-min`), `.glass-measure`, and one class per text role: `.glass-display`, `.glass-h1` … `.glass-h4`, `.glass-lede`, `.glass-body`, `.glass-small`, `.glass-caption`, `.glass-code`.

```tsx
<section className="glass-section">
  <div className="glass-container glass-stack">
    <h2 className="glass-h2">Recent work</h2>
    <div className="glass-grid">…</div>
  </div>
</section>
```

---

## CSS tokens

Import the stylesheet once at the app root:

```ts
import 'glass-design-system/styles';
```

This provides CSS custom properties (`--color-text`, `--color-accent`, `--color-light`, `--color-border`, etc.), rim and motion tokens (`--glass-rim-*`, `--ease-*`, `--dur-*`), the component styles, font stack variables, and the `text-bevel` / `text-bevel-strong` Tailwind utilities.

Fonts: **Bricolage Grotesque** (display, variable weight/width/optical size), **Schibsted Grotesk** (body) and **JetBrains Mono** (code), via `--font-display`, `--font-body` and `--font-code`.

Component styles live in `@layer components`, so Tailwind utilities you pass through `className` (e.g. `absolute right-4`) still win. Import the stylesheet before `tailwindcss`, and keep your own element resets (`button { font: inherit }` and the like) inside `@layer base`: an unlayered reset beats every layered rule and would override the components.

---

## Background requirements

Glass panels need an interesting backdrop to blur. The effect breaks on flat or white backgrounds because `backdrop-filter: blur()` blurs whatever is *behind* the element. Use a fixed, multi-layer gradient and ensure it doesn't scroll with the page:

```css
body {
  background: /* colour radials + grain + base gradient */;
  background-attachment: fixed; /* critical — keeps the light field stationary */
}
```

The `kiln` preset of `<GlassOrbs>` is the house backdrop: a cobalt field with one slow, low amber sun in the upper right, the corner every rim catches light from.

---

## Showcase

Run the interactive showcase (live at [glass.sundbergsolutions.se](https://glass.sundbergsolutions.se)): an overview with live material knobs, Foundations, Components, Layouts, Examples (settings, command palette, sign-in, player, notifications), Orbs, and the theme panel for backdrops and patterns:

```sh
npm run showcase
```
