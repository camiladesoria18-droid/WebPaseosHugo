// =============================================================================
// Página de una categoría (ej.: /pretales)
// -----------------------------------------------------------------------------
// Lee de la dirección qué categoría pidió el cliente, busca sus productos en el
// catálogo y los muestra en tarjetas con nombre, descripción, opciones y precio.
// =============================================================================
import { Link, useParams } from '@tanstack/react-router'
import { useCatalogo } from './useCatalogo'
import { precioDesde, textoUnidad } from './precios'
import type { Producto } from './tipos'
import { formatearPrecio } from '../compartido/formato'
import { RutaNavegacion } from '../compartido/RutaNavegacion'
import './PaginaCategoria.css'

/** Arma el texto del precio de un producto, por ejemplo "Desde $ 9.500" o "$ 3.000 por letra". */
function textoPrecio(producto: Producto): string {
  const desde = precioDesde(producto)
  if (desde === null) return 'Consultar precio'
  const unidad = textoUnidad(producto.unidad)
  const variasOpciones = producto.variantes.length > 1
  return `${variasOpciones ? 'Desde ' : ''}${formatearPrecio(desde)}${unidad ? ' ' + unidad : ''}`
}

export function PaginaCategoria() {
  // 1) Leemos el parámetro de la dirección: en "/pretales", categoriaId = "pretales"
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

  // 3) Mostramos las tarjetas de productos
  return (
    <main className="contenedor categoria">
      {/* Inicio › Pretales */}
      <RutaNavegacion pasos={[{ texto: categoria.nombre }]} />
      <h1>{categoria.nombre}</h1>

      <ul className="productos">
        {productos.map((producto) => (
          <li key={producto.id} className="producto">
            <h2>{producto.nombre}</h2>
            {producto.colores === 'solo-negro' && <span className="etiqueta">Solo en negro</span>}
            <p>{producto.descripcion}</p>
            {producto.notas && <p className="producto-nota">{producto.notas}</p>}
            {producto.variantes.length > 1 && (
              <p className="producto-opciones">
                Opciones: {producto.variantes.map((v) => v.nombre).join(' · ')}
              </p>
            )}
            <p className="producto-precio">{textoPrecio(producto)}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
