import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import { cx } from '../utils';

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

const ICON: Record<GlassToastTone, string> = {
  success: 'M5 10.5l3.2 3.2L15 7',
  error: 'M6.5 6.5l7 7M13.5 6.5l-7 7',
  info: 'M10 6v.5M10 9.5V14',
};

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
export const GlassToast = ({
  open,
  onClose,
  duration = 4500,
  tone = 'success',
  action,
  className,
  children,
}: GlassToastProps) => {
  useEffect(() => {
    if (!open || !duration || !onClose) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  const toast = (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
      data-open={open}
      className={cx('glass-toast', tone !== 'success' && `glass-toast--${tone}`, className)}
    >
      <span className="glass-toast__icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d={ICON[tone]} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="glass-toast__message">{open ? children : null}</span>
      {open && action && <span className="glass-toast__action">{action}</span>}
    </div>
  );

  return typeof document === 'undefined' ? toast : createPortal(toast, document.body);
};
