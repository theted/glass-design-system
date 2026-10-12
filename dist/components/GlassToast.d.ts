import React from 'react';
export type GlassToastTone = 'success' | 'error' | 'info';
export interface GlassToastProps {
    /** Whether the toast is showing. */
    open: boolean;
    /** Called when the toast should close (after `duration`). */
    onClose?: () => void;
    /** Auto-close after this many ms. Pass 0 to keep it open. Default 4500. */
    duration?: number;
    /** Icon and tint. Default 'success'. */
    tone?: GlassToastTone;
    className?: string;
    children: React.ReactNode;
}
/**
 * GlassToast — a pill of glass that springs up from the bottom edge.
 * The icon draws itself in once the pill has landed.
 *
 * Announced politely to screen readers (errors assertively).
 *
 * ```tsx
 * <GlassToast open={sent} onClose={() => setSent(false)}>
 *   Message sent. I'll reply within a few days.
 * </GlassToast>
 * ```
 */
declare const GlassToast: React.FC<GlassToastProps>;
export default GlassToast;
