import type { ReactNode } from 'react';
import type { PropRow } from '../site/Page';

export interface DemoRef {
  /** Registry id, e.g. 'button/Variants'. */
  id: string;
  title: string;
  description?: ReactNode;
  layout?: 'center' | 'fill';
}

export type DocGroup = 'Surfaces' | 'Actions' | 'Forms' | 'Navigation' | 'Overlays' | 'Display' | 'System';

export interface ComponentDoc {
  slug: string;
  name: string;
  group: DocGroup;
  /** One line for the index. */
  summary: string;
  /** A paragraph under the page title. */
  intro: ReactNode;
  /** The import line(s) to copy. */
  imports: string;
  /** A small live preview for the index tile. */
  thumb: ReactNode;
  demos: DemoRef[];
  props?: { caption?: string; rows: PropRow[] }[];
  /** The same thing without React: class names. */
  css?: string;
  guidelines?: { dos: ReactNode[]; donts: ReactNode[] };
}
