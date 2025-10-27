import type { ZodError } from "zod";

import { config } from "dotenv";
import { expand } from "dotenv-expand";
import process from "node:process";
import { z } from "zod";

// Load .env only in local/dev
if (!process.env.RENDER || process.env.NODE_ENV !== "production") {
  try {
    expand(config());
  }
  catch {
    console.warn("Skipping .env loading: file missing or unreadable.");
  }
}

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
  MONGO_URI: z.url(),
  JWT_SECRET: z.string().min(5).max(256),
  API_URL: z.url().default("http://localhost:8080"),
});

type Env = z.infer<typeof EnvSchema>;

let env: Env;

try {
  env = EnvSchema.parse(process.env);
}
catch (error) {
  const e = error as ZodError;
  console.error("❌ Invalid environment configuration:");
  console.error(e.issues);
  process.exit(1);
}

export default env;
