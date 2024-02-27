import { Router } from "express";
import multer from "multer";
import { MULTER as uploadConfigMULTER } from "../configs/uploads";
const upload = multer(uploadConfigMULTER);

import ProductController from "../controllers/product.controller";
const productController = new ProductController();

const productRoutes = Router();

productRoutes.post("/", upload.single("image"), productController.create);
productRoutes.get("/index", productController.index);
productRoutes.patch("/update", upload.single("image"), productController.update);
productRoutes.delete("/delete", productController.delete);

export default productRoutes;