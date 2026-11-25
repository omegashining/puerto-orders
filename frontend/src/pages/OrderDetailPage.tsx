import { Link, useLocation, useParams } from 'react-router'
import { OrderItemsList } from '../components/orders/OrderItemsList'
import { StatusActions } from '../components/orders/StatusActions'
import { StatusBadge } from '../components/orders/StatusBadge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { ChevronLeftIcon } from '../components/ui/icons'
import { PageLoader } from '../components/ui/Spinner'
import { useOrder } from '../hooks/useOrder'
import { ApiError } from '../services/httpClient'
import { formatAddressLines, formatCurrency, formatDateTime } from '../utils/format'

export function OrderDetailPage() {
    const { id = '' } = useParams()
    const location = useLocation()
    const { data: order, loading, error, reload, setData } = useOrder(id)

    const from = (location.state as { from?: string } | null)?.from ?? ''
    const backTo = `/orders${from}`

    const backLink = (
        <Link to={backTo} className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900">
            <ChevronLeftIcon className="size-4" />
            Volver a pedidos
        </Link>
    )

    if (loading && !order) {
        return <PageLoader />
    }

    if (error && !order) {
        if (error instanceof ApiError && error.status === 404) {
            return (
                <Card>
                    <EmptyState
                        title="Pedido no encontrado"
                        description="El pedido que buscas no existe o fue eliminado."
                        action={
                            <Link to="/orders">
                                <Button variant="secondary">Ir a pedidos</Button>
                            </Link>
                        }
                    />
                </Card>
            )
        }
        return (
            <div className="space-y-4">
                {backLink}
                <ErrorMessage message={error.message} onRetry={reload} />
            </div>
        )
    }

    if (!order) return null

    return (
        <div className="space-y-6">
            {backLink}

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="font-mono text-xl font-semibold text-slate-900 sm:text-2xl">{order.orderNumber}</h1>
                        <StatusBadge status={order.status} />
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                        Creado el {formatDateTime(order.createdAt)} · Actualizado el {formatDateTime(order.updatedAt)}
                    </p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Card title={`Productos (${order.totalItems})`}>
                        <OrderItemsList items={order.items} />
                        <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                            <span className="text-sm font-medium text-slate-600">Total</span>
                            <span className="text-lg font-semibold text-slate-900">{formatCurrency(order.total)}</span>
                        </div>
                    </Card>

                    <Card title="Estatus del pedido">
                        <StatusActions order={order} onUpdated={setData} />
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card title="Cliente">
                        <dl className="space-y-3 text-sm">
                            <div>
                                <dt className="text-slate-500">Nombre</dt>
                                <dd className="font-medium text-slate-900">{order.customer.fullName}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Correo electrónico</dt>
                                <dd className="font-medium break-all text-slate-900">{order.customer.email}</dd>
                            </div>
                        </dl>
                    </Card>

                    <Card title="Dirección de envío">
                        <address className="space-y-0.5 text-sm text-slate-700 not-italic">
                            {formatAddressLines(order.shippingAddress).map((line) => (
                                <p key={line}>{line}</p>
                            ))}
                        </address>
                    </Card>
                </div>
            </div>
        </div>
    )
}
