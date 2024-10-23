"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";
import inventoryController from "../controllers/inventory.controller.js";

/** Instancia del enrutador */
const router = Router();

router.get("/", inventoryController.getInventory);

export default router;
