import { GLASS_PALETTES, GlassBackdrop, GlassGrid } from 'glass-design-system';

// Every palette, holding still. Orbs are sized in container units, so a
// backdrop fills whatever box it's in, down to a thumbnail.
export default function BackdropStill() {
  return (
    <GlassGrid min="9rem" gap={3} style={{ width: '100%' }}>
      {GLASS_PALETTES.map((palette) => (
        <figure key={palette} style={{ margin: 0 }}>
          <div className="glass-stage" style={{ aspectRatio: '4 / 3', borderRadius: 'var(--radius-card)' }}>
            <GlassBackdrop palette={palette} motion={false} />
          </div>
          <figcaption className="glass-caption" style={{ marginTop: 'var(--space-2)' }}>{palette}</figcaption>
        </figure>
      ))}
    </GlassGrid>
  );
}
