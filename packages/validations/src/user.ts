import { z } from "zod";
export const userSchema = z.object({
  id: z.string().regex(/^[0-9a-f]{24}$/),
  email: z.email(),
  name: z.string().min(2).max(100),
  mobile: z.string().min(10).max(15).optional(),
  password: z.string().min(6).max(100),
});

export const createUser = userSchema.omit({ id: true });

export const updateUser = userSchema.omit({ id: true });

// types

export type IUser = z.infer<typeof userSchema>;
export type IUserCreate = z.infer<typeof createUser>;
export type IUserUpdate = z.infer<typeof updateUser>;
