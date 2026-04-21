/**
 * ImagenProducto.jsx
 * Muestra la imagen de un producto con un placeholder SVG como fallback.
 * El placeholder usa color de fondo según la categoría del producto.
 *
 * Categorías y colores:
 *   alimento    → verde claro  (#D1FAE5)
 *   juguete     → azul claro   (#DBEAFE)
 *   ropa_objeto → naranja claro (#FED7AA)
 */

// Mapa de colores por categoría
const COLORES_CATEGORIA = {
  alimento:    { fondo: '#D1FAE5', texto: '#065F46' },
  juguete:     { fondo: '#DBEAFE', texto: '#1E40AF' },
  ropa_objeto: { fondo: '#FED7AA', texto: '#92400E' },
}

/**
 * Genera un data URI de SVG para usar como placeholder.
 * @param {string} nombre    - Nombre del producto
 * @param {string} categoria - Categoría del producto
 * @param {number} w         - Ancho en px
 * @param {number} h         - Alto en px
 */
function generarPlaceholderSVG(nombre, categoria, w = 300, h = 300) {
  const colores = COLORES_CATEGORIA[categoria] ?? { fondo: '#F3F4F6', texto: '#374151' }

  // Partir el nombre en dos líneas si es muy largo
  const palabras = nombre.split(' ')
  const mitad    = Math.ceil(palabras.length / 2)
  const linea1   = palabras.slice(0, mitad).join(' ')
  const linea2   = palabras.slice(mitad).join(' ')

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <rect width="${w}" height="${h}" fill="${colores.fondo}" rx="24"/>
      <text
        x="50%" y="${linea2 ? '44%' : '50%'}"
        text-anchor="middle" dominant-baseline="middle"
        font-family="Inter, system-ui, sans-serif"
        font-size="${w > 200 ? 26 : 20}"
        font-weight="600"
        fill="${colores.texto}"
      >${linea1}</text>
      ${linea2 ? `
      <text
        x="50%" y="58%"
        text-anchor="middle" dominant-baseline="middle"
        font-family="Inter, system-ui, sans-serif"
        font-size="${w > 200 ? 26 : 20}"
        font-weight="600"
        fill="${colores.texto}"
      >${linea2}</text>` : ''}
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

/**
 * @param {object} props
 * @param {string} props.src         - Ruta a la imagen real
 * @param {string} props.alt         - Texto alternativo
 * @param {string} props.categoria   - Categoría para el placeholder
 * @param {string} [props.className] - Clases CSS adicionales
 * @param {object} [props.style]     - Estilos inline adicionales
 * @param {function} [props.onClick] - Handler de clic/toque
 */
function ImagenProducto({ src, alt, categoria, className = '', style, onClick }) {
  const placeholderSrc = generarPlaceholderSVG(alt, categoria)

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      draggable={false}
      onClick={onClick}
      // Si la imagen real no carga, usar el placeholder SVG
      onError={(e) => {
        if (e.target.src !== placeholderSrc) {
          e.target.src = placeholderSrc
        }
      }}
    />
  )
}

export default ImagenProducto
