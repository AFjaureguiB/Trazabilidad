"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

import dispatchpdfController from "../controllers/dispatchpdf.controller.js";

/** Instancia del enrutador */
const router = Router();

router.post("/", dispatchpdfController.buildDispatchPDF);

export default router;
