import type { ComponentPropsWithRef } from 'react';
import { cx } from '../utils';

export type GlassTone = 'neutral' | 'light' | 'success' | 'warning' | 'danger' | 'info';

export type GlassBadgeProps = ComponentPropsWithRef<'span'> & {
  /** Default 'neutral' (clear glass). 'light' is the warm accent: use it for the one thing that's new or yours. */
  tone?: GlassTone;
  /** A glowing status dot before the label. */
  dot?: boolean;
};

/**
 * A short label on something: a language, a status, a count.
 *
 * ```tsx
 * <GlassBadge>TypeScript</GlassBadge>
 * <GlassBadge tone="success" dot>Live</GlassBadge>
 * ```
 */
export const GlassBadge = ({ tone = 'neutral', dot = false, className, children, ...rest }: GlassBadgeProps) => (
  <span className={cx('glass-badge', `glass-badge--${tone}`, className)} {...rest}>
    {dot && <span aria-hidden="true" className="glass-badge__dot" />}
    {children}
  </span>
);

export type GlassKbdProps = ComponentPropsWithRef<'kbd'>;

/** A key on the keyboard: `<GlassKbd>⌘</GlassKbd><GlassKbd>K</GlassKbd>`. */
export const GlassKbd = ({ className, ...rest }: GlassKbdProps) => (
  <kbd className={cx('glass-kbd', className)} {...rest} />
);
