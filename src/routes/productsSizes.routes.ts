import { Router } from "express";

import ProductsSizesController from "../controllers/products_sizes.controller";
const productsSizesController = new ProductsSizesController();

const productsSizesRoutes = Router();

productsSizesRoutes.post("/", productsSizesController.create);
productsSizesRoutes.get("/index", productsSizesController.index);
productsSizesRoutes.post("/delete", productsSizesController.delete);

export default productsSizesRoutes;