import type { Address } from '../types/order'

const currencyFormatter = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })
const dateTimeFormatter = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' })
const dateFormatter = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' })

export const formatCurrency = (value: number) => currencyFormatter.format(value)

export const formatDateTime = (iso?: string) => (iso ? dateTimeFormatter.format(new Date(iso)) : '—')

export const formatDate = (iso?: string) => (iso ? dateFormatter.format(new Date(iso)) : '—')

export function formatAddressLines(address: Address): string[] {
    const number = address.internalNumber
        ? `${address.externalNumber}, ${address.internalNumber}`
        : address.externalNumber
    return [
        `${address.street} ${number}`,
        `Col. ${address.neighborhood}`,
        `${address.city}, ${address.state}`,
        `C.P. ${address.zipCode}`,
    ]
}
