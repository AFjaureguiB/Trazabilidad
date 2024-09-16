"use strict";

/** Modelo de datos 'User' */
import { Donor, Tissue, InfectiousTests } from "../models/index.js";
import { TissueStatus } from "../constants/TissueStatus.js";
import { handleError } from "../utils/errorHandler.js";

import { existTissueWithCode } from "../services/tissue.service.js";

import compareAndLogChanges from "../utils/compareChanges.js";

//helper functions para verificar la existencia de registrtos antes de realizar modificaciones cuando se sube un PDF
export async function existDonorWithDni(dni) {
  const donorCount = await Donor.count({
    where: { dni },
  });
  return donorCount > 0;
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

async function getDonorsTissuesInfectiousTests() {
  try {
    const donorsFromDB = await Donor.findAll({
      include: [
        {
          model: Tissue,
          include: [
            {
              model: InfectiousTests, // Incluir las pruebas infecciosas de cada tejido
              as: "infectiousTests", // El alias que definiste en la relación
            },
          ],
        },
      ],
    });

    if (!donorsFromDB) return [null, "No hay informacion de donantes"];
    const donors = donorsFromDB.map((donor) => donor.toJSON());

    return [donors, null];
  } catch (error) {
    handleError(error, "donor.service -> getDonorsTissuesInfectiousTests");
  }
}

/**
 * Crea a un donador junto con su pieza
 * @param {Object} donor Objeto de un donador con la informacion de una pieza/tejido
 * @returns {Promise} Promesa con el nuevo objeto Donador creado
 */
async function createDonorWithTissue(donorWithTissue, extname) {
  try {
    const { names, surnames, dni, dateOfBirth, tissue } = donorWithTissue;

    const dniAlreadyExist = await existDonorWithDni(dni);
    const codeAlreadyExist = await existTissueWithCode(tissue.code);

    if (dniAlreadyExist) return [null, "El DNI, ya esta asociado a un donador"];
    if (codeAlreadyExist)
      return [null, "El codigo, ya esta asociado a un tejido"];

    const newDonor = await Donor.create({
      names,
      surnames,
      dni,
      dateOfBirth,
    });

    const pdfpath = `${newDonor.dni}-${tissue.code}${extname}`;

    const newTissue = await newDonor.createTissue({
      status: TissueStatus.QUARANTINE,
      pdfpath,
      ...tissue,
    });

    const newDonorWithTissue = {
      ...newDonor.toJSON(),
      tissue: newTissue.toJSON(),
    };

    return [newDonorWithTissue, null];
  } catch (error) {
    handleError(error, "donor.service -> createDonor");
    return [null, "Error al crear nuevo donador"];
  }
}

async function addTissueToDonor(donorId, tissue, extname) {
  try {
    const donorFound = await Donor.findByPk(donorId);
    if (!donorFound) return [null, "El donador no existe"];

    //No necesariamente en este donador se repite el codigo, asi que verifico si el codigo no existe en algun otro tejido.
    const codeAlreadyExist = await existTissueWithCode(tissue.code);
    if (codeAlreadyExist)
      return [null, "El codigo, ya esta asociado a un tejido"];

    const pdfpath = `${donorFound.dni}-${tissue.code}${extname}`;

    const newTissue = await donorFound.createTissue({
      status: TissueStatus.QUARANTINE,
      pdfpath,
      ...tissue,
    });

    return [newTissue.toJSON(), null];
  } catch (error) {
    handleError(error, "donor.service -> addTissueToDonor");
    return [null, "Error al crear nuevo tejido"];
  }
}

/**
 * Obtener a un donador mediante su id junto con su o sus piezas/tejidos
 * @param {number} id identificador de un donador en la base de datos
 * @returns {Promise} Arreglo con dos elementos, en la posicion 1 es el donador, en la posicion 2 es el error
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

async function updateDonor(id, donorData) {
  try {
    const donorFound = await Donor.findByPk(id);

    if (!donorFound) return [null, "El donador no existe", null];

    //Si el campo DNI del donador se actualiza, es necesario actualizar el path del archivo PDF, ya que si no, se quedara con el anterior DNI
    //Para realizar lo anterior es necesario actualizar cada tejido asociado a este donador, y esto no solo en la DB, si no tambien renombrar los archivos ya creados.
    //Agregar UUID para nombrar el archivo, y que asi no dependa de la info del donador y tissue
    const previusDonor = donorFound.toJSON();

    await donorFound.update(donorData);
    await donorFound.reload();
    const newDonor = donorFound.toJSON();

    // Usa la función compareAndLogChanges para comparar los cambios
    const updatedInfo = compareAndLogChanges(previusDonor, newDonor);

    return [newDonor, null, updatedInfo];
  } catch (error) {
    handleError(error, "donor.service -> updateDonor");
  }
}

/**
 * Actualizar a un donador mediante su id junto con su o sus piezas/tejidos
 * @param {number} id identificador de un donador en la base de datos
 * @param {Object} Objeto Donador con la nueva informacion, junto con la informacion de su o sus piezas/tejidos
 * @param {number} tissueId identificador de una pieza/tejido de un donador en la base de datos
 * @returns {Array} Arreglo con dos elementos, en la posicion 1 es el donador con la informacion actualizada, en la posicion 2 si lo hay es el error
 */
async function updateDonorAndTissue(id, donor, tissueId) {
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
  getDonorsTissuesInfectiousTests,
  createDonorWithTissue,
  addTissueToDonor,
  getDonorById,
  deleteDonor,
  updateDonor,
};
