import type { ComponentPropsWithRef } from 'react';
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
export declare const GlassBadge: ({ tone, dot, className, children, ...rest }: GlassBadgeProps) => import("react/jsx-runtime").JSX.Element;
export type GlassKbdProps = ComponentPropsWithRef<'kbd'>;
/** A key on the keyboard: `<GlassKbd>⌘</GlassKbd><GlassKbd>K</GlassKbd>`. */
export declare const GlassKbd: ({ className, ...rest }: GlassKbdProps) => import("react/jsx-runtime").JSX.Element;
