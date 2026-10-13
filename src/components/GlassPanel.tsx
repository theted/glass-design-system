import React, { useCallback, useRef } from 'react';
import { getGlassStyles } from '../glass';
import { useGlass } from '../context/GlassContext';
import { useGlassPointer, useGlassReveal } from '../hooks/useGlassPointer';

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
const GlassPanel: React.FC<Props> = ({
  intensity = 'medium',
  topGlow = true,
  bottomGlow = false,
  padding = 'none',
  rounded,
  tilt = false,
  reveal = false,
  spectrum = true,
  className = '',
  style,
  children,
  as: Tag = 'div',
  ref: forwardedRef,
  ...rest
}) => {
  const config = useGlass();
  const glass = getGlassStyles(intensity, config);
  const ref = useRef<HTMLElement | null>(null);

  useGlassPointer(ref);
  useGlassReveal(ref, reveal);

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      ref.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
    },
    [forwardedRef],
  );

  const classes = [
    'glass-surface',
    tilt && 'glass-surface--tilt',
    reveal && 'glass-surface--reveal',
    padding !== 'none' && `glass-surface--pad-${padding}`,
    rounded,
    className,
  ].filter(Boolean).join(' ');

  const vars = {
    '--glass-light-alpha': config.lightAlpha,
    '--glass-shadow-alpha': config.shadowAlpha,
    '--glass-lip': glass.shimmerColor,
  } as React.CSSProperties;

  return (
    <Tag ref={setRef} className={classes} style={{ ...glass.panel, ...vars, ...style }} {...rest}>
      <div aria-hidden="true" className="glass-surface__lip" />
      <div aria-hidden="true" className="glass-surface__shade" />
      <div aria-hidden="true" className="glass-surface__sheen" />
      {topGlow && <div aria-hidden="true" className="glass-surface__glow glass-surface__glow--tr" style={glass.topRightGlow} />}
      {bottomGlow && <div aria-hidden="true" className="glass-surface__glow glass-surface__glow--bl" style={glass.bottomLeftGlow} />}
      <div aria-hidden="true" className="glass-surface__rim" />
      {spectrum && <div aria-hidden="true" className="glass-surface__spectrum" />}

      {children}
    </Tag>
  );
};

export default GlassPanel;
