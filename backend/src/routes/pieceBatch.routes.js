"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

import pieceBatchController from "../controllers/pieceBatch.controller.js";

/** Instancia del enrutador */
const router = Router();

router.get("/", pieceBatchController.getPieceBatch);
router.post("/", pieceBatchController.savePieceBatch);
router.put("/", pieceBatchController.updatePieceBatch);
router.post("/addpieces", pieceBatchController.addPiecesToPieceBatch);
export default router;
