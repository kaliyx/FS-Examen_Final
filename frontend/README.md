# HuertoHogar — Frontend 🥗

Aplicación frontend (React + TypeScript + Ant Design) para una tienda de verduras. Esta versión está preparada para funcionar íntegramente en modo frontend usando servicios mock locales; el backend puede conectarse después si se desea.

## Qué incluye

- Arquitectura basada en Atomic Design (átomos → moléculas → organismos → templates)
- Componentes UI con Ant Design
- Gestión de estado con Zustand (persistente en localStorage)
- Cliente HTTP con axios e interceptores (lista la integración real o usa los mocks locales)
- Autenticación JWT simulada en modo mock (login/register/refresh)
- Carrito de compras y checkout en modo local
- Tests con Vitest y Testing Library

## Estructura principal

Carpeta `src/` con `components/`, `pages/`, `services/` (mocks incluidos), `store/`, `hooks/`, y `types/`.

## Uso rápido (ver en el navegador)

1) Instalar dependencias:

```powershell
npm install
```

2) Iniciar servidor de desarrollo:

```powershell
npm run dev
```

3) Abrir en el navegador:

http://localhost:5173

La aplicación funcionará sin backend gracias a los servicios mock en `src/services/mock.services.ts`.

## Scripts importantes

- `npm run dev` — Inicia servidor de desarrollo (HMR)
- `npm run build` — Genera `dist/` optimizada para producción
- `npm run preview` — Vista previa del build
- `npm run test` — Ejecuta tests con Vitest
- `npm run test:coverage` — Reporte de cobertura

## Notas sobre el frontend-only

- El proyecto incluye servicios mock que permiten: registro/login, listado de productos, carrito, crear órdenes y ver historial de órdenes, todo almacenado localmente (localStorage).
- Si más adelante desean conectar un backend real, basta con actualizar `VITE_API_URL` y reemplazar el uso de los mocks por los servicios reales en `src/services/`.

## Cómo ver la página en el navegador (resumen)

1. `npm install`
2. `npm run dev`
3. Abrir `http://localhost:5173`

¿Quieres que además traduzca los nombres de archivos y componentes al español (por ejemplo `HomePage` → `PaginaInicio`) o solo que mantenga las etiquetas visibles en la UI en español? Puedo hacerlo ahora si lo confirmas.
