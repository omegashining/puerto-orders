import type { BadgeTone } from '../components/ui/Badge'
import type { OrderStatus } from '../types/order'

export const ORDER_STATUSES: OrderStatus[] = ['CREATED', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED']

export const STATUS_CONFIG: Record<OrderStatus, { label: string; tone: BadgeTone }> = {
    CREATED: { label: 'Creado', tone: 'info' },
    PAID: { label: 'Pagado', tone: 'brand' },
    SHIPPED: { label: 'Enviado', tone: 'warning' },
    DELIVERED: { label: 'Entregado', tone: 'success' },
    CANCELLED: { label: 'Cancelado', tone: 'danger' },
}

export const NEXT_STATUSES: Record<OrderStatus, OrderStatus[]> = {
    CREATED: ['PAID', 'CANCELLED'],
    PAID: ['SHIPPED', 'CANCELLED'],
    SHIPPED: ['DELIVERED'],
    DELIVERED: [],
    CANCELLED: [],
}

export function parseStatus(value: string | null): OrderStatus | undefined {
    return ORDER_STATUSES.find((status) => status === value)
}
