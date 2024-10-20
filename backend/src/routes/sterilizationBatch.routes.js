"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

import sterilizationBatchController from "../controllers/sterilizationBatch.controller.js";

/** Instancia del enrutador */
const router = Router();

router.get("/", sterilizationBatchController.getSterilizationBatches);
router.post("/", sterilizationBatchController.createSterilizationBatch);

export default router;
