import { GlassBadge, GlassCluster, GlassPanel, GlassStack } from 'glass-design-system';

// Gaps only take steps on the spacing scale (1 2 3 4 6 8 12 16 24 32), so
// a layout can't drift off the grid. Big gaps hold small ones.
export default function LayoutStack() {
  return (
    <GlassPanel radius="card" style={{ width: 'min(100%, 24rem)' }}>
      <GlassStack gap={6}>
        <GlassStack gap={2}>
          <h3 className="glass-h4">Invoice #2041</h3>
          <p className="glass-small">Due Friday. Paid by card ending 4242.</p>
        </GlassStack>
        <GlassStack gap={1}>
          <span className="glass-caption">Total</span>
          <span className="glass-h3">1 240 kr</span>
        </GlassStack>
        <GlassCluster gap={2}>
          <GlassBadge tone="success">Paid</GlassBadge>
          <GlassBadge>PDF</GlassBadge>
        </GlassCluster>
      </GlassStack>
    </GlassPanel>
  );
}
