import React, { useState } from 'react';

export interface GlassSwitchProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'onChange' | 'children'> {
  /** Controlled state. Leave undefined and use `defaultChecked` for uncontrolled. */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  /** Visible label, rendered before the switch. Without it, pass `aria-label`. */
  children?: React.ReactNode;
  /** Default 'md'. */
  size?: 'sm' | 'md';
  /** Extra className on the outer label. */
  wrapperClassName?: string;
}

/**
 * GlassSwitch — an on/off toggle. The recessed track fills with the warm
 * light when on; the thumb springs across.
 *
 * ```tsx
 * <GlassSwitch checked={wifi} onChange={setWifi}>Wi-Fi</GlassSwitch>
 * ```
 */
const GlassSwitch: React.FC<GlassSwitchProps> = ({
  checked,
  defaultChecked = false,
  onChange,
  children,
  size = 'md',
  className = '',
  wrapperClassName = '',
  disabled,
  onClick,
  ...rest
}) => {
  const [inner, setInner] = useState(defaultChecked);
  const on = checked ?? inner;

  const button = (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      className={`glass-switch${size === 'sm' ? ' glass-switch--sm' : ''} ${className}`.trim()}
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

  if (!children) return button;

  // A <label> around a <button> names it and forwards clicks on the text.
  return (
    <label className={`glass-switch-row ${wrapperClassName}`.trim()}>
      <span>{children}</span>
      {button}
    </label>
  );
};

export default GlassSwitch;
