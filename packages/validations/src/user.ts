import { z } from "zod";
export const userSchema = z.object({
  id: z.string().regex(/^[0-9a-f]{24}$/),
  email: z.email(),
  name: z.string().min(2).max(100),
  mobile: z.string().min(10).max(15).optional(),
  password: z.string().min(6).max(100).optional(),
});

export type IUser = z.infer<typeof userSchema>;
