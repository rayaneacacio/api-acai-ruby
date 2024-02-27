import { Router } from "express";

import AcaiComponentesController from "../controllers/acai_componentes.controller";
const acaiComponentesController = new AcaiComponentesController();

const acaiComponentsRoutes = Router();

acaiComponentsRoutes.post("/", acaiComponentesController.create);
acaiComponentsRoutes.get("/index", acaiComponentesController.index);
acaiComponentsRoutes.post("/delete", acaiComponentesController.delete);

export default acaiComponentsRoutes;