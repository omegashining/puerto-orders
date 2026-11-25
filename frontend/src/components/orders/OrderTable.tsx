import { Link, useLocation, useNavigate } from 'react-router'
import type { OrderSummary } from '../../types/order'
import { formatCurrency, formatDateTime } from '../../utils/format'
import { StatusBadge } from './StatusBadge'

export function OrderTable({ orders }: { orders: OrderSummary[] }) {
    const navigate = useNavigate()
    const location = useLocation()
    const linkState = { from: location.search }

    return (
        <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead>
                <tr className="text-left text-xs font-medium tracking-wide text-slate-500 uppercase">
                    <th scope="col" className="px-4 py-3">Pedido</th>
                    <th scope="col" className="px-4 py-3">Cliente</th>
                    <th scope="col" className="px-4 py-3">Fecha</th>
                    <th scope="col" className="px-4 py-3">Estatus</th>
                    <th scope="col" className="px-4 py-3 text-right">Artículos</th>
                    <th scope="col" className="px-4 py-3 text-right">Total</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                    <tr
                        key={order.id}
                        onClick={() => navigate(`/orders/${order.id}`, { state: linkState })}
                        className="cursor-pointer transition-colors hover:bg-slate-50"
                    >
                        <td className="px-4 py-3 whitespace-nowrap">
                            <Link
                                to={`/orders/${order.id}`}
                                state={linkState}
                                onClick={(event) => event.stopPropagation()}
                                className="font-mono font-medium text-brand-700 hover:underline"
                            >
                                {order.orderNumber}
                            </Link>
                        </td>
                        <td className="px-4 py-3">
                            <p className="font-medium text-slate-900">{order.customerName}</p>
                            <p className="text-slate-500">{order.customerEmail}</p>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-slate-600">{formatDateTime(order.createdAt)}</td>
                        <td className="px-4 py-3">
                            <StatusBadge status={order.status} />
                        </td>
                        <td className="px-4 py-3 text-right text-slate-600">{order.totalItems}</td>
                        <td className="px-4 py-3 text-right font-medium whitespace-nowrap text-slate-900">
                            {formatCurrency(order.total)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
