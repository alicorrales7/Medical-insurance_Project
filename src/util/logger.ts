import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  transports: [
    new transports.File({
      dirname: "logs",
      filename: "winstonLog.log",
    }),
  ],
  format: format.combine(
    format.timestamp(),
    //   format.json(),
    format.printf(({ timestamp, level, message, service }) => {
      return `[${timestamp}] ${service} ${level}: ${message}`;
    })
  ),
  defaultMeta: {
    service: "Behavior Logs",
  },
});
