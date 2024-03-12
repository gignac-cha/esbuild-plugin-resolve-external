import { build } from 'esbuild';
import { resolveExternalPlugin } from 'esbuild-plugin-resolve-external';
import { rm } from 'fs/promises';

Promise.resolve().then(async () => {
  const outdir = 'build-for-react/dist';
  await rm(outdir, { recursive: true, force: true });

  const entryPoints = ['index.ts'];
  /** @type {string[]} */
  const external = [];

  /** @type {import('esbuild-plugin-resolve-external').ExternalModule[]} */
  const externalModules = [{ path: 'react' }];

  await build({
    entryPoints,
    outdir,
    platform: 'browser',
    target: 'es2015',
    bundle: true,
    entryNames: '[name]',
    external,
    plugins: [resolveExternalPlugin({ externalModules, logLevel: 'debug' })],
  });
});
