import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GlassPanel,
  GlassPill,
  GlassDivider,
  GlassInput,
  GlassTextarea,
  GlassOrbs,
  GlassToast,
  GlassSwitch,
  GlassSlider,
  GlassSegmented,
  type GlassIntensity,
  type GlassToastTone,
} from 'glass-design-system';
import { useBackground } from '../context/BackgroundContext';
import { Section, CodeBlock, Code } from '../components/Page';
import './home.css';

// ── Hero: the material lab ──────────────────────────────────────────────────
// Three panes stacked in depth. The front one holds the two master knobs,
// and they drive the GlassProvider around the whole site.

const SNIPPETS = [
  { name: 'debounce.ts', lang: 'TypeScript', when: '2m' },
  { name: 'useMeasure.tsx', lang: 'React', when: '1h' },
  { name: 'retry.go', lang: 'Go', when: '3h' },
  { name: 'oklch-mix.css', lang: 'CSS', when: 'Mon' },
];

const Lab: React.FC = () => {
  const { glass, setGlass, resetGlass } = useBackground();

  return (
    <div className="lab">
      <GlassPanel intensity="subtle" topGlow={false} className="lab__back">
        <div className="lab-window__bar">
          <span className="lab-window__dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="glass-caption">Recent snippets</span>
        </div>
        <ul className="lab-window__rows">
          {SNIPPETS.map((s) => (
            <li key={s.name}>
              <span className="lab-window__name">{s.name}</span>
              <GlassPill as="span" size="xs">{s.lang}</GlassPill>
              <span className="glass-caption tabular-nums">{s.when}</span>
            </li>
          ))}
        </ul>
      </GlassPanel>

      <GlassPanel intensity="medium" padding="sm" className="lab__mid">
        <div className="flex items-center gap-[var(--space-4)]">
          <span aria-hidden="true" className="lab-art" />
          <div className="min-w-0">
            <p className="glass-h4 truncate">Low sun, cold water</p>
            <p className="glass-small truncate">Kosta Ensemble</p>
          </div>
        </div>
        <div className="lab-progress" aria-hidden="true"><span style={{ width: '38%' }} /></div>
        <div className="flex justify-between">
          <span className="glass-caption tabular-nums">1:24</span>
          <span className="glass-caption tabular-nums">3:41</span>
        </div>
      </GlassPanel>

      <GlassPanel intensity="strong" padding="sm" topGlow={false} className="lab__front">
        <div className="glass-stack [--stack:var(--space-4)]">
          <div className="flex items-center justify-between gap-[var(--space-3)]">
            <h2 className="glass-h4">Material</h2>
            <GlassPill size="xs" variant="ghost" onClick={resetGlass}>Reset</GlassPill>
          </div>
          <GlassSlider label="Blur" min={0} max={80} value={glass.blur} onChange={(blur) => setGlass({ blur })} format={(v) => `${v}px`} />
          <GlassSlider label="Opacity" min={0} max={1} step={0.01} value={glass.opacity} onChange={(opacity) => setGlass({ opacity })} format={(v) => v.toFixed(2)} />
          <p className="glass-caption">Every pane on this site follows these two.</p>
        </div>
      </GlassPanel>
    </div>
  );
};

const Hero: React.FC = () => (
  <header className="glass-container home-hero">
    <div className="home-hero__text">
      <h1 className="glass-display">Cool glass, warm&nbsp;light.</h1>
      <p className="glass-lede">
        A React component library where every surface is the same frosted material, lit by one warm
        light from the upper right. Two knobs, blur and opacity, tune all of it at once.
      </p>
      <div className="glass-cluster [--cluster:var(--space-3)]">
        <GlassPill as={Link} to="/components" size="lg" variant="accent">Browse components</GlassPill>
        <GlassPill as={Link} to="/foundations" size="lg">Read the foundations</GlassPill>
      </div>
      <CodeBlock className="home-hero__install">npm install github:theted/glass-design-system</CodeBlock>
    </div>
    <Lab />
  </header>
);

// ── Anatomy ─────────────────────────────────────────────────────────────────

const LAYERS = [
  { id: 'rim', name: 'Rim', note: 'A warm catch-light on the lit edge and a cool reflection opposite. It turns toward your pointer.' },
  { id: 'spectrum', name: 'Spectrum', note: 'Just past the catch-light, thick glass splits the light into a faint fringe.' },
  { id: 'lip', name: 'Lip', note: 'A hairline of light along the top edge.' },
  { id: 'specular', name: 'Specular', note: 'A wide, faint pool of warm light that drifts after your pointer.' },
  { id: 'tint', name: 'Tint', note: 'Cobalt smoke. The opacity knob scales it.' },
  { id: 'blur', name: 'Blur', note: 'The backdrop, frosted. Off, the pane is clear.' },
  { id: 'shadow', name: 'Shadow', note: 'Lifts the pane off the page. Closer panes cast deeper ones.' },
] as const;

type LayerId = (typeof LAYERS)[number]['id'];

const Anatomy: React.FC = () => {
  const [off, setOff] = useState<Set<LayerId>>(new Set());
  const toggle = (id: LayerId, on: boolean) =>
    setOff((prev) => {
      const next = new Set(prev);
      if (on) next.delete(id); else next.add(id);
      return next;
    });

  return (
    <Section
      title="Anatomy of a pane"
      lede="Seven layers make the material. Switch them off one at a time to see what each one does, and hover the pane to watch the light follow you."
    >
      <div className="anatomy">
        <GlassPanel
          intensity="medium"
          padding="lg"
          bottomGlow
          className={`anatomy__pane ${[...off].map((id) => `anatomy-off-${id}`).join(' ')}`}
        >
          <ul className="anatomy__list">
            {LAYERS.map((l) => (
              <li key={l.id}>
                <GlassSwitch checked={!off.has(l.id)} onChange={(on) => toggle(l.id, on)} aria-label={l.name} />
                <div>
                  <p className="glass-h4">{l.name}</p>
                  <p className="glass-small">{l.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </GlassPanel>

        <div className="anatomy__notes glass-stack [--stack:var(--space-6)]">
          <p className="glass-body">
            All seven come with every <Code>GlassPanel</Code>. The decorative layers sit beneath your content, so
            children need no wrapper.
          </p>
          <CodeBlock>{`<GlassPanel intensity="medium" padding="md">
  <h3>Low sun, cold water</h3>
  <p>Kosta Ensemble</p>
</GlassPanel>`}</CodeBlock>
          <p className="glass-small">
            The pointer light is four registered CSS properties written straight to the element, so the browser
            eases the light after your cursor and React never re-renders on mousemove.
          </p>
        </div>
      </div>
    </Section>
  );
};

// ── Depth ───────────────────────────────────────────────────────────────────

const THICKNESS: { intensity: GlassIntensity; name: string; use: string }[] = [
  { intensity: 'subtle', name: 'Subtle', use: 'Page regions, sidebars, rows. The furthest pane.' },
  { intensity: 'medium', name: 'Medium', use: 'Cards and content. The default.' },
  { intensity: 'strong', name: 'Strong', use: 'Dialogs, popovers, forms in focus. The closest pane.' },
];

const Depth: React.FC = () => (
  <Section
    title="Three thicknesses"
    lede="Closer panes are denser and cast deeper shadows. Stack them in this order and depth reads at a glance; never put a thinner pane on top of a thicker one."
  >
    <div className="depth">
      {THICKNESS.map((t, i) => (
        <GlassPanel key={t.intensity} intensity={t.intensity} padding="md" topGlow={i > 0} className={`depth__pane depth__pane--${i + 1}`}>
          <p className="glass-h3">{t.name}</p>
          <p className="glass-body mt-[var(--space-2)]">{t.use}</p>
          <p className="mt-[var(--space-6)]"><Code>intensity="{t.intensity}"</Code></p>
        </GlassPanel>
      ))}
    </div>
  </Section>
);

// ── Controls ────────────────────────────────────────────────────────────────

const TOAST_COPY: Record<GlassToastTone, string> = {
  success: 'Changes saved.',
  error: "Couldn't save. Check your connection and try again.",
  info: 'A new version is available.',
};

const Controls: React.FC<{ onToast: (tone: GlassToastTone) => void }> = ({ onToast }) => {
  const [view, setView] = useState('Week');
  const [notify, setNotify] = useState(true);
  const [sync, setSync] = useState(false);
  const [volume, setVolume] = useState(64);

  return (
    <Section
      title="Controls"
      lede="Hover a pill for the glint, press it for the spring. Focus a field and the light runs once around its rim."
    >
      <GlassPanel intensity="medium" padding="lg" topGlow={false}>
        <div className="controls-grid">
          <div className="glass-stack [--stack:var(--space-6)]">
            <h3 className="glass-caption">Buttons</h3>
            <div className="glass-cluster [--cluster:var(--space-3)]">
              <GlassPill size="lg" variant="accent">Publish</GlassPill>
              <GlassPill size="lg">Save draft</GlassPill>
              <GlassPill size="lg" variant="ghost">Cancel</GlassPill>
            </div>
            <div className="glass-cluster">
              <GlassPill variant="active">Selected</GlassPill>
              <GlassPill>Default</GlassPill>
              <GlassPill disabled>Disabled</GlassPill>
            </div>
            <div className="glass-cluster">
              <GlassPill size="sm">Small</GlassPill>
              <GlassPill size="xs">Extra small</GlassPill>
              <GlassPill size="xs" variant="active">Tag</GlassPill>
            </div>
            <GlassDivider />
            <h3 className="glass-caption">Feedback</h3>
            <div className="glass-cluster">
              <GlassPill size="sm" onClick={() => onToast('success')}>Show success</GlassPill>
              <GlassPill size="sm" onClick={() => onToast('error')}>Show error</GlassPill>
              <GlassPill size="sm" onClick={() => onToast('info')}>Show info</GlassPill>
            </div>
          </div>

          <div className="glass-stack [--stack:var(--space-6)]">
            <h3 className="glass-caption">Choices</h3>
            <GlassSegmented aria-label="Calendar view" options={['Day', 'Week', 'Month', 'Year']} value={view} onChange={setView} />
            <div className="glass-stack [--stack:var(--space-4)]">
              <GlassSwitch checked={notify} onChange={setNotify} wrapperClassName="justify-between">Notify me about replies</GlassSwitch>
              <GlassSwitch checked={sync} onChange={setSync} wrapperClassName="justify-between">Sync over mobile data</GlassSwitch>
            </div>
            <GlassSlider label="Volume" value={volume} onChange={setVolume} format={(v) => `${v}%`} />
          </div>

          <form className="glass-stack [--stack:var(--space-4)]" onSubmit={(e) => { e.preventDefault(); onToast('success'); }}>
            <h3 className="glass-caption">Fields</h3>
            <label className="glass-stack [--stack:var(--space-2)]">
              <span className="glass-small text-[var(--color-text-muted)]">Name</span>
              <GlassInput placeholder="Ada Lovelace" autoComplete="off" />
            </label>
            <label className="glass-stack [--stack:var(--space-2)]">
              <span className="glass-small text-[var(--color-text-muted)]">Message</span>
              <GlassTextarea rows={3} placeholder="What are you working on?" />
            </label>
            <div>
              <GlassPill variant="accent" type="submit">Save changes</GlassPill>
            </div>
          </form>
        </div>
      </GlassPanel>
    </Section>
  );
};

// ── Spacing teaser ──────────────────────────────────────────────────────────

const STEPS = [
  { n: 1, px: 4, use: 'Icon to label' },
  { n: 2, px: 8, use: 'Pills in a group' },
  { n: 3, px: 12, use: 'Label to field' },
  { n: 4, px: 16, use: 'Inside small parts' },
  { n: 6, px: 24, use: 'Related blocks' },
  { n: 8, px: 32, use: 'Card padding' },
  { n: 12, px: 48, use: 'Heading to content' },
  { n: 16, px: 64, use: 'Groups in a section' },
  { n: 24, px: 96, use: 'Sections' },
  { n: 32, px: 128, use: 'Hero breathing room' },
];

// A card with its spacing drawn on, the way browser dev tools show it.
const Specimen: React.FC = () => (
  <figure className="specimen">
    <GlassPanel intensity="medium" padding="none" topGlow={false} className="specimen__card">
      <span className="specimen__pad" aria-hidden="true"><span>8</span></span>
      <div className="specimen__content">
        <p className="glass-h4">Invoice #2041</p>
        <span className="specimen__gap specimen__gap--3" aria-hidden="true"><span>3</span></span>
        <p className="glass-small">Due Friday. Paid by card ending 4242.</p>
        <span className="specimen__gap specimen__gap--6" aria-hidden="true"><span>6</span></span>
        <div className="specimen__row">
          <GlassPill size="sm" variant="accent">Pay now</GlassPill>
          <span className="specimen__gap specimen__gap--x" aria-hidden="true"><span>2</span></span>
          <GlassPill size="sm">Download</GlassPill>
        </div>
      </div>
    </GlassPanel>
    <figcaption className="glass-small">
      Padding 8, title to body 3, body to actions 6, between pills 2. Big gaps hold small ones; never the reverse.
    </figcaption>
  </figure>
);

const Spacing: React.FC = () => (
  <Section
    title="Spacing you can count"
    lede="Ten steps on a 4px grid, each about half again the last, so neighbours never look almost-equal. The numbers match Tailwind: var(--space-6) is p-6."
    aside={<GlassPill as={Link} to="/foundations">See every token</GlassPill>}
  >
    <div className="spacing-grid">
    <GlassPanel intensity="subtle" padding="md" topGlow={false}>
      <ol className="space-ruler">
        {STEPS.map((s) => (
          <li key={s.n}>
            <code className="space-ruler__token">--space-{s.n}</code>
            <span className="space-ruler__bar" style={{ width: `var(--space-${s.n})` }} />
            <span className="space-ruler__px tabular-nums">{s.px}</span>
            <span className="glass-small space-ruler__use">{s.use}</span>
          </li>
        ))}
      </ol>
    </GlassPanel>
    <Specimen />
    </div>
  </Section>
);

// ── Motion ──────────────────────────────────────────────────────────────────

const EASES = [
  { token: '--ease-glass', use: 'Things arriving: panels, the light following your pointer.' },
  { token: '--ease-spring', use: 'Things you press: pills, switches, toasts. Overshoots slightly, then settles.' },
  { token: '--ease-in-glass', use: 'Things leaving. Starts slow, then gets out of the way.' },
];

const EaseTrack: React.FC<{ token: string; use: string; at: boolean }> = ({ token, use, at }) => (
  <div className="ease-row">
    <div>
      <code className="text-[0.8125rem] text-[var(--color-light)]">{token}</code>
      <p className="glass-small mt-[var(--space-1)]">{use}</p>
    </div>
    <div className="ease-track">
      <span
        aria-hidden="true"
        className="ease-track__bead"
        style={{ left: at ? 'calc(100% - 1.75rem)' : '0.25rem', transition: `left var(--dur-4) var(${token})` }}
      />
    </div>
  </div>
);

const Motion: React.FC = () => {
  const [at, setAt] = useState(false);
  return (
    <Section
      title="Three curves"
      lede="Motion answers something you did. Pick one of these and a duration step: 140, 280, 560 or 1120ms."
      aside={<GlassPill variant="active" onClick={() => setAt((v) => !v)}>{at ? 'Send back' : 'Play'}</GlassPill>}
    >
      <GlassPanel intensity="subtle" padding="md" topGlow={false}>
        <div className="glass-stack [--stack:var(--space-8)]">
          {EASES.map((e) => <EaseTrack key={e.token} {...e} at={at} />)}
        </div>
      </GlassPanel>
    </Section>
  );
};

// ── Get started ─────────────────────────────────────────────────────────────

const GetStarted: React.FC = () => (
  <Section title="Start building" lede="Install from GitHub, import the styles once, and wrap your app in a provider.">
    <div className="start-grid">
      <CodeBlock>{`// main.tsx
import { GlassProvider } from 'glass-design-system';
import 'glass-design-system/styles';

<GlassProvider blur={40} opacity={0.66}>
  <App />
</GlassProvider>`}</CodeBlock>
      <nav aria-label="Next steps" className="start-links">
        <Link to="/components" className="start-link">
          <span className="glass-h4">Components</span>
          <span className="glass-small">Props, variants and rules for every part.</span>
        </Link>
        <Link to="/layouts" className="start-link">
          <span className="glass-h4">Layouts</span>
          <span className="glass-small">Grids, sidebars, dashboards and stacking.</span>
        </Link>
        <Link to="/examples" className="start-link">
          <span className="glass-h4">Examples</span>
          <span className="glass-small">Whole screens built from the parts.</span>
        </Link>
      </nav>
    </div>
  </Section>
);

// ── Page ────────────────────────────────────────────────────────────────────

const Home: React.FC = () => {
  const [toast, setToast] = useState<GlassToastTone | null>(null);
  const [lastTone, setLastTone] = useState<GlassToastTone>('success');

  const showToast = (tone: GlassToastTone) => {
    setLastTone(tone);
    setToast(tone);
  };

  return (
    <div className="relative">
      <GlassOrbs preset="kiln" speed={7} opacity={0.9} fixed />

      <div className="relative z-10">
        <Hero />
        <Anatomy />
        <Depth />
        <Controls onToast={showToast} />
        <Spacing />
        <Motion />
        <GetStarted />
      </div>

      <GlassToast open={toast !== null} tone={toast ?? lastTone} onClose={() => setToast(null)}>
        {TOAST_COPY[toast ?? lastTone]}
      </GlassToast>
    </div>
  );
};

export default Home;
