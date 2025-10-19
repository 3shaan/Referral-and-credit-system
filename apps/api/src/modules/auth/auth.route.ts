import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "../users/user.service";

const authRoute = Router();

const authController = new AuthController(new AuthService(new UserService()));

authRoute.use("/auth/login", authController.login);

export default authRoute;
