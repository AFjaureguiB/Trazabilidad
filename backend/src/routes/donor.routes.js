"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

//Importamos todas las funciones que definimos para el controlador del donador
import DonorController from "../controllers/donor.controller.js";
import {
  upload,
  validateFile,
  renameFile,
} from "../middlewares/savefile.middleware.js";

/** Instancia del enrutador */
const router = Router();

router.get("/", DonorController.getDonors); // /api/donors/

router.post(
  "/",
  [upload.single("consentimiento-pdf"), validateFile, renameFile],
  DonorController.createDonor
);

export default router;
