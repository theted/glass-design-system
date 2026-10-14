import { GlassAvatar, GlassBadge, GlassDivider, GlassKbd, GlassNav, GlassPanel } from 'glass-design-system';
import { InlineCode } from '../site/Page';
import type { ComponentDoc } from './types';

export const OVERLAYS: ComponentDoc[] = [
  {
    slug: 'nav',
    name: 'Nav',
    group: 'Navigation',
    summary: 'A row of links; a pane glides to the current one.',
    intro: (
      <>
        Mark the current link with <InlineCode>aria-current</InlineCode> and the pane follows it, even when a router
        or a scroll-spy changes it without re-rendering the nav. In a round panel it’s a floating bar; on its own,
        a row of tabs.
      </>
    ),
    imports: "import { GlassNav } from 'glass-design-system';",
    thumb: (
      <GlassNav aria-hidden="true">
        <a aria-current="page">One</a>
        <a>Two</a>
      </GlassNav>
    ),
    demos: [
      { id: 'nav/Bar', title: 'A floating bar', description: 'GlassNav inside a round panel, with an action at the end.' },
      { id: 'nav/Tabs', title: 'Tabs on a page', description: 'Buttons work as well as links.' },
    ],
    props: [
      {
        caption: 'Plus every <nav> prop',
        rows: [
          { name: 'children', type: 'ReactNode', description: 'The links: <a>, <button>, NavLink. Mark the current one with aria-current.' },
          { name: 'size', type: "'sm' | 'md'", default: "'sm'", description: 'Item height: 34 or 40px.' },
          { name: 'aria-label', type: 'string', description: 'Names the navigation: “Main”, “Sections”.' },
        ],
      },
    ],
    css: `<nav class="glass-nav" aria-label="Main">
  <span class="glass-indicator" aria-hidden="true"></span>
  <a href="/" aria-current="page">Overview</a>
  <a href="/work">Work</a>
</nav>
<!-- useGlassIndicator() moves the indicator; without JS it stays hidden -->`,
  },
  {
    slug: 'popover',
    name: 'Popover and menu',
    group: 'Overlays',
    summary: 'A pane anchored to a button: menus, pickers, small settings.',
    intro: (
      <>
        Built on the <InlineCode>popover</InlineCode> attribute: it opens in the top layer, a press outside or Escape
        closes it, and the trigger reports whether it’s expanded. It lands next to its trigger on the first frame and
        flips when it won’t fit. Inside, <InlineCode>GlassMenu</InlineCode> gives arrow-key navigation.
      </>
    ),
    imports: "import { GlassPopover, GlassMenu, GlassMenuItem } from 'glass-design-system';",
    thumb: (
      <GlassPanel intensity="strong" radius="card" padding="none" pointerLight={false} style={{ padding: 6, width: '8rem' }}>
        <div className="glass-menu__item" style={{ minHeight: '1.75rem', background: 'var(--color-fill-hover)' }}>Rename</div>
        <div className="glass-menu__item" style={{ minHeight: '1.75rem' }}>Delete</div>
      </GlassPanel>
    ),
    demos: [
      { id: 'popover/Menu', title: 'An actions menu', description: 'Icons, shortcuts, a separator and a danger item.' },
      { id: 'popover/Account', title: 'An account menu', description: 'A label above the items, placed under the trigger’s end.' },
      { id: 'popover/Settings', title: 'A settings pane', description: 'padded makes room for controls.' },
    ],
    props: [
      {
        caption: 'GlassPopover',
        rows: [
          { name: 'trigger', type: 'ReactElement', description: 'The button that opens it. Gets popoverTarget and a ref.' },
          { name: 'children', type: 'ReactNode | ((close) => ReactNode)', description: 'The content; a function gets close, for items that should close it.' },
          { name: 'placement', type: "'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' | 'top' | 'top-end'", default: "'bottom-start'", description: 'Where it opens. Flips when it won’t fit.' },
          { name: 'padded', type: 'boolean', default: 'false', description: 'Room for forms and settings.' },
          { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when it opens or closes.' },
        ],
      },
      {
        caption: 'GlassMenuItem (plus the props of what it renders as)',
        rows: [
          { name: 'icon', type: 'ReactNode', description: 'Before the label.' },
          { name: 'hint', type: 'ReactNode', description: 'A shortcut or detail at the end.' },
          { name: 'danger', type: 'boolean', default: 'false', description: 'For an action you can’t undo.' },
          { name: 'as', type: 'ElementType', default: "'button'", description: "'a' or a router Link for navigation." },
        ],
      },
    ],
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    group: 'Overlays',
    summary: 'A modal pane of strong glass over a dimmed page.',
    intro: (
      <>
        Built on <InlineCode>{'<dialog>'}</InlineCode>: focus moves in and stays, Escape and a press outside close it,
        focus returns to whatever opened it, and the page behind stops scrolling. Use it for decisions that need an
        answer now; for anything else, a popover or the page itself.
      </>
    ),
    imports: "import { GlassDialog } from 'glass-design-system';",
    thumb: (
      <GlassPanel intensity="strong" radius="card" padding="none" pointerLight={false} style={{ padding: '0.75rem 1rem', width: '9rem' }}>
        <p className="glass-label" style={{ color: 'var(--color-text)' }}>Delete this?</p>
        <p className="glass-caption">It goes for good.</p>
      </GlassPanel>
    ),
    demos: [
      { id: 'dialog/Confirm', title: 'Confirm', description: 'Name the action on the button, and say what happens.' },
      { id: 'dialog/Form', title: 'A form', description: 'The footer’s submit button points at the form with form="…".' },
    ],
    props: [
      {
        rows: [
          { name: 'open', type: 'boolean', description: 'Whether it’s showing.' },
          { name: 'onClose', type: '() => void', description: 'Escape, the close button, a press outside.' },
          { name: 'title', type: 'ReactNode', description: 'The heading; names the dialog.' },
          { name: 'description', type: 'ReactNode', description: 'A sentence under the heading.' },
          { name: 'footer', type: 'ReactNode', description: 'Buttons, right-aligned. Primary last.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '384, 512 or 704px wide.' },
          { name: 'dismissible', type: 'boolean', default: 'true', description: 'Off for steps that must be answered.' },
        ],
      },
    ],
    guidelines: {
      dos: ['A title that asks the question: “Delete this snippet?”', 'Buttons named for what they do: “Keep it”, “Delete”.'],
      donts: ['Dialogs for things that can be undone: use a toast with Undo.', 'A dialog that opens another dialog.'],
    },
  },
  {
    slug: 'toast',
    name: 'Toast',
    group: 'Overlays',
    summary: 'A pill that springs up to say something happened.',
    intro: (
      <>
        Its icon draws itself in once it lands; it closes on its own. Announced politely, errors at once. It renders
        into <InlineCode>document.body</InlineCode>, so it can live anywhere in your tree.
      </>
    ),
    imports: "import { GlassToast } from 'glass-design-system';",
    thumb: (
      <GlassBadge tone="success" dot style={{ minHeight: '2rem', padding: '0 0.85rem', fontSize: '0.8rem' }}>
        Message sent.
      </GlassBadge>
    ),
    demos: [
      { id: 'toast/Tones', title: 'Tones', description: 'success, error and info.' },
      { id: 'toast/Undo', title: 'With an action', description: 'Undo beats “Are you sure?” for anything that can be put back.' },
    ],
    props: [
      {
        rows: [
          { name: 'open', type: 'boolean', description: 'Whether it’s showing.' },
          { name: 'onClose', type: '() => void', description: 'Called after duration.' },
          { name: 'duration', type: 'number', default: '4500', description: 'Milliseconds before it closes; 0 keeps it open.' },
          { name: 'tone', type: "'success' | 'error' | 'info'", default: "'success'", description: 'Icon and tint.' },
          { name: 'action', type: 'ReactNode', description: 'A small button at the end, like Undo.' },
        ],
      },
    ],
  },
  {
    slug: 'badge',
    name: 'Badge, key, avatar',
    group: 'Display',
    summary: 'Small labels, keyboard keys and people.',
    intro: (
      <>
        A badge labels something: a language, a status, a count. <InlineCode>GlassKbd</InlineCode> is a key on the
        keyboard. <InlineCode>GlassAvatar</InlineCode> is a person: their photo, or initials on a tint picked from their
        name.
      </>
    ),
    imports: "import { GlassBadge, GlassKbd, GlassAvatar } from 'glass-design-system';",
    thumb: (
      <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <GlassAvatar name="Ada Lovelace" size="sm" />
        <GlassBadge tone="success" dot>Live</GlassBadge>
        <GlassKbd>⌘K</GlassKbd>
      </span>
    ),
    demos: [
      { id: 'badge/Tones', title: 'Badge tones', description: 'Pair the colour with a word: colour alone isn’t a message.' },
      { id: 'badge/Shortcuts', title: 'Keys', description: 'One key per GlassKbd.' },
      { id: 'badge/Avatars', title: 'Avatars', description: 'The same name always gets the same tint.' },
    ],
    props: [
      {
        caption: 'GlassBadge',
        rows: [
          { name: 'tone', type: "'neutral' | 'light' | 'success' | 'warning' | 'danger' | 'info'", default: "'neutral'", description: 'light is the warm accent: for the one thing that’s new or yours.' },
          { name: 'dot', type: 'boolean', default: 'false', description: 'A glowing status dot.' },
        ],
      },
      {
        caption: 'GlassAvatar',
        rows: [
          { name: 'name', type: 'string', description: 'Initials, alt text and tint.' },
          { name: 'src', type: 'string', description: 'A photo.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '24, 32 or 44px.' },
        ],
      },
    ],
  },
  {
    slug: 'divider',
    name: 'Divider',
    group: 'Display',
    summary: 'A hairline that warms where the light hits it.',
    intro: <>Fades out at both ends; can carry a word, or stand upright in a row. Reach for space first.</>,
    imports: "import { GlassDivider } from 'glass-design-system';",
    thumb: (
      <span style={{ width: '9rem' }}>
        <GlassDivider label="or" />
      </span>
    ),
    demos: [{ id: 'divider/Basic', title: 'Dividers', description: 'Plain, with a label, and vertical.' }],
    props: [
      {
        rows: [
          { name: 'label', type: 'ReactNode', description: 'A word in the middle, like “or”.' },
          { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Vertical stretches to the height of a flex row.' },
        ],
      },
    ],
  },
];
