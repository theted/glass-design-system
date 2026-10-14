import type { ComponentPropsWithRef, CSSProperties } from 'react';
import { cx } from '../utils';

export type GlassAvatarProps = Omit<ComponentPropsWithRef<'span'>, 'children'> & {
  /** Whose avatar. Becomes the initials, the image's alt text, and picks the tint. */
  name: string;
  /** A photo. Without one, the initials show on a tint picked from the name. */
  src?: string;
  /** sm 24px · md 32px (default) · lg 44px. */
  size?: 'sm' | 'md' | 'lg';
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('');

/** The same name always gets the same hue, spread round the colour wheel. */
const hueOf = (name: string) => [...name].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) % 360, 7);

/**
 * A person: their photo, or their initials on a tint of their own. Next to
 * the name in text, pass `aria-hidden` so it isn't read twice.
 *
 * ```tsx
 * <GlassAvatar name="Ada Lovelace" />
 * <GlassAvatar name="Grace Hopper" src="/grace.jpg" size="lg" />
 * ```
 */
export const GlassAvatar = ({ name, src, size = 'md', className, style, ...rest }: GlassAvatarProps) => (
  <span
    role={src ? undefined : 'img'}
    aria-label={src ? undefined : name}
    className={cx('glass-avatar', size !== 'md' && `glass-avatar--${size}`, className)}
    style={{ '--avatar-hue': hueOf(name), ...style } as CSSProperties}
    {...rest}
  >
    {src ? <img src={src} alt={name} /> : initials(name)}
  </span>
);
