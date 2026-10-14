import { GlassGrid, GlassPanel } from 'glass-design-system';

const STATS = [
  { label: 'Snippets', value: '1 284' },
  { label: 'Copied this week', value: '342' },
  { label: 'Languages', value: '18' },
  { label: 'Collections', value: '27' },
];

// As many columns as fit, each at least `min` wide. Resize the window: no
// breakpoints involved.
export default function LayoutGrid() {
  return (
    <GlassGrid min="10rem" style={{ width: '100%' }}>
      {STATS.map((s) => (
        <GlassPanel key={s.label} radius="card" padding="sm">
          <p className="glass-caption">{s.label}</p>
          <p className="glass-h2" style={{ fontVariantNumeric: 'tabular-nums' }}>{s.value}</p>
        </GlassPanel>
      ))}
    </GlassGrid>
  );
}
