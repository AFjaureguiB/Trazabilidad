// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de donadores */
import donorRoutes from "./donor.routes.js";

import tissueRoutes from "./tissue.routes.js";

// Importa el archivo de rutas de logs
import logRoutes from "./logs.routes.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Instancia del enrutador */
const router = Router();

// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los usuarios /api/users
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para los donadores /api/donors
router.use("/donors", authenticationMiddleware, donorRoutes);
//Define las rutas para los tejidos /api/tissues/:id
router.use("/tissues", authenticationMiddleware, tissueRoutes);
// Define la ruta para consultar los logs /api/logs
router.use("/logs", authenticationMiddleware, logRoutes);

// Exporta el enrutador
export default router;
