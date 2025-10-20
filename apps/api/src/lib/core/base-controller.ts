import type { NextFunction, Request, Response } from "express";

import { HttpStatus } from "@/lib/http";

// BaseController.ts (same pattern)
export abstract class BaseController {
  constructor() {
    this.bindAllMethods();

    const proto = Object.getPrototypeOf(this);
    const methodNames = Object.getOwnPropertyNames(proto);

    for (const name of methodNames) {
      const method = (this as any)[name];
      if (name !== "constructor" && typeof method === "function") {
        // Wrap each public method
        (this as any)[name] = this.wrapMethod(method.bind(this));
      }
    }
  }

  private bindAllMethods(): void {
    let proto = Object.getPrototypeOf(this);
    while (proto && proto !== Object.prototype) {
      for (const name of Object.getOwnPropertyNames(proto)) {
        if (name === "constructor")
          continue;
        if (Object.prototype.hasOwnProperty.call(this, name))
          continue;
        const desc = Object.getOwnPropertyDescriptor(proto, name);
        if (!desc || typeof desc.value !== "function")
          continue;
        Object.defineProperty(this, name, {
          // eslint-disable-next-line ts/no-unsafe-function-type
          value: (desc.value as Function).bind(this),
          writable: true,
          configurable: true,
        });
      }
      proto = Object.getPrototypeOf(proto);
    }
  }

  // eslint-disable-next-line ts/no-unsafe-function-type
  private wrapMethod(fn: Function) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await fn(req, res, next);

        if (!res.headersSent && result !== undefined) {
          res.success(result, HttpStatus.OK);
        }
      }
      catch (err) {
        console.error(`[${fn.name}] Error:`, err);

        if (!res.headersSent) {
          res.error(err, 500);
        }
      }
    };
  }
}
