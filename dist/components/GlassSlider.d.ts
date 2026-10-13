import React from 'react';
export interface GlassSliderProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange' | 'value' | 'defaultValue' | 'type'> {
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
declare const GlassSlider: React.FC<GlassSliderProps>;
export default GlassSlider;
