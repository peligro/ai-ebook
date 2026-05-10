---
id: bases-de-datos-vectoriales
title: 'Capítulo 7: Bases de Datos Vectoriales'
sidebar_label: '7. Bases de Datos Vectoriales'
sidebar_position: 7
---
# Capítulo 7: Bases de Datos Vectoriales

## 🎯 Objetivos de aprendizaje
- Comprender por qué las bases de datos tradicionales no sirven para búsqueda semántica
- Entender cómo funcionan los índices vectoriales (HNSW, IVF, PQ)
- Conocer las opciones principales: PostgreSQL (pgvector), Pinecone, Qdrant, Milvus
- Diseñar estrategias de indexación para equilibrio entre latencia y precisión

---

##  Modelo mental: ¿Por qué necesitas una Vector DB?

Las bases de datos relacionales (SQL) buscan coincidencias exactas (`WHERE id = 1`).
Las **bases de datos vectoriales** buscan **similitud semántica**.

**Analogía:** Imagina una biblioteca de 1 millón de libros.
- **Búsqueda SQL:** "Dame el libro cuyo título exacto es 'Guía de Python'".
- **Búsqueda Vectorial:** "Dame libros que hablen sobre programación de serpientes o lenguajes de código". (Aunque no tengan la palabra "Python" en el título, encontrarán los relacionados por significado).

Cuando tienes millones de vectores (embeddings), calcular la distancia entre cada nuevo vector y todos los existentes (fuerza bruta) es demasiado lento. Las Vector DBs usan **índices aproximados** para encontrar "los más cercanos" en milisegundos.

---

## 🔄 Cómo funcionan los índices vectoriales (sin matemáticas complejas)

Para no comparar un vector con millones de otros, se usan atajos:

1. **HNSW (Hierarchical Navigable Small World):**
   - Crea "capas" de grafos. En la capa superior saltas lejos, en las inferiores buscas preciso.
   - **Ventaja:** Muy rápido, alta precisión.
   - **Uso:** Estándar actual (Qdrant, pgvector, Milvus).

2. **IVF (Inverted File Index):**
   - Agrupa vectores en "clusters" (como regiones en un mapa).
   - Busca primero en qué región estás y luego compara solo con los vecinos de esa región.
   - **Ventaja:** Bueno para datasets muy grandes, consume menos memoria.

3. **PQ (Product Quantization):**
   - Comprime los vectores (reduce su tamaño) para que quepan en memoria RAM, sacrificando un poco de precisión.
   - **Uso:** Cuando tienes millones de vectores y poca RAM.

---

## 🌐 Panorama de herramientas: ¿Cuál elegir?

| Herramienta | Tipo | Fortalezas | Caso de uso ideal |
|-------------|------|------------|-------------------|
| **PostgreSQL + pgvector** | Relacional + Vector | Ya usas Postgres, transacciones ACID, unifica datos y vectores | Startups, apps que ya usan Postgres, datos relacionales fuertes |
| **Pinecone** | SaaS Gestionado | Cero mantenimiento, auto-escalado, muy fácil de usar | Equipos pequeños, prototipado rápido, sin querer operar infraestructura |
| **Qdrant** | Especializada | Filtrado avanzado por metadatos, open-source, muy rápido | RAG complejo, filtrado por usuario/fecha, alta carga |
| **Milvus** | Escalable | Diseñado para miles de millones de vectores, distribuido | Enterprise, Big Data, clusters grandes |
| **Redis (Redis Stack)** | In-Memory | Latencia ultra-baja (sub-milisegundo), cache + vector | Sistemas en tiempo real, cacheo semántico |

---

## ⚖️ Matriz de decisiones técnicas

| Escenario | Recomendación | Por qué |
|-----------|---------------|---------|
| **Ya tienes Postgres en producción** | `pgvector` | No introduces nueva tecnología, backups unificados, JOINs SQL |
| **Prototipo rápido / MVP** | Pinecone | Setup en 5 minutos, no configuras servidores |
| **Necesitas filtrar por metadatos complejos** | Qdrant | Su motor de filtrado pre-filtrado es superior a Pinecone/pgvector básico |
| **Presupuesto ajustado / Open Source** | Qdrant o pgvector | Puedes hostearlos tú mismo gratis (solo pagas el servidor) |
| **Latencia crítica (`&lt;10ms`)** | Redis Vector Search | Datos en RAM pura |
| **Miles de millones de vectores** | Milvus | Escalabilidad horizontal nativa |

---

## ⚠️ Pitfalls reales (Errores costosos)

- **Índice no actualizado:** Agregar vectores nuevos sin actualizar el índice (re-indexing) hace que las búsquedas sean lentas o imprecisas.
- **Falta de filtrado híbrido:** Confiar solo en vector search cuando necesitas filtrar por fecha o usuario (ej. "Buscar documentos similares SOLO del usuario X").
- **Dimensiones incorrectas:** Intentar guardar un embedding de 3072 dimensiones en una columna configurada para 768 → Error de inserción.
- **Cold Start en SaaS:** Servicios gestionados pueden tardar en "despertar" si no tienen tráfico constante.
- **Costo de RAM:** Los índices HNSW consumen mucha memoria; si no monitorizas, el servidor se cae por OOM (Out Of Memory).

---

## 🛡️ Checklist de producción

- [ ] ¿He definido el número de dimensiones correcto según mi modelo de embeddings?
- [ ] ¿Qué métrica de distancia estoy usando? (Coseno para texto, Euclidiana para otros).
- [ ] ¿He configurado índices eficientes (HNSW) y no fuerza bruta?
- [ ] ¿Tengo estrategia de filtrado por metadatos (namespace, tenant_id)?
- [ ] ¿Monitorizo el consumo de memoria del índice vectorial?
- [ ] ¿He probado la latencia con el volumen real de datos (no solo con 10 vectores)?

---

## 🔗 Puente al código: arquitectura conceptual

Al implementar una Vector DB, el flujo es:

1. **Conexión:** Cliente de la DB (ej. `psycopg` para Postgres, `pinecone-client` para Pinecone).
2. **Upsert (Actualizar/Insertar):** Si el ID existe, actualiza; si no, inserta.
   - `vector`: [0.12, -0.5, ...]
   - `metadata`: `{"doc_id": 101, "author": "Juan"}`
3. **Query (Búsqueda):**
   - Envías tu vector de consulta.
   - Especificas `top_k=5` (traer los 5 más parecidos).
   - Opcional: `filter={"author": "Juan"}`.
4. **Resultado:** Lista de IDs y puntajes de similitud (score).

**Patrón de error:** `IndexNotReady` (índice construyéndose), `VectorDimensionMismatch`.

---

## 🧪 Laboratorio conceptual

1. Imagina que tienes una base de datos de 50,000 artículos de noticias.
2. Pregúntate:
   - ¿Si un usuario busca "crisis económica", qué artículos deberían salir?
   - ¿Cómo diferenciarías artículos de 2023 vs 2024 en la búsqueda? (Metadatos).
   - ¿Qué pasa si tienes 10 millones de artículos? ¿Postgres aguantaría o necesitas Qdrant/Milvus?
3. Dibuja en papel: ¿Cómo conectarías tu sistema de embeddings con la base de datos? ¿Dónde guardarías el texto original? (Sugerencia: En la Vector DB guardas solo el ID y el Vector; el texto pesado guárdalo en una DB normal y únelo por ID).

---

## 📚 Recursos y siguiente paso

- **Documentación:** [pgvector](https://github.com/pgvector/pgvector), [Pinecone Docs](https://docs.pinecone.io), [Qdrant Docs](https://qdrant.tech/documentation)
- **Conceptos:** "Approximate Nearest Neighbor (ANN) Search"
- **Siguiente capítulo:** RAG (Retrieval-Augmented Generation): Cómo unir todo (Embeddings + Vector DB + LLM) para crear sistemas que responden con tu información privada.
