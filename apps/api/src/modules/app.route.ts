import e from "express";
import userRouter from "./users/user.route";
import responseHandler from "@/middleware/response-handler";
import authRoute from "./auth/auth.route";

const rootRouter = (app: e.Express) => {
  // a middleware to inject res.success and res.error
  app.use(responseHandler);

  const prefix = "/api";

  const routeArr = [userRouter, authRoute];

  app.use(prefix, ...routeArr);
};

export default rootRouter;
