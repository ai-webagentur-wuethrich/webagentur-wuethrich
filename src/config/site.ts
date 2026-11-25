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
  description:
    'Webagentur Wüthrich in Riehen bei Basel: schnelle, sichere und für Google optimierte Websites für Schweizer KMU – zu transparenten Fixpreisen ab CHF 790.',
  locale: 'de_CH',
  lang: 'de-CH',
  /** false = echte Website: indexierbar, LocalBusiness-Schema aktiv, keine Demo-Hinweise. */
  isDemo: false,
  /** Neuer Dateiname bei jeder Änderung des Vorschaubilds (Zwischenspeicher von WhatsApp & Co.). */
  defaultOgImage: '/og-webagentur-wuethrich-v1.jpg',
  contact: {
    /**
     * PLATZHALTER: E-Mail-Adresse folgt. Solange leer:
     * – Impressum/Datenschutz zeigen einen markierten Platzhalter,
     * – das Kontaktformular verweist auf das Telefon.
     */
    email: '',
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
  /** Koordinaten von Riehen (Gemeinde), dekorativ im Hero verwendet. */
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
    /**
     * PLATZHALTER: Rechenzentrum der eigenen Website, z. B. 'Deutschland (Frankfurt)'
     * oder 'Litauen'. Zu finden in Hostinger hPanel → Websites → Dashboard / Plan-Details.
     */
    serverLocation: '',
  },
  /** Kontaktformular (PHP-Skript auf Hostinger, siehe src/pages/kontakt-senden.php.ts). */
  form: {
    endpoint: '/kontakt-senden.php',
    /**
     * Absenderadresse der Formular-Mails. Muss bei Hostinger als Postfach
     * auf der eigenen Domain existieren, sonst landen Mails im Spam.
     * PLATZHALTER: nach Einrichtung der E-Mail prüfen.
     */
    sender: 'website@webagentur-wuethrich.com',
  },
};

export type Site = typeof site;

/** Telefonnummer für Links (tel:). */
export const telHref = `tel:${site.contact.phoneHref}`;
