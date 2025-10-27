import type { ZodError } from "zod";

import { config } from "dotenv";
import { expand } from "dotenv-expand";
import process from "node:process";
import { z } from "zod";

// Load .env only in development
if (process.env.NODE_ENV !== "production") {
  try {
    expand(config());
  }
  catch (e) {
    console.warn("Skipping .env loading: file missing or unreadable.");
  }
}

// Define schema for environment variables
const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]),
  MONGO_URI: z.url(),
  JWT_SECRET: z.string().min(5).max(256),
});

type Env = z.infer<typeof EnvSchema>;

// Validate and parse environment
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
