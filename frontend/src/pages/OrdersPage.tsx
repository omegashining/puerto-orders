import { useSearchParams } from 'react-router'
import { NO_RESULTS_MESSAGE, OrderTypeahead } from '../components/orders/OrderTypeahead'
import { OrderCardList } from '../components/orders/OrderCardList'
import { OrderTable } from '../components/orders/OrderTable'
import { StatusFilter } from '../components/orders/StatusFilter'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { cn } from '../components/ui/cn'
import { EmptyState } from '../components/ui/EmptyState'
import { ErrorMessage } from '../components/ui/ErrorMessage'
import { SearchIcon } from '../components/ui/icons'
import { Pagination } from '../components/ui/Pagination'
import { PageLoader } from '../components/ui/Spinner'
import { useOrders } from '../hooks/useOrders'
import type { OrderStatus, OrderSummary } from '../types/order'
import { parseStatus } from '../utils/orderStatus'

const PAGE_SIZE = 10

export function OrdersPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const q = searchParams.get('q') ?? ''
    const status = parseStatus(searchParams.get('status'))
    const page = Math.max(Number(searchParams.get('page')) || 0, 0)

    const { data, loading, error, reload } = useOrders({ q, status, page, size: PAGE_SIZE })
    const hasFilters = q !== '' || status !== undefined

    function updateFilters(changes: { q?: string; status?: OrderStatus; page?: number }) {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev)
            Object.entries(changes).forEach(([key, value]) => {
                if (value === undefined || value === '' || (key === 'page' && value === 0)) {
                    next.delete(key)
                } else {
                    next.set(key, String(value))
                }
            })
            return next
        })
    }

    const handleSearch = (term: string) => updateFilters({ q: term, page: 0 })
    const handleSelect = (order: OrderSummary) => updateFilters({ q: order.orderNumber, page: 0 })
    const handleStatus = (value?: OrderStatus) => updateFilters({ status: value, page: 0 })
    const clearFilters = () => setSearchParams({})

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Pedidos</h1>
                    <p className="text-sm text-slate-500">Pedidos realizados en la app y el sitio web</p>
                </div>
                {data && (
                    <p className="text-sm text-slate-500">
                        {data.totalElements} {data.totalElements === 1 ? 'pedido' : 'pedidos'}
                    </p>
                )}
            </div>

            <Card bodyClassName="space-y-4">
                <OrderTypeahead value={q} onSearch={handleSearch} onSelect={handleSelect} />
                <StatusFilter value={status} onChange={handleStatus} />
            </Card>

            {error && <ErrorMessage message={error.message} onRetry={reload} />}

            {!data && loading && <PageLoader />}

            {data && (
                <Card bodyClassName={cn('transition-opacity', loading && 'opacity-60')}>
                    {data.content.length === 0 ? (
                        <EmptyState
                            icon={hasFilters ? <SearchIcon className="size-6" /> : undefined}
                            title={hasFilters ? NO_RESULTS_MESSAGE : 'Aún no hay pedidos'}
                            description={hasFilters ? 'Prueba con otro término o quita los filtros.' : undefined}
                            action={
                                hasFilters && (
                                    <Button variant="secondary" onClick={clearFilters}>
                                        Limpiar filtros
                                    </Button>
                                )
                            }
                        />
                    ) : (
                        <div className="space-y-4">
                            <OrderTable orders={data.content} />
                            <OrderCardList orders={data.content} />
                            <Pagination
                                page={data.page}
                                size={data.size}
                                totalElements={data.totalElements}
                                totalPages={data.totalPages}
                                onPageChange={(next) => updateFilters({ page: next })}
                            />
                        </div>
                    )}
                </Card>
            )}
        </div>
    )
}
