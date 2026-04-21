/**
 * PantallaGracias.jsx
 * Pantalla final visible para el niño tras completar el Juego 2.
 *
 * Diseño: alegre, fondo amarillo cálido, estrella grande, texto "¡Gracias!".
 * Sin puntajes ni resultados visibles.
 * Botón muy discreto en esquina inferior derecha para el evaluador.
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEvaluacion } from '../context/EvaluacionContext'

// ── Componente de teclado PIN ─────────────────────────────────────────────────

function TecladoPIN({ onConfirmar, onCancelar }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  const agregarDigito = (d) => {
    if (pin.length >= 4) return
    setPin(prev => prev + d)
    setError(false)
  }

  const borrar = () => setPin(prev => prev.slice(0, -1))

  const confirmar = () => {
    if (pin.length !== 4) return
    onConfirmar(pin)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-xs shadow-2xl">
        <h2 className="text-xl font-bold text-gray-700 text-center mb-6">
          Ingrese PIN de evaluador
        </h2>

        {/* Indicador de dígitos */}
        <div className="flex justify-center gap-4 mb-6">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className={`
                w-4 h-4 rounded-full border-2
                ${pin.length > i
                  ? 'bg-blue-500 border-blue-500'
                  : 'bg-white border-gray-300'}
              `}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            PIN incorrecto. Intente nuevamente.
          </p>
        )}

        {/* Teclado numérico */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[1,2,3,4,5,6,7,8,9].map(d => (
            <button
              key={d}
              onClick={() => agregarDigito(String(d))}
              className="h-14 rounded-2xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300
                         text-2xl font-semibold text-gray-700 transition-colors"
            >
              {d}
            </button>
          ))}
          {/* Fila inferior: cancelar, 0, confirmar */}
          <button
            onClick={onCancelar}
            className="h-14 rounded-2xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300
                       text-sm font-medium text-gray-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => agregarDigito('0')}
            className="h-14 rounded-2xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300
                       text-2xl font-semibold text-gray-700 transition-colors"
          >
            0
          </button>
          <button
            onClick={borrar}
            className="h-14 rounded-2xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300
                       text-xl text-gray-500 transition-colors"
          >
            ⌫
          </button>
        </div>

        <button
          onClick={confirmar}
          disabled={pin.length !== 4}
          className="w-full h-12 rounded-2xl bg-blue-500 hover:bg-blue-600
                     disabled:bg-gray-200 disabled:text-gray-400
                     text-white font-bold text-lg transition-colors"
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────────────────────

function PantallaGracias() {
  const navigate = useNavigate()
  const { sesionId } = useEvaluacion()
  const [mostrarPIN, setMostrarPIN] = useState(false)

  // PIN hardcodeado temporalmente: "1234"
  // En producción se verifica contra Supabase (ver plan implementacion)
  const PIN_TEMPORAL = '1234'

  const verificarPIN = (pinIngresado) => {
    if (pinIngresado === PIN_TEMPORAL) {
      setMostrarPIN(false)
      navigate(`/resultados/${sesionId ?? 'dev'}`)
    } else {
      // El TecladoPIN maneja el error internamente si se le pasa un setter
      // Por ahora solo recargamos el modal
      setMostrarPIN(false)
      setTimeout(() => setMostrarPIN(true), 100)
    }
  }

  return (
    <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
         style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #FCD34D 100%)' }}>

      {/* ── Contenido principal para el niño ─────────────────────────────── */}
      <div className="flex flex-col items-center gap-6 select-none animate-fade-in">
        {/* Estrella grande */}
        <div
          className="animate-pulse-subtle"
          style={{ fontSize: 'clamp(6rem, 20vw, 12rem)', lineHeight: 1 }}
        >
          ⭐
        </div>

        {/* Texto principal */}
        <h1
          className="font-extrabold text-amber-800 text-center leading-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 7rem)' }}
        >
          ¡Gracias!
        </h1>

        {/* Subtexto cálido */}
        <p
          className="text-amber-700 font-semibold text-center"
          style={{ fontSize: 'clamp(1rem, 4vw, 2rem)' }}
        >
          ¡Lo hiciste muy bien! 🎉
        </p>
      </div>

      {/* ── Botón discreto para el evaluador (esquina inferior derecha) ───── */}
      <button
        onClick={() => setMostrarPIN(true)}
        className="
          absolute bottom-4 right-4
          text-amber-400 hover:text-amber-600
          text-xs font-medium
          transition-colors duration-200
          opacity-40 hover:opacity-100
          underline underline-offset-2
        "
      >
        Evaluador: desbloquear resultados
      </button>

      {/* ── Modal de PIN ──────────────────────────────────────────────────── */}
      {mostrarPIN && (
        <TecladoPIN
          onConfirmar={verificarPIN}
          onCancelar={() => setMostrarPIN(false)}
        />
      )}
    </div>
  )
}

export default PantallaGracias
