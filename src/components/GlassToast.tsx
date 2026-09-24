import React, { useEffect } from 'react';

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

const ICON_PATH: Record<GlassToastTone, string> = {
  success: 'M5 10.5l3.2 3.2L15 7',
  error: 'M6.5 6.5l7 7M13.5 6.5l-7 7',
  info: 'M10 6v.5M10 9.5V14',
};

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
const GlassToast: React.FC<GlassToastProps> = ({
  open,
  onClose,
  duration = 4500,
  tone = 'success',
  className = '',
  children,
}) => {
  useEffect(() => {
    if (!open || !duration || !onClose) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
      data-open={open}
      className={`glass-toast glass-toast--${tone} ${className}`.trim()}
    >
      <span className="glass-toast__icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d={ICON_PATH[tone]} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>{open ? children : null}</span>
    </div>
  );
};

export default GlassToast;
