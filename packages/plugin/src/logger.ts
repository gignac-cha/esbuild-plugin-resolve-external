import { pluginName } from '.';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const logLevelMap: { [key in LogLevel]: 1 | 2 | 3 | 4 } = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
} as const;

const isLoggable = (level: LogLevel): boolean => {
  return logLevelMap[level] >= logLevelMap[logger.level];
};

export const logger: {
  level: LogLevel;
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
} = {
  level: 'info',
  debug: (...args: unknown[]) => {
    if (isLoggable('debug')) {
      console.debug(`[${pluginName}]`, ...args);
    }
  },
  info: (...args: unknown[]) => {
    if (isLoggable('info')) {
      console.info(`[${pluginName}]`, ...args);
    }
  },
  warn: (...args: unknown[]) => {
    if (isLoggable('warn')) {
      console.warn(`[${pluginName}]`, ...args);
    }
  },
  error: (...args: unknown[]) => {
    if (isLoggable('error')) {
      console.error(`[${pluginName}]`, ...args);
    }
  },
};
