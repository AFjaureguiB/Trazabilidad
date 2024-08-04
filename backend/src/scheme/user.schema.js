"use strict";

import Joi from "joi";
/**
 * Esquema de validación para el cuerpo de la solicitud de usuario.
 * @constant {Object}
 */
  /*role: Joi.string().valid("ADMIN", "ASSISTANT").required().messages({
    "any.required": "El rol es obligatorio.",
    "string.base": "El rol debe ser de tipo string.",
    "any.only": "El rol proporcionado no es válido.",
  }),*/
const userBodySchema = Joi.object({
  firstname: Joi.string().required().messages({
    "string.empty": "El primer nombre de usuario no puede estar vacío.",
    "any.required": "El primer nombre de usuario es obligatorio.",
    "string.base": "El primer nombre de usuario debe ser de tipo string.",
  }),
  lastname: Joi.string().required().messages({
    "string.empty": "El primer nombre de usuario no puede estar vacío.",
    "any.required": "El primer nombre de usuario es obligatorio.",
    "string.base": "El primer nombre de usuario debe ser de tipo string.",
  }),
  username: Joi.string().required().messages({
    "string.empty": "El nombre de usuario no puede estar vacío.",
    "any.required": "El nombre de usuario es obligatorio.",
    "string.base": "El nombre de usuario debe ser de tipo string.",
  }),
  plainpassword: Joi.string().required().min(5).allow("").messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "any.required": "La contraseña es obligatoria.",
    "string.base": "La contraseña debe ser de tipo string.",
    "string.min": "La contraseña debe tener al menos 5 caracteres.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "El email no puede estar vacío.",
    "any.required": "El email es obligatorio.",
    "string.base": "El email debe ser de tipo string.",
    "string.email": "El email debe tener un formato válido.",
  }),
  process: Joi.string().messages({
    "string.empty": "El proceso de usuario no puede estar vacío.",
    "any.required": "El proceso de usuario es obligatorio.",
    "string.base": "El proceso de usuario debe ser de tipo string.",
  }),
  newPassword: Joi.string().min(5).messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "string.base": "La contraseña debe ser de tipo string.",
    "string.min": "La contraseña debe tener al menos 5 caracteres.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de usuario.
 * @constant {Object}
 */
const userIdSchema = Joi.object({
  id: Joi.number().required().messages({
    "number.empty": "El id no puede estar vacío.",
    "any.required": "El id es obligatorio.",
    "number.base": "El id debe ser de tipo number.",
  }),
});

export { userBodySchema, userIdSchema };
