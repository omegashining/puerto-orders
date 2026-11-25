import { Outlet } from 'react-router'
import { Header } from './Header'

export function AppLayout() {
    return (
        <div className="min-h-dvh">
            <Header />
            <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
                <Outlet />
            </main>
        </div>
    )
}
