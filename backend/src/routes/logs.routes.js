import { Router } from "express";
import { fetchLogs } from "../controllers/logInfo.controller.js";
import { isRoot } from "../middlewares/authorization.middleware.js";
const router = Router();

// Ruta para obtener los logs
router.get("/", isRoot, fetchLogs);

export default router;
