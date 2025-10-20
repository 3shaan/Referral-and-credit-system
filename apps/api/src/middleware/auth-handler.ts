import type { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import type { UserJwtTokenPayload } from "@/types/payload";

import env from "@/env";
import { ForbiddenException, UnauthorizedException } from "@/lib/exception";
import { log } from "@/logger";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";

type AuthenticatedRequest = {
  user?: UserJwtTokenPayload;
} & Request;

export function authHandler(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  let token: string | undefined = req.cookies[ACCESS_TOKEN_COOKIE_NAME];

  if (!token) {
    const authHeader = req.headers.authorization;
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
  }
  catch (err) {
    log.error(err);
    throw new ForbiddenException("Access Denied: Invalid or expired token.");
  }
}
