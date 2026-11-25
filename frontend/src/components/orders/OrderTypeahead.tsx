import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { MIN_SEARCH_CHARS, useOrderSuggestions } from '../../hooks/useOrderSuggestions'
import type { OrderSummary } from '../../types/order'
import { formatCurrency } from '../../utils/format'
import { cn } from '../ui/cn'
import { HighlightText } from '../ui/HighlightText'
import { CloseIcon, SearchIcon } from '../ui/icons'
import { Spinner } from '../ui/Spinner'
import { StatusBadge } from './StatusBadge'

export const NO_RESULTS_MESSAGE = 'No se encontraron resultados que coincidan con los criterios de búsqueda'

interface OrderTypeahead {
    value: string
    onSearch: (term: string) => void
    onSelect: (order: OrderSummary) => void
}

export function OrderTypeahead({ value, onSearch, onSelect }: OrderTypeahead) {
    const [input, setInput] = useState(value)
    const [prevValue, setPrevValue] = useState(value)
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const inputRef = useRef<HTMLInputElement>(null)
    const listId = useId()

    if (value !== prevValue) {
        setPrevValue(value)
        setInput(value)
    }

    const { suggestions, loading, settled, error } = useOrderSuggestions(input)
    const showDropdown = open && input.trim().length >= MIN_SEARCH_CHARS
    const optionId = (index: number) => `${listId}-option-${index}`

    useEffect(() => {
        if (activeIndex >= 0) {
            document.getElementById(optionId(activeIndex))?.scrollIntoView({ block: 'nearest' })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex])

    function select(order: OrderSummary) {
        setInput(order.orderNumber)
        setOpen(false)
        setActiveIndex(-1)
        onSelect(order)
    }

    function submit() {
        setOpen(false)
        setActiveIndex(-1)
        onSearch(input.trim())
    }

    function clear() {
        setInput('')
        setActiveIndex(-1)
        onSearch('')
        inputRef.current?.focus()
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault()
                setOpen(true)
                setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
                break
            case 'ArrowUp':
                event.preventDefault()
                setActiveIndex((i) => Math.max(i - 1, -1))
                break
            case 'Enter':
                event.preventDefault()
                if (showDropdown && activeIndex >= 0 && suggestions[activeIndex]) {
                    select(suggestions[activeIndex])
                } else {
                    submit()
                }
                break
            case 'Escape':
                setOpen(false)
                setActiveIndex(-1)
                break
        }
    }

    return (
        <div className="relative">
            <label htmlFor={`${listId}-input`} className="sr-only">
                Buscar pedidos
            </label>
            <div className="relative">
                <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-slate-400" />
                <input
                    ref={inputRef}
                    id={`${listId}-input`}
                    type="text"
                    role="combobox"
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-expanded={showDropdown}
                    aria-controls={listId}
                    aria-activedescendant={showDropdown && activeIndex >= 0 ? optionId(activeIndex) : undefined}
                    placeholder="Buscar pedido, cliente, correo o producto"
                    value={input}
                    onChange={(event) => {
                        setInput(event.target.value)
                        setOpen(true)
                        setActiveIndex(-1)
                    }}
                    onFocus={() => setOpen(true)}
                    onBlur={() => setOpen(false)}
                    onKeyDown={handleKeyDown}
                    className="h-11 w-full rounded-lg border-0 bg-white pr-10 pl-10 text-sm text-slate-900 ring-1 ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-600 focus:outline-none"
                />
                <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center">
                    {showDropdown && loading ? (
                        <Spinner className="mr-1 size-4" label="Buscando" />
                    ) : (
                        input && (
                            <button
                                type="button"
                                onClick={clear}
                                aria-label="Limpiar búsqueda"
                                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            >
                                <CloseIcon className="size-4" />
                            </button>
                        )
                    )}
                </div>
            </div>

            {showDropdown && (
                <div
                    className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-slate-200"
                    onMouseDown={(event) => event.preventDefault()}
                >
                    <ul id={listId} role="listbox" aria-label="Sugerencias de pedidos" className="max-h-80 overflow-y-auto py-1">
                        {suggestions.map((order, index) => (
                            <li
                                key={order.id}
                                id={optionId(index)}
                                role="option"
                                aria-selected={index === activeIndex}
                                onClick={() => select(order)}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={cn(
                                    'flex cursor-pointer items-center gap-3 px-4 py-2.5',
                                    index === activeIndex && 'bg-brand-50',
                                )}
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-mono text-sm font-medium text-slate-900">
                                            <HighlightText text={order.orderNumber} query={input} />
                                        </span>
                                        <StatusBadge status={order.status} />
                                    </div>
                                    <p className="truncate text-sm text-slate-600">
                                        <HighlightText text={order.customerName} query={input} />
                                        <span className="text-slate-400"> · </span>
                                        <HighlightText text={order.customerEmail} query={input} />
                                    </p>
                                </div>
                                <span className="shrink-0 text-sm font-medium text-slate-900">{formatCurrency(order.total)}</span>
                            </li>
                        ))}
                    </ul>

                    {settled && error && (
                        <p className="px-4 py-3 text-sm text-rose-700">No se pudieron cargar las sugerencias.</p>
                    )}
                    {settled && !error && suggestions.length === 0 && (
                        <p role="status" className="px-4 py-3 text-sm text-slate-500">
                            {NO_RESULTS_MESSAGE}
                        </p>
                    )}
                    {!settled && suggestions.length === 0 && (
                        <p className="px-4 py-3 text-sm text-slate-500">Buscando…</p>
                    )}

                    {suggestions.length > 0 && (
                        <button
                            type="button"
                            onClick={submit}
                            className="w-full border-t border-slate-100 px-4 py-2.5 text-left text-sm font-medium text-brand-700 hover:bg-slate-50"
                        >
                            Ver todos los resultados para “{input.trim()}”
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
