import e from "express";
import userRouter from "./users/user.route";
import responseHandler from "@/middleware/response-handler";
import authRoute from "./auth/auth.route";

const rootRouter = (app: e.Express) => {
  app.use(responseHandler);
  app.use("/api", userRouter);
  app.use("/api", authRoute);
};

export default rootRouter;
