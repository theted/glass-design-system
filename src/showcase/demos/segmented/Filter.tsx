import { useState } from 'react';
import { GlassBadge, GlassCluster, GlassPanel, GlassSegmented, GlassStack } from 'glass-design-system';

const TASKS = [
  { title: 'Ship the backdrop palettes', done: true },
  { title: 'Write the migration guide', done: false },
  { title: 'Screenshot every example', done: false },
  { title: 'Drop the unused orb presets', done: true },
];

const FILTERS = ['All', 'Open', 'Done'] as const;

// block stretches the tray across its container, options sharing the width.
export default function SegmentedFilter() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('Open');
  const shown = TASKS.filter((t) => filter === 'All' || t.done === (filter === 'Done'));

  return (
    <GlassPanel radius="card" padding="sm" style={{ width: 'min(100%, 24rem)' }}>
      <GlassStack gap={4}>
        <GlassSegmented block size="sm" aria-label="Show" options={FILTERS} value={filter} onChange={setFilter} />
        <GlassStack as="ul" gap={3} style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {shown.map((t) => (
            <GlassCluster as="li" key={t.title} justify="between" gap={3}>
              <span className="glass-small" style={{ color: 'var(--color-text)' }}>{t.title}</span>
              <GlassBadge tone={t.done ? 'success' : 'neutral'}>{t.done ? 'Done' : 'Open'}</GlassBadge>
            </GlassCluster>
          ))}
        </GlassStack>
      </GlassStack>
    </GlassPanel>
  );
}
