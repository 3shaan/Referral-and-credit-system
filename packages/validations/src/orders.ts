
import { z } from "zod";
import { orderItemSchema } from "./order-items";

export const orderSchema = z.object({
  _id: z.string().regex(/^[0-9a-f]{24}$/),
  userId: z.string().regex(/^[0-9a-f]{24}$/),
  amount: z.coerce.number().min(0).max(10000),
  isFirstOrder: z.boolean().default(false).optional(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
});

export const OrderWithItemsSchema = orderSchema.extend({
  orderItems: z.array(orderItemSchema).min(1),
});

export const createOrderSchema = z.object({
  orderItems: z.array(orderItemSchema.omit({ _id: true, orderId: true, })).min(1),
});

const savedOrderSchema = orderSchema.omit({ _id: true, isFirstOrder: true, status: true }).extend({
  orderItems: z.array(orderItemSchema.omit({ _id: true, orderId: true, })).min(1),
});

// types

export type Order = z.infer<typeof orderSchema>;
export type CreateOrder = z.infer<typeof createOrderSchema>;

export type OrderWithItems = z.infer<typeof OrderWithItemsSchema>;
export type CreateOrderWithItems = z.infer<typeof OrderWithItemsSchema>;

export type SavedOrder = z.infer<typeof savedOrderSchema>;
