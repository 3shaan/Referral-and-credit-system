import type e from "express";

import responseHandler from "@/middleware/response-handler";

import authRoute from "./auth/auth.route";
import userRouter from "./users/user.route";

function rootRouter(app: e.Express) {
  // a middleware to inject res.success and res.error
  app.use(responseHandler);

  const prefix = "/api";

  const routeArr = [userRouter, authRoute];

  app.use(prefix, ...routeArr);
}

export default rootRouter;
