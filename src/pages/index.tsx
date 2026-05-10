import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function Home(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description="Ebook técnico sobre desarrollo e implementación de sistemas de IA en producción"
    >
      <header
        className="hero hero--primary"
        style={{ backgroundColor: "#667eea", padding: "4rem 0" }}
      >
        <div className="container">
          <h1
            className="hero__title"
            style={{ fontSize: "3rem", marginBottom: "1rem" }}
          >
            🤖 {siteConfig.title}
          </h1>
          <p
            className="hero__subtitle"
            style={{ fontSize: "1.5rem", marginBottom: "2rem" }}
          >
            {siteConfig.tagline}
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                className="button button--secondary button--lg hero-button-primary"
                to="/intro"
                title="Comenzar lectura"
                style={{
                  backgroundColor: "white",
                  color: "#667eea",
                  border: "none",
                }}
              >
                🏠 Comenzar Lectura
              </Link>
              <Link
                className="button button--outline button--secondary button--lg hero-button-outline"
                to="/capitulos/primeros%20pasos-con-ia"
                title="Ver capítulo 1"
              >
                📖 Ver Capítulo 1
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--4 margin-bottom--lg">
            <div className="card" style={{ height: "100%" }}>
              <div className="card__body">
                <h3>📚 17 Capítulos</h3>
                <p>
                  Desde fundamentos hasta producción: tokenización, embeddings,
                  RAG, Fine-Tuning, MLOps y más.
                </p>
              </div>
            </div>
          </div>
          <div className="col col--4 margin-bottom--lg">
            <div className="card" style={{ height: "100%" }}>
              <div className="card__body">
                <h3>🔧 Técnico y Práctico</h3>
                <p>
                  Checklists, laboratorios conceptuales y arquitecturas de
                  referencia listas para producción.
                </p>
              </div>
            </div>
          </div>
          <div className="col col--4 margin-bottom--lg">
            <div className="card" style={{ height: "100%" }}>
              <div className="card__body">
                <h3>🎯 Orientado a Resultados</h3>
                <p>
                  Enfocado en sistemas que funcionan en el mundo real, no solo
                  en tutoriales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
