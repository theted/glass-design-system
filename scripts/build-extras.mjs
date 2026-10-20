// Small post-build steps for the library.
//   node scripts/build-extras.mjs css    copy the Tailwind bridge, the 0.x
//                                        compatibility sheet and the fonts'
//                                        licence into dist/
//   node scripts/build-extras.mjs types  drop the stylesheet import from the
//                                        declarations (styles ship separately
//                                        as glass-design-system/styles)
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';

const step = process.argv[2];

if (step === 'css') {
  copyFileSync('src/styles/tailwind.css', 'dist/tailwind.css');
  copyFileSync('src/styles/compat.css', 'dist/compat.css');
  copyFileSync('src/styles/fonts/OFL.txt', 'dist/fonts/OFL.txt');
} else if (step === 'types') {
  const file = 'dist/index.d.ts';
  writeFileSync(file, readFileSync(file, 'utf8').replace(/^import '\.\/styles\/index\.css';\n/m, ''));
} else {
  console.error(`Unknown step "${step}". Use "css" or "types".`);
  process.exit(1);
}
