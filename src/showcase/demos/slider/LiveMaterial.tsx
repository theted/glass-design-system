import { useState } from 'react';
import { GlassPanel, GlassProvider, GlassSlider, GlassStack } from 'glass-design-system';

// The material's knobs on sliders. GlassProvider retunes only what's
// inside it: here, one pane.
export default function SliderLiveMaterial() {
  const [blur, setBlur] = useState(40);
  const [opacity, setOpacity] = useState(0.66);

  return (
    <GlassStack gap={6} style={{ width: 'min(100%, 24rem)' }}>
      <GlassProvider blur={blur} opacity={opacity}>
        <GlassPanel intensity="medium" glow>
          <h3 className="glass-h4">Frosted to taste</h3>
          <p className="glass-small">Drag the sliders and watch this pane, and only this pane, change.</p>
        </GlassPanel>
      </GlassProvider>
      <GlassSlider label="Blur" min={0} max={80} value={blur} onChange={setBlur} format={(v) => `${v}px`} />
      <GlassSlider label="Opacity" min={0} max={1} step={0.01} value={opacity} onChange={setOpacity} format={(v) => v.toFixed(2)} />
    </GlassStack>
  );
}
