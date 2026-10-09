// =============================================================================
// Ruta de navegación (también llamada "miga de pan")
// -----------------------------------------------------------------------------
// La pastilla que dice dónde estás: 🏠 Inicio › Pretales › Pretal Laila
// Como las miguitas de Hansel y Gretel: muestra el camino para volver.
// - "Inicio" siempre está y lleva a la página principal.
// - Los pasos del medio pueden ser una categoría (con link).
// - El último paso es la página actual (sin link).
// =============================================================================
import { Fragment } from 'react'
import { Link } from '@tanstack/react-router'
import { IconoCasa, IconoFlechita } from './Iconos'
import './RutaNavegacion.css'

export interface PasoRuta {
  texto: string
  /** Si se indica, el paso es un link a esa categoría (ej.: "pretales"). */
  categoriaId?: string
}

export function RutaNavegacion({ pasos }: { pasos: PasoRuta[] }) {
  return (
    <nav aria-label="Ubicación" className="ruta">
      <Link to="/" className="ruta-link">
        <IconoCasa />
        Inicio
      </Link>

      {pasos.map((paso, i) => {
        const esElUltimo = i === pasos.length - 1
        return (
          <Fragment key={paso.texto}>
            <span className="ruta-flecha">
              <IconoFlechita />
            </span>
            {esElUltimo || !paso.categoriaId ? (
              // Página actual: solo texto, en negrita
              <span aria-current={esElUltimo ? 'page' : undefined} className="ruta-actual">
                {paso.texto}
              </span>
            ) : (
              <Link to="/$categoriaId" params={{ categoriaId: paso.categoriaId }} className="ruta-link">
                {paso.texto}
              </Link>
            )}
          </Fragment>
        )
      })}
    </nav>
  )
}
