---
id: rag-retrieval-augmented-generation
title: 'Capítulo 8: RAG (Retrieval-Augmented Generation)'
sidebar_label: '8. RAG'
sidebar_position: 8
---
# Capítulo 8: RAG (Retrieval-Augmented Generation)

## 🎯 Objetivos de aprendizaje
- Comprender qué es RAG y por qué resuelve limitaciones de los LLMs puros
- Entender el flujo completo: ingesta → chunking → embedding → retrieval → generación
- Conocer estrategias de chunking, retrievers y rerankers
- Diseñar sistemas RAG robustos para producción

---

## 🧠 Modelo mental: ¿Qué es RAG?

**RAG (Retrieval-Augmented Generation)** es un patrón que conecta un LLM con conocimiento externo en tiempo real.

**Analogía:** Imagina un experto que no memorizó todo, pero sabe buscar en una biblioteca confiable antes de responder. Primero busca información relevante, luego la lee, y finalmente responde usando solo esa información. Si no encuentra nada, dice "no lo sé" en lugar de inventar.

**Sin RAG:** El modelo responde con lo que "recuerda" de su entrenamiento → puede alucinar o estar desactualizado.
**Con RAG:** El modelo responde con información verificable y actualizada → más preciso, auditable y confiable.

---

## 🔄 Flujo conceptual de RAG (paso a paso)

1. **Ingesta:** Documentos (PDF, web, DB) → texto limpio
2. **Chunking:** Dividir texto en fragmentos manejables (200-500 tokens)
3. **Embedding:** Transformar cada chunk en vector numérico
4. **Indexación:** Guardar vectores + metadatos en Vector DB
5. **Query:** Usuario hace pregunta → se convierte en embedding
6. **Retrieval:** Buscar los `k` vectores más similares en la DB
7. **Reranking (opcional):** Reordenar resultados por relevancia semántica
8. **Prompt Assembly:** Inyectar contexto recuperado en el prompt del LLM
9. **Generación:** LLM responde usando solo el contexto proporcionado
10. **Validación:** Verificar que la respuesta cite fuentes y no alucine


## 🔄 Flujo conceptual de RAG (paso a paso)

| Paso | Componente | Acción | Salida |
|------|------------|--------|--------|
| 1 | **Usuario** | Formula una pregunta | Query de texto |
| 2 | **Embedding Model** | Convierte la pregunta en vector | Embedding de la query |
| 3 | **Vector DB** | Búsqueda por similitud coseno | Top-5 chunks relevantes |
| 4 | **Reranker** (opcional) | Reordena por relevancia semántica | Chunks ordenados por score |
| 5 | **Prompt Builder** | Inyecta contexto en el prompt | `Prompt: "Responde usando este contexto: {chunks}"` |
| 6 | **LLM** | Genera respuesta basada en contexto | Respuesta con citas |
| 7 | **Validador** | Verifica fuentes y relevancia | Respuesta validada o rechazo |
| 8 | **Usuario** | Recibe la respuesta final | Respuesta citada y verificada |

**Flujo visual:**


---

## ⚙️ Estrategias de Chunking: cómo dividir el texto

| Estrategia | Descripción | Cuándo usarla |
|------------|-------------|---------------|
| **Por tamaño fijo** | Cortar cada N tokens (ej. 300) | Documentos homogéneos, rápido de implementar |
| **Por separadores** | Cortar en `\n\n`, `.`, `;` | Texto estructurado, preserva párrafos |
| **Semántico** | Usar NLP para cortar en ideas completas | Máxima coherencia, más complejo |
| **Jerárquico** | Chunk pequeño para búsqueda + padre para contexto | RAG avanzado, mejor precisión |
| **Dinámico** | Ajustar tamaño según densidad de información | Documentos muy variables |

> 💡 **Regla práctica:** Empieza con chunking por separadores de 300-400 tokens con overlap de 50 tokens. Mide la calidad de recuperación y ajusta.

---

## ⚖️ Matriz de decisiones: diseño de RAG

| Escenario | Estrategia recomendada | Por qué |
|-----------|------------------------|---------|
| **Documentos actualizados semanalmente** | Chunking dinámico + reindexación incremental | Evita reprocesar todo el corpus |
| **Preguntas multi-hop (cruzar fuentes)** | Graph-RAG o Agentic Retrieval | Permite razonar sobre relaciones entre documentos |
| **Latencia crítica (`<500ms`)** | Cache de queries + vector DB en memoria + sin reranker | Reduce pasos en el flujo |
| **Alta precisión requerida** | Reranker + contexto jerárquico + validación post-generación | Filtra ruido y mejora relevancia |
| **Multilingüe** | Embeddings multilingüe + chunking por idioma | Evita mezcla semántica entre idiomas |
| **Datos sensibles** | RAG con filtrado por metadatos + VPC privada | Control de acceso granular |

---

## ⚠️ Pitfalls reales en RAG

- **Chunking que rompe contexto:** Cortar en medio de una tabla o código → el LLM no entiende el fragmento
- **Retriever devuelve ruido:** Top-5 incluye chunks irrelevantes → el LLM se confunde o alucina
- **Ventana de contexto mal calculada:** Recuperar 10 chunks pero el modelo solo lee 3 → información perdida
- **Sin política de "no sé":** El LLM inventa cuando el retrieval falla → respuestas falsas con confianza
- **Metadatos ignorados:** No filtrar por fecha/autor/tenant → mezcla información de diferentes contextos
- **Evaluación ausente:** No medir `hit_rate@k` ni `MRR` → no sabes si tu RAG funciona bien

---

## 🛡️ Checklist de producción para RAG

- [ ] ¿El chunking preserva semántica y estructura (tablas, código, listas)?
- [ ] ¿Tengo métricas de recuperación: `hit_rate@k`, `MRR`, `precision@k`?
- [ ] ¿El prompt inyecta contexto con delimitadores claros y fuente citable?
- [ ] ¿Hay fallback si el retrieval score `< umbral mínimo`?
- [ ] ¿Monitoreo ratio `context_used / context_retrieved`?
- [ ] ¿Valido que las respuestas citen fuentes reales del contexto?
- [ ] ¿Pruebo con preguntas edge-case: ambiguas, fuera de dominio, adversarias?

---

## 🔗 Puente al código: arquitectura conceptual

Al implementar RAG, esta es la estructura mínima:

1. **Ingesta pipeline:** Parser (PDF/HTML) → limpiador → splitter → embedder → vector DB
2. **Query pipeline:** User input → embedder → similarity search → reranker → context builder
3. **Generation pipeline:** Prompt template + context → LLM call → post-process (citas, formato)
4. **Observability:** Logs de `query_tokens`, `retrieved_chunks`, `latency_per_stage`, `cost_estimate`
5. **Fallback chain:** Si retrieval falla → respuesta genérica o escalación humana

**Patrón de error a capturar:** `embedding_dimension_mismatch`, `vector_db_timeout`, `llm_context_overflow`, `no_relevant_chunks_found`

---

## 🧪 Laboratorio conceptual (sin código)

1. Toma un FAQ de tu dominio (10 preguntas/respuestas)
2. Simula manualmente el flujo RAG:
   - Divide cada respuesta en chunks de ~300 palabras
   - Escribe 3 preguntas nuevas no presentes en el FAQ
   - Para cada pregunta: ¿qué chunks recuperarías? ¿por qué?
   - Arma un prompt con esos chunks y responde "como si fueras el LLM"
3. Evalúa:
   - ¿Tu respuesta inventó información no presente en los chunks?
   - ¿Citaste correctamente la fuente?
   - ¿Qué habría pasado si el retriever hubiera traído chunks equivocados?
4. Documenta: ¿dónde rompería este flujo en producción real?

---

## 📚 Recursos y siguiente paso

- **Papers clave:** "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" (Lewis et al., 2020)
- **Frameworks:** LlamaIndex (RAG-first), LangChain (flexible), Haystack (modular)
- **Evaluación:** RAGAS, TruLens, DeepEval para métricas de calidad de RAG
- **Herramientas:** `unstructured` (parsing), `chromadb`/`qdrant` (vector DB), `cross-encoder` (reranking)
- **Siguiente capítulo:** Fine-tuning: cuándo y cómo ajustar un modelo con tus datos, vs. cuándo RAG es suficiente.
