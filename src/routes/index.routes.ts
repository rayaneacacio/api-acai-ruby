import { Router } from "express";

import acaiSizesRoutes from "./acaiSizes.routes";
import acaiComponentsRoutes from "./acaiComponentes.routes";

const routes = Router();

routes.use("/acai_sizes", acaiSizesRoutes);
routes.use("/acai_components", acaiComponentsRoutes);

export default routes;