import React from 'react';
import { Link } from 'react-router-dom';
import { GlassPanel, GlassOrbs } from 'glass-design-system';
import { PageHeader } from '../components/Page';

// ── Section wrapper ───────────────────────────────────────────────────────────

const Section: React.FC<React.PropsWithChildren<{ label: string; sub?: string }>> = ({ label, sub, children }) => (
  <section className="docs-section">
    <div className="mb-[var(--space-8)]">
      <h2 className="glass-h2">{label.replace(/^\d+\s*—\s*/, '')}</h2>
      {sub && <p className="glass-lede mt-[var(--space-3)]">{sub}</p>}
    </div>
    {children}
  </section>
);

// ── Divider ───────────────────────────────────────────────────────────────────

const Rule: React.FC = () => (
  <div className="my-8 h-px w-full" style={{ background: 'var(--color-border)' }} />
);

// ── Label chip ────────────────────────────────────────────────────────────────

const Chip: React.FC<React.PropsWithChildren> = ({ children }) => (
  <span
    className="inline-block rounded-full px-2.5 py-1 text-[0.75rem] font-semibold"
    style={{
      background: 'oklch(0.71 0.17 244 / 0.10)',
      border: '1px solid oklch(0.71 0.17 244 / 0.28)',
      color: 'var(--color-accent-bright)',
    }}
  >
    {children}
  </span>
);

const TypeShowcase: React.FC = () => (
  <div className="relative min-h-screen">
    <GlassOrbs preset="breathe" speed={14} opacity={0.35} />
    <div className="relative z-10">
      <PageHeader
        title="Type"
        lede={<>Three typefaces with one job each, three text effects for depth, and four colour roles. Sizes come from the step scale in <Link to="/foundations#type" className="underline decoration-[var(--color-light)] underline-offset-4">Foundations</Link>.</>}
      />
      <div className="glass-container">

      {/* ══════════════════════════════════════════════════════════════
          § 00 — Typefaces
      ══════════════════════════════════════════════════════════════ */}
      <Section label="00 — Typefaces" sub="Three families, each assigned a semantic role that never overlaps.">
        <div className="flex flex-col gap-10">

          {/* Bricolage Grotesque */}
          <GlassPanel intensity="medium" topGlow bottomGlow rounded="rounded-[2rem]" className="p-8 md:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <Chip>Display · var(--font-display)</Chip>
                <p className="mt-3 text-[0.8125rem] font-semibold text-[var(--color-text-subtle)] text-bevel">
                  Bricolage Grotesque · Variable grotesque · Weight 200–800, width 75–100
                </p>
              </div>
              <p className="text-xs leading-6 text-[var(--color-text-muted)] max-w-sm text-bevel">
                Used for hero headlines, titles, section headings, and any large display text.
                Its ink traps and optical sizing keep it lively when large; the width axis lets a
                headline condense without changing family.
              </p>
            </div>
            <Rule />
            <p className="font-[var(--font-display)] text-[clamp(2.5rem,8vw,5.5rem)] font-[200] leading-[0.88] tracking-[-0.07em] text-[var(--color-text)] text-bevel-strong">
              The quick brown fox<br />jumps over the lazy dog
            </p>
            <Rule />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mt-2">
              {([200, 300, 400, 700] as const).map((w) => (
                <div key={w}>
                  <p className="text-[0.75rem] font-semibold text-[var(--color-text-subtle)] text-bevel mb-1">
                    {w}
                  </p>
                  <p
                    className="font-[var(--font-display)] text-2xl leading-tight tracking-[-0.04em] text-[var(--color-text)] text-bevel-strong"
                    style={{ fontWeight: w }}
                  >
                    Snippets
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>

          {/* Schibsted Grotesk */}
          <GlassPanel intensity="medium" topGlow rounded="rounded-[2rem]" className="p-8 md:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <Chip>Body · var(--font-body)</Chip>
                <p className="mt-3 text-[0.8125rem] font-semibold text-[var(--color-text-subtle)] text-bevel">
                  Schibsted Grotesk · Newsroom grotesque · Weights 400–900
                </p>
              </div>
              <p className="text-xs leading-6 text-[var(--color-text-muted)] max-w-sm text-bevel">
                Used for all prose: descriptions, paragraphs, form labels, nav items. Drawn for a
                Nordic news publisher, it's built to stay calm and legible at small sizes.
              </p>
            </div>
            <Rule />
            <p
              className="text-[clamp(1.4rem,4vw,2.5rem)] font-[400] leading-[1.3] tracking-[-0.02em] text-[var(--color-text)] text-bevel-strong"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              A spacious, low-light workspace for the fragments you return to most.
              The interface stays quiet so the code can take the room.
            </p>
            <Rule />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mt-2">
              {([300, 400, 500, 700] as const).map((w) => (
                <div key={w}>
                  <p className="text-[0.75rem] font-semibold text-[var(--color-text-subtle)] text-bevel mb-1">
                    {w}
                  </p>
                  <p
                    className="text-2xl leading-tight tracking-[-0.02em] text-[var(--color-text)] text-bevel"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: w }}
                  >
                    Archive
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>

          {/* JetBrains Mono */}
          <GlassPanel intensity="subtle" rounded="rounded-[2rem]" className="p-8 md:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <Chip>Code · var(--font-code)</Chip>
                <p className="mt-3 text-[0.8125rem] font-semibold text-[var(--color-text-subtle)] text-bevel">
                  JetBrains Mono · Monospace · Ligatures enabled
                </p>
              </div>
              <p className="text-xs leading-6 text-[var(--color-text-muted)] max-w-sm text-bevel">
                Used exclusively for code blocks and inline code. Contextual ligatures
                ({'=>'}, {'<='}, {'!='}, {'/*'}) are enabled via{' '}
                <code className="font-[var(--font-code)] text-[var(--color-accent-bright)]">font-feature-settings</code>.
              </p>
            </div>
            <Rule />
            <pre
              className="overflow-x-auto text-[clamp(0.78rem,2.5vw,1.1rem)] leading-[1.8] tracking-[0.012em] text-[var(--color-text-muted)]"
              style={{ fontFamily: 'var(--font-code)', fontFeatureSettings: "'liga' 1, 'calt' 1" }}
            >
{`const fetchSnippets = async (query?: string) => {
  const url = query ? \`/api/snippets?q=\${query}\` : '/api/snippets';
  const res = await fetch(url);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json() as Promise<Snippet[]>;
};`}
            </pre>
            <Rule />
            {/* Ligature demo */}
            <div className="flex flex-wrap gap-6 mt-2">
              {['=> <=', '!= ==', '/* */', '-> <-', '|| &&', ':: ..'].map((pair) => (
                <div key={pair} className="text-center">
                  <p
                    className="text-xl text-[var(--color-accent-bright)]"
                    style={{ fontFamily: 'var(--font-code)', fontFeatureSettings: "'liga' 1, 'calt' 1" }}
                  >
                    {pair}
                  </p>
                  <p className="mt-1 text-[0.75rem] font-semibold text-[var(--color-text-subtle)]">
                    ligature
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>

        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          § 02 — Text effects
      ══════════════════════════════════════════════════════════════ */}
      <Section label="02 — Text effects" sub="Three text-shadow utilities for physical depth on different surfaces.">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">

          <GlassPanel intensity="medium" topGlow rounded="rounded-[2rem]" className="p-8">
            <Chip>text-bevel</Chip>
            <p className="mt-4 text-[0.75rem] font-semibold text-[var(--color-text-subtle)]">
              Default body text on dark glass
            </p>
            <p className="mt-5 font-[var(--font-display)] text-3xl font-[250] tracking-[-0.05em] text-[var(--color-text)] text-bevel leading-tight">
              Raised letterform.<br />Subtle bevel.
            </p>
            <Rule />
            <p className="font-[var(--font-code)] text-[0.75rem] text-[var(--color-text-subtle)]">
              text-shadow: 0 1px 1px black/48%,<br />0 -1px 0 white/7%
            </p>
          </GlassPanel>

          <GlassPanel intensity="strong" topGlow bottomGlow rounded="rounded-[2rem]" className="p-8">
            <Chip>text-bevel-strong</Chip>
            <p className="mt-4 text-[0.75rem] font-semibold text-[var(--color-text-subtle)]">
              Headlines and hero text
            </p>
            <p className="mt-5 font-[var(--font-display)] text-3xl font-[250] tracking-[-0.05em] text-[var(--color-text)] text-bevel-strong leading-tight">
              Deeper shadow.<br />More presence.
            </p>
            <Rule />
            <p className="font-[var(--font-code)] text-[0.75rem] text-[var(--color-text-subtle)]">
              text-shadow: 0 1px 2px black/62%,<br />0 -1px 0 white/20%,<br />0 2px 16px black/36%
            </p>
          </GlassPanel>

          <GlassPanel intensity="subtle" rounded="rounded-[2rem]" className="p-8">
            <Chip>No effect</Chip>
            <p className="mt-4 text-[0.75rem] font-semibold text-[var(--color-text-subtle)]">
              Plain text — baseline reference
            </p>
            <p className="mt-5 font-[var(--font-display)] text-3xl font-[250] tracking-[-0.05em] text-[var(--color-text)] leading-tight">
              Flat letterform.<br />No depth.
            </p>
            <Rule />
            <p className="font-[var(--font-code)] text-[0.75rem] text-[var(--color-text-subtle)]">
              text-shadow: none
            </p>
          </GlassPanel>

        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          § 03 — Text colour tokens
      ══════════════════════════════════════════════════════════════ */}
      <Section label="03 — Colour roles" sub="Four semantic text colours that form a natural hierarchy from prominent to receding.">
        <GlassPanel intensity="medium" topGlow rounded="rounded-[2rem]" className="overflow-hidden">
          {[
            { token: '--color-text',        role: 'Primary',  usage: 'Titles, headings, active labels, anything that demands attention first.' },
            { token: '--color-text-muted',  role: 'Body',     usage: 'Descriptions, paragraph text, form content — comfortably readable without competing.' },
            { token: '--color-text-subtle', role: 'Subtle',   usage: 'Kickers, metadata, timestamps, secondary labels — present but not dominant.' },
            { token: '--color-accent-bright', role: 'Accent', usage: 'Interactive highlights, code inline tokens, active state indicators.' },
          ].map(({ token, role, usage }) => (
            <div
              key={token}
              className="flex flex-wrap items-start gap-6 border-b border-[var(--color-border)] px-8 py-7 last:border-0"
            >
              <p
                className="font-[var(--font-display)] text-[clamp(1.4rem,3vw,2rem)] font-[300] tracking-[-0.03em] shrink-0 w-48"
                style={{ color: `var(${token})`, letterSpacing: '-0.03em' }}
              >
                {role}
              </p>
              <div className="flex-1 min-w-0">
                <p className="font-[var(--font-code)] text-[0.75rem] text-[var(--color-accent-bright)] mb-2">
                  var({token})
                </p>
                <p className="text-sm leading-6 text-[var(--color-text-muted)] text-bevel">{usage}</p>
              </div>
            </div>
          ))}
        </GlassPanel>
      </Section>

      {/* ══════════════════════════════════════════════════════════════
          § 04 — Type in context
      ══════════════════════════════════════════════════════════════ */}
      <Section label="04 — Composition" sub="All three typefaces working together in realistic content patterns.">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Snippet card replica */}
          <GlassPanel intensity="medium" topGlow bottomGlow rounded="rounded-[2.2rem]" className="p-10">
            <p className="text-[0.8125rem] font-semibold text-[var(--color-text-subtle)] text-bevel">
              Snippet 7
            </p>
            <h3 className="mt-4 font-[var(--font-display)] text-4xl font-[250] tracking-[-0.06em] text-[var(--color-text)] text-bevel-strong leading-tight">
              Debounce hook
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)] text-bevel">
              Returns a debounced version of the value that only updates after the
              specified delay has elapsed — prevents over-fetching on rapid keystrokes.
            </p>
            <div
              className="mt-6 overflow-hidden rounded-[1.4rem] p-4 text-sm leading-7"
              style={{
                background: 'oklch(0.14 0.016 258 / 0.55)',
                fontFamily: 'var(--font-code)',
                color: 'var(--color-text-muted)',
                fontSize: '0.82rem',
                lineHeight: 1.75,
              }}
            >
              <span style={{ color: 'oklch(0.72 0.18 290)' }}>function</span>
              {' useDebounce'}
              <span style={{ color: 'oklch(0.80 0.13 88)' }}>{'<T>'}</span>
              {'(value: T, ms = 600): T {\n  const [v, setV] = '}
              <span style={{ color: 'oklch(0.76 0.16 160)' }}>useState</span>
              {'(value);\n  '}
              <span style={{ color: 'oklch(0.76 0.16 160)' }}>useEffect</span>
              {'(() => {\n    const id = '}
              <span style={{ color: 'oklch(0.71 0.17 244)' }}>setTimeout</span>
              {'(() => setV(value), ms);\n    return () => clearTimeout(id);\n  }, [value, ms]);\n  return v;\n}'}
            </div>
          </GlassPanel>

          {/* Editorial / article layout */}
          <GlassPanel intensity="medium" topGlow rounded="rounded-[2.2rem]" className="p-10">
            <p className="text-[0.8125rem] font-semibold text-[var(--color-text-subtle)] text-bevel">
              Design principles
            </p>
            <h2 className="mt-3 font-[var(--font-display)] text-[2.4rem] font-[200] tracking-[-0.06em] text-[var(--color-text)] text-bevel-strong leading-[1.05]">
              Background is content.
            </h2>
            <p className="mt-5 text-sm leading-8 text-[var(--color-text-muted)] text-bevel">
              Glass works because what's behind the panel is intentionally beautiful.
              The frosted blur turns the dark gradient and animated orbs into an
              abstract texture — the panel doesn't hide its context, it frames it.
            </p>
            <p className="mt-4 text-sm leading-8 text-[var(--color-text-muted)] text-bevel">
              Every surface draws from two knobs:{' '}
              <code
                className="rounded px-1 text-[0.8em] text-[var(--color-accent-bright)]"
                style={{ fontFamily: 'var(--font-code)' }}
              >
                GLASS_OPACITY
              </code>
              {' '}and{' '}
              <code
                className="rounded px-1 text-[0.8em] text-[var(--color-accent-bright)]"
                style={{ fontFamily: 'var(--font-code)' }}
              >
                GLASS_BLUR
              </code>
              . Adjust them once and the entire interface shifts in unison.
            </p>
            <Rule />
            <div className="flex flex-wrap gap-2">
              {['glass', 'oklch', 'design-system', 'css'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 font-[var(--font-code)] text-[0.75rem] text-[var(--color-accent-bright)]"
                  style={{
                    background: 'oklch(0.71 0.17 244 / 0.10)',
                    border: '1px solid oklch(0.71 0.17 244 / 0.25)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </GlassPanel>

        </div>
      </Section>

      <Section label="07 — Fluid sizing" sub="How font sizes scale across viewports. No global zoom — sizing is handled per-element with CSS clamp().">
        <GlassPanel intensity="medium" topGlow rounded="rounded-[2rem]" className="p-8 md:p-10">
          <div className="relative z-10">
            <p className="mb-6 text-sm leading-7 text-[var(--color-text-muted)]">
              The Glass Design System does <strong className="text-[var(--color-text)]">not</strong> use a global font-size
              multiplier or document-wide zoom variable. Instead, every text element uses{' '}
              <code className="font-[var(--font-code)] text-[0.78em] text-[var(--color-accent-bright)]">clamp(min, preferred, max)</code>{' '}
              for fluid scaling that adapts to the viewport.
            </p>

            <Rule />

            <p className="mb-5 text-[0.75rem] font-semibold text-[var(--color-text-subtle)] text-bevel">
              How clamp() works
            </p>
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                { label: 'min', value: '3.5rem', desc: 'Floor — never smaller than this, even on narrow screens.' },
                { label: 'preferred', value: '10vw', desc: 'Scales linearly with viewport width. The "fluid" part.' },
                { label: 'max', value: '8rem', desc: 'Ceiling — stops growing past this on wide displays.' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-4" style={{ background: 'oklch(0.16 0.018 258 / 0.50)', border: '1px solid var(--color-border)' }}>
                  <code className="text-[0.8125rem] font-[var(--font-code)] text-[var(--color-accent-bright)]">{s.label}</code>
                  <p className="mt-1 font-[var(--font-display)] text-lg font-[300] text-[var(--color-text)] text-bevel">{s.value}</p>
                  <p className="mt-2 text-[0.8125rem] leading-5 text-[var(--color-text-muted)]">{s.desc}</p>
                </div>
              ))}
            </div>

            <Rule />

            <p className="mb-5 text-[0.75rem] font-semibold text-[var(--color-text-subtle)] text-bevel">
              The step scale: each token is one clamp()
            </p>
            <div className="space-y-4">
              {[
                { example: '--step-7  57 → 107px', use: 'Hero headline (.glass-display)', demo: 'Hero' },
                { example: '--step-6  48 → 82px', use: 'Page title (.glass-h1)', demo: 'Page' },
                { example: '--step-4  33 → 49px', use: 'Section title (.glass-h2)', demo: 'Section' },
                { example: '--step-1  19 → 22px', use: 'Small heading, lede', demo: 'Lede' },
                { example: '--step-0  16 → 17px', use: 'Body text', demo: 'Body' },
                { example: '--step--1 14px (fixed)', use: 'Secondary text, labels', demo: 'Small' },
                { example: '--step--2 12px (fixed)', use: 'Captions; the smallest text in the system', demo: 'Caption' },
              ].map((t) => (
                <div key={t.use} className="flex items-baseline gap-4">
                  <code className="w-[13rem] shrink-0 whitespace-pre font-[var(--font-code)] text-[0.8125rem] text-[var(--color-accent-bright)]">{t.example}</code>
                  <span className="text-sm text-[var(--color-text-muted)]">{t.use}</span>
                </div>
              ))}
            </div>

            <Rule />

            <p className="text-sm leading-7 text-[var(--color-text-muted)]">
              <strong className="text-[var(--color-text)]">Why no global zoom?</strong>{' '}
              A single multiplier scales everything uniformly — headings, body text, labels — which
              breaks visual hierarchy at extremes. Per-element clamp() lets each tier scale independently:
              large display text can grow fast while small text stays put at a readable size. The result is fluid
              typography that preserves hierarchy at every viewport width without a master knob.
            </p>
          </div>
        </GlassPanel>
      </Section>

      </div>
    </div>
  </div>
);

export default TypeShowcase;
