import { GlassCluster, GlassKbd, GlassPanel, GlassStack } from 'glass-design-system';

const SHORTCUTS = [
  { keys: ['⌘', 'K'], action: 'Search everything' },
  { keys: ['⌘', 'Enter'], action: 'Save and close' },
  { keys: ['Shift', '?'], action: 'Show shortcuts' },
];

export default function BadgeShortcuts() {
  return (
    <GlassPanel radius="card" padding="sm" style={{ width: 'min(100%, 22rem)' }}>
      <GlassStack gap={3}>
        {SHORTCUTS.map((s) => (
          <GlassCluster key={s.action} justify="between">
            <span className="glass-small">{s.action}</span>
            <GlassCluster gap={1}>
              {s.keys.map((k) => (
                <GlassKbd key={k}>{k}</GlassKbd>
              ))}
            </GlassCluster>
          </GlassCluster>
        ))}
      </GlassStack>
    </GlassPanel>
  );
}
