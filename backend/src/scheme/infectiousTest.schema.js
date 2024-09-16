"use strict";

import Joi from "joi";

export const editInfectiousTestSchema = Joi.object({
  tissueId: Joi.number().integer().positive().required().messages({
    "number.empty": "El id del tejido no puede estar vacío.",
    "any.required": "El id del tejido es obligatorio.",
    "number.base": "El id del tejido debe ser de tipo number.",
  }),
  result: Joi.string().required().messages({
    "string.empty": "El resultado no puede estar vacío.",
    "any.required": "El resultado es obligatorio.",
    "string.base": "El resultado debe ser de tipo string.",
  }),
  comment: Joi.string().messages({
    "string.empty": "La descripción no puede estar vacía.",
    "string.base": "La descripción debe ser de tipo string.",
  }),
});
