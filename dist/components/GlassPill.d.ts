import React from 'react';
export type GlassPillSize = 'xs' | 'sm' | 'md' | 'lg';
export type GlassPillVariant = 'default' | 'active' | 'accent';
type Props = React.PropsWithChildren<{
    /** Visual size tier. Default: 'md'. */
    size?: GlassPillSize;
    /** Colour/state variant. Default: 'default'. */
    variant?: GlassPillVariant;
    /**
     * Underlying HTML element or component to render.
     * Pass a React Router `Link` for internal navigation, `'a'` for external links.
     * Default: `'button'`.
     */
    as?: React.ElementType;
    className?: string;
    [key: string]: unknown;
}>;
/**
 * GlassPill — the canonical chrome button/link for navigation and UI controls.
 *
 * Handles sizing, glass surface (backdrop-blur + transparent bg), text-bevel,
 * hover lift, and focus rings automatically. Use `as={Link}` for router links.
 *
 * ```tsx
 * <GlassPill size="lg" as={Link} to="/favorites">
 *   <i className="icon-star-empty" /> Favorites
 * </GlassPill>
 *
 * <GlassPill size="xs" variant={isActive ? 'active' : 'default'} onClick={toggle}>
 *   Grid
 * </GlassPill>
 * ```
 */
declare const GlassPill: React.FC<Props>;
export default GlassPill;
