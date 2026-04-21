/**
 * EvaluacionJuego2.jsx
 * Página principal del Juego 2 — Lectura de intenciones.
 *
 * Flujo por ítem:
 *  1. Aparece el ítem (fade in) con imagen del producto al centro
 *  2. Se reproduce el audio automáticamente
 *  3. El niño toca la zona canasta 🛒 o basurero 🗑️
 *  4. Animación de 1.2 seg (ítem se "mueve" hacia la elección)
 *  5. Respuesta guardada en Supabase
 *  6. Avance automático al siguiente ítem
 *  7. Al terminar todos → calcular puntajes → navegar a /gracias
 *
 * Reemplazos: se aplican según itemsReemplazados del contexto global,
 * cargados en la pantalla de transición previa (GestionReemplazos).
 */
import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { secuenciaJuego2, mapaReemplazos } from '../data/itemsJuego2'
import { useEvaluacion } from '../context/EvaluacionContext'
import ItemJuego2 from '../components/ItemJuego2'

// ── Utilidades de puntuación ──────────────────────────────────────────────────

/**
 * Calcula el desglose de puntaje por condición y el total del Juego 2.
 * @param {Array} historial - Array de { condicion, esCorrecto, esPractica }
 * @returns {{ desglose: object, total: number }}
 */
function calcularPuntajeJuego2(historial) {
  const desglose = {
    adj_pos:     0,
    adj_pos_neg: 0,
    adj_neg:     0,
    adj_neg_neg: 0,
  }

  historial.forEach(({ condicion, esCorrecto, esPractica }) => {
    if (!esPractica && esCorrecto && condicion && condicion in desglose) {
      desglose[condicion]++
    }
  })

  const total = Object.values(desglose).reduce((a, b) => a + b, 0)
  return { desglose, total }
}

/**
 * Reproduce audio del ítem (MP3 con fallback a Web Speech API).
 * Idéntica lógica que en EvaluacionJuego1.
 */
function reproducirAudio(audioSrc, enunciado) {
  if (window.speechSynthesis) window.speechSynthesis.cancel()

  const audio = new Audio(audioSrc)

  audio.play().catch(() => {
    if (!window.speechSynthesis) return
    const utterance = new SpeechSynthesisUtterance(enunciado)
    const voces = window.speechSynthesis.getVoices()
    const voz =
      voces.find(v => v.lang === 'es-CL')  ||
      voces.find(v => v.lang === 'es-419') ||
      voces.find(v => v.lang.startsWith('es'))
    if (voz) utterance.voice = voz
    utterance.lang  = 'es-CL'
    utterance.rate  = 0.9
    utterance.pitch = 1.0
    window.speechSynthesis.speak(utterance)
  })

  return () => {
    audio.pause()
    audio.src = ''
    if (window.speechSynthesis) window.speechSynthesis.cancel()
  }
}

// ── Componente principal ──────────────────────────────────────────────────────

function EvaluacionJuego2() {
  const navigate = useNavigate()
  const {
    itemsReemplazados,
    guardarRespuesta,
    setPuntajeJuego2,
    puntajeJuego1,
    finalizarSesion,
  } = useEvaluacion()

  // ── Construir la secuencia aplicando reemplazos ───────────────────────────
  const secuencia = useMemo(() => {
    return secuenciaJuego2.map(item => {
      // Si este ítem está marcado para reemplazar y existe el sustituto
      if (itemsReemplazados.includes(item.id) && mapaReemplazos[item.id]) {
        return mapaReemplazos[item.id]
      }
      return item
    })
  }, [itemsReemplazados])

  // Juego 2 tiene 9 ítems principales × 4 condiciones = 36 sub-ítems.
  // El evaluador ve "Ítem X / 9", no "X / 36".
  const TOTAL_ITEMS = 9

  // ── Estado ────────────────────────────────────────────────────────────────
  const [indiceActual, setIndiceActual] = useState(0)
  const [fadeEstado, setFadeEstado]     = useState('visible')
  const [bloqueado, setBloqueado]       = useState(false)

  // Historial de respuestas para calcular puntaje al final
  const historialRef    = useRef([])
  const cancelarAudio   = useRef(null)

  const itemActual = secuencia[indiceActual]

  // ── Reproducir audio al cambiar de ítem ──────────────────────────────────
  useEffect(() => {
    setBloqueado(true)

    const timer = setTimeout(() => {
      cancelarAudio.current = reproducirAudio(
        itemActual.audioSrc,
        itemActual.enunciado
      )
      setTimeout(() => setBloqueado(false), 400)
    }, 200)

    return () => {
      clearTimeout(timer)
      if (cancelarAudio.current) cancelarAudio.current()
    }
  }, [indiceActual, itemActual.audioSrc, itemActual.enunciado])

  // ── Manejar respuesta del niño ────────────────────────────────────────────
  const manejarRespuesta = useCallback(async (zonaElegida) => {
    if (bloqueado) return
    setBloqueado(true)

    if (cancelarAudio.current) cancelarAudio.current()

    // Determinar si la respuesta es correcta
    const esCorrecto = zonaElegida === itemActual.respuestaEsperada
    const puntaje    = (!itemActual.esPractica && esCorrecto) ? 1 : 0

    // Guardar en historial local
    historialRef.current.push({
      condicion:  itemActual.condicion,
      esCorrecto,
      esPractica: itemActual.esPractica,
    })

    // Guardar en Supabase (o consola en modo desarrollo)
    await guardarRespuesta({
      juego:         2,
      itemNumero:    itemActual.itemNumero,
      esPractica:    itemActual.esPractica,
      condicion:     itemActual.condicion,
      producto:      itemActual.producto,
      enunciado:     itemActual.enunciado,
      respuestaNino: zonaElegida,
      esCorrecto,
      puntaje,
    })

    // ── Transición al siguiente ítem ─────────────────────────────────────
    // Pequeña pausa post-animación antes del fade
    setTimeout(() => {
      setFadeEstado('saliendo')

      setTimeout(async () => {
        const siguienteIndice = indiceActual + 1

        if (siguienteIndice >= secuencia.length) {
          // ── Juego 2 terminado → calcular puntajes finales ─────────────
          const { desglose, total } = calcularPuntajeJuego2(historialRef.current)

          setPuntajeJuego2(total)

          await finalizarSesion({
            juego1:              puntajeJuego1,
            juego2:              total,
            total:               puntajeJuego1 + total,
            desgloseCondiciones: desglose,
            itemsReemplazados,
          })

          navigate('/gracias')
        } else {
          setIndiceActual(siguienteIndice)
          setFadeEstado('entrando')
          setTimeout(() => setFadeEstado('visible'), 160)
        }
      }, 160) // duración del fade out
    }, 100)   // pequeña pausa post-animación
  }, [
    bloqueado, itemActual, indiceActual,
    secuencia, guardarRespuesta,
    setPuntajeJuego2, finalizarSesion,
    puntajeJuego1, itemsReemplazados, navigate,
  ])

  // ── Clases del fade ───────────────────────────────────────────────────────
  const claseFade =
    fadeEstado === 'saliendo' ? 'opacity-0 transition-opacity duration-[160ms]' :
    fadeEstado === 'entrando' ? 'opacity-0' :
    'opacity-100 transition-opacity duration-[160ms]'

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={claseFade}>
      <ItemJuego2
        item={itemActual}
        totalItems={TOTAL_ITEMS}
        onRespuesta={manejarRespuesta}
        bloqueado={bloqueado}
      />
    </div>
  )
}

export default EvaluacionJuego2
