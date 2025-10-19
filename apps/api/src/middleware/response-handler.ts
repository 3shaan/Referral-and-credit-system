import env from "@/env";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const formatZodErrors = (error: ZodError): Record<string, string> => {
  const formatted: Record<string, string> = {};

  if (Array.isArray(error)) {
    error.forEach((issue) => {
      const path = issue.path.join(".");
      if (path) {
        formatted[path] = issue.message;
      }
    });
  }

  return formatted;
};

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
  (error: unknown, status = 400, msg?: string) => {
    let message = msg || "Operation failed.";
    console.log("errors", error);

    let errorPayload;
    if (error instanceof ZodError) {
      const result: Record<string, string> = {};
      error.issues.forEach((issue) => {
        const key = issue.path.join(".");
        result[key] = issue.message;
      });

      errorPayload = result;
      message = "Validation failed";
    } else if (error instanceof Error) {
      errorPayload = {
        message: error.message,
        stack: env.NODE_ENV !== "production" ? error.stack : undefined,
      };
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
