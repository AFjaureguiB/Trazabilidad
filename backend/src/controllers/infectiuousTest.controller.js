"use strict";

import { idSchema } from "../scheme/miscellaneous.schema.js";
import { respondError, respondSuccess } from "../utils/resHandler.js";
import { editInfectiousTestSchema } from "../scheme/infectiousTest.schema.js";
import InfectiuousTestService from "../services/infectiuousTest.service.js";
import { handleError } from "../utils/errorHandler.js";
async function updateInfectiousTest(req, res) {
  try {
    const { params, body: infectiousTestData } = req;
    const { error: paramsError } = idSchema.validate(params);

    if (paramsError) return respondError(req, res, 400, paramsError.message);
    console.log(infectiousTestData);

    const { error: infectiuousTestDataError } =
      editInfectiousTestSchema.validate(infectiousTestData);

    if (infectiuousTestDataError)
      return respondError(req, res, 400, infectiuousTestDataError.message);

    const [updatedInfectiousTest, infectiousTestError] =
      await InfectiuousTestService.updateInfectiousTest(
        params.id,
        infectiousTestData
      );

    if (infectiousTestError)
      return respondError(req, res, 400, infectiousTestError);

    respondSuccess(req, res, 200, updatedInfectiousTest);
  } catch (error) {
    handleError(error, "infectiuousTest.controller -> updateInfectiousTest");
    respondError(req, res, 400, error.message);
  }
}

export default {
  updateInfectiousTest,
};
