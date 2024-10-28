"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

import shipmentController from "../controllers/shipment.controller.js";

/** Instancia del enrutador */
const router = Router();

router.post("/", shipmentController.saveShipment);
router.get("/", shipmentController.getShipments);
//router.put("/", );
export default router;
