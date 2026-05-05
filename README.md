# PEPPAC — Prototipo de Evaluación Fonoaudiológica Digital

Aplicación web para la digitalización del instrumento de evaluación fonoaudiológica **PEPPAC** (_Procesamiento Pragmático del Adjetivo Calificativo_), orientado a niños hispanohablantes de **3 a 5 años**.

🌐 **Demo:** [peppac.vercel.app](https://peppac.vercel.app)

---

## El Instrumento PEPPAC

La PEPPAC es una **propuesta lúdica de simulación** para evaluar el procesamiento pragmático del adjetivo calificativo. Recrea un escenario de supermercado para situar al participante en una tarea comunicativa con objetivos específicos, observando cómo comprende e interpreta el lenguaje en función de pistas contextuales, roles sociales e intenciones comunicativas (Schulze et al., 2013).

El instrumento fue construido siguiendo la línea de Tribushinina (2012), con diferencias sustanciales: se incorporaron distintos tipos de estímulos, se añadió una nueva tarea y se delimitó la clase semántica evaluada al **adjetivo subsectivo**. La PEPPAC fue sometida a **juicio de expertos** y ha sido validada (Barrera et al., 2024).

Se aplica de forma **individual** en un tiempo estimado de **20 minutos**.

### Tabla de especificaciones

| Habilidad | Juego | Tarea | N° de ítems | Puntaje por ítem | Puntaje máximo |
|---|---|---|---|---|---|
| Conocimiento | 1 | Acceso léxico | 5 | 0–1 | 5 |
| Comprensión | 2 | Lectura de intenciones | 9 × 4 condiciones | 0–1 | 36 |
| | | | | **Total** | **41** |

---

## Juego 1 — Acceso Léxico

El niño asume el rol de **vendedor** en un supermercado. El evaluador actúa como comprador y formula solicitudes verbales que incluyen un adjetivo calificativo como pista lingüística (p. ej.: _"Quiero comprar una fruta grande"_). El niño debe identificar, seleccionar y entregar el producto correcto, demostrando su conocimiento del adjetivo mencionado.

Los estímulos fueron diseñados para evaluar la interpretación referencial del adjetivo subsectivo en función del contexto visual, priorizando la concreción, la familiaridad y la posibilidad de generar contrastes perceptibles y relevantes para la edad.

---

## Juego 2 — Lectura de Intenciones

El niño asume nuevamente el rol de **vendedor**, mientras el evaluador actúa como cliente. La dinámica simula una interacción comercial donde el niño debe **inferir las preferencias del cliente** a partir del juicio adjetival expresado sobre los productos en venta.

Se le proporciona al niño una **canasta de compras** 🛒 y un **bote de basura** 🗑️, junto con 36 láminas de productos de supermercado. Según la respuesta verbal del cliente, el niño decide si el producto va a la canasta o al bote.

### Condiciones de polaridad

El instrumento manipula la polaridad del enunciado del cliente para evaluar cómo la negación afecta la interpretación:

| Condición | Tipo de enunciado | Acción esperada |
|---|---|---|
| Adjetivo positivo `Adj(+)` | _"Eso es bonito"_ | Compra 🛒 |
| Adjetivo positivo negado `Adj(+)neg` | _"Eso no es bonito"_ | No compra 🗑️ |
| Adjetivo negativo `Adj(-)` | _"Eso es feo"_ | No compra 🗑️ |
| Adjetivo negativo negado `Adj(-)neg` | _"Eso no es feo"_ | Compra 🛒 |

---

## Arquitectura Técnica

### Stack

| Capa | Tecnología |
|---|---|
| Frontend | Vite + React |
| Estilos | Tailwind CSS |
| Backend / DB | Supabase (PostgreSQL + Auth + RLS) |
| Síntesis de voz | Web Speech API (`es-CL`) |

### Modelo de datos

| Tabla | Descripción |
|---|---|
| `usuarios` | Perfil del evaluador, vinculado a `auth.users` |
| `participantes` | Datos del niño evaluado |
| `sesiones` | Una sesión por evaluación, con puntajes y metadatos |
| `respuestas` | Registro ítem a ítem de cada respuesta |

Todas las tablas tienen **Row Level Security (RLS)** habilitado. Cada evaluador solo accede a sus propios datos. La verificación del PIN de acceso a resultados se realiza en servidor mediante función RPC, sin exponer hashes al cliente.

### Flujo de la aplicación

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

---

## Referencias

Barrera, V., Guerra, P., Osorio, C. & Quintero, B. (2024). Construcción y validación de un instrumento para evaluar el procesamiento pragmático de los adjetivos calificativos en escolares hispanohablantes. Tesis de licenciatura en Fonoaudiología. No publicada.

Schulze, C., Grassmann, S. & Tomasello, M. (2013). 3-Year-Old Children Make Relevance Inferences in Indirect Verbal Communication. *Child Development*. https://doi.org/10.1111/cdev.12093

Tribushinina, E. (2012). Comprehension of relevance implicatures by pre-schoolers: The case of adjectives. *Journal of Pragmatics, 44*(14), 2035–2044. https://doi.org/10.1016/j.pragma.2012.09.018
