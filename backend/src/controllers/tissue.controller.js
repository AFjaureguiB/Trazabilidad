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
    //si el obj file no viene en req, no necesariamente debemos retornar un error
    //Se asume que si el usuario no adjunta el archivo PDF no lo quiere actualizar,
    //si adjunta un archivo pdf, entonces si lo quiere actualizar

    /**
     * Una cosa importante, es que si no se adjunta un archivo PDF, el field `consentimiento-pdf` tendra un valor undefined o null o algo asi
     * EL middleware de multer, de alguna manera detecta que no hay ningun archivo, por lo tanto deja ese field asi tal cual, y no lo quita
     * Este comportamiento resulta, en que si no se adjunta nada, el `tissueBody` tiene el field `consentimiento-pdf` y por ende no pasara la validacion
     *
     * Cuando si se adjunta un archivo, este field se quita del body de la request y la info se pasa al field `file`
     *
     * La solucion en el front, es que si no hay archivo cargado, no se debe agregar este campo al formData.
     */

    const { params, body: tissueBody, file } = req;

    const { error: paramsError } = idSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyTissueError } = tissueSchema.validate(tissueBody);
    console.log(bodyTissueError);

    if (bodyTissueError)
      return respondError(req, res, 400, bodyTissueError.message);

    //Si req.file existe, quiere decir que se adjunto un nuevo PDF, y se quiere actualizar dicho archivo
    //En caso contrario, no se adjunto ningun archivo PDF, por lo tanto no se quiere actualizar y el anterior archivo se queda intacto

    //Necesitamos renombrar un archivo PDF en caso de que se quiera cambiar el codigo del tejido ?
    //Si ese es el caso, es necesario detectar si el `code` es diferente del que esta en la DB, y si es asi, actuializar el valor de `path` en la DB
    //Adicionalmente se debe renombrar el archivo que esta acutualmente en la carpeta public.
    //Puede que no se adjunte un archivo y que se requiera realizar operaciones con el archivo :/

    /* 
      Hay dos casos donde se requiere modificar el archivo:
      1) Quiero cambier el contenido del archivo, porque me equivoque y subi uno equivocado
      2) Si requiero modificar el DNI de un donador o el codigo de un tejido, eso implica renombrar el archivo
      NO SE DA EL CASO EN EL QUE QUIERAS MODIFICAR EL NOMBRE DEL ARCHIVO DIRECTAMENTE, ES UN SIDEEFFECT DEL PUNTO 2)
     */
    const extension = req.file ? extname(req.file.originalname) : "";

    const [updatedTissue, tissueError] = await TissueService.updateTissue(
      params.id,
      tissueBody,
      extension
    );

    if (tissueError) return respondError(req, res, 400, tissueError);
    if (!updatedTissue)
      return respondError(req, res, 400, "No se actualizo el tejido");

    if (req.file) {
      //Si se inserto correctamente, ahora si, guardamos el archivo en el disco, en la carpeta public/consentimiento-informado
      const [saveSuccess, saveError] = await savefile(
        updatedTissue.pdfpath,
        file.buffer
      );
      if (saveError) {
        //This code snippet is ugly, maybe we should update it C:
        updatedTissue.pdfpath =
          "Archivo no creado correctamente, actualizar mas tarde";
        return respondSuccess(req, res, 201, updatedTissue);
      }
    }

    respondSuccess(req, res, 200, updatedTissue);
    logUserActivity(
      req.username,
      req.role,
      req.process,
      "PUT /api/tissues",
      updatedTissue
    );
  } catch (error) {
    handleError(error, "tissue.controller -> createTissueToDonor");
    respondError(req, res, 400, error.message);
  }
}

export default {
  updateTissue,
};
