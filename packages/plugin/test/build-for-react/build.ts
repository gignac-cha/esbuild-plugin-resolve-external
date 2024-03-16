import { build } from 'esbuild';
import { rm } from 'fs/promises';
import resolveExternal, { ExternalModule } from '../../src';

Promise.resolve().then(async () => {
  const outdir = 'test/build-for-react/dist';
  await rm(outdir, { recursive: true, force: true });

  const entryPoints = ['test/build-for-react/index.ts'];
  const external: string[] = [];

  const externalModules: ExternalModule[] = [
    { path: 'react' },
    { path: 'react-dom/client' },
  ];

  await build({
    entryPoints,
    outdir,
    platform: 'browser',
    target: 'es2015',
    bundle: true,
    entryNames: '[name]',
    external,
    plugins: [resolveExternal({ externalModules, logLevel: 'debug' })],
  });
});
