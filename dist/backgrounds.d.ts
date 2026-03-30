/**
 * Background gradient presets for the Glass Design System.
 *
 * Each preset is a multi-layer CSS gradient string — typically three radial
 * orbs that bloom and blend into each other, a bottom ellipse wash, and a
 * dark linear base.  Apply directly as `background` on a container element.
 *
 * ```tsx
 * import { BG_PRESETS } from 'glass-design-system';
 *
 * const preset = BG_PRESETS.find(p => p.id === 'aurora')!;
 *
 * <div style={{ background: preset.gradient }} />
 * ```
 */
export interface BgPreset {
    /** Unique identifier. */
    id: string;
    /** Human-readable label. */
    label: string;
    /**
     * Simple two-stop gradient for small picker swatches.
     * Use as a CSS `background` value on a ≤ 24 px element.
     */
    swatch: string;
    /**
     * Full multi-layer CSS gradient string.
     * Use as the `background` (or `background-image`) of a full-bleed container.
     */
    gradient: string;
}
export declare const BG_PRESETS: readonly BgPreset[];
export type BgId = (typeof BG_PRESETS)[number]['id'];
/**
 * Generates a dynamic single-hue gradient matching the preset layering style.
 * @param hue   Perceptual hue angle (0–359).
 * @param orb   Multiplier for orb opacity (0.1–1.5; default 1.0).
 */
export declare function makeHueGradient(hue: number, orb: number): string;
