"use strict";

import Joi from "joi";

/**
 * Esquema de validación para el id de un objeto en la DB
 * @constant {Object}
 */
export const idSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "number.empty": "El id no puede estar vacío.",
    "any.required": "El id es obligatorio.",
    "number.base": "El id debe ser de tipo number.",
  }),
});
