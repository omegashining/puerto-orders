import type { ReactNode } from 'react'
import { BoxIcon } from './icons'

interface EmptyStateProps {
    title: string
    description?: string
    icon?: ReactNode
    action?: ReactNode
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center px-4 py-12 text-center">
            <div className="mb-3 rounded-full bg-slate-100 p-3 text-slate-400">{icon ?? <BoxIcon className="size-6" />}</div>
            <p className="font-medium text-slate-900">{title}</p>
            {description && <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>}
            {action && <div className="mt-4">{action}</div>}
        </div>
    )
}
