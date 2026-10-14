import type { ComponentPropsWithRef, ElementType, ReactElement, ReactNode } from 'react';
import type { PolymorphicProps } from '../utils';
export type GlassPopoverPlacement = 'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' | 'top' | 'top-end';
export interface GlassPopoverProps {
    /** The button that opens and closes it: a GlassButton or a <button>. */
    trigger: ReactElement;
    /** The content, or a function that gets `close` (for menu items that should close it). */
    children: ReactNode | ((close: () => void) => ReactNode);
    /** Where it opens, relative to the trigger. Flips when it won't fit. Default 'bottom-start'. */
    placement?: GlassPopoverPlacement;
    /** Panel padding for forms and settings; leave off for menus. */
    padded?: boolean;
    /** Called when it opens or closes. */
    onOpenChange?: (open: boolean) => void;
    /** Names the popover for screen readers when its content doesn't. */
    'aria-label'?: string;
    className?: string;
}
/**
 * A pane of strong glass anchored to a button: menus, pickers, small
 * settings. Built on the popover attribute, so it sits in the top layer, a
 * press outside or Escape closes it, and the trigger reports whether it's
 * expanded.
 *
 * ```tsx
 * <GlassPopover trigger={<GlassButton>Sort</GlassButton>}>
 *   {(close) => (
 *     <GlassMenu>
 *       <GlassMenuItem onClick={() => { sortBy('name'); close(); }}>Name</GlassMenuItem>
 *       <GlassMenuItem onClick={() => { sortBy('date'); close(); }}>Last edited</GlassMenuItem>
 *     </GlassMenu>
 *   )}
 * </GlassPopover>
 * ```
 */
export declare const GlassPopover: ({ trigger, children, placement, padded, onOpenChange, "aria-label": ariaLabel, className, }: GlassPopoverProps) => import("react/jsx-runtime").JSX.Element;
/** A list of actions inside a GlassPopover. Arrow keys, Home and End move between items. */
export declare const GlassMenu: ({ className, onKeyDown, ...rest }: ComponentPropsWithRef<"div">) => import("react/jsx-runtime").JSX.Element;
export interface GlassMenuItemOwnProps {
    /** An icon before the label. */
    icon?: ReactNode;
    /** A shortcut or detail at the end, like ⌘ K. */
    hint?: ReactNode;
    /** For an action you can't undo. */
    danger?: boolean;
    className?: string;
}
export type GlassMenuItemProps<E extends ElementType = 'button'> = PolymorphicProps<E, GlassMenuItemOwnProps>;
/** One action in a GlassMenu. A button by default; `as="a"` or a router Link for navigation. */
export declare const GlassMenuItem: <E extends ElementType = "button">({ as, icon, hint, danger, className, children, ...rest }: GlassMenuItemProps<E>) => import("react/jsx-runtime").JSX.Element;
