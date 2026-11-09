import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const esbuildExe = 'C:\\Users\\NANDHA KRISHNA\\Documents\\GitHub\\coucou\\windows\\node_modules\\@esbuild\\win32-x64\\esbuild.exe';
const rootDir = 'C:\\Users\\NANDHA KRISHNA\\Documents\\GitHub\\Flank';
const entryFile = path.join(rootDir, 'src', 'main.ts');
const outFile = path.join(rootDir, 'public', 'bundle.js');

const tokensSrc = path.join(rootDir, 'themes', 'tokens.css');
const tokensDst = path.join(rootDir, 'public', 'tokens.css');
if (fs.existsSync(tokensSrc)) {
  fs.copyFileSync(tokensSrc, tokensDst);
}

const onboardingCssSrc = path.join(rootDir, 'src', 'ui', 'onboarding', 'onboarding.css');
const onboardingCssDst = path.join(rootDir, 'public', 'onboarding.css');
if (fs.existsSync(onboardingCssSrc)) {
  fs.copyFileSync(onboardingCssSrc, onboardingCssDst);
}

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
