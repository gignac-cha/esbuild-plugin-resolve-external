import { build } from 'esbuild';

build({
  entryPoints: ['src/index.ts'],
  outfile: 'index.js',
  platform: 'node',
  target: 'node20',
  bundle: true,
  minify: true,
  external: ['esbuild'],
});
