import { GlassButton, GlassCluster } from 'glass-design-system';

// Heights come from the shared control scale (28 / 34 / 40 / 48px), so a
// button and a field of the same size line up in a row.
export default function ButtonSizes() {
  return (
    <GlassCluster gap={3} justify="center">
      <GlassButton size="xs">Extra small</GlassButton>
      <GlassButton size="sm">Small</GlassButton>
      <GlassButton>Medium</GlassButton>
      <GlassButton size="lg" variant="primary">Large</GlassButton>
    </GlassCluster>
  );
}
