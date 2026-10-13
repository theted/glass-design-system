// Fails the showcase build if the library's component styles are missing
// from the bundled CSS. Dev mode loads them even when the production build
// drops them, so this is the only place the mistake shows up.
import { readdirSync, readFileSync } from 'node:fs';

const dir = 'showcase-dist/assets';
const css = readdirSync(dir)
  .filter((f) => f.endsWith('.css'))
  .map((f) => readFileSync(`${dir}/${f}`, 'utf8'))
  .join('\n');

// Selectors only the library defines (the showcase's own CSS doesn't use them).
const required = [
  '.glass-pill--accent', // material.css
  '.glass-switch__thumb',
  '.glass-segmented__indicator',
  '.glass-container--wide', // foundations.css
  '.glass-orbs--kiln', // orbs.css
  '--space-6:', // glass.css tokens
];

const missing = required.filter((s) => !css.includes(s));
if (missing.length) {
  console.error(`showcase CSS is missing library styles: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('showcase CSS includes the library styles');
