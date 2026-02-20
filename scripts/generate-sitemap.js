const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://przegladbudowlany.eu';
const CITIES_DATA_PATH = path.join(__dirname, '../src/helpers/citiesData.js');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

// Static routes
const routes = [
  '/',
  '/przewodnik',
  '/przeglad-budowlany',
  '/przeglad-gazowy',
  '/przeglad-elektryczny',
  '/przeglad-wentylacyjny',
  '/blog',
  '/kontakt',
  '/cennik',
  '/form',
  '/regulamin',
  '/polityka-prywatnosci'
];

// Read citiesData.js and extract slugs
try {
  const fileContent = fs.readFileSync(CITIES_DATA_PATH, 'utf8');
  const slugRegex = /slug:\s*"([^"]+)"/g;
  let match;
  
  while ((match = slugRegex.exec(fileContent)) !== null) {
    routes.push(`/przeglad-budowlany-${match[1]}`);
  }

  console.log(`Found ${routes.length} routes.`);

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `
  <url>
    <loc>${DOMAIN}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, sitemapContent);
  console.log(`Sitemap generated at ${SITEMAP_PATH}`);

} catch (err) {
  console.error('Error generating sitemap:', err);
}
