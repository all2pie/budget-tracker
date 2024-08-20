export const LogLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  http: 3,
  info: 4,
  debug: 5,
  db: 6,
} as const;

export type LogLevelKeys = keyof typeof LogLevels;

export type BaseLogger = {
  [key in LogLevelKeys]: (message: string, data?: any) => void;
};

export const LogLevelColorMap: Record<LogLevelKeys, string> = {
  fatal: 'pink',
  error: 'red',
  warn: 'yellow',
  http: 'magenta',
  info: 'green',
  debug: 'blue',
  db: 'cyan',
};
