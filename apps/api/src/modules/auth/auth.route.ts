import { Router } from "express";

import { UserService } from "../users/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const authRoute = Router();

const authController = new AuthController(new AuthService(new UserService()));

authRoute.use("/auth/login", authController.login);
authRoute.use("/auth/register", authController.register);

export default authRoute;
