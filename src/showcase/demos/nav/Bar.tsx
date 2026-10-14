import { useState } from 'react';
import { GlassButton, GlassNav, GlassPanel } from 'glass-design-system';

const LINKS = ['Overview', 'Projects', 'Writing', 'Contact'];

// A floating bar: GlassNav in a round panel. The pane glides to whichever
// link has aria-current. With React Router, use NavLink and it's set for you.
export default function NavBar() {
  const [current, setCurrent] = useState('Projects');

  return (
    <GlassPanel radius="round" padding="none" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: '0.3125rem', maxWidth: '100%' }}>
      <GlassNav aria-label="Main">
        {LINKS.map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            aria-current={current === label ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              setCurrent(label);
            }}
          >
            {label}
          </a>
        ))}
      </GlassNav>
      <GlassButton size="sm" variant="primary">Hire me</GlassButton>
    </GlassPanel>
  );
}
