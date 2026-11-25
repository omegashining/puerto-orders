import { ordersApi } from '../services/ordersApi'
import type { OrderFilters } from '../types/order'
import { useAsync } from './useAsync'

export function useOrders(filters: OrderFilters) {
    const { q, status, page, size } = filters
    return useAsync((signal) => ordersApi.list({ q, status, page, size }, signal), [q, status, page, size])
}
