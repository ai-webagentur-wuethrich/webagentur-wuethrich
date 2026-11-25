/**
 * Leistungen – Bereich «Leistungen» auf der Startseite.
 */

export interface Service {
  id: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    id: 'website',
    title: 'Website-Erstellung',
    description:
      'Ich gestalte und programmiere Ihre Website von Grund auf – passend zu Ihrer Branche, Ihren Kunden und Ihrem Auftritt. Keine Baukasten-Vorlage, sondern ein Design, das zu Ihrem Betrieb passt.',
  },
  {
    id: 'seo',
    title: 'Google-Optimierung (SEO)',
    description:
      'Eine schöne Website nützt wenig, wenn sie niemand findet. Deshalb baue ich jede Seite so auf, dass Google sie gut versteht – technisch sauber und mit Inhalten, die zu den Suchbegriffen Ihrer Kunden passen.',
  },
  {
    id: 'performance',
    title: 'Ladezeit & Technik',
    description:
      'Langsame Seiten verlieren Besucher. Ich optimiere Bilder, Schriften und Code konsequent und orientiere mich an den Core Web Vitals von Google.',
  },
  {
    id: 'sicherheit',
    title: 'Sicherheit & Datenschutz',
    description:
      'Ihre Website wird nach aktuellem Stand aufgebaut: verschlüsselt, mit Sicherheits-Headern und ohne Drittanbieter, die Daten Ihrer Besucher sammeln. Impressum und Datenschutzerklärung erstelle ich als Vorlage mit.',
  },
  {
    id: 'texte',
    title: 'Texte & Inhalte',
    description:
      'Im Paket Standard schreibe ich die Texte für Sie – klar, natürlich und mit den richtigen Suchbegriffen. Sie liefern die Fakten, ich forme daraus eine Website, die überzeugt.',
  },
  {
    id: 'betreuung',
    title: 'Hosting & Betreuung',
    description:
      'Auf Wunsch kümmere ich mich um Hosting, Domain, Backups und laufende Änderungen. So bleibt Ihre Website aktuell, ohne dass Sie sich um Technik kümmern müssen.',
  },
];
