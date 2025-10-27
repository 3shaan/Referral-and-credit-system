import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string({ message: 'Invalid API URL' }).min(1),
});
type Env = z.infer<typeof envSchema>;

let env: Env | null = null;

try {
  // eslint-disable-next-line node/no-process-env
  const data = await envSchema.safeParseAsync(process.env);
  if (!data.success) {
    console.error('Failed to parse environment variables:', data.error);
  }
  env = data.success ? data.data : null;
} catch (error) {
  console.error('Failed to parse environment variables:', error);
}

export default env as Env;
