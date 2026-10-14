import { useState } from 'react';
import { GlassAvatar, GlassBadge, GlassCluster, GlassGrid, GlassPanel, GlassSegmented, GlassStack } from 'glass-design-system';

const SERIES: Record<string, number[]> = {
  '7 days': [42, 38, 51, 47, 63, 58, 71],
  '30 days': [30, 34, 31, 38, 42, 40, 45, 43, 49, 47, 52, 55, 51, 58, 61, 57, 63, 60, 66, 70, 64, 69, 72, 68, 75, 73, 78, 74, 80, 84],
};

const STATS = [
  { label: 'Copies', value: '2 418', change: '+12%' },
  { label: 'New snippets', value: '86', change: '+4%' },
  { label: 'Searches', value: '9 302', change: '−3%' },
];

const ACTIVITY = [
  { who: 'Grace Hopper', what: 'copied retry-with-backoff.go', when: '2 min', tone: 'neutral' as const },
  { who: 'Alan Turing', what: 'starred useMeasure.tsx', when: '18 min', tone: 'light' as const },
  { who: 'Ada Lovelace', what: 'published oklch-mix.css', when: '1 h', tone: 'success' as const },
];

/** An area chart in plain SVG: values to points, points to a path. */
const Sparkline = ({ values }: { values: number[] }) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values.map((v, i) => [(i / (values.length - 1)) * 100, 36 - ((v - min) / (max - min || 1)) * 30]);
  const line = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  const [lx, ly] = points[points.length - 1];

  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ width: '100%', height: '9rem', overflow: 'visible' }} aria-hidden="true">
      <defs>
        <linearGradient id="dash-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-light)" stopOpacity="0.32" />
          <stop offset="1" stopColor="var(--color-light)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[10, 20, 30].map((y) => (
        <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="var(--color-line)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
      ))}
      <path d={`${line} L100,40 L0,40 Z`} fill="url(#dash-fill)" />
      <path d={line} fill="none" stroke="var(--color-light)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="1.6" fill="var(--color-light-bright)" />
    </svg>
  );
};

export default function Dashboard() {
  const [range, setRange] = useState('30 days');

  return (
    <GlassStack gap={4} style={{ width: 'min(100%, 56rem)' }}>
      <GlassGrid min="11rem" gap={4}>
        {STATS.map((s) => (
          <GlassPanel key={s.label} radius="card" padding="sm">
            <GlassStack gap={2}>
              <span className="glass-caption">{s.label}</span>
              <GlassCluster justify="between" style={{ alignItems: 'baseline' }}>
                <span className="glass-h3" style={{ fontVariantNumeric: 'tabular-nums' }}>{s.value}</span>
                <GlassBadge tone={s.change.startsWith('+') ? 'success' : 'warning'}>{s.change}</GlassBadge>
              </GlassCluster>
            </GlassStack>
          </GlassPanel>
        ))}
      </GlassGrid>

      <GlassGrid min="20rem" gap={4}>
        <GlassPanel radius="card" padding="sm" glow>
          <GlassStack gap={4}>
            <GlassCluster justify="between">
              <GlassStack gap={1}>
                <h3 className="glass-h4">Copies per day</h3>
                <span className="glass-caption">Peak {Math.max(...SERIES[range])} on the last day</span>
              </GlassStack>
              <GlassSegmented size="sm" aria-label="Range" options={Object.keys(SERIES)} value={range} onChange={setRange} />
            </GlassCluster>
            <Sparkline values={SERIES[range]} />
          </GlassStack>
        </GlassPanel>

        <GlassPanel radius="card" padding="sm">
          <GlassStack gap={4}>
            <h3 className="glass-h4">Activity</h3>
            {ACTIVITY.map((a) => (
              <GlassCluster key={a.who} gap={3} style={{ flexWrap: 'nowrap' }}>
                <GlassAvatar name={a.who} aria-hidden="true" />
                <p className="glass-small" style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ color: 'var(--color-text)', fontWeight: 500 }}>{a.who}</strong> {a.what}
                </p>
                <GlassBadge tone={a.tone}>{a.when}</GlassBadge>
              </GlassCluster>
            ))}
          </GlassStack>
        </GlassPanel>
      </GlassGrid>
    </GlassStack>
  );
}
