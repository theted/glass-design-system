import type { ComponentPropsWithRef, ReactNode } from 'react';
export type GlassSwitchProps = Omit<ComponentPropsWithRef<'button'>, 'onChange' | 'children' | 'defaultChecked'> & {
    /** Controlled state. Leave it out and use `defaultChecked` for uncontrolled. */
    checked?: boolean;
    defaultChecked?: boolean;
    /** Called with the new state. */
    onChange?: (checked: boolean) => void;
    /** Visible label, before the switch. Without it, pass `aria-label`. */
    children?: ReactNode;
    /** Default 'md' (44×26); 'sm' is 36×22. */
    size?: 'sm' | 'md';
    /** Fill the row: label on the left, switch on the right. For settings lists. */
    block?: boolean;
    /** Extra class on the outer label (when there is one). */
    wrapperClassName?: string;
};
/**
 * On or off, taking effect immediately. The recessed track fills with the
 * light when on and the thumb springs across. A `<button role="switch">`.
 *
 * ```tsx
 * <GlassSwitch checked={notify} onChange={setNotify}>Email me when someone replies</GlassSwitch>
 * ```
 */
export declare const GlassSwitch: ({ checked, defaultChecked, onChange, children, size, block, className, wrapperClassName, onClick, ...rest }: GlassSwitchProps) => import("react/jsx-runtime").JSX.Element;
