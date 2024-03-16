import { build } from 'esbuild';
import { resolveExternal } from 'esbuild-plugin-resolve-external';
import { rm } from 'fs/promises';

Promise.resolve().then(async () => {
  const outdir = 'build-for-jsdom/dist';
  await rm(outdir, { recursive: true, force: true });

  const entryPoints = [
    'index.ts',
    'node_modules/jsdom/lib/jsdom/living/xhr/xhr-sync-worker.js',
  ];
  const external = ['./xhr-sync-worker.js'];

  /** @type {import('esbuild-plugin-resolve-external').ExternalModule[]} */
  const externalModules = [{ path: 'jsdom' }];

  await build({
    entryPoints,
    outdir,
    platform: 'node',
    target: 'node20',
    bundle: true,
    entryNames: '[name]',
    external,
    plugins: [resolveExternal({ externalModules, logLevel: 'debug' })],
  });
});
