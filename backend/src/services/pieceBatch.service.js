"use strict";
import { PieceBatch } from "../models/index.js";
import { handleError } from "../utils/errorHandler.js";

async function getPieceBatch() {
  try {
    const piecesBatchesFromDB = await PieceBatch.findAll();
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

export default {
  savePieceBatch,
  getPieceBatch,
};
