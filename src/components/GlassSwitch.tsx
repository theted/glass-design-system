import { useState } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cx } from '../utils';

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
export const GlassSwitch = ({
  checked,
  defaultChecked = false,
  onChange,
  children,
  size = 'md',
  block = false,
  className,
  wrapperClassName,
  onClick,
  ...rest
}: GlassSwitchProps) => {
  const [inner, setInner] = useState(defaultChecked);
  const on = checked ?? inner;

  const button = (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      className={cx('glass-switch', size === 'sm' && 'glass-switch--sm', className)}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (checked === undefined) setInner(!on);
        onChange?.(!on);
      }}
      {...rest}
    >
      <span aria-hidden="true" className="glass-switch__thumb" />
    </button>
  );

  if (children == null) return button;

  // A <label> around the button names it and forwards clicks on the text.
  return (
    <label className={cx('glass-switch-row', block && 'glass-switch-row--block', wrapperClassName)}>
      <span>{children}</span>
      {button}
    </label>
  );
};
