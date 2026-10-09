// =============================================================================
// main.tsx: el "interruptor general"
// -----------------------------------------------------------------------------
// Es lo primero que se ejecuta. Enciende React dentro del <div id="root">
// de index.html, y envuelve toda la web con el QueryClientProvider:
// la "central" donde el mozo con memoria (TanStack Query) guarda lo que trae.
// =============================================================================
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
