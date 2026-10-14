import { GlassBackdrop, GlassPanel } from 'glass-design-system';
import { InlineCode } from '../site/Page';
import type { ComponentDoc } from './types';

export const SURFACES: ComponentDoc[] = [
  {
    slug: 'panel',
    name: 'Panel',
    group: 'Surfaces',
    summary: 'A pane of glass: the surface everything else sits on.',
    intro: (
      <>
        The material in one component. The rim catches the light, a sheen follows the pointer, and both sit around
        your content, so children need no wrapper. Pick a thickness with <InlineCode>intensity</InlineCode>; render it
        as any element with <InlineCode>as</InlineCode>.
      </>
    ),
    imports: "import { GlassPanel } from 'glass-design-system';",
    thumb: (
      <GlassPanel radius="card" padding="sm" glow style={{ width: '9rem' }}>
        <p className="glass-label">Pane</p>
      </GlassPanel>
    ),
    demos: [
      { id: 'panel/Basic', title: 'A pane', description: 'Medium intensity, medium padding, panel radius: the defaults.' },
      { id: 'panel/Intensities', title: 'Three thicknesses', description: 'Closer panes are denser and cast deeper shadows. Stack them in this order and depth reads at a glance.', layout: 'fill' },
      { id: 'panel/Options', title: 'Glow, prism, tilt', description: 'Each one is opt-in. Use them on the one pane a screen is about, not on every card.', layout: 'fill' },
      { id: 'panel/LinkCard', title: 'A card that is a link', description: 'as="a" makes the whole pane one link, typed and focusable.' },
      { id: 'panel/Nested', title: 'Panes on panes', description: 'Subtle rows on a medium card. as={GlassCluster} gives each row a layout without a wrapper.' },
      { id: 'panel/PlainHtml', title: 'Without React', description: 'The material is a class. Everything above is also class="glass …".' },
    ],
    props: [
      {
        rows: [
          { name: 'intensity', type: "'subtle' | 'medium' | 'strong'", default: "'medium'", description: 'How thick the glass is. subtle for regions and rows, medium for cards, strong for dialogs and forms in focus.' },
          { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'sm is 24px; md is fluid 20 → 40px; lg is fluid 28 → 64px.' },
          { name: 'radius', type: "'chip' | 'field' | 'card' | 'panel' | 'sheet' | 'round'", default: "'panel'", description: 'Corner radius from the shape scale. Inner corners stay concentric: inner radius = outer − padding.' },
          { name: 'glow', type: 'boolean', default: 'false', description: 'The warm light pooling in the top-right corner, where it comes from.' },
          { name: 'prism', type: 'boolean', default: 'false', description: 'A spectral fringe where the rim splits the light.' },
          { name: 'tilt', type: 'boolean', default: 'false', description: 'Leans up to 3° away from the pointer. Off under reduced motion.' },
          { name: 'reveal', type: 'boolean', default: 'false', description: 'Frost condenses onto the pane the first time it scrolls into view.' },
          { name: 'pointerLight', type: 'boolean', default: 'true', description: 'The light follows the pointer. Off, it rests in the upper right; hover still brightens the rim.' },
          { name: 'as', type: 'ElementType', default: "'div'", description: "Any element or component: 'section', 'form', 'a', Link, GlassStack. Its props come along, typed." },
        ],
      },
    ],
    css: `<div class="glass">…</div>                       <!-- medium -->
<div class="glass glass--strong glass--pad-lg">…</div>
<div class="glass glass--subtle glass--radius-card glass--glow glass--prism">…</div>`,
    guidelines: {
      dos: [
        'Stack panes thin to thick: subtle under medium under strong.',
        'Keep glow and prism for the one pane a screen is about.',
        'Put glass on something worth blurring: a backdrop, an image.',
      ],
      donts: [
        'Strong glass inside strong glass: it goes opaque and the depth is lost.',
        'Glass on a flat colour. With nothing behind it, it is just grey.',
        'Glass for every block of text. Plain text on the backdrop is often enough.',
      ],
    },
  },
  {
    slug: 'backdrop',
    name: 'Backdrop',
    group: 'Surfaces',
    summary: 'The light the glass refracts: a ground and six soft orbs.',
    intro: (
      <>
        Backdrop blur needs something behind it. A backdrop is a ground gradient plus six orbs of colour, laid out the
        same way in every palette: a cool field top left, a low sun top right where every rim catches its light.
        Put one <InlineCode>fixed</InlineCode> backdrop at the top of your app; it sits behind everything.
      </>
    ),
    imports: "import { GlassBackdrop, GLASS_PALETTES } from 'glass-design-system';",
    thumb: (
      <div className="glass-stage" style={{ width: '9rem', height: '5.5rem', borderRadius: 'var(--radius-card)' }}>
        <GlassBackdrop motion={false} palette="dusk" />
      </div>
    ),
    demos: [
      { id: 'backdrop/Stage', title: 'A backdrop in a box', description: 'Inside a .glass-stage instead of the viewport.', layout: 'fill' },
      { id: 'backdrop/Still', title: 'Six palettes', description: 'kiln is the house look and follows --glass-hue, as does abyss.', layout: 'fill' },
    ],
    props: [
      {
        rows: [
          { name: 'palette', type: "'kiln' | 'dusk' | 'aurora' | 'ember' | 'fjord' | 'abyss'", default: "'kiln'", description: 'Colours only; every palette shares the layout and motion.' },
          { name: 'fixed', type: 'boolean', default: 'false', description: 'Cover the viewport and stay put while the page scrolls. Without it, it fills the nearest .glass-stage.' },
          { name: 'motion', type: 'boolean', default: 'true', description: 'The orbs drift. Reduced motion always holds them still.' },
          { name: 'speed', type: 'number', default: '8', description: 'Seconds per beat; a full drift is 6 to 10 beats.' },
          { name: 'strength', type: 'number', default: '1', description: 'Orb strength, 0 → 1. Lower it behind dense content.' },
          { name: 'texture', type: "'none' | 'grain' | 'dots' | 'grid'", default: "'none'", description: 'A fine overlay. Grain hides gradient banding on big screens.' },
        ],
      },
    ],
    css: `<div class="glass-backdrop glass-backdrop--fixed glass-backdrop--grain" aria-hidden="true">
  <span class="glass-backdrop__orb"></span> <!-- × 6 -->
</div>`,
    guidelines: {
      dos: ['One fixed backdrop per page.', 'abyss, or a lower strength, behind dense apps where content leads.', 'grain on large screens.'],
      donts: ['A different palette per section: the light should come from one place.', 'A moving backdrop behind long reading.'],
    },
  },
  {
    slug: 'layout',
    name: 'Layout',
    group: 'System',
    summary: 'Container, stack, cluster, grid and split, on the spacing scale.',
    intro: (
      <>
        Five primitives cover most layouts without a line of CSS. Gaps only take steps on the spacing scale, so a
        layout can't drift off the grid. Each is also a plain class: <InlineCode>glass-stack</InlineCode> with{' '}
        <InlineCode>--glass-gap</InlineCode>.
      </>
    ),
    imports: "import { GlassContainer, GlassStack, GlassCluster, GlassGrid, GlassSplit } from 'glass-design-system';",
    thumb: (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 6, width: '9rem' }}>
        {[1, 2, 3, 4].map((i) => (
          <span key={i} style={{ height: '1.5rem', borderRadius: 6, background: 'var(--color-fill-active)', boxShadow: 'inset 0 0 0 1px var(--color-line)' }} />
        ))}
      </div>
    ),
    demos: [
      { id: 'layout/Stack', title: 'Stack and cluster', description: 'Big gaps hold small ones: 24 between groups, 8 inside them.' },
      { id: 'layout/Grid', title: 'Grid', description: 'As many columns as fit, each at least min wide.', layout: 'fill' },
      { id: 'layout/Split', title: 'Split', description: 'A fixed side and a fluid main that stack on their own.', layout: 'fill' },
      { id: 'layout/Container', title: 'Container', description: 'The page column with the fluid gutter.', layout: 'fill' },
    ],
    props: [
      {
        caption: 'Every primitive',
        rows: [
          { name: 'gap', type: '1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24 | 32', description: 'Space between children, as a step on the scale (6 = 24px).' },
          { name: 'as', type: 'ElementType', default: "'div'", description: "Render as 'ul', 'section', 'form' …" },
        ],
      },
      {
        caption: 'Specific to one',
        rows: [
          { name: 'GlassContainer width', type: "'default' | 'wide' | 'narrow'", default: "'default'", description: '76rem, 96rem or 48rem, plus the gutter.' },
          { name: 'GlassCluster justify', type: "'start' | 'center' | 'end' | 'between'", default: "'start'", description: 'Where the row’s items sit.' },
          { name: 'GlassGrid min', type: 'string', default: "'16rem'", description: 'Narrowest a column gets before the grid drops one.' },
          { name: 'GlassSplit side', type: 'string', default: "'16rem'", description: 'Width of the fixed side.' },
          { name: 'GlassSplit sideAt', type: "'start' | 'end'", default: "'start'", description: 'Which child is the fixed side.' },
        ],
      },
    ],
    css: `<div class="glass-container glass-container--wide">
  <section class="glass-section">
    <div class="glass-stack" style="--glass-gap: var(--space-12)">
      <div class="glass-grid" style="--glass-min: 18rem">…</div>
    </div>
  </section>
</div>`,
    guidelines: {
      dos: ['Space inside a group smaller than the space around it.', 'Let grids and splits reflow before reaching for a media query.'],
      donts: ['Off-scale gaps like 20px or 28px.', 'Margins on children of a stack: the gap is the spacing.'],
    },
  },
];
