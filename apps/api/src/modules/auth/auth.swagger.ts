import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { userloginPayload, userSchema } from "@repo/validation";

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
