import type { Express } from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import httpLogger from "./logger";

export function createServer(): Express {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors({
      origin: ["http://localhost:3000", "https://referral-and-credit-system-web.onrender.com"],
      credentials: true,
    }))
    .use(cookieParser())
    .use(httpLogger)
    .get("/", (req, res) => {
      res.send("server is running....");
    });

  return app;
}
