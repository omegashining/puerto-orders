import type { Order, OrderFilters, OrderStatus, OrderSummary } from '../types/order'
import type { Page } from '../types/page'
import { http } from './httpClient'

const RESOURCE = '/orders'

export const ordersApi = {
    list(filters: OrderFilters, signal?: AbortSignal) {
        return http.get<Page<OrderSummary>>(RESOURCE, {
            query: {
                q: filters.q,
                status: filters.status,
                page: filters.page,
                size: filters.size,
                sort: 'createdAt,desc',
            },
            signal,
        })
    },

    suggest(term: string, limit = 8, signal?: AbortSignal) {
        return http.get<OrderSummary[]>(`${RESOURCE}/search`, { query: { q: term, limit }, signal })
    },

    getById(id: string, signal?: AbortSignal) {
        return http.get<Order>(`${RESOURCE}/${encodeURIComponent(id)}`, { signal })
    },

    updateStatus(id: string, status: OrderStatus) {
        return http.patch<Order>(`${RESOURCE}/${encodeURIComponent(id)}/status`, { status })
    },
}
