---
id: fine-tunning
title: 'Capítulo 9: Fine-Tuning: Ajuste de Modelos para Dominios Específicos'
sidebar_label: '9. Fine-Tuning'
sidebar_position: 9
---
# Capítulo 9: Fine-Tuning: Ajuste de Modelos para Dominios Específicos

## 🎯 Objetivos de aprendizaje
- Comprender la diferencia fundamental entre RAG (recuperar) y Fine-Tuning (modificar comportamiento)
- Entender conceptos clave: Pre-entrenamiento, SFT (Supervised Fine-Tuning), PEFT, LoRA y QLoRA
- Conocer los requisitos de hardware y datasets para ajustar un modelo
- Identificar cuándo el Fine-Tuning es la solución correcta y cuándo es un error costoso

---

##  Modelo mental: ¿Qué es realmente el Fine-Tuning?

Si un modelo base es como un **universitario brillante** que sabe de todo un poco pero no conoce tus secretos, el **Fine-Tuning** es enviarlo a una **pasantía intensiva en tu empresa**.

- **RAG:** El universitario tiene un libro (tu base de datos) que consulta antes de hablar. No cambia su cerebro, solo lee.
- **Fine-Tuning:** El universitario estudia tanto tu material que internaliza el estilo, el tono y el conocimiento. Cambia sus pesos (sinapsis) para "ser" un experto en tu dominio.

El Fine-Tuning no sirve para darle "memoria" de hechos nuevos (para eso es RAG). Sirve para cambiar **estilo, formato, tono** o enseñar una **lógica compleja** que el modelo base no sabe seguir.

---

## 🔄 Flujo conceptual (Cómo se ajusta un modelo)

1. **Selección del Base Model:** Elegir un modelo potente y abierto (ej. Llama 3, Mistral).
2. **Preparación del Dataset:** Crear pares de `Instrucción -> Respuesta` de alta calidad.
   - *Formato:* JSONL con campos `prompt`, `completion` o `messages`.
   - *Calidad:* La basura entra, basura sale. Se necesitan ejemplos reales y corregidos.
3. **Configuración de Entrenamiento (PEFT/LoRA):**
   - En lugar de reentrenar todo el modelo (muy caro), se entrenan solo pequeñas partes o adaptadores (LoRA).
   - Esto reduce el costo de GPU en un 90%.
4. **Entrenamiento:** Ejecutar el proceso en GPU/TPU. El modelo ajusta sus pesos para minimizar el error en tus datos.
5. **Evaluación:** Probar con datos no vistos. ¿Sigue instrucciones? ¿Alucina menos?
6. **Inferencia:** Cargar el modelo base + los adaptadores (pesos ajustados) para usarlo.

---

## ⚖️ Matriz de decisiones: ¿RAG o Fine-Tuning?

| Necesidad | Solución Recomendada | Por qué |
|-----------|----------------------|---------|
| **Respuestas basadas en datos privados** | **RAG** | El modelo no necesita memorizar datos que cambian seguido |
| **Cambiar el tono/estilo (ej. "Habla como un pirata")** | **Fine-Tuning** | Es difícil lograr consistencia de estilo solo con prompts |
| **Seguir un formato JSON complejo estricto** | **Fine-Tuning** | Mejora drásticamente la obediencia estructural |
| **Corregir errores de razonamiento del modelo base** | **Fine-Tuning** | Si el modelo es "tonto" en tu dominio, necesita aprender la lógica |
| **Datos sensibles que no pueden salir del prompt** | **RAG** (o FT local) | El FT integra el conocimiento; si filtras el modelo, filtras los datos |
| **Presupuesto bajo / Tiempo rápido** | **RAG** | El FT requiere GPUs caras y limpieza de datos tediosa |

---

## 🔧 Técnicas Clave: PEFT, LoRA y QLoRA

No necesitas una granja de servidores para hacer Fine-Tuning hoy en día gracias a estas técnicas:

- **PEFT (Parameter-Efficient Fine-Tuning):** Entrena solo una fracción de los parámetros (ej. 1% en vez de 100%).
- **LoRA (Low-Rank Adaptation):** Agrega pequeñas matrices entrenables a las capas del modelo. Es el estándar actual.
- **QLoRA:** LoRA pero usando cuantización (4-bit). Permite ajustar modelos grandes (como Llama 3 70B) en una sola GPU de consumo (ej. RTX 3090/4090).

> 💡 **Regla práctica:** Usa siempre QLoRA si estás empezando. Es gratis (en Colab), rápido y los resultados son 95% comparables al entrenamiento completo.

---

## ⚠️ Pitfalls reales (Errores que destruyen modelos)

- **Dataset sucio:** Incluir errores tipográficos o respuestas incorrectas en el dataset → el modelo aprenderá a hablar mal o dar datos falsos.
- **Catastrophic Forgetting:** Entrenar demasiado en un tema específico → el modelo olvida cómo hablar español o hacer sumas básicas.
- **Overfitting:** El modelo memoriza las respuestas del dataset palabra por palabra → falla ante preguntas nuevas ligeramente diferentes.
- **Esperar que el FT "aprenda hechos":** Fine-Tuning no es para enseñar "¿Quién es el CEO de mi empresa?". Eso se olvida o alucina. Usa RAG para hechos, FT para comportamiento.
- **Costo oculto de inferencia:** Un modelo Fine-Tuned a veces es más lento o requiere más contexto para rendir bien si no se ajusta la temperatura.

---

## 🛡️ Checklist de producción para Fine-Tuning

- [ ] ¿Tengo al menos 500-1000 pares de Instrucción-Respuesta de alta calidad?
- [ ] ¿He filtrado datos duplicados, tóxicos o incorrectos?
- [ ] ¿Estoy usando LoRA/QLoRA para ahorrar recursos?
- [ ] ¿He reservado un 10-20% de datos para validación (no verlos durante el entrenamiento)?
- [ ] ¿He definido métricas de éxito (ej. "Debe responder en JSON válido el 99% de las veces")?
- [ ] ¿Tengo un plan de rollback si el modelo fine-tuned es peor que el base?

---

## 🔗 Puente al código: arquitectura conceptual

Al implementar Fine-Tuning, el flujo de trabajo es:

1. **Capa de Datos:** Scripts de limpieza y formateo a JSONL.
2. **Capa de Entrenamiento:**
   - Librerías: `unsloth`, `trl` (HuggingFace), `axolotl`.
   - Config: `learning_rate`, `epochs`, `lora_r`, `lora_alpha`.
3. **Capa de Merge (Opcional):** Fusionar los adaptadores LoRA con el modelo base para crear un modelo único `.gguf` o `.safetensors`.
4. **Capa de Despliegue:** Servir el nuevo modelo en vLLM, Ollama o TGI.

**Patrón de error a capturar:** `CUDA OOM` (memoria agotada), `loss NaN` (el modelo colapsó matemáticamente), `overfitting` (validation loss sube mientras training loss baja).

---

## 🧪 Laboratorio conceptual

1. Imagina que quieres un asistente que responda **solo** en haikus (poesía japonesa).
2. Diseña tu dataset:
   - Escribe 3 pares de `Input` (pregunta aburrida) y `Output` (respuesta en haiku).
   - Ejemplo: Input: "¿Qué es la IA?", Output: "Mente de silicio / Aprende de datos pasados / Piensa sin dormir".
3. Pregúntate:
   - ¿Si le preguntas algo que no está en el dataset (ej. "¿Quién ganó el mundial?"), debería responder en haiku o decir "no sé"?
   - ¿Cuántos ejemplos crees que necesitas para que funcione bien? (Pista: con estilo, 50-100 ejemplos buenos suelen bastar).

---

##  Recursos y siguiente paso

- **Herramientas:** `unsloth` (rápido y gratis en Colab), `axolotl` (configuración simple), `LLaMA-Factory` (interfaz visual).
- **Plataformas de entrenamiento:** Google Colab (T4 gratis), RunPod, Lambda Labs (GPUs baratas por hora).
- **Conceptos:** "Supervised Fine-Tuning (SFT)", "DPO (Direct Preference Optimization)" para alinear con preferencias humanas.
- **Siguiente capítulo:** Frameworks de Orquestación (LangChain, LlamaIndex, DSPy): cómo construir aplicaciones complejas uniendo todas estas piezas.
