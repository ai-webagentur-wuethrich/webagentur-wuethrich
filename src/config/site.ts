/**
 * Zentrale Website-Konfiguration: Firmendaten, Navigation, SEO-Standardwerte.
 * Echte Agentur-Website (keine Demo).
 */

export interface NavItem {
  label: string;
  href: string;
}

export const site = {
  name: 'Webagentur Wüthrich',
  owner: 'Artur Wüthrich',
  tagline: 'Websites für Schweizer KMU',
  /** Weitere Schreibweisen des Namens – damit Google die Marke auch so erkennt. */
  alternateNames: ['Webagentur Wuethrich', 'Wüthrich Webagentur', 'Wuethrich Webdesign'],
  /**
   * Google Search Console: Bestätigungscode (nur der Wert von content="…").
   * Leer = kein Meta-Tag.
   */
  googleSiteVerification: '',
  description:
    'Webagentur Wüthrich: individuelles Webdesign für KMU in Basel und der ganzen Deutschschweiz. Schnelle, sichere und für Google optimierte Websites – Fixpreise ab CHF 790.',
  locale: 'de_CH',
  lang: 'de-CH',
  /** false = echte Website: indexierbar, LocalBusiness-Schema aktiv, keine Demo-Hinweise. */
  isDemo: false,
  /** Neuer Dateiname bei jeder Änderung des Vorschaubilds (Zwischenspeicher von WhatsApp & Co.). */
  defaultOgImage: '/og-webagentur-wuethrich-v2.jpg',
  contact: {
    /**
     * Öffentliche E-Mail-Adresse, zugleich Empfänger des Kontaktformulars.
     * Leer lassen = Formular ausgeschaltet, Platzhalter in Impressum/Datenschutz.
     */
    email: 'info@webagentur-wuethrich.com',
    phone: '+41 76 426 61 44',
    phoneHref: '+41764266144',
    street: 'Rössligasse 67',
    postalCode: '4125',
    city: 'Riehen',
    region: 'Basel-Stadt',
    regionCode: 'BS',
    country: 'CH',
    countryName: 'Schweiz',
  },
  /** Koordinaten von Riehen (Gemeinde) – für strukturierte Daten (Google). */
  geo: { lat: 47.5788, lng: 7.6468 },
  serviceArea: ['Riehen', 'Basel', 'Region Basel', 'Nordwestschweiz', 'Deutschschweiz'],
  /** Landingpage: Navigation springt zu den Bereichen der Startseite. */
  nav: [
    { label: 'Leistungen', href: '/#leistungen' },
    { label: 'Preise', href: '/#preise' },
    { label: 'Demo', href: '/#demo' },
    { label: 'Über mich', href: '/#ueber-mich' },
  ] satisfies NavItem[],
  legalNav: [
    { label: 'AGB', href: '/agb/' },
    { label: 'Impressum', href: '/impressum/' },
    { label: 'Datenschutz', href: '/datenschutz/' },
  ] satisfies NavItem[],
  /** Hosting – für Datenschutzerklärung und AGB. */
  hosting: {
    provider: 'Hostinger International Ltd.',
    providerSeat: 'Zypern',
    /** Rechenzentrum der Website (Hostinger hPanel → Websites → Dashboard). */
    serverLocation: 'Deutschland (Frankfurt)',
    /** Speicherort der Sicherungskopien (Backups). */
    backupLocation: 'Frankreich',
    /** Anbieter des E-Mail-Postfachs (Kontaktformular und E-Mail). */
    emailProvider: 'Hostinger',
  },
  /** Kontaktformular (PHP-Skript auf Hostinger, siehe src/pages/kontakt-senden.php.ts). */
  form: {
    endpoint: '/kontakt-senden.php',
    /**
     * Absenderadresse der Formular-Mails. Muss ein bestehendes Postfach auf der
     * eigenen Domain sein, sonst landen die Mails im Spam. Die Adresse der
     * anfragenden Person steht als «Antworten an» in der Mail.
     */
    sender: 'info@webagentur-wuethrich.com',
  },
};

export type Site = typeof site;

/** Telefonnummer für Links (tel:). */
export const telHref = `tel:${site.contact.phoneHref}`;
