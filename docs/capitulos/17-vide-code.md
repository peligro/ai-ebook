---
id: vibe-coding
title: 'Capítulo 17: Vibe Coding: Programar con IA sin perder el control'
sidebar_label: '17. Vibe Coding'
sidebar_position: 17
---

# Capítulo 17: Vibe Coding: Programar con IA sin perder el control

## 🎯 Objetivos de aprendizaje
- Comprender qué es el "vibe coding" y cómo difiere del desarrollo tradicional
- Aprender a colaborar efectivamente con IAs mediante chat conversacional
- Identificar cuándo usar chat vs agentes embebidos en el editor
- Mantener el control del código mientras aprovechas la IA como copiloto estratégico

---

## 🧠 ¿Qué es Vibe Coding?

**Vibe Coding** es un paradigma de desarrollo donde programas **en colaboración** con una IA conversacional (como Qwen, Claude o GPT) mediante chat, manteniendo el control total del editor y el flujo de trabajo.

**No es:**
- ❌ Copilot/Ghostwriter que autocompleta mientras escribes
- ❌ Agentes que modifican tu código automáticamente
- ❌ Delegar decisiones arquitectónicas a la IA

**Sí es:**
- ✅ Conversar con la IA para diseñar soluciones
- ✅ Pedir explicaciones, ejemplos y alternativas
- ✅ Tú escribes el código final en TU editor, con TU criterio
- ✅ La IA es un "colega senior" al que consultas, no un asistente que ejecuta

**Analogía:**  
Es como tener a un arquitecto de software senior disponible 24/7 al que le describes un problema y te da opciones, pero **tú** decides cuál implementar y **tú** escribes el código.

---

## 💬 Mi enfoque personal: Por qué NO uso agentes en el editor

> **Nota del autor:** Esta es mi experiencia personal y preferencia. Tu mileage puede variar.

### El problema con los agentes embebidos

He probado GitHub Copilot, Cursor, Codeium y similares. Mi conclusión: **son demasiado invasivos**.

**Lo que me molesta:**
1. **Pierdes el control:** El editor sugiere constantemente, aceptas sin pensar, y terminas con código que no entendiste completamente
2. **Ruptura de flujo:** Las sugerencias aparecen mientras escribes, interrumpiendo tu concentración
3. **Caja negra:** No sabes qué está "pensando" el agente, solo ves el resultado
4. **Dependencia psicológica:** Te acostumbras a que "algo" complete tu código, y cuando no está, te sientes perdido

### Mi alternativa: Chat conversacional + Qwen

**Mi setup:**
- **Herramienta:** Qwen (gratuito, open-source, sin límites estrictos)
- **Flujo:** Abro el chat en una ventana paralela al editor
- **Dinámica:** Converso como si fuera un colega: "Necesito hacer X, ¿cómo lo abordarías?"

**Ventajas que encuentro:**
1. **Control total:** Yo decido cuándo consultar, qué aceptar y cómo implementarlo
2. **Sin interrupciones:** El chat no aparece mientras escribo; yo lo activo cuando necesito
3. **Transparencia:** Veo el razonamiento completo, no solo el código final
4. **Aprendizaje real:** Al escribir yo el código, internalizo mejor los conceptos
5. **Gratis:** Qwen es gratuito y potente; no necesito pagar $10-20/mes por Copilot

**Ejemplo de mi flujo real:**

```text
[Yo en el chat]: "Necesito crear un endpoint en FastAPI que reciba un PDF,
extraiga el texto y lo guarde en una base de datos vectorial.
¿Qué librerías usarías y cómo estructurarías el código?"

[Qwen]: "Te recomiendo:
1. PyPDF2 o pdfplumber para extraer texto
2. FastAPI con UploadFile para recibir el PDF
3. LangChain + ChromaDB para embeddings y vector store
Aquí te dejo un ejemplo base..."

[Yo]: Leo la respuesta, analizo, adapto a mis necesidades
[Yo]: Copio SOLO lo que necesito
[Yo]: Lo escribo manualmente en VS Code (no copiar-pegar ciego)
[Yo]: Pruebo, debuggeo, ajusto
```
**Resultado:** Código que **entiendo completamente**, porque lo escribí yo, pero con la guía de una IA que me ahorró horas de investigación.

---

## 🛠️ Cómo practicar Vibe Coding efectivamente

### Setup recomendado

**Herramientas gratuitas:**
| Herramienta | Uso | Costo |
|-------------|-----|-------|
| **Qwen** (chat) | Consultas técnicas, diseño de soluciones | Gratis |
| **Claude.ai** | Alternativa para explicaciones detalladas | Gratis (límite diario) |
| **ChatGPT (GPT-4o mini)** | Consultas rápidas, debugging | Gratis |
| **VS Code / Neovim / Tu editor favorito** | Donde realmente escribes el código | Gratis/Pago |

**Configuración física:**
- Monitor 1: Tu editor de código
- Monitor 2 (o ventana dividida): Chat con la IA
- **Regla de oro:** Nunca dejes que la IA escriba directo en tu editor

### Patrones de conversación efectivos

**Patrón 1: Diseño arquitectónico**
```text
[Yo]: "Tengo que construir [X]. Los requisitos son [Y]. 
¿Cómo estructurarías la solución? Dame 2-3 alternativas 
con pros y contras de cada una."
```

**Patrón 2: Debugging guiado**
```text
[Yo]: "Este código [pegar código] debería hacer [X] pero está 
haciendo [Y]. ¿Qué podría estar mal? No me des la solución 
completa, guíame con pistas para que yo lo descubra."
```

**Patrón 3: Explicación conceptual**
```text
[Yo]: "Explícame cómo funciona [concepto] como si tuviera 
20 años de experiencia en programación pero 0 en este tema específico. 
Dame ejemplos prácticos en [tu lenguaje favorito]."
```

**Patrón 4: Refactorización**
```text
[Yo]: "Tengo este código [pegar]. Funciona, pero es difícil de mantener. 
¿Cómo lo refactorizarías para que sea más limpio, testeable y escalable? 
Muestra el antes y después con explicaciones."
```

**Patrón 5: Validación crítica**
```text
[Yo]: "Me sugeriste usar `libreria_X`. ¿Cuáles son sus limitaciones? 
¿Hay casos donde NO debería usarla? ¿Qué alternativas existen?"
```

## 🔍 La IA no miente, responde según su contexto

> **Reflexión importante:** He leído por ahí que "la IA te miente". No estoy de acuerdo.  
> La IA no tiene intención de engañar. Simplemente **te responde lo que entiende**, basado en:
> - Los datos con los que fue entrenada
> - El contexto que le diste en tu prompt
> - Sus limitaciones arquitectónicas (ventana de contexto, conocimiento cortado en fecha X)

### Por qué esto importa en Vibe Coding

Cuando trabajas con IA conversacional, recuerda:

1. **La IA no "sabe" que no sabe**: Si le preguntas sobre una librería que no conoce, puede inventar una respuesta plausible (alucinación), no por malicia, sino por diseño.

2. **Tu contexto define su respuesta**: Si tu prompt es vago, la respuesta será genérica. Si das detalles específicos, la respuesta será más precisa.

3. **La IA no ejecuta tu código**: No puede probar si lo que sugiere funciona. Tú eres el responsable de validar.

### Cómo cuestionar efectivamente

**No aceptes ciegamente. Pregunta más:**

```text
[Yo]: "¿Estás seguro de que `pdfplumber` maneja PDFs escaneados?"

[Qwen]: "Buena pregunta. `pdfplumber` extrae texto de PDFs con capa de texto. 
Para PDFs escaneados (imágenes), necesitarías OCR como `pytesseract` o `easyocr`. 
¿Tu caso usa PDFs con texto seleccionable o imágenes escaneadas?"

[Yo]: "Son escaneados. Entonces, ¿cuál sería el flujo completo?"

[Qwen]: "Entonces:
1. pytesseract para OCR → texto plano
2. Limpieza con regex para quitar ruido del OCR
3. Embeddings con tu modelo preferido
4. Guardar en vector DB
¿Quieres que te muestre un ejemplo con pytesseract?"
```

**Patrones para validar respuestas:**

| Pregunta | Propósito |
|----------|-----------|
| "¿Qué alternativas hay a esta solución?" | Evitar tunnel vision |
| "¿Cuáles son las limitaciones de este enfoque?" | Conocer los edge cases |
| "¿Cómo probarías que esto funciona?" | Obtener criterios de validación |
| "¿Qué podría salir mal con esta implementación?" | Anticipar fallos |
| "¿Hay documentación oficial que respalde esto?" | Verificar fuentes |

### Checklist: Validación de respuestas de IA

- [ ] ¿La solución propuesta usa librerías que existen y están mantenidas?
- [ ] ¿Verifiqué la documentación oficial de las herramientas sugeridas?
- [ ] ¿Probé el código en un entorno de desarrollo antes de usarlo en producción?
- [ ] ¿Consideré edge cases que la IA no mencionó?
- [ ] ¿Puedo explicar por qué esta solución es mejor que otras alternativas?
- [ ] ¿La respuesta se alinea con las mejores prácticas de seguridad y performance?

> 💡 **Regla de oro:** La IA es un excelente punto de partida, pero nunca el punto final. Tú eres el responsable del código que se ejecuta en producción.

## ⚖️ Vibe Coding vs Agentes en Editor: Comparativa

| Dimensión | Vibe Coding (Chat) | Agentes Embebidos (Copilot, Cursor) |
|-----------|-------------------|-------------------------------------|
| **Control** | ✅ Total: tú escribes todo | ⚠️ Parcial: el agente sugiere/autocompleta |
| **Aprendizaje** | ✅ Alto: escribes y internalizas | ⚠️ Medio: puedes volverte dependiente |
| **Velocidad** | ⚠️ Media: consultas, lees, escribes | ✅ Alta: autocompletado instantáneo |
| **Calidad del código** | ✅ Alta: piensas cada línea | ⚠️ Variable: aceptas sin revisar |
| **Interrupciones** | ✅ Mínimas: tú controlas cuándo consultar | ❌ Frecuentes: sugerencias constantes |
| **Costo** | ✅ Gratis (Qwen, Claude free tier) | ❌ $10-20/mes (Copilot, Cursor Pro) |
| **Privacidad** | ✅ Tú decides qué compartir | ⚠️ Tu código se envía a servidores |
| **Flexibilidad** | ✅ Cambias de IA fácilmente | ❌ Vendor lock-in con la herramienta |

**Veredicto:**  
Si valoras **control, aprendizaje y privacidad** → Vibe Coding con chat  
Si priorizas **velocidad bruta** y confías en la IA → Agentes embebidos

## 🎯 Casos de uso: Cuándo usar cada enfoque

### ✅ Vibe Coding (Chat) es ideal para:

- **Diseño arquitectónico:** "¿Cómo estructurar un sistema de autenticación JWT?"
- **Aprendizaje:** "Explícame cómo funciona RAG paso a paso"
- **Debugging complejo:** "Tengo este error raro, ¿qué podría causar?"
- **Refactorización:** "Este código es un desastre, ¿cómo lo mejorarías?"
- **Code review:** "Revisa este endpoint y dime qué problemas de seguridad ves"
- **Documentación:** "Genera documentación técnica para esta función"

### ⚠️ Agentes embebidos pueden servir para:

- **Boilerplate repetitivo:** Imports, estructuras básicas, getters/setters
- **Tests unitarios simples:** Generar tests obvios para funciones puras
- **Comentarios:** Explicar código existente (aunque podrías hacerlo mejor tú)
- **Snippets conocidos:** Patrones que ya dominas pero son tediosos de escribir

### ❌ Nunca delegues (independientemente del método):

- **Lógica de negocio crítica:** Reglas de negocio, cálculos financieros
- **Seguridad:** Validaciones, sanitización, autenticación
- **Arquitectura:** Decisiones que afectarán escalabilidad y mantenimiento
- **Código que no entiendes:** Si no puedes explicarlo, no lo uses

## 🛡️ Checklist: Vibe Coding responsable

- [ ] ¿Entiendo completamente el código que voy a escribir antes de tipearlo?
- [ ] ¿Validé que la solución propuesta por la IA funciona con mis datos reales?
- [ ] ¿Adapté el código a mis estándares y convenciones del proyecto?
- [ ] ¿Escribí el código manualmente (no copiar-pegar ciego)?
- [ ] ¿Probé el código con casos edge-case, no solo el ejemplo de la IA?
- [ ] ¿Puedo explicar cada línea del código si me lo preguntan en code review?
- [ ] ¿Tengo un plan B si la IA no está disponible (documentación, Stack Overflow)?
- [ ] ¿Verifiqué que no hay vulnerabilidades de seguridad en el código sugerido?
- [ ] ¿Cuestioné la respuesta de la IA con preguntas críticas antes de implementarla?

---

## 🔧 Mi workflow personal paso a paso

Así es como trabajo yo (César) en proyectos reales:

### Paso 1: Definir el problema
```text
[Yo]: "Necesito crear un script en Python que:
1. Lea un CSV con 10,000 registros
2. Limpie datos nulos
3. Genere embeddings con OpenAI
4. Los guarde en Pinecone

¿Por dónde empezarías?"
```

### Paso 2: Obtener arquitectura
```text
[Qwen]: "Te sugiero:
- pandas para leer y limpiar el CSV
- openai para embeddings
- pinecone-client para guardar
Aquí la estructura de carpetas y el pseudocódigo..."
```


### Paso 3: Implementar manualmente
- Abro VS Code
- Creo la estructura de archivos yo mismo
- Escribo el código línea por línea, consultando dudas en el chat
- Si algo no me queda claro: "¿Por qué usas try-except aquí?"

### Paso 4: Debuggear con la IA
```text
[Yo]: "Me sale este error: 'Connection timeout en Pinecone'. 
¿Qué podría ser?"

[Qwen]: "Posibles causas:
1. API key inválida
2. Firewall bloqueando
3. Índice no creado
Verifica en este orden..."
```

### Paso 5: Refactorizar
```text
[Yo]: "El código funciona pero es difícil de leer. 
¿Cómo lo harías más mantenible?"

[Qwen]: "Separa en funciones:
- load_and_clean_csv()
- generate_embeddings()
- save_to_pinecone()
Aquí el código refactorizado..."
```

Tiempo total: 2 horas (vs 6-8 horas si investigara todo desde cero)
Calidad: Código que entiendo y puedo mantener
Aprendizaje: Aprendí sobre Pinecone, embeddings y manejo de CSVs



## 🧪 Laboratorio conceptual: Tu primer proyecto con Vibe Coding

**Ejercicio:** Construye una API REST simple con FastAPI

### Instrucciones:

1. **No abras Copilot ni Cursor** — solo tu editor + chat con Qwen/Claude

2. **Consulta al chat:**
```text
"Quiero crear una API REST con FastAPI que tenga:
- GET /health → {"status": "ok"}
- POST /users → crear usuario
- GET /users/{id} → obtener usuario

¿Cómo estructurarías el proyecto? Dame el código base."
```

3. **Implementa manualmente:**
   - Lee la respuesta
   - Cierra el chat temporalmente
   - Escribe el código **de memoria** (o consultando documentación oficial)
   - Solo vuelve al chat si te atascas

4. **Debuggea con la IA:**
```text
"Me sale error 422 en POST /users. 
El payload es {"name": "Juan"}. 
¿Qué estoy haciendo mal?"
```

5. **Reflexiona:**
   - ¿Cuánto código escribiste tú vs copiaste?
   - ¿Entiendes cada línea del resultado final?
   - ¿Podrías explicárselo a otro desarrollador?
   - ¿Cuestionaste alguna recomendación de la IA antes de implementarla?


---

 

## 📚 Recursos y herramientas

### IAs conversacionales gratuitas:
| Herramienta | URL | Notas |
|-------------|-----|-------|
| **Qwen** | https://chat.qwen.ai | Mi favorita, sin límites estrictos, buen razonamiento |
| **Claude.ai** | https://claude.ai | Explicaciones detalladas, límite diario gratuito |
| **ChatGPT** | https://chat.openai.com | GPT-4o mini gratis, rápido para consultas simples |
| **Gemini** | https://gemini.google.com | Integración con Google, bueno para búsquedas |

### Alternativas self-hosted (privacidad total):
| Herramienta | Descripción |
|-------------|-------------|
| **Ollama** | Corre LLMs locales (Llama 3, Mistral, Qwen) en tu máquina |
| **GPT4All** | Chat local sin internet, modelos optimizados para CPU |
| **Text Generation WebUI** | Interfaz web flexible para modelos locales |

### Lecturas recomendadas:
- 📖 *"The Programmer's Brain"* — Felienne Hermans (cómo aprendemos a programar)
- 📖 *"A Philosophy of Software Design"* — John Ousterhout (diseño limpio)
- 🔗 [Qwen Documentation](https://qwen.readthedocs.io) — Guía oficial
- 🔗 [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) — Seguridad en IA

---

## 💡 Reflexión final

> **El Vibe Coding no es sobre reemplazar tu cerebro con IA.  
> Es sobre amplificar tu inteligencia con una herramienta que piensa diferente a ti.**

La IA es excelente para:
- ✅ Generar opciones rápidamente
- ✅ Recordar sintaxis y patrones comunes
- ✅ Explicar conceptos desde múltiples ángulos
- ✅ Ahorrarte horas de investigación en documentación

Tú eres insustituible para:
- ✅ Tomar decisiones arquitectónicas
- ✅ Entender el contexto del negocio
- ✅ Escribir código que otros humanos mantendrán
- ✅ Asumir responsabilidad por el resultado
- ✅ **Cuestionar y validar** lo que la IA te sugiere

### Mi recomendación personal

Prueba el Vibe Coding por 2 semanas. Usa **solo chat**, sin agentes en el editor.  
Al final, pregúntate:

1. ¿Escribí mejor código que antes?
2. ¿Aprendí más que cuando trabajaba sin IA?
3. ¿Me siento más o menos dependiente de la herramienta?
4. ¿Puedo explicar cada decisión de código que tomé?

Si las respuestas son positivas, este enfoque es para ti.

> 🎯 **Recuerda:** La IA no miente. Responde según su contexto.  
> Tu trabajo es ampliar ese contexto con preguntas inteligentes,  
> y validar cada respuesta con criterio técnico.

 