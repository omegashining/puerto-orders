const BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/v1').replace(/\/$/, '')

export interface ProblemDetail {
    title?: string
    detail?: string
    status?: number
    errors?: Record<string, string>
}

export class ApiError extends Error {
    readonly status: number
    readonly problem?: ProblemDetail

    constructor(status: number, message: string, problem?: ProblemDetail) {
        super(message)
        this.name = 'ApiError'
        this.status = status
        this.problem = problem
    }
}

type QueryValue = string | number | boolean | null | undefined
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions {
    query?: Record<string, QueryValue>
    body?: unknown
    signal?: AbortSignal
}

function buildUrl(path: string, query?: Record<string, QueryValue>): string {
    const url = new URL(`${BASE_URL}${path}`, window.location.origin)
    Object.entries(query ?? {}).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            url.searchParams.set(key, String(value))
        }
    })
    return url.toString()
}

async function request<T>(method: HttpMethod, path: string, options: RequestOptions = {}): Promise<T> {
    const { query, body, signal } = options
    let response: Response

    try {
        response = await fetch(buildUrl(path, query), {
            method,
            signal,
            headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
            body: body !== undefined ? JSON.stringify(body) : undefined,
        })
    } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
            throw error
        }
        throw new ApiError(0, 'No se pudo conectar con el servidor. Verifica que el API esté en ejecución.')
    }

    if (!response.ok) {
        const problem = (await response.json().catch(() => undefined)) as ProblemDetail | undefined
        throw new ApiError(response.status, problem?.detail ?? `Error ${response.status}`, problem)
    }

    if (response.status === 204) {
        return undefined as T
    }
    return (await response.json()) as T
}

export const http = {
    get: <T>(path: string, options?: Omit<RequestOptions, 'body'>) => request<T>('GET', path, options),
    post: <T>(path: string, body: unknown, options?: RequestOptions) => request<T>('POST', path, { ...options, body }),
    put: <T>(path: string, body: unknown, options?: RequestOptions) => request<T>('PUT', path, { ...options, body }),
    patch: <T>(path: string, body: unknown, options?: RequestOptions) => request<T>('PATCH', path, { ...options, body }),
    delete: <T = void>(path: string, options?: RequestOptions) => request<T>('DELETE', path, options),
}
