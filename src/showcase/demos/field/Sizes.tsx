import { GlassButton, GlassCluster, GlassInput, GlassStack } from 'glass-design-system';

// Fields and buttons share the control heights, so a row of the same size
// lines up with no extra CSS.
export default function FieldSizes() {
  return (
    <GlassStack gap={4} style={{ width: 'min(100%, 26rem)' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <GlassCluster key={size} style={{ flexWrap: 'nowrap' }}>
          <GlassInput size={size} aria-label={`Email (${size})`} placeholder={`Email, size ${size}`} />
          <GlassButton size={size} variant={size === 'lg' ? 'primary' : 'secondary'}>
            Subscribe
          </GlassButton>
        </GlassCluster>
      ))}
    </GlassStack>
  );
}
