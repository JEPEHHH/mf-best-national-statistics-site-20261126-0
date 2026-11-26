// Nusa Angka hand-in program (Node 22, standard library only, offline).
// It copies this repository's app/ and screenshots/ to the output directory and
// writes the dossier the judge reads, using the kit's unchanged dossier library.
import { cpSync, existsSync, mkdirSync, writeFileSync, readdirSync, statSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
for (const name of ['app', 'screenshots']) {
  const target = join(out, name);
  if (existsSync(target)) rmSync(target, { recursive: true, force: true });
}
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// Fail early on a missing front page instead of handing in an empty shell.
const front = join(out, 'app', 'index.html');
if (!existsSync(front) || !statSync(front).isFile()) throw new Error('app/index.html is missing');

writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216
  })
);

const count = (dir) => readdirSync(dir, { withFileTypes: true }).filter(e => e.isFile()).length;
console.log(`Handed in: ${count(join(out, 'app'))} app files, ${count(join(out, 'screenshots'))} screenshots -> ${out}`);
