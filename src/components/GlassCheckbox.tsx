import { useLayoutEffect, useRef } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx, useMergedRef } from '../utils';

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

const withLabel = (input: ReactNode, { label, description, wrapperClassName }: CheckOwnProps) =>
  label == null ? (
    input
  ) : (
    <label className={cx('glass-check', wrapperClassName)}>
      {input}
      <span className="glass-check__text">
        <span>{label}</span>
        {description != null && <span className="glass-check__description">{description}</span>}
      </span>
    </label>
  );

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
export const GlassCheckbox = ({
  label,
  description,
  invalid,
  wrapperClassName,
  indeterminate = false,
  className,
  ref,
  ...rest
}: GlassCheckboxProps) => {
  const own = useRef<HTMLInputElement>(null);
  const setRef = useMergedRef(own, ref);

  // indeterminate is a property, not an attribute.
  useLayoutEffect(() => {
    if (own.current) own.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const input = (
    <input
      ref={setRef}
      type="checkbox"
      aria-invalid={invalid || undefined}
      className={cx('glass-checkbox', className)}
      {...rest}
    />
  );
  return withLabel(input, { label, description, wrapperClassName });
};

export type GlassRadioProps = CheckProps;

/**
 * A native radio button. Give the radios in a group the same `name`; wrap
 * them in a `<fieldset>` with a `<legend>` to name the group.
 */
export const GlassRadio = ({ label, description, invalid, wrapperClassName, className, ...rest }: GlassRadioProps) => {
  const input = (
    <input type="radio" aria-invalid={invalid || undefined} className={cx('glass-checkbox', className)} {...rest} />
  );
  return withLabel(input, { label, description, wrapperClassName });
};
