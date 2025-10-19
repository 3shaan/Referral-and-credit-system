import env from "@/env";
import { HttpStatus } from "@/lib/enum/http-status.enum";
import { HttpException } from "@/lib/exception/http-exception";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const createSuccessHandler =
  (res: Response) =>
  (data: any, status = 200, msg?: string) => {
    const message = msg || "Operation successful.";

    const response = {
      data: data,
      status: status,
      success: true,
      message: message,
      error: null,
    };
    res.status(status).json(response);
  };

const createErrorHandler =
  (res: Response) =>
  (error: unknown, status = HttpStatus.BAD_REQUEST, msg?: string) => {
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
    } else if (error instanceof HttpException) {
      errorPayload = {
        message: error.message,
        stack: env.NODE_ENV !== "production" ? error.stack : undefined,
      };
      message = error.message;
    } else if (error instanceof Error) {
      errorPayload = {
        message: error.message,
        stack: env.NODE_ENV !== "production" ? error.stack : undefined,
      };
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (typeof error === "string") {
      errorPayload = { message: error };
    } else if (typeof error === "object" && error !== null) {
      errorPayload = error;
    } else {
      errorPayload = { message: "An unknown error occurred." };
    }

    const response = {
      data: null,
      status: status,
      success: false,
      message: message,
      error: errorPayload,
    };

    res.status(status).json(response);
  };

function responseHandler(req: Request, res: Response, next: NextFunction) {
  res.success = createSuccessHandler(res);
  res.error = createErrorHandler(res);
  next();
}

export default responseHandler;
