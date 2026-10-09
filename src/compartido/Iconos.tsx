// =============================================================================
// Íconos de la web (dibujos en SVG)
// -----------------------------------------------------------------------------
// SVG es una forma de dibujar con instrucciones ("una línea de acá a acá,
// un círculo de este tamaño"), en vez de una foto. Ventajas: se ven nítidos en
// cualquier tamaño y toman el color del texto que los rodea (currentColor).
// Todos tienen aria-hidden: son decoración, el lector de pantalla los saltea
// porque al lado siempre hay un texto que dice lo mismo.
// =============================================================================

interface PropsIcono {
  tamano?: number
}

/** Propiedades comunes a todos los íconos de línea. */
function base(tamano: number) {
  return {
    width: tamano,
    height: tamano,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
}

/** Huellita de perro (logo provisorio, hasta tener el logo real). */
export function IconoHuella({ tamano = 30 }: PropsIcono) {
  return (
    <svg {...base(tamano)}>
      <circle cx="5.5" cy="10" r="2" />
      <circle cx="9.5" cy="5.5" r="2" />
      <circle cx="14.5" cy="5.5" r="2" />
      <circle cx="18.5" cy="10" r="2" />
      <path d="M12 12c-3 0-6 3.5-6 6 0 1.6 1.3 2.5 3 2.5 1.2 0 2-.6 3-.6s1.8.6 3 .6c1.7 0 3-.9 3-2.5 0-2.5-3-6-6-6z" />
    </svg>
  )
}

/** Bolsa de compras (botón Carrito). */
export function IconoCarrito({ tamano = 20 }: PropsIcono) {
  return (
    <svg {...base(tamano)}>
      <path d="M6 7h12l-1 13H7L6 7z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  )
}

/** Globito de chat (WhatsApp). */
export function IconoWhatsApp({ tamano = 18 }: PropsIcono) {
  return (
    <svg {...base(tamano)}>
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.2L4 20z" />
      <path d="M9.5 9.5c.3 1.6 1.5 3 3 3.6l1-.9 1.6.8" />
    </svg>
  )
}

/** Camarita (Instagram). */
export function IconoInstagram({ tamano = 18 }: PropsIcono) {
  return (
    <svg {...base(tamano)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  )
}

/** Pin de ubicación (Paraná). */
export function IconoUbicacion({ tamano = 18 }: PropsIcono) {
  return (
    <svg {...base(tamano)}>
      <path d="M12 21s-6-5.6-6-10.5a6 6 0 0 1 12 0C18 15.4 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </svg>
  )
}

/** Casita (Inicio, en la ruta de navegación). */
export function IconoCasa({ tamano = 16 }: PropsIcono) {
  return (
    <svg {...base(tamano)} strokeWidth={2}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v10h14V10" />
    </svg>
  )
}

/** Flechita hacia la derecha (separador de la ruta de navegación). */
export function IconoFlechita({ tamano = 14 }: PropsIcono) {
  return (
    <svg {...base(tamano)} strokeWidth={2.4}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}
