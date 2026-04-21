/**
 * supabase.js
 * Cliente de Supabase para toda la aplicación.
 * Si las variables de entorno no están configuradas aún,
 * el cliente se crea de todos modos pero las llamadas fallarán
 * con mensajes descriptivos en la consola (modo desarrollo).
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY

// Aviso en consola si no hay credenciales (modo desarrollo sin .env)
if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '[PEPPAC] Variables de entorno de Supabase no encontradas.\n' +
    'Copie .env.example como .env y complete las credenciales.\n' +
    'El registro de respuestas quedará solo en consola por ahora.'
  )
}

export const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : null
