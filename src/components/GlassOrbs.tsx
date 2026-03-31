import React from 'react';
import '../orbs.css';

// ── Preset definitions ───────────────────────────────────────────────────────

export type OrbPreset =
  | 'drift'
  | 'pulse'
  | 'aurora'
  | 'float'
  | 'breathe'
  | 'lava';

export interface GlassOrbsProps {
  /**
   * Animation preset.
   * - `drift`   – Large orbs slowly drifting across the viewport (classic)
   * - `pulse`   – Orbs that gently breathe in size and opacity
   * - `aurora`  – Elongated horizontal bands shimmering like northern lights
   * - `float`   – Smaller orbs floating upward in a gentle loop
   * - `breathe` – Very subtle, slow-breathing ambient glow
   * - `lava`    – Slow-morphing organic blobs
   */
  preset?: OrbPreset;
  /** Override the base animation speed in seconds (default 6). */
  speed?: number;
  /** Override global orb opacity 0–1 (default 0.95). */
  opacity?: number;
  /** Extra CSS class on the root element. */
  className?: string;
}

const GlassOrbs: React.FC<GlassOrbsProps> = ({
  preset = 'drift',
  speed = 6,
  opacity = 0.95,
  className = '',
}) => {
  const vars = {
    '--orb-speed': `${speed}s`,
    '--orb-opacity': String(opacity),
  } as React.CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={`glass-orbs glass-orbs--${preset} ${className}`.trim()}
      style={vars}
    >
      <div className="glass-orb glass-orb-1" />
      <div className="glass-orb glass-orb-2" />
      <div className="glass-orb glass-orb-3" />
      <div className="glass-orb glass-orb-4" />
      <div className="glass-orb glass-orb-5" />
      <div className="glass-orb glass-orb-6" />
    </div>
  );
};

export default GlassOrbs;
