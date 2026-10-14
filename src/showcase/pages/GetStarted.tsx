import { Link } from 'react-router-dom';
import { GlassButton, GlassCluster, GlassPanel, GlassStack } from 'glass-design-system';
import { ArrowRightIcon } from '../demos/icons';
import { CodeBlock, Snippet } from '../site/Code';
import { InlineCode, Page, PageHeader, PropsTable, Section } from '../site/Page';

const PACKAGE = `"dependencies": {
  "glass-design-system": "github:theted/glass-design-system"
}`;

const SETUP = `// main.tsx: the stylesheet once, before your own CSS
import 'glass-design-system/styles';
import './app.css';

// App.tsx: one backdrop for the whole app
import { GlassBackdrop } from 'glass-design-system';

export const App = () => (
  <>
    <GlassBackdrop fixed texture="grain" />
    <Routes />
  </>
);`;

const FIRST_SCREEN = `import { useState } from 'react';
import {
  GlassButton, GlassCluster, GlassContainer, GlassField,
  GlassInput, GlassPanel, GlassStack, GlassToast,
} from 'glass-design-system';

export const Subscribe = () => {
  const [sent, setSent] = useState(false);

  return (
    <GlassContainer width="narrow" className="glass-section">
      <GlassPanel as="form" intensity="strong" padding="lg" glow
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <GlassStack gap={6}>
          <h1 className="glass-h2">Field notes</h1>
          <p className="glass-body">One email a month. Unsubscribe in a click.</p>
          <GlassField label="Email">
            <GlassInput type="email" autoComplete="email" required />
          </GlassField>
          <GlassCluster justify="end">
            <GlassButton type="submit" variant="primary">Subscribe</GlassButton>
          </GlassCluster>
        </GlassStack>
      </GlassPanel>
      <GlassToast open={sent} onClose={() => setSent(false)}>
        You're on the list.
      </GlassToast>
    </GlassContainer>
  );
};`;

const TAILWIND = `/* app.css */
@import 'glass-design-system/styles';
@import 'tailwindcss';
@import 'glass-design-system/tailwind';`;

const TAILWIND_USE = `<p className="text-muted font-display text-step-2">…</p>
<div className="rounded-card bg-well border border-line p-panel shadow-2">…</div>
<button className="transition ease-spring">…</button>`;

const HTML = `<link rel="stylesheet" href="node_modules/glass-design-system/dist/glass.css" />

<div class="glass-backdrop glass-backdrop--fixed" aria-hidden="true">
  <span class="glass-backdrop__orb"></span><span class="glass-backdrop__orb"></span>
  <span class="glass-backdrop__orb"></span><span class="glass-backdrop__orb"></span>
  <span class="glass-backdrop__orb"></span><span class="glass-backdrop__orb"></span>
</div>

<main class="glass-container glass-section">
  <article class="glass glass--strong glass--pad-lg">
    <h1 class="glass-h2">Plain HTML</h1>
    <p class="glass-body">The material, the type and the controls are all classes.</p>
    <button class="glass-button glass-button--primary">It works</button>
  </article>
</main>`;

const Upgrade = () => (
  <PropsTable
    rows={[
      { name: 'GlassPill', type: 'GlassButton', description: <>variant accent → primary, default → secondary, active → pressed (or aria-current).</> },
      { name: 'GlassPanel', type: 'GlassPanel', description: <>topGlow / bottomGlow → glow (off by default), spectrum → prism (off by default), rounded="rounded-…" → radius="card". padding now defaults to md.</> },
      { name: 'GlassInputWrap', type: 'GlassInput leading / trailing', description: <>Or put className="glass-input" on your own control. Focus is pure CSS now.</> },
      { name: 'GlassOrbs, BG_PRESETS, PATTERNS', type: 'GlassBackdrop', description: <>Twelve orb presets, fifteen gradients and twelve patterns became six palettes, motion on or off, and four textures.</> },
      { name: 'getGlassStyles, CARD_BG_ALPHA, GLOW_*', type: 'class="glass"', description: <>The material is CSS now. A custom surface is a className, not a style object.</> },
      { name: 'GlassProvider lightAlpha / shadowAlpha', type: 'sheen, hue, lightHue', description: <>The provider sets CSS variables; shadowAlpha went with the shade layer.</> },
      { name: 'text-bevel utilities', type: '(removed)', description: <>Text on glass doesn’t need a shadow any more.</> },
    ]}
  />
);

const GetStarted = () => (
  <Page>
    <PageHeader
      title="Get started"
      lede="Glass is a React 19 library with a stylesheet you can use on its own. It installs straight from GitHub, pre-built."
    />

    <Section id="install" title="Install">
      <Snippet>npm install github:theted/glass-design-system</Snippet>
      <p className="glass-body glass-measure">
        That adds this to <InlineCode>package.json</InlineCode>. The build is committed, so there’s nothing to configure:
        no aliases, no workspace, no Tailwind scanning.
      </p>
      <CodeBlock title="package.json" collapsible={false}>
        {PACKAGE}
      </CodeBlock>
    </Section>

    <Section
      id="setup"
      title="Set up"
      lede="Two things: the stylesheet once at the root, and a backdrop. Glass needs light behind it; on a flat colour it's just grey."
    >
      <CodeBlock title="main.tsx" collapsible={false}>
        {SETUP}
      </CodeBlock>
      <p className="glass-body glass-measure">
        The stylesheet brings the fonts, the tokens, a few element defaults and every component. Tokens sit in{' '}
        <InlineCode>@layer theme</InlineCode>, components in <InlineCode>@layer components</InlineCode>, so anything you
        write overrides them without a specificity fight.
      </p>
    </Section>

    <Section id="first-screen" title="A first screen" lede="A form on strong glass, a field, a button and a toast. No CSS of your own.">
      <CodeBlock title="Subscribe.tsx">{FIRST_SCREEN}</CodeBlock>
    </Section>

    <Section
      id="tailwind"
      title="With Tailwind"
      lede="Import the bridge after Tailwind and the tokens become utilities. They read the live CSS variables, so they follow the knobs too."
    >
      <CodeBlock title="app.css" collapsible={false}>
        {TAILWIND}
      </CodeBlock>
      <CodeBlock title="Any component" collapsible={false}>
        {TAILWIND_USE}
      </CodeBlock>
      <p className="glass-small glass-measure">
        Colours: fg, muted, subtle, ground, line, fill, well, light, success, warning, danger, info. Type: font-display,
        font-body, font-code, text-step--2 … text-step-7. Space: Tailwind’s own steps plus gutter, section, panel and
        grid. Shape: rounded-chip … rounded-sheet. Depth: shadow-1 … shadow-3. Motion: ease-glass, ease-spring,
        ease-in-glass.
      </p>
    </Section>

    <Section id="theming" title="Theme it" lede="Five CSS variables. Set them on :root for the whole app.">
      <CodeBlock title="app.css" collapsible={false}>{`:root {
  --glass-blur: 40px;     /* how frosted */
  --glass-opacity: 0.66;  /* how dense the tint is, 0 → 1 */
  --glass-sheen: 0.22;    /* the light under the pointer */
  --glass-hue: 262;       /* the glass and every neutral */
  --light-hue: 76;        /* the light: rims, focus, the primary action */
}`}</CodeBlock>
      <GlassCluster gap={3}>
        <GlassButton as={Link} to="/components/theming">
          Theming in depth <ArrowRightIcon />
        </GlassButton>
        <GlassButton as={Link} to="/#knobs" variant="ghost">
          Try the knobs
        </GlassButton>
      </GlassCluster>
    </Section>

    <Section id="html" title="Without React" lede="Every component is a class first. The React layer adds types, wiring and the pointer light.">
      <CodeBlock title="index.html">{HTML}</CodeBlock>
    </Section>

    <Section
      id="upgrading"
      title="Upgrading from 0.x"
      lede="1.0 is a clean break: fewer layers, fewer presets, a CSS-first material. The main renames:"
    >
      <Upgrade />
      <GlassPanel intensity="subtle" radius="card" padding="sm">
        <GlassStack gap={2}>
          <p className="glass-label" style={{ color: 'var(--color-text)' }}>The full list, with before-and-after code</p>
          <p className="glass-small">
            MIGRATION.md in the repository covers every removed export and its replacement, including the patterns
            the Snippets app and the portfolio used.{' '}
            <a className="glass-link" href="https://github.com/theted/glass-design-system/blob/master/MIGRATION.md">
              Read the migration guide
            </a>
          </p>
        </GlassStack>
      </GlassPanel>
    </Section>
  </Page>
);

export default GetStarted;
