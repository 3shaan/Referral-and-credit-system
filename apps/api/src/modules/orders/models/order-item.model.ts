import type { OrderItem } from "@repo/validation";

import { model, Schema, Types } from "mongoose";

const orderItemMongoDbSchema = new Schema({
  orderId: {
    type: Types.ObjectId,
    required: true,
    ref: "orders",
  },
  productId: {
    type: Types.ObjectId,
    required: true,
    ref: "products",
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

export const OrderItemModel = model<OrderItem>("orderItems", orderItemMongoDbSchema);
