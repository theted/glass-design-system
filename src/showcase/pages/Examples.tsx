import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  GlassPanel,
  GlassPill,
  GlassInput,
  GlassDivider,
  GlassOrbs,
  GlassSwitch,
  GlassSlider,
  GlassSegmented,
  GlassProvider,
  type OrbPreset,
} from 'glass-design-system';
import { PageHeader, Section, JumpLinks } from '../components/Page';
import './examples-page.css';

/** A rounded window onto its own backdrop, so each example shows the glass on something. */
const Stage: React.FC<React.PropsWithChildren<{ preset: OrbPreset; className?: string }>> = ({ preset, className = '', children }) => (
  <div className={`stage ${className}`.trim()}>
    <GlassOrbs preset={preset} speed={9} opacity={0.9} />
    <div className="stage__content">{children}</div>
  </div>
);

const Icon: React.FC<{ d: string; size?: number }> = ({ d, size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const I = {
  bell: 'M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0',
  sun: 'M12 3v2M12 19v2M5 12H3M21 12h-2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M6.3 17.7l1.4-1.4M16.3 7.7l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8',
  lock: 'M7 11V7a5 5 0 0 1 10 0v4M5 11h14v10H5z',
  user: 'M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10',
  search: 'M21 21l-4.3-4.3M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14',
  file: 'M14 3H6v18h12V7zM14 3v4h4',
  play: 'M7 4v16l13-8z',
  pause: 'M8 4v16M16 4v16',
  prev: 'M19 20L9 12l10-8zM5 4v16',
  next: 'M5 4l10 8-10 8zM19 4v16',
  check: 'M5 12.5l4.5 4.5L19 7',
  git: 'M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6M18 9a9 9 0 0 1-9 9',
};

// ── Settings ────────────────────────────────────────────────────────────────

const SETTINGS_NAV = [
  { id: 'general', label: 'General', icon: I.user },
  { id: 'notifications', label: 'Notifications', icon: I.bell },
  { id: 'appearance', label: 'Appearance', icon: I.sun },
  { id: 'privacy', label: 'Privacy', icon: I.lock },
];

const Settings: React.FC = () => {
  const [tab, setTab] = useState('appearance');
  const [theme, setTheme] = useState('Dark');
  const [size, setSize] = useState(17);
  const [motion, setMotion] = useState(true);
  const [contrast, setContrast] = useState(false);
  const [blur, setBlur] = useState(40);

  return (
    <Stage preset="kiln" className="stage--tall">
      <GlassProvider blur={blur} opacity={contrast ? 0.95 : undefined}>
        <GlassPanel intensity="strong" topGlow={false} className="settings">
          <nav aria-label="Settings sections" className="settings__nav">
            <p className="glass-caption settings__nav-title">Settings</p>
            {SETTINGS_NAV.map((n) => (
              <GlassPill
                key={n.id}
                variant={tab === n.id ? 'active' : 'ghost'}
                aria-current={tab === n.id ? 'page' : undefined}
                onClick={() => setTab(n.id)}
                className="settings__nav-item"
              >
                <Icon d={n.icon} size={16} />
                {n.label}
              </GlassPill>
            ))}
          </nav>

          {tab !== 'appearance' ? (
            <div className="settings__body settings__body--empty">
              <h3 className="glass-h3">{SETTINGS_NAV.find((n) => n.id === tab)?.label}</h3>
              <p className="glass-small">This demo only wires up Appearance. Its controls change this window live.</p>
              <div><GlassPill size="sm" onClick={() => setTab('appearance')}>Open Appearance</GlassPill></div>
            </div>
          ) : (
          <div className="settings__body">
            <div className="glass-stack [--stack:var(--space-2)]">
              <h3 className="glass-h3">Appearance</h3>
              <p className="glass-small">Changes apply right away, on this device only.</p>
            </div>

            <div className="settings__group">
              <div className="settings__row">
                <div>
                  <p className="settings__label">Theme</p>
                  <p className="glass-caption">Auto follows your system.</p>
                </div>
                <GlassSegmented aria-label="Theme" size="sm" options={['Auto', 'Dark', 'Darker']} value={theme} onChange={setTheme} />
              </div>
              <GlassDivider />
              <div className="settings__row settings__row--stack">
                <GlassSlider label="Text size" min={14} max={22} value={size} onChange={setSize} format={(v) => `${v}px`} />
                <p className="settings__preview" style={{ fontSize: `${size}px` }}>The quick brown fox, frosted.</p>
              </div>
              <GlassDivider />
              <div className="settings__row settings__row--stack">
                <GlassSlider label="Glass blur" min={0} max={80} value={blur} onChange={setBlur} format={(v) => `${v}px`} />
                <p className="glass-caption">This window is wrapped in its own GlassProvider; drag to frost it.</p>
              </div>
            </div>

            <div className="settings__group">
              <div className="settings__row">
                <div>
                  <p className="settings__label">Animations</p>
                  <p className="glass-caption">Off honours reduced motion everywhere.</p>
                </div>
                <GlassSwitch checked={motion} onChange={setMotion} aria-label="Animations" />
              </div>
              <GlassDivider />
              <div className="settings__row">
                <div>
                  <p className="settings__label">Increase contrast</p>
                  <p className="glass-caption">Denser glass behind text.</p>
                </div>
                <GlassSwitch checked={contrast} onChange={setContrast} aria-label="Increase contrast" />
              </div>
            </div>
          </div>
          )}
        </GlassPanel>
      </GlassProvider>
    </Stage>
  );
};

// ── Command palette ─────────────────────────────────────────────────────────

const COMMANDS = [
  { group: 'Snippets', items: [
    { icon: I.file, label: 'debounce.ts', hint: 'TypeScript' },
    { icon: I.file, label: 'useMeasure.tsx', hint: 'React' },
  ] },
  { group: 'Actions', items: [
    { icon: I.git, label: 'Open repository on GitHub', hint: '⌘ G' },
    { icon: I.sun, label: 'Switch backdrop', hint: '⌘ B' },
    { icon: I.bell, label: 'Mute notifications for an hour', hint: '⌘ M' },
  ] },
];

const CommandPalette: React.FC = () => {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const all = COMMANDS.flatMap((g) => g.items.map((it) => ({ ...it, group: g.group })))
    .filter((it) => it.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <Stage preset="nebula" className="stage--palette">
      {/* The page behind: a subtle pane, dimmed */}
      <GlassPanel intensity="subtle" topGlow={false} className="palette__behind" aria-hidden="true">
        <div className="palette__behind-lines"><i /><i /><i /><i /></div>
      </GlassPanel>

      <GlassPanel intensity="strong" topGlow={false} className="palette">
        <div className="palette__search">
          <Icon d={I.search} />
          <GlassInput
            placeholder="Search snippets and actions"
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(all.length - 1, a + 1)); }
              if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
            }}
            aria-label="Search"
            shimmer={false}
            wrapperClassName="palette__field"
          />
          <kbd className="kbd">Esc</kbd>
        </div>
        <ul className="palette__list" role="listbox" aria-label="Results">
          {all.length === 0 && <li className="glass-small palette__empty">Nothing matches “{q}”. Try a file name or an action.</li>}
          {all.map((it, i) => (
            <React.Fragment key={it.label}>
              {(i === 0 || all[i - 1].group !== it.group) && <li className="glass-caption palette__group" role="presentation">{it.group}</li>}
              <li
                role="option"
                aria-selected={i === active}
                className="palette__item"
                onMouseEnter={() => setActive(i)}
              >
                <Icon d={it.icon} size={16} />
                <span className="palette__label">{it.label}</span>
                <span className="glass-caption">{it.hint}</span>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </GlassPanel>
    </Stage>
  );
};

// ── Sign in ─────────────────────────────────────────────────────────────────

const SignIn: React.FC = () => {
  const [sent, setSent] = useState(false);
  return (
    <Stage preset="aurora">
      <GlassPanel intensity="strong" padding="md" topGlow={false} className="signin" as="form" onSubmit={(e: React.FormEvent) => { e.preventDefault(); setSent(true); }}>
        {sent ? (
          <div className="glass-stack [--stack:var(--space-4)] signin__done">
            <span className="signin__check"><Icon d={I.check} size={22} /></span>
            <h3 className="glass-h3">Check your inbox</h3>
            <p className="glass-small">We sent a sign-in link. It works once and expires in 15 minutes.</p>
            <GlassPill size="sm" variant="ghost" onClick={() => setSent(false)}>Use a different email</GlassPill>
          </div>
        ) : (
          <div className="glass-stack [--stack:var(--space-6)]">
            <div className="glass-stack [--stack:var(--space-2)]">
              <h3 className="glass-h3">Sign in to Snippets</h3>
              <p className="glass-small">We'll email you a link. No password to remember.</p>
            </div>
            <label className="glass-stack [--stack:var(--space-2)]">
              <span className="settings__label">Email</span>
              <GlassInput type="email" required placeholder="you@example.com" autoComplete="off" />
            </label>
            <GlassPill variant="accent" size="lg" type="submit" className="w-full">Email me a link</GlassPill>
            <div className="signin__or"><GlassDivider /><span className="glass-caption">or</span><GlassDivider /></div>
            <GlassPill size="lg" className="w-full"><Icon d={I.git} size={16} />Continue with GitHub</GlassPill>
          </div>
        )}
      </GlassPanel>
    </Stage>
  );
};

// ── Now playing ─────────────────────────────────────────────────────────────

const NowPlaying: React.FC = () => {
  const [playing, setPlaying] = useState(true);
  const [pos, setPos] = useState(84);
  const [vol, setVol] = useState(70);
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <Stage preset="ember">
      <GlassPanel intensity="medium" padding="md" bottomGlow className="player">
        <div className="player__art" aria-hidden="true" />
        <div className="glass-stack [--stack:var(--space-1)]">
          <p className="glass-h3">Low sun, cold water</p>
          <p className="glass-small">Kosta Ensemble, from Blown</p>
        </div>
        <div className="glass-stack [--stack:var(--space-2)]">
          <GlassSlider aria-label="Position" min={0} max={221} value={pos} onChange={setPos} />
          <div className="flex justify-between">
            <span className="glass-caption tabular-nums">{fmt(pos)}</span>
            <span className="glass-caption tabular-nums">-{fmt(221 - pos)}</span>
          </div>
        </div>
        <div className="player__controls">
          <GlassPill variant="ghost" aria-label="Previous"><Icon d={I.prev} /></GlassPill>
          <GlassPill variant="accent" size="lg" aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying((p) => !p)} className="player__play">
            <Icon d={playing ? I.pause : I.play} size={20} />
          </GlassPill>
          <GlassPill variant="ghost" aria-label="Next"><Icon d={I.next} /></GlassPill>
        </div>
        <GlassSlider aria-label="Volume" value={vol} onChange={setVol} />
      </GlassPanel>
    </Stage>
  );
};

// ── Notifications ───────────────────────────────────────────────────────────

const NOTES = [
  { who: 'Build finished', what: 'glass-design-system deployed to glass.sundbergsolutions.se in 48s.', when: 'now', tone: 'var(--color-success)' },
  { who: 'New comment', what: '“The new hover light is so much calmer.”', when: '4m', tone: 'var(--color-light)' },
  { who: 'Snippet starred', what: 'oklch-mix.css got its tenth star.', when: '1h', tone: 'var(--color-accent-bright)' },
];

const PEEK = 16; // px of each older note showing below the one in front
const GAP = 12;

const Notifications: React.FC = () => {
  const [open, setOpen] = useState(false);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);

  useLayoutEffect(() => {
    const read = () => setHeights(refs.current.map((el) => el?.offsetHeight ?? 0));
    read();
    const ro = new ResizeObserver(read);
    refs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, []);

  const offset = (i: number) =>
    open ? heights.slice(0, i).reduce((a, h) => a + h + GAP, 0) : i * PEEK;
  const total = open
    ? heights.reduce((a, h) => a + h, 0) + GAP * (heights.length - 1)
    : (heights[0] ?? 0) + PEEK * (heights.length - 1);

  return (
    <Stage preset="tide" className="stage--notes">
      <div className="glass-stack [--stack:var(--space-8)] items-center w-full">
        <div className={`notes${open ? ' notes--open' : ''}`} style={{ height: total || undefined }}>
          {NOTES.map((n, i) => (
            <GlassPanel
              key={n.who}
              ref={(el: HTMLElement | null) => { refs.current[i] = el; }}
              intensity={i === 0 ? 'strong' : i === 1 ? 'medium' : 'subtle'}
              topGlow={false}
              padding="sm"
              className="note"
              style={{
                zIndex: NOTES.length - i,
                transform: `translateY(${offset(i)}px) scale(${open ? 1 : 1 - i * 0.04})`,
              }}
            >
              <span className="note__dot" style={{ background: n.tone, boxShadow: `0 0 12px ${n.tone}` }} />
              <div className="note__text">
                <div className="flex items-baseline justify-between gap-[var(--space-3)]">
                  <p className="settings__label">{n.who}</p>
                  <span className="glass-caption">{n.when}</span>
                </div>
                <p className="glass-small">{n.what}</p>
              </div>
            </GlassPanel>
          ))}
        </div>
        <GlassPill size="sm" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? 'Stack them' : 'Show all three'}
        </GlassPill>
      </div>
    </Stage>
  );
};

// ── Page ────────────────────────────────────────────────────────────────────

const Examples: React.FC = () => (
  <div>
    <PageHeader
      title="Examples"
      lede="Whole screens built from the parts, each on its own backdrop. Every one is live: click, type, drag."
    >
      <JumpLinks
        items={[
          { id: 'settings', label: 'Settings' },
          { id: 'palette', label: 'Command palette' },
          { id: 'small', label: 'Sign in and player' },
          { id: 'notifications', label: 'Notifications' },
        ]}
      />
    </PageHeader>

    <Section
      id="settings"
      title="Settings"
      lede="A strong pane over the kiln backdrop: ghost pills for navigation, segmented control, sliders and switches, grouped on recessed trays."
    >
      <Settings />
    </Section>

    <Section
      id="palette"
      title="Command palette"
      lede="The closest pane of all over a dimmed subtle one. Type to filter; arrow keys move the selection."
    >
      <CommandPalette />
    </Section>

    <Section id="small" title="Sign in and player" lede="Small, single-purpose panes. One warm action each.">
      <div className="examples-pair">
        <SignIn />
        <NowPlaying />
      </div>
    </Section>

    <Section
      id="notifications"
      title="Notifications"
      lede="A stack in depth order: the newest is the densest, the oldest recedes. Fan them out to read them all."
    >
      <Notifications />
    </Section>
  </div>
);

export default Examples;
