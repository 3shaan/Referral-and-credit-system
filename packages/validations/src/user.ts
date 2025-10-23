import { z } from "zod";
export const userSchema = z.object({
  _id: z.string().regex(/^[0-9a-f]{24}$/),
  email: z.email(),
  name: z.string().min(2).max(100),
  mobile: z.string().min(10).max(15).optional(),
  password: z.string().min(6).max(100),
  refreshToken: z.string().min(10).max(100).optional(),
  userName: z.string().min(2).max(100),
  referredBy: z.string().nullish().optional(),
  stats: z.object({
    totalReferred: z.number().min(0).default(0),
    convertedReferred: z.number().min(0).default(0),
  }),
  credit: z.coerce.number().default(0),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const createUser = userSchema.omit({ _id: true, refreshToken: true, credit: true });

export const updateUser = userSchema.omit({ _id: true, refreshToken: true });

export const userloginPayload = userSchema.pick({
  email: true,
  password: true,
});

export const userRegisterPayload = userSchema.pick({
  name: true,
  email: true,
  password: true,
  userName: true,
  referredBy: true
});

// types

export type IUser = z.infer<typeof userSchema>;
export type IUserCreate = z.infer<typeof createUser>;
export type IUserUpdate = z.infer<typeof updateUser>;
export type UserLoginPayload = z.infer<typeof userloginPayload>;
export type UserRegisterPayload = z.infer<typeof userRegisterPayload>;
