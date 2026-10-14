import { GlassButton, GlassCluster } from 'glass-design-system';
import { ExternalIcon } from '../icons';

// `as` renders any element or component with button styling and keeps its
// props typed. With React Router: <GlassButton as={Link} to="/docs">.
// Links that get aria-current (NavLink sets it) show as selected.
export default function ButtonLinks() {
  return (
    <GlassCluster gap={3} justify="center">
      <GlassButton as="a" href="#links" variant="primary">
        Read the docs
      </GlassButton>
      <GlassButton as="a" href="https://github.com/theted/glass-design-system" target="_blank" rel="noreferrer">
        Source <ExternalIcon />
      </GlassButton>
      <GlassButton as="a" href="#links" variant="ghost" aria-current="page">
        Current page
      </GlassButton>
    </GlassCluster>
  );
}
