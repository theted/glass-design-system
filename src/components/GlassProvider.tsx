import { createContext, useContext, useMemo } from 'react';
import type { CSSProperties, PropsWithChildren } from 'react';
import { cx } from '../utils';

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

export const GLASS_DEFAULTS: GlassConfig = {
  blur: 40,
  opacity: 0.66,
  sheen: 0.22,
  hue: 262,
  lightHue: 76,
};

const GlassContext = createContext<GlassConfig>(GLASS_DEFAULTS);

const VARS: Record<keyof GlassConfig, (v: number) => [string, string]> = {
  blur: (v) => ['--glass-blur', `${v}px`],
  opacity: (v) => ['--glass-opacity', String(v)],
  sheen: (v) => ['--glass-sheen', String(v)],
  hue: (v) => ['--glass-hue', String(v)],
  lightHue: (v) => ['--light-hue', String(v)],
};

/**
 * The knobs as CSS custom properties, for setting them somewhere other than
 * a provider: `<html style={glassVars({ hue: 200 })}>`, or one by one with
 * `style.setProperty`. Only the knobs you pass are included.
 */
export const glassVars = (knobs: Partial<GlassConfig>): Record<string, string> =>
  Object.fromEntries(
    (Object.keys(VARS) as (keyof GlassConfig)[])
      .filter((key) => knobs[key] !== undefined)
      .map((key) => VARS[key](knobs[key]!)),
  );

export type GlassProviderProps = PropsWithChildren<
  Partial<GlassConfig> & {
    className?: string;
    style?: CSSProperties;
  }
>;

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
export const GlassProvider = ({ children, className, style, ...knobs }: GlassProviderProps) => {
  const parent = useContext(GlassContext);
  const { blur, opacity, sheen, hue, lightHue } = knobs;

  const value = useMemo<GlassConfig>(
    () => ({
      blur: blur ?? parent.blur,
      opacity: opacity ?? parent.opacity,
      sheen: sheen ?? parent.sheen,
      hue: hue ?? parent.hue,
      lightHue: lightHue ?? parent.lightHue,
    }),
    [blur, opacity, sheen, hue, lightHue, parent],
  );

  return (
    <GlassContext.Provider value={value}>
      <div className={cx('glass-scope', className)} style={{ ...glassVars(knobs), ...style }}>
        {children}
      </div>
    </GlassContext.Provider>
  );
};

/** The knobs in effect here: the nearest GlassProvider's, or the defaults. */
export const useGlass = (): GlassConfig => useContext(GlassContext);
