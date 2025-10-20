import type { CreateProduct, UpdateProduct } from "@repo/validation";
import type { ObjectId } from "mongoose";

import { ProductModel } from "./product.model";

export class ProductService {
  findAll() {
    return ProductModel.find();
  }

  findOne(id: ObjectId) {
    return ProductModel.findById(id);
  }

  create(product: CreateProduct) {
    return ProductModel.create(product);
  }

  update(id: ObjectId, product: UpdateProduct) {
    return ProductModel.findByIdAndUpdate(id, product, { new: true });
  }

  delete(id: ObjectId) {
    return ProductModel.findByIdAndDelete(id);
  }
}
