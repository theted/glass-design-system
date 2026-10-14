import type { CSSProperties } from 'react';
/** The palettes, in the order a picker should show them. kiln is the house look. */
export declare const GLASS_PALETTES: readonly ["kiln", "dusk", "aurora", "ember", "fjord", "abyss"];
export type GlassPalette = (typeof GLASS_PALETTES)[number];
export declare const GLASS_TEXTURES: readonly ["none", "grain", "dots", "grid"];
export type GlassTexture = (typeof GLASS_TEXTURES)[number];
export interface GlassBackdropProps {
    /**
     * - `kiln`   cobalt field, one low amber sun: the house look. Follows --glass-hue.
     * - `dusk`   violet evening, low amber sun
     * - `aurora` teal and magenta, no sun
     * - `ember`  deep reds under a hot sun
     * - `fjord`  cold, low-chroma water under a pale sun
     * - `abyss`  almost nothing: for apps where content leads. Follows --glass-hue.
     */
    palette?: GlassPalette;
    /** The orbs drift. Off, they hold still (reduced motion always holds still). Default true. */
    motion?: boolean;
    /** One full drift cycle is this many seconds × 6–10. Default 8. */
    speed?: number;
    /** Orb strength, 0 → 1. Lower it behind dense content. Default 1. */
    strength?: number;
    /** A fine overlay. Grain hides gradient banding on large screens. Default 'none'. */
    texture?: GlassTexture;
    /** Cover the viewport and stay put while the page scrolls. Without it, it fills the nearest .glass-stage. */
    fixed?: boolean;
    className?: string;
    style?: CSSProperties;
}
/**
 * The light the glass refracts. Backdrop blur needs something to blur: on a
 * flat colour glass is just grey. Put one fixed backdrop at the top of the
 * app; it sits behind everything (z-index −1) and needs no wrapper.
 *
 * ```tsx
 * <GlassBackdrop fixed texture="grain" />
 *
 * // Inside a box instead of the viewport:
 * <div className="glass-stage">
 *   <GlassBackdrop palette="dusk" />
 *   <GlassPanel>…</GlassPanel>
 * </div>
 * ```
 */
export declare const GlassBackdrop: ({ palette, motion, speed, strength, texture, fixed, className, style, }: GlassBackdropProps) => import("react/jsx-runtime").JSX.Element;
