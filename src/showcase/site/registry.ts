import type { ComponentType } from 'react';

/**
 * Every demo and example is a real file. The page renders its default
 * export and shows its source, so the code on screen is exactly the code
 * that's running. Ids are paths without the folder prefix or extension:
 * 'button/Variants', 'examples/SignIn'.
 */

// import.meta.glob only takes literal patterns, so they're repeated.
const modules = import.meta.glob<{ default: ComponentType }>(
  ['../demos/**/*.tsx', '../examples/*.tsx', '!../demos/icons.tsx'],
  { eager: true },
);

const sources = import.meta.glob<string>(['../demos/**/*.tsx', '../examples/*.tsx', '!../demos/icons.tsx'], {
  eager: true,
  query: '?raw',
  import: 'default',
});

const toId = (path: string) => path.replace(/^\.\.\/(demos\/)?/, '').replace(/\.tsx$/, '');

export interface DemoEntry {
  id: string;
  Component: ComponentType;
  source: string;
}

export const DEMOS: Record<string, DemoEntry> = Object.fromEntries(
  Object.entries(modules).map(([path, mod]) => {
    const id = toId(path);
    return [id, { id, Component: mod.default, source: sources[path].trimEnd() }];
  }),
);

export const getDemo = (id: string): DemoEntry => {
  const demo = DEMOS[id];
  if (!demo) throw new Error(`No demo "${id}". Known: ${Object.keys(DEMOS).join(', ')}`);
  return demo;
};
