"use strict";

/** Modelo de datos 'User' */
import { Donor, Tissue } from "../models/index.js";
import { TissueStatus } from "../constants/TissueStatus.js";
import { handleError } from "../utils/errorHandler.js";

//helper functions para verificar la existencia de registrtos antes de realizar modificaciones cuando se sube un PDF
export async function existDonorWithDni(dni) {
  const donorCount = await Donor.count({
    where: { dni },
  });
  return donorCount > 0;
}

export async function existTissueWithCode(code) {
  const tissueCount = await Tissue.count({
    where: { code },
  });
  return tissueCount > 0;
}

/**
 * Obtiene todos los donantes con la informacion de sus piezas de la base de datos
 * @returns {Promise} Promesa con el objeto de los donantes
 */

async function getDonors() {
  try {
    const donorsFromDB = await Donor.findAll({ include: [{ model: Tissue }] });

    if (!donorsFromDB) return [null, "No hay informacion de donantes"];

    const donors = donorsFromDB.map((donor) => donor.toJSON());

    return [donors, null];
  } catch (error) {
    handleError(error, "donor.service -> getDonors");
  }
}

/**
 * Crea a un donador junto con su pieza
 * @param {Object} donor Objeto de un donador con la informacion de una pieza/tejido
 * @returns {Promise} Promesa con el nuevo objeto Donador creado
 */
async function createDonor(donor) {
  try {
    const { names, surnames, dni, dateOfBirth, pdfpath, tissue } = donor;
    const donorFound = await Donor.findOne({
      where: { dni },
    });

    if (donorFound) return [null, "El donador ya existe"];

    const newDonor = await Donor.create({
      names,
      surnames,
      dni,
      dateOfBirth,
      pdfpath,
    });

    await newDonor.createTissue({ status: TissueStatus.QUARANTINE, ...tissue });

    return [newDonor.toJSON(), null];
  } catch (error) {
    handleError(error, "donor.service -> createDonor");
  }
}

/**
 * Obtener a un donador mediante su id junto con su o sus piezas/tejidos
 * @param {number} id identificador de un donador en la base de datos
 * @returns {Array} Arreglo con dos elementos, en la posicion 1 es el donador, en la posicion 2 es el error
 */
async function getDonorById(id) {
  try {
    const donorFromDB = await Donor.findByPk(id, {
      include: [{ model: Tissue }],
    });

    if (!donorFromDB) return [null, "El donador no existe"];

    const donor = donorFromDB.toJSON();

    return [donor, null];
  } catch (error) {
    handleError(error, "donor.service -> getDonorById");
  }
}

/**
 * Actualizar a un donador mediante su id junto con su o sus piezas/tejidos
 * @param {number} id identificador de un donador en la base de datos
 * @param {Object} Objeto Donador con la nueva informacion, junto con la informacion de su o sus piezas/tejidos
 * @param {number} tissueId identificador de una pieza/tejido de un donador en la base de datos
 * @returns {Array} Arreglo con dos elementos, en la posicion 1 es el donador con la informacion actualizada, en la posicion 2 si lo hay es el error
 */
async function updateDonor(id, donor, tissueId) {
  try {
    const { tissue, ...donorData } = donor;

    const donorFound = await Donor.findByPk(id, {
      include: [{ model: Tissue }], // Incluir el o los Tissues asociados
    });

    // Basta con saber que el donador no existe, porque nunca habra un donador sin ninguna pieza
    if (!donorFound) return [null, "El donador no existe"];

    // Encontrar el Tissue específico que deseas actualizar
    const tissueFound = donorFound.Tissues.find((t) => t.id === tissueId);

    donorFound.update(donorData);
    tissueFound.update(tissue);

    donorFound.save();
    tissueFound.save();
    donorFound.reload();

    return [donorFound.toJSON(), null];
  } catch (error) {
    handleError(error, "donor.service -> updateDonor");
  }
}

async function deleteDonor(id) {
  try {
    const donorFound = await Donor.findByPk(id);
    if (!donorFound) return [null, "El donador no existe"];

    const donorName = `${donorFound.names} ${donorFound.surnames}`;

    await donorFound.destroy();

    return [`El donador ${donorName} ha sido eliminado`, null];
  } catch (error) {
    handleError(error, "donor.service -> deleteDonor");
  }
}

export default {
  getDonors,
  createDonor,
  getDonorById,
  deleteDonor,
  updateDonor,
};