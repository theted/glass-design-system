import React from 'react';
export type { GlassIntensity } from '../glass';
import type { GlassIntensity } from '../glass';
/** sm = 24px, md = fluid 20→40px (--space-panel), lg = fluid 28→64px. */
export type GlassPanelPadding = 'none' | 'sm' | 'md' | 'lg';
type Props = React.PropsWithChildren<{
    /** Controls opacity/blur/shadow depth. Scales against GlassProvider config. */
    intensity?: GlassIntensity;
    /** Show top-right ambient glow from the warm light source. Default true. */
    topGlow?: boolean;
    /** Show bottom-left cobalt bounce light. Default false. */
    bottomGlow?: boolean;
    /** Inner padding from the spacing scale. Default 'none' (pad it yourself). */
    padding?: GlassPanelPadding;
    /**
     * Border-radius class, e.g. 'rounded-3xl'. Default: none, the panel uses
     * var(--radius-panel). Set the radius with style={{ borderRadius }} if
     * your Tailwind doesn't scan this package.
     */
    rounded?: string;
    /** Lean away from the pointer in 3D, like pressing on a pane. Default false. */
    tilt?: boolean;
    /** Frost condenses onto the pane the first time it scrolls into view. Default false. */
    reveal?: boolean;
    /** Draw the spectral dispersion fringe along the rim. Default true. */
    spectrum?: boolean;
    className?: string;
    style?: React.CSSProperties;
    /** Render as a different HTML element (e.g. 'form', 'section'). Default 'div'. */
    as?: React.ElementType;
    ref?: React.Ref<HTMLElement>;
    [key: string]: unknown;
}>;
/**
 * GlassPanel — the primary glass surface.
 *
 * Every panel has a rim that catches the light (warm on the lit side, cool
 * opposite) and a faint spectral fringe where thick glass splits it. On
 * hover the light source follows the pointer: the rim turns toward it and
 * a wide, faint pool of warm light drifts after it.
 *
 * Decorative layers sit beneath your content, so children need no wrapper.
 *
 * ```tsx
 * <GlassPanel intensity="medium" padding="md" tilt reveal>
 *   <h3>…</h3>
 * </GlassPanel>
 * ```
 */
declare const GlassPanel: React.FC<Props>;
export default GlassPanel;
