"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

import PieceController from "../controllers/piece.controller.js";

/** Instancia del enrutador */
const router = Router();

router.post("/", PieceController.savePiece);
export default router;
