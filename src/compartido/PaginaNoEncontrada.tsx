// =============================================================================
// Página para direcciones que no existen (el famoso "error 404")
// =============================================================================
import { Link } from '@tanstack/react-router'

export function PaginaNoEncontrada() {
  return (
    <main className="aviso">
      <h1>No encontramos esta página</h1>
      <p>
        <Link to="/">Volver al inicio</Link>
      </p>
    </main>
  )
}
