import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { userloginPayload, userRegisterPayload } from "@repo/validation";
import { HttpStatus } from "@/lib/http";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    try {
      const data = await userRegisterPayload.parseAsync(req.body);
      const token = await this.authService.register(data);

      // TODO : add more configuration in cookies when publish
      res.cookie("refreshToken", token.refreshToken, { httpOnly: true });
      res.cookie("accessToken", token.accessToken, { httpOnly: true });

      res.success(token.user, HttpStatus.OK, "Register successful");
    } catch (error) {
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
    } catch (error) {
      res.error(error);
    }
  };
}
