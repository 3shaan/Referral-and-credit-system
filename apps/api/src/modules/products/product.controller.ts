import type { Request } from "express";
import type { ObjectId } from "mongoose";

import { createProductSchema, updateProductSchema } from "@repo/validation";
import { isObjectIdOrHexString } from "mongoose";

import { BaseController } from "@/lib/core";
import { ValidationException } from "@/lib/exception";

import type { ProductService } from "./product.service";

export class ProductController extends BaseController {
  constructor(
    private readonly productService: ProductService,
  ) {
    super();
    if (!productService) {
      throw new Error("ProductService is required");
    }
  }

  async createProduct(req: Request) {
    const data = await createProductSchema.parseAsync(req.body);
    return this.productService.create(data);
  }

  private validateId(id: string) {
    if (!isObjectIdOrHexString(id)) {
      throw new ValidationException("Invalid ObjectId");
    }
    return id as unknown as ObjectId;
  }

  findAllProducts() {
    return this.productService.findAll();
  }

  async findProductById(id: string) {
    return this.productService.findOne(this.validateId(id));
  }

  async updateProduct(req: Request) {
    const data = await updateProductSchema.parseAsync(req.body);
    return this.productService.update(this.validateId(req.params.id), data);
  }

  deleteProduct(req: Request) {
    return this.productService.delete(this.validateId(req.params.id));
  }
}
