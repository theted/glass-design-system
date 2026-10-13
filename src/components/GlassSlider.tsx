import React, { useState } from 'react';

export interface GlassSliderProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange' | 'value' | 'defaultValue' | 'type'> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Visible label above the track. Without it, pass `aria-label`. */
  label?: React.ReactNode;
  /** Show the current value opposite the label. Default true when `label` is set. */
  showValue?: boolean;
  /** Format the shown value, e.g. (v) => `${v}px`. */
  format?: (value: number) => string;
  /** Extra className on the outer wrapper. */
  wrapperClassName?: string;
}

/**
 * GlassSlider — a range input on a recessed glass track. The filled part of
 * the track is the warm light; the thumb is a bead of frosted glass.
 *
 * ```tsx
 * <GlassSlider label="Blur" min={0} max={80} value={blur} onChange={setBlur} format={(v) => `${v}px`} />
 * ```
 */
const GlassSlider: React.FC<GlassSliderProps> = ({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue,
  format = String,
  className = '',
  wrapperClassName = '',
  style,
  ...rest
}) => {
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
      className={`glass-slider ${className}`.trim()}
      style={{ '--fill': `${fill}%`, ...style } as React.CSSProperties}
      {...rest}
    />
  );

  if (!label) return input;

  return (
    <label className={`glass-slider-field ${wrapperClassName}`.trim()}>
      <span className="glass-slider-field__head">
        <span>{label}</span>
        {(showValue ?? true) && <span className="glass-slider-field__value">{format(current)}</span>}
      </span>
      {input}
    </label>
  );
};

export default GlassSlider;
