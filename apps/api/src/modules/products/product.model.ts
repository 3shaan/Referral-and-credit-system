import type { Product } from "@repo/validation";
import type { Document } from "mongoose";

import { model, Schema } from "mongoose";

const productSchema = new Schema<Product & Document>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0, max: 10000 },
  image: { type: String, required: false },
}, {
  timestamps: true,
});

export const ProductModel = model<Product & Document>("products", productSchema);
