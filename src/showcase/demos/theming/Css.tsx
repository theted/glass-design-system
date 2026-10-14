import type { CSSProperties } from 'react';

// The knobs are plain CSS custom properties, so any element can retune the
// glass inside it, with or without React:
//
//   :root        { --glass-blur: 24px; }
//   .sidebar     { --glass-opacity: 0.9; }
//   .danger-zone { --glass-hue: 20; --light-hue: 30; }
//
// Blur, opacity and sheen apply anywhere. The two hues recolour derived
// tokens, so set them on :root or on an element with class="glass-scope".
export default function ThemingCss() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', justifyContent: 'center' }}>
      <div className="glass glass--pad-sm" style={{ '--glass-blur': '4px' } as CSSProperties}>
        <p className="glass-label">--glass-blur: 4px</p>
      </div>
      <div className="glass glass--pad-sm" style={{ '--glass-opacity': 1 } as CSSProperties}>
        <p className="glass-label">--glass-opacity: 1</p>
      </div>
      <div className="glass-scope" style={{ '--glass-hue': 20, '--light-hue': 30 } as CSSProperties}>
        <div className="glass glass--pad-sm glass--glow">
          <p className="glass-label">--glass-hue: 20</p>
        </div>
      </div>
    </div>
  );
}
