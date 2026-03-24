/**
 * Background pattern overlays for the Glass Design System.
 *
 * Each pattern is an SVG tile encoded as a `data:image/svg+xml` URL, ready
 * to be used as a CSS `background-image`.  Apply the overlay at low CSS
 * `opacity` (0.10–0.25) with `mix-blend-mode: soft-light` for best results
 * against dark glass backgrounds.
 *
 * ```tsx
 * import { PATTERNS } from 'glass-design-system';
 *
 * const pattern = PATTERNS.find(p => p.id === 'grid')!;
 *
 * <div style={{
 *   backgroundImage: `url("${pattern.url}")`,
 *   backgroundSize: pattern.size,
 *   mixBlendMode: 'soft-light',
 *   opacity: 0.18,
 * }} />
 * ```
 */
export interface PatternDef {
    /** Unique identifier. */
    id: string;
    /** Human-readable label. */
    label: string;
    /**
     * Small-scale swatch SVG data URI — suitable for picker buttons (≤ 20 px).
     * The swatch renders at reduced opacity to stay legible in the picker UI.
     */
    swatch: string;
    /**
     * Full-resolution SVG data URI to use as `background-image`.
     * Always paired with `size` for correct tiling.
     */
    url: string;
    /** CSS `background-size` value that produces one clean tile, e.g. `'32px 32px'`. */
    size: string;
}
export declare const PATTERNS: readonly PatternDef[];
export type PatternId = (typeof PATTERNS)[number]['id'];
