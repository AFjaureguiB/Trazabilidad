"use strict";

import { Donor, Tissue } from "../models/index.js";
import { handleError } from "../utils/errorHandler.js";

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

    //No es necesario validar si el Donor existe, ya que un Tissue esta estrictamente ligado a un donador
    const donorFound = await Donor.findByPk(tissueFound.donorId);

    const pdfpath = extname
      ? `${donorFound.dni}-${tissueData.code}${extname}`
      : "";

    //Si viene extname (extension del archivo, la cual es PDF) quiere decir que tengo que actualziar el nombre del archivo en la DB porque se adjunto un archivo PDF
    if (pdfpath) {
      tissueFound.update({ pdfpath, ...tissueData });
      //En otro caso, se quedara sin cambios, ya que no se adjunto ningun archivo PDF
    } else {
      tissueFound.update(tissueData);
    }

    //Si se actualizo el pdfpath, ya viene en la nueva informacion al hacer reload
    tissueFound.reload();

    return [tissueFound.toJSON(), null];
  } catch (error) {
    handleError(error, "tissue.service -> updateTissue");
  }
}

export default {
  updateTissue,
};
