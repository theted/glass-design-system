import { GlassGrid, GlassPanel } from 'glass-design-system';

// reveal: frost condenses onto each pane the first time it scrolls into
// view. Opt in where an entrance helps; motion should answer something.
// Reduced motion skips it.
export default function HooksReveal() {
  return (
    <GlassGrid min="10rem" style={{ width: '100%' }}>
      {['Plan', 'Build', 'Ship'].map((step) => (
        <GlassPanel key={step} reveal radius="card">
          <h3 className="glass-h4">{step}</h3>
          <p className="glass-small">Scroll away and back: it only plays once.</p>
        </GlassPanel>
      ))}
    </GlassGrid>
  );
}
