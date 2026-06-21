// One-off: derive clean, non-overlapping post images from the original
// Claude Desktop screenshots using sharp. Tune the crop boxes below by
// running `node scripts/crop-shots.mjs` and inspecting the outputs.
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'src',
  'assets',
  'blog',
  'mcp-rune',
);

// screenshot-1: 848x1901 — chat steps / OVERVIEW+donuts / DURATION bar / ALL ACTIVITIES / DATA QUALITY(start)
// screenshot-2: 813x1384 — DATA QUALITY & GAPS / multi-perspective analysis / claude icons
// screenshot-3: 1182x482 — Engineer's Activities list (kept as-is)
const jobs = [
  {
    src: 'screenshot-1.png',
    out: 'analysis-charts.png',
    // overview tiles + both distribution donuts + duration bar chart
    // (start below the "Analysis clear" step, end before "ALL ACTIVITIES")
    box: { left: 0, top: 470, width: 848, height: 815 },
  },
  {
    src: 'screenshot-2.png',
    out: 'analysis-writeup.png',
    // data-quality & gaps panel + the written multi-perspective analysis
    // (trim the Claude message toolbar icons at the very bottom)
    box: { left: 0, top: 0, width: 813, height: 1245 },
  },
];

for (const { src, out, box } of jobs) {
  const input = path.join(dir, src);
  const meta = await sharp(input).metadata();
  const left = Math.max(0, Math.min(box.left, meta.width - 1));
  const top = Math.max(0, Math.min(box.top, meta.height - 1));
  const width = Math.min(box.width, meta.width - left);
  const height = Math.min(box.height, meta.height - top);
  await sharp(input)
    .extract({ left, top, width, height })
    .toFile(path.join(dir, out));
  console.log(`${src} (${meta.width}x${meta.height}) -> ${out} [${width}x${height} @ ${left},${top}]`);
}

// engineer-activities.png = copy of screenshot-3 (landscape, used as-is)
await sharp(path.join(dir, 'screenshot-3.png')).toFile(path.join(dir, 'engineer-activities.png'));
console.log('screenshot-3.png -> engineer-activities.png (copy)');
