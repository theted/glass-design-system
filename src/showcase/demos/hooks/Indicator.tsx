import { useRef, useState } from 'react';
import { useGlassIndicator } from 'glass-design-system';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

// The gliding pane from GlassNav and GlassSegmented, for your own widgets:
// render a .glass-indicator and name the selected item with a selector.
export default function HooksIndicator() {
  const ref = useRef<HTMLDivElement>(null);
  const [day, setDay] = useState('Wed');
  useGlassIndicator(ref, '[aria-selected="true"]');

  return (
    <div ref={ref} role="tablist" aria-label="Day" style={{ position: 'relative', isolation: 'isolate', display: 'flex', gap: 'var(--space-1)' }}>
      <span aria-hidden="true" className="glass-indicator" />
      {DAYS.map((d) => (
        <button
          key={d}
          type="button"
          role="tab"
          aria-selected={d === day}
          onClick={() => setDay(d)}
          className="glass-button glass-button--ghost glass-button--sm"
        >
          {d}
        </button>
      ))}
    </div>
  );
}
