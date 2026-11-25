export type OrderStatus = 'CREATED' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export interface Address {
    street: string
    externalNumber: string
    internalNumber?: string | null
    neighborhood: string
    city: string
    state: string
    zipCode: string
}

export interface Customer {
    firstName: string
    lastName: string
    secondLastName?: string | null
    fullName: string
    email: string
}

export interface OrderItem {
    productCode: string
    quantity: number
    price: number
    subtotal: number
}

export interface Order {
    id: string
    orderNumber: string
    userId: string
    customer: Customer
    shippingAddress: Address
    items: OrderItem[]
    totalItems: number
    total: number
    status: OrderStatus
    createdAt: string
    updatedAt: string
}

export interface OrderSummary {
    id: string
    orderNumber: string
    customerName: string
    customerEmail: string
    status: OrderStatus
    total: number
    totalItems: number
    createdAt: string
}

export interface OrderFilters {
    q?: string
    status?: OrderStatus
    page?: number
    size?: number
}
