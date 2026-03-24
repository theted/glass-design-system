import React from 'react';
export type { GlassIntensity } from '../glass';
import type { GlassIntensity } from '../glass';
type Props = React.PropsWithChildren<{
    /** Controls opacity/blur/shadow depth. Scales against GlassProvider config. */
    intensity?: GlassIntensity;
    /** Show top-right ambient corner glow. Default true. */
    topGlow?: boolean;
    /** Show bottom-left ambient counter-glow. Default false. */
    bottomGlow?: boolean;
    /** Border-radius Tailwind class. Default 'rounded-[2.2rem]'. */
    rounded?: string;
    className?: string;
    style?: React.CSSProperties;
    /** Render as a different HTML element (e.g. 'form', 'section'). Default 'div'. */
    as?: React.ElementType;
    [key: string]: unknown;
}>;
declare const GlassPanel: React.FC<Props>;
export default GlassPanel;
