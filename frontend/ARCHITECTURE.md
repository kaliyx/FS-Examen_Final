Archivo eliminado: la guía extensa de arquitectura fue retirada para simplificar el repositorio y mantenerlo centrado en el código frontend listo para uso.
Si necesitas una explicación arquitectural breve o la vuelvo a generar en español, dímelo y la prepararé.
**Uso:**
```tsx
<Button type="primary" label="Click me" />
<Input label="Email" error="Required" />
<Card title="Title">Content</Card>
```

### 2. Moléculas 🟡
**Componentes formados por átomos**

```
src/components/molecules/
├── LoginForm/          (Átomos: Input + Button)
└── ProductCard/        (Átomos: Card + Button)
```

**Uso:**
```tsx
<LoginForm onSubmit={handleLogin} loading={false} />
<ProductCard product={product} onAddToCart={handleAddToCart} />
```

### 3. Organismos 🟠
**Componentes complejos formados por moléculas**

```
src/components/organisms/
├── Navbar/             (Menu + Dropdown + Badge)
└── ProductFilters/     (Inputs + Select)
```

**Uso:**
```tsx
<Navbar />
<ProductFilters onSearch={...} onCategoryChange={...} />
```

### 4. Templates 🔴
**Layouts que estructuran páginas**

```
src/components/templates/
└── MainLayout/         (Layout + Navbar + Footer)
```

**Uso:**
```tsx
<MainLayout>
  <h1>Contenido de página</h1>
</MainLayout>
```

---

## Flujo de Datos

### 1. Usuario Inicia Sesión

```
LoginPage
  ↓
useLogin() hook
  ↓
authService.login()
  ↓
axios POST /auth/login
  ↓
Backend valida y retorna token
  ↓
useAuthStore.login() guarda en localStorage
  ↓
Redirige a Home
```

### 2. Usuario Ve Productos

```
ProductsPage
  ↓
useProducts() hook (efecto al montar)
  ↓
productService.getAll()
  ↓
axios GET /products
  ↓
Backend retorna productos
  ↓
renderiza ProductCards
```

### 3. Usuario Agrega Producto a Carrito

```
ProductCard (onAddToCart)
  ↓
useCart().addToCart()
  ↓
useCartStore.addItem()
  ↓
Zustand actualiza estado
  ↓
localStorage persiste cambios
  ↓
Navbar actualiza badge con contador
```

### 4. Usuario Va al Carrito y Compra

```
CartPage
  ↓
useCart() para ver items
  ↓
Usuario modifica cantidades/elimina
  ↓
Clickea "Proceder al Pago"
  ↓
orderService.create() (TODO: conectar con backend)
  ↓
Crea orden y limpia carrito
```

---

## Páginas y Rutas

### Públicas (sin autenticación)
| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | HomePage | Landing page principal |
| `/login` | LoginPage | Formulario de login |
| `/register` | RegisterPage | Formulario de registro |
| `/products` | ProductsPage | Catálogo de productos |
| `/products/:id` | ProductDetailPage | Detalle de un producto |
| `/cart` | CartPage | Carrito de compras |

### Privadas (requieren autenticación)
| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/profile` | ProfilePage | Perfil del usuario |
| `/orders` | OrdersPage | Historial de órdenes |

---

## Componentes

### Button (Átomo)
```tsx
<Button 
  type="primary"        // 'primary' | 'default' | 'dashed' | 'text'
  label="Click"
  loading={false}
  onClick={() => {}}
  disabled={false}
/>
```

### Input (Átomo)
```tsx
<Input
  label="Email"
  type="email"
  error="Invalid email"
  placeholder="tu@email.com"
  onChange={(e) => {}}
/>
```

### Card (Átomo)
```tsx
<Card 
  title="Title"
  hoverable
>
  Contenido
</Card>
```

### LoginForm (Molécula)
```tsx
<LoginForm
  onSubmit={(email, password) => {}}
  loading={false}
/>
```

### ProductCard (Molécula)
```tsx
<ProductCard
  product={product}
  onAddToCart={(product) => {}}
/>
```

### Navbar (Organismo)
```tsx
<Navbar />
// Automáticamente muestra:
// - Logo
// - Menu (Home, Products)
// - Carrito (si autenticado)
// - Usuario (si autenticado)
```

### MainLayout (Template)
```tsx
<MainLayout>
  {/* Tu contenido aquí */}
</MainLayout>
```

---

## Servicios

### authService
```typescript
await authService.login(email, password)
await authService.register(name, email, password)
await authService.logout()
const user = authService.getCurrentUser()
await authService.refreshToken()
```

### productService
```typescript
const products = await productService.getAll(page, limit)
const product = await productService.getById(id)
const products = await productService.getByCategory(category)
const products = await productService.search(query)
```

### orderService
```typescript
const orders = await orderService.getAll()
const order = await orderService.getById(id)
const order = await orderService.create(data)
await orderService.updateStatus(id, status)
```

---

## Hooks Personalizados

### useLogin
```tsx
const { handleLogin, loading, error } = useLogin()

handleLogin(email, password).then(() => {
  // Login exitoso
})
```

### useProducts
```tsx
const { 
  products,
  loading,
  error,
  fetchProducts,
  searchProducts,
  getByCategory
} = useProducts()

useEffect(() => {
  fetchProducts()
}, [])

await searchProducts("tomate")
await getByCategory("vegetables")
```

### useCart
```tsx
const {
  items,
  total,
  itemCount,
  addToCart,
  removeFromCart,
  updateItemQuantity,
  clearCart,
  checkout
} = useCart()

addToCart(product, quantity)
removeFromCart(productId)
updateItemQuantity(productId, 5)
const order = checkout()
```

---

## Estado Global

### useAuthStore (Zustand)
```typescript
const {
  user,           // User | null
  token,          // string | null
  isAuthenticated, // boolean
  login,
  logout,
  setUser,
  initAuth        // Inicializa desde localStorage
} = useAuthStore()
```

### useCartStore (Zustand + persist)
```typescript
const {
  items,          // CartItem[]
  total,          // number
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  getCartTotal
} = useCartStore()
// Automáticamente persiste en localStorage
```

---

## Testing

### Ejecutar Tests
```bash
npm run test            # Modo watch
npm run test:coverage   # Con cobertura
npm run test:ui         # Interfaz visual
```

### Estructura de Tests
```
src/
├── components/atoms/Button/Button.test.tsx
├── components/atoms/Input/Input.test.tsx
├── hooks/useCart.test.ts
└── hooks/useLogin.test.ts
```

### Escribir un Test
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/atoms'

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click" />)
    expect(screen.getByText('Click')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button label="Click" onClick={onClick} />)
    screen.getByText('Click').click()
    expect(onClick).toHaveBeenCalled()
  })
})
```

---

## Deployment

### Build
```bash
npm run build
# Genera carpeta dist/ lista para producción
```

### Variables de Producción
```env
VITE_API_URL=https://api.huertohogar.com
```

### Desplegar en:
- **Vercel**: `vercel deploy`
- **Netlify**: Conectar repositorio
- **Firebase**: `firebase deploy --only hosting`
- **GitHub Pages**: Workflow CI/CD

---

## Checklist para Integración

### Frontend (Tu rol) ✅
- [x] Autenticación JWT
- [x] Catálogo de productos
- [x] Carrito de compras
- [x] Perfil de usuario
- [x] Historial de órdenes
- [x] Rutas privadas
- [x] Tests unitarios
- [x] Responsive design
- [x] Manejo de errores

### Backend (Tu compañero) ⏳
- [ ] Endpoints de autenticación
- [ ] CRUD de productos
- [ ] CRUD de órdenes
- [ ] Validaciones y DTOs
- [ ] Middleware JWT
- [ ] Tests de servicios
- [ ] Documentación API
- [ ] CORS configurado

---

## 🚀 Próximos Pasos

1. **Tu compañero crea el backend**
   - Seguir guía en `BACKEND_INTEGRATION.md`

2. **Conectar endpoints**
   - Cambiar `VITE_API_URL` en `.env`
   - Probar cada servicio

3. **Agregar funcionalidades**
   - Carrito persistido en backend
   - Historial de compras
   - Wishlist
   - Reviews

4. **Mejorar UX**
   - Animaciones
   - Transiciones
   - Validaciones más robustas
   - Offline support

5. **Optimizar Performance**
   - Code splitting
   - Lazy loading
   - Image optimization
   - PWA

---

## 📚 Recursos

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Ant Design](https://ant.design/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Vite Docs](https://vitejs.dev/)
- [Testing Library](https://testing-library.com/)

---

**¡Listo para empezar el proyecto en equipo!** 🎉
