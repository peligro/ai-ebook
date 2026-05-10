---
id: ia-en-la-nube
title: 'Capítulo 4: IA en la Nube (AWS, Azure, Google Cloud)'
sidebar_label: '4. IA en la Nube'
sidebar_position: 4
---
# Capítulo 4: IA en la Nube (AWS, Azure, Google Cloud)

## 🎯 Objetivos de aprendizaje
- Conocer los servicios de IA gestionada de los principales cloud providers
- Entender diferencias entre APIs gestionadas y modelos self-hosted en la nube
- Evaluar costos, seguridad y compliance de cada plataforma
- Diseñar arquitecturas escalables y empresariales con IA

---

## 🧠 Modelo mental: ¿Por qué usar IA en la nube?

Las empresas enfrentan desafíos que las APIs públicas no resuelven:
- **Compliance:** GDPR, HIPAA, SOC2 requieren control total de datos
- **Seguridad:** Datos sensibles no pueden salir de VPC privadas
- **Escalabilidad:** Miles de requests/segundo con SLA garantizado
- **Integración:** Conectar con bases de datos, colas, autenticación corporativa
- **Costos predecibles:** Presupuestos anuales, no sorpresas mensuales

Los **cloud providers** ofrecen IA gestionada dentro de su infraestructura, con todas las garantías enterprise.

**Analogía:** Es como tener un datacenter privado con GPUs ilimitadas vs. usar una API pública compartida.

---

## 🌐 AWS (Amazon Web Services)

### Amazon Bedrock

| Característica | Detalle |
|----------------|---------|
| **Qué es** | Plataforma serverless para acceder a modelos fundacionales sin gestionar infraestructura |
| **Modelos disponibles** | Claude 3 (Anthropic), Llama 3 (Meta), Jurassic-2 (AI21), Command (Cohere), Titan (Amazon) |
| **Precios** | Pay-per-token, similar a APIs directas pero con descuento por volumen empresarial |
| **Ventajas** | Serverless, VPC endpoints, encryption, fine-tuning integrado, RAG nativo, guardrails de seguridad |
| **Casos de uso** | Chatbots empresariales, análisis de documentos sensibles, asistentes internos con compliance |

**Ejemplo de uso:**
```bash
# AWS CLI - Invocar Claude 3 desde Bedrock
aws bedrock-runtime invoke-model \
  --model-id anthropic.claude-3-sonnet-20240229-v1:0 \
  --body '{
    "anthropic_version": "bedrock-2023-05-31",
    "max_tokens": 1000,
    "messages": [{"role": "user", "content": "Hola, ¿cómo estás?"}]
  }' \
  --content-type "application/json" \
  output.json
```


### Amazon SageMaker

| Característica | Detalle |
|----------------|---------|
| **Qué es** | Plataforma completa para construir, entrenar y desplegar modelos custom de ML/DL |
| **Componentes** | SageMaker Studio (IDE), Training (GPUs/TPUs), Inference (auto-scaling), Pipelines (MLOps), Model Monitor |
| **Ventajas** | Control total del ciclo de vida, integración con S3/Lambda, spot instances (70% descuento), model registry |
| **Casos de uso** | Modelos propietarios, fine-tuning avanzado, pipelines de ML complejos |

**Ejemplo de uso:**
```python
# Python - Deploy de modelo en SageMaker
import sagemaker
from sagemaker.huggingface import HuggingFaceModel

# Crear modelo
huggingface_model = HuggingFaceModel(
    model_data="s3://mi-bucket/modelo.tar.gz",
    role="arn:aws:iam::123456789:role/sagemaker-role",
    transformers_version="4.26",
    pytorch_version="1.13",
    py_version="py39"
)

# Deploy a endpoint
predictor = huggingface_model.deploy(
    initial_instance_count=1,
    instance_type="ml.m5.xlarge"
)

# Invocar
response = predictor.predict({"inputs": "Hola, ¿cómo estás?"})

**Ejemplo de uso:**

```python
# Python - Deploy de modelo en SageMaker
import sagemaker
from sagemaker.huggingface import HuggingFaceModel

# Crear modelo
huggingface_model = HuggingFaceModel(
    model_data="s3://mi-bucket/modelo.tar.gz",
    role="arn:aws:iam::123456789:role/sagemaker-role",
    transformers_version="4.26",
    pytorch_version="1.13",
    py_version="py39"
)

# Deploy a endpoint
predictor = huggingface_model.deploy(
    initial_instance_count=1,
    instance_type="ml.m5.xlarge"
)

# Invocar
response = predictor.predict({"inputs": "Hola, ¿cómo estás?"})
```

### Azure Machine Learning

| Característica | Detalle |
|----------------|---------|
| **Qué es** | Plataforma de MLOps end-to-end para construir, entrenar y desplegar modelos de ML/DL |
| **Componentes** | Azure ML Studio (visual), AutoML, Designer (drag-and-drop), Kubernetes deployment, integración con Data Lake/Synapse/Power BI |
| **Ventajas** | Low-code/no-code, integración nativa con Microsoft ecosystem, MLOps maduro (CI/CD, versionado, monitoreo) |
| **Casos de uso** | Empresas que ya usan Azure, equipos con perfiles mixtos (data scientists + devs), pipelines empresariales |

**Ejemplo de uso:**
```python
# Python - Entrenar y desplegar modelo en Azure ML
from azure.ai.ml import MLClient, command
from azure.ai.ml.entities import Environment, Model
from azure.identity import DefaultAzureCredential

# Conectar al workspace
ml_client = MLClient(
    DefaultAzureCredential(),
    subscription_id="tu-subscription-id",
    resource_group_name="tu-resource-group",
    workspace_name="tu-workspace"
)

# Definir job de entrenamiento
train_job = command(
    code="./src",
    command="python train.py --data ${{inputs.data}}",
    environment="AzureML-sklearn-1.0-ubuntu20.04-py38-cpu@latest",
    compute="cpu-cluster",
    inputs={"data": "azureml:dataset-name:1"}
)

# Ejecutar y registrar modelo
ml_client.jobs.create_or_update(train_job)
```

### Google Vertex AI

| Característica | Detalle |
|----------------|---------|
| **Qué es** | Plataforma unificada de IA/ML en Google Cloud para todo el ciclo de vida del modelo |
| **Componentes** | Model Garden (Gemini, PaLM, Claude, Llama), AutoML, Custom Training (TensorFlow/PyTorch/JAX), Model Registry, Endpoints, Pipelines (Kubeflow) |
| **Ventajas** | Integración nativa con BigQuery, TPUs para entrenamiento ultra-rápido, MLOps maduro, Gemini API incluida |
| **Casos de uso** | Empresas data-intensive, análisis de BigQuery + IA, modelos custom a gran escala, equipos que usan GCP |

**Ejemplo de uso:**
```python
# Python - Vertex AI con Gemini
from vertexai.generative_models import GenerativeModel, GenerationConfig

# Inicializar modelo
model = GenerativeModel("gemini-1.5-pro")

# Configurar generación
config = GenerationConfig(
    max_output_tokens=1000,
    temperature=0.7,
    top_p=0.95
)

# Generar respuesta
response = model.generate_content(
    "Hola, ¿cómo estás? Explícame qué es la IA en 3 párrafos.",
    generation_config=config
)

print(response.text)
```

### Gemini API (Google AI Studio)

| Característica | Detalle |
|----------------|---------|
| **Qué es** | Acceso directo a modelos Gemini (1.0, 1.5 Pro/Flash) vía API REST o SDK |
| **Características** | Multimodal nativo (texto, imágenes, video, audio, código), contexto masivo (hasta 1M tokens), integración con Google Workspace, function calling, grounding con búsqueda web |
| **Precios** | Gemini 1.5 Flash: Gratuito (rate limits), Gemini 1.5 Pro: Pay-per-token competitivo |
| **Casos de uso** | Asistentes inteligentes, análisis de documentos largos, búsqueda semántica, prototipado rápido |

**Ejemplo de uso:**
```bash
# Gemini API REST - Generar contenido
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=$GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {
        "parts": [
          {"text": "Hola, ¿cómo estás? Explícame qué es la IA."}
        ]
      }
    ],
    "generationConfig": {
      "maxOutputTokens": 1000,
      "temperature": 0.7,
      "topP": 0.95
    }
  }'
```

---

## ⚖️ Comparativa: AWS vs Azure vs GCP

| Criterio | AWS | Azure | GCP |
|----------|-----|-------|-----|
| **Madurez de servicios** | ✅✅✅ (más antiguo) | ✅✅✅ | ✅✅ |
| **Catálogo de modelos** | Bedrock (6+ providers) | OpenAI + open-source | Gemini + open-source |
| **Integración enterprise** | Amplia (S3, Lambda, etc.) | Excelente (Office 365, AD) | Buena (Workspace, BigQuery) |
| **Precios** | Competitivo | Descuentos EA | Más económico en ML |
| **Facilidad de uso** | Curva de aprendizaje | Interfaz amigable | Vertex AI unificado |
| **Soporte open-source** | SageMaker (flexible) | Azure ML (maduro) | Vertex (Kubeflow nativo) |
| **TPUs/GPUs** | GPUs (NVIDIA) | GPUs (NVIDIA) | TPUs + GPUs |

---

## 💰 Comparativa de costos (ejemplo práctico)

**Escenario:** Chatbot empresarial con 50k requests/día, prompt promedio 500 tokens, respuesta 200 tokens

| Plataforma | Costo estimado/mes | Latencia promedio | Notas |
|------------|-------------------|-------------------|-------|
| **AWS Bedrock (Claude 3 Sonnet)** | ~$450 | 200-500ms | Incluye VPC, encryption, compliance |
| **Azure OpenAI (GPT-4)** | ~$600 | 300-700ms | SLA 99.9%, integración Microsoft |
| **GCP Vertex (Gemini 1.5 Pro)** | ~$350 | 150-400ms | BigQuery integration, TPUs |
| **Self-hosted (SageMaker/VM)** | ~$800 | 100-400ms | Costo fijo de instancia + mantenimiento |
| **API directa (OpenAI/Anthropic)** | ~$500 | 300-800ms | Sin compliance enterprise, más simple |

> 💡 **Optimización de costos:**
> - Usar modelos pequeños (Flash/3.5-turbo) para tareas simples
> - Cache de respuestas frecuentes en Redis/Memcached
> - Spot instances para entrenamiento (hasta 70% descuento)
> - Batch inference para procesamiento no crítico
> - Monitorear tokens reales vs. estimados

---

## ⚠️ Pitfalls reales en cloud IA

- **Costos de egreso:** Mover datos fuera de la nube es caro; diseña arquitecturas que minimicen transferencia
- **Vendor lock-in:** Dependencia de servicios propietarios (Bedrock, Vertex); usa abstracciones cuando sea posible
- **Cold starts en serverless:** Primera invocación lenta; usa provisioned concurrency si es crítico
- **Límites de cuota:** Requests/segundo limitados por defecto; solicita aumentos con anticipación
- **Compliance regional:** Algunos datos no pueden salir de tu país/región; elige regiones cuidadosamente
- **Shadow IT:** Equipos creando recursos sin control; implementa governance y tagging desde el inicio

---

## 🛡️ Checklist de arquitectura cloud

- [ ] ¿Los datos sensibles están en VPC privada?
- [ ] ¿Encryption activada en tránsito (TLS) y reposo (AES-256)?
- [ ] ¿IAM roles con principio de mínimo privilegio?
- [ ] ¿Logs y auditoría activados (CloudTrail, Azure Monitor, Cloud Audit Logs)?
- [ ] ¿Backups automáticos de modelos y datasets?
- [ ] ¿Monitoreo de costos con alertas (Budgets, Cost Explorer)?
- [ ] ¿Disaster recovery plan (multi-region, failover)?
- [ ] ¿SLA definido con el proveedor?

---

## 🔗 Puente al código: arquitectura conceptual

Arquitectura de referencia para IA enterprise en la nube:


[Client] → [API Gateway] → [Lambda/Cloud Functions] → [Bedrock/Vertex/Azure OpenAI]
↓
[DynamoDB/CosmosDB] (cache, historial)
↓
[S3/Blob/GCS] (logs, modelos, datasets)
↓
[CloudWatch/Monitor] (métricas, alertas)


**Patrones comunes:**
- **RAG (Retrieval-Augmented Generation):** Vector DB (OpenSearch, Pinecone) + LLM
- **Async processing:** SQS/PubSub + Lambda/Functions para colas de inferencia
- **Batch inference:** Step Functions/Dataflow para procesamiento masivo
- **Real-time:** WebSocket/API Gateway para streaming de respuestas

---

## 🧪 Laboratorio conceptual

1. Crea una cuenta gratuita en AWS/Azure/GCP (todas tienen free tier)
2. Despliega un modelo simple (ej. Bedrock con Claude o Vertex con Gemini)
3. Configura:
   - VPC endpoint para privacidad
   - IAM role con permisos mínimos
   - CloudWatch/Monitor para logs
4. Invoca el modelo desde una Lambda/Function
5. Mide: latencia, costo por request, límites de cuota
6. Calcula: ¿cuánto costaría 10k requests/día?

---

## 📚 Recursos y siguiente paso

- **Documentación:** [AWS Bedrock](https://aws.amazon.com/bedrock), [Azure OpenAI](https://azure.microsoft.com/products/ai-services/openai-service), [Vertex AI](https://cloud.google.com/vertex-ai)
- **Arquitecturas de referencia:** AWS Well-Architected Framework, Azure Architecture Center, Google Cloud Architecture Framework
- **Certificaciones:** AWS ML Specialty, Azure AI Engineer, GCP Professional ML Engineer
- **Calculadoras de costos:** [AWS Calculator](https://calculator.aws), [Azure Pricing](https://azure.microsoft.com/pricing/calculator), [GCP Calculator](https://cloud.google.com/products/calculator)
- **Siguiente capítulo:** Tokenización y ventanas de contexto: fundamentos técnicos para entender cómo los LLMs procesan el lenguaje.