/**
 * Leistungen – Bereich «Leistungen» auf der Startseite.
 * Bewusst kurz: Titel und ein Satz pro Leistung.
 */

export interface Service {
  id: string;
  title: string;
  text: string;
  /** Icon-Name, siehe Zuordnung in src/pages/index.astro */
  icon: 'design' | 'seo' | 'speed' | 'care';
}

export const services: Service[] = [
  {
    id: 'webdesign',
    title: 'Webdesign',
    text: 'Individuell gestaltet statt Baukasten – passend zu Ihrem Betrieb und Ihren Kunden.',
    icon: 'design',
  },
  {
    id: 'seo',
    title: 'Google-Optimierung',
    text: 'Technisch sauber aufgebaut, damit Kunden aus Ihrer Region Sie finden.',
    icon: 'seo',
  },
  {
    id: 'technik',
    title: 'Schnell & sicher',
    text: 'Kurze Ladezeiten, HTTPS und keine Tracker – nach aktuellen Standards.',
    icon: 'speed',
  },
  {
    id: 'betreuung',
    title: 'Hosting & Betreuung',
    text: 'Domain, Backups und Änderungen aus einer Hand – auch nach dem Start.',
    icon: 'care',
  },
];
