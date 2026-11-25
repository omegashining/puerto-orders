import type { OrderStatus } from '../../types/order'
import { STATUS_CONFIG } from '../../utils/orderStatus'
import { Badge } from '../ui/Badge'

export function StatusBadge({ status }: { status: OrderStatus }) {
    const { label, tone } = STATUS_CONFIG[status]
    return <Badge tone={tone}>{label}</Badge>
}
