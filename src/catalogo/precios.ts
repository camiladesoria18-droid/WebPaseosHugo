// =============================================================================
// Cálculos de precios del catálogo
// =============================================================================
import type { Producto, Unidad } from './tipos'

/**
 * El precio más bajo de un producto (entre todas sus variantes).
 * Devuelve null si ninguna variante tiene precio (todo "a consultar").
 */
export function precioDesde(producto: Producto): number | null {
  const precios = producto.variantes
    .map((v) => v.precio)
    .filter((precio): precio is number => precio !== null)
  return precios.length > 0 ? Math.min(...precios) : null
}

/** Texto que acompaña al precio según cómo se cobra: "por letra", "por hora" o nada. */
export function textoUnidad(unidad: Unidad): string {
  if (unidad === 'letra') return 'por letra'
  if (unidad === 'hora') return 'por hora'
  return ''
}
