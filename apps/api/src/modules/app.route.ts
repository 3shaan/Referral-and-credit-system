import type e from "express";

import swaggerRouter from "@/config/swagger.config";
import responseHandler from "@/middleware/response-handler";

import authRoute from "./auth/auth.route";
import orderRoute from "./orders/order.route";
import productRoute from "./products/product.route";
import userRouter from "./users/user.route";

function rootRouter(app: e.Express) {
  // a middleware to inject res.success and res.error
  app.use(responseHandler);

  app.use(swaggerRouter);

  const prefix = "/api";

  const routeArr = [userRouter, authRoute, productRoute, orderRoute];

  app.use(prefix, ...routeArr);
}

export default rootRouter;
