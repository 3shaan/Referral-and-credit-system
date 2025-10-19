import e from "express";
import userRouter from "./users/user.route";

const rootRouter = (app: e.Express) => {
  app.use("/api", userRouter);
};

export default rootRouter;
