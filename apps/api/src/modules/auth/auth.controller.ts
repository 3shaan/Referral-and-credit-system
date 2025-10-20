import type { Request, Response } from "express";

import { userloginPayload, userRegisterPayload } from "@repo/validation";
import bcrypt from "bcrypt";

import { HttpStatus } from "@/lib/http";

import type { AuthService } from "./auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) { }

  register = async (req: Request, res: Response) => {
    try {
      const data = await userRegisterPayload.parseAsync(req.body);

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(data.password, salt);

      const token = await this.authService.register({
        ...data,
        password: hashedPassword,
      });

      // TODO : add more configuration in cookies when publish
      res.cookie("refreshToken", token.refreshToken, { httpOnly: true });
      res.cookie("accessToken", token.accessToken, { httpOnly: true });
      res.success(token.user, HttpStatus.OK, "Register successful");
    }
    catch (error) {
      res.error(error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = await userloginPayload.parseAsync(req.body);
      const token = await this.authService.login(email, password);

      // TODO : add more configuration in cookies when publish
      res.cookie("refreshToken", token.refreshToken, { httpOnly: true });
      res.cookie("accessToken", token.accessToken, { httpOnly: true });

      res.success(token.user, HttpStatus.OK, "Login successful");
    }
    catch (error) {
      res.error(error);
    }
  };
}
