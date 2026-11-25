import { cn } from './cn'

interface SpinnerProps {
    className?: string
    label?: string
}

export function Spinner({ className, label = 'Cargando' }: SpinnerProps) {
    return (
        <span role="status" className="inline-flex items-center">
      <span
          className={cn('size-5 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600', className)}
      />
      <span className="sr-only">{label}</span>
    </span>
    )
}

export function PageLoader() {
    return (
        <div className="flex justify-center py-16">
            <Spinner className="size-8" />
        </div>
    )
}
