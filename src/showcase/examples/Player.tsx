import { useState } from 'react';
import { GlassButton, GlassCluster, GlassPanel, GlassSlider, GlassStack } from 'glass-design-system';
import { HeartIcon, NextIcon, PauseIcon, PlayIcon, PrevIcon } from '../demos/icons';

const LENGTH = 221;
const time = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function Player() {
  const [playing, setPlaying] = useState(true);
  const [at, setAt] = useState(74);
  const [liked, setLiked] = useState(false);

  return (
    <GlassPanel intensity="strong" radius="sheet" padding="sm" glow style={{ width: 'min(100%, 22rem)' }}>
      <GlassStack gap={6}>
        <div
          aria-hidden="true"
          style={{
            aspectRatio: '1',
            borderRadius: 'calc(var(--radius-sheet) - var(--space-6))',
            background:
              'radial-gradient(circle at 72% 24%, oklch(0.95 0.08 85), oklch(0.78 0.16 55) 18%, oklch(0.55 0.2 20) 38%, transparent 62%), linear-gradient(160deg, oklch(0.42 0.16 285), oklch(0.2 0.08 262))',
            boxShadow: 'inset 0 0 0 1px oklch(1 0 0 / 0.12), var(--elevation-2)',
          }}
        />

        <GlassCluster justify="between" style={{ flexWrap: 'nowrap' }}>
          <GlassStack gap={1} style={{ minWidth: 0 }}>
            <h3 className="glass-h3">Low sun, cold water</h3>
            <p className="glass-small">Kosta Ensemble</p>
          </GlassStack>
          <GlassButton icon variant="ghost" pressed={liked} onClick={() => setLiked(!liked)} aria-label="Like">
            <HeartIcon style={liked ? { fill: 'currentColor', color: 'var(--color-light)' } : undefined} />
          </GlassButton>
        </GlassCluster>

        <GlassStack gap={2}>
          <GlassSlider aria-label="Position" min={0} max={LENGTH} value={at} onChange={setAt} />
          <GlassCluster justify="between" className="glass-caption" style={{ fontVariantNumeric: 'tabular-nums' }}>
            <span>{time(at)}</span>
            <span>−{time(LENGTH - at)}</span>
          </GlassCluster>
        </GlassStack>

        <GlassCluster justify="center" gap={4}>
          <GlassButton icon variant="ghost" size="lg" aria-label="Previous" onClick={() => setAt(0)}>
            <PrevIcon />
          </GlassButton>
          <GlassButton icon variant="primary" size="lg" aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying(!playing)} style={{ width: '3.5rem', minHeight: '3.5rem' }}>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </GlassButton>
          <GlassButton icon variant="ghost" size="lg" aria-label="Next">
            <NextIcon />
          </GlassButton>
        </GlassCluster>
      </GlassStack>
    </GlassPanel>
  );
}
