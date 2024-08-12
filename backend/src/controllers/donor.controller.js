"use strict";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";
import DonorService from "../services/donor.service.js";
import { donorBodySchema } from "../scheme/donor.schema.js";
/**
 * Obtiene todos los donadores asi como la informacion de sus piezas/tejidos
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getDonors(req, res) {
  try {
    const [donors, donorsError] = await DonorService.getDonors();
    if (donorsError) return respondError(req, res, 404, donorsError);

    donors.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, donors);
  } catch (error) {
    handleError(error, "donor.controller -> getDonors");
    respondError(req, res, 400, error.message);
  }
}

async function createDonor(req, res) {
  try {
    const { body: donor, file } = req;

    //volvemos a verificar con el esquema, aunque en teoria nunca deberia de llegar aqui con un error, pero por si las moscas
    const { error: bodyDonorError } = donorBodySchema.validate(donor);

    if (bodyDonorError)
      return respondError(req, res, 400, bodyDonorError.message);

    const [newDonor, donorError] = await DonorService.createDonor({
      pdfpath: file.filename,
      ...donor,
    });

    if (donorError) return respondError(req, res, 400, donorError);

    if (!newDonor) return respondError(req, res, 400, "No se creo el donador");

    respondSuccess(req, res, 201, newDonor);
  } catch (error) {
    handleError(error, "donor.controller -> createDonor");
    respondError(req, res, 400, error.message);
  }
}

export default {
  getDonors,
  createDonor,
};
