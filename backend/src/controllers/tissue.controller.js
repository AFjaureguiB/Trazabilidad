"use strict";
import { extname } from "node:path";
import { logUserActivity } from "../services/logger.service.js";
import { respondSuccess, respondError } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";
import TissueService from "../services/tissue.service.js";
import { tissueSchema } from "../scheme/tissue.schema.js";
import { idSchema } from "../scheme/miscellaneous.schema.js";
import { savefile } from "../services/savefile.service.js";

async function updateTissue(req, res) {
  try {
    const { params, body: tissueBody, file } = req;

    const { error: paramsError } = idSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyTissueError } = tissueSchema.validate(tissueBody);
    if (bodyTissueError)
      return respondError(req, res, 400, bodyTissueError.message);

    // Si req.file existe, indica que se está subiendo un nuevo archivo PDF
    const extension = req.file ? extname(req.file.originalname) : "";

    // Actualizar tejido en la base de datos
    const [updatedTissue, tissueError, updatedNewInfo] =
      await TissueService.updateTissue(params.id, tissueBody, extension);

    if (tissueError) return respondError(req, res, 400, tissueError);
    if (!updatedTissue)
      return respondError(req, res, 400, "No se actualizó el tejido");

    if (req.file) {
      // Guardar el archivo en el disco
      const [saveSuccess, saveError] = await savefile(
        updatedTissue.pdfpath,
        file.buffer
      );
      if (saveError) {
        updatedTissue.pdfpath =
          "Archivo no creado correctamente, actualizar más tarde";
        return respondSuccess(req, res, 201, updatedTissue);
      }
    }
    respondSuccess(req, res, 200, updatedTissue);
    logUserActivity(
      req.username,
      req.role,
      req.process,
      "PUT /api/tissues",
      updatedNewInfo
    );
  } catch (error) {
    handleError(error, "tissue.controller -> updateTissue");
    respondError(req, res, 400, error.message);
  }
}

export default {
  updateTissue,
};
