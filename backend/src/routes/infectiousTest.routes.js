"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";
import InfectiuousTestController from "../controllers/infectiuousTest.controller.js";

/** Instancia del enrutador */
const router = Router();

router.put(
  "/set-all-results",
  InfectiuousTestController.updateAllInfectiousTestWithValue
);
router.put("/:id", InfectiuousTestController.updateInfectiousTest);

export default router;
