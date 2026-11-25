import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from './components/layout/AppLayout'
import { NotFoundPage } from './pages/NotFoundPage'
import { OrderDetailPage } from './pages/OrderDetailPage'
import { OrdersPage } from './pages/OrdersPage'

export default function App() {
  return (
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/orders" replace />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
  )
}
