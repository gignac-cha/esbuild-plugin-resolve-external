import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { FileNotExistError } from './error';

/**
 * Find the file path in `main` field from `package.json`.
 * @param packagePath Set the `node_modules` path where the package is in.
 */
export const resolveNodeModulesPathFromPackageJSON = async (
  packagePath: string,
): Promise<string> => {
  const packageJSONPath = resolve(packagePath, 'package.json');
  if (!existsSync(packageJSONPath)) {
    throw new FileNotExistError(
      `Cannot find the file "package.json" in "${packagePath}".`,
    );
  }
  const buffer = await readFile(packageJSONPath);
  const { main } = JSON.parse(buffer.toString());
  return resolve(packagePath, main);
};

export const resolveNodeModulePath = async (
  name: string,
  nodeModulesPath = './node_modules',
): Promise<string> => {
  const resolvedPath = resolve(nodeModulesPath, name);
  if (name.startsWith('@') && name.slice(name.indexOf('/') + 1).includes('/')) {
    return `${resolvedPath}.js`;
  } else if (!name.startsWith('@') && name.includes('/')) {
    return `${resolvedPath}.js`;
  }
  return resolveNodeModulesPathFromPackageJSON(resolvedPath);
};
