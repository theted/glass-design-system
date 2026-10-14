import { cloneElement, useEffect, useId, useRef } from 'react';
import type { ComponentPropsWithRef, ElementType, KeyboardEvent, ReactElement, ReactNode, Ref } from 'react';
import { cx, mergeRefs } from '../utils';
import type { PolymorphicProps } from '../utils';
import { GlassPanel } from './GlassPanel';

export type GlassPopoverPlacement = 'bottom-start' | 'bottom' | 'bottom-end' | 'top-start' | 'top' | 'top-end';

export interface GlassPopoverProps {
  /** The button that opens and closes it: a GlassButton or a <button>. */
  trigger: ReactElement;
  /** The content, or a function that gets `close` (for menu items that should close it). */
  children: ReactNode | ((close: () => void) => ReactNode);
  /** Where it opens, relative to the trigger. Flips when it won't fit. Default 'bottom-start'. */
  placement?: GlassPopoverPlacement;
  /** Panel padding for forms and settings; leave off for menus. */
  padded?: boolean;
  /** Called when it opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** Names the popover for screen readers when its content doesn't. */
  'aria-label'?: string;
  className?: string;
}

const GAP = 8;
const EDGE = 8;

/**
 * A pane of strong glass anchored to a button: menus, pickers, small
 * settings. Built on the popover attribute, so it sits in the top layer, a
 * press outside or Escape closes it, and the trigger reports whether it's
 * expanded.
 *
 * ```tsx
 * <GlassPopover trigger={<GlassButton>Sort</GlassButton>}>
 *   {(close) => (
 *     <GlassMenu>
 *       <GlassMenuItem onClick={() => { sortBy('name'); close(); }}>Name</GlassMenuItem>
 *       <GlassMenuItem onClick={() => { sortBy('date'); close(); }}>Last edited</GlassMenuItem>
 *     </GlassMenu>
 *   )}
 * </GlassPopover>
 * ```
 */
export const GlassPopover = ({
  trigger,
  children,
  placement = 'bottom-start',
  padded = false,
  onOpenChange,
  'aria-label': ariaLabel,
  className,
}: GlassPopoverProps) => {
  const id = `glass-popover-${useId().replace(/[^\w-]/g, '')}`;
  const popRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const onOpenChangeRef = useRef(onOpenChange);
  useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  });

  useEffect(() => {
    const pop = popRef.current;
    if (!pop) return;
    const [side, align = 'center'] = placement.split('-');

    // Anchor by the edge nearest the trigger, so placing it needs no
    // measuring: it lands in the right spot on its very first frame.
    const anchor = (flip = false) => {
      const a = triggerRef.current?.getBoundingClientRect();
      if (!a) return;
      const { clientWidth: vw, clientHeight: vh } = document.documentElement;
      const up = (side === 'top') !== flip;
      Object.assign(pop.style, { top: '', bottom: '', left: '', right: '', translate: '' });
      if (up) pop.style.bottom = `${vh - a.top + GAP}px`;
      else pop.style.top = `${a.bottom + GAP}px`;
      if (align === 'start') pop.style.left = `${a.left}px`;
      else if (align === 'end') pop.style.right = `${vw - a.right}px`;
      else {
        pop.style.left = `${a.left + a.width / 2}px`;
        pop.style.translate = '-50% 0';
      }
    };

    // Once it's open and measurable: flip it if it doesn't fit, and keep it
    // inside the viewport sideways.
    const fit = () => {
      anchor();
      const { clientWidth: vw, clientHeight: vh } = document.documentElement;
      let r = pop.getBoundingClientRect();
      const a = triggerRef.current?.getBoundingClientRect();
      if (a && (r.bottom > vh - EDGE || r.top < EDGE)) {
        const room = side === 'top' ? vh - a.bottom - GAP - EDGE : a.top - GAP - EDGE;
        if (room >= r.height) {
          anchor(true);
          r = pop.getBoundingClientRect();
        }
      }
      if (r.left < EDGE || r.right > vw - EDGE) {
        Object.assign(pop.style, { right: '', translate: '', left: `${Math.max(EDGE, Math.min(r.left, vw - EDGE - r.width))}px` });
      }
    };

    const onBeforeToggle = (e: Event) => {
      if ((e as ToggleEvent).newState === 'open') anchor();
    };
    const onToggle = (e: Event) => {
      const open = (e as ToggleEvent).newState === 'open';
      onOpenChangeRef.current?.(open);
      if (open) {
        fit();
        // A menu takes focus, so arrow keys work straight away. (From a mouse
        // click no focus ring shows; from the keyboard it does.)
        pop.querySelector<HTMLElement>('[role="menuitem"]')?.focus({ preventScroll: true });
        window.addEventListener('scroll', fit, { passive: true, capture: true });
        window.addEventListener('resize', fit);
      } else {
        window.removeEventListener('scroll', fit, { capture: true });
        window.removeEventListener('resize', fit);
      }
    };

    pop.addEventListener('beforetoggle', onBeforeToggle);
    pop.addEventListener('toggle', onToggle);
    return () => {
      pop.removeEventListener('beforetoggle', onBeforeToggle);
      pop.removeEventListener('toggle', onToggle);
      window.removeEventListener('scroll', fit, { capture: true });
      window.removeEventListener('resize', fit);
    };
  }, [placement]);

  const close = () => popRef.current?.hidePopover();
  const triggerProps = trigger.props as { ref?: Ref<HTMLElement> };

  return (
    <>
      {cloneElement(trigger as ReactElement<{ popoverTarget?: string; ref?: Ref<HTMLElement> }>, {
        popoverTarget: id,
        ref: mergeRefs(triggerProps.ref, triggerRef),
      })}
      <GlassPanel
        ref={popRef}
        id={id}
        popover="auto"
        aria-label={ariaLabel}
        intensity="strong"
        padding="none"
        radius="card"
        className={cx('glass-popover', padded && 'glass-popover--padded', className)}
      >
        {typeof children === 'function' ? children(close) : children}
      </GlassPanel>
    </>
  );
};

const ITEM = '[role="menuitem"]:not([disabled]):not([aria-disabled="true"])';

/** A list of actions inside a GlassPopover. Arrow keys, Home and End move between items. */
export const GlassMenu = ({ className, onKeyDown, ...rest }: ComponentPropsWithRef<'div'>) => {
  const move = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    const items = [...e.currentTarget.querySelectorAll<HTMLElement>(ITEM)];
    if (!items.length || !['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const at = items.indexOf(document.activeElement as HTMLElement);
    const next = {
      ArrowDown: (at + 1) % items.length,
      ArrowUp: (at - 1 + items.length) % items.length,
      Home: 0,
      End: items.length - 1,
    }[e.key as 'ArrowDown' | 'ArrowUp' | 'Home' | 'End'];
    items[next]?.focus();
  };
  return <div role="menu" className={cx('glass-menu', className)} onKeyDown={move} {...rest} />;
};

export interface GlassMenuItemOwnProps {
  /** An icon before the label. */
  icon?: ReactNode;
  /** A shortcut or detail at the end, like ⌘ K. */
  hint?: ReactNode;
  /** For an action you can't undo. */
  danger?: boolean;
  className?: string;
}

export type GlassMenuItemProps<E extends ElementType = 'button'> = PolymorphicProps<E, GlassMenuItemOwnProps>;

/** One action in a GlassMenu. A button by default; `as="a"` or a router Link for navigation. */
export const GlassMenuItem = <E extends ElementType = 'button'>({
  as,
  icon,
  hint,
  danger = false,
  className,
  children,
  ...rest
}: GlassMenuItemProps<E>) => {
  const Tag: ElementType = as ?? 'button';
  return (
    <Tag
      role="menuitem"
      type={Tag === 'button' ? 'button' : undefined}
      className={cx('glass-menu__item', danger && 'glass-menu__item--danger', className)}
      {...rest}
    >
      {icon}
      <span>{children}</span>
      {hint != null && <span className="glass-menu__hint">{hint}</span>}
    </Tag>
  );
};
