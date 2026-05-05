# PEPPAC — Prototipo de Evaluación Fonoaudiológica Digital

Prototipo de aplicación web para la digitalización del instrumento de evaluación fonoaudiológica **PEPPAC**, orientado a niños hispanohablantes de **3 a 5 años**.

> ⚠️ **Este repositorio es un prototipo funcional** en desarrollo activo. Su propósito es explorar y validar la viabilidad técnica de una interfaz de evaluación autónoma, operada directamente por el niño, sin intervención del evaluador durante la sesión.

---

## Motivación

Los instrumentos de evaluación fonoaudiológica infantil son típicamente administrados de forma presencial y manual, lo que introduce variabilidad en la aplicación y limita la escalabilidad. Este prototipo explora cómo una interfaz digital puede:

- **Estandarizar** la administración del instrumento.
- **Reducir la carga** sobre el evaluador durante la sesión.
- **Registrar datos** de forma automática y estructurada.
- **Garantizar privacidad** mediante control de acceso por rol.

---

## Estado del Proyecto

> 🔬 **Prototipo en etapa temprana.** Las interfaces implementadas son funcionales pero no representan el diseño final del producto. El foco actual está en la arquitectura de datos, el flujo de evaluación y la experiencia de uso desde la perspectiva del niño.

### Progreso actual

- [x] Configuración del proyecto (Vite + React + Tailwind)
- [x] Definición de la estructura de datos de los ítems
- [x] Implementación del flujo de Juego 1
- [x] Implementación del flujo de Juego 2
- [ ] Autenticación del evaluador (Supabase Auth)
- [ ] Registro de participantes
- [ ] Persistencia de respuestas en base de datos
- [ ] Panel de resultados protegido por PIN
- [ ] Historial de sesiones

---

## Estructura de la Evaluación

El instrumento se divide en dos juegos, cada uno evaluando distintas dimensiones de comprensión lingüística.

### Juego 1 — Selección de imagen
- El niño ve **dos imágenes** y toca una.
- Sin feedback visual ni sonoro tras la respuesta.
- Avance automático con transición fade de 250ms.
- **5 ítems evaluados + 1 ítem de práctica.**

### Juego 2 — Clasificación de productos
- El niño decide si un producto se **compra** 🛒 o se **descarta** 🗑️.
- Zona táctil izquierda (verde) para comprar / derecha (roja) para descartar.
- Animación de respuesta de 1.2s antes de avanzar.
- **9 ítems evaluados + ejemplos + ítems de reemplazo.**
- Condiciones lingüísticas: `Adj(+)`, `Adj(+)neg`, `Adj(-)`, `Adj(-)neg`

---

## Flujo de la Aplicación

```
Login del evaluador
  └─▶ Registro del participante
        └─▶ Instrucciones Juego 1  [evaluador]
              └─▶ Juego 1          [niño]
                    └─▶ Gestión de reemplazos  [evaluador]
                          └─▶ Instrucciones Juego 2  [evaluador]
                                └─▶ Juego 2          [niño]
                                      └─▶ Pantalla de cierre
                                            └─▶ [PIN] → Resultados / Historial
```

---

## Arquitectura Técnica

### Stack

| Capa | Tecnología |
|---|---|
| Frontend | Vite + React |
| Estilos | Tailwind CSS |
| Backend / DB | Supabase (PostgreSQL + Auth + RLS) |
| Síntesis de voz | Web Speech API (`es-CL`) |

### Modelo de datos (simplificado)

| Tabla | Descripción |
|---|---|
| `usuarios` | Perfil del evaluador, vinculado a `auth.users` |
| `participantes` | Datos del niño evaluado |
| `sesiones` | Una sesión por evaluación, con puntajes y metadatos |
| `respuestas` | Registro ítem a ítem de cada respuesta |

### Privacidad y acceso
Todas las tablas tienen **Row Level Security (RLS)** habilitado. Cada evaluador solo puede acceder a los datos de sus propios participantes y sesiones. La verificación del PIN se realiza en el servidor mediante una función RPC, sin exponer hashes al cliente.

### Síntesis de voz

Los enunciados se presentan mediante la [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis):

```js
const utterance = new SpeechSynthesisUtterance(texto);
utterance.lang = 'es-CL';
utterance.rate = 0.9;
speechSynthesis.speak(utterance);
```

> La calidad depende del navegador y sistema operativo. Chrome y Edge ofrecen las mejores voces en español.

---

## Instalación y desarrollo local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Completar VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY

# Iniciar servidor de desarrollo
npm run dev
```

---

## Puntajes

| Juego | Rango |
|---|---|
| Juego 1 | 0 – 5 pts |
| Juego 2 | 0 – 36 pts |
| **Total** | **0 – 41 pts** |

Los resultados incluyen desglose por condición lingüística y registro de los ítems de reemplazo utilizados.
