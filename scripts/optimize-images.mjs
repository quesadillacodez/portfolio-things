/**
 * Turns the masters in assets-src/ into the responsive set the site actually ships.
 *
 * Every master produces AVIF, WebP and JPEG at each width below, plus a manifest
 * recording intrinsic dimensions so every <img> can carry width/height and stop
 * reserving the wrong space while it loads.
 *
 * Run with: npm run images
 */
import { readdir, mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'assets-src';
const DEST = 'public/assets';
const MANIFEST = 'src/data/images.json';
const WIDTHS = [400, 800, 1200, 1600];

await rm(DEST, { recursive: true, force: true });
await mkdir(DEST, { recursive: true });

const masters = (await readdir(SRC)).filter((file) => /\.(png|jpe?g)$/i.test(file)).sort();
const manifest = {};

for (const file of masters) {
  const name = path.parse(file).name;
  const input = sharp(path.join(SRC, file));
  const { width, height } = await input.metadata();
  const widths = WIDTHS.filter((w) => w <= width);
  if (widths.at(-1) !== width) widths.push(width);

  for (const w of widths) {
    const resized = () => sharp(path.join(SRC, file)).resize({ width: w, withoutEnlargement: true });
    await resized().avif({ quality: 55, effort: 5 }).toFile(`${DEST}/${name}-${w}.avif`);
    await resized().webp({ quality: 76 }).toFile(`${DEST}/${name}-${w}.webp`);
    await resized().jpeg({ quality: 80, mozjpeg: true }).toFile(`${DEST}/${name}-${w}.jpg`);
  }

  manifest[name] = { width, height, widths };
  console.log(`${name}: ${width}x${height} -> ${widths.join(', ')}`);
}

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`\n${masters.length} masters -> ${DEST}, manifest at ${MANIFEST}`);
