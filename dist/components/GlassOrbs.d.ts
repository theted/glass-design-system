import React from 'react';
import '../orbs.css';
export type OrbPreset = 'drift' | 'pulse' | 'aurora' | 'float' | 'breathe' | 'lava' | 'orbit' | 'silk' | 'tide' | 'nebula' | 'ember';
export type OrbBlendMode = 'screen' | 'normal' | 'soft-light' | 'overlay' | 'hard-light' | 'color-dodge';
export interface GlassOrbsProps {
    /**
     * Animation preset.
     * - `drift`   – Large orbs slowly drifting across the viewport (classic)
     * - `pulse`   – Orbs that gently breathe in size and opacity
     * - `aurora`  – Elongated horizontal bands shimmering like northern lights
     * - `float`   – Smaller orbs floating upward in a gentle loop
     * - `breathe` – Very subtle, slow-breathing ambient glow
     * - `lava`    – Slow-morphing organic blobs
     * - `orbit`   – Smooth circular orbital paths
     * - `silk`    – Ultra-smooth diagonal flows
     * - `tide`    – Horizontal wave-like undulation
     * - `nebula`  – Deep cosmic drifts with rich color mixing
     * - `ember`   – Warm flickering glow
     */
    preset?: OrbPreset;
    /** Override the base animation speed in seconds (default 6). */
    speed?: number;
    /** Override global orb opacity 0–1 (default 0.95). */
    opacity?: number;
    /** Use position:fixed to cover the full viewport (default false — uses absolute). */
    fixed?: boolean;
    /** Mix-blend-mode for each orb (default 'screen'). */
    blendMode?: OrbBlendMode;
    /** Extra CSS class on the root element. */
    className?: string;
}
declare const GlassOrbs: React.FC<GlassOrbsProps>;
export default GlassOrbs;
