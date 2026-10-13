import React, { useState } from 'react';
import { GlassPanel, GlassPill, GlassDivider, GlassOrbs, GlassSlider, GlassSegmented, type OrbPreset, type OrbBlendMode } from 'glass-design-system';
import { PageHeader, Section } from '../components/Page';
import { useBackground } from '../context/BackgroundContext';

// ── Preset catalogue ─────────────────────────────────────────────────────────

const PRESETS: { id: OrbPreset; label: string; description: string }[] = [
  {
    id: 'drift',
    label: 'Drift',
    description:
      'Large orbs slowly drifting across the viewport. The classic orb background — great for landing pages and hero sections.',
  },
  {
    id: 'pulse',
    label: 'Pulse',
    description:
      'Orbs that gently breathe in size and opacity. Adds a living, organic quality to any surface.',
  },
  {
    id: 'aurora',
    label: 'Aurora',
    description:
      'Elongated horizontal bands shimmering like northern lights. Beautiful for full-bleed backgrounds with depth.',
  },
  {
    id: 'float',
    label: 'Float',
    description:
      'Smaller orbs floating upward in a gentle loop. Evokes rising particles or bubbles — ideal for ambient energy.',
  },
  {
    id: 'breathe',
    label: 'Breathe',
    description:
      'Very subtle, ultra-slow ambient background glow. The quietest preset — perfect for apps that need focus.',
  },
  {
    id: 'lava',
    label: 'Lava',
    description:
      'Slow-morphing organic blobs with warm tones. Adds a molten, dynamic quality with gentle rotation.',
  },
  {
    id: 'orbit',
    label: 'Orbit',
    description:
      'Smooth circular orbital paths with staggered timing. A calm, planetarium-like feel with layered depth.',
  },
  {
    id: 'silk',
    label: 'Silk',
    description:
      'Ultra-smooth diagonal flows with elongated shapes. Overlapping ribbons of color that glide and layer.',
  },
  {
    id: 'tide',
    label: 'Tide',
    description:
      'Horizontal wave-like undulation — calm oceanic motion. Orbs sway side-to-side in a soothing rhythm.',
  },
  {
    id: 'nebula',
    label: 'Nebula',
    description:
      'Deep cosmic drifts with rich color mixing. Very slow, majestic motion — purples, magentas, and deep blues.',
  },
  {
    id: 'ember',
    label: 'Ember',
    description:
      'Warm flickering glow with gentle scale pulses. Orbs shimmer and breathe like embers in a dying fire.',
  },
  {
    id: 'kiln',
    label: 'Kiln',
    description:
      'The house look: a cobalt field with one low amber sun that rises and sets very slowly. Cool glass, warm light.',
  },
];

// ── Speed / opacity controls ─────────────────────────────────────────────────

const BLEND_MODES: OrbBlendMode[] = ['screen', 'normal', 'soft-light', 'overlay', 'hard-light', 'color-dodge'];

const OrbControls: React.FC<{
  speed: number;
  onSpeed: (v: number) => void;
  opacity: number;
  onOpacity: (v: number) => void;
  blendMode: OrbBlendMode;
  onBlendMode: (v: OrbBlendMode) => void;
}> = ({ speed, onSpeed, opacity, onOpacity, blendMode, onBlendMode }) => (
  <div className="grid grid-cols-1 items-end gap-[var(--space-6)] md:grid-cols-[1fr_1fr_auto]">
    <GlassSlider label="Speed" min={1} max={16} step={0.5} value={speed} onChange={onSpeed} format={(v) => `${v}s`} />
    <GlassSlider label="Opacity" min={0.1} max={1} step={0.05} value={opacity} onChange={onOpacity} format={(v) => v.toFixed(2)} />
    <div className="glass-stack min-w-0 [--stack:var(--space-2)]">
      <span className="glass-slider-field__head">Blend</span>
      <GlassSegmented size="sm" aria-label="Blend mode" options={BLEND_MODES} value={blendMode} onChange={onBlendMode} />
    </div>
  </div>
);

// ── Live preview pane ────────────────────────────────────────────────────────

const PreviewPane: React.FC<{
  preset: OrbPreset;
  speed: number;
  opacity: number;
  blendMode: OrbBlendMode;
}> = ({ preset, speed, opacity, blendMode }) => {
  const current = PRESETS.find((p) => p.id === preset)!;
  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: '50vh',
        minHeight: 340,
        borderRadius: '1.6rem',
        background: 'oklch(0.08 0.022 248)',
      }}
    >
      <GlassOrbs key={preset} preset={preset} speed={speed} opacity={opacity} blendMode={blendMode} />
      <PatternOverlay />
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
        <h3
          className="font-[var(--font-display)] text-[clamp(2rem,6vw,4rem)] font-[200] leading-[0.92] tracking-[-0.06em] text-bevel-strong"
          style={{ color: 'var(--color-text)' }}
        >
          {current.label}
        </h3>
        <p className="max-w-md text-sm leading-7" style={{ color: 'var(--color-text-muted)' }}>
          {current.description}
        </p>
      </div>
    </div>
  );
};

// ── Inline usage snippet ─────────────────────────────────────────────────────

const UsageSnippet: React.FC<{ preset: OrbPreset; speed: number; opacity: number; blendMode: OrbBlendMode }> = ({
  preset,
  speed,
  opacity,
  blendMode,
}) => {
  const parts = [`preset="${preset}"`];
  if (speed !== 6) parts.push(`speed={${speed}}`);
  if (opacity !== 0.95) parts.push(`opacity={${opacity}}`);
  if (blendMode !== 'screen') parts.push(`blendMode="${blendMode}"`);

  const code = `<GlassOrbs ${parts.join(' ')} />`;

  return (
    <GlassPanel intensity="subtle" className="p-5">
      <pre
        className="relative z-10 overflow-x-auto font-[var(--font-code)] text-[0.78rem] leading-6"
        style={{ color: 'var(--color-accent-bright)' }}
      >
        {code}
      </pre>
    </GlassPanel>
  );
};

// ── Full-page backdrop demo ──────────────────────────────────────────────────

const FullPageDemo: React.FC<{ preset: OrbPreset; speed: number; opacity: number; blendMode: OrbBlendMode }> = ({
  preset,
  speed,
  opacity,
  blendMode,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GlassPill size="sm" variant="accent" onClick={() => setOpen(true)}>
        Full-page preview
      </GlassPill>

      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'oklch(0.06 0.018 248)',
          }}
        >
          <GlassOrbs preset={preset} speed={speed} opacity={opacity} blendMode={blendMode} fixed />
          <PatternOverlay fixed />

          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 p-8">
            <GlassPanel intensity="medium" topGlow className="max-w-lg p-10 text-center">
              <div className="relative z-10">
                <h3
                  className="font-[var(--font-display)] text-3xl font-[200] tracking-[-0.05em] text-bevel-strong"
                  style={{ color: 'var(--color-text)' }}
                >
                  Full-page orbs
                </h3>
                <p className="mt-3 text-sm leading-7" style={{ color: 'var(--color-text-muted)' }}>
                  This is how{' '}
                  <code
                    className="font-[var(--font-code)] text-[0.78em]"
                    style={{ color: 'var(--color-accent-bright)' }}
                  >
                    {'<GlassOrbs />'}
                  </code>{' '}
                  looks as a full-page background. Glass panels float above it naturally.
                </p>
                <GlassDivider className="my-6" />
                <GlassPill size="md" onClick={() => setOpen(false)}>
                  Close preview
                </GlassPill>
              </div>
            </GlassPanel>
          </div>
        </div>
      )}
    </>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────

const PatternOverlay: React.FC<{ fixed?: boolean }> = ({ fixed }) => {
  const { activePattern } = useBackground();
  if (!activePattern.url) return null;
  return (
    <div
      aria-hidden="true"
      style={{
        position: fixed ? 'fixed' : 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        backgroundImage: `url("${activePattern.url}")`,
        backgroundSize: activePattern.size,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'soft-light',
        opacity: 0.22,
        borderRadius: fixed ? undefined : 'inherit',
      }}
    />
  );
};

const OrbShowcase: React.FC = () => {
  const [activePreset, setActivePreset] = useState<OrbPreset>('drift');
  const [speed, setSpeed] = useState(6);
  const [opacity, setOpacity] = useState(0.95);
  const [blendMode, setBlendMode] = useState<OrbBlendMode>('screen');

  return (
    <div>
      <PageHeader
        title="Orbs"
        lede="Animated backgrounds made of soft gradient light. Twelve presets, each tuned to sit behind glass. Only transforms and opacity animate, and reduced motion stops them."
      />

      <div className="glass-container glass-stack [--stack:var(--space-6)]">
        <nav aria-label="Presets" className="glass-cluster">
          {PRESETS.map((p) => (
            <GlassPill
              key={p.id}
              size="sm"
              variant={activePreset === p.id ? 'active' : 'default'}
              onClick={() => setActivePreset(p.id)}
            >
              {p.label}
            </GlassPill>
          ))}
        </nav>

        <GlassPanel intensity="subtle" padding="sm" topGlow={false}>
          <OrbControls speed={speed} onSpeed={setSpeed} opacity={opacity} onOpacity={setOpacity} blendMode={blendMode} onBlendMode={setBlendMode} />
        </GlassPanel>

        <PreviewPane preset={activePreset} speed={speed} opacity={opacity} blendMode={blendMode} />

        <div className="flex flex-wrap items-start gap-[var(--space-4)]">
          <div className="min-w-0 flex-1">
            <UsageSnippet preset={activePreset} speed={speed} opacity={opacity} blendMode={blendMode} />
          </div>
          <FullPageDemo preset={activePreset} speed={speed} opacity={opacity} blendMode={blendMode} />
        </div>
      </div>

      <Section title="All presets" lede="Pick one to load it into the preview above.">
        <div className="grid grid-cols-1 gap-[var(--space-grid)] sm:grid-cols-2 lg:grid-cols-3">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setActivePreset(p.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left"
            >
              <div
                className="relative overflow-hidden"
                style={{
                  height: 220,
                  borderRadius: '1.2rem',
                  background: 'oklch(0.08 0.022 248)',
                }}
              >
                <GlassOrbs preset={p.id} speed={8} opacity={0.8} />
                <PatternOverlay />
                <div className="relative z-10 flex h-full items-end p-5">
                  <GlassPill size="xs" variant={activePreset === p.id ? 'active' : 'default'}>
                    {p.label}
                  </GlassPill>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Props">
        <GlassPanel intensity="subtle" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-sm" style={{ color: 'var(--color-text-muted)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[0.8125rem] font-semibold"
                      style={{ color: 'var(--color-text-subtle)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    prop: 'preset',
                    type: PRESETS.map((p) => `'${p.id}'`).join(' | '),
                    def: "'drift'",
                    desc: 'Animation preset to use.',
                  },
                  {
                    prop: 'speed',
                    type: 'number',
                    def: '6',
                    desc: 'Base animation speed in seconds. Higher = slower.',
                  },
                  {
                    prop: 'opacity',
                    type: 'number',
                    def: '0.95',
                    desc: 'Global orb opacity (0–1).',
                  },
                  {
                    prop: 'fixed',
                    type: 'boolean',
                    def: 'false',
                    desc: 'Use position:fixed for full-viewport backgrounds.',
                  },
                  {
                    prop: 'blendMode',
                    type: BLEND_MODES.map((m) => `'${m}'`).join(' | '),
                    def: "'screen'",
                    desc: 'Mix-blend-mode applied to each orb.',
                  },
                  {
                    prop: 'className',
                    type: 'string',
                    def: "''",
                    desc: 'Extra CSS class on the root element.',
                  },
                ].map((row) => (
                  <tr key={row.prop} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="px-5 py-3">
                      <code
                        className="font-[var(--font-code)] text-[0.78em]"
                        style={{ color: 'var(--color-accent-bright)' }}
                      >
                        {row.prop}
                      </code>
                    </td>
                    <td className="px-5 py-3">
                      <code className="font-[var(--font-code)] text-[0.72em]">{row.type}</code>
                    </td>
                    <td className="px-5 py-3">
                      <code className="font-[var(--font-code)] text-[0.72em]">{row.def}</code>
                    </td>
                    <td className="px-5 py-3">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      </Section>

      <Section title="Usage notes">
        <div className="grid grid-cols-1 gap-[var(--space-grid)] md:grid-cols-2">
          {[
            {
              title: 'Full-page background',
              body: 'Drop <GlassOrbs /> at the root of your app. It renders as a fixed, full-viewport layer at z-index 0. All content naturally sits above it.',
            },
            {
              title: 'Scoped preview',
              body: 'Wrap GlassOrbs in a relative container with overflow:hidden and the orbs will be clipped to that container, as shown in the preview boxes above.',
            },
            {
              title: 'Performance',
              body: 'Only CSS transforms and opacity are animated (both GPU compositor-friendly). Softness comes from radial-gradient falloff — no filter:blur() is used. Animations are disabled with prefers-reduced-motion.',
            },
            {
              title: 'Combine with patterns',
              body: 'Layer a PATTERNS overlay (e.g. grid or dots) on top of the orbs with mix-blend-mode: soft-light for extra texture. The two systems complement each other.',
            },
          ].map((tip) => (
            <GlassPanel key={tip.title} intensity="subtle" className="p-6">
              <div className="relative z-10">
                <h3
                  className="font-[var(--font-display)] text-base font-[300] tracking-[-0.03em] text-bevel-strong"
                  style={{ color: 'var(--color-text)' }}
                >
                  {tip.title}
                </h3>
                <p className="mt-2 text-sm leading-7" style={{ color: 'var(--color-text-muted)' }}>
                  {tip.body}
                </p>
              </div>
            </GlassPanel>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default OrbShowcase;
