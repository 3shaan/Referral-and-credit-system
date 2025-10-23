import { Router } from "express";

import { authHandler } from "@/middleware/auth-handler";

import { OrdersController } from "./order.controller";
import { OrderService } from "./order.service";

const orderRoute = Router();

const orderController = new OrdersController(new OrderService());

orderRoute.post("/order", authHandler, orderController.createOrder);

export default orderRoute;
