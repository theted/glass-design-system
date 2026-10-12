import React from 'react';

export type GlassPillSize    = 'xs' | 'sm' | 'md' | 'lg';
export type GlassPillVariant = 'default' | 'active' | 'accent';

/**
 * Styling lives in `material.css` (.glass-pill): sentence-case labels, a
 * spring on press, and a single glint that crosses the pill on hover.
 *
 *   default — muted glass, lifts and brightens on hover
 *   active  — already-selected state (denser glass)
 *   accent  — warm-lit glass; reserve for the primary action on a screen
 */
const BASE = 'glass-pill';

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
 * Handles sizing, glass surface, hover glint, press spring and focus ring. Use `as={Link}` for router links.
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
const GlassPill: React.FC<Props> = ({
  size = 'md',
  variant = 'default',
  as: Tag = 'button',
  className = '',
  children,
  ...rest
}) => {
  const typeDefault = Tag === 'button' && !rest.type ? { type: 'button' } : {};

  return (
    <Tag
      className={`${BASE} glass-pill--${size}${variant === 'default' ? '' : ` glass-pill--${variant}`} ${className}`.trim()}
      {...typeDefault}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default GlassPill;
