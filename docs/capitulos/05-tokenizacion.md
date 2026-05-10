---
id: tokenizacion-y-ventanas-de-contexto
title: 'Capítulo 5: Tokenización y Ventanas de Contexto'
sidebar_label: '5. Tokenización'
sidebar_position: 5
---
# Capítulo 5: Tokenización y Ventanas de Contexto

## 🎯 Objetivos de aprendizaje
- Comprender qué es un token y por qué los modelos no procesan palabras completas
- Entender cómo funciona BPE (Byte-Pair Encoding) y sus variantes
- Gestionar ventanas de contexto, costos por token y truncamiento en producción
- Identificar comportamientos multilingüe y estrategias de fallback

---

##  Modelo mental: ¿Qué es realmente un token?

Un LLM no lee palabras, lee **tokens**. Un token es una unidad mínima de texto que el modelo reconoce y transforma en números (embeddings). 

- En español o inglés, 1 token ≈ 0.75 palabras
- En chino, japonés o árabe, 1 carácter puede equivaler a 1–3 tokens
- Los espacios, saltos de línea y caracteres especiales también consumen tokens

**Analogía:** Imagina que el modelo es un lector que solo entiende sílabas y prefijos comunes. En lugar de leer `"inteligencia"`, lee `["int", "el", "ig", "enc", "ia"]`. Cuanto más frecuente sea un fragmento, más probable es que exista como token único.

---

## 🔄 Cómo se construye un vocabulario (BPE paso a paso)

Los modelos modernos usan **Byte-Pair Encoding (BPE)** o variantes como WordPiece/Unigram. El proceso es siempre el mismo:

1. **Partición inicial:** Cada carácter o byte se trata como token independiente
2. **Conteo de pares:** Se escanea el corpus de entrenamiento y se cuentan combinaciones de 2 tokens adyacentes
3. **Fusión iterativa:** El par más frecuente se une en un nuevo token. Se repite `N` veces (típicamente 30k–100k)
4. **Reglas de split:** Se guarda un vocabulario + regex de división para tokenizar textos nuevos en inferencia

**Resultado:** Un equilibrio entre vocabulario compacto y capacidad de reconstruir palabras desconocidas usando subtokens.

---

##  Gestión operativa: lo que importa en producción

| Dimensión | Qué controlar | Impacto real |
|-----------|---------------|--------------|
| **Ventana de contexto** | Límite máximo de tokens (prompt + respuesta) | Superarlo causa truncamiento silencioso o error 400 |
| **Costo por token** | Ratio `prompt_tokens / completion_tokens` | Define facturación API/cloud. Prompt largo = costo elevado |
| **Estrategia de corte** | `head`, `tail`, `chunking`, `summarization` | Define qué información se prioriza o se pierde |
| **Tokens especiales** | `<bos>`, `<eos>`, stop sequences, delimitadores | Controlan generación, formato y seguridad |
| **Idiomas no latinos** | CJK, árabe, devanagari, cirílico | Suelen consumir 2–4x más tokens por carácter visible |

---

## ⚖️ Matriz de decisiones técnicas

| Escenario | Estrategia recomendada | Alternativa si falla |
|-----------|------------------------|----------------------|
| Chat con historial largo | Ventana deslizante + resumen automático | Base de datos externa + RAG ligero |
| Multilingüe con bajo presupuesto | Modelo con tokenizador unificado eficiente | Traducción previa + modelo monolingüe |
| Latencia crítica (`<500ms`) | Cache de prompts frecuentes + contexto comprimido | Fine-tuning con contexto fijo + prompt estático |
| Documentos técnicos/código | Tokenizador entrenado en corpus técnico | Chunking semántico + retriever vectorial |

---

## ️ Pitfalls reales (errores que cuestan dinero)

- **Truncamiento silencioso:** El modelo corta el final del prompt sin avisar → respuestas incompletas o alucinaciones
- **Costos no estimados:** No considerar que el tokenizador varía por modelo → facturas 2–3x mayores a lo esperado
- **Tokens especiales ignorados:** No cerrar correctamente `<eos>` o stop sequences → generación infinita o loops
- **Multilingüe mal medido:** Asumir 1 token = 1 palabra en chino/japonés → prompts que exceden límites sin notarlo
- **Prompt injection por formato:** Delimitadores mal colocados permiten que el usuario altere instrucciones del sistema

---

## 🛡️ Checklist de producción

Antes de integrar cualquier modelo, valida:

- [ ] ¿Conozco el tamaño exacto de contexto y cómo se mide (tokens, no caracteres)?
- [ ] ¿Tengo política de fallback si el prompt supera el límite? (ej. resumen, chunking, rechazo amable)
- [ ] ¿Estimo costo por request con margen del 20% por variación de tokenización?
- [ ] ¿Valido que los stop tokens coincidan con el formato de salida esperado?
- [ ] ¿Monitoreo ratio `prompt_tokens / completion_tokens` y costo mensual en dashboards?
- [ ] ¿Pruebo con textos reales multilingüe, código y caracteres especiales?

---

## 🔗 Puente al código: arquitectura conceptual

Cuando pases a implementar, esta es la estructura mínima que deberás orquestar:

1. **Capa de tokenización:** Cliente oficial del modelo (ej. `tiktoken`, HuggingFace Tokenizers). Nunca uses `len(text.split())`
2. **Capa de validación:** Contador previo a la llamada. Si `tokens > límite`, activa estrategia de reducción
3. **Capa de llamada:** API o endpoint local. Envía `max_tokens`, `stop`, `temperature` según caso de uso
4. **Capa de post-proceso:** Recorta respuesta en `stop_sequence`, valida formato, loguea métricas de tokens
5. **Capa de observabilidad:** Registra `input_tokens`, `output_tokens`, `latency`, `cost_estimate` por request

**Patrón de error a capturar:** `400 ContextLengthExceeded`, `429 RateLimit`, `timeout`, `stop_sequence not reached`

---

## 🧪 Laboratorio conceptual (sin código)

1. Abre un tokenizador público (ej. Tiktokenizer, HuggingFace Tokenizer Playground)
2. Pega un párrafo de 200 palabras en español, otro en japonés, y un bloque de código JSON
3. Observa:
   - ¿Dónde corta el tokenizador? (¿en palabras completas, sílabas, bytes?)
   - ¿Cuántos tokens consume cada idioma/formato?
   - ¿Qué pasa si añades 3 párrafos más? ¿Supera el límite de contexto típico (4k/8k/32k)?
4. Documenta: ¿qué estrategia de truncamiento usarías para tu caso real? ¿Resumen, chunking o rechazo?

---

## 📚 Recursos y siguiente paso

- Documentación oficial de tokenizadores: OpenAI, HuggingFace, Anthropic
- Herramientas de estimación: `tiktoken` (Python), `gpt-tokenizer` (web)
- Papers clave: "Byte-Pair Encoding for Subword Tokenization", "Efficient Tokenization for Multilingual LLMs"
- **Siguiente capítulo:** Embeddings: cómo se transforma texto en vectores, dimensionalidad, similitud y cuándo pierden semántica.
