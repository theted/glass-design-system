import React from 'react';
export interface GlassSwitchProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'onChange' | 'children'> {
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
declare const GlassSwitch: React.FC<GlassSwitchProps>;
export default GlassSwitch;
