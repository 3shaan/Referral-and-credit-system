import type { ZodType } from "zod";

import { z } from "@repo/validation";

import { HttpStatus } from "../http";

export class ApiResponse {
  static buildResponse(
    schema: ZodType | null,
    status: number,
    success: boolean,
    message: string,
    error: any,
  ) {
    return (
      z.object({
        data: schema,
        status: z.number().min(100).max(599).default(status),
        success: z.boolean().default(success),
        message: z.string().default(message),
        error,
      })
    );
  }

  static success(
    schema: ZodType,
    status: number = HttpStatus.OK,
    description: string = "",
  ) {
    return {
      [status]: {
        description,
        content: {
          "application/json": {
            schema: this.buildResponse(schema, status, true, "Operation successful", z.null().optional().openapi({ example: null })),
          },
        },
      },
    };
  }

  static error(
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    description: string = "",
    message: string = "Operation failed",
  ) {
    if (status === HttpStatus.UNAUTHORIZED) {
      message = "Access Denied: No token provided.";
    }
    return {
      [status]: {
        description,
        content: {
          "application/json": {
            schema: this.buildResponse(z.null().optional().openapi({ example: null }), status, false, message, z.object({ message: z.string() })),
          },
        },
      },
    };
  }
}
