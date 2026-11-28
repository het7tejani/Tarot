import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const blogDir = path.join(root, 'public', 'blog-images');
const compatDir = path.join(root, 'public', 'compatibility');
const signsDir = path.join(root, 'public', 'perf-assets', 'signs');
const readingOutDir = path.join(root, 'public', 'reading-images');
const readingStockPath = path.join(root, 'art-src', 'reading-stock.json');

const jobs = [];
const add = (input, output, width, quality = 82) => jobs.push({ input, output, width, quality });
const maybeAdd = (input, output, width, quality = 82) => {
  if (!fs.existsSync(output) || fs.statSync(output).mtimeMs < fs.statSync(input).mtimeMs) add(input, output, width, quality);
};
const runJobs = async () => {
  for (const job of jobs) {
    const meta = await sharp(job.input).metadata();
    const width = Math.min(job.width, meta.width || job.width);
    await sharp(job.input).resize({ width, withoutEnlargement: true }).webp({ quality: job.quality }).toFile(job.output);
  }
};

if (fs.existsSync(blogDir)) {
  for (const name of fs.readdirSync(blogDir).filter((n) => n.endsWith('.webp') && !/-(400|800)\.webp$/.test(n))) {
    const input = path.join(blogDir, name);
    maybeAdd(input, path.join(blogDir, name.replace(/\.webp$/, '-400.webp')), 400);
    maybeAdd(input, path.join(blogDir, name.replace(/\.webp$/, '-800.webp')), 800);
  }
}

if (fs.existsSync(compatDir)) {
  for (const name of fs.readdirSync(compatDir).filter((n) => n.endsWith('.webp') && !/-(480|800|1200)\.webp$/.test(n))) {
    const input = path.join(compatDir, name);
    for (const width of [480, 800, 1200]) maybeAdd(input, path.join(compatDir, name.replace(/\.webp$/, `-${width}.webp`)), width, 80);
  }
}

if (fs.existsSync(signsDir)) {
  for (const name of fs.readdirSync(signsDir).filter((n) => n.endsWith('-original.png'))) {
    const input = path.join(signsDir, name);
    const base = name.replace(/-original\.png$/, '');
    for (const width of [360, 480]) maybeAdd(input, path.join(signsDir, `${base}-hero-${width}.webp`), width, 84);
  }
}

let tmpDir = '';
if (fs.existsSync(readingStockPath)) {
  fs.mkdirSync(readingOutDir, { recursive: true });
  tmpDir = fs.mkdtempSync(path.join(root, 'art-src', '.reading-source-'));
  const stock = JSON.parse(fs.readFileSync(readingStockPath, 'utf8'));
  for (const [id, encoded] of Object.entries(stock)) {
    const input = path.join(tmpDir, `${id}.png`);
    fs.writeFileSync(input, Buffer.from(encoded, 'base64'));
    for (const width of [240, 400]) {
      const output = path.join(readingOutDir, `${id}-${width}.webp`);
      if (!fs.existsSync(output) || fs.statSync(output).mtimeMs < fs.statSync(readingStockPath).mtimeMs) add(input, output, width, 80);
    }
  }
}

try {
  await runJobs();
} finally {
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true });
}

console.log(`image sizes ready: ${jobs.length} generated`);
