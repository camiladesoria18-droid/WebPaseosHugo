// =============================================================================
// Marco de página: lo que se ve en TODAS las páginas
// -----------------------------------------------------------------------------
// 1) Encabezado violeta: huellita + "Paseos Hugo" (lleva al inicio), menú de
//    categorías y botón Carrito.
// 2) El hueco donde va cada página (<Outlet />).
// 3) Pie violeta: nombre grande, lema y contacto (WhatsApp, Instagram, ciudad).
// Es como el marco de un cuadro: la foto del medio cambia, el marco queda.
// =============================================================================
import { Link, Outlet } from '@tanstack/react-router'
import { useCatalogo } from '../catalogo/useCatalogo'
import { IconoCarrito, IconoHuella, IconoInstagram, IconoUbicacion, IconoWhatsApp } from './Iconos'
import './MarcoPagina.css'

// Categorías que aparecen en el menú de arriba (el resto se ve en el inicio).
// Están escritas acá (y no leídas del catálogo) para que el menú aparezca al
// instante, sin esperar a que llegue el catálogo.
const MENU = [
  { id: 'pretales', nombre: 'Pretales' },
  { id: 'collares', nombre: 'Collares' },
  { id: 'correas', nombre: 'Correas' },
  { id: 'kits', nombre: 'Kits' },
  { id: 'identificadores', nombre: 'Identificadores' },
  { id: 'paseos', nombre: 'Paseos' },
]

export function MarcoPagina() {
  // El pie usa los datos del negocio que están en el catálogo (WhatsApp, Instagram, ciudad)
  const { data: catalogo } = useCatalogo()

  return (
    <div className="marco">
      {/* ---------- 1) ENCABEZADO ---------- */}
      <header className="encabezado">
        <div className="contenedor encabezado-fila">
          <Link to="/" className="encabezado-marca">
            <span className="encabezado-huella">
              <IconoHuella />
            </span>
            Paseos Hugo
          </Link>

          <nav aria-label="Categorías" className="encabezado-menu">
            {MENU.map((categoria) => (
              <Link
                key={categoria.id}
                to="/$categoriaId"
                params={{ categoriaId: categoria.id }}
                // Cuando estás en esa categoría, el link se marca (subrayado)
                activeProps={{ className: 'activo', 'aria-current': 'page' }}
              >
                {categoria.nombre}
              </Link>
            ))}
          </nav>

          {/* El carrito todavía no funciona: se programa en la parte 5 del Paso 3 */}
          <button type="button" className="encabezado-carrito" disabled title="Muy pronto">
            <IconoCarrito />
            Carrito
          </button>
        </div>
      </header>

      {/* ---------- 2) CONTENIDO: acá se dibuja la página de la dirección actual ---------- */}
      <div className="marco-contenido">
        <Outlet />
      </div>

      {/* ---------- 3) PIE ---------- */}
      <footer className="pie">
        <div className="contenedor pie-fila">
          <span className="pie-marca">Paseos Hugo</span>
          <span className="pie-lema">Todo hecho a medida · Herrajes soldados · Restauraciones</span>

          {/* El contacto aparece cuando llega el catálogo (ahí están los datos) */}
          {catalogo && (
            <div className="pie-contacto">
              <a href={`https://wa.me/${catalogo.negocio.whatsapp}`} target="_blank" rel="noreferrer">
                <IconoWhatsApp />
                WhatsApp {formatearTelefono(catalogo.negocio.whatsapp)}
              </a>
              <a href={`https://instagram.com/${catalogo.negocio.instagram}`} target="_blank" rel="noreferrer">
                <IconoInstagram />
                Instagram @{catalogo.negocio.instagram}
              </a>
              <span>
                <IconoUbicacion />
                {catalogo.negocio.ciudad}
              </span>
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}

/**
 * Convierte el número guardado para WhatsApp en uno fácil de leer.
 * "5493433002899" → "+54 343 300-2899"
 * (54 = Argentina, 9 = celular, 343 = Paraná, y el número)
 */
function formatearTelefono(numero: string): string {
  const coincide = numero.match(/^549(\d{3})(\d{3})(\d{4})$/)
  if (!coincide) return numero // si tiene otro formato, lo mostramos tal cual
  const [, area, parte1, parte2] = coincide
  return `+54 ${area} ${parte1}-${parte2}`
}
