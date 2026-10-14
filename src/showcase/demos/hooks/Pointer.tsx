import { useRef } from 'react';
import { useGlassPointer } from 'glass-design-system';

// Your own element, the full material: give it the class and the hook. The
// hook writes three CSS variables per frame; React never re-renders.
export default function HooksPointer() {
  const ref = useRef<HTMLButtonElement>(null);
  useGlassPointer(ref);

  return (
    <button ref={ref} type="button" className="glass glass--strong glass--radius-round glass--prism" style={{ padding: 'var(--space-4) var(--space-8)', color: 'var(--color-text)', font: 'inherit', fontWeight: 500, border: 0, cursor: 'pointer' }}>
      A custom glass button
    </button>
  );
}
