import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Desarrollo para IA",
  tagline: "Fundamentos, Flujo de Datos y Producción",
  url: "https://ai-ebook.cesarcancino.com",
  baseUrl: "/",
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css",
      },
    },
  ],
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  i18n: { defaultLocale: "es", locales: ["es"] },
  trailingSlash: false,

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/", // Sin /docs en la URL
          editUrl: "https://github.com/peligro/ai-ebook/tree/main/",
        },
        theme: { customCss: "./src/css/custom.css" },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "dark", // Modo oscuro por defecto
      disableSwitch: true, // false = permite cambiar, true = fuerza siempre oscuro
      respectPrefersColorScheme: false, // false = ignora preferencia del sistema
    },
    navbar: {
      title: "🤖 Desarrollo para IA",
      items: [
        { to: "/intro", label: "Inicio", position: "left" },
        {
          href: "https://github.com/peligro/ai-ebook",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `© Todos los derechos reservados ${new Date().getFullYear()} | Desarrollado por César Cancino`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  markdown: { mermaid: true },
  themes: ["@docusaurus/theme-mermaid"],
};

export default config;
