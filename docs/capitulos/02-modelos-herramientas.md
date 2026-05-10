---
id: modelos-y-herramientas-de-ia-existentes
title: 'Capítulo 2: Modelos y Herramientas de IA Existentes'
sidebar_label: '2. Modelos'
sidebar_position: 2
---
# Capítulo 2: Modelos y Herramientas de IA Existentes

## 🎯 Objetivos de aprendizaje
- Conocer los principales modelos de lenguaje y sus diferencias
- Identificar herramientas de IA por categoría (texto, imagen, video, código)
- Entender ventajas comparativas entre modelos cerrados y abiertos
- Seleccionar la herramienta adecuada según el caso de uso

---

##  Panorama actual: el ecosistema de modelos

El mercado de IA se divide en **modelos cerrados** (APIs propietarias) y **modelos abiertos** (descargables y auto-hospedables).

### Modelos cerrados (APIs)
| Modelo | Empresa | Fortalezas | Casos de uso |
|--------|---------|------------|--------------|
| **GPT-4/4o** | OpenAI | Razonamiento complejo, multilingüe, ecosistema maduro | Asistentes, análisis, código, chatbots empresariales |
| **Claude 3.5** | Anthropic | Contexto largo (200k tokens), seguridad, escritura natural | Documentos largos, análisis legal/médico, redacción |
| **Gemini 1.5** | Google | Multimodal nativo, integración con Google, contexto masivo (1M tokens) | Búsqueda, análisis de video/imágenes, productividad |
| **Copilot** | Microsoft | Integración Office/Windows, empresarial | Productividad corporativa, Excel, PowerPoint, Word |
| **Grok** | xAI | Acceso a datos de X (Twitter), tono informal | Análisis de tendencias, noticias en tiempo real |
| **Perplexity** | Perplexity AI | Búsqueda web en tiempo real, citas de fuentes | Investigación, fact-checking, resumen de noticias |

### Modelos abiertos (self-hosted)
| Modelo | Organización | Características | Requisitos |
|--------|--------------|-----------------|------------|
| **Llama 3.1** | Meta | 8B/70B/405B parámetros, buen equilibrio calidad/rendimiento | 16GB-80GB RAM según versión |
| **Mistral/Mixtral** | Mistral AI | Eficiente, multilingüe, MoE (Mixture of Experts) | 8-32GB RAM |
| **Qwen 2.5** | Alibaba | Fuerte en código y matemáticas, multilingüe | 8-64GB RAM |
| **DeepSeek** | DeepSeek-AI | Especializado en código y razonamiento | 16-48GB RAM |
| **Phi-3** | Microsoft | Pequeño pero potente (3.8B), edge-friendly | 4-8GB RAM |

---

## 🎨 IA por categoría de tarea

### Generación de texto y conversación
- **ChatGPT** (OpenAI): Versátil, plugins, GPTs personalizados
- **Claude** (Anthropic): Escritura natural, análisis de documentos largos
- **Gemini** (Google): Gratuito, integración Gmail/Docs, búsqueda web
- **Perplexity**: Respuestas con fuentes citadas, ideal para investigación

### Generación de imágenes
- **DALL-E 3** (OpenAI): Integrado en ChatGPT, sigue prompts textuales precisos
- **Midjourney**: Calidad artística superior, Discord-based, estilo único
- **Stable Diffusion**: Open-source, control total, ejecutable localmente
- **Leonardo.ai**: Especializado en assets de juegos, control fino
- **Flux**: Nueva generación, alta resolución, rápido

### Generación de video
- **Sora** (OpenAI): Video realista a partir de texto (acceso limitado)
- **Runway Gen-2**: Edición de video con IA, green screen, motion brush
- **Pika Labs**: Generación y edición, animación de imágenes estáticas
- **HeyGen**: Avatares parlantes, clonación de voz, traducción de video

### Generación de código
- **GitHub Copilot**: Autocompletado en IDE, chat, integración VS Code
- **Cursor**: Editor completo con IA, refactorización, debugging
- **Codeium**: Alternativa gratuita a Copilot, multi-IDE
- **Amazon CodeWhisperer**: Especializado en AWS, seguridad empresarial

### Presentaciones y diseño
- **Gamma**: Presentaciones completas desde un prompt
- **Beautiful.ai**: Diseño automático, plantillas inteligentes
- **SlidesAI**: Extension Google Slides, genera slides desde texto
- **Tome**: Storytelling visual, integración con DALL-E

### Audio y música
- **ElevenLabs**: Clonación de voz, TTS ultra-realista, multilingüe
- **Suno AI**: Generación de música completa (letra, melodía, voz)
- **Udio**: Canciones personalizadas por género/estilo
- **Whisper** (OpenAI): Transcripción de audio, open-source

### Computer Vision
- **GPT-4V**: Análisis de imágenes, OCR, detección de objetos
- **CLIP**: Búsqueda semántica de imágenes, zero-shot classification
- **YOLO**: Detección de objetos en tiempo real, edge-friendly
- **Segment Anything (SAM)**: Segmentación de imágenes, Meta

### Productividad y búsqueda
- **Notion AI**: Resúmenes, generación de contenido dentro de Notion
- **Mem**: Notas inteligentes, búsqueda semántica, organización automática
- **You.com**: Búsqueda web con IA, privacidad-focused
- **Consensus**: Búsqueda en papers académicos, extracción de conclusiones

---

## ⚖️ Matriz de decisiones: ¿Qué modelo elegir?

| Criterio | Recomendación | Por qué |
|----------|---------------|---------|
| **Presupuesto cero** | Gemini, Claude (free tier), modelos open-source locales | Sin costo, límites generosos |
| **Máxima calidad** | GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro | Líderes en benchmarks |
| **Privacidad total** | Llama 3, Mistral (self-hosted) | Datos nunca salen de tu infra |
| **Contexto largo (>100k tokens)** | Claude 3.5 (200k), Gemini 1.5 (1M) | Ventana de contexto masiva |
| **Código y desarrollo** | GPT-4, Claude 3.5, DeepSeek Coder | Entrenados en código masivo |
| **Multilingüe (español)** | GPT-4, Claude, Qwen, Mistral | Buen soporte de idiomas |
| **Latencia crítica** | GPT-3.5-turbo, modelos pequeños locales | Respuesta en ¸`<1s` |
| **Empresarial/seguridad** | Azure OpenAI, AWS Bedrock, Google Vertex AI | Compliance, SLA, VPC |

---

## ⚠️ Pitfalls reales al elegir modelos

- **Vendor lock-in:** Depender de una API propietaria sin plan de migración
- **Costos ocultos:** No estimar tokens, requests o almacenamiento vectorial
- **Sobreespecificación:** Usar GPT-4 cuando GPT-3.5 o un modelo pequeño es suficiente
- **Ignorar latencia:** Modelos grandes = más lentos; crítico para chat en tiempo real
- **Falta de fallback:** Si la API se cae, ¿tu aplicación deja de funcionar?
- **Licencias restrictivas:** Algunos modelos abiertos tienen restricciones comerciales

---

## 🛡️ Checklist de evaluación de modelos

- [ ] ¿El modelo soporta mi idioma principal (español)?
- [ ] ¿Cuál es el costo estimado mensual para mi volumen?
- [ ] ¿Cumple con regulaciones de privacidad (GDPR, HIPAA)?
- [ ] ¿Tiene SLA garantizado (uptime, latencia)?
- [ ] ¿Puedo hacer fine-tuning o RAG si es necesario?
- [ ] ¿Existe un modelo open-source equivalente más barato?
- [ ] ¿Cómo manejo rate limits y cuotas?
- [ ] ¿Tengo plan B si el proveedor cambia precios o cierra?

---

## 🔗 Puente al código: arquitectura conceptual

Al integrar múltiples modelos, estructura tu sistema así:

1. **Abstracción de proveedor:** Interfaz común (OpenAI-compatible) para cambiar de modelo sin reescribir código
2. **Router inteligente:** Decide qué modelo usar según complejidad del prompt (simple → modelo barato, complejo → modelo premium)
3. **Cache de respuestas:** Almacena resultados de prompts frecuentes para reducir costos
4. **Fallback chain:** Si GPT-4 falla, intenta con GPT-3.5, luego con un modelo local
5. **Observabilidad:** Logs de tokens, costos, latencia por modelo y endpoint

**Patrón común:** Usar LangChain o LlamaIndex para orquestar múltiples modelos y proveedores.

---

## 🧪 Laboratorio conceptual

1. Elige 3 tareas que quieras automatizar (ej. resumir emails, generar imágenes, analizar datos)
2. Para cada tarea:
   - Busca 2-3 herramientas de IA especializadas
   - Compara: precio, facilidad de uso, calidad de salida
   - Prueba versiones gratuitas o trials
3. Documenta: ¿cuál funcionó mejor? ¿por qué?
4. Investiga: ¿existe un modelo open-source que puedas correr localmente?

---

## 📚 Recursos y siguiente paso

- **Comparativas:** [LMSys Chatbot Arena](https://chat.lmsys.org), [Papers With Code](https://paperswithcode.com)
- **Directorios:** [Futurepedia](https://futurepedia.io) (3000+ herramientas), [There's An AI For That](https://theresanaiforthat.com)
- **Benchmarks:** [HuggingFace Open LLM Leaderboard](https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard)
- **Siguiente capítulo:** Plataformas de hosting (HuggingFace, Groq, Replicate): cómo usar modelos sin infraestructura propia.
