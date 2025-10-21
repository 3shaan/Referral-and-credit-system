import type { CreateOrder } from "@repo/validation";

import { startSession } from "mongoose";

import { BaseService } from "@/lib/core";

import { OrderItemModel } from "./models/order-item.model";
import { OrderModel } from "./models/order.model";

export class OrderService extends BaseService {
  findAll() {
    return OrderModel.find().populate("orderItems").exec();
  }

  async create(data: CreateOrder) {
    const session = await startSession();
    session.startTransaction(); // transaction, so that if error occurs, it will be rolled back
    try {
      const { orderItems, ...rest } = data;
      const order = new OrderModel(rest);
      const savedOrder = await order.save({ session });
      const newOrderItems = orderItems.map(item => ({ ...item, orderId: savedOrder._id }));
      const savedOrderItems = await OrderItemModel.insertMany(newOrderItems, { session });
      await session.commitTransaction();
      return { ...savedOrder, orderItems: savedOrderItems };
    }
    catch (err) {
      await session.abortTransaction();
      throw err;
    }
    finally {
      await session.endSession();
    }
  }
}
