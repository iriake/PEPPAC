# PEPPAC — Prototipo de Evaluación Fonoaudiológica Digital

Prototipo de aplicación web para la digitalización del instrumento de evaluación fonoaudiológica **PEPPAC** (_Procesamiento Pragmático del Adjetivo Calificativo_), orientado a niños hispanohablantes de **3 a 5 años**.

> ⚠️ **Este repositorio es un prototipo funcional** en desarrollo activo. Su propósito es explorar y validar la viabilidad técnica de una interfaz de evaluación autónoma, operada directamente por el niño, sin intervención del evaluador durante la sesión.

---

## Fundamento Teórico

### Adquisición de adjetivos calificativos

La adquisición y dominio de los adjetivos constituye un componente esencial del desarrollo lingüístico infantil, dado que estas palabras permiten describir propiedades de personas, objetos y eventos (Davies et al., 2023, 2022; Tribushinina, 2018). Su incorporación en el sistema lingüístico de los niños favorece tanto la comprensión como la producción verbal, siendo clave en la construcción de significados complejos (Davies et al., 2019).

No obstante, su adquisición representa un desafío particular: los adjetivos calificativos tienden a ser menos frecuentes en el _input_ lingüístico infantil (Tribushinina et al., 2015), suelen poseer significados abstractos (Sandhofer & Smith, 2001, 2007; Waxman & Booth, 2001), dependen semánticamente del sustantivo que modifican (Graham et al., 2005), y su aprendizaje requiere habilidades cognitivas avanzadas como el control atencional y la teoría de la mente (Boot & Waxman, 2009; Tribushinina et al., 2013; Redolfi & Melloni, 2024).

### Adjetivos subsectivos y procesamiento pragmático

El instrumento se centra en los **adjetivos subsectivos**: aquellos cuyo significado no es absoluto sino que se construye en función del sustantivo que modifican. Por ejemplo, _'podrida'_ o _'fresca'_ no poseen un valor semántico fijo; su interpretación depende del contexto y de las expectativas asociadas al referente específico. Debido a esto, son considerados más complejos cognitiva y lingüísticamente (Weicker & Schulz, 2019), pues su procesamiento requiere mayor integración contextual e inferencial en comparación con los adjetivos intersectivos.

El estudio de Tribushinina (2012) demostró que niños monolingües holandeses de tres años realizaban inferencias de relevancia a partir de adjetivos evaluativos en contextos argumentativos de forma similar a los adultos, y que la **polaridad** del adjetivo —tanto semántica como sintáctica— incidía significativamente en cómo los niños interpretaban la intención del hablante. Estos hallazgos indican que este tipo de procesamiento exige la integración de información semántica, sintáctica y pragmática para inferir actitudes, estados mentales y valoraciones.

A pesar de su relevancia, la investigación sobre adquisición de adjetivos calificativos en español es aún incipiente. La mayoría de los estudios disponibles se centran en otras lenguas, lo que motiva el desarrollo de instrumentos adaptados al español (Barrera et al., 2024).

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

### Ítems del Juego 1

| Ítem | Objetos | Adjetivo evaluado |
|---|---|---|
| Ejemplo | Sandía / Frutilla | Grande |
| 01 | Conejo / Tortuga | Lento |
| 02 | Flor nueva / Flor marchita | Nueva |
| 03 | Ensalada / Papas fritas | Caliente |
| 04 | Zapallo / Zanahoria | Liviano |
| 05 | Bombilla larga / Bombilla corta | Larga |

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

### Ítems del Juego 2

| Ítem | Tipo de adjetivo | `Adj(+)` | `Adj(+)neg` | `Adj(-)` | `Adj(-)neg` |
|---|---|---|---|---|---|
| Ej. | Valoración estética (juguete) | Bonita — Muñeca | No bonito — Volantín | Feo — Avión | No feo — Robot |
| 1 | Valoración de calidad (alimento) | Bueno — Plátano | No bueno — Bebida Cola | Malo — Dulces | No mala — Leche |
| 2 | Valoración emocional (juguete) | Divertido — Rompecabezas | No divertido — Patines | Aburrido — Pelota | No aburrido — Bloques |
| 3 | Valoración física (alimento) | Fresco — Lechuga | No fresco — Frutilla | Podrido — Manzana | No podrido — Tomate |
| 4 | Valoración de accesibilidad (juguete) | Fácil — Juego de encaje | No fácil — Patineta | Difícil — Cubo Rubik | No difícil — Lápices |
| 5 | Valoración sensorial / textura (ropa) | Suave — Pijama | No suave — Polerón | Áspero — Gorro | No áspera — Bufanda |
| 6 | Valoración estética (juguete) | Hermoso — Oso de peluche | No hermoso — Bicicleta | Horrible — Dinosaurio | No horrible — Araña |
| 7 | Valoración de riesgo (objeto) | Seguro — Casco | No seguro — Tijera | Peligroso — Triciclo | No peligroso — Cuchillo |
| 8 | Valoración física / tamaño (alimento) | Grande — Sandía | No grande — Piña | Pequeño — Naranja | No pequeño — Melón |
| 9 | Valoración sensorial / gusto (alimento) | Sabroso — Chocolate | No sabrosas — Huevo | Asqueroso — Salchichas | No asqueroso — Yogurt |
| Ex. | Valoración sensorial / gusto (alimento) | Rica — Torta | No rico — Papas fritas | Malo — Brócoli | No malo — Pera |

> Los ítems marcados como **Ex.** son ítems de reemplazo, utilizados cuando el niño desconoce algún producto del ítem original.

---

## Estado del Prototipo

> 🔬 Las interfaces implementadas son funcionales pero **no representan el diseño final**. El foco actual está en la arquitectura de datos, el flujo de evaluación y la experiencia desde la perspectiva del niño.

- [x] Configuración del proyecto (Vite + React + Tailwind)
- [x] Datos de ítems — `itemsJuego1.js` e `itemsJuego2.js`
- [x] Flujo de `EvaluacionJuego1.jsx` funcional
- [x] Flujo de `EvaluacionJuego2.jsx` funcional
- [ ] Autenticación del evaluador (Supabase Auth)
- [ ] Registro de participantes
- [ ] Persistencia de respuestas en base de datos
- [ ] Panel de resultados protegido por PIN
- [ ] Historial de sesiones por evaluador

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

## Referencias

Barrera, V., Guerra, P., Osorio, C. & Quintero, B. (2024). Construcción y validación de un instrumento para evaluar el procesamiento pragmático de los adjetivos calificativos en escolares hispanohablantes. Tesis de licenciatura en Fonoaudiología. No publicada.

Booth, A. E., & Waxman, S. R. (2009). A horse of a different color: specifying with precision infants' mappings of novel nouns and adjectives. *Child development, 80*(1), 15–22. https://doi.org/10.1111/j.1467-8624.2008.01242.x

Davies, C., Lingwood, J., Ivanova, B., & Arunachalam, S. (2021). Comprehension of contrastive and descriptive adjectives by three-year-olds. *Cognition*. https://doi.org/10.1016/j.cognition.2021.104707

Davies, C., Ebbels, S., Nicoll, H., Syrett, K., White, S. & Zuniga-Montanez, C. (2023). Supporting adjective learning by children with Developmental Language Disorder. *International Journal of Language & Communication Disorders, 58*(2), 629–650.

Graham, S. A., Cameron, C. L., & Welder, A. N. (2005). Preschoolers' extension of familiar adjectives. *Journal of experimental child psychology, 91*(3), 205–226. https://doi.org/10.1016/j.jecp.2005.03.001

Morales Reyes, A. (2021). Uso de adjetivos en niños hispanohablantes. *Estudios de Lingüística Aplicada, 0*(72), 69–95. https://doi.org/10.22201/enallt.01852647p.2021.72.908

Owens, R. E. (2016). *Language Development: An Introduction* (9ª ed.). Pearson.

Redolfi, M. & Melloni, C. (2024). Processing adjectives in development: Evidence from eye-tracking. *Journal of Child Language*, 1–24. https://doi.org/10.1017/S0305000923000703

Sandhofer, C. M., & Smith, L. B. (2001). Why children learn color and size words so differently. *Journal of Experimental Psychology: General, 130*(4), 600–620.

Schulze, C., Grassmann, S. & Tomasello, M. (2013). 3-Year-Old Children Make Relevance Inferences in Indirect Verbal Communication. *Child Development*. https://doi.org/10.1111/cdev.12093

Tribushinina, E. (2012). Comprehension of relevance implicatures by pre-schoolers: The case of adjectives. *Journal of Pragmatics, 44*(14), 2035–2044. https://doi.org/10.1016/j.pragma.2012.09.018

Tribushinina, E. (2018). Acquisition of adjectives across languages and populations. *Cahiers Du Centre de Linguistique et Des Sciences Du Langage, 56*, 259–275.

Tribushinina, E., Voeikova, M. & Noccetti, S. (2015). *Semantics and Morphology of Early Adjectives in First Language Acquisition*. Cambridge Scholars Publishing.

Waxman, S. R., & Booth, A. E. (2001). On the insufficiency of evidence for a domain-general account of word learning. *Cognition, 78*(3), 277–279.

Weicker, M. & Schulz, P. (2024). Children and adults privilege linguistic over visual information when creating comparison classes for prenominal gradable adjectives. *Glossa: a Journal of General Linguistics, 9*(1), 1–36.
