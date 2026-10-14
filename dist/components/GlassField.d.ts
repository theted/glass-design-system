import type { ReactNode } from 'react';
interface FieldContextValue {
    id: string;
    describedBy?: string;
    invalid: boolean;
    required?: boolean;
}
/**
 * The id, description and validity a control inside a GlassField should
 * carry. Input, Textarea and Select read it themselves; call this to wire up
 * your own control.
 */
export declare const useGlassField: () => FieldContextValue | null;
/** Props a control takes from the field around it, overridden by its own. */
export declare const useFieldProps: (own: {
    id?: string;
    invalid?: boolean;
    required?: boolean;
    "aria-describedby"?: string;
}) => {
    id: string | undefined;
    required: boolean | undefined;
    'aria-invalid': true | undefined;
    'aria-describedby': string | undefined;
};
export interface GlassFieldProps {
    /** What the control is for. Always visible: a placeholder isn't a label. */
    label: ReactNode;
    /** One line of help under the control. */
    hint?: ReactNode;
    /** What's wrong and how to fix it. Marks the control invalid. */
    error?: ReactNode;
    /** Passed to the control, which shows the browser's own validation. */
    required?: boolean;
    /** Says "Optional" after the label. Mark the few optional fields, not the many required ones. */
    optional?: boolean;
    /** The control's id. Generated when omitted. */
    id?: string;
    className?: string;
    /** One GlassInput, GlassTextarea or GlassSelect. */
    children: ReactNode;
}
/**
 * A label, a control, and the words around it. Wires them together: the
 * label points at the control, the hint and error describe it, and an error
 * marks it invalid.
 *
 * ```tsx
 * <GlassField label="Email" hint="Only used to reply." error={errors.email}>
 *   <GlassInput type="email" autoComplete="email" />
 * </GlassField>
 * ```
 */
export declare const GlassField: ({ label, hint, error, required, optional, id, className, children }: GlassFieldProps) => import("react/jsx-runtime").JSX.Element;
export {};
