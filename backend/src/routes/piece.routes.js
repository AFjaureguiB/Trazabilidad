"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

import { isAdmin } from "../middlewares/authorization.middleware.js";

import PieceController from "../controllers/piece.controller.js";

/** Instancia del enrutador */
const router = Router();

router.get("/withoutbatch", PieceController.getPiecesWithoutBatch);
router.post("/", PieceController.savePiece);
router.put("/", isAdmin, PieceController.updatePiece);
router.post("/add-chemical-test", PieceController.addChemicalTestToPiece);

export default router;
