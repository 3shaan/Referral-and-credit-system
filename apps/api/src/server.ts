import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import httpLogger from "./logger";
import cookieParser from "cookie-parser";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors())
    .use(cookieParser())
    .use(httpLogger);

  return app;
};
