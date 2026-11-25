import { Link } from 'react-router'

export function Header() {
    return (
        <header className="sticky top-0 z-20 bg-brand-600 text-white shadow-sm">
            <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
                <Link to="/orders" className="flex items-center gap-2 font-semibold tracking-tight">
                    <span className="grid size-8 place-items-center rounded-lg bg-white text-sm font-bold text-brand-600">L</span>
                    <span>Puerto</span>
                </Link>
                <span className="hidden text-sm text-brand-100 sm:inline">· Gestión de pedidos</span>
            </div>
        </header>
    )
}
