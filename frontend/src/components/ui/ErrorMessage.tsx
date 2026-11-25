import { Button } from './Button'
import { AlertIcon } from './icons'

interface ErrorMessageProps {
    message: string
    onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div role="alert" className="flex flex-col items-start gap-3 rounded-xl bg-rose-50 p-4 ring-1 ring-rose-200 sm:flex-row sm:items-center">
            <AlertIcon className="size-5 shrink-0 text-rose-600" />
            <p className="flex-1 text-sm text-rose-800">{message}</p>
            {onRetry && (
                <Button variant="secondary" size="sm" onClick={onRetry}>
                    Reintentar
                </Button>
            )}
        </div>
    )
}
