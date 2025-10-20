import env from "@/env";
import { ForbiddenException, UnauthorizedException } from "@/lib/exception";
import { UserJwtTokenPayload } from "@/types/payload";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";

interface AuthenticatedRequest extends Request {
  user?: UserJwtTokenPayload;
}

export const authHandler = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) => {
  let token: string | undefined = req.cookies[ACCESS_TOKEN_COOKIE_NAME];

  if (!token) {
    const authHeader = req.headers["authorization"];
    // Format: "Bearer <token>"
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    throw new UnauthorizedException("Access Denied: No token provided.");
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    req.user = decoded as UserJwtTokenPayload;

    next();
  } catch (err) {
    throw new ForbiddenException("Access Denied: Invalid or expired token.");
  }
};
