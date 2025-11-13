const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

const hostname = 'https://abiddasurkar.github.io/banking-dashboard/';

const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/transactions', changefreq: 'weekly', priority: 0.9 },
  // Future pages can be added here
];

async function generateSitemap() {
  const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
  const stream = new SitemapStream({ hostname });
  const writeStream = createWriteStream(sitemapPath);

  stream.pipe(writeStream);

  links.forEach(link => {
    stream.write(link);
  });

  stream.end();

  await streamToPromise(writeStream);
  console.log('✅ sitemap.xml generated at public/sitemap.xml');
}

generateSitemap().catch(console.error);
