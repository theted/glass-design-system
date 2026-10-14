import { GlassButton, GlassInput, GlassKbd, GlassStack } from 'glass-design-system';
import { CloseIcon, SearchIcon } from '../icons';
import { useState } from 'react';

// leading and trailing put icons, units, shortcuts or a button inside the
// field. Pressing anywhere in it focuses the input.
export default function FieldAdornments() {
  const [query, setQuery] = useState('debounce');

  return (
    <GlassStack gap={4} style={{ width: 'min(100%, 22rem)' }}>
      <GlassInput
        type="search"
        aria-label="Search snippets"
        placeholder="Search snippets"
        leading={<SearchIcon />}
        trailing={<GlassKbd>⌘ K</GlassKbd>}
      />
      <GlassInput
        aria-label="Filter"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        leading={<SearchIcon />}
        trailing={
          query && (
            <GlassButton size="xs" icon variant="ghost" aria-label="Clear" onClick={() => setQuery('')}>
              <CloseIcon />
            </GlassButton>
          )
        }
      />
      <GlassInput aria-label="Price" inputMode="decimal" defaultValue="249" trailing="kr / month" />
    </GlassStack>
  );
}
