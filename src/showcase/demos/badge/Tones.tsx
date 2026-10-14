import { GlassBadge, GlassCluster } from 'glass-design-system';

// Neutral is clear glass. The light tone is the warm accent: keep it for
// the one thing that's new or yours.
export default function BadgeTones() {
  return (
    <GlassCluster gap={3} justify="center">
      <GlassBadge>TypeScript</GlassBadge>
      <GlassBadge tone="light">New</GlassBadge>
      <GlassBadge tone="success" dot>Live</GlassBadge>
      <GlassBadge tone="warning">Draft</GlassBadge>
      <GlassBadge tone="danger" dot>Failing</GlassBadge>
      <GlassBadge tone="info">Beta</GlassBadge>
    </GlassCluster>
  );
}
