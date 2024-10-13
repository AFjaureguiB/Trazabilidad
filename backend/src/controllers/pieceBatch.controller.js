"use strict";

import pieceBatchService from "../services/pieceBatch.service.js";
import { handleError } from "../utils/errorHandler.js";
import { respondError, respondSuccess } from "../utils/resHandler.js";

async function getPieceBatch(req, res) {
  try {
    const [piecesBatches, piecesBatchesError] =
      await pieceBatchService.getPieceBatch();

    if (piecesBatchesError)
      return respondError(req, res, 404, piecesBatchesError);

    piecesBatches.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, piecesBatches);
  } catch (error) {
    handleError(error, "pieceBatch.controller -> getPieceBatch");
    respondError(req, res, 400, error.message);
  }
}

async function savePieceBatch(req, res) {
  try {
    const batchData = req.body;

    //TODO: Validar con un schema de Joi o Zod el cuerpo de la request

    const [pieceBatch, pieceBatchError] =
      await pieceBatchService.savePieceBatch(batchData);

    if (pieceBatchError) return respondError(req, res, 400, pieceBatchError);
    if (!pieceBatch)
      return respondError(req, res, 400, "Error al crear el lote");

    respondSuccess(req, res, 201, pieceBatch);
  } catch (error) {
    handleError(error, "pieceBatch.controller -> savePieceBatch");
    respondError(req, res, 400, error.message);
  }
}

async function addPiecesToPieceBatch(req, res) {
  try {
    const { batchId, pieces } = req.body;
    console.log(pieces);

    //TODO: Validar con un schema de Joi o Zod el cuerpo de la request

    const [piecesAdded, piecesAddedError] =
      await pieceBatchService.addPiecesToPieceBatch(batchId, pieces);

    if (piecesAddedError) return respondError(req, res, 400, piecesAddedError);

    respondSuccess(req, res, 201, piecesAdded);
  } catch (error) {
    handleError(error, "pieceBatch.controller -> addPiecesToPieceBatch");
    respondError(req, res, 400, error.message);
  }
}

export default {
  savePieceBatch,
  getPieceBatch,
  addPiecesToPieceBatch,
};
