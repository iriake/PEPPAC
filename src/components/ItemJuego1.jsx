/**
 * ItemJuego1.jsx
 * Muestra un ítem del Juego 1: dos imágenes grandes lado a lado.
 * El niño toca una imagen → callback inmediato, sin feedback.
 * La BarraEvaluador con info del ítem es visible solo para el evaluador.
 */
import ImagenProducto from './ImagenProducto'
import BarraEvaluador from './BarraEvaluador'

/**
 * @param {object}   props
 * @param {object}   props.item        - Ítem actual de itemsJuego1.js
 * @param {number}   props.totalItems  - Total de ítems (para la barra)
 * @param {function} props.onRespuesta - Callback(ladoElegido: 'imagen1'|'imagen2')
 * @param {boolean}  props.bloqueado   - Bloquear interacción durante transición
 */
function ItemJuego1({ item, totalItems, onRespuesta, bloqueado }) {
  // Etiqueta de respuesta correcta para la barra del evaluador
  const labelCorrecto = item.correcto === 'imagen1'
    ? item.imagen1.alt
    : item.imagen2.alt

  const manejarToque = (lado) => {
    if (bloqueado) return
    onRespuesta(lado)
  }

  return (
    // Contenedor principal: pantalla completa blanca
    <div className="flex flex-col h-screen bg-white">

      {/* ── Zona de imágenes ────────────────────────────────────────────── */}
      <div className="flex flex-1 items-center justify-center gap-6 px-6 pb-[60px]">

        {/* Imagen izquierda */}
        <button
          className="
            flex-1 max-w-[42%] aspect-square
            rounded-3xl overflow-hidden
            cursor-pointer select-none
            transition-transform duration-100
            active:scale-95
            focus:outline-none
            border-4 border-transparent
          "
          onClick={() => manejarToque('imagen1')}
          aria-label={item.imagen1.alt}
          disabled={bloqueado}
        >
          <ImagenProducto
            src={item.imagen1.src}
            alt={item.imagen1.alt}
            categoria={item.imagen1.categoria}
            className="w-full h-full object-cover"
          />
        </button>

        {/* Imagen derecha */}
        <button
          className="
            flex-1 max-w-[42%] aspect-square
            rounded-3xl overflow-hidden
            cursor-pointer select-none
            transition-transform duration-100
            active:scale-95
            focus:outline-none
            border-4 border-transparent
          "
          onClick={() => manejarToque('imagen2')}
          aria-label={item.imagen2.alt}
          disabled={bloqueado}
        >
          <ImagenProducto
            src={item.imagen2.src}
            alt={item.imagen2.alt}
            categoria={item.imagen2.categoria}
            className="w-full h-full object-cover"
          />
        </button>
      </div>

      {/* ── Barra del evaluador ──────────────────────────────────────────── */}
      <BarraEvaluador
        itemNumero={item.itemNumero}
        total={totalItems}
        enunciado={item.enunciado}
        correcto={labelCorrecto}
      />
    </div>
  )
}

export default ItemJuego1
