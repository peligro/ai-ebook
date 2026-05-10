---
id: mlops-para-ia
title: 'Capítulo 12: MLOps para IA'
sidebar_label: '12. MLOps'
sidebar_position: 12
---
# Capítulo 12: MLOps para IA

## 🎯 Objetivos de aprendizaje

- Diseñar pipelines de entrenamiento, despliegue y monitoreo de modelos
- Detectar drift, degradación y fallos silenciosos en modelos de IA
- Implementar versionado, CI/CD y observabilidad para sistemas basados en LLMs y ML

---

## 🧠 Modelo mental: ¿Qué es MLOps?

**MLOps (Machine Learning Operations)** es la disciplina que une **Data Science + Ingeniería + Operaciones**, asegurando que los modelos de IA:

- Lleguen a producción de forma confiable
- Se mantengan correctos con el tiempo
- Sean observables, auditables y reproducibles
- Escalen sin romper costos ni SLAs

**Analogía:**  
Si DevOps mantiene vivo un sistema backend clásico, MLOps mantiene vivo un sistema de IA **después** de entrenarlo.

Entrenar un modelo es el 10%.  
Mantenerlo funcionando correctamente durante meses o años es el 90%.

---

## 🔄 Ciclo de vida MLOps (end-to-end)

1. **Ingesta de datos**
2. **Validación y calidad**
3. **Entrenamiento**
4. **Evaluación**
5. **Registro de modelo**
6. **Despliegue**
7. **Monitoreo**
8. **Detección de drift**
9. **Retraining**
10. **Rollback / Versionado**

Un sistema de IA nunca está "terminado".

---

## 📊 Monitoreo de modelos en producción

### Qué debes monitorear (mínimo)

| Categoría | Métrica |
|-----------|---------|
| **Modelo** | accuracy, F1, BLEU, ROUGE, exact-match |
| **Datos** | distribución, nulls, outliers |
| **Inferencia** | latencia p95/p99 |
| **Costos** | tokens, GPU-hours, invocations |
| **Negocio** | CTR, conversión, errores |
| **Calidad** | feedback humano, fallos |

> Un modelo que no se monitorea **ya está roto**, solo no lo sabes aún.

---

## 🌊 Drift y degradación de modelos

### Tipos de drift

| Tipo | Qué cambia | Ejemplo |
|------|------------|---------|
| **Data Drift** | Distribución de entrada | Usuarios nuevos, idioma distinto |
| **Concept Drift** | Relación input → output | Cambia el significado de los datos |
| **Prediction Drift** | Salida del modelo | Bias creciente en respuestas |

### Señales de alerta

- Caída progresiva de métricas
- Aumento de fallback o "no sé"
- Feedback humano negativo
- Cambios estadísticos (KS-test, PSI)

---

## 🧪 Detección de drift (estrategias)

- Comparar distribución entrenamiento vs producción
- Ventanas temporales (sliding window)
- Tests estadísticos
- Embeddings + distancia (coseno)
- Evaluación humana periódica

---

## 🧩 Versionado: modelos, datos y prompts

### Qué versionar (todo)

| Elemento | Por qué |
|----------|---------|
| Dataset | Reproducibilidad |
| Modelo | Rollback |
| Prompt | Cambios sutiles rompen sistemas |
| Config | Latencia/costo |
| Código | Auditoría |

### Herramientas comunes

- MLflow (model registry)
- DVC (dataset versioning)
- Git (código + prompts)
- Weights & Biases

---

## 🚀 CI/CD para sistemas de IA

### Pipeline mínimo

1. Push a Git
2. Tests de datos
3. Tests de prompts
4. Evaluación automática
5. Canary deployment
6. Monitoreo

### Tests recomendados

- Tests de schema de datos
- Tests de salida (formato JSON)
- Tests de regresión semántica
- Tests de latencia y costo

---

## 🔍 Observabilidad y trazabilidad

### Qué registrar por request

- input / output
- tokens de entrada y salida
- modelo usado
- latencia
- costo estimado
- versión del prompt
- score de calidad

### Herramientas

- OpenTelemetry
- Langfuse
- Arize
- WhyLabs
- Prometheus + Grafana

---

## 🧯 Rollbacks y fallbacks

Todo sistema serio debe soportar:

- Fallback a modelo anterior
- Fallback a modelo más barato
- Fallback a respuesta estática
- Escalamiento humano

**Regla de oro:**  
Nunca despliegues sin forma de volver atrás en segundos.

---

## ⚠️ Pitfalls reales en MLOps

- No monitorear drift
- No versionar prompts
- Asumir que el modelo "aprendió"
- No estimar costos en producción
- CI/CD solo para código, no para modelos
- Falta de ownership claro

---

## 🛡️ Checklist de producción MLOps

- [ ] ¿Puedo reproducir un modelo exacto del pasado?
- [ ] ¿Detecto drift automáticamente?
- [ ] ¿Tengo métricas técnicas y de negocio?
- [ ] ¿Puedo hacer rollback inmediato?
- [ ] ¿Monitoreo costo real por usuario?
- [ ] ¿Registro prompts y outputs?
- [ ] ¿Hay intervención humana posible?

---

## 🔗 Puente al código: arquitectura conceptual

Pipeline de referencia:


### 🏗️ Arquitectura de Referencia MLOps

| Capa | Componente | Función Principal | Observabilidad / Control |
|:---:|:---|:---|:---|
| **1** | **Interface** | `Client` | Punto de entrada del usuario (Web/Mobile/App). |
| **2** | **Acceso** | `API / Gateway` | Autenticación, Rate Limiting y enrutamiento. |
| **3** | **Orquestación** | `Inference Service` | Lógica de negocio y manejo de la petición activa. |
| **4** | **Contexto** | `Feature Store / Vector DB` | Recuperación de datos frescos o embeddings (RAG). |
| **5** | **Cerebro** | `LLM / Model` | El modelo realizando la inferencia (In-house o API). |
| **6** | **Refinería** | `Post-processing` | Formateo de salida, guardrails y filtros de seguridad. |
| **7** | **Telemetría** | `Logs + Metrics + Traces` | Registro detallado de tokens, latencia y telemetría. |
| **8** | **Inteligencia** | `Monitoring / Alerts` | Detección de drift, anomalías y costos excesivos. |
| **9** | **Iteración** | `Retraining Pipeline` | Ciclo de mejora continua basado en datos de producción. |


---

## 🧪 Laboratorio conceptual

1. Imagina un chatbot en producción por 6 meses
2. ¿Qué métricas mirarías semanalmente?
3. ¿Cuándo reentrenarías?
4. ¿Qué harías si sube el costo x3?
5. ¿Cómo detectarías degradación silenciosa?

---

## 📚 Recursos y siguiente paso

- MLflow
- Weights & Biases
- Arize AI
- WhyLabs
- Google MLOps Whitepaper
- AWS SageMaker Pipelines

**Siguiente capítulo:**  
Seguridad y Ética en IA: ataques reales, riesgos legales y defensas prácticas.