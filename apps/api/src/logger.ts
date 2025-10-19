import { pinoHttp } from "pino-http";
import env from "./env";

const httpLogger = pinoHttp({
  level: env.LOG_LEVEL || "info",
  transport:
    env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        }
      : undefined,
});

export const log = httpLogger.logger;

export default httpLogger;
