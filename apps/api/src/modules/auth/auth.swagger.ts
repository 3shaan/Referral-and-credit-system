import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { userloginPayload, userRegisterPayload, userSchema, z } from "@repo/validation";

import { HttpStatus } from "@/lib/http";
import { ApiResponse } from "@/lib/swagger/response";

export const authRegistry = new OpenAPIRegistry();

authRegistry.registerPath({
  method: "post",
  tags: ["Auth"],
  path: "/auth/login",
  summary: "Login",
  description: "Login with email and password",
  request: {
    body: {
      content: {
        "application/json": {
          schema: userloginPayload,
        },
      },
    },
  },
  responses: {
    ...ApiResponse.success(userSchema, 0, "SUCCESS", "Login successful"),
    ...ApiResponse.error(HttpStatus.NOT_FOUND, "NOT FOUND", "User not found"),
    ...ApiResponse.error(),
  },
});

// register

authRegistry.registerPath({
  method: "post",
  tags: ["Auth"],
  path: "/auth/register",
  summary: "Register",
  description: "Register with email and password",
  request: {
    body: {
      content: {
        "application/json": {
          schema: userRegisterPayload,
        },
      },
    },
  },
  responses: {
    ...ApiResponse.success(userSchema, 0, "SUCCESS", "Register successful"),
    ...ApiResponse.error(),
  },
});

// access token revalidate

authRegistry.registerPath({
  method: "post",
  tags: ["Auth"],
  path: "/auth/refresh-token",
  summary: "Revalidate access token",
  description: "Revalidate access token",
  responses: {
    ...ApiResponse.success(z.object({ accessToken: z.string().min(1).max(255) }), 0, "SUCCESS", "Token revalidated"),
    ...ApiResponse.error(),
  },
});

// logout

authRegistry.registerPath({
  method: "get",
  tags: ["Auth"],
  path: "/auth/logout",
  summary: "Logout",
  description: "Logout",
  responses: {
    ...ApiResponse.success(z.string().min(1).max(255), 0, "SUCCESS", "Logout successful"),
    ...ApiResponse.error(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED", "Unauthorized"),
    ...ApiResponse.error(),
  },
});
