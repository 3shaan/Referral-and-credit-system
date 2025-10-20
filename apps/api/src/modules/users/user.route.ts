import { Router } from "express";

import { authHandler } from "@/middleware/auth-handler";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

const userRouter = Router();
const userController = new UserController(new UserService());

userRouter.use("/users", authHandler);

userRouter
  .route("/users")
  .get(userController.getAllUsers)
  .post(userController.createUser);

export default userRouter;
