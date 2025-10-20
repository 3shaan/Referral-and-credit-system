import type { NextFunction, Request, Response } from "express";

import type { HttpException } from "@/lib/exception";

function errorHandler(err: HttpException, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = err.statusCode || 500;
  res.error(err, statusCode);
}
export default errorHandler;
