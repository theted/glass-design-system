import { FORMS } from './forms';
import { OVERLAYS } from './overlays';
import { SURFACES } from './surfaces';
import { SYSTEM } from './system';
import type { ComponentDoc, DocGroup } from './types';

export type { ComponentDoc } from './types';

const ORDER: DocGroup[] = ['Surfaces', 'Actions', 'Forms', 'Navigation', 'Overlays', 'Display', 'System'];

/** Every component page, in reading order: grouped, then as written. */
export const DOCS: ComponentDoc[] = [...SURFACES, ...FORMS, ...OVERLAYS, ...SYSTEM].sort(
  (a, b) => ORDER.indexOf(a.group) - ORDER.indexOf(b.group),
);

export const GROUPS = ORDER.map((group) => ({ group, docs: DOCS.filter((d) => d.group === group) })).filter((g) => g.docs.length);

export const findDoc = (slug?: string) => DOCS.find((d) => d.slug === slug);
