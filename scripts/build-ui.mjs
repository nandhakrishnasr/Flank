import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const esbuildExe = 'C:\\Users\\NANDHA KRISHNA\\Documents\\GitHub\\coucou\\windows\\node_modules\\@esbuild\\win32-x64\\esbuild.exe';
const rootDir = 'C:\\Users\\NANDHA KRISHNA\\Documents\\GitHub\\Flank';
const entryFile = path.join(rootDir, 'src', 'main.ts');
const outFile = path.join(rootDir, 'public', 'bundle.js');

if (fs.existsSync(esbuildExe)) {
  execFileSync(
    esbuildExe,
    [entryFile, '--bundle', '--format=esm', `--outfile=${outFile}`, '--target=es2022'],
    { stdio: 'inherit' }
  );
  console.log('Bundled UI into public/bundle.js via esbuild.exe');
} else {
  throw new Error('esbuild.exe not found at ' + esbuildExe);
}
