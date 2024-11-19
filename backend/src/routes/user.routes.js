"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Controlador de usuarios */
import usuarioController from "../controllers/user.controller.js";

/** Middlewares de autorización */
import { isAdmin, isRoot } from "../middlewares/authorization.middleware.js";

/** Middleware de autenticación */
import authenticationMiddleware from "../middlewares/authentication.middleware.js";

/** Instancia del enrutador */
const router = Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

//importante que este primero esta linea que las de abajo, por que si no hace match con /users/ y actua primero el middleware isAdmin
//admin users, que son gestionados solo por un usuario root
router.get("/admins", isRoot, usuarioController.getAdminUsers); // /api/users/
router.post("/admins", isRoot, usuarioController.createAdminUser);
router.put("/admins", isRoot, usuarioController.updateAdminUser);
router.delete("/admins/:id", isRoot, usuarioController.deleteUser);

router.put("/password", usuarioController.updatePassword);

// Define las rutas para los usuarios
router.get("/", isAdmin, usuarioController.getUsers); // /api/users/
router.post("/", isAdmin, usuarioController.createUser);
router.get("/:id", isAdmin, usuarioController.getUserById); // /api/users/1 | 2 | 352 -> QUe solo pueda obtener un user que ppertenezca a su proceso y con role assit
router.put("/:id", isAdmin, usuarioController.updateUser); //-> QUe solo pueda actualizar un user que ppertenezca a su proceso y con role assit
router.delete("/:id", isAdmin, usuarioController.deleteUser); //-> QUe solo pueda eliminar un user que ppertenezca a su proceso y con role assit

// Exporta el enrutador
export default router;
