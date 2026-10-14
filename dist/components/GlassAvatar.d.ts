import type { ComponentPropsWithRef } from 'react';
export type GlassAvatarProps = Omit<ComponentPropsWithRef<'span'>, 'children'> & {
    /** Whose avatar. Becomes the initials, the image's alt text, and picks the tint. */
    name: string;
    /** A photo. Without one, the initials show on a tint picked from the name. */
    src?: string;
    /** sm 24px · md 32px (default) · lg 44px. */
    size?: 'sm' | 'md' | 'lg';
};
/**
 * A person: their photo, or their initials on a tint of their own. Next to
 * the name in text, pass `aria-hidden` so it isn't read twice.
 *
 * ```tsx
 * <GlassAvatar name="Ada Lovelace" />
 * <GlassAvatar name="Grace Hopper" src="/grace.jpg" size="lg" />
 * ```
 */
export declare const GlassAvatar: ({ name, src, size, className, style, ...rest }: GlassAvatarProps) => import("react/jsx-runtime").JSX.Element;
