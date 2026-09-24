import React from 'react';
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
type WrapProps = React.PropsWithChildren<SharedProps & {
    /** Controlled focus state — useful when wrapping <select> or custom elements. */
    focused?: boolean;
    /** Border-radius CSS value. Default: '1.1rem' */
    radius?: string;
}>;
export declare const GlassInputWrap: React.FC<WrapProps>;
export declare const GlassInput: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> & SharedProps & React.RefAttributes<HTMLInputElement>>;
export declare const GlassTextarea: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, "ref"> & SharedProps & React.RefAttributes<HTMLTextAreaElement>>;
export default GlassInput;
