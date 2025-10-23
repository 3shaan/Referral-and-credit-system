import type { Request } from "express";

import { createOrderSchema } from "@repo/validation";

import { BaseController } from "@/lib/core";
import { UnauthorizedException } from "@/lib/exception";

import type { OrderService } from "./order.service";

export class OrdersController extends BaseController {
  constructor(
    private readonly orderService: OrderService,
  ) {
    super();
  }

  async createOrder(req: Request) {
    const id = req.user?._id;
    if (!id)
      throw new UnauthorizedException("User not authenticated");

    const data = await createOrderSchema.parseAsync(req.body);

    const totalAmount = data.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const order = {
      userId: id,
      amount: totalAmount,
      orderItems: data.orderItems,
    };

    return this.orderService.create(order);
  }
}
