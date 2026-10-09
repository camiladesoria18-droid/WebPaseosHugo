// =============================================================================
// Página de una categoría (ej.: /pretales) — diseño aprobado
// -----------------------------------------------------------------------------
// 1) Lee de la dirección qué categoría pidió el cliente ("pretales").
// 2) Busca en el catálogo esa categoría y sus productos.
// 3) Muestra: ruta (Inicio › Pretales), título e introducción, botones para
//    saltar a otra categoría, tarjetas de productos y, en Pretales y Kits,
//    el recuadro "¿No sabés el talle? Medí a tu perro".
// =============================================================================
import { Link, useParams } from '@tanstack/react-router'
import { useCatalogo } from './useCatalogo'
import { precioDesde, preciosBasicoYRegulable, textoUnidad } from './precios'
import type { Producto } from './tipos'
import { formatearPrecio } from '../compartido/formato'
import { RutaNavegacion } from '../compartido/RutaNavegacion'
import { LugarFoto } from '../compartido/LugarFoto'
import './PaginaCategoria.css'

// Categorías donde importa el talle: muestran el recuadro "Medí a tu perro"
const CATEGORIAS_CON_TALLES = ['pretales', 'kits']

/** Texto del precio: "Desde $ 9.500", "$ 3.000 por letra" o "Consultar precio". */
function textoPrecio(producto: Producto): string {
  const desde = precioDesde(producto)
  if (desde === null) return 'Consultar precio'
  const unidad = textoUnidad(producto.unidad)
  const variasOpciones = producto.variantes.length > 1
  return `${variasOpciones ? 'Desde ' : ''}${formatearPrecio(desde)}${unidad ? ' ' + unidad : ''}`
}

/**
 * Qué opciones tiene el producto, en una línea:
 * - Si todas las variantes tienen ancho → "Anchos: 1,5 · 2 · 2,5 cm"
 * - Si tiene varias variantes → "Talles: S · M · L"
 * - Si tiene formas (formas 3D) → "Formas: sol, estrella, ..."
 * - Si se hace a medida → "A medida"
 */
function textoOpciones(producto: Producto): string | null {
  const { variantes } = producto
  if (variantes.length > 1 && variantes.every((v) => v.anchoCm !== undefined)) {
    const anchos = variantes.map((v) => String(v.anchoCm).replace('.', ',')) // 1.5 → "1,5"
    return `Anchos: ${anchos.join(' · ')} cm`
  }
  if (variantes.length > 1) return `Talles: ${variantes.map((v) => v.nombre).join(' · ')}`
  if (producto.formas) return `Formas: ${producto.formas.join(', ')}`
  if (variantes[0]?.nombre === 'A medida') return 'A medida'
  return null
}

export function PaginaCategoria() {
  // 1) El parámetro de la dirección: en "/pretales", categoriaId = "pretales"
  const { categoriaId } = useParams({ from: '/$categoriaId' })
  const { data: catalogo, isPending, isError } = useCatalogo()

  if (isPending) return <p className="aviso">Cargando catálogo…</p>
  if (isError) return <p className="aviso aviso-error">No se pudo cargar el catálogo. Probá recargar la página.</p>

  // 2) Buscamos la categoría y sus productos
  const categoria = catalogo.categorias.find((c) => c.id === categoriaId)
  if (!categoria) {
    return (
      <main className="aviso">
        <h1>No encontramos la categoría "{categoriaId}"</h1>
        <p>
          <Link to="/">Ver todas las categorías</Link>
        </p>
      </main>
    )
  }
  const productos = catalogo.productos.filter((p) => p.categoria === categoria.id)
  const conGuia = CATEGORIAS_CON_TALLES.includes(categoria.id)

  // 3) Dibujamos la página
  return (
    <main className="contenedor categoria">
      <RutaNavegacion pasos={[{ texto: categoria.nombre }]} />

      <h1>{categoria.nombre}</h1>
      {categoria.intro && <p className="categoria-intro">{categoria.intro}</p>}

      {/* Botones para saltar a otra categoría. La actual queda marcada en oscuro. */}
      <nav aria-label="Otras categorías" className="categoria-botones">
        {catalogo.categorias.map((c) => (
          <Link
            key={c.id}
            to="/$categoriaId"
            params={{ categoriaId: c.id }}
            className="chip"
            activeProps={{ className: 'chip-activo', 'aria-current': 'page' }}
          >
            {c.nombre}
          </Link>
        ))}
      </nav>

      <div className="categoria-cuerpo">
        <ul className="productos">
          {productos.map((producto) => {
            const opciones = textoOpciones(producto)
            const dosPrecios = preciosBasicoYRegulable(producto)
            // "Básica" para correas, "Básico" para collares
            const basico = producto.categoria === 'correas' ? 'Básica' : 'Básico'
            return (
              <li key={producto.id} className="producto">
                <LugarFoto texto={`Foto ${producto.nombre}`} alto={190} redondeo={0} />
                <div className="producto-cuerpo">
                  <div className="producto-titulo">
                    <h2>{producto.nombre}</h2>
                    {producto.colores === 'solo-negro' && <span className="etiqueta">Solo en negro</span>}
                  </div>
                  <p>{producto.descripcion}</p>
                  {dosPrecios && (
                    <p>
                      {basico} desde {formatearPrecio(dosPrecios.basico)} · Regulable desde{' '}
                      {formatearPrecio(dosPrecios.regulable)}
                    </p>
                  )}
                  {opciones && <p>{opciones}</p>}
                  {producto.notas && <p className="producto-nota">{producto.notas}</p>}
                  <p className="producto-precio">{textoPrecio(producto)}</p>
                </div>
              </li>
            )
          })}
        </ul>

        {conGuia && (
          <aside className="guia-talle">
            <span className="guia-talle-pregunta">¿No sabés el talle?</span>
            <h2>Medí a tu perro</h2>
            <ul>
              <li>Lomo (A)</li>
              <li>Largo de cuello (B)</li>
              <li>Contorno de pecho (C)</li>
              <li>Largo de pecho (D)</li>
            </ul>
            <p>Cada pretal tiene su tabla de medidas en la ficha. ¿Dudas? Escribinos por WhatsApp.</p>
          </aside>
        )}
      </div>
    </main>
  )
}
