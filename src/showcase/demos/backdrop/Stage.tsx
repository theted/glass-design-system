import { GlassBackdrop, GlassButton, GlassPanel, GlassStack } from 'glass-design-system';

// A backdrop fills the nearest .glass-stage (position: relative and
// isolation: isolate). For a whole page, <GlassBackdrop fixed /> once at the
// top of the app instead.
export default function BackdropStage() {
  return (
    <div className="glass-stage" style={{ display: 'grid', placeItems: 'center', width: '100%', minHeight: '20rem', borderRadius: 'var(--radius-sheet)', padding: 'var(--space-8)' }}>
      <GlassBackdrop palette="dusk" texture="grain" />
      <GlassPanel intensity="strong" glow style={{ maxWidth: '20rem' }}>
        <GlassStack gap={4}>
          <h3 className="glass-h3">On its own light</h3>
          <p className="glass-small">This stage has a dusk backdrop of its own; the page behind it keeps the site's.</p>
          <div>
            <GlassButton variant="primary">Looks good</GlassButton>
          </div>
        </GlassStack>
      </GlassPanel>
    </div>
  );
}
