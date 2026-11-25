import type { ReactNode } from 'react'
import { cn } from './cn'

export type BadgeTone = 'neutral' | 'info' | 'brand' | 'warning' | 'success' | 'danger'

const TONES: Record<BadgeTone, string> = {
    neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
    info: 'bg-sky-50 text-sky-700 ring-sky-200',
    brand: 'bg-brand-50 text-brand-700 ring-brand-200',
    warning: 'bg-amber-50 text-amber-700 ring-amber-200',
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    danger: 'bg-rose-50 text-rose-700 ring-rose-200',
}

interface BadgeProps {
    tone?: BadgeTone
    children: ReactNode
    className?: string
}

export function Badge({ tone = 'neutral', children, className }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                TONES[tone],
                className,
            )}
        >
      {children}
    </span>
    )
}
