import { GLASS_PALETTES, GlassBackdrop, GlassBadge, GlassButton, GlassCluster, GlassGrid, GlassPanel, GlassStack } from 'glass-design-system';
import type { GlassPalette } from 'glass-design-system';
import { CodeBlock } from '../site/Code';
import { InlineCode, Page, PageHeader, Section } from '../site/Page';
import { useTheme } from '../site/theme';

const ABOUT: Record<GlassPalette, string> = {
  kiln: 'Cobalt field, one low amber sun. The house look; follows --glass-hue.',
  dusk: 'Violet evening with a low amber sun.',
  aurora: 'Northern lights: teal and magenta, no sun.',
  ember: 'Coals: deep reds under a hot sun.',
  fjord: 'Cold water under a pale sun. Low chroma, calm.',
  abyss: 'Almost nothing, for apps where content leads. Follows --glass-hue.',
};

const USAGE = `// Once, at the top of the app: covers the viewport, sits behind everything.
<GlassBackdrop fixed palette="kiln" texture="grain" />

// In a box: any element with class="glass-stage".
<section className="glass-stage">
  <GlassBackdrop palette="ember" motion={false} />
  <GlassPanel>…</GlassPanel>
</section>`;

const Backdrops = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Page width="wide">
      <PageHeader
        title="Backdrops"
        lede="The light the glass refracts. Every palette shares one layout: a cool field top left, a low sun top right, where every rim catches its light. Pick one for the whole site below."
      />

      <Section id="palettes" title="Six palettes">
        <GlassGrid min="22rem" gap={8}>
          {GLASS_PALETTES.map((palette) => {
            const current = theme.palette === palette;
            return (
              <GlassStack key={palette} gap={4}>
                <div className="glass-stage" style={{ display: 'grid', placeItems: 'center', minHeight: '17rem', borderRadius: 'var(--radius-sheet)', boxShadow: 'inset 0 0 0 1px var(--color-line)' }}>
                  <GlassBackdrop palette={palette} motion={theme.motion} texture={theme.texture} />
                  <GlassPanel intensity="strong" radius="card" padding="sm" style={{ width: 'min(80%, 15rem)' }}>
                    <GlassStack gap={3}>
                      <GlassCluster justify="between">
                        <h3 className="glass-h4" style={{ textTransform: 'capitalize' }}>{palette}</h3>
                        {current && <GlassBadge tone="light">In use</GlassBadge>}
                      </GlassCluster>
                      <GlassButton size="sm" variant={current ? 'secondary' : 'primary'} disabled={current} onClick={() => setTheme({ palette })}>
                        {current ? 'Using it' : 'Use for this site'}
                      </GlassButton>
                    </GlassStack>
                  </GlassPanel>
                </div>
                <p className="glass-small">{ABOUT[palette]}</p>
              </GlassStack>
            );
          })}
        </GlassGrid>
      </Section>

      <Section
        id="usage"
        title="Using one"
        lede="Fixed for a page, or in any box. Palettes only set colours; motion, speed, strength and texture are props of their own."
      >
        <CodeBlock title="App.tsx" collapsible={false}>
          {USAGE}
        </CodeBlock>
        <p className="glass-body glass-measure">
          Orbs are sized in container units, so a backdrop fills whatever box it’s in. They move only with transform,
          on the GPU, and hold still under <InlineCode>prefers-reduced-motion</InlineCode>. For dense apps, lower{' '}
          <InlineCode>strength</InlineCode> or use <InlineCode>abyss</InlineCode>.
        </p>
      </Section>
    </Page>
  );
};

export default Backdrops;
