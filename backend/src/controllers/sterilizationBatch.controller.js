"use strict";

import sterilizationBatchService from "../services/sterilizationBatch.service.js";
import { handleError } from "../utils/errorHandler.js";
import { respondError, respondSuccess } from "../utils/resHandler.js";

async function createSterilizationBatch(req, res) {
  try {
    const { piecesBatchIds, ...batchData } = req.body;
    console.log(piecesBatchIds);
    console.log(batchData);

    const [newSterilizationBatch, newSterilizationBatchError] =
      await sterilizationBatchService.createSterilizationBatch(
        piecesBatchIds,
        batchData
      );

    if (newSterilizationBatchError)
      return respondError(req, res, 400, newSterilizationBatchError);

    if (!newSterilizationBatch)
      return respondError(
        req,
        res,
        400,
        "Error al crear el lote de esterilizacion"
      );

    respondSuccess(req, res, 201, newSterilizationBatch);
  } catch (error) {
    handleError(
      error,
      "sterilizationBatch.controller -> createSterilizationBatch"
    );
    respondError(req, res, 400, error.message);
  }
}

async function getSterilizationBatches(req, res) {
  try {
    const [sterilizationBatches, sterilizationBatchesError] =
      await sterilizationBatchService.getSterilizationBatches();

    if (sterilizationBatchesError)
      return respondError(req, res, 404, sterilizationBatchesError);

    sterilizationBatches.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, sterilizationBatches);
  } catch (error) {
    handleError(
      error,
      "sterilizationBatch.controller -> getSterilizationBatches"
    );
    respondError(req, res, 400, error.message);
  }
}

async function updateSterilizationBatch(req, res) {
  try {
    const { id, ...sterilizationBatchData } = req.body;
    //TODO: Validar con un schema de Joi o Zod el cuerpo de la request

    const [updatedsterilizationBatch, updatedsterilizationBatchError] =
      await sterilizationBatchService.updateSterilizationBatch(
        id,
        sterilizationBatchData
      );

    if (updatedsterilizationBatchError)
      return respondError(req, res, 400, updatedsterilizationBatchError);

    respondSuccess(req, res, 200, updatedsterilizationBatch);
  } catch (error) {
    handleError(
      error,
      "sterilizationBatch.controller -> updateSterilizationBatch"
    );
    respondError(req, res, 400, error.message);
  }
}

export default {
  getSterilizationBatches,
  createSterilizationBatch,
  updateSterilizationBatch,
};
