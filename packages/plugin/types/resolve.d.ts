/**
 * Find the file path in `main` field from `package.json`.
 * @param packagePath Set the `node_modules` path where the package is in.
 */
export declare const resolveNodeModulesPathFromPackageJSON: (packagePath: string) => Promise<string>;
export declare const resolveNodeModulePath: (name: string, nodeModulesPath?: string) => Promise<string>;
