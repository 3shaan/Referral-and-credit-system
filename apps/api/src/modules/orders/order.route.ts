import { Router } from "express";

import { OrdersController } from "./order.controller";
import { OrderService } from "./order.service";

const orderRoute = Router();

const orderController = new OrdersController(new OrderService());

orderRoute.route("/order").post(orderController.createOrder);

export default orderRoute;
