import env from "@/env";
import {
  ForbiddenException,
  NotFoundException,
} from "@/lib/exception/http-exception";
import { UserJwtTokenPayload } from "@/types/payload";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "../users/user.service";

export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const isUserExist = await this.userService.findByEmail(email);
    if (!isUserExist) throw new NotFoundException("User not found");

    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExist.password,
    );
    if (!isPasswordValid) throw new ForbiddenException("Invalid password");

    return isUserExist;
  }

  generateAccessToken(payload: UserJwtTokenPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }

  // generate refresh token
  generateRefreshToken(payload: UserJwtTokenPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: "15d",
    });
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    await this.userService.updateRefreshToken(user._id, refreshToken);
    return { accessToken, refreshToken, user };
  }
}
