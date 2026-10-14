import type { CSSProperties, PropsWithChildren } from 'react';
export interface GlassConfig {
    /** Backdrop blur in px. Default 40. */
    blur: number;
    /** Tint density, 0 (clear) → 1 (smoked). Default 0.66. */
    opacity: number;
    /** Brightness of the light under the pointer, 0 → 1. Default 0.22. */
    sheen: number;
    /** Hue of the glass, the ground and every neutral (OKLCH degrees). Default 262, cobalt. */
    hue: number;
    /** Hue of the light: rims, focus, the primary action. Default 76, amber. */
    lightHue: number;
}
export declare const GLASS_DEFAULTS: GlassConfig;
/**
 * The knobs as CSS custom properties, for setting them somewhere other than
 * a provider: `<html style={glassVars({ hue: 200 })}>`, or one by one with
 * `style.setProperty`. Only the knobs you pass are included.
 */
export declare const glassVars: (knobs: Partial<GlassConfig>) => Record<string, string>;
export type GlassProviderProps = PropsWithChildren<Partial<GlassConfig> & {
    className?: string;
    style?: CSSProperties;
}>;
/**
 * Retunes the glass for everything inside it. Each prop becomes a CSS
 * custom property on a `display: contents` wrapper, so only what you set
 * changes and the rest inherits from further up. Nest providers to retune
 * a subtree.
 *
 * You don't need one: the stylesheet's defaults apply without it, and the
 * same knobs work as plain CSS (`:root { --glass-blur: 24px }`).
 *
 * ```tsx
 * <GlassProvider blur={24} hue={200}>
 *   <Sidebar />
 * </GlassProvider>
 * ```
 */
export declare const GlassProvider: ({ children, className, style, ...knobs }: GlassProviderProps) => import("react/jsx-runtime").JSX.Element;
/** The knobs in effect here: the nearest GlassProvider's, or the defaults. */
export declare const useGlass: () => GlassConfig;
