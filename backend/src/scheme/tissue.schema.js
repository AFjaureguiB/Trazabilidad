"use strict";

import Joi from "joi";
import { idSchema } from "./miscellaneous.schema.js";

export const tissueSchema = Joi.object({
  ips: Joi.string().required().messages({
    "string.empty": "El campo IPS no puede estar vacío.",
    "any.required": "El campo IPS es obligatorio.",
    "string.base": "El campo IPS debe ser de tipo string.",
  }),
  specialistname: Joi.string().required().messages({
    "string.empty": "El nombre del especialista no puede estar vacío.",
    "any.required": "El nombre del especialista es obligatorio.",
    "string.base": "El nombre del especialista debe ser de tipo string.",
  }),
  collectedAt: Joi.date().iso().required().messages({
    "date.base": "La fecha de recolección debe ser una fecha válida.",
    "any.required": "La fecha de recolección es obligatoria.",
    "date.iso":
      "La fecha de recolección debe estar en formato ISO (YYYY-MM-DD).",
  }),
  tissuetype: Joi.string().required().messages({
    "string.empty": "El tipo de tejido no puede estar vacío.",
    "any.required": "El tipo de tejido es obligatorio.",
    "string.base": "El tipo de tejido debe ser de tipo string.",
  }),
  location: Joi.string().required().messages({
    "string.empty": "La ubicación no puede estar vacía.",
    "any.required": "La ubicación es obligatoria.",
    "string.base": "La ubicación debe ser de tipo string.",
  }),
  code: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required()
    .messages({
      "string.empty": "El código no puede estar vacío.",
      "any.required": "El código es obligatorio.",
      "string.pattern.base":
        "El código debe comenzar con un número diferente a 0 y solo contener dígitos.",
    }),
  description: Joi.string().messages({
    "string.empty": "La descripción no puede estar vacía.",
    "string.base": "La descripción debe ser de tipo string.",
  }),
});

export const tissueBodySchema = Joi.object({
  donorId: Joi.number().integer().positive().required().messages({
    "number.empty": "El id no puede estar vacío.",
    "any.required": "El id es obligatorio.",
    "number.base": "El id debe ser de tipo number.",
  }),
  dni: Joi.string()
    .pattern(/^[1-9]\d*$/)
    .required()
    .messages({
      "string.empty": "El DNI no puede estar vacío.",
      "any.required": "El DNI es obligatorio.",
      "string.pattern.base":
        "El DNI debe comenzar con un número diferente a 0 y solo contener dígitos.",
    }),
  tissue: tissueSchema.required().messages({
    "any.required": "La información del tejido es obligatoria.",
  }),
});
