import type { ComponentPropsWithRef, ReactNode } from 'react';
export type GlassSliderProps = Omit<ComponentPropsWithRef<'input'>, 'onChange' | 'value' | 'defaultValue' | 'type' | 'min' | 'max' | 'step'> & {
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
export declare const GlassSlider: ({ value, defaultValue, onChange, min, max, step, label, showValue, format, className, wrapperClassName, style, ...rest }: GlassSliderProps) => import("react/jsx-runtime").JSX.Element;
