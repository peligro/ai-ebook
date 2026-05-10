---
id: plataformas-de-hosting-de-modelos
title: 'Capítulo 3: Plataformas de Hosting de Modelos'
sidebar_label: '3. Plataformas'
sidebar_position: 3
---
# Capítulo 3: Plataformas de Hosting de Modelos

## 🎯 Objetivos de aprendizaje
- Comprender el concepto de "model hosting" y sus ventajas
- Conocer las principales plataformas (HuggingFace, Groq, Replicate, etc.)
- Entender diferencias entre inferencia serverless, dedicada y local
- Evaluar costos, latencia y escalabilidad de cada opción

---

## 🧠 Modelo mental: ¿Por qué usar plataformas de hosting?

Ejecutar modelos de IA requiere:
- **Hardware especializado:** GPUs/TPUs costosas ($5k-$50k)
- **Conocimiento técnico:** Docker, Kubernetes, optimización de inferencia
- **Mantenimiento:** Actualizaciones, parches de seguridad, monitoreo

Las **plataformas de hosting** abstraen toda esta complejidad: subes tu modelo (o usas uno existente) y obtienes una API REST lista en minutos, pagando solo por lo que usas.

**Analogía:** Es como alquilar un servidor en la nube vs. comprar y mantener tu propio datacenter.

---

## 🌐 Principales plataformas de hosting

### Hugging Face Inference

| Característica | Detalle |
|----------------|---------|
| **Modelos disponibles** | 500k+ modelos open-source (texto, imagen, audio, video) |
| **Tipos de inferencia** | Serverless (gratuito con límites), Dedicated Endpoints, Inference API |
| **Precios** | Free tier generoso, Pro $9/mes, Dedicated desde $0.06/hr |
| **Ventajas** | Ecosistema masivo, fácil de usar, comunidad activa |
| **Casos de uso** | Prototipado rápido, modelos personalizados, Spaces (demos) |

**Ejemplo de uso:**
```bash
# Inferencia serverless gratuita (rate limited)
curl https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b \
  -H "Authorization: Bearer HF_TOKEN" \
  -d '{"inputs": "Hola, ¿cómo estás?"}'
```


### Groq Cloud

| Característica | Detalle |
|----------------|---------|
| **Especialidad** | Inferencia ultra-rápida con LPU (Language Processing Unit) |
| **Modelos** | Llama 3, Mixtral, Gemma (optimizados para velocidad) |
| **Latencia** | 10-50x más rápido que GPUs tradicionales |
| **Precios** | Gratis en beta, luego pay-per-token competitivo |
| **Ventajas** | Velocidad extrema, ideal para chat en tiempo real |
| **Limitaciones** | Catálogo limitado de modelos, solo texto |


**Ejemplo de uso:**
```bash
# Groq API (compatible con OpenAI)
curl https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "llama3-8b-8192",
    "messages": [{"role": "user", "content": "Hola, ¿cómo estás?"}],
    "temperature": 0.7
  }'
```


### Replicate

| Característica | Detalle |
|----------------|---------|
| **Modelos** | 1000+ modelos (imágenes, video, audio, texto) |
| **Ejecución** | Serverless, auto-scaling, sin configuración |
| **Precios** | Pay-per-second de GPU (desde $0.00025/sec) |
| **Ventajas** | Fácil deployment, versión web, API simple |
| **Casos de uso** | Generación de imágenes (Stable Diffusion), video, audio |

**Ejemplo de uso:**
```bash
# Generar imagen con Stable Diffusion
curl -X POST https://api.replicate.com/v1/predictions \
  -H "Authorization: Token $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "version": "ac732df83cea7fff18b8472768c88ad041fa750ff76827a9ae7e87efefb5ff0d",
    "input": {"prompt": "A futuristic city at sunset, cyberpunk style"}
  }'
```


### Together AI

| Característica | Detalle |
|----------------|---------|
| **Modelos** | Llama, Mistral, Qwen, CodeLlama, etc. |
| **Infraestructura** | Cloud distribuida, GPUs dedicadas |
| **Precios** | Competitivo, descuentos por volumen |
| **Ventajas** | Fine-tuning integrado, alta disponibilidad |
| **Casos de uso** | Aplicaciones empresariales, alto volumen |

**Ejemplo de uso:**
```bash
# Together AI API (compatible con OpenAI)
curl https://api.together.xyz/v1/chat/completions \
  -H "Authorization: Bearer $TOGETHER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "meta-llama/Llama-3-8b-chat-hf",
    "messages": [{"role": "user", "content": "Explica qué es la IA"}],
    "max_tokens": 500
  }'
```

### Modal

| Característica | Detalle |
|----------------|---------|
| **Enfoque** | Infraestructura serverless para Python |
| **Flexibilidad** | Ejecuta cualquier código Python, no solo modelos |
| **Precios** | Pay-per-second, GPU desde $0.0005/sec |
| **Ventajas** | Control total, ideal para pipelines personalizados |
| **Casos de uso** | Batch processing, entrenamiento, inferencia custom |


**Ejemplo de uso:**
```python
# Definir función en Modal (Python)
import modal

stub = modal.Stub("mi-app-ia")

@stub.function(gpu="A10G")
@modal.web_endpoint(method="POST")
def inferencia(prompt: str):
    from transformers import pipeline
    classifier = pipeline("text-classification")
    return classifier(prompt)

# Deploy: modal deploy app.py
# Invocar: curl https://tu-username--mi-app-ia-inferencia.modal.run -d '{"prompt": "Hola"}'
```

### Banana.dev

| Característica | Detalle |
|----------------|---------|
| **Especialidad** | Deploy de modelos custom en GPUs serverless |
| **Soporte** | PyTorch, TensorFlow, ONNX, cualquier framework |
| **Precios** | Desde $0.0004/sec de GPU |
| **Ventajas** | Sin cold starts, auto-scaling, VPC privado |
| **Casos de uso** | Modelos propietarios, enterprise, compliance |


**Ejemplo de uso:**
```bash
# Banana.dev inference
curl https://app.banana.dev/v1/func \
  -H "X-API-Key: $BANANA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "modelKey": "tu-modelo-key",
    "json": {"prompt": "Genera un resumen del texto siguiente..."}
  }'
```



**Nota:** Los ejemplos usan variables de entorno (`$GROQ_API_KEY`, `$REPLICATE_API_TOKEN`, etc.) que debes configurar con tus credenciales reales.

