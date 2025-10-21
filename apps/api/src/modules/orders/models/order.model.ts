import type { Order } from "@repo/validation";

import { model, Schema, Types } from "mongoose";

export const OrderMongoDbSchema = new Schema({
  userID: {
    type: Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  isFirstOrder: {
    type: Boolean,
    required: false,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    required: true,
    default: "pending",
  },
});

export const OrderModel = model<Order>("orders", OrderMongoDbSchema);
