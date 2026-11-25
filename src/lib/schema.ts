/**
 * Strukturierte Daten (Schema.org / JSON-LD) für Google.
 * Nur echte Angaben verwenden – keine Bewertungen oder erfundene Daten.
 */
import { site } from '@/config/site';
import { packages } from '@/config/pricing';

export function websiteSchema(siteUrl: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: siteUrl?.toString(),
    inLanguage: site.lang,
  };
}

/** Agentur als lokales Dienstleistungsunternehmen (ProfessionalService). */
export function businessSchema(siteUrl: URL | undefined) {
  if (site.isDemo) return null;
  const { contact } = site;
  const prices = packages.map((p) => p.price);
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': siteUrl ? new URL('/#organisation', siteUrl).toString() : undefined,
    name: site.name,
    description: site.description,
    url: siteUrl?.toString(),
    logo: siteUrl ? new URL('/apple-touch-icon-v2.png', siteUrl).toString() : undefined,
    image: siteUrl ? new URL(site.defaultOgImage, siteUrl).toString() : undefined,
    founder: { '@type': 'Person', name: site.owner },
    telephone: contact.phone,
    ...(contact.email ? { email: contact.email } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.street,
      postalCode: contact.postalCode,
      addressLocality: contact.city,
      addressRegion: contact.regionCode,
      addressCountry: contact.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    areaServed: [
      { '@type': 'City', name: 'Basel' },
      { '@type': 'City', name: 'Riehen' },
      { '@type': 'Country', name: 'Schweiz' },
    ],
    priceRange: `CHF ${Math.min(...prices)}–${Math.max(...prices)}`,
    currenciesAccepted: 'CHF',
  };
}

/** Website-Pakete als Angebote (Preisseite). */
export function offersSchema(siteUrl: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Website-Erstellung',
    provider: { '@id': siteUrl ? new URL('/#organisation', siteUrl).toString() : undefined },
    areaServed: { '@type': 'Country', name: 'Schweiz' },
    offers: packages.map((p) => ({
      '@type': 'Offer',
      name: `Website ${p.name}`,
      description: `${p.pages}: ${p.features.join(', ')}`,
      price: p.price,
      priceCurrency: 'CHF',
    })),
  };
}
