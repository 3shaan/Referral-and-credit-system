import { Router } from "express";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

const userRouter = Router();
const userController = new UserController(new UserService());

userRouter
  .route("/users")
  .get(userController.getAllUsers)
  .post(userController.createUser);

export default userRouter;
