"use strict";

import Joi from "joi";

const tissueSchema = Joi.object({
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
 /*  status: Joi.string()
    .required()
    .valid("CUARENTENA", "EN PRUEBAS", "ACEPTADO", "RECHAZADO")
    .messages({
      "string.empty": "El estado no puede estar vacío.",
      "any.required": "El estado es obligatorio.",
      "string.base": "El estado debe ser de tipo string.",
      "any.only": "El estado debe ser 'available' o 'unavailable'.",
    }), */
  location: Joi.string().required().messages({
    "string.empty": "La ubicación no puede estar vacía.",
    "any.required": "La ubicación es obligatoria.",
    "string.base": "La ubicación debe ser de tipo string.",
  }),
  code: Joi.string().required().messages({
    "string.empty": "El código no puede estar vacío.",
    "any.required": "El código es obligatorio.",
    "string.base": "El código debe ser de tipo string.",
  }),
  description: Joi.string().messages({
    "string.empty": "La descripción no puede estar vacía.",
    "string.base": "La descripción debe ser de tipo string.",
  }),
});

/**
 * Esquema de validación para el cuerpo de la solicitud de donador.
 * @constant {Object}
 */
const donorBodySchema = Joi.object({
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
  dni: Joi.string().required().messages({
    "string.empty": "El DNI del donador no puede estar vacío.",
    "any.required": "El DNI del donador es obligatorio.",
    "string.base": "El DNI del donador debe ser de tipo string.",
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

/**
 * Esquema de validación para el id de usuario.
 * @constant {Object}
 */
const idSchema = Joi.object({
  id: Joi.number().required().messages({
    "number.empty": "El id no puede estar vacío.",
    "any.required": "El id es obligatorio.",
    "number.base": "El id debe ser de tipo number.",
  }),
});

export { tissueSchema, donorBodySchema, idSchema };
