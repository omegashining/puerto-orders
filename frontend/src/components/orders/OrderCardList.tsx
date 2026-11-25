import { Link, useLocation } from 'react-router'
import type { OrderSummary } from '../../types/order'
import { formatCurrency, formatDate } from '../../utils/format'
import { StatusBadge } from './StatusBadge'

export function OrderCardList({ orders }: { orders: OrderSummary[] }) {
    const location = useLocation()

    return (
        <ul className="divide-y divide-slate-100 md:hidden">
            {orders.map((order) => (
                <li key={order.id}>
                    <Link
                        to={`/orders/${order.id}`}
                        state={{ from: location.search }}
                        className="block px-1 py-3 transition-colors active:bg-slate-50"
                    >
                        <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-sm font-medium text-brand-700">{order.orderNumber}</span>
                            <StatusBadge status={order.status} />
                        </div>
                        <p className="mt-1 truncate text-sm font-medium text-slate-900">{order.customerName}</p>
                        <div className="mt-1 flex items-center justify-between text-sm text-slate-500">
                            <span>
                                {formatDate(order.createdAt)} · {order.totalItems} art.
                            </span>
                            <span className="font-medium text-slate-900">{formatCurrency(order.total)}</span>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
