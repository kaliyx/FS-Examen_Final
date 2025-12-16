# Guía de Integración con Backend
Archivo eliminado: la documentación de backend fue retirada para mantener este repositorio orientado exclusivamente al frontend.
Si necesitas los detalles sobre los endpoints en el futuro, puedo regenerar una guía breve bajo petición.
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "usuario@example.com",
  "password": "contraseña"
}

Response 201:
{
  "success": true,
  "data": {
    "token": "eyJhbGc...",
    "user": { ... }
  }
}
```

#### Refresh Token
```http
POST /auth/refresh
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "data": {
    "token": "eyJhbGc..."
  }
}
```

---

### 2. **Productos** (`/products`)

#### Listar todos los productos
```http
GET /products?page=1&limit=20

Response 200:
{
  "success": true,
  "data": [
    {
      "id": "prod-1",
      "name": "Tomate",
      "description": "Tomate rojo fresco",
      "price": 25.50,
      "quantity": 100,
      "unit": "kg",
      "category": "vegetables",
      "image": "https://..."
    }
  ]
}
```

#### Obtener producto por ID
```http
GET /products/:id

Response 200:
{
  "success": true,
  "data": { ... }
}
```

#### Productos por categoría
```http
GET /products/category/:category

Response 200:
{
  "success": true,
  "data": [ ... ]
}
```

#### Buscar productos
```http
GET /products/search?q=tomate

Response 200:
{
  "success": true,
  "data": [ ... ]
}
```

---

### 3. **Órdenes** (`/orders`) - ⚠️ Requiere autenticación

#### Obtener mis órdenes
```http
GET /orders
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "data": [
    {
      "id": "order-123",
      "userId": "user-1",
      "items": [
        {
          "productId": "prod-1",
          "quantity": 2
        }
      ],
      "total": 50.00,
      "status": "pending",
      "createdAt": "2025-12-11T...",
      "updatedAt": "2025-12-11T..."
    }
  ]
}
```

#### Crear orden
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "prod-1",
      "quantity": 2
    }
  ],
  "total": 50.00
}

Response 201:
{
  "success": true,
  "data": { ... }
}
```

#### Actualizar estado de orden
```http
PATCH /orders/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "shipped"
}

Response 200:
{
  "success": true,
  "data": { ... }
}
```

---

## 🔐 Seguridad JWT

1. **Headers requeridos**: El frontend envía `Authorization: Bearer <token>` automáticamente
2. **Tokens**: 
   - `token`: Corta duración (15-30 minutos)
   - `refreshToken`: Larga duración (7 días)
3. **Errores**: Si retornas 401, el frontend redirige a login automáticamente

---

## 📝 Estructura de Tipos

El frontend espera estos tipos en las respuestas:

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'customer'
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  image?: string
  category: string
  unit: string
}

interface Order {
  id: string
  userId: string
  items: { productId: string; quantity: number }[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt: string
}
```

---

## 🔧 Configuración

Editar `.env` del frontend:
```env
VITE_API_URL=http://localhost:3000/api
```

---

## 📚 Arquitectura Frontend

El frontend está organizado siguiendo **Atomic Design**:

- **Átomos**: Button, Input, Card, Loader, EmptyState, Alert
- **Moléculas**: LoginForm, ProductCard
- **Organismos**: Navbar, ProductFilters
- **Templates**: MainLayout
- **Pages**: HomePage, LoginPage, RegisterPage, ProductsPage

Cada componente es **reutilizable**, **testeable** y **documentado**.

---

## 🧪 Testing

El frontend incluye tests unitarios con Vitest:
```bash
npm run test          # Ejecutar tests
npm run test:ui       # Interfaz visual
npm run test:coverage # Reporte de cobertura
```

---

## ✅ Checklist para el Backend

- [ ] Endpoints de autenticación funcionando
- [ ] Endpoints de productos funcionando
- [ ] Endpoints de órdenes funcionando
- [ ] Validación de JWT en middleware
- [ ] Respuestas en formato `ApiResponse<T>`
- [ ] Manejo de errores consistente
- [ ] CORS configurado para `http://localhost:5173`
- [ ] Tests unitarios de servicios
- [ ] DTOs con validaciones
- [ ] Controladores limpios y separados de la lógica

---

¡Listo! El frontend está preparado para conectarse. 🚀
