// =============================================================================
// Configuración general de la web
// -----------------------------------------------------------------------------
// Lee los valores del archivo .env (en la raíz del proyecto).
// Vite pone esos valores en "import.meta.env" cuando arranca.
// =============================================================================

/**
 * Dirección base de donde se piden los datos.
 * Si en .env no hay nada, usamos "/" (la misma web).
 */
export const API_URL: string = import.meta.env.VITE_API_URL || '/'
