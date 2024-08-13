"use strict";

/** Modelo de datos 'User' */
import { User } from "../models/index.js";
/** Modulo 'jsonwebtoken' para crear tokens */
import jwt from "jsonwebtoken";

import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET } from "../config/configEnv.js";

import { handleError } from "../utils/errorHandler.js";

/**
 * Inicia sesión con un usuario.
 * @async
 * @function login
 * @param {Object} user - Objeto de usuario
 */
async function login(user) {
  try {
    const { username, password } = user;

    const userFound = await User.findOne({
      where: { username },
      include: ["Role", "Process"],
    });

    if (!userFound) {
      return [null, null, "El usuario y/o contraseña son incorrectos"];
    }

    const userJSON = userFound.toJSON();

    const matchPassword = await User.comparePassword(
      password,
      userJSON.password
    );

    if (!matchPassword) {
      return [null, null, "El usuario y/o contraseña son incorrectos"];
    }

    const accessToken = jwt.sign(
      {
        username: userJSON.username,
        role: userJSON.Role.name,
        process: userJSON.Process.name,
        processId: userJSON.ProcessId,
      },
      ACCESS_JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign(
      { username: userJSON.username },
      REFRESH_JWT_SECRET,
      {
        expiresIn: "7d", // 7 días
      }
    );

    return [accessToken, refreshToken, null];
  } catch (error) {
    handleError(error, "auth.service -> signIn");
  }
}

/**
 * Refresca el token de acceso
 * @async
 * @function refresh
 * @param {Object} cookies - Objeto de cookies
 */
async function refresh(cookies) {
  try {
    if (!cookies.jwt) return [null, "No hay autorización"];
    const refreshToken = cookies.jwt;

    const accessToken = jwt.verify(
      refreshToken,
      REFRESH_JWT_SECRET,
      async (err, user) => {
        if (err) return [null, "La sesion a caducado, vuelva a iniciar sesion"];

        const userFound = await User.findOne({
          where: { username: user.username },
          include: ["Role", "Process"],
        });

        if (!userFound) return [null, "No usuario no autorizado"];

        const userJSON = userFound.toJSON();

        const accessToken = jwt.sign(
          {
            username: userJSON.username,
            role: userJSON.Role.name,
            process: userJSON.Process.name,
            processId: userJSON.ProcessId,
          },
          ACCESS_JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        return [accessToken, null];
      }
    );

    return accessToken;
  } catch (error) {
    handleError(error, "auth.service -> refresh");
  }
}

export default { login, refresh };
