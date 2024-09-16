"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

//Importamos todas las funciones que definimos para el controlador del donador
import DonorController from "../controllers/donor.controller.js";

import { uploadAndValidateFile } from "../middlewares/uploadfile.middleware.js";

import { isAdmin } from "../middlewares/authorization.middleware.js";

/** Instancia del enrutador */
const router = Router();

router.get("/", DonorController.getDonors); // /api/donors/
router.get("/tissues/infectious", DonorController.getDonorsTissuesInfectiousTests); // /api/donors/

router.post("/", uploadAndValidateFile, DonorController.createDonorWithTissue);

router.post("/:donorId/tissues/", uploadAndValidateFile, DonorController.addTissueToDonor);// /api/donors/3115/tissues

router.put("/:id", isAdmin, DonorController.updateDonor);

export default router;
