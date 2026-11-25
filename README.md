# Webagentur Wüthrich – Website

Website der **Webagentur Wüthrich** (Artur Wüthrich, Riehen): Landingpage mit
Leistungen, Preisen, Demo-Beispiel, «Über mich» und Kontaktformular sowie die
Seiten AGB, Impressum und Datenschutz.

## Technik

- [Astro](https://astro.build) 7 mit TypeScript – statische Ausgabe (SSG)
- Eigenes CSS mit Design-Tokens, Schriften Geist / Geist Mono lokal eingebunden
- Lucide-Icons, Bildoptimierung mit Astro (AVIF/WebP, responsive Grössen)
- SEO: Titel/Description, Canonical, Open Graph, Sitemap, robots.txt, JSON-LD
- Content Security Policy (von Astro pro Seite erzeugt), Sicherheits-Header in `public/.htaccess`
- Kontaktformular: PHP-Skript `kontakt-senden.php` (wird beim Build aus
  `src/pages/kontakt-senden.php.ts` erzeugt, läuft auf dem Hostinger-Webhosting)
- Animationen: CSS + ein kleines Skript (`src/components/Effects.astro`),
  respektiert «Bewegung reduzieren»

## Befehle

| Befehl            | Zweck                                         |
| ----------------- | --------------------------------------------- |
| `npm install`     | Abhängigkeiten installieren (einmalig)        |
| `npm run dev`     | Entwicklungsserver auf http://localhost:4321  |
| `npm run build`   | Produktions-Build in den Ordner `dist/`       |
| `npm run preview` | Fertigen Build lokal ansehen                  |
| `npm run verify`  | Prüfung + Build in einem Schritt              |

Benötigt Node.js 22.23 oder neuer (siehe `.nvmrc`).

## Inhalte ändern

| Was                          | Datei                               |
| ---------------------------- | ----------------------------------- |
| Firmendaten, E-Mail, Telefon | `src/config/site.ts`                |
| Preise, Pakete, Konditionen  | `src/config/pricing.ts`             |
| Leistungen                   | `src/config/services.ts`            |
| Texte der Landingpage        | `src/pages/index.astro`             |
| AGB / Impressum / Datenschutz| `src/pages/agb.astro` usw.          |
| Porträt                      | `src/assets/images/portrait.jpg`    |
| Hosting / Serverstandort     | `src/config/site.ts` (`hosting`)    |

## Vor der Veröffentlichung

1. E-Mail-Adresse ist eingetragen (`info@webagentur-wuethrich.com`, `src/config/site.ts`).
   Sie ist Empfänger und Absender des Kontaktformulars – das Postfach muss bei
   Hostinger existieren. Nach der Veröffentlichung einmal eine Testanfrage senden.
2. Platzhalter in der Datenschutzerklärung ergänzen (Aufbewahrungsdauer
   Logfiles, E-Mail-Anbieter). Platzhalter sind auf der Website gelb markiert.
3. Serverstandort in `src/config/site.ts` (`hosting.serverLocation`) eintragen.

## Hosting auf Hostinger

Hostinger baut die Website **nicht** selbst. GitHub baut sie automatisch
(`.github/workflows/deploy-hostinger.yml`) und legt die fertigen Dateien in den
Zweig **`hostinger`**.

- Git-Deployment in Hostinger: Repository `webagentur-wuethrich`, Zweig **`hostinger`**
  (nicht `main`!), Verzeichnis `public_html` (leer)
- Für automatische Aktualisierung: «Auto-Deployment» aktivieren und die
  Webhook-URL in GitHub unter Settings → Webhooks eintragen.
- Domain: Standard ist `https://webagentur-wuethrich.com` (`astro.config.mjs`),
  alternativ GitHub-Variable `SITE_URL`.

## Bildnachweis

Hero-Grafik (Höhenlinien): eigene Gestaltung. Screenshots der Demo-Website:
eigene Aufnahmen (enthaltenes Foto von Unsplash, im Impressum genannt).
