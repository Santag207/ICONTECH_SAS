const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(8085, async () => {
  console.log('Server running on port 8085');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await page.goto('http://localhost:8085');
  await page.waitForTimeout(500);

  // Take screenshot in Spanish
  await page.screenshot({ path: '/home/jules/verification/screenshots/i18n_es.png' });
  console.log('Captured i18n_es.png');

  // Switch to English
  await page.click('button[data-lang="en"]');
  await page.waitForTimeout(500);

  // Take screenshot in English
  await page.screenshot({ path: '/home/jules/verification/screenshots/i18n_en.png' });
  console.log('Captured i18n_en.png');

  // Verify English text content in key sections
  const heroTitle = await page.textContent('h1.hero__title');
  const navSolutions = await page.textContent('span[data-i18n="nav_solutions"]');
  console.log('Hero Title (EN):', heroTitle);
  console.log('Nav Solutions (EN):', navSolutions);

  await browser.close();
  server.close();
});
