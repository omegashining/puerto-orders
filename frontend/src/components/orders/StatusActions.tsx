import { useState } from 'react'
import { ordersApi } from '../../services/ordersApi'
import type { Order, OrderStatus } from '../../types/order'
import { NEXT_STATUSES, STATUS_CONFIG } from '../../utils/orderStatus'
import { Button } from '../ui/Button'

interface StatusActionsProps {
    order: Order
    onUpdated: (order: Order) => void
}

export function StatusActions({ order, onUpdated }: StatusActionsProps) {
    const [pending, setPending] = useState<OrderStatus | null>(null)
    const [error, setError] = useState<string | null>(null)
    const nextStatuses = NEXT_STATUSES[order.status]

    if (nextStatuses.length === 0) {
        return <p className="text-sm text-slate-500">Este pedido ya no admite cambios de estatus.</p>
    }

    async function changeStatus(status: OrderStatus) {
        setPending(status)
        setError(null)
        try {
            onUpdated(await ordersApi.updateStatus(order.id, status))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'No se pudo actualizar el estatus')
        } finally {
            setPending(null)
        }
    }

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
                {nextStatuses.map((status) => (
                    <Button
                        key={status}
                        size="sm"
                        variant={status === 'CANCELLED' ? 'secondary' : 'primary'}
                        disabled={pending !== null}
                        onClick={() => changeStatus(status)}
                    >
                        {pending === status ? 'Actualizando…' : `Marcar como ${STATUS_CONFIG[status].label.toLowerCase()}`}
                    </Button>
                ))}
            </div>
            {error && (
                <p role="alert" className="text-sm text-rose-700">
                    {error}
                </p>
            )}
        </div>
    )
}
