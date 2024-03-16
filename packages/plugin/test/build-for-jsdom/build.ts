import { build } from 'esbuild';
import { rm } from 'fs/promises';
import resolveExternal, { ExternalModule } from '../../src';

Promise.resolve().then(async () => {
  const outdir = 'test/build-for-jsdom/dist';
  await rm(outdir, { recursive: true, force: true });

  const entryPoints = [
    'test/build-for-jsdom/index.ts',
    'node_modules/jsdom/lib/jsdom/living/xhr/xhr-sync-worker.js',
  ];
  const external = ['./xhr-sync-worker.js'];

  const externalModules: ExternalModule[] = [{ path: 'jsdom' }];

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
