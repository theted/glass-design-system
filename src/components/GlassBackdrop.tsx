import type { CSSProperties } from 'react';
import { cx } from '../utils';

/** The palettes, in the order a picker should show them. kiln is the house look. */
export const GLASS_PALETTES = ['kiln', 'dusk', 'dawn', 'ember', 'aurora', 'forest', 'lagoon', 'fjord', 'abyss'] as const;
export type GlassPalette = (typeof GLASS_PALETTES)[number];

export const GLASS_TEXTURES = ['none', 'grain', 'dots', 'grid'] as const;
export type GlassTexture = (typeof GLASS_TEXTURES)[number];

export interface GlassBackdropProps {
  /**
   * - `kiln`   cobalt field, one low amber sun: the house look. Follows --glass-hue.
   * - `dusk`   violet evening, low amber sun
   * - `dawn`   rose and peach under a pale gold sun
   * - `ember`  deep reds under a hot sun
   * - `aurora` teal and magenta, no sun
   * - `forest` pine and moss at golden hour
   * - `lagoon` bright turquoise over deep blue, high pale sun
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
export const GlassBackdrop = ({
  palette = 'kiln',
  motion = true,
  speed,
  strength,
  texture = 'none',
  fixed = false,
  className,
  style,
}: GlassBackdropProps) => (
  <div
    aria-hidden="true"
    className={cx(
      'glass-backdrop',
      palette !== 'kiln' && `glass-backdrop--${palette}`,
      !motion && 'glass-backdrop--still',
      texture !== 'none' && `glass-backdrop--${texture}`,
      fixed && 'glass-backdrop--fixed',
      className,
    )}
    style={
      {
        ...(speed !== undefined && { '--backdrop-speed': `${speed}s` }),
        ...(strength !== undefined && { '--backdrop-strength': strength }),
        ...style,
      } as CSSProperties
    }
  >
    {Array.from({ length: 6 }, (_, i) => (
      <span key={i} className="glass-backdrop__orb" />
    ))}
  </div>
);
