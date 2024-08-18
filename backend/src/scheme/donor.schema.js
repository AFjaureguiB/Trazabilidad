"use strict";

import Joi from "joi";

import { tissueSchema } from "./tissue.schema.js";
/**
 * Esquema de validación para el cuerpo de la solicitud de donador.
 * @constant {Object}
 */
export const donorBodySchema = Joi.object({
  names: Joi.string().required().messages({
    "string.empty": "Los nombres del donador no pueden estar vacíos.",
    "any.required": "Los nombres del donador son obligatorios.",
    "string.base": "Los nombres del donador deben ser de tipo string.",
  }),
  surnames: Joi.string().required().messages({
    "string.empty": "Los apellidos del donador no pueden estar vacíos.",
    "any.required": "Los apellidos del donador son obligatorios.",
    "string.base": "Los apellidos del donador deben ser de tipo string.",
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
  dateOfBirth: Joi.date().iso().required().messages({
    "date.base": "La fecha de nacimiento debe ser una fecha válida.",
    "any.required": "La fecha de nacimiento es obligatoria.",
    "date.iso":
      "La fecha de nacimiento debe estar en formato ISO (YYYY-MM-DD).",
  }),
  tissue: tissueSchema.required().messages({
    "any.required": "La información del tejido es obligatoria.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});
