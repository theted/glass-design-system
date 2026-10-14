import type { ComponentPropsWithRef, ReactNode } from 'react';
interface CheckOwnProps {
    /** Text beside the box. Without it, pass `aria-label`. */
    label?: ReactNode;
    /** A quieter line under the label. */
    description?: ReactNode;
    /** Marks the control invalid. */
    invalid?: boolean;
    /** Extra class on the outer label (when there is one). */
    wrapperClassName?: string;
}
type CheckProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & CheckOwnProps;
export type GlassCheckboxProps = CheckProps & {
    /** The dash state: some, not all, of a group is checked. */
    indeterminate?: boolean;
};
/**
 * A native checkbox: a recessed well that fills with the light when checked.
 * `onChange` is the native event (`e.target.checked`).
 *
 * ```tsx
 * <GlassCheckbox label="Email me about replies" checked={on} onChange={(e) => setOn(e.target.checked)} />
 * ```
 */
export declare const GlassCheckbox: ({ label, description, invalid, wrapperClassName, indeterminate, className, ref, ...rest }: GlassCheckboxProps) => string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null | undefined;
export type GlassRadioProps = CheckProps;
/**
 * A native radio button. Give the radios in a group the same `name`; wrap
 * them in a `<fieldset>` with a `<legend>` to name the group.
 */
export declare const GlassRadio: ({ label, description, invalid, wrapperClassName, className, ...rest }: GlassRadioProps) => string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null | undefined;
export {};
