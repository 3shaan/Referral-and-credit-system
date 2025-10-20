import { Router } from "express";

import { ReferralService } from "../referrals/referral.service";
import { UserService } from "../users/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const authRoute = Router();

const authController = new AuthController(new AuthService(new UserService(new ReferralService())));

authRoute.use("/auth/login", authController.login);
authRoute.use("/auth/register", authController.register);

export default authRoute;
