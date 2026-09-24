import React, { useState } from 'react';
import {
  GlassPanel,
  GlassPill,
  GlassDivider,
  GlassInput,
  GlassTextarea,
  GlassOrbs,
  GlassToast,
  type GlassIntensity,
  type GlassToastTone,
} from 'glass-design-system';

// ── Shared type styles ──────────────────────────────────────────────────────

const H2 = 'font-[var(--font-display)] font-[500] leading-[0.95] tracking-[-0.035em] text-[var(--color-text)] text-bevel-strong';
const BODY = 'text-[1.02rem] leading-[1.65] text-[var(--color-text-muted)] text-bevel';
const SMALL = 'text-[0.85rem] leading-[1.5] text-[var(--color-text-subtle)]';

const Section: React.FC<React.PropsWithChildren<{ title: string; lede?: string }>> = ({ title, lede, children }) => (
  <section className="mx-auto max-w-6xl px-[clamp(1.25rem,5vw,4rem)] py-[clamp(3.5rem,8vw,6.5rem)]">
    <h2 className={H2} style={{ fontSize: 'clamp(2rem, 4.4vw, 3.4rem)' }}>{title}</h2>
    {lede && <p className={`${BODY} mt-4 max-w-[58ch]`}>{lede}</p>}
    <div className="mt-10">{children}</div>
  </section>
);

// ── Thickness ───────────────────────────────────────────────────────────────

const THICKNESS: { intensity: GlassIntensity; name: string; use: string }[] = [
  { intensity: 'subtle', name: 'Subtle', use: 'Backgrounds, rows, anything that should recede.' },
  { intensity: 'medium', name: 'Medium', use: 'Cards and content panels. The default.' },
  { intensity: 'strong', name: 'Strong', use: 'Modals and forms. The closest pane to you.' },
];

// ── Motion ──────────────────────────────────────────────────────────────────

const EASES = [
  { token: '--ease-glass', use: 'Things arriving: panels, the light following your pointer.' },
  { token: '--ease-spring', use: 'Things you press: pills, toasts. Overshoots slightly, then settles.' },
  { token: '--ease-in-glass', use: 'Things leaving. Starts slow, gets out of the way.' },
];

const EaseTrack: React.FC<{ token: string; use: string; at: boolean }> = ({ token, use, at }) => (
  <div className="grid gap-3 sm:grid-cols-[14rem_1fr] sm:items-center">
    <div>
      <code className="text-[0.85rem] text-[var(--color-light)]">{token}</code>
      <p className={`${SMALL} mt-1`}>{use}</p>
    </div>
    <div className="relative h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-glass-field)]">
      <span
        aria-hidden="true"
        className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full"
        style={{
          left: at ? 'calc(100% - 1.75rem)' : '0.25rem',
          transition: `left var(--dur-4) var(${token})`,
          background: 'radial-gradient(circle at 35% 30%, var(--color-light-bright), var(--color-light) 45%, oklch(0.62 0.14 55) 100%)',
          boxShadow: '0 0 18px oklch(0.86 0.12 78 / 0.55)',
        }}
      />
    </div>
  </div>
);

// ── Page ────────────────────────────────────────────────────────────────────

const MaterialShowcase: React.FC = () => {
  const [easeAt, setEaseAt] = useState(false);
  const [toast, setToast] = useState<GlassToastTone | null>(null);
  const [lastTone, setLastTone] = useState<GlassToastTone>('success');

  const showToast = (tone: GlassToastTone) => {
    setLastTone(tone);
    setToast(tone);
  };

  const toastCopy: Record<GlassToastTone, string> = {
    success: 'Changes saved.',
    error: "Couldn't save. Check your connection and try again.",
    info: 'A new version is available.',
  };

  return (
    <div className="relative">
      <GlassOrbs preset="kiln" speed={7} opacity={0.85} fixed />

      <div className="relative z-10">
        {/* ── Opening ─────────────────────────────────────────────────── */}
        <header className="mx-auto grid max-w-6xl items-center gap-12 px-[clamp(1.25rem,5vw,4rem)] pt-[clamp(6rem,14vw,10rem)] pb-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h1
              className="font-[var(--font-display)] font-[300] leading-[0.88] tracking-[-0.05em] text-[var(--color-text)] text-bevel-strong"
              style={{ fontSize: 'clamp(3rem, 7.2vw, 6.25rem)', fontVariationSettings: '"wdth" 88' }}
            >
              Cool glass,
              <br />
              <span className="font-[700]" style={{ fontVariationSettings: '"wdth" 100' }}>warm light.</span>
            </h1>
            <p className={`${BODY} mt-7 max-w-[46ch]`}>
              Every surface is the same material: cobalt smoke, lit by one low sun from the upper right.
              Anything that catches that light turns amber: the rim, the specular, focus, the primary action.
              Everything else stays cool.
            </p>
          </div>

          <GlassPanel intensity="medium" tilt bottomGlow className="p-[clamp(1.75rem,4vw,3rem)]" style={{ minHeight: '22rem' }}>
            <div className="relative z-10 flex h-full min-h-[16rem] flex-col justify-between">
              <p className={SMALL}>Move your pointer across this pane.</p>
              <div>
                <p className="font-[var(--font-display)] text-[1.6rem] font-[500] leading-tight tracking-[-0.03em] text-[var(--color-text)] text-bevel-strong">
                  The rim turns toward you.
                </p>
                <p className={`${BODY} mt-3`}>
                  A warm catch-light on the lit edge, a cool reflection opposite, and a thin split of spectrum
                  where the glass is thickest. The pane leans away from your pointer.
                </p>
              </div>
            </div>
          </GlassPanel>
        </header>

        {/* ── Thickness ───────────────────────────────────────────────── */}
        <Section
          title="Three thicknesses"
          lede="Closer panes are denser and cast deeper shadows. Never put a thinner pane on top of a thicker one."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {THICKNESS.map((t) => (
              <GlassPanel key={t.intensity} intensity={t.intensity} topGlow={t.intensity !== 'subtle'} reveal tilt className="p-8">
                <div className="relative z-10">
                  <p className="font-[var(--font-display)] text-[1.5rem] font-[500] tracking-[-0.03em] text-[var(--color-text)] text-bevel-strong">
                    {t.name}
                  </p>
                  <p className={`${BODY} mt-2`}>{t.use}</p>
                  <code className="mt-6 block text-[0.8rem] text-[var(--color-text-subtle)]">intensity="{t.intensity}"</code>
                </div>
              </GlassPanel>
            ))}
          </div>
        </Section>

        {/* ── Controls ────────────────────────────────────────────────── */}
        <Section title="Controls" lede="Hover a pill to see the glint, press it to feel the spring. Focus a field to watch the light run around its rim.">
          <GlassPanel intensity="medium" topGlow={false} className="p-[clamp(1.5rem,4vw,3rem)]">
            <div className="relative z-10 grid gap-10 lg:grid-cols-2">
              <div className="flex flex-col gap-7">
                <div className="flex flex-wrap items-center gap-3">
                  <GlassPill size="lg" variant="accent">Send message</GlassPill>
                  <GlassPill size="lg">Cancel</GlassPill>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <GlassPill size="md" variant="active">Selected</GlassPill>
                  <GlassPill size="md">Default</GlassPill>
                  <GlassPill size="md" disabled>Disabled</GlassPill>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <GlassPill size="sm">Small</GlassPill>
                  <GlassPill size="xs">Extra small</GlassPill>
                  <GlassPill size="xs" variant="active">Tag</GlassPill>
                </div>

                <GlassDivider />

                <div>
                  <p className={SMALL}>Toasts spring up from the bottom edge. The icon draws itself in once the pill lands.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <GlassPill size="sm" onClick={() => showToast('success')}>Show success</GlassPill>
                    <GlassPill size="sm" onClick={() => showToast('error')}>Show error</GlassPill>
                    <GlassPill size="sm" onClick={() => showToast('info')}>Show info</GlassPill>
                  </div>
                </div>
              </div>

              <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); showToast('success'); }}>
                <label className="flex flex-col gap-2">
                  <span className="text-[0.85rem] font-[500] text-[var(--color-text-muted)]">Name</span>
                  <GlassInput placeholder="Ada Lovelace" autoComplete="off" />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[0.85rem] font-[500] text-[var(--color-text-muted)]">Message</span>
                  <GlassTextarea rows={4} placeholder="What are you working on?" />
                </label>
                <div>
                  <GlassPill size="md" variant="accent" type="submit">Save changes</GlassPill>
                </div>
              </form>
            </div>
          </GlassPanel>
        </Section>

        {/* ── Motion ──────────────────────────────────────────────────── */}
        <Section
          title="Three curves"
          lede="Motion answers something you did. Pick one of these; don't invent a new curve. Durations double at each step: 140, 280, 560, 1120ms."
        >
          <GlassPanel intensity="subtle" topGlow={false} className="p-[clamp(1.5rem,4vw,3rem)]">
            <div className="relative z-10 flex flex-col gap-6">
              {EASES.map((e) => <EaseTrack key={e.token} {...e} at={easeAt} />)}
              <div className="pt-2">
                <GlassPill size="md" variant="active" onClick={() => setEaseAt((v) => !v)}>
                  {easeAt ? 'Send back' : 'Play'}
                </GlassPill>
              </div>
            </div>
          </GlassPanel>
        </Section>
      </div>

      <GlassToast open={toast !== null} tone={toast ?? lastTone} onClose={() => setToast(null)}>
        {toastCopy[toast ?? lastTone]}
      </GlassToast>
    </div>
  );
};

export default MaterialShowcase;
