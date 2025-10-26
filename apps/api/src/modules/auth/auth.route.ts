import { Router } from "express";

import { ReferralService } from "../referrals/referral.service";
import { UserService } from "../users/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const authRoute = Router();

const authController = new AuthController(new AuthService(new UserService(new ReferralService())));

authRoute.post("/auth/login", authController.login);
authRoute.post("/auth/register", authController.register);
authRoute.post("/auth/refresh-token", authController.accessTokenRevalidate);
authRoute.get("/auth/logout", authController.logout);

export default authRoute;
