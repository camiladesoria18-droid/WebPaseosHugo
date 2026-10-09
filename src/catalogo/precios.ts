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

/**
 * El precio más bajo de toda una categoría (el "Desde $..." de las tarjetas del inicio).
 * Devuelve null si ningún producto de la categoría tiene precio fijo.
 */
export function precioDesdeCategoria(productos: Producto[], idCategoria: string): number | null {
  const precios = productos
    .filter((p) => p.categoria === idCategoria)
    .map(precioDesde)
    .filter((precio): precio is number => precio !== null)
  return precios.length > 0 ? Math.min(...precios) : null
}

/**
 * Para collares y correas: el precio más bajo de la versión básica y de la regulable.
 * Devuelve null si el producto no tiene versión regulable.
 */
export function preciosBasicoYRegulable(producto: Producto): { basico: number; regulable: number } | null {
  const conRegulable = producto.variantes.filter(
    (v): v is typeof v & { precio: number; precioRegulable: number } =>
      v.precio !== null && v.precioRegulable !== undefined,
  )
  if (conRegulable.length === 0) return null
  return {
    basico: Math.min(...conRegulable.map((v) => v.precio)),
    regulable: Math.min(...conRegulable.map((v) => v.precioRegulable)),
  }
}
