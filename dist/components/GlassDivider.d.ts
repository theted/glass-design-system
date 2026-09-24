import React from 'react';
type Props = {
    /** Extra Tailwind classes — e.g. `my-8` for vertical spacing. */
    className?: string;
};
/**
 * GlassDivider — a 1px rule that fades out at both ends and warms where the
 * light hits its centre, with a faint split-light line beneath, as if the
 * edge of a glass sheet were seen through a prism.
 *
 * ```tsx
 * <GlassDivider className="my-10" />
 * ```
 */
declare const GlassDivider: React.FC<Props>;
export default GlassDivider;
