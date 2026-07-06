// Zips pkg/ into src/packages/embervale.mpackage. The zip unpacks into the
// profile at /embervale/ (dir name from the filename); Embervale.xml's init
// script runs `require("embervale")` → /embervale/init.lua.
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { zipSync } from 'fflate';

const SRC = join(import.meta.dirname, '..', 'pkg');
const OUT = join(import.meta.dirname, '..', 'src', 'packages', 'embervale.mpackage');

const files = {};
for (const name of readdirSync(SRC)) files[name] = readFileSync(join(SRC, name));

mkdirSync(join(import.meta.dirname, '..', 'src', 'packages'), { recursive: true });
writeFileSync(OUT, zipSync(files, { level: 6 }));
console.log(`embervale.mpackage: ${Object.keys(files).length} files`);
