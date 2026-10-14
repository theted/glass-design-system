import { useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { GlassInput, GlassKbd, GlassPanel, GlassStack } from 'glass-design-system';
import { BranchIcon, FileIcon, SearchIcon, SettingsIcon, SunIcon } from '../demos/icons';

interface Command {
  group: string;
  label: string;
  icon: ReactNode;
  hint: string;
}

const COMMANDS: Command[] = [
  { group: 'Snippets', label: 'debounce.ts', icon: <FileIcon />, hint: 'TypeScript' },
  { group: 'Snippets', label: 'useMeasure.tsx', icon: <FileIcon />, hint: 'React' },
  { group: 'Snippets', label: 'retry-with-backoff.go', icon: <FileIcon />, hint: 'Go' },
  { group: 'Actions', label: 'Open repository on GitHub', icon: <BranchIcon />, hint: '⌘ G' },
  { group: 'Actions', label: 'Switch backdrop', icon: <SunIcon />, hint: '⌘ B' },
  { group: 'Actions', label: 'Open settings', icon: <SettingsIcon />, hint: '⌘ ,' },
];

export default function CommandPalette() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const results = COMMANDS.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()));

  const onKeyDown = (e: KeyboardEvent) => {
    const step = { ArrowDown: 1, ArrowUp: -1 }[e.key as 'ArrowDown' | 'ArrowUp'];
    if (!step || !results.length) return;
    e.preventDefault();
    setActive((a) => (a + step + results.length) % results.length);
  };

  return (
    <GlassPanel intensity="strong" radius="sheet" padding="none" style={{ width: 'min(100%, 36rem)' }}>
      <div style={{ padding: 'var(--space-3)' }}>
        <GlassInput
          size="lg"
          aria-label="Search snippets and actions"
          placeholder="Search snippets and actions"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          leading={<SearchIcon />}
          trailing={<GlassKbd>Esc</GlassKbd>}
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-results"
          aria-activedescendant={results[active] ? `palette-${active}` : undefined}
        />
      </div>

      <GlassStack as="ul" id="palette-results" role="listbox" gap={1} style={{ margin: 0, padding: '0 var(--space-3) var(--space-3)', listStyle: 'none', borderTop: '1px solid var(--color-line)' }}>
        {results.length === 0 && (
          <li className="glass-small" style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
            Nothing matches “{query}”. Try a file name or an action.
          </li>
        )}
        {results.map((c, i) => (
          <li key={c.label} role="presentation">
            {(i === 0 || results[i - 1].group !== c.group) && (
              <p className="glass-caption" style={{ padding: 'var(--space-3) var(--space-3) var(--space-1)' }}>{c.group}</p>
            )}
            <div
              id={`palette-${i}`}
              role="option"
              aria-selected={i === active}
              onPointerEnter={() => setActive(i)}
              className="glass-menu__item"
              style={i === active ? { background: 'var(--color-fill-active)', color: 'var(--color-text)' } : undefined}
            >
              {c.icon}
              <span>{c.label}</span>
              <span className="glass-menu__hint">{c.hint}</span>
            </div>
          </li>
        ))}
      </GlassStack>
    </GlassPanel>
  );
}
