"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Controlador de usuarios */
import usuarioController from "../controllers/user.controller.js";

/** Middlewares de autorización */
import { isAdmin } from "../middlewares/authorization.middleware.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Instancia del enrutador */
const router = Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para los usuarios
router.get("/", isAdmin, usuarioController.getUsers); // /api/users/
router.post("/", isAdmin, usuarioController.createUser);
router.get("/:id", isAdmin, usuarioController.getUserById); // /api/users/1 | 2 | 352 -> QUe solo pueda obtener un user que ppertenezca a su proceso y con role assit
router.put("/:id", isAdmin, usuarioController.updateUser); //-> QUe solo pueda actualizar un user que ppertenezca a su proceso y con role assit
router.delete("/:id", isAdmin, usuarioController.deleteUser); //-> QUe solo pueda eliminar un user que ppertenezca a su proceso y con role assit

// Exporta el enrutador
export default router;