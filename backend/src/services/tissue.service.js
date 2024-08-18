"use strict";

import { Donor, Tissue } from "../models/index.js";
import { TissueStatus } from "../constants/TissueStatus.js";
import { handleError } from "../utils/errorHandler.js";

export async function existTissueWithCode(code) {
  const tissueCount = await Tissue.count({
    where: { code },
  });
  return tissueCount > 0;
}
