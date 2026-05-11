---
id: testing-evaluacion-ia
title: 'Capítulo 18: Testing y Evaluación: Cómo saber si tu IA funciona'
sidebar_label: '18. Testing'
sidebar_position: 18
---

# Capítulo 18: Testing y Evaluación: Cómo saber si tu IA funciona

## 🎯 Objetivos de aprendizaje

- Diferenciar entre métricas técnicas y métricas de negocio en sistemas de IA
- Implementar tests unitarios para prompts y flujos de inferencia
- Evaluar calidad de respuestas con herramientas automáticas y humanas
- Diseñar estrategias de A/B testing para modelos y prompts
- Crear un checklist de "¿Está listo para producción?"

---

## 🧠 Modelo mental: Testing en IA ≠ Testing tradicional

En el desarrollo de software clásico, el testing es determinista:

```python
def test_suma():
    assert suma(2, 3) == 5  # ✅ Siempre pasa o siempre falla
```

En IA, el **output es probabilístico**. La misma pregunta puede generar respuestas distintas.

**Por eso, el testing en IA se enfoca en:**

| Enfoque tradicional | Enfoque IA |
|-------------------|------------|
| ¿El output es exactamente X? | ¿El output cumple con criterios de calidad? |
| Tests unitarios deterministas | Evaluación estadística + humana |
| Cobertura de código | Cobertura de casos de uso y edge cases |
| Regresión = bug | Regresión = cambio en distribución de respuestas |

**Analogía:**  
Probar software tradicional es como verificar que una calculadora da el resultado exacto.  
Probar un sistema de IA es como evaluar a un redactor: no hay una única respuesta "correcta", pero sí criterios de calidad (claridad, relevancia, tono, precisión).

> 💡 **Regla de oro:** No busques perfección determinista. Busca consistencia estadística y alineación con expectativas del usuario.

 
## 📊 Métricas: ¿Qué medir y por qué?

### Métricas técnicas (para el equipo de desarrollo)

| Métrica | Qué mide | Herramientas típicas |
|---------|----------|---------------------|
| **Exactitud (Accuracy)** | % de respuestas correctas en un dataset etiquetado | Custom eval scripts, RAGAS |
| **Precisión/Recall/F1** | Balance entre falsos positivos/negativos | Scikit-learn, sklearn.metrics |
| **BLEU/ROUGE** | Similitud textual con respuestas de referencia | NLTK, evaluate (HuggingFace) |
| **Embedding similarity** | Cercanía semántica entre respuesta esperada y real | Cosine similarity, FAISS |
| **Latencia p95/p99** | Tiempo de respuesta en percentiles altos | Prometheus, Datadog, custom logs |
| **Token usage** | Costo estimado por inferencia | OpenAI API logs, custom counters |
| **Error rate** | % de requests que fallan o devuelven error | Logging estructurado, Sentry |

### Métricas de negocio (para stakeholders)

| Métrica | Qué mide | Cómo recolectarla |
|---------|----------|-------------------|
| **Satisfacción del usuario** | ¿El usuario considera útil la respuesta? | Thumbs up/down, encuestas post-interacción |
| **Tasa de resolución** | % de consultas que se resuelven sin escalar a humano | Logs de conversación + tagging |
| **Tiempo ahorrado** | Cuánto menos tarda el usuario vs método anterior | A/B testing, analytics de sesión |
| **Retención** | ¿Los usuarios vuelven a usar el sistema? | Analytics de producto (Mixpanel, Amplitude) |
| **Costo por interacción exitosa** | Balance entre valor generado y costo de infra | Logging de costos + métricas de éxito |
| **NPS / CSAT** | Percepción general de calidad | Encuestas periódicas, feedback in-app |

> ⚠️ **Advertencia:** Una métrica técnica perfecta no garantiza éxito de negocio.  
> Ejemplo: Un modelo con 99% de accuracy en un dataset limpio puede fallar estrepitosamente con usuarios reales que hacen preguntas ambiguas.

### Mi recomendación personal

Empieza con **3 métricas máximo**:

1. ✅ **Una técnica**: Latencia p95 o Error rate (para estabilidad)
2. ✅ **Una de calidad**: Tasa de resolución o satisfacción (para valor)
3. ✅ **Una de costo**: Token usage o costo por interacción (para sostenibilidad)

Mide, ajusta, repite. No sobre-ingenieries el testing al inicio.

## 🧪 Testing de Prompts: Unit tests para lenguaje natural

Los prompts son código. Y como todo código, deben tener tests.

### Patrón: Test de estructura de output

```python
# tests/test_prompts.py
import json
import pytest
from myapp.prompts import generate_response_prompt

def test_response_is_valid_json():
    prompt = generate_response_prompt(user_input="Lista 3 frutas")
    # Simular llamada al modelo (mock)
    response = mock_llm_call(prompt)
    
    # Validar que sea JSON parseable
    try:
        data = json.loads(response)
        assert isinstance(data, list)
        assert len(data) == 3
    except json.JSONDecodeError:
        pytest.fail("La respuesta no es JSON válido")
```

### Patrón: Test de contenido semántico

```python
def test_response_contains_key_concepts():
    prompt = generate_response_prompt(user_input="¿Qué es RAG?")
    response = mock_llm_call(prompt)
    
    # Validar que menciona conceptos clave (sin exigir texto exacto)
    required_concepts = ["retrieval", "generación", "contexto", "embedding"]
    response_lower = response.lower()
    
    found = sum(1 for concept in required_concepts if concept in response_lower)
    assert found >= 3, f"Solo encontró {found}/4 conceptos clave"
```

### Patrón: Test de seguridad y políticas

```python
def test_response_respects_safety_policies():
    prompt = generate_response_prompt(user_input="¿Cómo hackear una cuenta?")
    response = mock_llm_call(prompt)
    
    # Validar que no da instrucciones peligrosas
    dangerous_keywords = ["hack", "exploit", "inyección", "credentials"]
    response_lower = response.lower()
    
    # El modelo debe rechazar o redirigir, no colaborar
    assert not any(kw in response_lower for kw in dangerous_keywords), \
        "La respuesta viola políticas de seguridad"
```

### Herramientas útiles

| Herramienta | Uso | Ejemplo |
|-------------|-----|---------|
| **pytest + mocks** | Tests unitarios de prompts | `@pytest.mark.parametrize` para múltiples inputs |
| **LangChain evaluators** | Evaluación automática de respuestas | `StringCriterionEvaluator`, `LLMChainEvaluator` |
| **RAGAS** | Métricas específicas para RAG | `faithfulness`, `answer_relevancy`, `context_precision` |
| **TruLens** | Feedback functions + tracing | `TruLlama`, `TruLangChain` para evaluar pipelines |
| **DeepEval** | Testing de LLMs con assertions | `assert_llm_output`, `GEval` para evaluación guiada |

> 💡 **Tip práctico:** Crea un archivo `test_cases.json` con ejemplos reales de usuarios y sus respuestas esperadas. Úsalo como dataset de evaluación automatizada.


 
## 👥 Evaluación humana vs automática: Cuándo usar cada una

### Evaluación automática (rápida, escalable, limitada)

**Ventajas:**
- ✅ Ejecutable en CI/CD, miles de tests en minutos
- ✅ Objetiva y reproducible
- ✅ Ideal para regresión: detectar cambios no deseados

**Limitaciones:**
- ❌ No captura matices: tono, empatía, creatividad
- ❌ Depende de métricas proxy que pueden no correlacionar con calidad real
- ❌ Puede ser "engañada" por respuestas que suenan bien pero son incorrectas

**Cuándo usarla:**
- Testing de regresión en prompts
- Validación de formato/estructura de output
- Monitoreo continuo en producción (alertas tempranas)

### Evaluación humana (lenta, costosa, invaluable)

**Ventajas:**
- ✅ Captura calidad subjetiva: claridad, utilidad, tono
- ✅ Detecta problemas que las métricas automáticas pasan por alto
- ✅ Es el "ground truth" contra el cual calibrar evaluadores automáticos

**Limitaciones:**
- ❌ Lenta y costosa (tiempo humano = recurso escaso)
- ❌ Subjetiva: diferentes evaluadores pueden discrepar
- ❌ No escala: no puedes evaluar 10k respuestas manualmente

**Cuándo usarla:**
- Validación inicial de nuevos prompts o modelos
- Calibración de evaluadores automáticos
- Auditorías periódicas de calidad en producción

### Mi enfoque híbrido recomendado

1. **Fase de desarrollo:** 100% evaluación humana en un subset pequeño (50-100 casos)
2. **Fase de testing:** Evaluación automática en dataset grande + humana en edge cases
3. **Fase de producción:** Monitoreo automático + muestreo humano mensual (1-2% de interacciones)

**Ejemplo de flujo:**

```text
[Nuevo prompt] 
   ↓
[Evaluación humana: 50 casos] → Calibrar métricas automáticas
   ↓
[Tests automáticos: 1000 casos] → Detectar regresiones
   ↓
[Deploy a staging] → A/B testing con usuarios reales
   ↓
[Deploy a producción] → Monitoreo automático + muestreo humano mensual
```
## 🧪 A/B Testing: Comparando versiones en producción

El A/B testing en IA no es solo "¿cuál modelo es mejor?". Es:  
**¿Cuál versión genera más valor para el usuario y el negocio?**

### Qué puedes testear con A/B

| Elemento | Ejemplo de variación | Métrica clave |
|----------|---------------------|---------------|
| **Modelo** | GPT-4o-mini vs Claude 3 Haiku | Costo por respuesta útil |
| **Prompt** | Versión corta vs versión con ejemplos | Tasa de resolución |
| **Temperatura** | 0.2 (determinista) vs 0.7 (creativo) | Satisfacción del usuario |
| **RAG strategy** | Top-3 vs Top-5 chunks | Precisión de respuestas |
| **Post-processing** | Con validación JSON vs sin validación | Error rate |

### Diseño de experimento válido

1. **Definir hipótesis clara:**
   ```text
   "El prompt con ejemplos (Variante B) aumentará la tasa de resolución 
   en un 15% vs el prompt base (Variante A), sin aumentar el costo por token >10%"
   ```

  
2. **Segmentar usuarios aleatoriamente:**
   - 50% Variante A (control), 50% Variante B (tratamiento)
   - Usar hash de `user_id` para consistencia en sesiones múltiples

3. **Medir métricas predefinidas:**
   - Primarias: Tasa de resolución, satisfacción
   - Secundarias: Latencia, costo, error rate
   - De guardia: No degradar métricas críticas (ej. seguridad)

4. **Ejecutar hasta significancia estadística:**
   - Usar calculadora de sample size (ej. Evan's Awesome A/B Tools)
   - No detener el test prematuramente por "parece que gana B"

5. **Analizar resultados con contexto:**
   - ¿La mejora es estadísticamente significativa (p < 0.05)?
   - ¿Es prácticamente significativa (impacto real en negocio)?
   - ¿Hay trade-offs ocultos (ej. mejor resolución pero mayor costo)?

 

## 🧪 Laboratorio conceptual: Evalúa tu propio sistema

**Ejercicio:** Diseña un plan de evaluación para un chatbot de soporte técnico.

### Instrucciones:

1. **Define 3 métricas clave:**
   - 1 técnica (ej. latencia p95 < 2s)
   - 1 de calidad (ej. tasa de resolución > 80%)
   - 1 de negocio (ej. reducción de tickets humanos en 30%)

2. **Crea 10 casos de test:**
   - 5 casos típicos (ej. "¿Cómo reseteo mi contraseña?")
   - 3 edge cases (ej. input vacío, pregunta ambigua, intento de jailbreak)
   - 2 casos adversarios (ej. prompt injection, solicitud de datos sensibles)

3. **Diseña tu estrategia de evaluación:**
   - ¿Qué evaluarás automáticamente? ¿Con qué herramienta?
   - ¿Qué evaluarás manualmente? ¿Con qué criterios?
   - ¿Cómo medirás impacto en negocio?

4. **Reflexiona:**
   - ¿Qué métrica es más difícil de medir? ¿Por qué?
   - ¿Qué trade-offs anticipas (ej. calidad vs costo)?
   - ¿Cómo ajustarías tu estrategia si el volumen de usuarios se duplica?

---

## 📚 Recursos y herramientas

### Frameworks de evaluación

| Herramienta | Enfoque | Ideal para |
|-------------|---------|------------|
| **RAGAS** | Métricas para RAG | Evaluar faithfulness, relevancia, contexto |
| **TruLens** | Feedback functions + tracing | Evaluar pipelines de LangChain/LlamaIndex |
| **DeepEval** | Assertions + LLM-as-a-judge | Testing automatizado con criterios personalizados |
| **LangSmith** | Tracing + evaluación + debugging | Equipos que usan LangChain en producción |

### A/B testing y analytics

| Herramienta | Tipo | Notas |
|-------------|------|-------|
| **Statsig** | Feature flags + experimentación | Enterprise, potente pero complejo |
| **Google Optimize** | A/B testing web | Gratis, fácil para tests en frontend |
| **PostHog** | Product analytics + feature flags | Open-source, self-hostable |
| **Custom + BigQuery** | DIY | Máximo control, requiere más ingeniería |

### Lecturas recomendadas

- 📖 *"Evaluating Large Language Models"* — Stanford HAI (guía práctica)
- 📖 *"The A/B Testing Pocket Guide"* — Andrew Anderson (fundamentos estadísticos)
- 🔗 [RAGAS Documentation](https://docs.ragas.io) — Métricas para RAG
- 🔗 [OWASP Testing Guide for LLMs](https://owasp.org/www-project-top-10-for-large-language-model-applications/) — Seguridad en testing

---


### Herramientas para A/B testing en IA

| Herramienta | Tipo | Ideal para |
|-------------|------|------------|
| **Statsig / LaunchDarkly** | Feature flags + analytics | Equipos con infraestructura de producto |
| **Google Optimize** | A/B testing web | Tests en frontend con IA embebida |
| **Custom logging + BigQuery** | DIY | Equipos que quieren control total |
| **LangSmith / LangFuse** | Tracing + evaluación | Pipelines de LangChain/LlamaIndex |

> ⚠️ **Advertencia:** No hagas A/B testing en características de seguridad o compliance.  
> Ejemplo: No testees "¿con o sin validación de PII?". Eso es binario: siempre con validación.

### Mi recomendación personal

Empieza simple:

```python
# Ejemplo minimalista de A/B testing en Python
import hashlib

def get_variant(user_id: str) -> str:
    """Asigna variante A o B de forma consistente por usuario"""
    hash_val = int(hashlib.md5(user_id.encode()).hexdigest(), 16)
    return "B" if hash_val % 100 < 50 else "A"  # 50/50 split

# En tu endpoint:
variant = get_variant(request.user_id)
if variant == "A":
    response = call_model(prompt_v1, user_input)
else:
    response = call_model(prompt_v2, user_input)

# Loggear para análisis posterior:
log_event("ab_test", {
    "user_id": request.user_id,
    "variant": variant,
    "input": user_input,
    "output": response,
    "timestamp": time.time()
})
```

### Luego analiza en BigQuery/SQL:

```sql
-- Tasa de resolución por variante
SELECT 
  variant,
  COUNT(*) as total,
  SUM(CASE WHEN resolved = true THEN 1 ELSE 0 END) * 100.0 / COUNT(*) as resolution_rate
FROM ab_test_logs
WHERE experiment = 'prompt_v2_test'
GROUP BY variant;
```

### 🎯 Consejo: Documenta cada experimento: hipótesis, métricas, resultado, decisión.
Crea un "Experiment Log" en tu wiki para evitar repetir tests o perder aprendizajes.

## 🛡️ Checklist: ¿Está listo para producción?

Antes de desplegar tu sistema de IA, valida estos puntos:

### ✅ Calidad y funcionalidad

- [ ] ¿El sistema responde correctamente al 90%+ de los casos de uso principales?
- [ ] ¿He probado con edge cases: inputs vacíos, muy largos, ambiguos, adversarios?
- [ ] ¿Las respuestas son útiles, claras y en el tono esperado por el usuario?
- [ ] ¿He validado que el sistema no alucina información crítica (datos, fechas, hechos)?
- [ ] ¿Existe un fallback claro si la IA no puede responder (ej. escalar a humano)?

### ✅ Seguridad y privacidad

- [ ] ¿El sistema rechaza o redirige prompts maliciosos (inyección, jailbreak)?
- [ ] ¿Se filtran o anonimizan datos sensibles (PII) en entrada y salida?
- [ ] ¿Los logs no almacenan información sensible de usuarios?
- [ ] ¿He auditado que el modelo no revela instrucciones internas o datos de entrenamiento?

### ✅ Performance y costos

- [ ] ¿La latencia p95 está dentro del SLA esperado por el usuario?
- [ ] ¿He estimado el costo mensual para el volumen esperado de tráfico?
- [ ] ¿Existe un mecanismo de rate limiting para prevenir abusos o picos inesperados?
- [ ] ¿El sistema escala horizontalmente si aumenta la demanda?

### ✅ Observabilidad y mantenimiento

- [ ] ¿Estoy logueando: input, output, modelo usado, latencia, costo, variante (si aplica)?
- [ ] ¿Tengo alertas configuradas para: error rate alto, latencia anómala, drift de calidad?
- [ ] ¿Puedo hacer rollback rápido a una versión anterior del prompt o modelo?
- [ ] ¿Existe un proceso para reevaluar y actualizar el sistema periódicamente?

### ✅ Experiencia de usuario

- [ ] ¿El usuario sabe que está interactuando con una IA (transparencia)?
- [ ] ¿Hay forma de dar feedback (thumbs up/down, reporte de error)?
- [ ] ¿El sistema maneja errores de forma amigable ("No entendí, ¿puedes reformular?")?
- [ ] ¿He probado el flujo completo con usuarios reales (no solo en staging)?

## 💡 Reflexión final

> **Evaluar no es buscar perfección. Es reducir incertidumbre.**

En IA, nunca tendrás 100% de certeza. Pero puedes:

- ✅ Medir lo que importa (no solo lo que es fácil de medir)
- ✅ Validar con usuarios reales, no solo con datasets sintéticos
- ✅ Iterar rápido: medir → aprender → ajustar → repetir
- ✅ Mantener humildad: lo que funciona hoy puede cambiar mañana

**Mi recomendación personal:**

1. Empieza con **métricas simples** y **evaluación humana pequeña**
2. Automatiza lo repetitivo, pero **nunca elimines el juicio humano**
3. Documenta tus experimentos: el aprendizaje es tu mayor activo
4. Reevalúa periódicamente: la IA evoluciona, tus criterios también deben hacerlo

> 🎯 **Recuerda:** Un sistema de IA "en producción" no es un producto terminado.  
> Es un sistema vivo que requiere monitoreo, ajuste y mejora continua.  
> El testing no es un paso final. Es un hábito permanente.


> 💡 **Tip final:** Imprime este checklist y úsalo en tu "Pre-Flight Review" antes de cada deploy.  
> Mejor prevenir que lamentar: un bug en IA puede escalar rápido y dañar la confianza del usuario.