---
id: primeros pasos-con-ia
title: 'Capítulo 1: Primeros pasos con la Inteligencia Artificial'
sidebar_label: '1. Primeros pasos'
sidebar_position: 1
---
# Capítulo 1: Primeros pasos con la Inteligencia Artificial

## 🎯 Objetivos de aprendizaje
- Comprender qué es la IA y diferenciarla de conceptos relacionados (ML, DL, LLMs)
- Conocer los tipos de IA y sus niveles de sofisticación
- Entender el ciclo de vida de un proyecto de IA
- Identificar casos de uso reales y limitaciones actuales

---

## 🧠 Modelo mental: ¿Qué es realmente la IA?

La **Inteligencia Artificial** es la capacidad de una máquina para realizar tareas que normalmente requieren inteligencia humana: razonamiento, aprendizaje, percepción, toma de decisiones y comprensión del lenguaje.

**Analogía:** Imagina enseñarle a un niño a reconocer animales. Primero le muestras fotos (datos), luego le dices "esto es un gato", "esto es un perro" (entrenamiento). Con el tiempo, el niño identifica patrones (orejas puntiagudas = gato) y puede reconocer animales nuevos. La IA funciona igual, pero a escala masiva y con matemáticas.

---

## 📊 Tipos de IA: del débil al fuerte

| Tipo | Definición | Ejemplo actual | Estado |
|------|------------|----------------|--------|
| **IA Débil (Narrow AI)** | Especializada en una tarea específica | ChatGPT, DALL-E, AlphaGo, recomendaciones de Netflix | ✅ Existe y domina el mercado |
| **IA General (AGI)** | Inteligencia humana completa, capaz de aprender cualquier tarea | - | 🔬 Investigación activa (10-50 años) |
| **Superinteligencia** | Supera la inteligencia humana en todas las dimensiones | - | 🤔 Teórico/filosófico |

---

## 🔧 Subcampos de la IA (jerarquía práctica)

| Tipo | Definición | Ejemplo actual | Estado |
|------|------------|----------------|--------|
| **Machine Learning (ML)** | Sistemas que aprenden patrones a partir de datos | Aprendizaje Supervisado, No Supervisado y por Refuerzo | ✅ Base fundamental de la IA moderna |
| **Deep Learning (DL)** | Redes neuronales profundas para tareas complejas | CNN (Imágenes), RNN/LSTM (Secuencias), Transformers | ✅ Tecnología de vanguardia activa |
| **NLP (Procesamiento de Lenguaje)** | Interacción entre computadoras y lenguaje humano | LLMs (GPT, Claude, Gemini), Traducción, Análisis de sentimientos | ✅ En constante evolución y despliegue |


---

## 🔄 Ciclo de vida de un proyecto de IA

1. **Definición del problema:** ¿Qué queremos resolver? ¿Es viable con IA?
2. **Recolección de datos:** Obtener datos relevantes, limpios y etiquetados
3. **Preparación:** Limpieza, normalización, división (train/validation/test)
4. **Selección del modelo:** Elegir arquitectura según el problema
5. **Entrenamiento:** Ajustar parámetros con datos de entrenamiento
6. **Evaluación:** Medir precisión, recall, F1-score, métricas de negocio
7. **Despliegue:** Poner el modelo en producción (API, batch, edge)
8. **Monitoreo:** Detectar drift, degradación, sesgos, costos
9. **Mantenimiento:** Retrenar, actualizar, versionar

**Regla 80/20:** 80% del tiempo se va en datos, 20% en el modelo.

---

## ⚖️ Matriz de decisiones: ¿Cuándo usar IA?

| Escenario | ¿Usar IA? | Alternativa si NO |
|-----------|-----------|-------------------|
| Reglas claras y deterministas | ❌ No | Código tradicional (if/else) |
| Patrones complejos en datos históricos | ✅ Sí | ML supervisado |
| Clasificación de imágenes/texto | ✅ Sí | DL (CNN o Transformers) |
| Predicción numérica (ventas, demanda) | ✅ Sí | Regresión, series de tiempo |
| Tarea creativa (texto, imágenes) | ✅ Sí | LLMs o modelos generativos |
| Datos insuficientes (`<1000` ejemplos) | ⚠️ Depende | Fine-tuning, few-shot learning |
| Explicabilidad crítica (legal, médico) | ⚠️ Cuidado | Modelos interpretables (árboles, regresión) |

---

## ⚠️ Mitos vs Realidad

| Mito | Realidad |
|------|----------|
| "La IA lo puede todo" | Solo funciona bien en tareas específicas con datos suficientes |
| "Los modelos son objetivos" | Heredan sesgos de los datos de entrenamiento |
| "Más datos = mejor siempre" | Datos limpios y relevantes > cantidad bruta |
| "Un modelo entrenado sirve para siempre" | Sufre *drift*: los datos cambian, el modelo se degrada |
| "IA = Deep Learning" | DL es solo una herramienta; a veces una regresión lineal es suficiente |

---

## 🛡️ Checklist antes de iniciar un proyecto de IA

- [ ] ¿El problema está bien definido y es medible?
- [ ] ¿Tenemos datos suficientes, limpios y etiquetados?
- [ ] ¿Existe una línea base simple (reglas, promedio) para comparar?
- [ ] ¿Qué métrica de éxito usaremos? (precisión, ROI, tiempo ahorrado)
- [ ] ¿Hay implicaciones éticas o de sesgo?
- [ ] ¿Cómo monitorearemos el modelo en producción?
- [ ] ¿Qué pasa si el modelo falla? ¿Hay fallback?

---

## 🔗 Puente al código: arquitectura conceptual

Cuando implementes un sistema de IA, esta es la estructura mínima:

1. **Capa de datos:** Almacenamiento (DB, data lake), versionado (DVC), calidad (validación)
2. **Capa de features:** Transformación, normalización, ingeniería de características
3. **Capa de modelo:** Entrenamiento, validación, serialización (pickle, ONNX)
4. **Capa de inferencia:** API REST/gRPC, batch processing, edge deployment
5. **Capa de monitoreo:** Métricas de rendimiento, drift detection, logs, alertas

**Herramientas típicas:** Python, scikit-learn, PyTorch/TensorFlow, MLflow, FastAPI, Docker, Kubernetes.

---

## 🧪 Laboratorio conceptual

1. Piensa en 3 tareas que realizas diariamente (trabajo o vida personal)
2. Para cada una, pregúntate:
   - ¿Requiere reconocimiento de patrones?
   - ¿Hay datos históricos disponibles?
   - ¿Las reglas son claras o ambiguas?
3. Clasifícalas: ¿automatizable con reglas? ¿requiere ML? ¿necesita IA avanzada?
4. Investiga: ¿existen herramientas de IA ya hechas para esas tareas?

---

## 📚 Recursos y siguiente paso

- **Libros:** "Artificial Intelligence: A Guide for Thinking Humans" (Melanie Mitchell)
- **Cursos:** Andrew Ng - "Machine Learning" (Coursera), "AI For Everyone"
- **Herramientas:** Google Colab (GPU gratis), Kaggle (datasets y competencias)
- **Siguiente capítulo:** Modelos y herramientas existentes: ChatGPT, Claude, Gemini, y cómo elegir el adecuado para cada caso de uso.
