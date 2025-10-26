import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createProductSchema, productSchema, updateProductSchema, z } from "@repo/validation";

import { ApiResponse } from "@/lib/swagger/response";

export const productRegistry = new OpenAPIRegistry();

productRegistry.registerPath({
  path: "/products",
  method: "get",
  tags: ["Products"],
  summary: "Get all products",
  description: "Get all products",
  responses: {
    ...ApiResponse.success(z.array(productSchema)),
    ...ApiResponse.error(),
  },
});
// post products
productRegistry.registerPath({
  path: "/products",
  method: "post",
  tags: ["Products"],
  summary: "Create a product",
  description: "Create a product",
  request: {
    body: {
      content: {
        "application/json": {
          schema: createProductSchema,
        },
      },
    },
  },
  responses: {
    ...ApiResponse.success((productSchema)),
    ...ApiResponse.error(),
  },
});

// get one products
productRegistry.registerPath({
  path: "/products/{id}",
  method: "get",
  tags: ["Products"],
  summary: "Get a product",
  description: "Get a product",
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    ...ApiResponse.success((productSchema)),
    ...ApiResponse.error(),
  },
});

// update one products
productRegistry.registerPath({
  path: "/products/{id}",
  method: "put",
  tags: ["Products"],
  summary: "Update a product",
  description: "Update a product",
  request: {
    params: z.object({
      id: z.string(),
    }),
    body: {
      content: {
        "application/json": {
          schema: updateProductSchema,
        },
      },
    },
  },
  responses: {
    ...ApiResponse.success((productSchema)),
    ...ApiResponse.error(),
  },
});

// delete one products
productRegistry.registerPath({
  path: "/products/{id}",
  method: "delete",
  tags: ["Products"],
  summary: "Delete a product",
  description: "Delete a product",
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    ...ApiResponse.success(z.null()),
    ...ApiResponse.error(),
  },
});
