"use strict";
import { PieceBatch, Piece, ChemicalTests } from "../models/index.js";
import { handleError } from "../utils/errorHandler.js";

async function getPieceBatch() {
  try {
    const piecesBatchesFromDB = await PieceBatch.findAll({
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
    if (!piecesBatchesFromDB)
      return [null, "No hay informacion de lotes de piezas"];

    const piecesBatches = piecesBatchesFromDB.map((p) => p.toJSON());

    return [piecesBatches, null];
  } catch (error) {
    handleError(error, "pieceBatch.service -> getPieceBatch");

    return [null, "Error al obtener el lote de piezas"];
  }
}

async function savePieceBatch(batchData) {
  try {
    const newPieceBatch = await PieceBatch.create(batchData);
    return [newPieceBatch.toJSON(), null];
  } catch (error) {
    handleError(error, "pieceBatch.service -> savePieceBatch");

    return [null, "Error al crear el lote de piezas"];
  }
}

async function addPiecesToPieceBatch(batchId, pieces) {
  try {
    const batch = await PieceBatch.findByPk(batchId);

    if (!batch) return [null, "El numero de lote no existe"];

    if (batch.status === "Closed")
      return [null, "El lote al que intentas agregar piezas esta cerrado"];

    const ids = pieces.map((p) => p.id); //el metodo generado por sequelize, solo acepta instancias de tipo Sequelize o un array con los ID's
    await batch.addPieces(ids);

    const codePieces = pieces.map((p) => p.code);
    const response = `Las piezas con codigos: ${codePieces.join(
      ", "
    )}, se agregaron al lote con numero: ${batch.id}`;

    return [response, null];
  } catch (error) {
    handleError(error, "pieceBatch.service -> addPiecesToBatch");

    return [null, "Error al agregar piezas al lote"];
  }
}

async function updatePieceBatch(id, pieceBatchData) {
  try {
    const pieceBatchFound = await PieceBatch.findByPk(id);

    if (!pieceBatchFound) return [null, "El lote no existe"];

    await pieceBatchFound.update(pieceBatchData);
    await pieceBatchFound.reload();

    return [pieceBatchFound.toJSON(), null];
  } catch (error) {
    handleError(error, "pieceBatch.service -> updatePieceBatch");

    return [null, "Error al actualizar el lote de piezas"];
  }
}

export default {
  savePieceBatch,
  getPieceBatch,
  addPiecesToPieceBatch,
  updatePieceBatch,
};
