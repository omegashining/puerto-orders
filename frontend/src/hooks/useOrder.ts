import { ordersApi } from '../services/ordersApi'
import { useAsync } from './useAsync'

export function useOrder(id: string) {
    return useAsync((signal) => ordersApi.getById(id, signal), [id])
}
