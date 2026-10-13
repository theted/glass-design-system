import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type React from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Open/close state for a popover whose panel renders away from its trigger
 * (outside the clipped glass bar, so its own backdrop blur sees the page).
 * Closes on Escape, on a press outside both trigger and panel, and on
 * navigation. `panelStyle` right-aligns the panel under the trigger, given
 * the positioned element the panel is absolutely placed in.
 */
export function usePopover(containerRef: React.RefObject<HTMLElement | null>) {
  const [open, setOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const box = containerRef.current?.getBoundingClientRect();
      const btn = triggerRef.current?.getBoundingClientRect();
      if (box && btn) setPanelStyle({ right: Math.max(0, box.right - btn.right) });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [open, containerRef]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  return { open, setOpen, toggle: () => setOpen((v) => !v), triggerRef, panelRef, panelStyle };
}
