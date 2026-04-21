/**
 * calcularEdad.js
 * Calcula la edad exacta en años y meses a partir de la fecha de nacimiento.
 * Devuelve un objeto con { años, meses, texto } para mostrar en la app.
 */

/**
 * @param {string|Date} fechaNacimiento - Fecha de nacimiento
 * @returns {{ años: number, meses: number, texto: string }}
 */
export function calcularEdad(fechaNacimiento) {
  const nacimiento = new Date(fechaNacimiento)
  const hoy        = new Date()

  let años  = hoy.getFullYear() - nacimiento.getFullYear()
  let meses = hoy.getMonth()    - nacimiento.getMonth()

  // Ajustar si aún no ha pasado el mes de cumpleaños este año
  if (meses < 0) {
    años--
    meses += 12
  }

  // Ajustar si aún no ha pasado el día dentro del mes
  if (hoy.getDate() < nacimiento.getDate()) {
    meses--
    if (meses < 0) {
      años--
      meses += 12
    }
  }

  const texto = `${años} año${años !== 1 ? 's' : ''} y ${meses} mes${meses !== 1 ? 'es' : ''}`

  return { años, meses, texto }
}
