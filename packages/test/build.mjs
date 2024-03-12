import { build } from 'esbuild';
import { resolveExternalPlugin } from 'esbuild-plugin-resolve-external';

Promise.resolve().then(async () => {
  const entryPoints = [
    'index.ts',
    'node_modules/jsdom/lib/jsdom/living/xhr/xhr-sync-worker.js',
  ];
  const external = ['@aws-sdk/*', './xhr-sync-worker.js'];

  /** @type {import('esbuild-plugin-resolve-external').ExternalModule} */
  const externalModules = [{ path: 'react' }];

  await build({
    entryPoints,
    outdir: 'dist',
    platform: 'browser',
    target: 'esnext',
    bundle: true,
    external,
    plugins: [resolveExternalPlugin({ externalModules, logLevel: 'debug' })],
  });
});
