// Fails the showcase build if the library's styles are missing from the
// bundled CSS. Dev mode loads them even when the production build drops
// them, so this is the only place the mistake shows up.
import { readdirSync, readFileSync } from 'node:fs';

const dir = 'showcase-dist/assets';
const css = readdirSync(dir)
  .filter((f) => f.endsWith('.css'))
  .map((f) => readFileSync(`${dir}/${f}`, 'utf8'))
  .join('\n');

// Selectors only the library defines (the site's own CSS doesn't use them).
const required = [
  '--glass-hue:', // tokens.css
  '.glass--strong', // material.css
  '.glass-button--primary', // controls.css
  '.glass-switch__thumb',
  '.glass-indicator',
  '.glass-container--wide', // layout.css
  '.glass-badge--success', // display.css
  '.glass-dialog__panel', // overlay.css
  '.glass-backdrop--fixed', // backdrop.css
];

const missing = required.filter((s) => !css.includes(s));
if (missing.length) {
  console.error(`showcase CSS is missing library styles: ${missing.join(', ')}`);
  process.exit(1);
}
console.log('showcase CSS includes the library styles');
