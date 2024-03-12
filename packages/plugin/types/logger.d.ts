export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export declare const logger: {
    level: LogLevel;
    debug: (...args: unknown[]) => void;
    info: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
};
