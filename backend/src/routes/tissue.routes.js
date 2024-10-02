"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { uploadAndValidateFile } from "../middlewares/uploadfile.middleware.js";
import TissueController from "../controllers/tissue.controller.js";

/** Instancia del enrutador */
const router = Router();

router.put(
  "/:id",
  isAdmin,
  uploadAndValidateFile,
  TissueController.updateTissue
);

router.get("/", TissueController.getTissuesWithPieces);

export default router;
