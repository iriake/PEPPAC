/**
 * itemsJuego1.js
 * Datos completos de los ítems del Juego 1 — Acceso léxico.
 *
 * Estructura de cada ítem:
 *   id          : identificador único del ítem
 *   itemNumero  : número visible (0 = ejemplo de práctica)
 *   esPractica  : true si es el ítem de ejemplo (no puntúa)
 *   imagen1     : { src, alt, esCorrecta }
 *   imagen2     : { src, alt, esCorrecta }
 *   enunciado   : texto que se lee en voz alta
 *   audioSrc    : ruta al archivo de audio pregrabado
 *   correcta    : cuál imagen es la respuesta correcta ('imagen1' | 'imagen2')
 *   categoria   : para color del placeholder hasta tener imágenes reales
 *
 * Convención de rutas de imagen: /imagenes/juego1/<nombre>.png
 * Convención de rutas de audio:  /audios/juego1/<nombre>.mp3
 *
 * El orden de imagen1 / imagen2 determina el lado izquierdo / derecho
 * en la pantalla. Se mantiene fijo (sin aleatorización en esta versión).
 */

const itemsJuego1 = [
  {
    id: 'j1_ej',
    itemNumero: 0,
    esPractica: true,
    imagen1: {
      src: '/imagenes/juego1/sandia.png',
      alt: 'Sandía',
      esCorrecta: true,
      categoria: 'alimento',
    },
    imagen2: {
      src: '/imagenes/juego1/frutilla.png',
      alt: 'Frutilla',
      esCorrecta: false,
      categoria: 'alimento',
    },
    enunciado: 'Quiero una fruta grande',
    audioSrc: '/audios/juego1/ej.mp3',
    correcta: 'imagen1',
  },
  {
    id: 'j1_01',
    itemNumero: 1,
    esPractica: false,
    imagen1: {
      src: '/imagenes/juego1/tortuga.png',
      alt: 'Tortuga',
      esCorrecta: true,
      categoria: 'alimento', // placeholder verde ya que es animal, ajustar si se quiere
    },
    imagen2: {
      src: '/imagenes/juego1/conejo.png',
      alt: 'Conejo',
      esCorrecta: false,
      categoria: 'alimento',
    },
    enunciado: 'Quiero un animal lento',
    audioSrc: '/audios/juego1/item_01.mp3',
    correcta: 'imagen1',
  },
  {
    id: 'j1_02',
    itemNumero: 2,
    esPractica: false,
    imagen1: {
      src: '/imagenes/juego1/flor_marchita.png',
      alt: 'Flor marchita',
      esCorrecta: false,
      categoria: 'alimento',
    },
    imagen2: {
      src: '/imagenes/juego1/girasol.png',
      alt: 'Girasol',
      esCorrecta: true,
      categoria: 'alimento',
    },
    enunciado: 'Quiero una flor nueva',
    audioSrc: '/audios/juego1/item_02.mp3',
    correcta: 'imagen2',
  },
  {
    id: 'j1_03',
    itemNumero: 3,
    esPractica: false,
    imagen1: {
      src: '/imagenes/juego1/ensalada.png',
      alt: 'Ensalada',
      esCorrecta: false,
      categoria: 'alimento',
    },
    imagen2: {
      src: '/imagenes/juego1/papas_fritas.png',
      alt: 'Papas fritas',
      esCorrecta: true,
      categoria: 'alimento',
    },
    enunciado: 'Quiero una comida caliente',
    audioSrc: '/audios/juego1/item_03.mp3',
    correcta: 'imagen2',
  },
  {
    id: 'j1_04',
    itemNumero: 4,
    esPractica: false,
    imagen1: {
      src: '/imagenes/juego1/zapallo.png',
      alt: 'Zapallo',
      esCorrecta: false,
      categoria: 'alimento',
    },
    imagen2: {
      src: '/imagenes/juego1/zanahoria.png',
      alt: 'Zanahoria',
      esCorrecta: true,
      categoria: 'alimento',
    },
    enunciado: 'Quiero una verdura liviana',
    audioSrc: '/audios/juego1/item_04.mp3',
    correcta: 'imagen2',
  },
  {
    id: 'j1_05',
    itemNumero: 5,
    esPractica: false,
    imagen1: {
      src: '/imagenes/juego1/bombilla_larga.png',
      alt: 'Bombilla larga',
      esCorrecta: true,
      categoria: 'ropa_objeto',
    },
    imagen2: {
      src: '/imagenes/juego1/bombilla_corta.png',
      alt: 'Bombilla corta',
      esCorrecta: false,
      categoria: 'ropa_objeto',
    },
    enunciado: 'Quiero una bombilla larga',
    audioSrc: '/audios/juego1/item_05.mp3',
    correcta: 'imagen1',
  },
];

export default itemsJuego1;
