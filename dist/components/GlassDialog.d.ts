import type { ReactNode } from 'react';
export interface GlassDialogProps {
    open: boolean;
    /** Called when the dialog asks to close: Escape, the close button, a press outside. */
    onClose: () => void;
    /** The heading. Names the dialog for screen readers. */
    title?: ReactNode;
    /** A sentence under the heading. */
    description?: ReactNode;
    /** Buttons at the bottom, right-aligned. Put the primary action last. */
    footer?: ReactNode;
    /** Width: sm 384px, md 512px (default), lg 704px. */
    size?: 'sm' | 'md' | 'lg';
    /** Escape, the close button and outside presses close it. Turn off for steps that must be answered. Default true. */
    dismissible?: boolean;
    className?: string;
    children?: ReactNode;
}
/**
 * A modal pane of strong glass over a dimmed, blurred page. Built on
 * `<dialog>`: focus moves in and is trapped, Escape closes, and focus
 * returns to whatever opened it. Focus starts in the first field of the
 * body, or on whatever has `data-autofocus`.
 *
 * ```tsx
 * <GlassDialog
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Delete this snippet?"
 *   description="It goes for good, along with its history."
 *   footer={<>
 *     <GlassButton variant="ghost" onClick={() => setOpen(false)}>Keep it</GlassButton>
 *     <GlassButton variant="danger" onClick={remove}>Delete</GlassButton>
 *   </>}
 * />
 * ```
 */
export declare const GlassDialog: ({ open, onClose, title, description, footer, size, dismissible, className, children, }: GlassDialogProps) => import("react/jsx-runtime").JSX.Element;
