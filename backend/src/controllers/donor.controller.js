"use strict";
import { extname } from "node:path";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";
import DonorService from "../services/donor.service.js";
import { donorBodySchema } from "../scheme/donor.schema.js";
import { savefile } from "../services/savefile.service.js";

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

//En esta V2 de createDonor, manejamos otros middlewares, y gestionamos en memoria el archivo PDF enviado en el form
//De esta manera evitamos escribir directamente en el disco y despues borrar o renombrar el archivo.
async function createDonorV2(req, res) {
  try {
    const { body: donorWithTissue, file } = req;

    //Aqui colocariamos todo lo que corresponde al servicio de crear un donador con su tejido
    //volvemos a verificar con el esquema, aunque en teoria nunca deberia de llegar aqui con un error, pero por si las moscas
    const { error: bodyDonorError } = donorBodySchema.validate(donorWithTissue);

    if (bodyDonorError)
      return respondError(req, res, 400, bodyDonorError.message);

    //Para poder guardar el archivo, necesito el nombre del archivo y eso lo puedo generar aqui con el obj req.file
    //Ese dato, curiosamente lo necesita el servicio para crear un donador, asi que creo aqui con mas razon
    const extension = extname(req.file.originalname);
    const customFileName = `${donorWithTissue.dni}-${donorWithTissue.tissue.code}${extension}`;

    //code to insert a donor with tissue in to DB ...
    const [newDonor, donorError] = await DonorService.createDonor({
      pdfpath: customFileName,
      ...donorWithTissue,
    });

    //Si ocurrio algo en la creacion del donador, respondemos y no guardamos el archivo
    if (donorError) return respondError(req, res, 400, donorError);
    if (!newDonor) return respondError(req, res, 400, "No se creo el donador");

    //Si se inserto correctamente, ahora si, guardamos el archivo en el disco, en la carpeta public/consentimiento-informado
    const [saveSuccess, saveError] = await savefile(
      customFileName,
      file.buffer
    );

    if (saveError) {
     //This code snippet is ugly, maybe we should update it C:
      newDonor.Tissues[0].pdfpath =
        "Archivo no creado correctamente, actualizar mas tarde";
      return respondSuccess(req, res, 201, newDonor);
    }
    //Si todo sale bien, respondemos con 201, y previamente ya habremos guardado el PDF en el disco
    respondSuccess(req, res, 201, newDonor);
  } catch (error) {
    handleError(error, "donor.controller -> createDonorV2");
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
  createDonorV2,
};
