// =============================================================================
// Marco de página: lo que se ve en TODAS las páginas
// -----------------------------------------------------------------------------
// Encabezado (nombre del negocio, que lleva al inicio) + el hueco donde va
// cada página (<Outlet />) + pie con WhatsApp e Instagram.
// =============================================================================
import { Link, Outlet } from '@tanstack/react-router'
import { useCatalogo } from '../catalogo/useCatalogo'
import './MarcoPagina.css'

export function MarcoPagina() {
  // El pie usa los datos del negocio que están en el catálogo
  const { data: catalogo } = useCatalogo()

  return (
    <div className="marco">
      <header className="marco-encabezado">
        <Link to="/" className="marco-marca">
          Paseos Hugo
        </Link>
      </header>

      {/* Acá se dibuja la página que corresponda a la dirección actual */}
      <div className="marco-contenido">
        <Outlet />
      </div>

      <footer className="marco-pie">
        {catalogo && (
          <>
            <a href={`https://wa.me/${catalogo.negocio.whatsapp}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href={`https://instagram.com/${catalogo.negocio.instagram}`} target="_blank" rel="noreferrer">
              Instagram @{catalogo.negocio.instagram}
            </a>
            <span>{catalogo.negocio.ciudad}</span>
          </>
        )}
      </footer>
    </div>
  )
}
