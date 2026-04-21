/**
 * ItemJuego2.jsx
 * Un ítem del Juego 2 — Lectura de intenciones.
 *
 * Layout (siempre visible):
 *   [  🛒  ZONA COMPRAR  |  IMAGEN PRODUCTO  |  ZONA NO COMPRAR  🗑️  ]
 *   [     fondo verde    |     centrado       |     fondo rojo         ]
 *   [        30%         |       40%          |        30%             ]
 *
 * El niño toca UNA ZONA (no arrastra): la imagen anima hacia ese lado.
 * Animación: 1.2 segundos → callback al padre → avance automático.
 */
import { useState, useEffect } from 'react'
import ImagenProducto from './ImagenProducto'
import BarraEvaluador from './BarraEvaluador'

/**
 * @param {object}   props
 * @param {object}   props.item        - Ítem actual de itemsJuego2.js
 * @param {number}   props.totalItems  - Total de ítems que puntúan (para la barra)
 * @param {function} props.onRespuesta - Callback(zona: 'canasta' | 'basurero')
 * @param {boolean}  props.bloqueado   - Deshabilitar interacción durante transición
 */
function ItemJuego2({ item, totalItems, onRespuesta, bloqueado }) {
  // null | 'canasta' | 'basurero'
  const [animacion, setAnimacion] = useState(null)

  // Reiniciar animación al cambiar de ítem
  useEffect(() => {
    setAnimacion(null)
  }, [item.id])

  const manejarToque = (zona) => {
    if (bloqueado || animacion) return
    setAnimacion(zona)
    // Esperar que termine la animación antes de llamar al padre
    setTimeout(() => onRespuesta(zona), 800)
  }

  // Estilo de animación CSS (los keyframes están definidos en tailwind.config.js)
  const estiloProducto = {}
  if (animacion === 'canasta') {
    estiloProducto.animation = 'slideToBasket 0.8s ease-in-out forwards'
  } else if (animacion === 'basurero') {
    estiloProducto.animation = 'fallToBin 0.8s ease-in-out forwards'
  }

  // Etiqueta para la barra del evaluador
  const labelCorrecto = item.respuestaEsperada === 'compra' ? '🛒 Comprar' : '🗑️ No comprar'

  return (
    <div className="relative h-screen bg-white">

      {/* ── ZONA IZQUIERDA: Canasta / Comprar ─────────────────────────────── */}
      <button
        onClick={() => manejarToque('canasta')}
        disabled={bloqueado || !!animacion}
        aria-label="Comprar"
        className="
          absolute left-0 top-0 w-[30%] bottom-[60px]
          flex flex-col items-center justify-center gap-4
          bg-green-50 hover:bg-green-100 active:bg-green-200
          border-r-2 border-green-200
          transition-colors duration-150
          disabled:pointer-events-none
          focus:outline-none
        "
      >
        {/* Ícono canasta */}
        <div className="flex flex-col items-center gap-2 select-none">
          <span
            className="leading-none"
            style={{ fontSize: 'clamp(4rem, 10vw, 7rem)' }}
          >
            🛒
          </span>
          <span className="text-green-700 font-bold text-base md:text-xl tracking-wide">
            Comprar
          </span>
        </div>
      </button>

      {/* ── ZONA DERECHA: Basurero / No comprar ───────────────────────────── */}
      <button
        onClick={() => manejarToque('basurero')}
        disabled={bloqueado || !!animacion}
        aria-label="No comprar"
        className="
          absolute right-0 top-0 w-[30%] bottom-[60px]
          flex flex-col items-center justify-center gap-4
          bg-red-50 hover:bg-red-100 active:bg-red-200
          border-l-2 border-red-200
          transition-colors duration-150
          disabled:pointer-events-none
          focus:outline-none
        "
      >
        <div className="flex flex-col items-center gap-2 select-none">
          <span
            className="leading-none"
            style={{ fontSize: 'clamp(4rem, 10vw, 7rem)' }}
          >
            🗑️
          </span>
          <span className="text-red-700 font-bold text-base md:text-xl tracking-wide">
            No comprar
          </span>
        </div>
      </button>

      {/* ── PRODUCTO AL CENTRO ─────────────────────────────────────────────── */}
      {/* z-10 para que anime POR ENCIMA de las zonas */}
      <div
        className="
          absolute inset-0 bottom-[60px]
          flex items-center justify-center
          pointer-events-none z-10
        "
      >
        <div style={estiloProducto}>
          <ImagenProducto
            src={item.imagen}
            alt={item.producto}
            categoria={item.categoria}
            className="
              rounded-3xl object-cover shadow-xl
              border-4 border-white
            "
            style={{ width: 'clamp(220px, 28vw, 340px)', height: 'clamp(220px, 28vw, 340px)' }}
          />
        </div>
      </div>

      {/* ── BARRA DEL EVALUADOR ────────────────────────────────────────────── */}
      <BarraEvaluador
        itemNumero={item.itemNumero}
        subtipo={item.subtipo}
        total={totalItems}
        enunciado={item.enunciado}
        correcto={labelCorrecto}
        condicion={item.condicionLabel}
      />
    </div>
  )
}

export default ItemJuego2
