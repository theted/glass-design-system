import { useRef } from 'react';
import type { ComponentPropsWithRef, MouseEvent, ReactNode } from 'react';
import { cx, useMergedRef } from '../utils';
import { useFieldProps } from './GlassField';

export type GlassControlSize = 'sm' | 'md' | 'lg';

interface ControlOwnProps {
  /** Height from the shared control scale: 34 / 40 / 48px. Default 'md'. */
  size?: GlassControlSize;
  /** Marks the control invalid. Inside a GlassField, its `error` does this. */
  invalid?: boolean;
}

const sizeClass = (base: string, size: GlassControlSize) => size !== 'md' && `${base}--${size}`;

export type GlassInputProps = Omit<ComponentPropsWithRef<'input'>, 'size'> &
  ControlOwnProps & {
    /** An icon or text inside the field, before the value. */
    leading?: ReactNode;
    /** An icon, unit, shortcut or button inside the field, after the value. */
    trailing?: ReactNode;
  };

/**
 * A text field cut into the glass. Takes every `<input>` prop; `onChange`
 * is the native event, so form libraries work as usual. With `leading` or
 * `trailing`, `className` and `style` go on the wrapping group; everything
 * else stays on the input.
 *
 * ```tsx
 * <GlassInput type="search" placeholder="Search snippets" leading={<SearchIcon />} />
 * <GlassInput inputMode="decimal" trailing="kr" />
 * ```
 */
export const GlassInput = ({
  size = 'md',
  invalid,
  leading,
  trailing,
  className,
  style,
  ref,
  id,
  required,
  'aria-describedby': describedBy,
  ...rest
}: GlassInputProps) => {
  const own = useRef<HTMLInputElement>(null);
  const setRef = useMergedRef(own, ref);
  const field = useFieldProps({ id, invalid, required, 'aria-describedby': describedBy });
  const grouped = leading != null || trailing != null;

  const input = (
    <input
      ref={setRef}
      className={cx('glass-input', !grouped && sizeClass('glass-input', size), !grouped && className)}
      style={grouped ? undefined : style}
      {...field}
      {...rest}
    />
  );

  if (!grouped) return input;

  // A press anywhere in the group (an icon, the padding) focuses the input.
  const focusInput = (e: MouseEvent) => {
    if (e.target === own.current || (e.target as HTMLElement).closest('button, a, input, select, textarea')) return;
    e.preventDefault();
    own.current?.focus();
  };

  return (
    <div className={cx('glass-input-group', sizeClass('glass-input-group', size), className)} style={style} onMouseDown={focusInput}>
      {leading}
      {input}
      {trailing}
    </div>
  );
};

export type GlassTextareaProps = ComponentPropsWithRef<'textarea'> &
  Omit<ControlOwnProps, 'size'> & {
    /** Grow with the text instead of scrolling (where the browser supports field-sizing). */
    autoGrow?: boolean;
  };

/** A multi-line text field. Takes every `<textarea>` prop. */
export const GlassTextarea = ({
  invalid,
  autoGrow = false,
  className,
  id,
  required,
  'aria-describedby': describedBy,
  ...rest
}: GlassTextareaProps) => {
  const field = useFieldProps({ id, invalid, required, 'aria-describedby': describedBy });
  return <textarea className={cx('glass-input', autoGrow && 'glass-input--auto', className)} {...field} {...rest} />;
};

export type GlassSelectProps = Omit<ComponentPropsWithRef<'select'>, 'size'> & ControlOwnProps;

/**
 * A native select in the same well as the text fields, with its own
 * chevron. The menu itself is the browser's.
 *
 * ```tsx
 * <GlassSelect defaultValue="ts">
 *   <option value="ts">TypeScript</option>
 *   <option value="go">Go</option>
 * </GlassSelect>
 * ```
 */
export const GlassSelect = ({
  size = 'md',
  invalid,
  className,
  id,
  required,
  'aria-describedby': describedBy,
  ...rest
}: GlassSelectProps) => {
  const field = useFieldProps({ id, invalid, required, 'aria-describedby': describedBy });
  return <select className={cx('glass-input', sizeClass('glass-input', size), className)} {...field} {...rest} />;
};
