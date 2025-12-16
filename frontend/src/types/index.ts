// Autenticación
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  nombre: string
  email: string
  password: string
  telefono?: string
  direccion?: string
}

export interface LoginResponse {
  mensaje: string
  token: string
  usuario: User
}

export interface User {
  id: number
  nombre: string
  email: string
  telefono?: string
  direccion?: string
}

// Productos
export interface Product {
  id: number
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  imagen?: string
  usuario_id: number
}

export interface CreateProducto {
  nombre: string
  descripcion: string
  precio: number
  categoria: string
  imagen?: string
}

export interface UpdateProducto {
  nombre?: string
  descripcion?: string
  precio?: number
  categoria?: string
  imagen?: string
}

// Carrito
export interface CartItem {
  producto_id: number
  cantidad: number
  product?: Product
}

export interface Cart {
  items: CartItem[]
  total: number
}

// Ventas/Órdenes
export interface ItemVenta {
  producto_id: number
  cantidad: number
}

export interface CreateVenta {
  items: ItemVenta[]
}

export interface DetalleVenta {
  id: number
  producto_id: number
  cantidad: number
  precio_unitario: number
  subtotal: number
}

export interface Venta {
  id: number
  vendedor_id: number
  total: number
  subtotal: number
  impuesto: number
  estado: 'completada' | 'pendiente' | 'cancelada'
  detalles: DetalleVenta[]
  createdAt: string
  updatedAt: string
}

// Alias para compatibilidad
export type Order = Venta

// API Response
export interface ApiResponse<T> {
  success?: boolean
  mensaje?: string
  data?: T
  message?: string
  error?: string
}
