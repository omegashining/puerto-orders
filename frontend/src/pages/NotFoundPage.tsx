import { Link } from 'react-router'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'

export function NotFoundPage() {
    return (
        <Card>
            <EmptyState
                title="Página no encontrada"
                description="La dirección que abriste no existe."
                action={
                    <Link to="/orders">
                        <Button variant="secondary">Ir a pedidos</Button>
                    </Link>
                }
            />
        </Card>
    )
}
