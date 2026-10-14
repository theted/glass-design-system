import { useState } from 'react';
import { GlassButton, GlassCluster } from 'glass-design-system';

const LANGUAGES = ['TypeScript', 'Go', 'Python', 'Rust', 'Bash'];

// `pressed` makes a toggle: it sets aria-pressed, and pressed buttons are
// denser, brighter glass.
export default function ButtonToggle() {
  const [picked, setPicked] = useState(new Set(['TypeScript']));

  const toggle = (lang: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(lang)) next.delete(lang);
      else next.add(lang);
      return next;
    });

  return (
    <GlassCluster justify="center" aria-label="Filter by language" role="group">
      {LANGUAGES.map((lang) => (
        <GlassButton key={lang} size="sm" pressed={picked.has(lang)} onClick={() => toggle(lang)}>
          {lang}
        </GlassButton>
      ))}
    </GlassCluster>
  );
}
