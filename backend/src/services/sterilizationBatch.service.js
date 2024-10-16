"use strict";
import { SterilizationBatch, Piece, ChemicalTests } from "../models/index.js";
import { handleError } from "../utils/errorHandler.js";

async function getSterilizationBatches() {
  try {
    const sterilizationBatchesFromDB = await SterilizationBatch.findAll({
      include: [
        {
          model: Piece,
          as: "pieces",
          include: [
            {
              model: ChemicalTests,
              as: "chemicalTests",
            },
          ],
        },
      ],
    });
    if (!sterilizationBatchesFromDB)
      return [null, "No hay informacion de lotes de esterilizacion"];

    const sterilizationBatches = sterilizationBatchesFromDB.map((sb) =>
      sb.toJSON()
    );

    return [sterilizationBatches, null];
  } catch (error) {
    handleError(error, "sterilizationBatch.service -> sterilizationBatch");

    return [null, "Error al obtener el lote de esterilizacion"];
  }
}

export default {
  getSterilizationBatches,
};
