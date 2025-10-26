import type { OpenAPIDefinitions } from "@asteasolutions/zod-to-openapi/dist/openapi-registry";

import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import { authRegistry } from "@/modules/auth/auth.swagger";
import { userRegistry } from "@/modules/users/user.swagger";

const registry = new OpenAPIRegistry();
registry.registerComponent("securitySchemes", "cookieAuth", {
  type: "apiKey",
  name: "accessToken",
  in: "cookie",
});

const allDefinitions: OpenAPIDefinitions[] = [
  ...registry.definitions,
  ...userRegistry.definitions,
  ...authRegistry.definitions,
];
const generator = new OpenApiGeneratorV3(allDefinitions);

const openApiDocument = generator.generateDocument({
  openapi: "3.0.0",
  info: { title: "Referral and Credit System", version: "1.0.0" },
  servers: [
    {
      url: "http://localhost:8080/api",
      description: "Development server",
    },
  ],

});
const swaggerRouter = Router();

swaggerRouter.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

export default swaggerRouter;
