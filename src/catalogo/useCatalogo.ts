// =============================================================================
// Pedir el catálogo
// -----------------------------------------------------------------------------
// Dos piezas:
//  1. obtenerCatalogo(): el pedido en sí (Axios va y trae el JSON).
//  2. useCatalogo(): lo envuelve con TanStack Query (el "mozo con memoria"),
//     que guarda el resultado y avisa si está cargando o si hubo un error.
// =============================================================================
import { useQuery } from '@tanstack/react-query'
import { clienteHttp } from '../compartido/clienteHttp'
import type { Catalogo } from './tipos'

/** Pide el catálogo completo y lo devuelve con la forma del molde Catalogo. */
export async function obtenerCatalogo(): Promise<Catalogo> {
  const respuesta = await clienteHttp.get<Catalogo>('data/catalogo.json')
  return respuesta.data
}

/**
 * Hook de React para usar el catálogo en cualquier pantalla.
 * Devuelve, entre otras cosas:
 *  - data: el catálogo (cuando ya llegó)
 *  - isPending: true mientras se está pidiendo
 *  - isError: true si algo falló
 */
export function useCatalogo() {
  return useQuery({
    queryKey: ['catalogo'], // el "nombre" con el que el mozo recuerda este pedido
    queryFn: obtenerCatalogo, // qué hacer para conseguirlo
    staleTime: 1000 * 60 * 10, // durante 10 minutos lo da por fresco y no lo vuelve a pedir
  })
}
