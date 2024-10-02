"use strict";

import { Donor, Tissue, Piece } from "../models/index.js";
import { handleError } from "../utils/errorHandler.js";
import compareAndLogChanges from "../utils/compareChanges.js";

export async function existTissueWithCode(code) {
  const tissueCount = await Tissue.count({
    where: { code },
  });
  return tissueCount > 0;
}

export async function updateTissue(id, tissueData, extname) {
  try {
    const tissueFound = await Tissue.findByPk(id);
    if (!tissueFound) return [null, "El tejido no existe"];

    const donorFound = await Donor.findByPk(tissueFound.donorId);

    const pdfpath = extname
      ? `${donorFound.dni}-${tissueData.code}${extname}`
      : tissueFound.pdfpath;

    const updateData = {
      ...tissueData,
      collectedAt: new Date(tissueData.collectedAt),
      updatedAt: new Date(),
      pdfpath: pdfpath || tissueFound.pdfpath,
    };

    const previousTissue = tissueFound.toJSON();

    if (pdfpath) {
      await tissueFound.update(updateData);
    } else {
      await tissueFound.update({
        ...tissueData,
        collectedAt: new Date(tissueData.collectedAt),
        updatedAt: new Date(),
      });
    }

    await tissueFound.reload();

    const newTissue = tissueFound.toJSON();

    const updatedNewInfo = compareAndLogChanges(previousTissue, newTissue);

    return [newTissue, null, updatedNewInfo];
  } catch (error) {
    handleError(error, "tissue.service -> updateTissue");

    return [null, "Error al actualizar el tejido"];
  }
}

export async function getTissuesWithPieces(tissueStatus) {
  try {
    const tissuesFromDB = await Tissue.findAll({
      where: {
        status: tissueStatus,
      },
      include: [
        {
          model: Piece,
          as: "pieces",
        },
        {
          model: Donor,
          attributes: ["names", "surnames"],
        },
      ],
    });

    if (!tissuesFromDB)
      return [null, "No hay informacion de tejidos ni piezas"];

    const tissues = tissuesFromDB.map((t) => t.toJSON());

    return [tissues, null];
  } catch (error) {
    handleError(error, "tissue.service -> getAcceptedissuesWithPieces");

    return [null, "Error al obtener informacion de tejidos"];
  }
}

export default {
  updateTissue,
  getTissuesWithPieces,
};
