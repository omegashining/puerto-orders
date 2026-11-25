import type { ButtonHTMLAttributes } from 'react'
import { cn } from './cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant
    size?: Size
}

const VARIANTS: Record<Variant, string> = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 focus-visible:outline-brand-600',
    secondary: 'bg-white text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus-visible:outline-slate-400',
    ghost: 'text-slate-600 hover:bg-slate-100 focus-visible:outline-slate-400',
}

const SIZES: Record<Size, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
}

export function Button({ variant = 'primary', size = 'md', className, type = 'button', ...props }: ButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                VARIANTS[variant],
                SIZES[size],
                className,
            )}
            {...props}
        />
    )
}
