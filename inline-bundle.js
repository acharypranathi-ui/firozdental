import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const distAssetsDir = path.join(distDir, 'assets');

let htmlContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Find JS file in assets
const assetFiles = fs.readdirSync(distAssetsDir);
const jsFile = assetFiles.find(f => f.endsWith('.js'));

if (jsFile) {
  const jsContent = fs.readFileSync(path.join(distAssetsDir, jsFile), 'utf8');
  // Replace the script tag with an inline script tag
  const scriptTagRegex = new RegExp(`<script type="module" crossorigin src="\\.?/assets/${jsFile}"></script>`);
  htmlContent = htmlContent.replace(
    scriptTagRegex,
    `<script type="module">\n${jsContent}\n</script>`
  );
}

// Write directly to index.html at root C:\Users\SOMU\OneDrive\Desktop\firoz denta\index.html
const targetPath = path.join(__dirname, 'index.html');
fs.writeFileSync(targetPath, htmlContent, 'utf8');
console.log('Successfully bundled standalone website to:', targetPath);
console.log('Total file size:', htmlContent.length, 'bytes');
