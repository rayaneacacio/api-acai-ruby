import { Router } from "express";

import AcaiSizesController from "../controllers/acai_sizes.controller";
const acaiSizesController = new AcaiSizesController();

const acaiSizesRoutes = Router();

acaiSizesRoutes.post("/", acaiSizesController.create);
acaiSizesRoutes.get("/index", acaiSizesController.index);
acaiSizesRoutes.post("/delete", acaiSizesController.delete);

export default acaiSizesRoutes;