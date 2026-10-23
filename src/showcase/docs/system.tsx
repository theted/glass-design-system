import { GlassPanel, GlassProvider } from 'glass-design-system';
import { InlineCode } from '../site/Page';
import type { ComponentDoc } from './types';

export const SYSTEM: ComponentDoc[] = [
  {
    slug: 'theming',
    name: 'Theming',
    group: 'System',
    summary: 'Six knobs retune every pane: in CSS, or with a provider.',
    intro: (
      <>
        <InlineCode>--glass-blur</InlineCode>, <InlineCode>--glass-opacity</InlineCode> and{' '}
        <InlineCode>--glass-sheen</InlineCode> set the material; <InlineCode>--glass-hue</InlineCode> and{' '}
        <InlineCode>--light-hue</InlineCode> set the palette, and <InlineCode>--glass-roundness</InlineCode> scales
        every corner. They’re CSS custom properties: set them on{' '}
        <InlineCode>:root</InlineCode> for the app, on any element for a region, or with{' '}
        <InlineCode>GlassProvider</InlineCode> from React. You don’t need a provider at all.
      </>
    ),
    imports: "import { GlassProvider, glassVars, useGlass } from 'glass-design-system';",
    thumb: (
      <span style={{ display: 'flex', gap: 6 }}>
        {[262, 160, 320].map((hue) => (
          <GlassProvider key={hue} hue={hue}>
            <GlassPanel glow radius="chip" padding="none" pointerLight={false} style={{ width: '2.5rem', height: '2.5rem' }} />
          </GlassProvider>
        ))}
      </span>
    ),
    demos: [
      { id: 'theming/Provider', title: 'Nested providers', description: 'Each provider retunes only its subtree.', layout: 'fill' },
      { id: 'theming/Css', title: 'Plain CSS', description: 'Blur, opacity and sheen work on any element; the hues and roundness need :root or .glass-scope.' },
    ],
    props: [
      {
        caption: 'GlassProvider (and glassVars, which returns the same as CSS variables)',
        rows: [
          { name: 'blur', type: 'number', default: '40', description: 'Backdrop blur in px. → --glass-blur' },
          { name: 'opacity', type: 'number', default: '0.66', description: 'Tint density, 0 clear → 1 smoked. → --glass-opacity' },
          { name: 'sheen', type: 'number', default: '0.22', description: 'Brightness of the light under the pointer. → --glass-sheen' },
          { name: 'hue', type: 'number', default: '262', description: 'Glass, ground and every neutral (OKLCH degrees). → --glass-hue' },
          { name: 'lightHue', type: 'number', default: '76', description: 'Rims, focus and the primary action. → --light-hue' },
          { name: 'roundness', type: 'number', default: '1', description: 'Scales every corner radius but the pill’s, 0 square → 2 twice as round. → --glass-roundness' },
        ],
      },
    ],
    css: `:root {
  --glass-blur: 32px;
  --glass-opacity: 0.75;
  --glass-hue: 250;   /* bluer glass */
  --light-hue: 60;    /* a lower, oranger sun */
  --glass-roundness: 0.5; /* crisper corners */
}

.sidebar { --glass-opacity: 0.9; }`,
  },
  {
    slug: 'hooks',
    name: 'Hooks',
    group: 'System',
    summary: 'The pointer light, the gliding pane and the reveal, for your own elements.',
    intro: (
      <>
        The components are built from three hooks you can use directly. Each writes CSS variables or a data
        attribute straight onto your element; none of them re-render it.
      </>
    ),
    imports: "import { useGlassPointer, useGlassIndicator, useGlassReveal } from 'glass-design-system';",
    thumb: <GlassPanel prism radius="round" padding="none" style={{ width: '8rem', height: '2.5rem' }} />,
    demos: [
      { id: 'hooks/Pointer', title: 'useGlassPointer', description: 'The light follows the pointer across any .glass element.' },
      { id: 'hooks/Indicator', title: 'useGlassIndicator', description: 'The gliding pane, for tabs of your own.' },
      { id: 'hooks/Reveal', title: 'useGlassReveal', description: 'What GlassPanel’s reveal uses.', layout: 'fill' },
    ],
    props: [
      {
        rows: [
          { name: 'useGlassPointer(ref, enabled?)', type: 'void', description: 'Writes --glass-x, --glass-y and --glass-angle on pointer move, one write per frame.' },
          { name: 'useGlassIndicator(ref, selector)', type: 'void', description: 'Moves a .glass-indicator to the child matching selector; follows attribute changes, resizes and font loads.' },
          { name: 'useGlassReveal(ref, enabled?)', type: 'void', description: 'Sets data-reveal="pending", then "in" once the element scrolls into view.' },
          { name: 'useGlass()', type: 'GlassConfig', description: 'The nearest provider’s knobs, or the defaults.' },
        ],
      },
    ],
  },
];
