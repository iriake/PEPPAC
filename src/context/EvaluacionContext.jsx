/**
 * EvaluacionContext.jsx
 * Contexto global de la sesión de evaluación activa.
 * Almacena los datos del participante, la sesión y funciones
 * para guardar respuestas en Supabase.
 */
import { createContext, useContext, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

// ── Crear contexto ────────────────────────────────────────────────────────────
const EvaluacionContext = createContext(null)

// ── Proveedor ─────────────────────────────────────────────────────────────────
export function EvaluacionProvider({ children }) {
  // Fonoaudiólogo autenticado
  const [usuario, setUsuario] = useState(null)

  // Datos del niño/a registrado
  const [participante, setParticipante] = useState(null)

  // UUID de la sesión activa en Supabase
  const [sesionId, setSesionId] = useState(null)

  // IDs de ítems reemplazados en el Juego 2
  const [itemsReemplazados, setItemsReemplazados] = useState([])

  // Puntajes acumulados
  const [puntajeJuego1, setPuntajeJuego1] = useState(0)
  const [puntajeJuego2, setPuntajeJuego2] = useState(0)

  /**
   * Inicia una nueva sesión de evaluación en Supabase.
   * @param {object} datosParticipante - Datos del formulario de registro
   * @returns {string|null} UUID de la sesión creada, o null si falla
   */
  const iniciarSesion = useCallback(async (datosParticipante) => {
    setParticipante(datosParticipante)
    setItemsReemplazados([])
    setPuntajeJuego1(0)
    setPuntajeJuego2(0)

    if (!supabase) {
      // Sin Supabase: generar un ID temporal para desarrollo
      const idTemporal = `dev-${Date.now()}`
      setSesionId(idTemporal)
      console.log('[PEPPAC] Sesión iniciada (modo desarrollo):', idTemporal)
      return idTemporal
    }

    try {
      // 1. Insertar participante
      const { data: part, error: errPart } = await supabase
        .from('participantes')
        .insert({
          nombre_real:          datosParticipante.nombreReal,
          fecha_nacimiento:     datosParticipante.fechaNacimiento,
          establecimiento:      datosParticipante.establecimiento,
          sexo:                 datosParticipante.sexo,
          condicion_desarrollo: datosParticipante.condicionDesarrollo,
          fonoaudiologo_id:     usuario?.id,
        })
        .select()
        .single()

      if (errPart) throw errPart

      // 2. Crear sesión vinculada al participante
      const { data: sesion, error: errSesion } = await supabase
        .from('sesiones')
        .insert({
          participante_id:  part.id,
          fonoaudiologo_id: usuario?.id,
          completada:       false,
        })
        .select()
        .single()

      if (errSesion) throw errSesion

      setSesionId(sesion.id)
      console.log('[PEPPAC] Sesión creada:', sesion.id)
      return sesion.id

    } catch (error) {
      console.error('[PEPPAC] Error al iniciar sesión:', error)
      return null
    }
  }, [usuario])

  /**
   * Guarda una respuesta individual en la tabla `respuestas` de Supabase.
   * @param {object} respuesta - Datos de la respuesta del niño
   */
  const guardarRespuesta = useCallback(async (respuesta) => {
    // En desarrollo sin Supabase, solo registrar en consola
    if (!supabase || !sesionId || sesionId.startsWith('dev-')) {
      console.log('[PEPPAC] Respuesta (modo desarrollo):', respuesta)
      return
    }

    try {
      const { error } = await supabase
        .from('respuestas')
        .insert({
          sesion_id:           sesionId,
          juego:               respuesta.juego,
          item_numero:         respuesta.itemNumero,
          es_practica:         respuesta.esPractica,
          condicion:           respuesta.condicion ?? null,
          producto:            respuesta.producto ?? null,
          enunciado:           respuesta.enunciado,
          respuesta_nino:      respuesta.respuestaNino,
          es_correcto:         respuesta.esCorrecto,
          puntaje:             respuesta.puntaje,
          timestamp_respuesta: new Date().toISOString(),
        })

      if (error) throw error
    } catch (error) {
      console.error('[PEPPAC] Error al guardar respuesta:', error)
    }
  }, [sesionId])

  /**
   * Finaliza la sesión actualizando puntajes en Supabase.
   * @param {object} puntajes - { juego1, juego2, total, desgloseCondiciones, itemsReemplazados }
   */
  const finalizarSesion = useCallback(async (puntajes) => {
    if (!supabase || !sesionId || sesionId.startsWith('dev-')) {
      console.log('[PEPPAC] Sesión finalizada (modo desarrollo):', puntajes)
      return
    }

    try {
      const { error } = await supabase
        .from('sesiones')
        .update({
          puntaje_juego1:       puntajes.juego1,
          puntaje_juego2:       puntajes.juego2,
          puntaje_total:        puntajes.total,
          desglose_condiciones: puntajes.desgloseCondiciones,
          items_reemplazados:   puntajes.itemsReemplazados,
          completada:           true,
        })
        .eq('id', sesionId)

      if (error) throw error
    } catch (error) {
      console.error('[PEPPAC] Error al finalizar sesión:', error)
    }
  }, [sesionId])

  const valor = {
    usuario, setUsuario,
    participante, setParticipante,
    sesionId, setSesionId,
    itemsReemplazados, setItemsReemplazados,
    puntajeJuego1, setPuntajeJuego1,
    puntajeJuego2, setPuntajeJuego2,
    iniciarSesion,
    guardarRespuesta,
    finalizarSesion,
  }

  return (
    <EvaluacionContext.Provider value={valor}>
      {children}
    </EvaluacionContext.Provider>
  )
}

// ── Hook de acceso ────────────────────────────────────────────────────────────
export function useEvaluacion() {
  const ctx = useContext(EvaluacionContext)
  if (!ctx) {
    throw new Error('useEvaluacion debe usarse dentro de <EvaluacionProvider>')
  }
  return ctx
}
