// =============================================================================
// App: el componente principal de la web
// -----------------------------------------------------------------------------
// Le entrega el control al router: según la dirección del navegador,
// el router decide qué página mostrar (ver src/rutas/rutas.tsx).
// =============================================================================
import { RouterProvider } from '@tanstack/react-router'
import { router } from './rutas/rutas'

export default function App() {
  return <RouterProvider router={router} />
}
