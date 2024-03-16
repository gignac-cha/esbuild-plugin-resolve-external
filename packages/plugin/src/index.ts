import { build, type Plugin, type PluginBuild } from 'esbuild';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { LogLevel, logger } from './logger';
import { resolveNodeModulePath } from './resolve';

export interface ExternalModule {
  path: string;
  /**
   * Set `node_modules` path manually,
   * if not exists in dependencies in current repository,
   * or cannot find.
   * @default "./node_modules"
   */
  nodeModulesPath?: string;
}

export const pluginName = 'resolve-external';

export const resolveExternal = ({
  externalModules = [],
  logLevel = logger.level,
}: {
  externalModules: ExternalModule[];
  logLevel?: LogLevel;
}): Plugin => ({
  name: pluginName,
  setup: (pluginBuild: PluginBuild) => {
    const outdir = pluginBuild.initialOptions.outdir;
    if (!outdir) {
      throw TypeError('Plugin does not supported without `outdir` option.');
    }

    logger.level = logLevel;

    const externalModulesMap = Object.fromEntries(
      externalModules.map(({ path, nodeModulesPath }) => [
        path,
        nodeModulesPath ?? './node_modules',
      ]),
    );

    pluginBuild.onResolve({ filter: /.*/ }, async ({ path }) => {
      if (/.*\.[jt]sx?$/.test(path)) {
        logger.debug(
          `Plugin does not resolve single source file "${path}". (.js, .ts, .jsx, .tsx)`,
        );
        return;
      }

      if (!(path in externalModulesMap)) {
        return;
      }

      const nodeModulesPath = externalModulesMap[path];

      if (!nodeModulesPath) {
        return {
          errors: [
            {
              pluginName,
              id: 'cannot-find-node-modules-path',
              text: `Cannot find the path "${nodeModulesPath}".`,
            },
          ],
        };
      }

      const outfile = resolve(outdir, `${path}.js`);

      if (existsSync(outfile)) {
        logger.debug(`"${outfile}" file already exists, just skip.`);
        return { path: outfile, external: true };
      }

      const resolvedPath = await resolveNodeModulePath(path, nodeModulesPath);

      if (!existsSync(resolvedPath)) {
        return {
          errors: [
            {
              pluginName,
              id: 'cannot-find-resolve-file',
              text: `Cannot find the file "${resolvedPath}".`,
            },
          ],
        };
      }

      const buildResult = await build({
        ...pluginBuild.initialOptions,
        entryPoints: [resolvedPath],
        outfile,
        outdir: undefined,
        plugins: undefined,
      });

      return {
        path: outfile,
        external: true,
        warnings: buildResult.warnings,
        errors: buildResult.errors,
      };
    });
  },
});

export default resolveExternal;
