# Guía de Integración Backend-Frontend

## Resumen de Cambios

Este documento describe todos los cambios realizados para enlazar correctamente el backend NestJS con el frontend React.

## Configuración del Backend

### 1. CORS (backend/src/main.ts)
- **Configurado** para permitir peticiones desde `http://localhost:5173` (puerto de Vite)
- **Métodos permitidos**: GET, POST, PUT, DELETE, PATCH, OPTIONS
- **Headers permitidos**: Content-Type, Authorization
- **Credentials**: Habilitado

## Estructura de Datos

### Mapeo de Campos

#### Usuarios
| Frontend (Antiguo) | Backend | Frontend (Actualizado) |
|-------------------|---------|------------------------|
| name | nombre | nombre |
| email | email | email |
| role | rol | rol |
| - | telefono | telefono |
| - | direccion | direccion |
| id (string) | id (number) | id (number) |

**Valores de rol**: `admin`, `vendedor`

#### Productos
| Frontend (Antiguo) | Backend | Frontend (Actualizado) |
|-------------------|---------|------------------------|
| name | nombre | nombre |
| description | descripcion | descripcion |
| price | precio | precio |
| quantity | stock | stock |
| category | categoria | categoria |
| image | imagen | imagen |
| unit | - | - (eliminado) |
| id (string) | id (number) | id (number) |

**Valores de categoría**: `hombres`, `mujeres`, `niños`, `accesorios`

#### Carrito
| Frontend (Antiguo) | Backend | Frontend (Actualizado) |
|-------------------|---------|------------------------|
| productId | producto_id | producto_id |
| quantity | cantidad | cantidad |

#### Ventas/Órdenes
| Frontend (Antiguo) | Backend | Frontend (Actualizado) |
|-------------------|---------|------------------------|
| Order | Venta | Venta |
| userId | vendedor_id | vendedor_id |
| status | estado | estado |

**Valores de estado**: `completada`, `pendiente`, `cancelada`

## Endpoints API

### Autenticación
- **POST** `/api/auth/registro` - Registrar nuevo usuario
  ```typescript
  Body: {
    nombre: string,
    email: string,
    password: string,
    telefono?: string,
    direccion?: string
  }
  Response: {
    mensaje: string,
    token: string,
    usuario: User
  }
  ```

- **POST** `/api/auth/login` - Iniciar sesión
  ```typescript
  Body: {
    username: string,
    password: string
  }
  Response: {
    mensaje: string,
    token: string,
    usuario: User
  }
  ```

### Productos
- **GET** `/api/productos` - Obtener todos los productos
- **GET** `/api/productos/:id` - Obtener producto por ID
- **POST** `/api/productos` - Crear producto (requiere autenticación)
- **PUT** `/api/productos/:id` - Actualizar producto
- **DELETE** `/api/productos/:id` - Eliminar producto

### Ventas
- **GET** `/api/ventas` - Obtener ventas (según rol del usuario)
- **GET** `/api/ventas/:fecha` - Obtener ventas por fecha (solo admin)
- **GET** `/api/ventas/resumen/diario?fecha=YYYY-MM-DD` - Resumen diario (solo admin)
- **POST** `/api/ventas` - Crear venta (solo vendedor)
  ```typescript
  Body: {
    items: [
      {
        producto_id: number,
        cantidad: number
      }
    ]
  }
  ```
- **PUT** `/api/ventas/:id/completar` - Completar venta (solo vendedor)
- **PUT** `/api/ventas/:id/cancelar` - Cancelar venta (solo vendedor)

## Archivos Modificados

### Backend
1. **backend/src/main.ts** - Configuración de CORS

### Frontend

#### Tipos (frontend/src/types/index.ts)
- Actualizadas todas las interfaces para coincidir con el backend
- Agregadas interfaces `RegisterRequest`, `CreateProducto`, `UpdateProducto`, `CreateVenta`

#### Servicios
1. **frontend/src/services/axios.ts** - Ya configurado correctamente
2. **frontend/src/services/auth.service.ts** - Actualizado para usar `username` y `usuario`
3. **frontend/src/services/product.service.ts** - Actualizado endpoints y campos
4. **frontend/src/services/order.service.ts** - Actualizado para usar endpoints de ventas

#### Stores (Zustand)
1. **frontend/src/store/auth.store.ts** - Cambiado `email` a `username`, `user` a `usuario`
2. **frontend/src/store/cart.store.ts** - Cambiado `productId` a `producto_id`, `quantity` a `cantidad`

#### Hooks
1. **frontend/src/hooks/useLogin.ts** - Cambiado parámetro `email` a `username`

#### Páginas
1. **frontend/src/pages/LoginPage.tsx** - Actualizado para usar `username`
2. **frontend/src/pages/RegisterPage.tsx** - Actualizado campos y agregado telefono/direccion
3. **frontend/src/pages/ProfilePage.tsx** - Actualizado para mostrar `nombre`, `rol`, `telefono`, `direccion`
4. **frontend/src/pages/ProductsPage.tsx** - Actualizado para usar `nombre`
5. **frontend/src/pages/ProductDetailPage.tsx** - Actualizado todos los campos del producto
6. **frontend/src/pages/CartPage.tsx** - Actualizado para usar `producto_id`, `cantidad`, `precio`

#### Componentes
1. **frontend/src/components/molecules/LoginForm/LoginForm.tsx** - Cambiado de email a username
2. **frontend/src/components/molecules/ProductCard/ProductCard.tsx** - Actualizado campos del producto

## Variables de Entorno

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

## Instrucciones de Ejecución

### Backend
```bash
cd backend
npm install
npm run start:dev
```
El backend se ejecutará en `http://localhost:3000`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
El frontend se ejecutará en `http://localhost:5173`

## Notas Importantes

1. **Autenticación**: El backend usa JWT. El token se almacena en `localStorage` y se envía en el header `Authorization: Bearer <token>`

2. **Roles**: 
   - `admin`: Puede ver todas las ventas y resúmenes
   - `vendedor`: Puede crear productos y ventas, ver sus propias ventas

3. **Refresh Token**: El backend actual no implementa refresh token, por lo que esa funcionalidad está comentada en el frontend

4. **Búsqueda y Filtros**: La búsqueda y filtrado por categoría se hace en el cliente, ya que el backend no expone endpoints específicos para eso

5. **IDs**: Todos los IDs son numéricos en el backend, se actualizó el frontend para usar `number` en lugar de `string`

## Próximos Pasos Sugeridos

1. Implementar refresh token en el backend
2. Agregar endpoints de búsqueda y filtrado en el backend
3. Implementar paginación en el listado de productos
4. Agregar validación de imágenes y upload de archivos
5. Implementar sistema de notificaciones en tiempo real
