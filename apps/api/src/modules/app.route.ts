import e from "express";
import userRouter from "./users/user.route";
import responseHandler from "@/middleware/response-handler";

const rootRouter = (app: e.Express) => {
  app.use(responseHandler);
  app.use("/api", userRouter);
};

export default rootRouter;
