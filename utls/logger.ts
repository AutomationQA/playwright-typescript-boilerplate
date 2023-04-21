import * as winston from "winston";

interface LoggerInput {
  logName: string;
  level?: string;
}

export class Logger {
  private winstonLogger: winston.Logger;
  private readonly DEFAULT_LOG_LEVEL = process.env.LOG_LEVEL; // default log level

  constructor(private input: LoggerInput) {
    const { logName, level = this.DEFAULT_LOG_LEVEL } = input;

    const config = {
      levels: {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        verbose: 5,
        silly: 6,
      },
      colors: {
        error: "red",
        debug: "blue",
        warn: "yellow",
        data: "magenta",
        info: "green",
        verbose: "cyan",
        silly: "grey",
      },
    };

    winston.addColors(config.colors);

    this.winstonLogger = winston.createLogger({
      levels: config.levels,
      level,
      transports: [
        new winston.transports.Console({
          level,
          format: winston.format.combine(
            winston.format.timestamp({ format: "MM-DD HH:mm:ss:ms" }),
            winston.format.printf(
              (info) =>
                `${
                  info.timestamp
                } [${logName}] ${info.level.toLocaleUpperCase()}: ${
                  info.message
                }`
            ),
            winston.format.colorize({ all: true })
          ),
        }),

        new winston.transports.File({
          format: winston.format.combine(
            winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
            winston.format.printf(
              (info) =>
                `${
                  info.timestamp
                } [${logName}] ${info.level.toLocaleUpperCase()}: ${
                  info.message
                }`
            )
          ),
          filename: "logs/globalLog.log",
          level: "silly",
        }),
      ],
    });
  }

  // Log methods
  public error(message: string): void {
    this.winstonLogger.error(message);
  }

  public debug(message: string): void {
    this.winstonLogger.debug(message);
  }

  public warn(message: string): void {
    this.winstonLogger.warn(message);
  }

  public data(message: string): void {
    this.winstonLogger.data(message);
  }

  public info(message: string): void {
    this.winstonLogger.info(message);
  }

  public verbose(message: string): void {
    this.winstonLogger.verbose(message);
  }

  public silly(message: string): void {
    this.winstonLogger.silly(message);
  }
}
