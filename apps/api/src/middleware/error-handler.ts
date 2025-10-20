import { HttpException } from "@/lib/exception";
import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  res.error(err, statusCode);
};
export default errorHandler;
