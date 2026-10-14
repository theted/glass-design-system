import { useState } from 'react';
import { GlassNav, GlassPanel, GlassStack } from 'glass-design-system';

const TABS = {
  Readme: 'Cool glass, warm light. One material, five knobs.',
  Changelog: '1.0: one .glass class, CSS knobs, a Tailwind bridge, twelve new components.',
  License: 'MIT. Use it, change it, ship it.',
};

type Tab = keyof typeof TABS;

// Without a panel around it, the nav is a row of tabs on the page. Buttons
// work as well as links.
export default function NavTabs() {
  const [tab, setTab] = useState<Tab>('Readme');

  return (
    <GlassStack gap={4} style={{ width: 'min(100%, 30rem)' }}>
      <GlassNav aria-label="Project">
        {(Object.keys(TABS) as Tab[]).map((name) => (
          <button key={name} type="button" aria-current={tab === name ? 'true' : undefined} onClick={() => setTab(name)}>
            {name}
          </button>
        ))}
      </GlassNav>
      <GlassPanel intensity="subtle" radius="card" padding="sm">
        <p className="glass-body">{TABS[tab]}</p>
      </GlassPanel>
    </GlassStack>
  );
}
