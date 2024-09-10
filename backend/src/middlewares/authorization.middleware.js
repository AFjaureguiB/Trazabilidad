"use strict";
// Autorizacion - Comprobar el rol del usuario
import { User, Role, Process } from "../models/index.js";
import { respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";

/**
 * Comprueba si el usuario es administrador
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
async function isAdmin(req, res, next) {
  try {
    const user = await User.findOne({
      where: { username: req.username },
      include: ["Role"],
    });

    if (user.Role.name === "ADMIN") {
      next();
      return;
    }

    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de administrador para realizar esta acción"
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isAdmin");
  }
}

async function isRoot(req, res, next) {
  try {
    const user = await User.findOne({
      where: { username: req.username },
      include: ["Role"],
    });

    if (user.Role.name === "ROOT") {
      next();
      return;
    }

    return respondError(
      req,
      res,
      401,
      "Se requiere un rol de ROOT para realizar esta acción"
    );
  } catch (error) {
    handleError(error, "authorization.middleware -> isRoot");
  }
}

export { isAdmin, isRoot };
