
import { z } from "zod";

export const orderSchema = z.object({
  _id: z.string().regex(/^[0-9a-f]{24}$/),
  userID: z.string().regex(/^[0-9a-f]{24}$/),
  amount: z.coerce.number().min(0).max(10000),
  isFirstOrder: z.boolean().default(false).optional(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled'])
});

export const createOrderSchema = orderSchema.omit({ _id: true });


// types

export type Order = z.infer<typeof orderSchema>;
export type CreateOrder = z.infer<typeof createOrderSchema>;
