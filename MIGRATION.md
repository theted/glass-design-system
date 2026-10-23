# Upgrading from 0.x to 1.0

1.0 rebuilds Glass around one idea: **the material is CSS**. A pane used to be seven decorative divs plus inline styles computed in JavaScript; now it's `class="glass"`, tuned by five CSS custom properties. Components are thin, typed wrappers around classes. Backdrop presets, patterns and orbs became one `GlassBackdrop` with nine palettes.

Most apps upgrade in three passes: rename components, swap removed props, then move off the old token names (or import `compat.css` and do that last).

```sh
npm install github:theted/glass-design-system   # pulls 1.0
```

Both consumers pin a commit in their lockfile, so nothing changes until you run that.

---

## 1. Styles

The import is the same:

```ts
import 'glass-design-system/styles';
```

Two optional stylesheets are new:

```css
@import 'glass-design-system/styles';
@import 'glass-design-system/compat';    /* 0.x token names and text-bevel, while you migrate */
@import 'tailwindcss';
@import 'glass-design-system/tailwind';  /* the tokens as Tailwind utilities */
```

The stylesheet now includes a small `@layer base` (box-sizing, body font and colour, `html` background, margin resets). Tailwind's preflight, or anything else you write, overrides it.

**Tailwind no longer needs to scan the package.** Remove `@source "../node_modules/glass-design-system/dist/index.js"` from your CSS: the components don't use Tailwind classes.

---

## 2. Components

### `GlassPill` → `GlassButton`

```diff
- <GlassPill size="lg" variant="accent" as={Link} to="/new">New snippet</GlassPill>
+ <GlassButton size="lg" variant="primary" as={Link} to="/new">New snippet</GlassButton>

- <GlassPill size="xs" variant={grid ? 'active' : 'default'} onClick={toggle}>Grid</GlassPill>
+ <GlassButton size="xs" pressed={grid} onClick={toggle}>Grid</GlassButton>
```

| 0.x `variant` | 1.0 |
|---|---|
| `default` | `secondary` (the default) |
| `accent` | `primary` |
| `active` | `pressed` (a toggle) or `aria-current` (a link) |
| `ghost` | `ghost` |
| | `danger` (new) |

Sizes are unchanged (`xs` `sm` `md` `lg`); heights now come from `--control-*`, so buttons line up with fields. New: `loading`, `icon` (square), `block` (full width).

### `GlassPanel`

```diff
- <GlassPanel intensity="subtle" topGlow={false} rounded="rounded-[1.7rem]" className="p-6">
+ <GlassPanel intensity="subtle" radius="card" className="p-6">

- <GlassPanel intensity="medium" bottomGlow spectrum={false}>
+ <GlassPanel intensity="medium">
```

| 0.x | 1.0 |
|---|---|
| `topGlow` (default **true**) | `glow` (default **false**) |
| `bottomGlow` | removed |
| `spectrum` (default **true**) | `prism` (default **false**) |
| `rounded="rounded-…"` | `radius="chip" \| "field" \| "card" \| "panel" \| "sheet" \| "round"`, or keep a `rounded-*` class |
| `padding` (default `none`) | `padding` (default **`md`**). A `p-*` utility in `className` still wins. |
| | `pointerLight` (default true): turn the moving light off |

`intensity`, `tilt`, `reveal`, `as`, `ref` and `className` are unchanged. `as` is now typed: `<GlassPanel as="form" onSubmit={…}>` checks `onSubmit`.

Content no longer needs a `relative z-10` wrapper. Existing wrappers keep working.

### `GlassInput`, `GlassTextarea`, `GlassInputWrap`

The field is now the native element itself (`.glass-input`), with focus in pure CSS.

```diff
- <label className="field-label" htmlFor="email">Email</label>
- <GlassInput id="email" type="email" />
+ <GlassField label="Email">
+   <GlassInput type="email" />
+ </GlassField>
```

| 0.x | 1.0 |
|---|---|
| `fieldBlur`, `shimmer` | removed |
| `wrapperClassName`, `wrapperStyle` | `className` / `style` (on the input, or on the group when it has `leading`/`trailing`) |
| `GlassInputWrap` around a `<select>` | `GlassSelect` |
| `GlassInputWrap` around anything else | `className="glass-input"` on your control, or `GlassInput` with `leading` / `trailing` |
| hand-rolled labels and error text | `GlassField label hint error` |

### `GlassOrbs`, `BG_PRESETS`, `makeHueGradient`, `PATTERNS` → `GlassBackdrop`

```diff
- <GlassOrbs preset="kiln" speed={8} opacity={0.75} fixed />
- <div style={{ backgroundImage: `url("${PATTERNS.find((p) => p.id === 'grain').url}")` }} />
+ <GlassBackdrop fixed palette="kiln" speed={8} strength={0.75} texture="grain" />
```

| 0.x | 1.0 |
|---|---|
| `preset="kiln"` | `palette="kiln"` (the default) |
| other orb presets | the nearest palette: `drift`/`float`/`breathe` → `kiln`; `aurora`/`silk` → `aurora`; `tide` → `lagoon`; `nebula`/`orbit`/`lava` → `dusk`; `ember`/`pulse` → `ember` |
| `opacity` | `strength` |
| `blendMode` | removed |
| `BG_PRESETS` (15 gradients) | `palette` (9), or `--glass-hue` with `kiln` / `abyss` |
| `PATTERNS` (12 tiles) | `texture="grain" \| "dots" \| "grid"` |

The backdrop sits at `z-index: -1`, so page content needs no `position: relative; z-index: 1`. Without `fixed` it fills the nearest `.glass-stage`.

### `getGlassStyles`, `GLASS_*`, `CARD_BG_ALPHA`, `GLOW_TR`, `GLOW_BL` → `class="glass"`

A custom surface is a class now, not a style object:

```diff
- const config = useGlass();
- const glass = getGlassStyles('medium', config);
- return (
-   <div className="relative overflow-hidden rounded-[2.2rem]" style={{ ...glass.panel, background: `oklch(0.22 0.035 260 / ${CARD_BG_ALPHA})` }}>
-     <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${glass.shimmerColor}, transparent)` }} />
-     <div className="absolute -right-32 -top-24 h-96 w-96 rounded-full" style={glass.topRightGlow} />
-     <div className="relative z-10">{children}</div>
-   </div>
- );
+ return <div className="glass glass--glow glass--radius-sheet">{children}</div>;
```

Add `useGlassPointer(ref)` if the light should follow the pointer (`GlassPanel` does this for you). Modifiers: `glass--subtle`, `glass--strong`, `glass--pad-sm|md|lg`, `glass--radius-*`, `glass--glow`, `glass--prism`, `glass--tilt`, `glass--reveal`.

### `GlassProvider`

| 0.x | 1.0 |
|---|---|
| `blur`, `opacity` | unchanged |
| `lightAlpha` | `sheen` |
| `shadowAlpha` | removed (the shade layer is gone) |
| | `hue`, `lightHue` (new): the palette |

The provider now renders a `display: contents` div that carries the CSS variables. You can drop it entirely and set `--glass-blur` and friends on `:root`. `useGlass()` still returns the knobs in effect.

### The rest

- **`GlassDivider`**: same; renders an `<hr>`. New `label` and `orientation`.
- **`GlassToast`**: same; renders into `document.body` (so it works inside glass). New `action`.
- **`GlassSwitch`, `GlassSlider`, `GlassSegmented`**: same API. `GlassSwitch` adds `block`.
- **`useGlassPointer`**: same signature; `--glass-hover` now comes from CSS `:hover`. `GLASS_REST_ANGLE` → `GLASS_REST.angle`.
- **`useGlassReveal`**: unchanged.

New in 1.0: `GlassField`, `GlassSelect`, `GlassCheckbox`, `GlassRadio`, `GlassNav`, `GlassDialog`, `GlassPopover`, `GlassMenu`, `GlassMenuItem`, `GlassBadge`, `GlassKbd`, `GlassAvatar`, `GlassContainer`, `GlassStack`, `GlassCluster`, `GlassGrid`, `GlassSplit`, `useGlassIndicator`, `glassVars`.

---

## 3. Class names

| 0.x | 1.0 |
|---|---|
| `.glass-surface`, `.glass-surface--pad-md` | `.glass`, `.glass--pad-md` |
| `.glass-surface__lip/rim/spectrum/sheen/shade/glow` | gone: `.glass` draws the rim and sheen with `::before` / `::after` |
| `.glass-pill`, `.glass-pill--accent`, `--active` | `.glass-button`, `.glass-button--primary`, `[aria-pressed="true"]` |
| `.glass-field` + `.glass-field__control` | `.glass-input` on the control |
| `.glass-segmented__indicator` | `.glass-indicator` |
| `.glass-orbs`, `.glass-orb` | `.glass-backdrop`, `.glass-backdrop__orb` |
| `.glass-stack` with `--stack` | `--glass-gap` |
| `.glass-cluster` with `--cluster` | `--glass-gap` |
| `.glass-grid` with `--grid-min` | `--glass-min` |

Type and layout classes keep their names (`.glass-h1`, `.glass-body`, `.glass-container` …). New: `.glass-label`, `.glass-link`, `.glass-prose`, `.glass-split`, `.glass-stage`, `.glass-sr-only`.

---

## 4. Tokens

Kept: `--font-*`, `--color-text`, `--color-text-muted`, `--color-text-subtle`, `--color-light`, `--color-light-bright`, `--color-light-soft`, `--color-success`, `--color-warning`, `--color-danger`, every `--space-*`, `--step-*`, `--radius-*`, `--ease-*`, `--dur-*`, `--elevation-*`, `--page-max`, `--page-wide`, `--measure`.

`--radius-field` is 12px (was 14px).

| Removed | Use | In `compat.css` |
|---|---|---|
| `--color-bg`, `--color-bg-deep` | `--color-ground`, `--color-ground-deep` | ✓ |
| `--color-border`, `--color-border-strong` | `--color-line`, `--color-line-strong` | ✓ |
| `--color-surface`, `-strong`, `-muted` | `class="glass"`; `--color-fill`, `--color-well` | ✓ |
| `--color-glass-card`, `-row`, `-field` | `class="glass"`, `glass--subtle`; `--color-well` | ✓ |
| `--color-accent`, `-bright`, `-soft` | `--color-info`; the light for emphasis; `--color-fill-active` | ✓ |
| `--color-ink` | `--color-on-light` | ✓ |
| `--glass-rim-*`, `--glass-spectrum` | `--rim-hot`, `--rim-warm`, `--rim-cool`; `glass--prism` | |
| `text-bevel`, `text-bevel-strong`, `text-bevel-ink` | nothing: text on glass doesn't need it | ✓ |

New: the knobs (`--glass-hue`, `--light-hue`, `--glass-blur`, `--glass-opacity`, `--glass-sheen`), `--color-line*`, `--color-fill*`, `--color-well`, `--color-shadow`, `--color-on-light`, `--color-info`, `--control-xs/sm/md/lg`, `--page-narrow`.

---

## 5. Checklists

### Snippets

1. `GlassPill` → `GlassButton` (20 places); `variant="accent"` → `"primary"`.
2. `GlassPanel`: drop `topGlow={false}` (it's off now); `rounded="rounded-[…]"` → `radius` or keep the class.
3. `snippetStyles.ts`: replace `getGlassStyles` / `CARD_BG_ALPHA` / `GLOW_*` with `className="glass glass--glow"` and delete the glow and shimmer divs.
4. `Searchbar.tsx`: `useGlass` + inline styles → `GlassInput leading={<Icon />}`.
5. `GlassInputWrap` + `<select>` → `GlassSelect`; the error component → `GlassField error`.
6. Its own orbs (`--orb-speed`, `--orb-opacity`) → `GlassBackdrop`.
7. `@import 'glass-design-system/compat'` until the `--color-border*`, `--color-surface*`, `--color-glass-*`, `--color-accent*` and `text-bevel` uses are gone.

### The portfolio

Done in the same change as 1.0: `GlassBackdrop` replaces the hand-built backdrop, `GlassNav` the hand-rolled sliding marker, `GlassField` the labels, and the Tailwind bridge the arbitrary-value colours.
