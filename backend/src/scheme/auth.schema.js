"use strict";

import Joi from "joi";

/**
 * Esquema de validación para el cuerpo de la solicitud de inicio de sesión.
 * @constant {Object}
 */
const authLoginBodySchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "El username no puede estar vacío.",
    "any.required": "El username es obligatorio.",
    "string.base": "El username debe ser de tipo string.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "any.required": "La contraseña es obligatoria.",
    "string.base": "La contraseña debe ser de tipo string.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

export { authLoginBodySchema };
