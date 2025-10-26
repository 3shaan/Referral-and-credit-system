import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createOrderSchema, orderSchema } from "@repo/validation";

import { ApiResponse } from "@/lib/swagger/response";

export const orderRegistry = new OpenAPIRegistry();

// create order
orderRegistry.registerPath({
  method: "post",
  path: "/orders",
  tags: ["Orders"],
  summary: "Create a new order",
  description: "Create a new order",
  operationId: "createOrder",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createOrderSchema,
        },
      },
    },
  },
  responses: {
    ...ApiResponse.success(orderSchema),
    ...ApiResponse.error(),
  },
});
