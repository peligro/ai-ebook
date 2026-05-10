---
id: escalabilidad-y-costos
title: 'Capítulo 15: Escalabilidad y Costos'
sidebar_label: '15. Escalabilidad'
sidebar_position: 15
---
# Capítulo 15: Escalabilidad y Costos

## 🎯 Objetivos de aprendizaje

- Diseñar arquitecturas escalables para sistemas de IA en producción
- Optimizar costos de inferencia, almacenamiento y entrenamiento
- Implementar estrategias de cache, batching y auto-scaling
- Evaluar trade-offs entre latencia, costo y calidad
- Planificar estrategias multi-cloud y disaster recovery

---

## 🧠 Modelo mental: Escalar IA no es escalar software tradicional

Escalar una aplicación web clásica suele ser lineal: más tráfico → más instancias → más costo proporcional.

Escalar IA es **no lineal y exponencial**:

- Un prompt 2x más largo puede costar 4x más (tokens² en atención)
- Un modelo 2x más grande puede costar 10x más en GPU y latencia
- Un vector DB con 10x más datos puede requerir 100x más RAM si el índice no está optimizado

**Analogía:**  
Escalar software tradicional es como añadir más carriles a una autopista.  
Escalando IA es como enseñar a más conductores a manejar: no basta con más recursos, necesitas mejores reglas, entrenamiento y coordinación.

---

## 🏗️ Arquitecturas escalables para IA

### Patrones de escalabilidad

| Patrón | Cuándo usarlo | Ventaja | Desafío |
|--------|---------------|---------|---------|
| **Horizontal scaling** | Alto volumen de requests paralelos | Escala lineal, fault-tolerant | Balanceo de carga, consistencia |
| **Vertical scaling** | Modelos grandes que no se distribuyen | Simple de implementar | Límite físico de hardware, costo |
| **Async processing** | Tareas no críticas en tiempo real | Mejora latencia percibida, maneja picos | Complejidad de colas, retries |
| **Edge inference** | Baja latencia, privacidad, offline | Respuesta `&lt;50ms`, sin dependencia cloud | Hardware limitado, actualizaciones |
| **Hybrid cloud** | Compliance + escalabilidad | Flexibilidad, control de costos | Complejidad operativa, data gravity |

 
### 🏗️ Arquitectura de Referencia Escalable

| Capa | Componente | Lógica de Escalabilidad | Stack Sugerido |
|:---:|:---|:---|:---|
| **1** | **Ingreso** | `API Gateway + Rate Limiting` | Kong, AWS API GW, Nginx |
| **2** | **Capa Inteligente** | `Router de Modelos` | Lógica de routing: ¿Simple (CPU) o Complejo (GPU)? |
| **3** | **Cómputo** | `Inference Cluster` | Pools separados: GPU (H100) / CPU / Edge Nodes |
| **4** | **Aceleración** | `Cache Layer` | Redis/Memcached (TTL dinámico por tipo de prompt) |
| **5** | **Datos** | `Vector DB + Store` | Qdrant, pgvector (Sharding por tenant/región) |
| **6** | **Control** | `Observability Pipeline` | Prometheus (Métricas), Loki (Logs), Jaeger (Trazas) |


---

## 💰 Optimización de costos en producción

### Desglose típico de costos en un sistema de IA

| Componente | % del costo total | Estrategias de optimización |
|------------|-------------------|----------------------------|
| **Inferencia (LLM)** | 40-70% | Model routing, cache, batching, quantization |
| **GPU/TPU instances** | 20-40% | Spot instances, auto-scaling, right-sizing |
| **Vector DB / Storage** | 5-15% | Compresión, tiering, índices aproximados |
| **Data transfer** | 5-10% | CDN, regiones cercanas, compresión |
| **Monitoreo / Logs** | 2-5% | Sampling, retención inteligente |

### Estrategias probadas para reducir costos

**1. Model Routing inteligente:**
```python
def route_model(prompt: str, user_tier: str) -> str:
    if user_tier == "free" and len(prompt) < 200:
        return "gpt-3.5-turbo"  # $0.50/1M tokens
    elif "código" in prompt or "razonamiento" in prompt:
        return "gpt-4"  # $30/1M tokens
    else:
        return "claude-3-haiku"  # $0.25/1M tokens
```

**2. Cache estratégico:**
- Cache de prompts idénticos (hash del input)
- Cache semántico: embeddings + búsqueda vectorial para prompts similares
- TTL dinámico: respuestas de noticias (5 min) vs. documentación (24h)

**3. Batching de inferencia:**
- Agrupar requests que llegan en ventanas de 50-200ms
- Procesar en lote en GPU → 3-10x más throughput
- Trade-off: +latencia promedio, -costo por request

**4. Quantization y optimización de modelos:**
- Convertir modelos a INT8/INT4 (GGUF, AWQ, GPTQ)
- Reduce VRAM 2-4x, acelera inferencia 1.5-3x
- Pérdida de calidad mínima (mayor de 2% en benchmarks)

**5. Early exit y speculative decoding:**
- Modelos con capas "salida temprana" para respuestas simples
- Usar modelo pequeño para generar borrador, modelo grande para verificar
- Reduce tokens generados en 30-60%

---

## ⚡ Cache y optimización de inferencia

### Estrategias de cache por capa

| Capa | Qué cachear | Herramienta | TTL típico |
|------|-------------|-------------|------------|
| **Prompt** | Respuestas a preguntas frecuentes | Redis, Cloudflare KV | 1h - 7d |
| **Embedding** | Vectores de documentos estáticos | Redis, pgvector | Inmutable |
| **RAG Context** | Resultados de retrieval para queries comunes | Qdrant + Redis | 1h - 24h |
| **Model Output** | Respuestas finales (con hash de contexto) | Redis, S3 + CDN | 1h - 30d |

### Patrón de cache con fallback

```python
import hashlib
import redis

def get_with_cache(prompt: str, context_hash: str, model: str, generate_fn):
    # Generar clave única
    cache_key = hashlib.sha256(f"{prompt}:{context_hash}:{model}".encode()).hexdigest()
    
    # Intentar cache
    cached = redis_client.get(cache_key)
    if cached:
        metrics.cache_hit.inc()
        return json.loads(cached)
    
    # Generar respuesta
    response = generate_fn(prompt, context_hash, model)
    
    # Guardar en cache (solo si es exitosa y no contiene PII)
    if response.get("status") == "ok" and not contains_pii(response):
        redis_client.setex(cache_key, ttl=3600, value=json.dumps(response))
    
    metrics.cache_miss.inc()
    return response
```

### Cuándo NO cachear

- Respuestas con datos personales o sensibles
- Resultados que dependen de tiempo real (noticias, precios, stock)
- Prompts con alta variabilidad (chat conversacional)
- Respuestas que requieren frescura garantizada (SLA de actualización)

---

## 🔄 Load balancing y auto-scaling

### Estrategias de balanceo para IA

| Estrategia | Descripción | Cuándo usarla |
|------------|-------------|---------------|
| **Round-robin** | Distribución equitativa | Clusters homogéneos, carga estable |
| **Least connections** | Envía al nodo con menos requests activos | Latencia variable, modelos de distinto tamaño |
| **Weighted** | Asigna peso por capacidad (GPU RAM, throughput) | Clusters heterogéneos (A10 + A100) |
| **Latency-based** | Envía al nodo con menor latencia histórica | Usuarios distribuidos globalmente |
| **Model-aware** | Router decide según tipo de prompt | Multi-modelo, costos muy distintos |

### Auto-scaling con métricas de IA

No escalar solo por CPU/RAM. Usar métricas específicas:

```yaml
# Ejemplo: Kubernetes HPA con métricas custom
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: inference-scaler
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: inference-service
  minReplicas: 2
  maxReplicas: 20
  metrics:
  - type: Pods
    pods:
      metric:
        name: requests_per_second
      target:
        type: AverageValue
        averageValue: 50  # Escalar si >50 RPS por pod
  - type: External
    external:
      metric:
        name: gpu_utilization
      target:
        type: AverageValue
        averageValue: 70  # Escalar si GPU >70%
  - type: External
    external:
      metric:
        name: p95_latency_ms
      target:
        type: Value
        value: 800  # Escalar si latencia p95 >800ms
```

### Cold start mitigation

- **Provisioned concurrency:** Mantener N instancias "calientes" siempre
- **Warm-up requests:** Enviar pings periódicos a instancias inactivas
- **Predictive scaling:** Usar historial para pre-escalar antes de picos conocidos

---

## 🌍 Multi-cloud y disaster recovery

### Por qué considerar multi-cloud para IA

| Razón | Beneficio | Complejidad añadida |
|-------|-----------|---------------------|
| **Evitar vendor lock-in** | Negociación, portabilidad | Abstracción de APIs, config management |
| **Compliance regional** | Datos en región específica | Replicación, consistencia, costos de egress |
| **Resiliencia** | Si un cloud cae, otro responde | Orquestación, health checks, failover automático |
| **Costos optimizados** | Usar el cloud más barato por servicio | Facturación fragmentada, monitoreo unificado |

### Patrón de failover para inferencia

```text
[Client]
    ↓
[Global Load Balancer] (Cloudflare, Route53)
    ├── Primary: AWS us-east-1 (Bedrock + SageMaker)
    └── Secondary: GCP europe-west1 (Vertex AI)
    
[Health Check] cada 10s:
    - Latencia p95 < 1s
    - Error rate < 1%
    - GPU availability > 80%

[Failover automático] si:
    - 3 health checks fallan consecutivos
    - O error rate > 10% por 1 minuto
    
[Post-failover]:
    - Notificar al equipo (PagerDuty)
    - Registrar métricas de downtime
    - Reintentar recuperación del primary cada 5 min
```

### Checklist de disaster recovery

- [ ] ¿Tengo réplica de modelos en al menos 2 regiones?
- [ ] ¿Los datos críticos (vector DB, logs) se replican asíncronamente?
- [ ] ¿El failover es automático o requiere intervención manual?
- [ ] ¿He probado el DR plan en los últimos 6 meses?
- [ ] ¿Conozco mi RTO (Recovery Time Objective) y RPO (Recovery Point Objective)?
- [ ] ¿Los costos de DR están presupuestados (réplicas inactivas, egress)?

---

## ⚠️ Pitfalls reales en escalabilidad y costos

- **Escalar antes de medir:** Añadir GPUs sin saber si el cuello de botella es la red, el disco o el modelo.
- **Cache mal invalidado:** Respuestas obsoletas que generan errores en cascada.
- **Batching excesivo:** Mejora throughput pero degrada latencia para usuarios reales.
- **Spot instances sin fallback:** Ahorro 70% pero el modelo se cae cuando AWS reclaima la instancia.
- **Multi-cloud sin abstracción:** Código duplicado, configs divergentes, debugging imposible.
- **Ignorar costos de egress:** Mover 1TB entre clouds puede costar $90; diseñar para minimizar transferencia.

---

## 🛡️ Checklist de producción (Escalabilidad y Costos)

- [ ] ¿He medido el costo real por request (tokens + GPU + red + storage)?
- [ ] ¿Tengo alertas de costo (diarias/semanales) con umbrales definidos?
- [ ] ¿El sistema escala automáticamente ante picos de tráfico?
- [ ] ¿He implementado cache para prompts frecuentes y embeddings?
- [ ] ¿Existe un plan de fallback si el proveedor principal falla?
- [ ] ¿Los modelos están optimizados (quantization, pruning) para producción?
- [ ] ¿Monitoreo latencia p50/p95/p99 por modelo y región?
- [ ] ¿Tengo capacidad de hacer rollback rápido si un cambio degrada performance/costo?

---

## 🔗 Puente al código: arquitectura de costos

```python
# Ejemplo: Tracker de costos en tiempo real
class CostTracker:
    def __init__(self, pricing: dict):
        self.pricing = pricing  # {model: {input: $/1k, output: $/1k}}
        self.redis = redis.Redis()
    
    def track(self, model: str, input_tokens: int, output_tokens: int, user_id: str):
        cost = (
            input_tokens * self.pricing[model]["input"] / 1000 +
            output_tokens * self.pricing[model]["output"] / 1000
        )
        
        # Acumular por usuario y por día
        today = datetime.utcnow().date()
        self.redis.hincrbyfloat(f"cost:{user_id}:{today}", model, cost)
        
        # Alerta si supera umbral diario
        daily_total = sum(float(v) for v in self.redis.hgetall(f"cost:{user_id}:{today}").values())
        if daily_total > DAILY_BUDGET[user_id]:
            send_alert(f"️ Usuario {user_id} superó presupuesto: ${daily_total:.2f}")
        
        return cost
```

---

## 🧪 Laboratorio conceptual

1. **Simulación de costos:**  
   Toma tu caso de uso real (ej. chatbot con 10k usuarios/día).  
   - Estima tokens promedio por request (input + output).  
   - Calcula costo mensual con GPT-4 vs. GPT-3.5 vs. Llama 3 self-hosted.  
   - ¿En qué punto el self-hosted se vuelve más barato? (considera GPU, mantenimiento, electricidad).

2. **Diseño de cache:**  
   Para tu aplicación:  
   - ¿Qué prompts son repetitivos y cacheables?  
   - ¿Qué TTL usarías para cada tipo?  
   - ¿Cómo invalidarías el cache si actualizas tu documentación?

3. **Plan de escalado:**  
   Imagina que tu tráfico crece 10x en 1 mes:  
   - ¿Qué componente se rompería primero?  
   - ¿Qué escalarías primero: GPU, RAM, ancho de banda, vector DB?  
   - ¿Qué métricas monitorearías para detectar el cuello de botella?

---

##  Recursos y siguiente paso

- **Herramientas de monitoreo de costos:**  
  - [CloudZero](https://www.cloudzero.com), [Infracost](https://www.infracost.io), [Kubecost](https://www.kubecost.com)

- **Optimización de modelos:**  
  - [GGUF format](https://github.com/ggerganov/ggml), [AWQ](https://github.com/mit-han-lab/llm-awq), [vLLM](https://vllm.ai)

- **Patrones de arquitectura:**  
  - AWS Well-Architected Framework: ML Lens  
  - Google Cloud: MLOps Design Patterns  
  - Azure: Responsible AI + Scalability Guidelines

- **Calculadoras de costos:**  
  - [OpenAI Pricing Calculator](https://openai.com/pricing)  
  - [Anthropic Token Calculator](https://www.anthropic.com/pricing)  
  - [Cloud GPU Cost Comparisons](https://vast.ai)

**Próximos pasos del ebook:**  
✅ Completados: Capítulos 1-14  
📋 Pendientes: Apéndices (Glosario, Comparativas, Checklist Maestra, Recursos, Plantillas)

**¡Felicidades!** Has completado la parte técnica del ebook. Los apéndices te darán herramientas prácticas para aplicar todo lo aprendido.