import type { Request } from "express";

import { createOrderSchema } from "@repo/validation";

import { BaseController } from "@/lib/core";

import type { OrderService } from "./order.service";

export class OrdersController extends BaseController {
  constructor(
    private readonly orderService: OrderService,
  ) {
    super();
  }

  async createOrder(req: Request) {
    const data = await createOrderSchema.parseAsync(req.body);
    return this.orderService.create(data);
  }
}
