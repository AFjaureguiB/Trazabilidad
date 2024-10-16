"use strict";

import sterilizationBatchService from "../services/sterilizationBatch.service.js";
import { handleError } from "../utils/errorHandler.js";
import { respondError, respondSuccess } from "../utils/resHandler.js";

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

export default {
  getSterilizationBatches,
};
