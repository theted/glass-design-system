import type { ElementType } from 'react';
import type { PolymorphicProps } from '../utils';
export type GlassButtonVariant = 'secondary' | 'primary' | 'ghost' | 'danger';
export type GlassButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export interface GlassButtonOwnProps {
    /**
     * - `secondary` clear glass that frosts over on hover (default)
     * - `primary`   the warm light as a surface; one per screen
     * - `ghost`     no glass until hovered: toolbars, nav, "Cancel"
     * - `danger`    the confirm step of something you can't undo
     */
    variant?: GlassButtonVariant;
    /** Height from the shared control scale: 28 / 34 / 40 / 48px. Default 'md'. */
    size?: GlassButtonSize;
    /** A toggle's state. Sets aria-pressed; pressed buttons are denser glass. */
    pressed?: boolean;
    /** Shows a spinner over the label and sets aria-busy. */
    loading?: boolean;
    /** Square, for a lone icon. Give it an aria-label. */
    icon?: boolean;
    /** Fill the container's width. */
    block?: boolean;
    className?: string;
}
export type GlassButtonProps<E extends ElementType = 'button'> = PolymorphicProps<E, GlassButtonOwnProps>;
/**
 * The button, and the link that looks like one. Pass `as="a"` or a router
 * `Link` for navigation; links that get `aria-current` (NavLink does) show
 * as selected on their own.
 *
 * ```tsx
 * <GlassButton variant="primary" onClick={save}>Save changes</GlassButton>
 * <GlassButton as={Link} to="/docs" variant="ghost">Docs</GlassButton>
 * <GlassButton icon aria-label="Close"><XIcon /></GlassButton>
 * ```
 */
export declare const GlassButton: <E extends ElementType = "button">({ as, variant, size, pressed, loading, icon, block, className, children, ...rest }: GlassButtonProps<E>) => import("react/jsx-runtime").JSX.Element;
