import { GlassContainer, GlassStack } from 'glass-design-system';

// A page column: centred, capped at 76rem (wide: 96rem, narrow: 48rem),
// with the fluid page gutter on both sides. .glass-section adds the
// vertical rhythm between sections.
export default function LayoutContainer() {
  return (
    <GlassContainer as="section" width="narrow" className="glass-section" style={{ outline: '1px dashed var(--color-line-strong)', borderRadius: 'var(--radius-card)' }}>
      <GlassStack gap={3}>
        <h3 className="glass-h3">Narrow container</h3>
        <p className="glass-body">
          For reading: a long article, a sign-up form, settings. The dashed
          line shows its edge; the gutter keeps text off it on a phone.
        </p>
      </GlassStack>
    </GlassContainer>
  );
}
