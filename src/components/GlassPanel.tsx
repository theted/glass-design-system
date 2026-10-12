import React, { useCallback, useRef } from 'react';
import { getGlassStyles } from '../glass';
import { useGlass } from '../context/GlassContext';
import { useGlassPointer, useGlassReveal } from '../hooks/useGlassPointer';

export type { GlassIntensity } from '../glass';
import type { GlassIntensity } from '../glass';

type Props = React.PropsWithChildren<{
  /** Controls opacity/blur/shadow depth. Scales against GlassProvider config. */
  intensity?: GlassIntensity;
  /** Show top-right ambient glow from the warm light source. Default true. */
  topGlow?: boolean;
  /** Show bottom-left cobalt bounce light. Default false. */
  bottomGlow?: boolean;
  /** Border-radius Tailwind class. Default 'rounded-[2.2rem]'. */
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
 * a warm specular gathers under it.
 *
 * ```tsx
 * <GlassPanel intensity="medium" tilt reveal className="p-10">
 *   <div className="relative z-10">…</div>
 * </GlassPanel>
 * ```
 */
const GlassPanel: React.FC<Props> = ({
  intensity = 'medium',
  topGlow = true,
  bottomGlow = false,
  rounded = 'rounded-[2.2rem]',
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
    rounded,
    className,
  ].filter(Boolean).join(' ');

  const vars = {
    '--glass-light-alpha': config.lightAlpha,
    '--glass-shadow-alpha': config.shadowAlpha,
  } as React.CSSProperties;

  return (
    <Tag ref={setRef} className={classes} style={{ ...glass.panel, ...vars, ...style }} {...rest}>
      {/* Top-edge 1px shimmer — light catching the upper lip of the glass */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent 5%, ${glass.shimmerColor} 70%, transparent)`, zIndex: 1 }}
      />

      <div aria-hidden="true" className="glass-surface__shade" />
      <div aria-hidden="true" className="glass-surface__sheen" />

      {topGlow && (
        <div
          aria-hidden="true"
          className="glass-surface__glow"
          style={{ right: '-10rem', top: '-14rem', width: '44rem', height: '28rem', ...glass.topRightGlow }}
        />
      )}

      {bottomGlow && (
        <div
          aria-hidden="true"
          className="glass-surface__glow"
          style={{ left: '-10rem', bottom: '-10rem', width: '28rem', height: '24rem', ...glass.bottomLeftGlow }}
        />
      )}

      <div aria-hidden="true" className="glass-surface__rim" />
      {spectrum && <div aria-hidden="true" className="glass-surface__spectrum" />}

      {children}
    </Tag>
  );
};

export default GlassPanel;
