import React, { useState } from 'react';
import { useGlass } from '../context/GlassContext';

export type GlassInputVariant = 'input' | 'textarea' | 'select';

type SharedProps = {
    /** Blur amount in px for the field backdrop-filter. Default: 16 */
    fieldBlur?: number;
    /** Extra className for the outer wrapper div. */
    wrapperClassName?: string;
    /** Style applied to the outer wrapper div. */
    wrapperStyle?: React.CSSProperties;
    /** Whether to show the top-edge shimmer line. Default: true */
    shimmer?: boolean;
};

// ── GlassInputWrap ────────────────────────────────────────────────────────────
// Standalone wrapper — use when you need to apply glass treatment to your
// own <input>, <textarea>, or <select> element. On focus a catch-light runs
// once around the rim and settles top-right, where the light comes from.
//
// ```tsx
// <GlassInputWrap>
//   <input className="glass-field__control" />
// </GlassInputWrap>
// ```

type WrapProps = React.PropsWithChildren<
    SharedProps & {
        /** Controlled focus state — useful when wrapping <select> or custom elements. */
        focused?: boolean;
        /** Border-radius CSS value. Default: '1.1rem' */
        radius?: string;
    }
>;

export const GlassInputWrap: React.FC<WrapProps> = ({
    children,
    focused: controlledFocused,
    fieldBlur = 16,
    radius = '1.1rem',
    wrapperClassName = '',
    wrapperStyle,
    shimmer = true,
}) => {
    const [uncontrolledFocused, setUncontrolledFocused] = useState(false);
    const isFocused = controlledFocused ?? uncontrolledFocused;
    const { opacity } = useGlass();

    const vars = {
        '--field-radius': radius,
        '--field-blur': `${fieldBlur}px`,
        '--glass-opacity': opacity,
    } as React.CSSProperties;

    return (
        <div
            className={`glass-field ${wrapperClassName}`.trim()}
            data-focused={isFocused}
            style={{ ...vars, ...wrapperStyle }}
            onFocus={() => { if (controlledFocused === undefined) setUncontrolledFocused(true); }}
            onBlur={() => { if (controlledFocused === undefined) setUncontrolledFocused(false); }}
        >
            {shimmer && <div aria-hidden="true" className="glass-field__shimmer" />}
            {children}
        </div>
    );
};

// ── GlassInput ────────────────────────────────────────────────────────────────
// A fully glass-styled <input> element. Accepts all standard <input> props.
//
// ```tsx
// <GlassInput
//   type="text"
//   placeholder="Search snippets…"
//   value={query}
//   onChange={(e) => setQuery(e.target.value)}
// />
// ```

type InputProps = React.ComponentPropsWithoutRef<'input'> & SharedProps;

export const GlassInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ fieldBlur, wrapperClassName, wrapperStyle, shimmer, onFocus, onBlur, className, ...props }, ref) => {
        const [focused, setFocused] = useState(false);
        return (
            <GlassInputWrap
                focused={focused}
                fieldBlur={fieldBlur}
                wrapperClassName={wrapperClassName}
                wrapperStyle={wrapperStyle}
                shimmer={shimmer}
            >
                <input
                    ref={ref}
                    {...props}
                    className={`glass-field__control ${className ?? ''}`.trim()}
                    onFocus={(e) => { setFocused(true); onFocus?.(e); }}
                    onBlur={(e) => { setFocused(false); onBlur?.(e); }}
                />
            </GlassInputWrap>
        );
    }
);

GlassInput.displayName = 'GlassInput';

// ── GlassTextarea ─────────────────────────────────────────────────────────────
// A glass-styled <textarea>. Accepts all standard <textarea> props.

type TextareaProps = React.ComponentPropsWithoutRef<'textarea'> & SharedProps;

export const GlassTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ fieldBlur, wrapperClassName, wrapperStyle, shimmer, onFocus, onBlur, className, ...props }, ref) => {
        const [focused, setFocused] = useState(false);
        return (
            <GlassInputWrap
                focused={focused}
                fieldBlur={fieldBlur}
                radius="1.3rem"
                wrapperClassName={wrapperClassName}
                wrapperStyle={wrapperStyle}
                shimmer={shimmer}
            >
                <textarea
                    ref={ref}
                    {...props}
                    className={`glass-field__control ${className ?? ''}`.trim()}
                    onFocus={(e) => { setFocused(true); onFocus?.(e); }}
                    onBlur={(e) => { setFocused(false); onBlur?.(e); }}
                />
            </GlassInputWrap>
        );
    }
);

GlassTextarea.displayName = 'GlassTextarea';

export default GlassInput;
