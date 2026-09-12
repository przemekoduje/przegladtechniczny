const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://przeglady-domu.com';
const CITIES_DATA_PATH = path.join(__dirname, '../src/helpers/citiesData.js');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

// Helper to sanitize title to slug (matching BlogDB.jsx)
const deburr = (str) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l").replace(/Ł/g, "L");

const createSlug = (title) =>
  deburr(title)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, "")
    .replace(/\s+/g, "-");

async function generateSitemap() {
  try {
    // 1. Static 200 OK routes (excluding redirects like /kontakt and /cennik)
    const staticRoutes = [
      { path: '/', priority: '1.0', changefreq: 'weekly' },
      { path: '/przewodnik', priority: '0.8', changefreq: 'monthly' },
      { path: '/przeglad-budowlany', priority: '0.9', changefreq: 'weekly' },
      { path: '/przeglad-gazowy', priority: '0.9', changefreq: 'weekly' },
      { path: '/przeglad-elektryczny', priority: '0.9', changefreq: 'weekly' },
      { path: '/przeglad-wentylacyjny', priority: '0.9', changefreq: 'weekly' },
      { path: '/blog', priority: '0.9', changefreq: 'daily' },
      { path: '/form', priority: '0.8', changefreq: 'monthly' },
      { path: '/regulamin', priority: '0.3', changefreq: 'yearly' },
      { path: '/polityka-prywatnosci', priority: '0.3', changefreq: 'yearly' }
    ];

    const allRoutes = [...staticRoutes];

    // 2. Read citiesData.js and extract all 20 city slugs
    const fileContent = fs.readFileSync(CITIES_DATA_PATH, 'utf8');
    const slugRegex = /slug:\s*"([^"]+)"/g;
    let match;
    let cityCount = 0;

    while ((match = slugRegex.exec(fileContent)) !== null) {
      allRoutes.push({
        path: `/przeglad-budowlany-${match[1]}`,
        priority: '0.8',
        changefreq: 'weekly'
      });
      cityCount++;
    }
    console.log(`Found ${cityCount} city landing routes.`);

    // 3. Fetch blog posts from Firestore REST API
    try {
      const firestoreUrl = "https://firestore.googleapis.com/v1/projects/przegladtechniczny-6b336/databases/(default)/documents/posts";
      const response = await fetch(firestoreUrl);
      if (response.ok) {
        const data = await response.json();
        if (data.documents && Array.isArray(data.documents)) {
          let postCount = 0;
          data.documents.forEach(doc => {
            const title = doc.fields?.title?.stringValue;
            if (title) {
              const slug = createSlug(title);
              allRoutes.push({
                path: `/blog/${slug}`,
                priority: '0.7',
                changefreq: 'monthly'
              });
              postCount++;
            }
          });
          console.log(`Fetched ${postCount} blog posts from Firestore.`);
        }
      }
    } catch (err) {
      console.warn('Could not fetch posts from Firestore API, continuing with static + city routes:', err.message);
    }

    const nowIso = new Date().toISOString();

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(item => `  <url>
    <loc>${DOMAIN}${item.path}</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(SITEMAP_PATH, sitemapContent, 'utf8');
    console.log(`Successfully generated sitemap with ${allRoutes.length} URLs at ${SITEMAP_PATH}`);

  } catch (err) {
    console.error('Error generating sitemap:', err);
  }
}

generateSitemap();
