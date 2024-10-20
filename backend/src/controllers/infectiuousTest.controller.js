"use strict";

import { idSchema } from "../scheme/miscellaneous.schema.js";
import { respondError, respondSuccess } from "../utils/resHandler.js";
import { editInfectiousTestSchema } from "../scheme/infectiousTest.schema.js";
import InfectiousTestService from "../services/infectiuousTest.service.js";
import { handleError } from "../utils/errorHandler.js";

async function updateInfectiousTest(req, res) {
  try {
    const { params, body: infectiousTestData } = req;
    const { error: paramsError } = idSchema.validate(params);

    if (paramsError) return respondError(req, res, 400, paramsError.message);

    console.log(infectiousTestData);

    const { error: infectiousTestDataError } =
      editInfectiousTestSchema.validate(infectiousTestData);

    if (infectiousTestDataError)
      return respondError(req, res, 400, infectiousTestDataError.message);

    // Aquí se pasa el `user` (username y role) al servicio.
    const [updatedInfectiousTest, infectiousTestError, updatedInfo] =
      await InfectiousTestService.updateInfectiousTest(
        params.id,
        infectiousTestData,
        { username: req.username, role: req.role } // Pasar el usuario
      );

    if (infectiousTestError)
      return respondError(req, res, 400, infectiousTestError);

    // Puedes usar `updatedInfo` para realizar más operaciones si es necesario.
    respondSuccess(req, res, 200, updatedInfectiousTest);
  } catch (error) {
    handleError(error, "infectiousTest.controller -> updateInfectiousTest");
    respondError(req, res, 400, error.message);
  }
}

export default {
  updateInfectiousTest,
};
