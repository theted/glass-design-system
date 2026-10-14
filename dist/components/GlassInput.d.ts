import type { ComponentPropsWithRef, ReactNode } from 'react';
export type GlassControlSize = 'sm' | 'md' | 'lg';
interface ControlOwnProps {
    /** Height from the shared control scale: 34 / 40 / 48px. Default 'md'. */
    size?: GlassControlSize;
    /** Marks the control invalid. Inside a GlassField, its `error` does this. */
    invalid?: boolean;
}
export type GlassInputProps = Omit<ComponentPropsWithRef<'input'>, 'size'> & ControlOwnProps & {
    /** An icon or text inside the field, before the value. */
    leading?: ReactNode;
    /** An icon, unit, shortcut or button inside the field, after the value. */
    trailing?: ReactNode;
};
/**
 * A text field cut into the glass. Takes every `<input>` prop; `onChange`
 * is the native event, so form libraries work as usual. With `leading` or
 * `trailing`, `className` and `style` go on the wrapping group; everything
 * else stays on the input.
 *
 * ```tsx
 * <GlassInput type="search" placeholder="Search snippets" leading={<SearchIcon />} />
 * <GlassInput inputMode="decimal" trailing="kr" />
 * ```
 */
export declare const GlassInput: ({ size, invalid, leading, trailing, className, style, ref, id, required, "aria-describedby": describedBy, ...rest }: GlassInputProps) => import("react/jsx-runtime").JSX.Element;
export type GlassTextareaProps = ComponentPropsWithRef<'textarea'> & Omit<ControlOwnProps, 'size'> & {
    /** Grow with the text instead of scrolling (where the browser supports field-sizing). */
    autoGrow?: boolean;
};
/** A multi-line text field. Takes every `<textarea>` prop. */
export declare const GlassTextarea: ({ invalid, autoGrow, className, id, required, "aria-describedby": describedBy, ...rest }: GlassTextareaProps) => import("react/jsx-runtime").JSX.Element;
export type GlassSelectProps = Omit<ComponentPropsWithRef<'select'>, 'size'> & ControlOwnProps;
/**
 * A native select in the same well as the text fields, with its own
 * chevron. The menu itself is the browser's.
 *
 * ```tsx
 * <GlassSelect defaultValue="ts">
 *   <option value="ts">TypeScript</option>
 *   <option value="go">Go</option>
 * </GlassSelect>
 * ```
 */
export declare const GlassSelect: ({ size, invalid, className, id, required, "aria-describedby": describedBy, ...rest }: GlassSelectProps) => import("react/jsx-runtime").JSX.Element;
export {};
