/**
 * EvaluacionJuego1.jsx
 * Página principal del Juego 1 — Acceso léxico.
 *
 * Flujo por ítem:
 *  1. Aparece el ítem (fade in)
 *  2. Se reproduce el audio automáticamente
 *  3. El niño toca una imagen
 *  4. Se guarda la respuesta en Supabase (o consola en modo desarrollo)
 *  5. Transición neutra (fade out 250ms → fade in siguiente)
 *  6. Al terminar todos los ítems → navegar a /transicion
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import itemsJuego1 from '../data/itemsJuego1'
import { useEvaluacion } from '../context/EvaluacionContext'
import ItemJuego1 from '../components/ItemJuego1'

// Ítems sin el ejemplo de práctica para contar el total punteado
const ITEMS_PUNTEADOS = itemsJuego1.filter(i => !i.esPractica)

/**
 * Reproduce el audio del ítem actual.
 * Primero intenta el archivo MP3; si falla, usa Web Speech API como fallback.
 * @param {string} audioSrc   - Ruta al MP3
 * @param {string} enunciado  - Texto de respaldo (TTS)
 * @returns {function} Función para cancelar la reproducción
 */
function reproducirAudio(audioSrc, enunciado) {
  // Cancelar cualquier TTS previo
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }

  const audio = new Audio(audioSrc)

  audio.play().catch(() => {
    // El MP3 no está disponible aún → usar Web Speech API
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(enunciado)
      // Preferir voz en español chileno, con fallback a español genérico
      const voces = window.speechSynthesis.getVoices()
      const vozEspanol =
        voces.find(v => v.lang === 'es-CL') ||
        voces.find(v => v.lang === 'es-419') ||
        voces.find(v => v.lang.startsWith('es'))
      if (vozEspanol) utterance.voice = vozEspanol
      utterance.lang  = 'es-CL'
      utterance.rate  = 0.9
      utterance.pitch = 1.0
      window.speechSynthesis.speak(utterance)
    }
  })

  // Retornar función de cancelación para limpiezas
  return () => {
    audio.pause()
    audio.src = ''
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }
}

// ── Componente principal ──────────────────────────────────────────────────────

function EvaluacionJuego1() {
  const navigate            = useNavigate()
  const { guardarRespuesta, setPuntajeJuego1 } = useEvaluacion()

  // Índice del ítem actual dentro del array completo (incluye práctica)
  const [indiceActual, setIndiceActual]   = useState(0)

  // Estado del fade: 'visible' | 'saliendo' | 'entrando'
  const [fadeEstado, setFadeEstado]       = useState('visible')

  // Bloquear interacción durante transición o reproducción inicial
  const [bloqueado, setBloqueado]         = useState(false)

  // Puntaje acumulado del Juego 1
  const puntajeRef = useRef(0)

  // Referencia a la función de cancelación del audio actual
  const cancelarAudioRef = useRef(null)

  const itemActual = itemsJuego1[indiceActual]

  // ── Reproducir audio al cambiar de ítem ──────────────────────────────────
  useEffect(() => {
    // Bloquear hasta que el audio haya iniciado (evita toques prematuros)
    setBloqueado(true)

    // Pequeña demora para dejar que el fade-in termine antes de hablar
    const timerAudio = setTimeout(() => {
      cancelarAudioRef.current = reproducirAudio(
        itemActual.audioSrc,
        itemActual.enunciado
      )
      // Desbloquear después de un tiempo razonable para escuchar
      // (no esperamos que el audio termine para permitir respuesta)
      setTimeout(() => setBloqueado(false), 400)
    }, 200)

    // Limpiar al desmontar o cambiar ítem
    return () => {
      clearTimeout(timerAudio)
      if (cancelarAudioRef.current) {
        cancelarAudioRef.current()
      }
    }
  }, [indiceActual, itemActual.audioSrc, itemActual.enunciado])

  // ── Manejar respuesta del niño ────────────────────────────────────────────
  const manejarRespuesta = useCallback(async (ladoElegido) => {
    if (bloqueado) return
    setBloqueado(true)

    // Cancelar audio en curso
    if (cancelarAudioRef.current) {
      cancelarAudioRef.current()
    }

    // Determinar si la respuesta es correcta
    const esCorrecto = ladoElegido === itemActual.correcto
    const puntaje    = (!itemActual.esPractica && esCorrecto) ? 1 : 0

    // Acumular puntaje
    puntajeRef.current += puntaje

    // Guardar respuesta en Supabase (o consola en modo desarrollo)
    await guardarRespuesta({
      juego:        1,
      itemNumero:   itemActual.itemNumero,
      esPractica:   itemActual.esPractica,
      enunciado:    itemActual.enunciado,
      respuestaNino: ladoElegido === 'imagen1'
        ? itemActual.imagen1.alt
        : itemActual.imagen2.alt,
      esCorrecto,
      puntaje,
    })

    // ── Transición: fade out → cambiar ítem → fade in ──────────────────────
    setFadeEstado('saliendo')

    setTimeout(() => {
      const siguienteIndice = indiceActual + 1

      if (siguienteIndice >= itemsJuego1.length) {
        // Juego 1 terminado
        setPuntajeJuego1(puntajeRef.current)
        navigate('/transicion')
      } else {
        setIndiceActual(siguienteIndice)
        setFadeEstado('entrando')

        // Volver a 'visible' tras el fade in
        setTimeout(() => setFadeEstado('visible'), 160)
      }
    }, 160) // duración del fade out
  }, [bloqueado, itemActual, indiceActual, guardarRespuesta, navigate, setPuntajeJuego1])

  // ── Clases CSS del fade ───────────────────────────────────────────────────
  const claseFade =
    fadeEstado === 'saliendo' ? 'opacity-0 transition-opacity duration-[160ms]' :
    fadeEstado === 'entrando' ? 'opacity-0' :
    'opacity-100 transition-opacity duration-[160ms]'

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={claseFade}>
      <ItemJuego1
        item={itemActual}
        totalItems={ITEMS_PUNTEADOS.length}
        onRespuesta={manejarRespuesta}
        bloqueado={bloqueado}
      />
    </div>
  )
}

export default EvaluacionJuego1
