import type { OrderItem } from '../../types/order'
import { formatCurrency } from '../../utils/format'

export function OrderItemsList({ items }: { items: OrderItem[] }) {
    return (
        <>
            <table className="hidden min-w-full text-sm sm:table">
                <thead>
                <tr className="text-left text-xs font-medium tracking-wide text-slate-500 uppercase">
                    <th scope="col" className="pb-2">Código</th>
                    <th scope="col" className="pb-2 text-right">Cantidad</th>
                    <th scope="col" className="pb-2 text-right">Precio</th>
                    <th scope="col" className="pb-2 text-right">Subtotal</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {items.map((item, index) => (
                    <tr key={`${item.productCode}-${index}`}>
                        <td className="py-3 font-mono text-slate-900">{item.productCode}</td>
                        <td className="py-3 text-right text-slate-600">{item.quantity}</td>
                        <td className="py-3 text-right text-slate-600">{formatCurrency(item.price)}</td>
                        <td className="py-3 text-right font-medium text-slate-900">{formatCurrency(item.subtotal)}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <ul className="divide-y divide-slate-100 sm:hidden">
                {items.map((item, index) => (
                    <li key={`${item.productCode}-${index}`} className="flex items-center justify-between gap-3 py-3 text-sm">
                        <div>
                            <p className="font-mono text-slate-900">{item.productCode}</p>
                            <p className="text-slate-500">
                                {item.quantity} × {formatCurrency(item.price)}
                            </p>
                        </div>
                        <span className="font-medium text-slate-900">{formatCurrency(item.subtotal)}</span>
                    </li>
                ))}
            </ul>
        </>
    )
}
