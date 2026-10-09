// =============================================================================
// Página de inicio PROVISORIA
// -----------------------------------------------------------------------------
// Sirve para comprobar que la web lee bien el catálogo.
// Se reemplaza más adelante por la página de inicio con diseño, logo y fotos.
// =============================================================================
import { useCatalogo } from '../catalogo/useCatalogo'
import type { Catalogo } from '../catalogo/tipos'
import { formatearPrecio } from '../compartido/formato'
import './InicioProvisorio.css'

/** Para una categoría, calcula cuántos productos tiene y el precio más bajo. */
function resumirCategoria(catalogo: Catalogo, idCategoria: string) {
  const productos = catalogo.productos.filter((p) => p.categoria === idCategoria)
  const precios = productos
    .flatMap((p) => p.variantes.map((v) => v.precio))
    .filter((precio): precio is number => precio !== null)
  const desde = precios.length > 0 ? Math.min(...precios) : null
  return { cantidad: productos.length, desde }
}

export function InicioProvisorio() {
  const { data: catalogo, isPending, isError } = useCatalogo()

  // 1) Mientras el mozo va a buscar el catálogo
  if (isPending) {
    return <p className="aviso">Cargando catálogo…</p>
  }

  // 2) Si algo salió mal (por ejemplo, no encontró el archivo)
  if (isError) {
    return <p className="aviso aviso-error">No se pudo cargar el catálogo. Probá recargar la página.</p>
  }

  // 3) Ya tenemos el catálogo: lo mostramos
  return (
    <main className="inicio">
      <header className="encabezado">
        <h1>{catalogo.negocio.nombre}</h1>
        <p className="lema">{catalogo.negocio.lema}</p>
      </header>

      <section>
        <h2>Categorías</h2>
        <ul className="categorias">
          {catalogo.categorias.map((categoria) => {
            const { cantidad, desde } = resumirCategoria(catalogo, categoria.id)
            return (
              <li key={categoria.id} className="tarjeta">
                <h3>{categoria.nombre}</h3>
                <p>
                  {cantidad} {cantidad === 1 ? 'producto' : 'productos'}
                </p>
                <p className="desde">Desde {formatearPrecio(desde)}</p>
              </li>
            )
          })}
        </ul>
      </section>

      <footer className="pie">
        <p>Precios actualizados: {catalogo.actualizado}</p>
        <p>Página provisoria · {catalogo.productos.length} productos cargados</p>
      </footer>
    </main>
  )
}
