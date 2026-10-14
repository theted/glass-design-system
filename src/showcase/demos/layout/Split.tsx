import { GlassButton, GlassPanel, GlassSplit, GlassStack } from 'glass-design-system';

// A fixed side next to a fluid main. They stack by themselves once the main
// would get narrower than half the row: no media query.
export default function LayoutSplit() {
  return (
    <GlassSplit side="12rem" gap={4} style={{ width: '100%' }}>
      <GlassPanel intensity="subtle" radius="card" padding="sm">
        <GlassStack gap={1}>
          {['Inbox', 'Starred', 'Archive'].map((item, i) => (
            <GlassButton key={item} variant="ghost" size="sm" aria-current={i === 0 ? 'page' : undefined} style={{ justifyContent: 'flex-start' }}>
              {item}
            </GlassButton>
          ))}
        </GlassStack>
      </GlassPanel>
      <GlassPanel radius="card">
        <h3 className="glass-h4">Inbox</h3>
        <p className="glass-small">Three new snippets were shared with you this week.</p>
      </GlassPanel>
    </GlassSplit>
  );
}
