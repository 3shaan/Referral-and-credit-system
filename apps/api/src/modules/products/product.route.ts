import { Router } from "express";

import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

const productRoute = Router();

const productController = new ProductController(new ProductService());

productRoute.route("/product").post(productController.createProduct).get(productController.findAllProducts);

productRoute.route("/product/:id").get(productController.findProductById).patch(productController.updateProduct).delete(productController.deleteProduct);

export default productRoute;
