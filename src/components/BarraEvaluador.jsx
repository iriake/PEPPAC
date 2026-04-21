/**
 * BarraEvaluador.jsx
 * Barra inferior discreta (60px) visible solo para el evaluador.
 * Muestra: ítem actual, enunciado, respuesta correcta y lado correcto.
 * El niño NO debe poder leer esta información durante la evaluación.
 */

/**
 * @param {object} props
 * @param {number}  props.itemNumero  - Número del ítem (0 = práctica)
 * @param {number}  props.total       - Total de ítems del juego
 * @param {string}  props.enunciado   - Texto que se reproduce al niño
 * @param {string}  props.correcto    - Respuesta correcta (texto para el evaluador)
 * @param {string}  [props.subtipo]   - Sub-letra del ítem (a/b/c/d) — solo Juego 2
 * @param {string}  [props.condicion] - Condición del ítem (solo Juego 2)
 * @param {boolean} [props.debug]     - TODO: eliminar en producción; mostrar subtipo
 */
function BarraEvaluador({ itemNumero, total, enunciado, correcto, subtipo, condicion }) {
  // Etiqueta del ítem: "Práctica", "Ítem 1a / 9", "Ítem 2 / 5", etc.
  // subtipo (a/b/c/d) visible solo mientras debuguea — eliminar en producción
  const etiquetaItem = itemNumero === 0
    ? 'Práctica'
    : `Ítem ${itemNumero}${subtipo ? subtipo : ''} / ${total}`

  return (
    <div className="barra-evaluador">
      {/* Etiqueta del ítem */}
      <span className="text-xs font-semibold text-gray-400 whitespace-nowrap shrink-0">
        {etiquetaItem}
      </span>

      {/* Separador */}
      <span className="text-gray-300">|</span>

      {/* Enunciado */}
      <span className="text-xs text-gray-500 truncate flex-1">
        &ldquo;{enunciado}&rdquo;
      </span>

      {/* Separador */}
      <span className="text-gray-300">|</span>

      {/* Respuesta correcta */}
      <span className="text-xs font-medium text-green-600 whitespace-nowrap shrink-0">
        ✓ {correcto}
      </span>

      {/* Condición (solo Juego 2) */}
      {condicion && (
        <>
          <span className="text-gray-300">|</span>
          <span className="text-xs text-blue-500 whitespace-nowrap shrink-0">
            {condicion}
          </span>
        </>
      )}
    </div>
  )
}

export default BarraEvaluador
