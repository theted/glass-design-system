import { GlassBadge, GlassCluster, GlassPanel, GlassStack } from 'glass-design-system';
import { ArrowRightIcon } from '../icons';

// A whole card that's one link. `as="a"` keeps every <a> prop typed, and the
// panel gets a focus ring of its own.
export default function PanelLinkCard() {
  return (
    <GlassPanel as="a" href="#link-card" tilt radius="card" padding="sm" style={{ maxWidth: '21rem' }}>
      <GlassStack gap={3}>
        <GlassCluster>
          <GlassBadge tone="success" dot>Live</GlassBadge>
          <GlassBadge>WebGPU</GlassBadge>
        </GlassCluster>
        <h3 className="glass-h3">Particles</h3>
        <p className="glass-small">Millions of glowing particles you steer through 3D space with the mouse.</p>
        <GlassCluster gap={1} className="glass-label">
          Open project <ArrowRightIcon />
        </GlassCluster>
      </GlassStack>
    </GlassPanel>
  );
}
