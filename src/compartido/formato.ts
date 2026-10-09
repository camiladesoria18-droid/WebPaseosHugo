// =============================================================================
// Formatos para mostrar datos
// =============================================================================

const formatoPesos = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

/** 12000 → "$ 12.000". Si el precio es null → "Consultar". */
export function formatearPrecio(precio: number | null): string {
  return precio === null ? 'Consultar' : formatoPesos.format(precio)
}
