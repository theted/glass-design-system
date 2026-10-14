import { GlassGrid, GlassPanel } from 'glass-design-system';

export default function PanelOptions() {
  return (
    <GlassGrid min="12rem" style={{ width: '100%' }}>
      <GlassPanel glow radius="card">
        <h3 className="glass-h4">glow</h3>
        <p className="glass-small">The light pooling in the corner it comes from.</p>
      </GlassPanel>
      <GlassPanel prism radius="card">
        <h3 className="glass-h4">prism</h3>
        <p className="glass-small">Thick glass splitting the light along the rim.</p>
      </GlassPanel>
      <GlassPanel tilt radius="card">
        <h3 className="glass-h4">tilt</h3>
        <p className="glass-small">Leans away from the pointer, like pressing on a pane.</p>
      </GlassPanel>
      <GlassPanel pointerLight={false} radius="card">
        <h3 className="glass-h4">pointerLight off</h3>
        <p className="glass-small">The light stays in the upper right.</p>
      </GlassPanel>
    </GlassGrid>
  );
}
