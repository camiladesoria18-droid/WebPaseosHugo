// =============================================================================
// Tipos del catálogo de Paseos Hugo
// -----------------------------------------------------------------------------
// Este archivo es el "molde" (o formulario) que describe cómo tiene que ser
// cada dato de public/data/catalogo.json. No contiene datos: solo reglas.
// TypeScript usa estas reglas para avisarnos, mientras escribimos el código,
// si intentamos usar un dato de forma equivocada (por ejemplo, tratar un
// precio como si fuera un texto).
// =============================================================================

/** Un rango de medidas, de menor a mayor. Ejemplo: [10, 15] = de 10 a 15. */
export type Rango = [number, number]

/**
 * Qué paleta de colores admite un producto:
 * - "cinta": los 12 colores de cinta.
 * - "identificadores": los colores de identificadores, porta bolsas y formas.
 * - "solo-negro": solo se hace en negro (productos reforzados).
 * - null: no se elige color (o se coordina aparte, como el hilo del bordado).
 */
export type PaletaColores = 'cinta' | 'identificadores' | 'solo-negro' | null

/** Cómo se cobra un producto: por unidad, por cada letra o por hora. */
export type Unidad = 'unidad' | 'letra' | 'hora'

/** Medidas de referencia de un talle de pretal, en centímetros. */
export interface MedidasPretal {
  lomo?: Rango // el pretal Alma no tiene medida de lomo, por eso el "?" (opcional)
  largoCuello: Rango
  largoPecho: Rango
  contornoPecho: Rango
}

/**
 * Una variante es cada opción que se puede elegir de un producto
 * (un talle, un ancho, una "Opción 3"...), con su propio precio.
 */
export interface Variante {
  id: string
  nombre: string
  /** Precio en pesos. null = "a consultar" (no tiene precio fijo). */
  precio: number | null
  /** Precio de la versión regulable, si existe (collares y correas). */
  precioRegulable?: number
  medidasCm?: MedidasPretal
  anchoCm?: number
  largoCm?: Rango
}

/** Un producto del catálogo, con todas sus variantes. */
export interface Producto {
  id: string
  /** El id de la categoría a la que pertenece (ej.: "pretales"). */
  categoria: string
  nombre: string
  descripcion: string
  notas?: string
  unidad: Unidad
  colores: PaletaColores
  /** Rutas de las fotos, dentro de public/images (vacío hasta tener las fotos). */
  imagenes: string[]
  variantes: Variante[]
  /** Para los kits: los ids de los productos que incluye. */
  incluye?: string[]
  /** Para las formas 3D: las formas disponibles. */
  formas?: string[]
  /** Para correas: largo en metros. */
  largoM?: number
}

export interface Categoria {
  id: string
  nombre: string
  /** Línea corta que se muestra en la tarjeta del inicio (ej.: "Laila, Alma, Diabla, Tyson"). */
  detalle?: string
  /** Texto de presentación arriba de la página de la categoría. */
  intro?: string
}

export interface OpcionEntrega {
  id: string
  nombre: string
  precio: number
}

export interface DatosNegocio {
  nombre: string
  lema: string
  /** Número de WhatsApp en formato internacional, sin "+" ni espacios. */
  whatsapp: string
  instagram: string
  ciudad: string
}

/** El catálogo completo, tal como está en public/data/catalogo.json. */
export interface Catalogo {
  version: number
  /** Fecha de la última actualización de precios (año-mes-día). */
  actualizado: string
  moneda: string
  negocio: DatosNegocio
  entrega: OpcionEntrega[]
  aclaraciones: string[]
  colores: {
    cinta: string[]
    identificadores: string[]
  }
  anchosCintaMm: number[]
  categorias: Categoria[]
  productos: Producto[]
}
