import type { OrderStatus } from '../../types/order'
import { ORDER_STATUSES, STATUS_CONFIG } from '../../utils/orderStatus'
import { cn } from '../ui/cn'

interface StatusFilterProps {
    value?: OrderStatus
    onChange: (status?: OrderStatus) => void
}

export function StatusFilter({ value, onChange }: StatusFilterProps) {
    const options: Array<{ value?: OrderStatus; label: string }> = [
        { value: undefined, label: 'Todos' },
        ...ORDER_STATUSES.map((status) => ({ value: status, label: STATUS_CONFIG[status].label })),
    ]

    return (
        <div role="group" aria-label="Filtrar por estatus" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {options.map((option) => {
                const active = option.value === value
                return (
                    <button
                        key={option.label}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onChange(option.value)}
                        className={cn(
                            'shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                            active ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                        )}
                    >
                        {option.label}
                    </button>
                )
            })}
        </div>
    )
}
