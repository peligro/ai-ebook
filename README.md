# 📚 Desarrollo para IA - Ebook Completo

[![Visit the ebook](https://img.shields.io/badge/Visit-ai--ebook.cesarcancino.com-brightgreen?style=for-the-badge)](https://ai-ebook.cesarcancino.com/intro)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Stars](https://img.shields.io/github/stars/peligro/ai-ebook?style=social)](https://github.com/peligro/ai-ebook/stargazers)

> **De los fundamentos a la producción:** Guía completa para desarrollar sistemas de Inteligencia Artificial escalables, seguros y listos para el mundo real.

---

## 🌟 ¿Qué encontrarás aquí?

Este ebook te guía desde los conceptos básicos hasta la implementación de sistemas de IA en producción, con **23 capítulos** que cubren:

### 📖 Contenido del Ebook

#### **Fundamentos (Caps. 1-4)**
- Introducción a la IA y su ciclo de vida
- Modelos: GPT, Claude, Llama, Mistral
- Plataformas: HuggingFace, Groq, Replicate
- IA en la nube: AWS Bedrock, Azure OpenAI, Google Vertex AI

#### **Técnico Profundo (Caps. 5-10)**
- Tokenización y ventanas de contexto
- Embeddings y búsqueda vectorial
- Bases de datos vectoriales (pgvector, Pinecone, Qdrant)
- RAG (Retrieval-Augmented Generation)
- Fine-Tuning con LoRA/QLoRA
- Frameworks: LangChain, LlamaIndex, DSPy

#### **Producción y Escala (Caps. 11-16)**
- Agentes autónomos y orquestación
- MLOps: monitoreo, drift, versionado
- IA No-Code: n8n, Make, Zapier
- Automatizaciones con IA
- Escalabilidad y optimización de costos
- Seguridad y ética en IA

#### **Temas Avanzados (Caps. 17-22)**
- Vibe Coding: Programar con IA sin perder el control
- Testing y evaluación de sistemas de IA
- El mito de "la IA me hace la app"
- Computer Vision aplicada
- IA Antagónica y seguridad ofensiva
- El futuro de la IA: tendencias y AGI

#### **Cierre (Cap. 23)**
- Agradecimientos y recursos adicionales

---

## 🚀 Características Principales

- ✅ **100% Gratuito y Open-Source**
- ✅ **Agnóstico al lenguaje**: Ejemplos en Python, JavaScript, Go, PHP
- ✅ **Enfoque práctico**: Laboratorios conceptuales en cada capítulo
- ✅ **Checklists de producción**: Listas de verificación listas para usar
- ✅ **Actualizado constantemente**: Contenido revisado y mejorado
- ✅ **Construido con Docusaurus**: Búsqueda rápida, modo oscuro, navegación intuitiva

---

## 📦 Tecnologías Utilizadas

- **[Docusaurus 2](https://docusaurus.io/)** - Framework de documentación moderno
- **React** - Biblioteca de UI
- **Markdown/MDX** - Formato de contenido
- **Bootstrap** - Estilos y componentes (para artículos del blog)

---

## 🛠️ Desarrollo Local

### Prerrequisitos

- Node.js >= 16.14
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/peligro/ai-ebook.git
cd ai-ebook

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

### Build para Producción

```bash
# Generar build estático
npm run build

# Servir el build en producción
npm run serve
```

El contenido generado se encuentra en el directorio build/ y está listo para desplegar en cualquier servidor web estático (DreamHost, Vercel, Netlify, S3, etc.).


### 📂 Estructura del Proyecto

```text
ai-ebook/
├── docs/                    # Documentación principal
│   └── capitulos/          # Los 23 capítulos del ebook
│       ├── 01-primeros-pasos-con-ia.md
│       ├── 02-modelos-herramientas.md
│       ├── ...
│       └── 23-agradecimientos.md
├── src/                    # Código fuente de Docusaurus
│   ├── css/               # Estilos personalizados
│   ├── pages/             # Páginas estáticas
│   └── components/        # Componentes React
├── static/                # Archivos estáticos
│   ├── img/              # Imágenes (logos, fotos, assets)
│   └── favicon.ico
├── blog/                  # Artículos del blog (Bootstrap)
├── docusaurus.config.js   # Configuración principal
├── sidebars.js           # Configuración de navegación lateral
└── package.json
```

## 🌐 Deploy

Este ebook está desplegado en:

**🔗 https://ai-ebook.cesarcancino.com**

El deploy se realiza subiendo el contenido del directorio `build/` a DreamHost mediante `rsync` o SFTP.

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas!

- 🐛 ¿Encontraste un error? [Abre un issue](https://github.com/peligro/ai-ebook/issues)
- 💡 ¿Tienes una sugerencia? [Crea una discusión](https://github.com/peligro/ai-ebook/discussions)
- 🔧 ¿Quieres mejorar algo? [Envía un PR](https://github.com/peligro/ai-ebook/pulls)

### Guía rápida para contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-seccion`)
3. Commit tus cambios (`git commit -m 'Add: nueva sección sobre X'`)
4. Push a la rama (`git push origin feature/nueva-seccion`)
5. Abre un Pull Request

---

## 📚 Cursos Relacionados

Si te gustó este ebook, te puede interesar:

**[Integración de APIs de IA: De Cero a Experto](https://integracion-de-apis-de-ia-de-cero-a-experto.cesarcancino.com/)**

Curso práctico en Udemy con proyectos reales en:
- Laravel, FastAPI, NestJS y React
- Patrones avanzados: RAG, Agentes, Fine-Tuning
- Seguridad, escalabilidad y optimización

🎁 **Descuento para lectores del ebook:** Escríbeme a yo@cesarcancino.com para obtener un cupón de descuento.