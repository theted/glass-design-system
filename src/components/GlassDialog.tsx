import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { cx } from '../utils';
import { GlassButton } from './GlassButton';
import { GlassPanel } from './GlassPanel';

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

const CloseIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

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
export const GlassDialog = ({
  open,
  onClose,
  title,
  description,
  footer,
  size = 'md',
  dismissible = true,
  className,
  children,
}: GlassDialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  const titleId = title != null ? `${id}-title` : undefined;
  const descriptionId = description != null ? `${id}-description` : undefined;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // showModal focuses the first focusable thing, the close button. In a
      // form, start in the first field instead (or wherever data-autofocus
      // says). React's autoFocus can't help: it fires before the dialog opens.
      dialog
        .querySelector<HTMLElement>('[data-autofocus], .glass-dialog__body :is(input, select, textarea):not([disabled], [type="hidden"])')
        ?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Escape fires `cancel`; the browser would close the dialog behind our
  // back, so stop it and let `open` decide.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      if (dismissible) onClose();
    };
    dialog.addEventListener('cancel', onCancel);
    return () => dialog.removeEventListener('cancel', onCancel);
  }, [dismissible, onClose]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={cx('glass-dialog', size !== 'md' && `glass-dialog--${size}`, className)}
      // The dialog box is exactly the pane, so a press that lands on the
      // dialog itself landed on the backdrop.
      onClick={(e) => {
        if (dismissible && e.target === e.currentTarget) onClose();
      }}
    >
      <GlassPanel intensity="strong" padding="none" className="glass-dialog__panel">
        {(title != null || dismissible) && (
          <header className="glass-dialog__header">
            <div className="glass-dialog__heading">
              {title != null && (
                <h2 id={titleId} className="glass-dialog__title">
                  {title}
                </h2>
              )}
              {description != null && (
                <p id={descriptionId} className="glass-dialog__description">
                  {description}
                </p>
              )}
            </div>
            {dismissible && (
              <GlassButton variant="ghost" size="sm" icon aria-label="Close" onClick={onClose}>
                <CloseIcon />
              </GlassButton>
            )}
          </header>
        )}
        {children != null && <div className="glass-dialog__body">{children}</div>}
        {footer != null && <footer className="glass-dialog__footer">{footer}</footer>}
      </GlassPanel>
    </dialog>
  );
};
