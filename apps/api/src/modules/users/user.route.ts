import { Router } from "express";

import { authHandler } from "@/middleware/auth-handler";

import { ReferralService } from "../referrals/referral.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

const userRouter = Router();
const userController = new UserController(new UserService(new ReferralService()));

userRouter.use("/users", authHandler);

userRouter
  .route("/users")
  .get(userController.getAllUsers)
  .post(userController.createUser);

export default userRouter;
