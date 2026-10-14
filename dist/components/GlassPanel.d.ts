import type { ElementType } from 'react';
import type { PolymorphicProps } from '../utils';
/** How thick the pane is: closer things are denser and cast deeper shadows. */
export type GlassIntensity = 'subtle' | 'medium' | 'strong';
/** sm 24px · md fluid 20 → 40px · lg fluid 28 → 64px. */
export type GlassPadding = 'none' | 'sm' | 'md' | 'lg';
export type GlassRadius = 'chip' | 'field' | 'card' | 'panel' | 'sheet' | 'round';
export interface GlassPanelOwnProps {
    /** subtle for regions and rows, medium for cards, strong for dialogs. Default 'medium'. */
    intensity?: GlassIntensity;
    /** Inner padding from the spacing scale. Default 'md'. */
    padding?: GlassPadding;
    /** Corner radius token. Default 'panel' (28px). */
    radius?: GlassRadius;
    /** The warm light pooling in the top-right corner. Default false. */
    glow?: boolean;
    /** A spectral fringe where the rim splits the light. Default false. */
    prism?: boolean;
    /** Lean away from the pointer, like pressing on a pane. Default false. */
    tilt?: boolean;
    /** Frost condenses onto the pane the first time it scrolls into view. Default false. */
    reveal?: boolean;
    /** The light follows the pointer. Off, it rests in the upper right. Default true. */
    pointerLight?: boolean;
    className?: string;
}
export type GlassPanelProps<E extends ElementType = 'div'> = PolymorphicProps<E, GlassPanelOwnProps>;
/**
 * A pane of glass: the surface everything else sits on. The rim catches the
 * light, a sheen follows the pointer, and both sit around your content, so
 * children need no wrapper.
 *
 * ```tsx
 * <GlassPanel intensity="strong" padding="lg" glow>
 *   <h2 className="glass-h3">Low sun, cold water</h2>
 * </GlassPanel>
 *
 * <GlassPanel as="a" href="/work" radius="card" tilt>…</GlassPanel>
 * ```
 */
export declare const GlassPanel: <E extends ElementType = "div">({ as, intensity, padding, radius, glow, prism, tilt, reveal, pointerLight, className, ref, ...rest }: GlassPanelProps<E>) => import("react/jsx-runtime").JSX.Element;
