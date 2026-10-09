// =============================================================================
// Cliente HTTP (el "mozo" que va a buscar los datos)
// -----------------------------------------------------------------------------
// Creamos UNA sola instancia de Axios con la dirección base ya cargada.
// Así, el resto del código pide "data/catalogo.json" sin repetir la dirección,
// y en la etapa 2 solo cambia el .env.
// =============================================================================
import axios from 'axios'
import { API_URL } from './configuracion'

export const clienteHttp = axios.create({
  baseURL: API_URL,
  timeout: 10000, // si en 10 segundos no responde, se da por fallido
})
