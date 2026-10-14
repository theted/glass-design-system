import { useState } from 'react';
import { GlassSlider, GlassStack } from 'glass-design-system';

// onChange hands you a number. format() shapes the value shown opposite the
// label.
export default function SliderBasic() {
  const [volume, setVolume] = useState(64);
  const [speed, setSpeed] = useState(1.25);

  return (
    <GlassStack gap={6} style={{ width: 'min(100%, 20rem)' }}>
      <GlassSlider label="Volume" value={volume} onChange={setVolume} format={(v) => `${v}%`} />
      <GlassSlider label="Playback speed" min={0.5} max={2} step={0.25} value={speed} onChange={setSpeed} format={(v) => `${v}×`} />
      <GlassSlider aria-label="Balance" min={-10} max={10} defaultValue={0} />
    </GlassStack>
  );
}
