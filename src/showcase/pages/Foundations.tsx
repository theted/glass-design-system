import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { GlassButton, GlassCluster, GlassGrid, GlassPanel, GlassStack } from 'glass-design-system';
import type { GlassRadius } from 'glass-design-system';
import { PlayIcon } from '../demos/icons';
import { InlineCode, Page, PageHeader, Section } from '../site/Page';

const PRINCIPLES: [string, ReactNode][] = [
  ['One light, upper right.', 'Every rim catches it there, the backdrop’s sun sits there, the sheen rests there. Layering panes never contradicts it.'],
  ['The backdrop is content.', 'Glass frames what’s behind it. Give it colour and light to blur, or use plain text instead.'],
  ['Depth is thickness.', 'subtle, medium, strong: closer panes are denser and cast deeper shadows. Never put a thinner pane on a thicker one.'],
  ['Warm means lit.', 'The light’s hue marks what catches it: the primary action, focus, anything on. Nothing decorative is warm.'],
  ['Motion answers you.', 'Light follows the pointer, a press springs back, a toast lands. Nothing moves on its own except the backdrop’s slow drift.'],
];

const COLOURS: { group: string; tokens: [string, string][] }[] = [
  { group: 'Ground', tokens: [['--color-ground', 'The page behind the glass.'], ['--color-ground-deep', 'Where the gradient ends; html’s background.']] },
  {
    group: 'Text',
    tokens: [
      ['--color-text', 'Headings, values, anything read first.'],
      ['--color-text-muted', 'Running text and labels.'],
      ['--color-text-subtle', 'Hints, captions, metadata.'],
    ],
  },
  {
    group: 'Glass',
    tokens: [
      ['--color-line', 'Hairlines and borders.'],
      ['--color-fill', 'Clear glass of buttons and badges.'],
      ['--color-fill-active', 'Selected: denser, brighter glass.'],
      ['--color-well', 'Recessed: fields, tracks, trays.'],
    ],
  },
  {
    group: 'Light',
    tokens: [
      ['--color-light', 'Focus, the primary action, anything on.'],
      ['--color-light-bright', 'Highlights and code on dark wells.'],
      ['--color-light-soft', 'Focus rings and lit backgrounds.'],
      ['--color-on-light', 'Ink on the light.'],
    ],
  },
  {
    group: 'Status',
    tokens: [
      ['--color-success', 'Done, live, saved.'],
      ['--color-warning', 'Needs a look.'],
      ['--color-danger', 'Failed, or can’t be undone.'],
      ['--color-info', 'Neutral news.'],
    ],
  },
];

const TYPE: [string, string, string, string][] = [
  ['glass-display', '--step-7', '57 → 107px', 'Cool glass, warm light'],
  ['glass-h1', '--step-6', '48 → 82px', 'Low sun, cold water'],
  ['glass-h2', '--step-4', '33 → 49px', 'Snippets you reach for'],
  ['glass-h3', '--step-2', '23 → 29px', 'Recent activity'],
  ['glass-h4', '--step-1', '19 → 22px', 'Notifications'],
  ['glass-lede', '--step-1', '19 → 22px', 'A design system where every surface is one material.'],
  ['glass-body', '--step-0', '16 → 17px', 'Running text sits at a comfortable measure, around 62 characters.'],
  ['glass-label', '--step--1', '14px', 'Email address'],
  ['glass-small', '--step--1', '14px', 'Only used to reply to you.'],
  ['glass-caption', '--step--2', '12px', 'Edited 2 minutes ago'],
];

const SPACE: [number, string][] = [
  [1, 'Icon ↔ label'],
  [2, 'Buttons in a group'],
  [3, 'Label ↔ field'],
  [4, 'Inside compact parts'],
  [6, 'Between related blocks'],
  [8, 'Card padding, form groups'],
  [12, 'Heading ↔ section content'],
  [16, 'Groups in a section'],
  [24, 'Between sections'],
  [32, 'Hero breathing room'],
];

const RADII: [GlassRadius, string][] = [
  ['chip', '6px'],
  ['field', '10px'],
  ['card', '14px'],
  ['panel', '20px'],
  ['sheet', '26px'],
  ['round', 'pill'],
];

const CURVES: [string, string][] = [
  ['--ease-glass', 'Arriving: panes, the light following you. Decelerates hard, like something heavy settling.'],
  ['--ease-spring', 'Pressed and released: buttons, switches, toasts. Overshoots a little, then settles.'],
  ['--ease-in-glass', 'Leaving: starts slow, then gets out of the way.'],
];

const Motion = () => {
  const [on, setOn] = useState(false);
  return (
    <GlassStack gap={6}>
      {CURVES.map(([token, use]) => (
        <div key={token} className="glass-split" style={{ '--glass-side': '16rem', alignItems: 'center' } as CSSProperties}>
          <GlassStack gap={1}>
            <code className="scale__token" style={{ color: 'var(--color-light-bright)' }}>{token}</code>
            <span className="glass-small">{use}</span>
          </GlassStack>
          <div
            className="motion-lane"
            data-on={on}
            style={{ '--_ease': `var(${token})` } as CSSProperties}
          >
            <span className="motion-lane__bead" />
          </div>
        </div>
      ))}
      <GlassCluster gap={4}>
        <GlassButton onClick={() => setOn(!on)}>
          <PlayIcon /> {on ? 'Back' : 'Play'}
        </GlassButton>
        <span className="glass-small">
          Durations double: <InlineCode>--dur-1</InlineCode> 140ms, <InlineCode>--dur-2</InlineCode> 280ms,{' '}
          <InlineCode>--dur-3</InlineCode> 560ms, <InlineCode>--dur-4</InlineCode> 1120ms.
        </span>
      </GlassCluster>
    </GlassStack>
  );
};

const Foundations = () => (
  <Page>
    <PageHeader
      title="Foundations"
      lede="The tokens every component is built from: colour, type, space, shape, depth and motion. Use the steps; don’t invent values between them."
    />

    <Section id="principles" title="Principles">
      <GlassGrid min="16rem" gap={8}>
        {PRINCIPLES.map(([title, body]) => (
          <GlassStack key={title} gap={2} className="principle">
            <h3 className="glass-h4">{title}</h3>
            <p className="glass-small">{body}</p>
          </GlassStack>
        ))}
      </GlassGrid>
    </Section>

    <Section
      id="colour"
      title="Colour"
      lede="All OKLCH, all derived from two hues: --glass-hue for the cool body, --light-hue for the light. These swatches are the live tokens, so the Theme panel changes them."
    >
      <GlassStack gap={12}>
        {COLOURS.map(({ group, tokens }) => (
          <GlassStack key={group} gap={4}>
            <h3 className="glass-h4">{group}</h3>
            <div className="swatches">
              {tokens.map(([token, note]) => (
                <div key={token} className="swatch">
                  <div className="swatch__chip" style={{ background: `var(${token})` }} />
                  <code className="swatch__name">{token}</code>
                  <span className="swatch__note">{note}</span>
                </div>
              ))}
            </div>
          </GlassStack>
        ))}
      </GlassStack>
    </Section>

    <Section
      id="type"
      title="Type"
      lede="Bricolage Grotesque for display, light and tightly set; Schibsted Grotesk for reading; JetBrains Mono for code. A fluid scale from 12px up; one class per role."
    >
      <div>
        {TYPE.map(([cls, step, size, sample]) => (
          <div key={cls} className="type-row">
            <div className="type-row__meta">
              <code className="scale__token">.{cls}</code>
              <span className="glass-caption">
                {step} · {size}
              </span>
            </div>
            <p className={cls} style={{ minWidth: 0 }}>
              {sample}
            </p>
          </div>
        ))}
      </div>
    </Section>

    <Section
      id="space"
      title="Space"
      lede="Ten steps on a 4px grid, each about half again the last, named like Tailwind’s numbers: var(--space-6) is p-6 is 24px. Big gaps hold small ones."
    >
      <div className="scale">
        {SPACE.map(([step, use]) => (
          <div key={step} className="scale__row">
            <code className="scale__token">--space-{step}</code>
            <span className="scale__value">{step * 4}</span>
            <GlassCluster gap={4} style={{ flexWrap: 'nowrap', minWidth: 0 }}>
              <span className="scale__bar" style={{ width: `var(--space-${step})`, flex: 'none' }} />
              <span className="glass-small" style={{ whiteSpace: 'nowrap' }}>{use}</span>
            </GlassCluster>
          </div>
        ))}
      </div>
      <p className="glass-small glass-measure">
        Page structure uses four fluid tokens instead: <InlineCode>--space-gutter</InlineCode> (16 → 40px),{' '}
        <InlineCode>--space-section</InlineCode> (64 → 128px), <InlineCode>--space-panel</InlineCode> (20 → 40px) and{' '}
        <InlineCode>--space-grid</InlineCode> (12 → 24px).
      </p>
    </Section>

    <Section id="shape" title="Shape" lede="Bigger things are rounder. Nested corners stay concentric when the inner radius is the outer one minus the padding.">
      <GlassGrid min="9rem" gap={4}>
        {RADII.map(([name, size]) => (
          <GlassPanel key={name} radius={name} padding="none" pointerLight={false} className="radius-demo">
            <span>--radius-{name}</span>
            <span className="glass-caption">{size}</span>
          </GlassPanel>
        ))}
      </GlassGrid>
    </Section>

    <Section id="depth" title="Depth" lede="Three thicknesses of glass, each with its own shadow. The higher the step, the softer and further the shadow falls.">
      <GlassGrid min="13rem" gap={8}>
        {(['subtle', 'medium', 'strong'] as const).map((intensity, i) => (
          <GlassPanel key={intensity} intensity={intensity} radius="card">
            <GlassStack gap={2}>
              <h3 className="glass-h4">{intensity}</h3>
              <code className="scale__token">--elevation-{i + 1}</code>
            </GlassStack>
          </GlassPanel>
        ))}
      </GlassGrid>
    </Section>

    <Section id="motion" title="Motion" lede="Three curves and a doubling duration scale. Pick one of each; prefers-reduced-motion collapses them all.">
      <Motion />
    </Section>
  </Page>
);

export default Foundations;
