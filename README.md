# PEPPAC — Aplicación Web de Evaluación Fonoaudiológica

Aplicación web para la administración digital del instrumento de evaluación fonoaudiológica **PEPPAC**, destinada a niños hispanohablantes de **3 a 5 años**.

---

## Descripción

PEPPAC es una interfaz de evaluación completamente autónoma para el niño, donde el evaluador (fonoaudiólogo) prepara la sesión y el niño interactúa directamente con la pantalla. Las respuestas se registran automáticamente en la base de datos y el acceso a los resultados está protegido por PIN.

---

## Stack Tecnológico

| Tecnología | Uso |
|---|---|
| **Vite + React** | Framework de la aplicación |
| **Tailwind CSS** | Estilos |
| **Supabase** | Base de datos, autenticación, RLS, Edge Functions |
| **Web Speech API** | Síntesis de voz TTS en español (`es-CL`) |

---

## Estructura de la Evaluación

### Juego 1 — Comprensión de imágenes
- El niño ve **dos imágenes** lado a lado y toca una.
- Sin feedback visual ni sonoro tras la respuesta.
- Avance automático con transición fade de 250ms.
- **5 ítems + 1 ejemplo de práctica.**

### Juego 2 — Comprensión de productos
- El niño ve una imagen de producto y decide si lo **compra** 🛒 o **descarta** 🗑️.
- Zona izquierda verde (comprar) / zona derecha roja (descartar).
- Animación CSS de 1.2s antes de avanzar al siguiente ítem.
- **9 ítems + ejemplos + ítems de reemplazo.**
- Condiciones evaluadas: `Adj(+)`, `Adj(+)neg`, `Adj(-)`, `Adj(-)neg`

---

## Flujo de la Aplicación

```
Login
  └─▶ Registro de Participante
        └─▶ Instrucciones Juego 1  (para el evaluador)
              └─▶ Juego 1
                    └─▶ Gestión de Reemplazos  (para el evaluador)
                          └─▶ Instrucciones Juego 2  (para el evaluador)
                                └─▶ Juego 2
                                      └─▶ Pantalla "¡Gracias!"
                                            └─▶ [PIN] → Resultados / Historial
```

---

## Base de Datos (Supabase)

### Tablas

| Tabla | Descripción |
|---|---|
| `usuarios` | Extiende `auth.users`. Almacena el `pin_hash` del fonoaudiólogo. |
| `participantes` | Datos del niño (nombre, fecha de nacimiento, establecimiento, sexo, condición). |
| `sesiones` | Una sesión por evaluación. Almacena puntajes, reemplazos usados y observaciones. |
| `respuestas` | Una fila por ítem respondido, con enunciado, respuesta del niño y si es correcto. |

### Seguridad (RLS)
Row Level Security habilitado en todas las tablas. Cada fonoaudiólogo solo puede ver y modificar sus propios datos.

### Verificación de PIN
La verificación se realiza mediante una **Supabase RPC Function** en el servidor, sin exponer el hash al cliente.

---

## Puntajes

| Juego | Rango |
|---|---|
| Juego 1 | 0 – 5 puntos |
| Juego 2 | 0 – 36 puntos |
| **Total** | **0 – 41 puntos** |

Los resultados incluyen desglose por condición lingüística (`Adj(+)`, `Adj(+)neg`, `Adj(-)`, `Adj(-)neg`).

---

## Configuración del Entorno

1. Clonar el repositorio y instalar dependencias:
   ```bash
   npm install
   ```

2. Crear un archivo `.env` en la raíz del proyecto basándose en `.env.example`:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-anon-key
   ```

3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Construir para producción:
   ```bash
   npm run build
   ```

---

## Estado de Implementación

- [x] Configuración Vite + React + Tailwind
- [x] Datos de ítems — `itemsJuego1.js` e `itemsJuego2.js`
- [x] `EvaluacionJuego1.jsx` funcional
- [x] `EvaluacionJuego2.jsx` funcional
- [ ] Login con Supabase Auth
- [ ] Registro de participante
- [ ] Guardado de respuestas en Supabase
- [ ] Pantalla de resultados (protegida por PIN)
- [ ] Historial de sesiones

---

## Síntesis de Voz

Los enunciados se reproducen con la [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis):

```js
const utterance = new SpeechSynthesisUtterance(texto);
utterance.lang = 'es-CL'; // fallback: 'es-ES'
utterance.rate = 0.9;
speechSynthesis.speak(utterance);
```

> **Nota:** La calidad de voz depende del sistema operativo y navegador. En macOS y con Chrome/Edge la calidad en español es alta. En Windows puede variar según la versión del sistema.

---

## Licencia

Proyecto de investigación académica — FONDECYT 11241390. Uso restringido.
