// =============================================================================
// Rutas: el "cartel" de secciones de la web (TanStack Router)
// -----------------------------------------------------------------------------
// Cada ruta une una DIRECCIÓN (lo que se ve en la barra del navegador) con una
// PÁGINA (el componente que se muestra). Por ejemplo:
//   /           → Página de inicio
//   /pretales   → Página de la categoría "pretales"
// Todas las rutas cuelgan de la "ruta raíz", que dibuja el marco común
// (encabezado y pie) y deja un hueco (<Outlet />) donde va cada página.
// =============================================================================
import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { MarcoPagina } from '../compartido/MarcoPagina'
import { PaginaNoEncontrada } from '../compartido/PaginaNoEncontrada'
import { PaginaInicio } from '../inicio/PaginaInicio'
import { PaginaCategoria } from '../catalogo/PaginaCategoria'

// 1) Ruta raíz: el marco que envuelve a todas las páginas
const rutaRaiz = createRootRoute({
  component: MarcoPagina,
  notFoundComponent: PaginaNoEncontrada, // si alguien escribe una dirección que no existe
})

// 2) Inicio: la dirección "/"
const rutaInicio = createRoute({
  getParentRoute: () => rutaRaiz,
  path: '/',
  component: PaginaInicio,
})

// 3) Categoría: "/$categoriaId" significa "cualquier palabra acá".
//    Esa palabra (ej.: "pretales") llega a la página como parámetro categoriaId.
export const rutaCategoria = createRoute({
  getParentRoute: () => rutaRaiz,
  path: '$categoriaId',
  component: PaginaCategoria,
})

// 4) Armamos el "árbol" de rutas y el router
const arbolDeRutas = rutaRaiz.addChildren([rutaInicio, rutaCategoria])

export const router = createRouter({
  routeTree: arbolDeRutas,
  scrollRestoration: true, // al volver atrás, recuerda hasta dónde habías bajado
})

// 5) Le contamos a TypeScript cómo es nuestro router, para que nos avise
//    si escribimos mal una dirección en un enlace.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
