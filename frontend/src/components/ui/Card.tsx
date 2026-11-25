import type { ReactNode } from 'react'
import { cn } from './cn'

interface CardProps {
    title?: string
    action?: ReactNode
    className?: string
    bodyClassName?: string
    children: ReactNode
}

export function Card({ title, action, className, bodyClassName, children }: CardProps) {
    return (
        <section className={cn('rounded-xl bg-white shadow-sm ring-1 ring-slate-200', className)}>
            {(title || action) && (
                <header className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
                    {title && <h2 className="text-sm font-semibold text-slate-900">{title}</h2>}
                    {action}
                </header>
            )}
            <div className={cn('p-4 sm:p-5', bodyClassName)}>{children}</div>
        </section>
    )
}
