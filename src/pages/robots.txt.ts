import type { APIRoute } from 'astro';

/**
 * robots.txt mit Verweis auf die automatisch erzeugte Sitemap.
 * Das Formular-Skript wird von der Indexierung ausgenommen.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site);
  const body = `User-agent: *\nAllow: /\nDisallow: /kontakt-senden.php\n\nSitemap: ${sitemapUrl.href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
