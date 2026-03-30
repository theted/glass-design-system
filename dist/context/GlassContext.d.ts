import React from 'react';
export interface GlassConfig {
    /** backdrop-filter blur amount in px. Default: 40 */
    blur: number;
    /** Background alpha multiplier 0–1. Default: 0.66 */
    opacity: number;
    /** Specular wash intensity on hover 0–1. Default: 0.22 */
    lightAlpha: number;
    /** Shadow intensity on the side away from cursor 0–1. Default: 0.20 */
    shadowAlpha: number;
}
export declare const GLASS_DEFAULTS: GlassConfig;
type ProviderProps = React.PropsWithChildren<Partial<GlassConfig>>;
/**
 * GlassProvider — pass configuration once at the top level; all Glass
 * components beneath it inherit the values. Nest providers to override a
 * subtree (e.g. a pricing section with subtler blur).
 *
 * Unspecified props fall back to the nearest parent provider's values,
 * so you only need to specify what you want to change.
 *
 * ```tsx
 * <GlassProvider blur={40} opacity={0.66}>
 *   <App />
 * </GlassProvider>
 *
 * // Nested override — only this subtree gets tighter blur
 * <GlassProvider blur={24}>
 *   <PricingSection />
 * </GlassProvider>
 * ```
 */
export declare function GlassProvider({ children, blur, opacity, lightAlpha, shadowAlpha }: ProviderProps): import("react/jsx-runtime").JSX.Element;
/** Read the nearest GlassProvider's configuration. */
export declare function useGlass(): GlassConfig;
export {};
