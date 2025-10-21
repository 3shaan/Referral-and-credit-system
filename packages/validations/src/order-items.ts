

import { z } from "zod";

export const orderItemSchema = z.object({
  _id: z.string().regex(/^[0-9a-f]{24}$/),
  orderId: z.string().regex(/^[0-9a-f]{24}$/),
  productId: z.string().regex(/^[0-9a-f]{24}$/),
  quantity: z.coerce.number().min(1),
  price: z.coerce.number().min(0),
})


// types

export type OrderItem = z.infer<typeof orderItemSchema>;
