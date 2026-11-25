import { ordersApi } from '../services/ordersApi'
import type { OrderSummary } from '../types/order'
import { useAsync } from './useAsync'
import { useDebounce } from './useDebounce'

export const MIN_SEARCH_CHARS = 2
const MAX_SUGGESTIONS = 8
const NO_RESULTS: OrderSummary[] = []

export function useOrderSuggestions(term: string) {
    const trimmed = term.trim()
    const debounced = useDebounce(trimmed, 300)
    const enabled = debounced.length >= MIN_SEARCH_CHARS

    const { data, loading, error } = useAsync(
        (signal) => (enabled ? ordersApi.suggest(debounced, MAX_SUGGESTIONS, signal) : Promise.resolve(NO_RESULTS)),
        [debounced],
    )

    // "settled": lo que se muestra corresponde exactamente a lo que hay escrito.
    const settled = trimmed === debounced && !loading

    return {
        suggestions: enabled ? (data ?? NO_RESULTS) : NO_RESULTS,
        loading: !settled,
        settled,
        error,
    }
}
