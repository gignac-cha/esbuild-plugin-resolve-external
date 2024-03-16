import { type Plugin } from 'esbuild';
import { LogLevel } from './logger';
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
export declare const pluginName = "resolve-external";
export declare const resolveExternal: ({ externalModules, logLevel, }: {
    externalModules: ExternalModule[];
    logLevel?: LogLevel;
}) => Plugin;
export default resolveExternal;
