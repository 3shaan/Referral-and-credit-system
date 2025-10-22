import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url({ message: 'Invalid API URL' }).min(1).max(100),
});
type Env = z.infer<typeof envSchema>;
let env: Env;

try {
  env = await envSchema.parseAsync(process.env);
} catch (error) {
  console.error("Failed to parse environment variables:", error);
  process.exit(1);
}

export default env;
