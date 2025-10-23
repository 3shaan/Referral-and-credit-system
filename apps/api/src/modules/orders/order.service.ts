import type { SavedOrder } from "@repo/validation";

import { startSession } from "mongoose";

import { BaseService } from "@/lib/core";

import { ReferralModel } from "../referrals/referral.model";
import { UserModel } from "../users/user.model";
import { OrderItemModel } from "./models/order-item.model";
import { OrderModel } from "./models/order.model";

export class OrderService extends BaseService {
  findAll() {
    return OrderModel.find().populate("orderItems").exec();
  }

  async create(data: SavedOrder) {
    const session = await startSession();
    session.startTransaction(); // transaction, so that if error occurs, it will be rolled back
    try {
      const { orderItems, ...rest } = data;
      const newOrderData = { ...rest, isFirstOrder: false };

      // check if user has any previous orders
      const userHasPreviousOrders = await OrderModel.exists({ userId: rest.userId });
      if (!userHasPreviousOrders) {
        newOrderData.isFirstOrder = true;

        // update credit of user
        await UserModel.updateOne({ _id: rest.userId }, { $inc: { credit: 2 } }, { session });

        // update the referral status
        const referral = await ReferralModel.findOneAndUpdate({ referredId: rest.userId }, { status: "converted" }, { session });
        // update the referrer credit
        if (referral) {
          await UserModel.updateOne({ _id: referral.referrerId }, { $inc: { credit: 2 } }, { session });
        }
      }

      const order = new OrderModel(newOrderData);
      const savedOrder = await order.save({ session });
      const newOrderItems = orderItems.map(item => ({ ...item, orderId: savedOrder._id }));
      await OrderItemModel.insertMany(newOrderItems, { session });
      await session.commitTransaction();
      return savedOrder;
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
