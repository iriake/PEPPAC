/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colores personalizados para PEPPAC
      colors: {
        peppac: {
          azul:      '#3B82F6',
          verde:     '#22C55E',
          rojo:      '#EF4444',
          amarillo:  '#FBBF24',
          gris:      '#6B7280',
          fondo:     '#FFFFFF',
        },
        // Colores de las zonas del Juego 2
        canasta: {
          bg:     '#DCFCE7',  // verde suave
          hover:  '#BBF7D0',
          borde:  '#16A34A',
        },
        basurero: {
          bg:     '#FEE2E2',  // rojo suave
          hover:  '#FECACA',
          borde:  '#DC2626',
        },
        // Colores de placeholders de imágenes
        placeholder: {
          alimento:    '#D1FAE5',  // verde claro
          juguete:     '#DBEAFE',  // azul claro
          ropa_objeto: '#FED7AA',  // naranja claro
        },
      },
      // Fuente principal
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Animaciones personalizadas
      keyframes: {
        slideToBasket: {
          '0%':   { transform: 'translateX(0) translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateX(-40vw) translateY(10vh) scale(0.4)', opacity: '0' },
        },
        fallToBin: {
          '0%':   { transform: 'translateX(0) translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateX(40vw) translateY(20vh) scale(0.3) rotate(30deg)', opacity: '0' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%':   { opacity: '1' },
          '100%': { opacity: '0' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.03)' },
        },
      },
      animation: {
        'slide-basket':  'slideToBasket 1.2s ease-in-out forwards',
        'fall-bin':      'fallToBin 1.2s ease-in-out forwards',
        'fade-in':       'fadeIn 0.25s ease-in-out',
        'fade-out':      'fadeOut 0.25s ease-in-out',
        'pulse-subtle':  'pulseSubtle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
