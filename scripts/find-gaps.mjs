// Lists every open question marked in the site's content.
//   npm run gaps          -> list them
//   npm run gaps:strict   -> list them and exit with an error if any remain
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { MARKER_RE } from '../src/lib/markers.mjs';

const root = new URL('..', import.meta.url).pathname;
const dirs = ['src/content', 'src/data', 'src/pages'];
const strict = process.argv.includes('--strict');

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* files(p);
    else if (/\.(md|mdx|ts|astro)$/.test(name)) yield p;
  }
}

const counts = {};
let total = 0;
for (const d of dirs) {
  for (const f of files(join(root, d))) {
    readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
      for (const m of line.matchAll(MARKER_RE)) {
        total++;
        counts[m[1]] = (counts[m[1]] ?? 0) + 1;
        console.log(`${relative(root, f)}:${i + 1}  ${m[0]}`);
      }
    });
  }
}
console.log(`\n${total} open item(s):`, counts);
if (strict && total > 0) {
  console.error('Resolve or remove these markers before publishing.');
  process.exit(1);
}
