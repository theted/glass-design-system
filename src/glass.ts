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
import { GLASS_DEFAULTS } from './context/GlassContext';

// Re-export defaults as named constants for backwards compatibility
export const GLASS_OPACITY      = GLASS_DEFAULTS.opacity;
export const GLASS_BLUR         = GLASS_DEFAULTS.blur;
export const GLASS_LIGHT_ALPHA  = GLASS_DEFAULTS.lightAlpha;
export const GLASS_SHADOW_ALPHA = GLASS_DEFAULTS.shadowAlpha;

export type GlassIntensity = 'subtle' | 'medium' | 'strong';

// ── Per-intensity base alphas (scaled by config.opacity at runtime) ─

const BASE_BG:      Record<GlassIntensity, number> = { subtle: 0.17, medium: 0.30, strong: 0.64 };
const BASE_BORDER:  Record<GlassIntensity, number> = { subtle: 0.20, medium: 0.32, strong: 0.44 };
const BASE_SHIMMER: Record<GlassIntensity, number> = { subtle: 0.24, medium: 0.38, strong: 0.64 };
const BASE_SHADOW:  Record<GlassIntensity, number> = { subtle: 0.20, medium: 0.34, strong: 0.46 };
const BASE_GLOW:    Record<GlassIntensity, number> = { subtle: 0.06, medium: 0.09, strong: 0.12 };
const SATURATE:     Record<GlassIntensity, number> = { subtle: 1.35, medium: 1.5,  strong: 1.6 };

// ── Colour constants ────────────────────────────────────────────────

const BG_L    = '0.21 0.034 260';  // panel background base — cobalt smoke
const EDGE    = '0.52 0.05 255';   // border edge
const LIGHT   = '0.93 0.07 80';    // shimmer / inner highlight — warm light
const DEPTH   = '0.05 0.02 262';   // shadow depth
export const GLOW_TR = '0.80 0.12 72';    // top-right glow (the warm light source)
export const GLOW_BL = '0.55 0.18 262';   // bottom-left glow (cobalt bounce light)

// Base alpha for the flat background layer used by Snippet cards
// (they render their own background outside GlassPanel — this keeps
//  them in sync with GLASS_OPACITY so all surfaces scale together).
const CARD_BG_BASE = 0.512; // = 0.42 / 0.82 — preserves original ratio
export const CARD_BG_ALPHA = Math.round(CARD_BG_BASE * GLASS_DEFAULTS.opacity * 1000) / 1000;

// ── Public types ────────────────────────────────────────────────────

export interface GlassStyles {
  /** Apply directly to the panel wrapper element. */
  panel: {
    background:     string;
    backdropFilter: string;
    border:         string;
    boxShadow:      string;
  };
  /** Colour token for the top-edge 1px shimmer line. */
  shimmerColor: string;
  /** Style for the top-right ambient corner glow div. */
  topRightGlow: {
    background: string;
    filter:     string;
  };
  /** Style for the optional bottom-left ambient corner glow div. */
  bottomLeftGlow: {
    background: string;
    filter:     string;
  };
}

// ── Main export ─────────────────────────────────────────────────────

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
export function getGlassStyles(
  intensity: GlassIntensity = 'medium',
  config: GlassConfig = GLASS_DEFAULTS,
): GlassStyles {
  const { blur, opacity } = config;

  /** Scale base alpha against the provider's opacity master. */
  function a(base: number): string {
    return (Math.round(base * opacity * 1000) / 1000).toFixed(3);
  }

  return {
    panel: {
      background:     `oklch(${BG_L} / ${a(BASE_BG[intensity])})`,
      backdropFilter: `blur(${blur}px) saturate(${SATURATE[intensity]})`,
      border:         `1px solid oklch(${EDGE} / ${a(BASE_BORDER[intensity])})`,
      boxShadow: [
        `0 1px 1px oklch(${DEPTH} / ${a(BASE_SHADOW[intensity] * 0.8)})`,
        `0 24px 64px -16px oklch(${DEPTH} / ${a(BASE_SHADOW[intensity] * 1.6)})`,
        `inset 0 1px 0 oklch(${LIGHT} / ${a(BASE_SHIMMER[intensity] * 0.45)})`,
        `inset 0 -1px 0 oklch(${DEPTH} / ${a(BASE_SHADOW[intensity])})`,
      ].join(', '),
    },
    shimmerColor:  `oklch(${LIGHT} / ${a(BASE_SHIMMER[intensity])})`,
    topRightGlow: {
      background: `radial-gradient(closest-side, oklch(${GLOW_TR} / ${a(BASE_GLOW[intensity])}) 0%, oklch(${GLOW_TR} / ${a(BASE_GLOW[intensity] * 0.4)}) 45%, transparent 100%)`,
      filter:     'none',
    },
    bottomLeftGlow: {
      background: `radial-gradient(closest-side, oklch(${GLOW_BL} / ${a(BASE_GLOW[intensity] * 1.4)}) 0%, oklch(${GLOW_BL} / ${a(BASE_GLOW[intensity] * 0.5)}) 45%, transparent 100%)`,
      filter:     'none',
    },
  };
}
