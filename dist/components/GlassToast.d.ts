import type { ReactNode } from 'react';
export type GlassToastTone = 'success' | 'error' | 'info';
export interface GlassToastProps {
    /** Whether the toast is showing. */
    open: boolean;
    /** Called when the toast should close: after `duration`, or from your action. */
    onClose?: () => void;
    /** Close after this many ms. 0 keeps it open. Default 4500. */
    duration?: number;
    /** Icon and tint. Default 'success'. */
    tone?: GlassToastTone;
    /** A button at the end, like Undo. Give it size="sm". */
    action?: ReactNode;
    className?: string;
    /** What happened, in a short sentence: "Message sent." */
    children: ReactNode;
}
/**
 * A pill of glass that springs up from the bottom edge to say something
 * happened; its icon draws itself in once it lands. Announced politely to
 * screen readers, errors assertively. Rendered into document.body, so it
 * can sit anywhere in your tree: a fixed element inside glass would
 * otherwise be pinned to the pane (backdrop-filter makes a containing block).
 *
 * ```tsx
 * <GlassToast open={sent} onClose={() => setSent(false)}>Message sent.</GlassToast>
 * ```
 */
export declare const GlassToast: ({ open, onClose, duration, tone, action, className, children, }: GlassToastProps) => import("react/jsx-runtime").JSX.Element;
