import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { userSchema } from "@repo/validation";

import { HttpStatus } from "@/lib/http";
import { ApiResponse } from "@/lib/swagger/response";

export const userRegistry = new OpenAPIRegistry();

userRegistry.registerPath({
  method: "get",
  path: "/users",
  tags: ["Users"],
  responses: {
    ...ApiResponse.success(userSchema),
    ...ApiResponse.error(),
    ...ApiResponse.error(HttpStatus.UNAUTHORIZED, "Unauthorized"),
  },
});
