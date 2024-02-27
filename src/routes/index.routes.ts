import { Router } from "express";

import productRoutes from "./product.routes";
import productsSizesRoutes from "./productsSizes.routes";
import acaiComponentsRoutes from "./acaiComponentes.routes";

const routes = Router();

routes.use("/product", productRoutes);
routes.use("/products_sizes", productsSizesRoutes);
routes.use("/acai_components", acaiComponentsRoutes);

export default routes;