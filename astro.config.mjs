// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Öffentliche Domain: per Umgebungsvariable SITE_URL setzen (siehe .env.example).
// Standard: Domain der Agentur.
const site = process.env.SITE_URL || 'https://webagentur-wuethrich.com';

export default defineConfig({
  site,
  // Statische Ausgabe (SSG) – das Ergebnis landet im Ordner «dist».
  output: 'static',
  outDir: './dist',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      // In die Sitemap gehört nur die Landingpage. Rechtliche Seiten sind «noindex»
      // (Adresse nicht in den Google-Ergebnissen), Danke/Fehler/404 sowieso.
      filter: (page) => new URL(page).pathname === '/',
      lastmod: new Date(),
    }),
  ],
  // Schriften liegen lokal im Projekt (src/assets/fonts) und werden selbst
  // ausgeliefert – keine Verbindung der Besucher zu Google & Co.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Geist',
      cssVariable: '--font-sans',
      fallbacks: ['system-ui', 'sans-serif'],
      display: 'swap',
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/geist-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Geist Mono',
      cssVariable: '--font-mono',
      fallbacks: ['ui-monospace', 'monospace'],
      display: 'swap',
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/geist-mono-latin-wght-normal.woff2'],
            weight: '100 900',
            style: 'normal',
          },
        ],
      },
    },
  ],
  // Content Security Policy: Astro berechnet für jedes Skript eine Prüfsumme (Hash),
  // nur diese Skripte dürfen laufen. Inline-Styles bleiben erlaubt (für style-Attribute).
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "form-action 'self'",
        "base-uri 'self'",
        "object-src 'none'",
      ],
      styleDirective: {
        resources: ["'self'", "'unsafe-inline'"],
      },
    },
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
});
