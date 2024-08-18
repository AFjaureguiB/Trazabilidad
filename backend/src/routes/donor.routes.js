"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

//Importamos todas las funciones que definimos para el controlador del donador
import DonorController from "../controllers/donor.controller.js";

import {
  uploadAndValidateFile,
  validateFields,
} from "../middlewares/uploadfile.middleware.js";

/** Instancia del enrutador */
const router = Router();

router.get("/", DonorController.getDonors); // /api/donors/

router.use(
  "/",
  uploadAndValidateFile,
  validateFields,
  DonorController.createDonorV2
);
export default router;
