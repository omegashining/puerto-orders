import { Button } from './Button'
import { ChevronLeftIcon, ChevronRightIcon } from './icons'

interface PaginationProps {
    page: number
    size: number
    totalElements: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function Pagination({ page, size, totalElements, totalPages, onPageChange }: PaginationProps) {
    if (totalElements === 0) return null

    const from = page * size + 1
    const to = Math.min((page + 1) * size, totalElements)

    return (
        <nav aria-label="Paginación" className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-slate-600">
                Mostrando <span className="font-medium">{from}</span>–<span className="font-medium">{to}</span> de{' '}
                <span className="font-medium">{totalElements}</span>
            </p>
            <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" disabled={page === 0} onClick={() => onPageChange(page - 1)}>
                    <ChevronLeftIcon className="size-4" />
                    Anterior
                </Button>
                <span className="text-sm text-slate-600">
          {page + 1} / {Math.max(totalPages, 1)}
        </span>
                <Button variant="secondary" size="sm" disabled={page + 1 >= totalPages} onClick={() => onPageChange(page + 1)}>
                    Siguiente
                    <ChevronRightIcon className="size-4" />
                </Button>
            </div>
        </nav>
    )
}
