/**
 * ┌──────────────────────────────────────────────────────────────────┐
 * │  Glass Design System                                              │
 * │                                                                   │
 * │  Master knobs — edit these to retheme every glass surface at once │
 * │                                                                   │
 * │  GLASS_OPACITY      0 → 1   background alpha multiplier          │
 * │                     lower = more transparent / more glass-like   │
 * │                                                                   │
 * │  GLASS_BLUR         px      backdrop-filter blur amount          │
 * │                     higher = blurrier / more frosted             │
 * │                                                                   │
 * │  GLASS_LIGHT_ALPHA  0 → 1   specular wash intensity on hover     │
 * │  GLASS_SHADOW_ALPHA 0 → 1   opposite-side shadow intensity       │
 * │                                                                   │
 * │  Each panel picks an intensity ('subtle' | 'medium' | 'strong') │
 * │  that scales against the master values — proportional            │
 * │  relationships are preserved when you tune globally.             │
 * └──────────────────────────────────────────────────────────────────┘
 */
import type { GlassConfig } from './context/GlassContext';
export declare const GLASS_OPACITY: number;
export declare const GLASS_BLUR: number;
export declare const GLASS_LIGHT_ALPHA: number;
export declare const GLASS_SHADOW_ALPHA: number;
export type GlassIntensity = 'subtle' | 'medium' | 'strong';
export declare const GLOW_TR = "0.52 0.24 238";
export declare const GLOW_BL = "0.58 0.14 210";
export declare const CARD_BG_ALPHA: number;
export interface GlassStyles {
    /** Apply directly to the panel wrapper element. */
    panel: {
        background: string;
        backdropFilter: string;
        border: string;
        boxShadow: string;
    };
    /** Colour token for the top-edge 1px shimmer line. */
    shimmerColor: string;
    /** Style for the top-right ambient corner glow div. */
    topRightGlow: {
        background: string;
        filter: string;
    };
    /** Style for the optional bottom-left ambient corner glow div. */
    bottomLeftGlow: {
        background: string;
        filter: string;
    };
}
/**
 * Compute glass surface styles for the given intensity tier.
 *
 * When used inside a React component, prefer calling `useGlass()` and
 * passing the result as the second argument so the component inherits
 * configuration from the nearest `<GlassProvider>`.
 *
 * ```tsx
 * const config = useGlass();
 * const glass  = getGlassStyles('medium', config);
 * ```
 */
export declare function getGlassStyles(intensity?: GlassIntensity, config?: GlassConfig): GlassStyles;
