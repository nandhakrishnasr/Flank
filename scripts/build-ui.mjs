import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
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

const esbuildArgs = [
  'src/main.ts',
  '--bundle',
  '--format=esm',
  '--outfile=public/bundle.js',
  '--target=es2022',
];
const localCandidates = [
  process.env.ESBUILD_PATH,
  path.join(rootDir, 'node_modules', '@esbuild', 'win32-x64', 'esbuild.exe'),
  path.join(rootDir, 'node_modules', '.bin', process.platform === 'win32' ? 'esbuild.cmd' : 'esbuild'),
].filter(Boolean);

const localEsbuild = localCandidates.find((p) => fs.existsSync(p));
if (localEsbuild) {
  execFileSync(localEsbuild, esbuildArgs, {
    cwd: rootDir,
    stdio: 'inherit',
    shell: localEsbuild.toLowerCase().endsWith('.cmd'),
  });
} else {
  const npxBin = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  execFileSync(npxBin, ['--yes', 'esbuild', ...esbuildArgs], {
    cwd: rootDir,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
}
console.log('Bundled UI into public/bundle.js');
