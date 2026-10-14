import { GlassButton, GlassCluster } from 'glass-design-system';
import { Example } from '../site/Demo';
import { Page, PageHeader } from '../site/Page';

const EXAMPLES = [
  { id: 'examples/SignIn', title: 'Sign in', description: 'Strong glass for a form in focus, an “or” divider, an error that says how to fix it.' },
  { id: 'examples/Settings', title: 'Settings', description: 'A split window with its own GlassProvider: its sliders retune only it.' },
  { id: 'examples/CommandPalette', title: 'Command palette', description: 'A search field with keys inside, grouped results, arrow-key selection.' },
  { id: 'examples/Pricing', title: 'Pricing', description: 'Three plans; the one you’d pick is strong glass with the glow and the primary button.' },
  { id: 'examples/Dashboard', title: 'Dashboard', description: 'Stat tiles in a grid, an area chart in plain SVG, an activity list with avatars.' },
  { id: 'examples/Player', title: 'Music player', description: 'Icon buttons, a slider for position, a pressed state for the like.' },
  { id: 'examples/Notifications', title: 'Notifications', description: 'Unread dots in the light, a filter, “Mark all as read”.' },
  { id: 'examples/ProjectCard', title: 'Project feature', description: 'A portfolio piece: the screenshot is a tilting link, the words sit on the backdrop.' },
  { id: 'examples/SnippetCard', title: 'Snippet card', description: 'Code in a well cut into the pane, a copy button and a toast to confirm.' },
  { id: 'examples/Checkout', title: 'Checkout', description: 'Payment on strong glass, the order on subtle, side by side until they stack.' },
  { id: 'examples/Chat', title: 'Chat', description: 'Depth says who’s speaking: their messages on subtle glass, yours on medium.' },
  { id: 'examples/EmptyState', title: 'Empty state', description: 'Say what will appear here, and how to make the first one.' },
];

const Examples = () => (
  <Page width="wide">
    <PageHeader
      title="Examples"
      lede="Whole screens built only from the system: no CSS of their own. Each is one file; switch to Code to copy it."
    >
      <GlassCluster>
        {EXAMPLES.map((e) => (
          <GlassButton key={e.id} as="a" href={`#${e.id.replace('examples/', '').toLowerCase()}`} size="sm">
            {e.title}
          </GlassButton>
        ))}
      </GlassCluster>
    </PageHeader>
    {EXAMPLES.map((e) => (
      <Example key={e.id} {...e} />
    ))}
  </Page>
);

export default Examples;
