---
id: embeddings-y-representacion-vectorial
title: 'Capítulo 6: Embeddings y Representación Vectorial'
sidebar_label: '6. Embeddings'
sidebar_position: 6
---
# Capítulo 6: Embeddings y Representación Vectorial

## 🎯 Objetivos de aprendizaje
- Comprender qué son los embeddings y por qué son fundamentales para la IA moderna
- Entender cómo se transforma texto en vectores numéricos
- Conocer las métricas de similitud (coseno, producto punto, distancia euclidiana)
- Identificar cuándo los embeddings pierden semántica y cómo mitigarlo

---

## 🧠 Modelo mental: ¿Qué es un embedding?

Un **embedding** es la representación numérica de un concepto (palabra, frase, imagen, audio) en un espacio vectorial de alta dimensión.

**Analogía:** Imagina un mapa 3D donde cada palabra es un punto. Palabras con significado similar ("gato", "felino", "miau") están cerca; palabras diferentes ("gato", "avión", "democracia") están lejos. El embedding son las coordenadas (x, y, z, ..., n) de ese punto.

- Texto → [0.23, -0.45, 0.12, ..., 0.89] (vector de 384, 768, 1536 dimensiones)
- Imagen → [0.01, 0.78, -0.33, ..., 0.56]
- Audio → [0.44, -0.12, 0.90, ..., 0.03]

---

## 🔄 Cómo se generan los embeddings (flujo conceptual)

1. **Tokenización:** El texto se divide en tokens (como en el capítulo anterior)
2. **Codificación contextual:** Cada token se transforma en un vector usando un modelo pre-entrenado (BERT, Sentence-BERT, OpenAI, etc.)
3. **Pooling:** Los vectores de tokens se combinan en un solo vector que representa toda la frase
4. **Normalización:** El vector final se ajusta para que tenga longitud unitaria (facilita comparación)

**Modelos populares:**
| Modelo | Dimensiones | Idiomas | Caso de uso |
|--------|-------------|---------|-------------|
| `text-embedding-3-small` (OpenAI) | 1536 | Multilingüe | Búsqueda semántica, RAG |
| `text-embedding-3-large` (OpenAI) | 3072 | Multilingüe | Máxima precisión, tareas complejas |
| `all-MiniLM-L6-v2` (Sentence-BERT) | 384 | Inglés, español limitado | Local, rápido, bajo costo |
| `multilingual-e5-large` (Microsoft) | 1024 | 100+ idiomas | Multilingüe, open-source |
| `bge-m3` (BAAI) | 1024 | 100+ idiomas | RAG, recuperación densa |

---

## 📊 Métricas de similitud: ¿cómo comparar vectores?

| Métrica | Fórmula conceptual | Cuándo usarla | Ventaja |
|---------|-------------------|---------------|---------|
| **Similitud del coseno** | Ángulo entre vectores | Búsqueda semántica, RAG | Insensible a la magnitud, solo dirección |
| **Producto punto** | Suma de productos componente a componente | Cuando los vectores están normalizados | Más rápida que coseno |
| **Distancia euclidiana** | Distancia recta entre puntos | Clustering, detección de outliers | Intuitiva, geométrica |
| **Distancia de Manhattan** | Suma de diferencias absolutas | Datos dispersos, alta dimensionalidad | Robusta a ruido |

> 💡 **Regla práctica:** Usa similitud del coseno para búsqueda semántica. Es el estándar en RAG y recuperación de información.

---

## ⚖️ Matriz de decisiones: ¿qué modelo de embeddings elegir?

| Necesidad | Recomendación | Por qué |
|-----------|---------------|---------|
| **Prototipado rápido** | `text-embedding-3-small` (OpenAI) | API simple, buena calidad, bajo costo |
| **Máxima precisión** | `text-embedding-3-large` o `bge-m3` | Mejor recuperación en benchmarks |
| **Ejecución local** | `all-MiniLM-L6-v2` o `bge-m3` | Sin dependencia de API, privacidad total |
| **Multilingüe real** | `multilingual-e5-large` o `bge-m3` | Entrenado en 100+ idiomas con equilibrio |
| **Latencia crítica** | `all-MiniLM-L6-v2` (384 dims) | Vectores pequeños = búsqueda más rápida |
| **Presupuesto cero** | Modelos HuggingFace + GPU local | Open-source, sin costos por token |

---

## ⚠️ Pitfalls reales con embeddings

- **Pérdida de semántica en frases largas:** Algunos modelos degradan la calidad al procesar textos >512 tokens
- **Idiomas no equilibrados:** Un modelo "multilingüe" puede funcionar bien en inglés y mal en español
- **Normalización olvidada:** Si no normalizas los vectores, la similitud del coseno da resultados erróneos
- **Dimensionalidad innecesaria:** Usar 3072 dims cuando 384 es suficiente → más costo, más latencia, sin beneficio real
- **Drift semántico:** El significado de palabras cambia con el tiempo; los embeddings estáticos no se actualizan solos

---

## 🛡️ Checklist de producción

- [ ] ¿El modelo de embeddings soporta mi idioma principal con buena calidad?
- [ ] ¿He normalizado los vectores antes de calcular similitud?
- [ ] ¿Estoy usando la métrica correcta (coseno para búsqueda semántica)?
- [ ] ¿He probado con ejemplos reales de mi dominio (no solo benchmarks genéricos)?
- [ ] ¿Monitoreo la calidad de la recuperación (hit rate, MRR) en producción?
- [ ] ¿Tengo un plan para actualizar embeddings si cambio de modelo?

---

## 🔗 Puente al código: arquitectura conceptual

Cuando implementes embeddings, esta es la estructura mínima:

1. **Capa de generación:** Cliente del modelo (OpenAI, HuggingFace, etc.) → vector por texto
2. **Capa de almacenamiento:** Base de datos vectorial (Pinecone, Qdrant, pgvector) o índice en memoria
3. **Capa de búsqueda:** Query → embedding → similitud → top-k resultados
4. **Capa de post-proceso:** Reranking, filtrado por metadatos, validación de relevancia
5. **Capa de monitoreo:** Métricas de recuperación, latencia, costo por query

**Patrón de error a capturar:** `embedding dimension mismatch`, `timeout en generación`, `índice no actualizado`

---

## 🧪 Laboratorio conceptual (sin código)

1. Usa una herramienta pública como [HuggingFace Sentence Transformers](https://huggingface.co/sentence-transformers) o [OpenAI Embeddings Playground](https://platform.openai.com/docs/guides/embeddings)
2. Ingresa 5 frases relacionadas (ej. "perro", "gato", "animal doméstico", "mascota", "automóvil")
3. Observa:
   - ¿Qué frases tienen vectores más similares?
   - ¿La similitud coincide con tu intuición semántica?
   - ¿Qué pasa si agregas una frase en otro idioma?
4. Documenta: ¿en qué casos el embedding falló en capturar el significado?

---

## 📚 Recursos y siguiente paso

- **Documentación:** [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings), [Sentence-BERT](https://www.sbert.net), [MTEB Leaderboard](https://huggingface.co/spaces/mteb/leaderboard)
- **Herramientas:** `sentence-transformers` (Python), `tiktoken` + `openai` para embeddings de OpenAI
- **Papers clave:** "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks", "Matryoshka Representation Learning"
- **Siguiente capítulo:** Bases de datos vectoriales: cómo almacenar y buscar millones de embeddings con latencia de milisegundos.
