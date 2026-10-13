import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassPanel, GlassPill, GlassOrbs } from 'glass-design-system';
import { PageHeader, Section, Code, CodeBlock, JumpLinks } from '../components/Page';
import './foundations-page.css';

/** Resolve CSS length tokens to px at the current viewport, live on resize. */
function useTokenPx(names: readonly string[]) {
  const [px, setPx] = useState<Record<string, number>>({});
  const key = names.join();
  useEffect(() => {
    const probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;visibility:hidden;height:0;';
    document.body.appendChild(probe);
    const read = () => {
      const out: Record<string, number> = {};
      for (const n of names) {
        probe.style.width = `var(${n})`;
        out[n] = Math.round(probe.getBoundingClientRect().width * 10) / 10;
      }
      setPx(out);
    };
    read();
    document.fonts?.ready.then(read);
    window.addEventListener('resize', read);
    return () => { window.removeEventListener('resize', read); probe.remove(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return px;
}

// ── Space ───────────────────────────────────────────────────────────────────

const SCALE = [
  { n: 1, use: 'Icon to its label, hairline offsets' },
  { n: 2, use: 'Pills in a group, tight stacks' },
  { n: 3, use: 'Label to field, title to body' },
  { n: 4, use: 'Padding inside small parts' },
  { n: 6, use: 'Between related blocks, compact padding' },
  { n: 8, use: 'Card padding, form groups' },
  { n: 12, use: 'Heading to section content' },
  { n: 16, use: 'Between groups inside a section' },
  { n: 24, use: 'Between sections' },
  { n: 32, use: 'Hero breathing room' },
];

const FLUID = [
  { token: '--space-gutter', use: 'Page edge, both sides', range: '16 → 40' },
  { token: '--space-section', use: 'Section to section', range: '64 → 128' },
  { token: '--space-panel', use: 'Inside a GlassPanel (padding="md")', range: '20 → 40' },
  { token: '--space-grid', use: 'Between cards in a grid', range: '12 → 24' },
] as const;

const SpaceSection: React.FC = () => {
  const live = useTokenPx(FLUID.map((f) => f.token));
  return (
    <Section
      id="space"
      title="Space"
      lede="Ten fixed steps for parts, four fluid tokens for page structure. Step names are Tailwind's spacing numbers, so the two never disagree."
    >
      <div className="glass-stack [--stack:var(--space-16)]">
        <GlassPanel intensity="subtle" padding="md" topGlow={false}>
          <div className="token-table" role="table" aria-label="Spacing scale">
            <div role="row" className="token-table__head">
              <span role="columnheader">Token</span>
              <span role="columnheader">Size</span>
              <span role="columnheader">Tailwind</span>
              <span role="columnheader" className="token-table__wide">Use it for</span>
            </div>
            {SCALE.map((s) => (
              <div role="row" key={s.n}>
                <span role="cell"><code className="token-name">--space-{s.n}</code></span>
                <span role="cell" className="token-size">
                  <span className="token-bar" style={{ width: `var(--space-${s.n})` }} />
                  <span className="tabular-nums">{s.n * 4}px</span>
                </span>
                <span role="cell"><code className="token-tw">p-{s.n} gap-{s.n}</code></span>
                <span role="cell" className="glass-small token-table__wide">{s.use}</span>
              </div>
            ))}
          </div>
        </GlassPanel>

        <div className="glass-stack [--stack:var(--space-6)]">
          <div className="glass-stack [--stack:var(--space-3)]">
            <h3 className="glass-h3">Fluid tokens</h3>
            <p className="glass-body glass-measure">
              Page-level space scales with the window between a phone and a laptop. The numbers below are live:
              resize the window and watch them move.
            </p>
          </div>
          <div className="fluid-grid">
            {FLUID.map((f) => (
              <GlassPanel key={f.token} intensity="medium" padding="sm" topGlow={false} className="fluid-card">
                <code className="token-name">{f.token}</code>
                <p className="fluid-card__value tabular-nums">{live[f.token] ?? '–'}<span>px</span></p>
                <p className="glass-small">{f.use}</p>
                <p className="glass-caption">Range {f.range}px</p>
              </GlassPanel>
            ))}
          </div>
        </div>

        <div className="rules-grid">
          <div className="glass-stack [--stack:var(--space-3)]">
            <h3 className="glass-h4">Big gaps hold small ones</h3>
            <p className="glass-small">
              Space inside a group is always smaller than the space around it. A card's padding (8) is bigger than
              the gaps inside it (3, 6), and the grid gap between cards is smaller than the section gap around the grid.
            </p>
          </div>
          <div className="glass-stack [--stack:var(--space-3)]">
            <h3 className="glass-h4">Skip a step for contrast</h3>
            <p className="glass-small">
              Neighbouring steps are meant to be told apart, but pairs like 12 and 16 are close. When two gaps must
              read as different levels, skip one: 3 inside, 6 between.
            </p>
          </div>
          <div className="glass-stack [--stack:var(--space-3)]">
            <h3 className="glass-h4">Fixed for parts, fluid for pages</h3>
            <p className="glass-small">
              Components use the fixed steps, so a pill looks the same everywhere. Only page structure (gutters,
              sections, panel padding, grid gaps) flexes with the window.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

// ── Layout ──────────────────────────────────────────────────────────────────

const LAYOUT_CLASSES = [
  { name: '.glass-container', does: 'Centred column, max --page-max, gutter on both sides. Add --wide for --page-wide.' },
  { name: '.glass-section', does: 'Half of --space-section above and below, so two in a row are one section apart.' },
  { name: '.glass-stack', does: 'Vertical flow with gap --stack (default --space-6).' },
  { name: '.glass-cluster', does: 'Wrapping row with gap --cluster (default --space-2). For pills and tags.' },
  { name: '.glass-grid', does: 'As many columns as fit, each at least --grid-min (16rem), gap --space-grid.' },
  { name: '.glass-measure', does: 'Caps a text block at --measure (62ch).' },
];

const LayoutSection: React.FC = () => {
  const live = useTokenPx(['--page-max', '--page-wide']);
  return (
    <Section
      id="layout"
      title="Layout"
      lede="Two page widths and a line length, plus six optional classes that apply them. Tailwind utilities on the same element always win."
    >
      <div className="glass-stack [--stack:var(--space-12)]">
        <div className="width-bars">
          {[
            { token: '--page-wide', label: 'Galleries, dashboards', px: live['--page-wide'] },
            { token: '--page-max', label: 'Default content width', px: live['--page-max'] },
            { token: '--measure', label: 'Longest comfortable line of text', px: undefined },
          ].map((w) => (
            <div key={w.token} className="width-bar">
              <div className="width-bar__fill" style={{ width: `min(100%, calc(var(${w.token}) / var(--page-wide) * 100%))` }} />
              <div className="width-bar__label">
                <code className="token-name">{w.token}</code>
                <span className="glass-small">{w.label}{w.px ? `, ${w.px}px` : ', 62 characters'}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="class-grid">
          {LAYOUT_CLASSES.map((c) => (
            <div key={c.name} className="class-row">
              <code className="token-name">{c.name}</code>
              <p className="glass-small">{c.does}</p>
            </div>
          ))}
        </div>

        <CodeBlock>{`<section className="glass-section">
  <div className="glass-container glass-stack">
    <h2 className="glass-h2">Recent work</h2>
    <div className="glass-grid">
      {projects.map((p) => <GlassPanel padding="md" key={p.id}>…</GlassPanel>)}
    </div>
  </div>
</section>`}</CodeBlock>
      </div>
    </Section>
  );
};

// ── Radius ──────────────────────────────────────────────────────────────────

const RADII = [
  { token: '--radius-chip', px: 8, use: 'Swatches, small badges' },
  { token: '--radius-field', px: 14, use: 'Inputs and textareas' },
  { token: '--radius-card', px: 20, use: 'Cards nested in panels' },
  { token: '--radius-panel', px: 28, use: 'GlassPanel default' },
  { token: '--radius-sheet', px: 36, use: 'Large sheets, hero panes' },
];

const RadiusSection: React.FC = () => (
  <Section
    id="radius"
    title="Radius"
    lede="Bigger things get rounder. Pills, switches and sliders are fully round; everything else picks one of five."
  >
    <div className="glass-stack [--stack:var(--space-12)]">
      <div className="radius-row">
        {RADII.map((r, i) => (
          <div key={r.token} className="radius-item">
            <GlassPanel
              intensity="medium"
              topGlow={false}
              spectrum={i > 1}
              className="radius-tile"
              style={{ borderRadius: `var(${r.token})`, width: `${4 + i * 1.5}rem`, height: `${4 + i * 1.5}rem` }}
            />
            <code className="token-name">{r.token}</code>
            <span className="glass-caption tabular-nums">{r.px}px</span>
            <span className="glass-small">{r.use}</span>
          </div>
        ))}
      </div>

      <div className="concentric">
        <GlassPanel intensity="subtle" topGlow={false} className="concentric__outer">
          <GlassPanel intensity="medium" topGlow={false} className="concentric__inner">
            <p className="glass-h4">Concentric corners</p>
            <p className="glass-small">
              Panel radius 28, padding 8, so the card inside gets 28 − 8 = 20: --radius-card. Matching curves read as
              one object; a mismatched inner radius looks pinched.
            </p>
          </GlassPanel>
        </GlassPanel>
      </div>
    </div>
  </Section>
);

// ── Type ────────────────────────────────────────────────────────────────────

const STEPS = [
  { step: '--step-7', cls: '.glass-display', role: 'Hero headline', sample: 'Cool glass' },
  { step: '--step-6', cls: '.glass-h1', role: 'Page title', sample: 'Foundations' },
  { step: '--step-4', cls: '.glass-h2', role: 'Section title', sample: 'Three thicknesses' },
  { step: '--step-2', cls: '.glass-h3', role: 'Card title', sample: 'Low sun, cold water' },
  { step: '--step-1', cls: '.glass-h4, .glass-lede', role: 'Small heading, lede', sample: 'Every pane follows these two.' },
  { step: '--step-0', cls: '.glass-body', role: 'Body text', sample: 'Two knobs, blur and opacity, tune all of it at once.' },
  { step: '--step--1', cls: '.glass-small', role: 'Secondary text, labels', sample: 'Due Friday. Paid by card ending 4242.' },
  { step: '--step--2', cls: '.glass-caption', role: 'Captions, meta', sample: 'Updated 2 minutes ago' },
];

const TypeSection: React.FC = () => {
  const live = useTokenPx(STEPS.map((s) => s.step));
  return (
    <Section
      id="type"
      title="Type"
      lede="A fluid modular scale: ratio 1.2 on a phone, 1.3 on a laptop, body text 16 to 17px. Each role has one class."
      aside={<GlassPill as={Link} to="/type">Typefaces in depth</GlassPill>}
    >
      <GlassPanel intensity="subtle" padding="none" topGlow={false}>
        <ol className="type-scale">
          {STEPS.map((s, i) => (
            <li key={s.step}>
              <div className="type-scale__meta">
                <code className="token-name">{s.step}</code>
                <span className="glass-caption">{s.cls}</span>
                <span className="glass-caption">{s.role}, {live[s.step] ?? "–"}px now</span>
              </div>
              <p
                className="type-scale__sample"
                style={{
                  fontSize: `var(${s.step})`,
                  fontFamily: i < 5 && i !== 4 ? 'var(--font-display)' : 'var(--font-body)',
                  fontWeight: i < 2 ? 300 : i < 4 ? 450 : 400,
                  letterSpacing: i < 2 ? '-0.045em' : i < 4 ? '-0.03em' : 'normal',
                  lineHeight: i < 3 ? 1 : 1.4,
                }}
              >
                {s.sample}
              </p>
            </li>
          ))}
        </ol>
      </GlassPanel>
    </Section>
  );
};

// ── Elevation ───────────────────────────────────────────────────────────────

const ElevationSection: React.FC = () => (
  <Section
    id="elevation"
    title="Elevation"
    lede="Three shadows for things that float above the page: menus, popovers, toasts. Panels bring their own, scaled by intensity."
  >
    <div className="elevation-row">
      {[1, 2, 3].map((n) => (
        <div key={n} className="elevation-tile" style={{ boxShadow: `var(--elevation-${n})` }}>
          <code className="token-name">--elevation-{n}</code>
          <span className="glass-small">{['Menus, raised chips', 'Sticky bars, cards that lift', 'Dialogs, popovers, toasts'][n - 1]}</span>
        </div>
      ))}
    </div>
  </Section>
);

// ── Motion ──────────────────────────────────────────────────────────────────

const MotionSection: React.FC = () => (
  <Section
    id="motion"
    title="Motion"
    lede="Four durations that double, three curves. Every one collapses to 1ms when the system asks for reduced motion."
  >
    <div className="motion-grid">
      <GlassPanel intensity="subtle" padding="md" topGlow={false}>
        <div className="glass-stack [--stack:var(--space-4)]">
          {[
            ['--dur-1', '140ms', 'Press feedback, hover colour'],
            ['--dur-2', '280ms', 'Small state changes, popovers'],
            ['--dur-3', '560ms', 'Springs, the light following you'],
            ['--dur-4', '1120ms', 'Entrances, the light turning'],
          ].map(([t, v, u]) => (
            <div key={t} className="motion-row">
              <code className="token-name">{t}</code>
              <span className="tabular-nums glass-small">{v}</span>
              <span className="glass-small">{u}</span>
            </div>
          ))}
        </div>
      </GlassPanel>
      <GlassPanel intensity="subtle" padding="md" topGlow={false}>
        <div className="glass-stack [--stack:var(--space-4)]">
          {[
            ['--ease-glass', 'Arriving. Decelerates hard, like something heavy settling.'],
            ['--ease-spring', 'Pressing. A real spring with a slight overshoot.'],
            ['--ease-in-glass', 'Leaving. Starts slow, then gets out of the way.'],
          ].map(([t, u]) => (
            <div key={t} className="motion-row motion-row--ease">
              <code className="token-name">{t}</code>
              <span className="glass-small">{u}</span>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  </Section>
);

// ── Colour ──────────────────────────────────────────────────────────────────

const COLOURS: { group: string; tokens: [string, string][] }[] = [
  { group: 'Text', tokens: [['--color-text', 'Headings, primary'], ['--color-text-muted', 'Body'], ['--color-text-subtle', 'Labels, captions']] },
  { group: 'Light', tokens: [['--color-light', 'Rims, focus, primary action'], ['--color-light-bright', 'Hot highlights'], ['--color-light-soft', 'Focus halo']] },
  { group: 'Glass', tokens: [['--color-accent', 'Cobalt'], ['--color-accent-bright', 'Code, links'], ['--color-border', 'Edges'], ['--color-border-strong', 'Active edges']] },
  { group: 'Status', tokens: [['--color-success', 'Done'], ['--color-warning', 'Careful'], ['--color-danger', 'Failed']] },
];

const ColourSection: React.FC = () => (
  <Section
    id="colour"
    title="Colour"
    lede="Cool glass, warm light. Glass is cobalt; only what catches the light is amber. Use the light for one thing per screen."
    aside={<GlassPill as={Link} to="/colors">Colour on glass</GlassPill>}
  >
    <div className="colour-grid">
      {COLOURS.map((g) => (
        <div key={g.group} className="glass-stack [--stack:var(--space-3)]">
          <h3 className="glass-caption">{g.group}</h3>
          {g.tokens.map(([t, u]) => (
            <div key={t} className="colour-row">
              <span className="colour-chip" style={{ background: `var(${t})` }} />
              <div>
                <code className="token-name">{t}</code>
                <p className="glass-caption">{u}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </Section>
);

// ── Tailwind ────────────────────────────────────────────────────────────────

const TailwindSection: React.FC = () => (
  <Section
    id="tailwind"
    title="With Tailwind"
    lede="The fixed space steps are Tailwind's own numbers. Everything else is one arbitrary value away."
  >
    <div className="start-like-grid">
      <CodeBlock>{`<div className="p-8 gap-6">           {/* --space-8, --space-6 */}
<div className="px-[var(--space-gutter)]">
<div className="gap-[var(--space-grid)]">
<div className="rounded-[var(--radius-card)]">
<p className="text-[length:var(--step-2)]">
<div className="shadow-[var(--elevation-2)]">`}</CodeBlock>
      <div className="glass-stack [--stack:var(--space-4)]">
        <p className="glass-body">
          Stick to <Code>1 2 3 4 6 8 12 16 24 32</Code>. Tailwind will happily make <Code>p-5</Code> or{' '}
          <Code>gap-7</Code>, but those fall between steps and break the rhythm.
        </p>
        <p className="glass-small">
          The library's own styles sit in <Code>@layer components</Code>, so any utility you put on a component wins.
          Keep your own element resets in <Code>@layer base</Code>, or they will override the components instead.
        </p>
      </div>
    </div>
  </Section>
);

// ── Page ────────────────────────────────────────────────────────────────────

const Foundations: React.FC = () => (
  <div className="relative">
    <GlassOrbs preset="kiln" speed={9} opacity={0.6} fixed />
    <div className="relative z-10">
      <PageHeader
        title="Foundations"
        lede="The tokens every part is built from. Use the steps; don't invent values. When a design needs a size that isn't here, it usually needs a different step, not a new one."
      >
        <JumpLinks
          items={[
            { id: 'space', label: 'Space' },
            { id: 'layout', label: 'Layout' },
            { id: 'radius', label: 'Radius' },
            { id: 'type', label: 'Type' },
            { id: 'elevation', label: 'Elevation' },
            { id: 'motion', label: 'Motion' },
            { id: 'colour', label: 'Colour' },
            { id: 'tailwind', label: 'With Tailwind' },
          ]}
        />
      </PageHeader>
      <SpaceSection />
      <LayoutSection />
      <RadiusSection />
      <TypeSection />
      <ElevationSection />
      <MotionSection />
      <ColourSection />
      <TailwindSection />
    </div>
  </div>
);

export default Foundations;
