import type { NextFunction, Request, Response } from "express";

import { ZodError } from "zod";

import env from "@/env";
import { HttpException } from "@/lib/exception";
import { HttpStatus } from "@/lib/http";

function createSuccessHandler(res: Response) {
  return (data: any, status = 200, msg?: string) => {
    const message = msg || "Operation successful.";

    const response = {
      data,
      status,
      success: true,
      message,
      error: null,
    };
    res.status(status).json(response);
  };
}

function createErrorHandler(res: Response) {
  return (error: unknown, status = HttpStatus.BAD_REQUEST, msg?: string) => {
    let message = msg || "Operation failed.";

    let errorPayload;
    if (error instanceof ZodError) {
      const result: Record<string, string> = {};
      error.issues.forEach((issue) => {
        const key = issue.path.join(".");
        result[key] = issue.message;
      });

      errorPayload = result;
      message = "Validation failed";
      status = HttpStatus.UNPROCESSABLE_ENTITY;
    }
    else if (error instanceof HttpException) {
      errorPayload = {
        message: error.message,
        stack: env.NODE_ENV !== "production" ? error.stack : undefined,
      };
      message = error.message;
      status = error.statusCode;
    }
    else if (error instanceof Error) {
      errorPayload = {
        message: error.message,
        stack: env.NODE_ENV !== "production" ? error.stack : undefined,
      };
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    else if (typeof error === "string") {
      errorPayload = { message: error };
    }
    else if (typeof error === "object" && error !== null) {
      errorPayload = error;
    }
    else {
      errorPayload = { message: "An unknown error occurred." };
    }

    const response = {
      data: null,
      status,
      success: false,
      message,
      error: errorPayload,
    };

    res.status(status).json(response);
  };
}

function responseHandler(req: Request, res: Response, next: NextFunction) {
  res.success = createSuccessHandler(res);
  res.error = createErrorHandler(res);
  next();
}

export default responseHandler;
