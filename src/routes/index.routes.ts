import { Router } from "express";

import productRoutes from "./product.routes";
import productsSizesRoutes from "./productsSizes.routes";

const routes = Router();

routes.use("/product", productRoutes);
routes.use("/products_sizes", productsSizesRoutes);

export default routes;