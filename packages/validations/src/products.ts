import { z } from "zod";

export const productSchema = z.object({
  _id: z.string().regex(/^[0-9a-f]{24}$/),
  name: z.string().min(2).max(100),
  description: z.string().min(10).max(500),
  category: z.string().min(2).max(100),
  price: z.coerce.number().min(0).max(10000),
});

export const createProductSchema = productSchema.omit({ _id: true });

export const updateProductSchema = productSchema.omit({ _id: true });

// type
export type Product = z.infer<typeof productSchema>;

export type CreateProduct = z.infer<typeof createProductSchema>;

export type UpdateProduct = z.infer<typeof updateProductSchema>;
