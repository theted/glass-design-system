import { useState } from 'react';
import type { ComponentPropsWithRef, CSSProperties, ReactNode } from 'react';
import { cx } from '../utils';

export type GlassSliderProps = Omit<
  ComponentPropsWithRef<'input'>,
  'onChange' | 'value' | 'defaultValue' | 'type' | 'min' | 'max' | 'step'
> & {
  value?: number;
  defaultValue?: number;
  /** Called with the new value as a number. */
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Visible label above the track. Without it, pass `aria-label`. */
  label?: ReactNode;
  /** Show the current value opposite the label. Default true when there's a label. */
  showValue?: boolean;
  /** Format the shown value, e.g. (v) => `${v}px`. */
  format?: (value: number) => string;
  /** Extra class on the outer label (when there is one). */
  wrapperClassName?: string;
};

/**
 * A native range input on a recessed track. The filled part is the light;
 * the thumb is a bead of frosted glass.
 *
 * ```tsx
 * <GlassSlider label="Blur" min={0} max={80} value={blur} onChange={setBlur} format={(v) => `${v}px`} />
 * ```
 */
export const GlassSlider = ({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  format = String,
  className,
  wrapperClassName,
  style,
  ...rest
}: GlassSliderProps) => {
  const [inner, setInner] = useState(defaultValue ?? min);
  const current = value ?? inner;
  const fill = max === min ? 0 : ((current - min) / (max - min)) * 100;

  const input = (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={current}
      onChange={(e) => {
        const next = Number(e.target.value);
        if (value === undefined) setInner(next);
        onChange?.(next);
      }}
      className={cx('glass-slider', className)}
      style={{ '--fill': `${fill}%`, ...style } as CSSProperties}
      {...rest}
    />
  );

  if (label == null) return input;

  return (
    <label className={cx('glass-slider-field', wrapperClassName)}>
      <span className="glass-slider-field__head">
        <span>{label}</span>
        {showValue && <span className="glass-slider-field__value">{format(current)}</span>}
      </span>
      {input}
    </label>
  );
};
