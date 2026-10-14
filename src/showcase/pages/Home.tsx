import { Link } from 'react-router-dom';
import {
  GlassBadge,
  GlassButton,
  GlassCluster,
  GlassGrid,
  GlassPanel,
  GlassSegmented,
  GlassSlider,
  GlassStack,
  GlassSwitch,
} from 'glass-design-system';
import { ArrowRightIcon, CheckIcon, PauseIcon } from '../demos/icons';
import Player from '../examples/Player';
import SignIn from '../examples/SignIn';
import { CodeBlock, Snippet } from '../site/Code';
import { InlineCode, Page, Section } from '../site/Page';
import { THEME_DEFAULTS, useTheme } from '../site/theme';

const INSTALL = 'npm install github:theted/glass-design-system';

const QUICK_START = `import { GlassBackdrop, GlassButton, GlassPanel } from 'glass-design-system';
import 'glass-design-system/styles';

export const App = () => (
  <>
    <GlassBackdrop fixed texture="grain" />
    <GlassPanel intensity="strong" glow>
      <h1 className="glass-h2">Hello, glass</h1>
      <GlassButton variant="primary">Get started</GlassButton>
    </GlassPanel>
  </>
);`;

const PRINCIPLES = [
  {
    title: 'One material',
    body: (
      <>
        Every surface is the same glass at one of three thicknesses. <InlineCode>class="glass"</InlineCode> draws the
        tint, the rim and the sheen; the components are thin, typed wrappers around classes like it.
      </>
    ),
  },
  {
    title: 'Cool glass, warm light',
    body: 'The glass and every neutral share one cool hue. The light is the only warm colour: rims, focus, the primary action, anything switched on. Nothing else is amber.',
  },
  {
    title: 'Five knobs',
    body: 'Blur, opacity, sheen and two hues, as CSS custom properties. Set them on :root, on a sidebar, or from React. Change one and every pane follows.',
  },
];

/** A little arrangement of real components, floating over the backdrop. */
const HeroScene = () => (
  <div className="hero__scene" aria-hidden="true" inert>
    <GlassPanel intensity="medium" radius="card" padding="sm" style={{ top: '0', left: '4%', width: '17rem' }}>
      <GlassStack gap={3}>
        <span className="glass-caption">Recent snippets</span>
        {['debounce.ts', 'useMeasure.tsx', 'retry.go'].map((file, i) => (
          <GlassCluster key={file} justify="between">
            <code style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{file}</code>
            <span className="glass-caption">{['2m', '1h', '3d'][i]}</span>
          </GlassCluster>
        ))}
      </GlassStack>
    </GlassPanel>

    <GlassPanel intensity="strong" radius="card" padding="sm" glow style={{ top: '7.5rem', right: '0', width: '19rem' }}>
      <GlassStack gap={4}>
        <GlassCluster gap={3} style={{ flexWrap: 'nowrap' }}>
          <span
            style={{
              width: '3rem',
              height: '3rem',
              flex: 'none',
              borderRadius: 'var(--radius-chip)',
              background: 'radial-gradient(circle at 70% 30%, oklch(0.95 0.08 85), oklch(0.75 0.17 50) 30%, oklch(0.42 0.16 285) 75%)',
            }}
          />
          <GlassStack gap={1} style={{ minWidth: 0 }}>
            <span className="glass-label" style={{ color: 'var(--color-text)' }}>Low sun, cold water</span>
            <span className="glass-caption">Kosta Ensemble</span>
          </GlassStack>
          <GlassButton icon size="sm" variant="primary" style={{ marginLeft: 'auto' }} tabIndex={-1}>
            <PauseIcon />
          </GlassButton>
        </GlassCluster>
        <GlassSlider aria-label="Position" defaultValue={38} tabIndex={-1} />
      </GlassStack>
    </GlassPanel>

    <GlassPanel intensity="strong" radius="card" padding="sm" style={{ top: '17rem', left: '0', width: '16rem' }}>
      <GlassStack gap={4}>
        <GlassSegmented size="sm" block aria-label="View" options={['Day', 'Week', 'Month']} value="Week" onChange={() => {}} />
        <GlassSwitch size="sm" block defaultChecked tabIndex={-1}>
          Sync
        </GlassSwitch>
      </GlassStack>
    </GlassPanel>

    <GlassPanel radius="round" padding="none" style={{ bottom: '0.5rem', right: '8%', padding: '0.5rem 1.1rem 0.5rem 0.6rem' }}>
      <GlassCluster gap={3}>
        <GlassBadge tone="success" style={{ padding: 0, width: '1.6rem', minHeight: '1.6rem', justifyContent: 'center' }}>
          <CheckIcon width="0.9rem" height="0.9rem" />
        </GlassBadge>
        <span className="glass-small" style={{ color: 'var(--color-text)' }}>Message sent.</span>
      </GlassCluster>
    </GlassPanel>
  </div>
);

/** The site's own knobs: these sliders retune every pane on every page. */
const Knobs = () => {
  const { theme, setTheme, resetTheme, isDefault } = useTheme();
  return (
    <div className="knobs">
      <GlassPanel intensity="strong" glow>
        <GlassStack gap={6}>
          <GlassSlider label="Blur" min={0} max={80} value={theme.blur} onChange={(blur) => setTheme({ blur })} format={(v) => `${v}px`} />
          <GlassSlider label="Opacity" min={0} max={1} step={0.01} value={theme.opacity} onChange={(opacity) => setTheme({ opacity })} format={(v) => v.toFixed(2)} />
          <GlassSlider label="Glass hue" className="hue-track" min={0} max={359} value={theme.hue} onChange={(hue) => setTheme({ hue })} format={(v) => `${v}°`} />
          <GlassSlider label="Light hue" className="hue-track" min={0} max={359} value={theme.lightHue} onChange={(lightHue) => setTheme({ lightHue })} format={(v) => `${v}°`} />
          <GlassCluster justify="between">
            <span className="glass-caption">Remembered in this browser.</span>
            <GlassButton size="sm" variant="ghost" onClick={resetTheme} disabled={isDefault}>
              Reset
            </GlassButton>
          </GlassCluster>
        </GlassStack>
      </GlassPanel>
      <CodeBlock title="CSS" collapsible={false}>{`:root {
  --glass-blur: ${theme.blur}px;
  --glass-opacity: ${theme.opacity};
  --glass-sheen: ${theme.sheen};
  --glass-hue: ${theme.hue};${theme.hue === THEME_DEFAULTS.hue ? '   /* cobalt */' : ''}
  --light-hue: ${theme.lightHue};${theme.lightHue === THEME_DEFAULTS.lightHue ? '    /* amber */' : ''}
}`}</CodeBlock>
    </div>
  );
};

const Home = () => (
  <Page>
    <section className="hero">
      <div className="hero__copy">
        <GlassBadge tone="light" style={{ alignSelf: 'flex-start' }}>
          Version 1.0
        </GlassBadge>
        <h1 className="glass-display hero__title">Cool glass, warm light.</h1>
        <p className="glass-lede">
          A design system for React where every surface is one frosted material, lit from the upper right. Five CSS
          variables tune all of it.
        </p>
        <GlassCluster gap={3}>
          <GlassButton as={Link} to="/start" variant="primary" size="lg">
            Get started
          </GlassButton>
          <GlassButton as={Link} to="/components" size="lg">
            Browse components
          </GlassButton>
        </GlassCluster>
        <Snippet>{INSTALL}</Snippet>
      </div>
      <HeroScene />
    </section>

    <Section title="The idea" lede="Glass is only interesting when there’s light behind it and one material in front of it.">
      <GlassGrid min="16rem" gap={8}>
        {PRINCIPLES.map((p) => (
          <GlassStack key={p.title} gap={3} className="principle">
            <h3 className="glass-h3">{p.title}</h3>
            <p className="glass-body">{p.body}</p>
          </GlassStack>
        ))}
      </GlassGrid>
    </Section>

    <Section
      id="knobs"
      title="Turn the knobs"
      lede="These four sliders drive this whole site. The same values are the CSS on the right."
    >
      <Knobs />
    </Section>

    <Section
      title="Built from the parts"
      lede="Every example is a single file you can copy. These two are live."
      aside={
        <GlassButton as={Link} to="/examples">
          All twelve examples <ArrowRightIcon />
        </GlassButton>
      }
    >
      <GlassGrid min="22rem" gap={8} style={{ alignItems: 'center', justifyItems: 'center' }}>
        <Player />
        <SignIn />
      </GlassGrid>
    </Section>

    <Section title="Start in a minute" lede="Install from GitHub, import the stylesheet once, put a backdrop behind it.">
      <CodeBlock title="App.tsx" collapsible={false}>
        {QUICK_START}
      </CodeBlock>
      <GlassCluster gap={3}>
        <GlassButton as={Link} to="/start" variant="primary">
          Read the setup guide
        </GlassButton>
        <GlassButton as={Link} to="/foundations" variant="ghost">
          Foundations <ArrowRightIcon />
        </GlassButton>
      </GlassCluster>
    </Section>
  </Page>
);

export default Home;
