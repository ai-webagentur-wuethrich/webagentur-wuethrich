/**
 * Preise und Konditionen – Quelle: Dokument «Webagentur Wüthrich – Preise,
 * Offerte, AGB & Rechnung». Alle Preise in CHF, nicht MWST-pflichtig.
 * Änderungen hier wirken auf Startseite, Preisseite und Kontaktformular.
 */

export interface Package {
  id: string;
  name: string;
  price: number;
  /** Preis mit 20 % Referenzrabatt. */
  referencePrice: number;
  pages: string;
  summary: string;
  features: string[];
  recommended?: boolean;
}

export const referenceDiscount = 20;

export const packages: Package[] = [
  {
    id: 'start',
    name: 'Start',
    price: 790,
    referencePrice: 632,
    pages: 'bis 4 Seiten',
    summary: 'Für den professionellen ersten Auftritt im Netz.',
    features: ['Bis 4 Seiten', 'Kontaktangaben mit Klick-zum-Anrufen'],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 1190,
    referencePrice: 952,
    pages: 'bis 8 Seiten',
    summary: 'Die Website, die Anfragen bringt – mit Texten und regionaler Google-Optimierung.',
    features: [
      'Bis 8 Seiten',
      'Kontaktformular',
      'Regionale Google-Optimierung',
      'Texte inklusive',
    ],
    recommended: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1790,
    referencePrice: 1432,
    pages: 'bis 15 Seiten',
    summary: 'Für Betriebe, die Projekte zeigen und mehr Funktionen brauchen.',
    features: [
      'Bis 15 Seiten',
      'Kontaktformular',
      'Projekte / Galerie',
      '2 Zusatzfunktionen inklusive',
    ],
  },
];

/** In allen Paketen enthalten. */
export const included = [
  'Individuelles Design',
  'Für Smartphone optimiert',
  'Schnelle Ladezeiten',
  'Sicher und nach aktuellem Stand aufgebaut',
  'Grundlagen für Google (SEO)',
  'Lizenzierte Bilder',
  'Impressum und Datenschutzerklärung (zählen nicht als Seite)',
  '2 Korrekturrunden',
];

export interface Addon {
  name: string;
  price: string;
}

export const addons: Addon[] = [
  { name: 'Terminanfrage / Buchungsformular', price: '90' },
  { name: 'Bildergalerie / Projektübersicht', price: '90' },
  { name: 'Weitere Sprache (pro Sprache, mit Umschalt-Knopf)', price: '190' },
  { name: 'Zusätzliche Seite (über dem Paketumfang)', price: '49 pro Seite' },
];

export interface MonthlyPlan {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

export const monthlyPlans: MonthlyPlan[] = [
  {
    id: 'hosting',
    name: 'Hosting',
    monthly: 19,
    yearly: 209,
    description: 'Ihre Website bleibt online, sicher und gesichert.',
    features: ['Hosting', 'Domain', 'SSL-Verschlüsselung', 'Automatische Backups', 'Keine Änderungen inklusive'],
  },
  {
    id: 'betreuung',
    name: 'Betreuung',
    monthly: 39,
    yearly: 429,
    description: 'Wie Hosting – plus laufende Änderungen und Anpassungen.',
    features: [
      'Alles aus Hosting',
      'Bis 30 Minuten Änderungen pro Monat (nicht übertragbar)',
      'Anpassungen bei Datenschutz-Änderungen',
    ],
    recommended: true,
  },
];

export const conditions = [
  {
    title: 'Referenzrabatt 20 %',
    text: 'Für die ersten Kundinnen und Kunden, nur auf den einmaligen Preis – gegen Nennung als Referenz (Name, Screenshot, Link).',
  },
  {
    title: 'Ihre Website gehört Ihnen',
    text: 'Nach vollständiger Bezahlung mit allen Nutzungsrechten. Die Domain wird auf Ihren Namen registriert.',
  },
  {
    title: 'Änderungen ausserhalb der Betreuung',
    text: 'Pauschal CHF 25 (bis 15 Minuten) oder CHF 80 pro Stunde, pro angefangene 15 Minuten. Ab 1 Stunde vorher Kostenvoranschlag.',
  },
  {
    title: 'Website ohne Betreuung',
    text: 'Sie erhalten alle Dateien und brauchen ein eigenes Hosting. Einrichtung in Ihrem Konto optional für CHF 150.',
  },
  {
    title: 'Kündigung',
    text: 'Hosting und Betreuung jederzeit mit einem Monat Frist auf Monatsende kündbar.',
  },
  {
    title: 'Zahlung',
    text: '50 % bei Auftrag, 50 % vor Veröffentlichung, Zahlungsfrist 10 Tage.',
  },
];

/** Zahl im Schweizer Format, z. B. 1190 → «1’190». */
export function chf(value: number): string {
  return value.toLocaleString('de-CH');
}
