import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string({ message: 'Invalid API URL' }).min(1).max(100),
});
type Env = z.infer<typeof envSchema>;

let env: Env;

try {
  // eslint-disable-next-line node/no-process-env
  env = await envSchema.parseAsync(process.env);
} catch (error) {
  console.error('Failed to parse environment variables:', error);
}

export default env as Env;
