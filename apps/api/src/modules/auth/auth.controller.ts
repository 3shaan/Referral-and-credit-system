import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { userloginPayload } from "@repo/validation";
import { HttpStatus } from "@/lib/enum/http-status.enum";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = await userloginPayload.parseAsync(req.body);
      const token = await this.authService.login(email, password);

      res.cookie("refreshToken", token.refreshToken, { httpOnly: true });
      res.cookie("accessToken", token.accessToken, { httpOnly: true });

      res.success(token.user, HttpStatus.OK, "Login successful");
    } catch (error) {
      res.error(error);
    }
  };
}
