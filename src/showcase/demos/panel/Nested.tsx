import { GlassBadge, GlassCluster, GlassPanel, GlassStack } from 'glass-design-system';

const FILES = [
  { name: 'debounce.ts', lang: 'TypeScript', edited: '2 min ago' },
  { name: 'useMeasure.tsx', lang: 'React', edited: '1 hour ago' },
  { name: 'retry.go', lang: 'Go', edited: 'Yesterday' },
];

// Depth reads at a glance when panes stack in order: subtle rows on a
// medium card, never the other way round. Each row is a panel rendered as a
// cluster (`as` takes components too, and their props stay typed).
export default function PanelNested() {
  return (
    <GlassPanel radius="card" padding="sm" style={{ width: 'min(100%, 26rem)' }}>
      <GlassStack gap={2}>
        <h3 className="glass-h4">Recent snippets</h3>
        {FILES.map((f) => (
          <GlassPanel
            key={f.name}
            as={GlassCluster}
            gap={3}
            intensity="subtle"
            radius="chip"
            padding="none"
            pointerLight={false}
            style={{ padding: 'var(--space-3) var(--space-4)' }}
          >
            <code style={{ flex: 1 }}>{f.name}</code>
            <GlassBadge>{f.lang}</GlassBadge>
            <span className="glass-caption">{f.edited}</span>
          </GlassPanel>
        ))}
      </GlassStack>
    </GlassPanel>
  );
}
