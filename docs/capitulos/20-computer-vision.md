---
id: computer-vision
title: 'Capítulo 20: Computer Vision y su aplicación en la IA'
sidebar_label: '20. Computer Vision'
sidebar_position: 20
---

# Capítulo 20: Computer Vision: Enseñando a las máquinas a "ver"

## 🎯 Objetivos de aprendizaje
- Entender cómo una computadora transforma píxeles en conceptos semánticos.
- Diferenciar entre Clasificación, Detección de Objetos y Segmentación.
- Conocer el flujo de trabajo: desde la captura de imagen hasta la inferencia.
- Explorar el ecosistema de librerías profesionales y casos de uso industriales.

---

## 🧠 Modelo mental: Píxeles no son objetos

Para un humano, una imagen es un gato. Para una computadora, una imagen es una **matriz de números** (RGB).

**Analogía:** Imagina que estás en una habitación oscura con una linterna muy pequeña. Solo puedes ver un milímetro a la vez. Tienes que recorrer toda la pared y, basándote solo en los colores que viste punto por punto, decidir si lo que hay dibujado es un círculo o un cuadrado. 

Eso es lo que hace una **CNN (Red Neuronal Convolucional)**: recorre la imagen buscando patrones (bordes, texturas, formas) hasta que "entiende" el todo.

---

## 🖼️ Las 4 tareas fundamentales de la Visión

| Tarea | ¿Qué responde? | Ejemplo práctico |
|-------|---------------|------------------|
| **Clasificación** | ¿Qué hay en esta imagen? | Decidir si una radiografía tiene neumonía o no. |
| **Detección** | ¿Qué hay y dónde está? | Dibujar cuadros (bounding boxes) sobre peatones en un auto autónomo. |
| **Segmentación** | ¿A qué objeto pertenece cada píxel? | Recortar el fondo de una videollamada de Zoom. |
| **OCR (Reconocimiento)** | ¿Qué dice este texto? | Leer la patente de un vehículo o un recibo de sueldo. |

---

## 🏢 Casos de Uso en el Mundo Profesional

La visión artificial ya no es ciencia ficción; es una capa de eficiencia en la cadena de valor de casi cualquier industria.

| Industria | Aplicación Real | Beneficio de Negocio |
|-----------|-----------------|----------------------|
| **Supply Chain** | Conteo automático de inventario y detección de daños en pallets. | Reducción de mermas y auditoría de stock en tiempo real. |
| **Deportes** | Tracking de jugadores y análisis de pose (Pose Estimation). | Estadísticas de rendimiento y prevención de lesiones. |
| **Banca / Fintech** | Verificación de identidad (KYC) y validación de documentos. | Prevención de fraude y onboarding digital en segundos. |
| **Retail** | Mapas de calor (Heatmaps) y tiendas "Just Walk Out". | Optimización de layout de tienda y eliminación de filas. |
| **Seguridad** | Detección de intrusos y reconocimiento de matrículas (LPR). | Automatización de perímetros y control de acceso vehicular. |
| **Manufactura** | Control de calidad en línea de ensamblaje (detección de grietas). | Reducción de defectos y automatización de la inspección. |
| **Agricultura** | Detección de plagas mediante drones y conteo de frutos. | Pulverización selectiva y estimación de cosecha. |

---

## 📚 El Ecosistema de Librerías (Tech Stack)

No necesitas programar redes neuronales desde cero. Estas son las herramientas que usamos en producción:

### ⚙️ Procesamiento y Utilidades
* **OpenCV:** El "navaja suiza". Esencial para manipular imágenes (resize, filtros, colores).
* **Albumentations:** La mejor librería para *Data Augmentation*. Crea variaciones de tus datos para hacer al modelo más robusto.
* **Pillow (PIL):** Librería liviana para manejo básico de archivos de imagen.

### 🧠 Frameworks de Modelos
* **PyTorch / TensorFlow:** Los motores principales donde viven los modelos.
* **Ultralytics (YOLO):** La implementación estándar de oro para detección de objetos en tiempo real.
* **Hugging Face (ViT):** Para implementar Transformers de Visión de última generación.
* **Detectron2:** Librería de Facebook AI Research para tareas de segmentación avanzada.

### 🔠 OCR (Texto en imágenes)
* **EasyOCR:** Muy fácil de usar y soporta más de 80 idiomas.
* **Tesseract:** El motor clásico de Google, robusto para documentos estructurados.
* **PaddleOCR:** Posiblemente el más potente y rápido actualmente para textos complejos.

### 🛠️ MLOps para Visión
* **Roboflow:** Plataforma integral para etiquetar, versionar y desplegar datasets de imágenes.
* **CVAT:** Herramienta open-source potente para anotación de video e imágenes.

---

## 🏗️ Anatomía de un Pipeline de Computer Vision

| Paso | Operación | Por qué es crítico |
|:---:|:---|:---|
| **1** | **Pre-procesamiento** | Cambiar tamaño, normalizar brillo y eliminar ruido. |
| **2** | **Augmentation** | Rotar o girar imágenes para que el modelo sea más resiliente. |
| **3** | **Inferencia** | El modelo (YOLO, ResNet, ViT) procesa la imagen. |
| **4** | **Post-procesamiento** | Limpiar resultados (ej. eliminar cuadros duplicados con NMS). |
| **5** | **Lógica de Negocio** | "Si detectas una grieta > 5cm, envía una alerta a mantenimiento". |

---

## ⚖️ Matriz de decisiones: ¿Qué modelo elegir?

| Necesidad | Recomendación | Por qué |
|-----------|---------------|---------|
| **Velocidad extrema (Real-time)** | YOLO (You Only Look Once) | Procesa video a +60 FPS con buena precisión. |
| **Máxima precisión (Médico/Científico)** | Transformers de Visión (ViT) | Analizan relaciones globales en la imagen, pero son pesados. |
| **Dispositivos móviles / Edge** | MobileNet / EfficientNet | Optimizados para consumir poca batería y RAM. |
| **Detección de texto complejo** | PaddleOCR o Tesseract | Especializados en tipografías y alineaciones variables. |

---

## ⚠️ Pitfalls reales en Visión Artificial

- **El problema de la iluminación:** Un modelo que funciona perfecto con luz de oficina fallará estrepitosamente de noche o con reflejos de sol.
- **Sesgo de datos (Data Bias):** Si entrenas un detector de cascos de seguridad solo con cascos amarillos, no reconocerá los blancos o azules.
- **Latencia de red:** Enviar video 4K a la nube para procesarlo es lento y caro. La visión suele requerir **Edge Computing**.
- **Edge cases físicos:** Una cámara sucia o una araña caminando sobre el lente pueden tumbar tu sistema de seguridad "inteligente".

---

## 🛡️ Checklist de producción para Computer Vision

- [ ] ¿He probado el modelo con diferentes condiciones de luz y ángulos?
- [ ] ¿El dataset de entrenamiento representa la realidad del despliegue?
- [ ] ¿Tengo un pipeline de pre-procesamiento para estandarizar las entradas?
- [ ] ¿He optimizado el modelo (Quantization/TensorRT) para la GPU de destino?
- [ ] ¿El sistema maneja fallos de hardware (cámara desconectada)?

---

## 🧪 Laboratorio conceptual

1. Piensa en un proceso de tu empresa (ej. control de acceso, lectura de facturas).
2. ¿Cuál de las 4 tareas fundamentales aplicaría?
3. Si el sistema falla y deja pasar a alguien no autorizado por un cambio de luz:
   - ¿Cómo lo detectarías en tus logs de MLOps?
   - ¿Qué estrategia de *Augmentation* usarías para corregirlo?

 ## 🔗 Recursos útiles para Computer Vision

Si estás listo para pasar de la teoría a la implementación, estos son los recursos esenciales que debes tener en tu radar:

### 📊 Datasets (¿Dónde conseguir datos?)
* **Kaggle:** El punto de partida clásico. Busca "Computer Vision" para encontrar datasets de todo tipo (médicos, retail, satelitales).
* **Roboflow Universe:** Una mina de oro con miles de datasets ya etiquetados y listos para descargar en formatos como YOLO o COCO.
* **COCO Dataset (Common Objects in Context):** El estándar de la industria para benchmarking de detección y segmentación.
* **Google Open Images:** Millones de imágenes con anotaciones complejas para modelos de gran escala.

### 🎓 Aprendizaje y Certificaciones
* **DeepLearning.AI (Coursera):** La especialización de *Deep Learning* tiene módulos específicos de CNNs que son obligatorios.
* **PyImageSearch (Adrian Rosebrock):** Probablemente el mejor blog del mundo para aprender OpenCV y visión práctica con Python.
* **LearnOpenCV (Satya Mallick):** Tutoriales profundos y muy bien explicados sobre las últimas arquitecturas de visión.

### 🛠️ Herramientas de Visualización y Debugging
* **Netron:** Un visualizador de modelos (ONNX, TensorFlow, PyTorch). Vital para entender la arquitectura interna de la red que estás usando.
* **Weights & Biases (W&B):** Para trackear tus experimentos de entrenamiento y visualizar cómo evoluciona la precisión de tus modelos.
* **FiftyOne:** Una herramienta increíble para visualizar y explorar datasets de visión, detectar errores de etiquetado y evaluar modelos.

### 🚀 Cloud & API (Para prototipado rápido)
* **Google Vertex AI Vision:** Herramientas drag-and-drop para crear flujos de visión sin gestionar infraestructura.
* **Azure AI Vision:** APIs listas para OCR, análisis de video y reconocimiento facial.
* **AWS Rekognition:** Ideal para análisis masivo de imágenes y detección de contenido moderado.

 