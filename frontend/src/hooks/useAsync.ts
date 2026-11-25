import { useCallback, useEffect, useState, type DependencyList } from 'react'

interface SettledState<T> {
  data: T | undefined
  error: Error | undefined
  key: string | undefined
}

/**
 * Hook genérico para cargar datos asíncronos.
 */
export function useAsync<T>(fetcher: (signal: AbortSignal) => Promise<T>, deps: DependencyList) {
  const [reloadKey, setReloadKey] = useState(0)
  const [state, setState] = useState<SettledState<T>>({ data: undefined, error: undefined, key: undefined })
  const requestKey = JSON.stringify([...deps, reloadKey])

  useEffect(() => {
    const controller = new AbortController()

    fetcher(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setState({ data, error: undefined, key: requestKey })
        }
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        const normalized = error instanceof Error ? error : new Error(String(error))
        setState((prev) => ({ data: prev.data, error: normalized, key: requestKey }))
      })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey])

  const reload = useCallback(() => setReloadKey((key) => key + 1), [])
  const setData = useCallback((data: T) => setState((prev) => ({ ...prev, data })), [])

  const settled = state.key === requestKey
  return {
    data: state.data,
    error: settled ? state.error : undefined,
    loading: !settled,
    reload,
    setData,
  }
}
