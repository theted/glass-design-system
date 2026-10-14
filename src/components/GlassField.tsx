import { createContext, useContext, useId } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../utils';

interface FieldContextValue {
  id: string;
  describedBy?: string;
  invalid: boolean;
  required?: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

/**
 * The id, description and validity a control inside a GlassField should
 * carry. Input, Textarea and Select read it themselves; call this to wire up
 * your own control.
 */
export const useGlassField = () => useContext(FieldContext);

/** Props a control takes from the field around it, overridden by its own. */
export const useFieldProps = (own: {
  id?: string;
  invalid?: boolean;
  required?: boolean;
  'aria-describedby'?: string;
}) => {
  const field = useGlassField();
  const invalid = own.invalid ?? field?.invalid;
  return {
    // Inside a field, the field's id wins: its label already points at it.
    id: field?.id ?? own.id,
    required: own.required ?? field?.required,
    'aria-invalid': invalid || undefined,
    'aria-describedby': cx(field?.describedBy, own['aria-describedby']) || undefined,
  };
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
  /** The control's id: set it here rather than on the control. Generated when omitted. */
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
export const GlassField = ({ label, hint, error, required, optional, id, className, children }: GlassFieldProps) => {
  const auto = useId();
  const controlId = id ?? `field-${auto}`;
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;

  return (
    <FieldContext.Provider
      value={{ id: controlId, describedBy: cx(hintId, errorId) || undefined, invalid: Boolean(error), required }}
    >
      <div className={cx('glass-field', className)}>
        <label className="glass-field__label" htmlFor={controlId}>
          {label}
          {optional && <span className="glass-field__optional">Optional</span>}
        </label>
        {children}
        {hint && (
          <p id={hintId} className="glass-field__hint">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="glass-field__error">
            {error}
          </p>
        )}
      </div>
    </FieldContext.Provider>
  );
};
