"use strict";
import { extname } from "node:path";

import { logUserActivity } from "../services/logger.service.js";

import { respondSuccess, respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";
import DonorService from "../services/donor.service.js";
import { savefile } from "../services/savefile.service.js";
import {
  donorBodySchema,
  editDonorBodySchema,
} from "../scheme/donor.schema.js";
import { tissueSchema } from "../scheme/tissue.schema.js";
import { idSchema } from "../scheme/miscellaneous.schema.js";

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
async function createDonorWithTissue(req, res) {
  try {
    const { body: donorWithTissue, file } = req;

    if (!file)
      return respondError(
        req,
        res,
        400,
        "Debes proveer toda la informacion necesaria",
        "El archivo de consentimiento es obligatorio"
      );

    //Aqui colocariamos todo lo que corresponde al servicio de crear un donador con su tejido
    //volvemos a verificar con el esquema, aunque en teoria nunca deberia de llegar aqui con un error, pero por si las moscas
    const { error: bodyDonorError } = donorBodySchema.validate(donorWithTissue);

    if (bodyDonorError)
      return respondError(req, res, 400, bodyDonorError.message);

    //Para poder guardar el archivo, necesito el nombre del archivo y eso lo puedo generar aqui con el obj req.file
    //Ese dato, curiosamente lo necesita el servicio para crear un donador, asi que creo aqui con mas razon
    const extension = extname(req.file.originalname);

    //code to insert a donor with tissue in to DB ...
    const [newDonorWithTissue, newDonorError] =
      await DonorService.createDonorWithTissue(donorWithTissue, extension);

    //Si ocurrio algo en la creacion del donador, respondemos y no guardamos el archivo
    if (newDonorError) return respondError(req, res, 400, newDonorError);
    if (!newDonorWithTissue)
      return respondError(req, res, 400, "No se creo el donador");

    const customFileName = `${newDonorWithTissue.dni}-${newDonorWithTissue.tissue.code}${extension}`;

    //Si se inserto correctamente, ahora si, guardamos el archivo en el disco, en la carpeta public/consentimiento-informado
    const [saveSuccess, saveError] = await savefile(
      customFileName,
      file.buffer
    );

    if (saveError) {
      //This code snippet is ugly, maybe we should update it C:
      newDonor.tissue.pdfpath =
        "Archivo no creado correctamente, actualizar mas tarde";
      return respondSuccess(req, res, 201, newDonorWithTissue);
    }
    //Si todo sale bien, respondemos con 201, y previamente ya habremos guardado el PDF en el disco
    respondSuccess(req, res, 201, newDonorWithTissue);
  } catch (error) {
    handleError(error, "donor.controller -> createDonorV2");
    respondError(req, res, 400, error.message);
  }
}

async function addTissueToDonor(req, res) {
  try {
    const { body: tissue, file } = req;
    const { donorId } = req.params;

    if (!file)
      return respondError(
        req,
        res,
        400,
        "Debes proveer toda la informacion necesaria",
        "El archivo de consentimiento es obligatorio"
      );

    const { error: tissueError } = tissueSchema.validate(tissue);
    if (tissueError)
      return respondError(
        req,
        res,
        400,
        "Debes proveer toda la informacion necesaria",
        tissueError.message
      );

    const extension = extname(req.file.originalname);
    const [newTissue, newTissueError] = await DonorService.addTissueToDonor(
      donorId,
      tissue,
      extension
    );

    if (newTissueError) return respondError(req, res, 400, newTissueError);
    if (!newTissue) return respondError(req, res, 400, "No se creo el donador");

    //Si se inserto correctamente, ahora si, guardamos el archivo en el disco, en la carpeta public/consentimiento-informado
    const [saveSuccess, saveError] = await savefile(
      newTissue.pdfpath,
      file.buffer
    );

    if (saveError) {
      //This code snippet is ugly, maybe we should update it C:
      newTissue.pdfpath =
        "Archivo no creado correctamente, actualizar mas tarde";
      return respondSuccess(req, res, 201, newTissue); //Aqui tenemos un error, newDonor de donde salio?
    }

    //Si todo sale bien, respondemos con 201, y previamente ya habremos guardado el PDF en el disco
    respondSuccess(req, res, 201, newTissue);
  } catch (error) {
    handleError(error, "donor.controller -> addTissueToDonor");
    respondError(req, res, 400, error.message);
  }
}

async function updateDonor(req, res) {
  try {
    const { params, body: donorData } = req;
    const { error: paramsError } = idSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: donorDataError } = editDonorBodySchema.validate(donorData);
    if (donorDataError)
      return respondError(req, res, 400, donorDataError.message);

    // Asegúrate de que el servicio devuelve updatedInfo correctamente
    const [updatedDonor, donorError, updatedInfo] = await DonorService.updateDonor(params.id, donorData);

    if (donorError) return respondError(req, res, 400, donorError);

    // Pasa updatedDonor a la respuesta de éxito
    respondSuccess(req, res, 200, updatedDonor);

    // Log de la actividad del usuario con updatedInfo
    logUserActivity(
      req.username,
      req.role,
      req.process,
      "PUT /api/donors",
      updatedInfo // Aquí pasa updatedInfo
    );
  } catch (error) {
    handleError(error, "donor.controller -> updateDonor");
    respondError(req, res, 400, error.message);
  }
}


export default {
  getDonors,
  createDonorWithTissue,
  addTissueToDonor,
  updateDonor,
};
